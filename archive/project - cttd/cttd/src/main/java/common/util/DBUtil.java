package common.util;

import java.io.File;
import java.io.Serializable;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.jdbc.Work;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;

import lombok.extern.slf4j.Slf4j;

/**
 * Base class to operate with database.
 *
 * @author HuyenNV
 */
@Slf4j
public class DBUtil {

	

	// The per thread session *
	private static final ThreadLocal<Session> THREAD_SESSION = new ThreadLocal<>();

	// Read the configuration, will share across threads*
	private static SessionFactory sessionFactory;
	
	private static void initPackagesConfig(Configuration config) throws ClassNotFoundException {
		// Chỉ cần chỉ định tên package, mapping toàn bộ các class trong package
		String configuredPackages = config.getProperties().getProperty("cttd.packages");
		if (configuredPackages != null && !configuredPackages.isEmpty()) {
			String[] packages = configuredPackages.split(",");
			for (String pk : packages) {
				String path = Thread.currentThread().getContextClassLoader()
						.getResource(pk.trim().replace(".", "/"))
						.getPath().replace("%20", " ");
				System.out.println("Path: " + path);
				File[] list = new File(path).listFiles();
				for (File f : list) {
					String className = pk + "." + f.getName().substring(0, f.getName().length() - 6);
					System.out.println("Class name: " + className);
					config.addAnnotatedClass(Class.forName(className));
				}
			}
		}
	}
	
	private static void initEncryptedConfig(Configuration config) {
		// Lấy dữ liệu DB mã hóa
		// URL url =
		// Thread.currentThread().getContextClassLoader().getResource("hibernate.cfg");
		URL url = ClassLoader.getSystemResource("hibernate.cfg");
		if (url != null) {
			URI uri;
			try {
				uri = url.toURI();
			} catch (URISyntaxException ex) {
				ex.printStackTrace();
				uri = null;
			}
			if (uri != null) {
				File file = new File(uri);
				if (file.exists()) {
					// String decryptString =
					// Encryption.decryptFile(URLDecoder.decode(file.getPath()));
					SecurityUtil securityUtil = new SecurityUtil();
					String decryptString = securityUtil.decryptFile(file.getAbsolutePath());
					String[] properties = decryptString.split("\r\n");
					for (String s : properties) {
						String temp[] = s.split("=", 2);
						if (temp.length == 2) {
							config.setProperty(temp[0], temp[1]);
						}
					}
				}
			}
		}
	}

	private static void initSessionFactory() {
		try {
			Configuration config = new Configuration();
			config.configure("hibernate.cfg.xml");
			initPackagesConfig(config);
			initEncryptedConfig(config);
			sessionFactory = config.buildSessionFactory();
		} catch (Exception ex) {
			log.error("%%%% Error Creating SessionFactory %%%%", ex);
		}
	}

	/**
	 * Creating a session factory, if not already loaded.
	 * 
	 * @return SessionFactory
	 */
	private static SessionFactory getSessionFactory() {
		if (sessionFactory == null) {
			initSessionFactory();
		}
		return sessionFactory;
	}

	// Cac phuong thuc co ban
	public static void openThreadSession() {
		// Tại sao lại có đoạn đóng này?
		Session session = THREAD_SESSION.get();
		if (session != null && session.isOpen()) {
			//session.flush();
			session.close();
		}

		// Tạo mới session
		session = getSessionFactory().openSession();
		THREAD_SESSION.set(session);
	}

	public static void beginTransaction() {
		getSession().beginTransaction();
	}

	public static void commitTransaction() {
		getSession().getTransaction().commit();
	}

	public static void rollbackTransaction() {
		getSession().getTransaction().rollback();
	}

	public static void closeSession() {
		Session session = THREAD_SESSION.get();
		if (session != null && session.isOpen()) {
			//session.flush();
			session.close();
		}

		THREAD_SESSION.set(null);
	}

	private static Session getSession() {
		return THREAD_SESSION.get();
	}
	
	// Use this function to terminate the application gently
	// Giải phóng cache và Connection Pools.
	public static void shutdown() {
		sessionFactory.close();
	}

	// Search, query
	public static <T> List<T> find(Class<T> tableName, Object... args) {
		if (args.length == 1) {
			String orderColumn = (String) args[0];
			String hql = " FROM " + tableName.getName() + " t ORDER BY " + "t." + orderColumn;
			Query query = getSession().createQuery(hql);
			return query.list();
		} else if (args.length == 3) {
			String propertyName = (String) args[0];
			Object value = args[1];
			String orderClause = (String) args[2];
			if (value == null) {
				String hql = " FROM " + tableName.getName() + " t WHERE t." + propertyName + " IS NULL ORDER BY "
						+ orderClause;
				Query query = getSession().createQuery(hql);
				return query.list();
			} else {
				String hql = " FROM " + tableName.getName() + " t WHERE t." + propertyName + " = ? ORDER BY "
						+ orderClause;
				Query query = getSession().createQuery(hql);
				query.setParameter(0, value);
				return query.list();
			}
		} else {
			String hql = " FROM " + tableName.getName() + " t WHERE 1 = 1 ";
			List<Object> paramList = new ArrayList<>();
			int i = 0;
			while (i < args.length - 1) {
				String propertyName = (String) args[i++];
				Object value = args[i++];
				if (value == null) {
					hql += " AND t." + propertyName + " IS NULL ";
				} else {
					hql += " AND t." + propertyName + " = ? ";
					paramList.add(value);
				}
				i++;
			}
			String orderClause = (String) args[args.length - 1];
			Query query = getSession().createQuery(hql + " ORDER BY " + orderClause);
			for (i = 0; i < paramList.size(); i++) {
				query.setParameter(i, paramList.get(i));
			}
			return query.list();
		}
	}

	public static <T> List<T> findByIds(Class<T> tableName, String idColumn, String ids, String orderColumn) {
		String hql = " FROM " + tableName.getName() + " t "
				+ " WHERE t." + idColumn + " IN (:ids) "
				+ " ORDER BY t." + orderColumn;
		Query query = getSession().createQuery(hql);
		query.setParameterList("ids", convertStringToLongArray(ids));
		return query.list();
	}

	// Convert configuration in form of an array (seperate by comma)
	private static Long[] convertStringToLongArray(String text) {
		String[] a = text.split(",");
		Long[] b = new Long[a.length];
		for (int i = 0; i < b.length; i++) {
			b[i] = Long.parseLong(a[i].trim());
		}
		return b;
	}

	public static <T> T get(Class<T> entityClass, Serializable id) {
		return (T) getSession().get(entityClass, id);
	}

	public static <T> T get(Class<T> entityClass, String propertyName, String value) {
		String hql = " FROM " + entityClass.getName() + " t WHERE LOWER(t." + propertyName + ") = ? ";
		Query query = createQuery(hql);
		query.setParameter(0, value.toLowerCase());
		return (T) query.uniqueResult();
	}
	
	/**
	 * Lấy tất cả bản ghi.
	 * @param tableName Class Java mà mapping với bảng
	 * @param orderColumn Cột sắp xếp
	 * @return Danh sách tất cả bản ghi
	 */
	public static <T> List<T> getAll(Class<T> tableName, String orderColumn) {
		String hql = " FROM " + tableName.getName() + " t "
				+ (orderColumn != null ? " ORDER BY t." + orderColumn : "");
		Query query = getSession().createQuery(hql);
		return query.list();
	}

	// Database manipulation
	public static void save(Object objectToSave) {
		getSession().save(objectToSave);
	}

	public static void update(Object entity) {
		getSession().update(entity);
	}

	public static void saveOrUpdate(final Object entity) {
		getSession().saveOrUpdate(entity);
	}

	public static void delete(Object entity) {
		getSession().delete(entity);
	}

	public static <T> void deleteByIds(List<Long> arrId, Class<T> className, String idColumn) {
		if ((arrId != null) && !arrId.isEmpty()) {
			String hql = " DELETE FROM " + className.getName() + " t WHERE t." + idColumn + " IN (:arrId) ";
			Query query = createQuery(hql);
			query.setParameterList("arrId", arrId);
			query.executeUpdate();
		}
	}

	public static <T> void deleteByIds(Long[] arrId, Class<T> className, String idColumn) {
		if ((arrId != null) && (arrId.length > 0)) {
			String hql = " DELETE FROM " + className.getName() + " t WHERE t." + idColumn + " IN (:arrId) ";
			Query query = createQuery(hql);
			query.setParameterList("arrId", arrId);
			query.executeUpdate();
		}
	}

	public static <T> void deleteById(Long id, Class<T> className, String idColumn) {
		String hql = " DELETE FROM " + className.getName() + " t WHERE t." + idColumn + " = ? ";
		Query query = createQuery(hql);
		query.setParameter(0, id);
		query.executeUpdate();
	}

	// Cac phuong thuc chung
	public static void flushSession() {
		getSession().flush();
	}

	/**
	 * Sử dụng khi xử lý batch
	 */
	public static void clearSession() {
		getSession().clear();
	}

	public static Query createQuery(String hql) {
		return getSession().createQuery(hql);
	}

	public static SQLQuery createSQLQuery(String sql) {
		return getSession().createSQLQuery(sql);
	}

	/**
	 * Khuyen cao khong nen su dung ham nay.
	 *
	 * @param work
	 *            Tu doi tuong Work nay chung ta se lay duoc doi tuong Connection, tu do lay duoc
	 *            CallableStatement hoac PreparedStatement
	 */
	public static void executeStatment(Work work) {
		getSession().doWork(work);
	}

	public static Long getSequence(String sequenceName) {
		String sql = " SELECT " + sequenceName + ".nextval FROM dual ";
		Query query = getSession().createSQLQuery(sql);
		BigDecimal bigDecimal = (BigDecimal) query.uniqueResult();
		return bigDecimal.longValue();
	}

	// TODO: Co mot ham getNextId cho ca getSequence va getAutoIncrement
	public static Long getAutoIncrement(String tableName) {
		String sql = " SELECT AUTO_INCREMENT "
				+ " FROM information_schema.TABLES "
				+ " WHERE TABLE_SCHEMA = DATABASE() "
				+ " AND UPPER(TABLE_NAME) = '" + tableName.toUpperCase() + "' ";
		SQLQuery query = createSQLQuery(sql);
		query.addScalar("AUTO_INCREMENT", StandardBasicTypes.LONG);
		query.setMaxResults(1);
		return (Long) query.uniqueResult();
	}

	public static <T> boolean duplicate(Class<T> className, String idColumn, Long idValue, String codeColumn,
			String codeValue) {
		String hql = " SELECT COUNT(*) "
				+ " FROM " + className.getName() + " t "
				+ " WHERE LOWER(t." + codeColumn + ") = ? ";
		if (idValue != null) {
			hql += " AND t." + idColumn + " != ? ";
		}
		Query query = createQuery(hql);
		query.setParameter(0, codeValue.trim().toLowerCase());
		if (idValue != null) {
			query.setParameter(1, idValue);
		}
		query.setMaxResults(1);
		Long count = (Long) query.uniqueResult();
		return count > 0;
	}

	public static <T> boolean hasConstraint(Class<T> className, String idColumn, Long idValue) {
		String hql = " SELECT COUNT(*) "
				+ " FROM " + className.getName() + " t "
				+ " WHERE t." + idColumn + " = ? ";
		Query query = createQuery(hql);
		query.setParameter(0, idValue);
		query.setMaxResults(1);
		Long count = (Long) query.uniqueResult();
		return count > 0;
	}

	/**
	 * Menh de ORDER, khong dung StringEscapeUtils.
	 *
	 * @param req
	 *            HttpServletRequest. De lay 'sort', 'dir' tu nguoi dung nhap vao.
	 * @param defaultColumn
	 *            Cot mac dinh
	 * @param whitelist
	 *            Danh sach cho phep
	 * @return
	 */
//	public static String getOrderByClause(HttpServletRequest req, String defaultColumn, String... whitelist) {
//		String inputColumn = req.getParameter("sort");
//		String direction = req.getParameter("dir");
//		String finalColumn = null;
//		if (inputColumn == null || inputColumn.isEmpty()) {
//			finalColumn = defaultColumn;
//		} else if (whitelist == null || whitelist.length == 0) {
//			finalColumn = defaultColumn;
//		} else {
//			for (String s : whitelist) {
//				if (inputColumn.equals(s)) {
//					finalColumn = inputColumn;
//					break;
//				}
//			}
//			if (finalColumn == null) {
//				finalColumn = defaultColumn;
//			}
//		}
//		return " ORDER BY " + finalColumn + (direction == null || direction.isEmpty() ? "" : " " + direction);
//	}

	// Filters
	public static void filter(String s, StringBuilder queryString, List<Object> paramList, String field) {
		if (s != null && !s.trim().equals("")) {
			queryString.append(" AND LOWER(").append(field).append(") LIKE ? ");
			paramList.add("%" + s.trim().toLowerCase() + "%");
		}
	}

	public static void filter(Long n, StringBuilder queryString, List<Object> paramList, String field) {
		if (n != null && n > 0) {
			queryString.append(" AND ").append(field).append(" = ? ");
			paramList.add(n);
		}
	}

	public static void filterGe(Object obj, StringBuilder queryString, List<Object> paramList, String field) {
		if (obj != null) {
			queryString.append(" AND ").append(field).append(" >= ? ");
			paramList.add(obj);
		}
	}

	public static void filterLe(Object obj, StringBuilder queryString, List<Object> paramList, String field) {
		if (obj != null) {
			queryString.append(" AND ").append(field).append(" <= ? ");
			paramList.add(obj);
		}
	}
}
