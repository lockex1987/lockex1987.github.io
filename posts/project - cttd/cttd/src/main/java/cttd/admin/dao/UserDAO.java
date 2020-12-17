package cttd.admin.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import common.bean.PaginationList;
import cttd.admin.model.User;
import common.util.DBUtil;

@Repository
public class UserDAO {

	public PaginationList search(String query, Integer page) {
		StringBuilder queryString = new StringBuilder(" from User t where 1 = 1 ");
		List<Object> paramList = new ArrayList<Object>();

		if (!query.trim().isEmpty()) {
			queryString.append(" and ( lower(t.loginName) like ? or lower(t.fullName) like ? or lower(t.email) like ? or lower(t.phone) like ? ) ");
			query = "%" + query.trim().toLowerCase() + "%";
			paramList.add(query);
			paramList.add(query);
			paramList.add(query);
			paramList.add(query);
		}
		Query countQuery = DBUtil.createQuery(" select count(*) " + queryString);
		Query objectQuery = DBUtil.createQuery(" select t " + queryString + " order by t.id desc ");
		return new PaginationList(countQuery, objectQuery, page, 10, paramList, paramList);
	}

	public User getUserByLoginName(String loginName) {
		Query query = DBUtil.createQuery(" select t from User t where lower(t.loginName) = :loginName ");
		query.setParameter("loginName", loginName.toLowerCase());
		return (User) query.uniqueResult();
	}

	public boolean duplicateLoginName(String loginName, Long id) {
		// Chuẩn hóa lại id
		if (id == null) {
			id = 0L;
		}
		Query query = DBUtil
				.createQuery(" select t from User t where lower(t.loginName) = :loginName and t.id != :id ");
		query.setParameter("loginName", loginName.toLowerCase());
		query.setParameter("id", id);
		List<User> list = query.list();
		return !list.isEmpty();
	}
}
