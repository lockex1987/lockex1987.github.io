/*
 * NVH.
 */
package common.util;

import java.util.List;
import common.bean.PermissionBean;
import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

/**
 * Check token, fix bug CSRF.
 * Check permission.
 * Move to each controller.
 *
 * @author HuyenNV
 */
@Slf4j
public class ActionConfigUtil {

	public static final Long SAVE_CSRF = 1L;
	public static final Long CHECK_CSRF = 2L;

	private Map<String, Long> mapToken = new HashMap<>();
	private Map<String, PermissionBean> mapPermission = new HashMap<>();

	public ActionConfigUtil() {
		try {
			InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("actionConfig.xml");
			Element rootElement = new SAXReader().read(inputStream).getRootElement();
			List<Element> moduleList = rootElement.elements();
			for (Element module : moduleList) {
				List<Element> elements = module.elements();
				for (Element e : elements) {
					String path = e.attributeValue("path");
					String csrf = e.attributeValue("csrf");
					if (csrf != null) {
						if (csrf.equals("save")) {
							mapToken.put(path, SAVE_CSRF);
						} else if (csrf.equals("check")) {
							mapToken.put(path, CHECK_CSRF);
						}
					}

					String parameter = e.attributeValue("parameter");
					if (parameter != null) {
						String type = "SalaryOrganizationBO"; //permission.attributeValue("type");
						String operationKey = "action.view"; //permission.attributeValue("operationKey");
						String resourceKey = "resource.salary"; //permission.attributeValue("resourceKey");
						mapPermission.put(path, new PermissionBean(resourceKey, operationKey, type, parameter));
					}
				}
			}
		} catch (Throwable ex) {
			log.error("Loi khi khoi tao", ex);
		}
	}

	public Long getCsrfConfig(String path) {
		return mapToken.get(path);
	}

	public PermissionBean getPermissionConfig(String path) {
		return mapPermission.get(path);
	}
}
