/*
 * NVH
 */
package common.util;

import java.util.Date;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.PropertyUtilsBean;

/**
 * Copy value between 2 object.
 *
 * @author lockex1987
 */
public class MyBeanUtil {

	private static BeanUtilsBean beanUtils;

	static {
		init();
	}

	public static void copyProperties(Object dest, Object orig) throws Exception {
		beanUtils.copyProperties(dest, orig);
	}

	public static void populate(Object obj, Map map) throws Exception {
		beanUtils.populate(obj, map);
	}

	public static Map describe(Object obj) throws Exception {
		return beanUtils.describe(obj);
	}

	private static void init() {
		ConvertUtilsBean convertUtilsBean = new ConvertUtilsBean();
		convertUtilsBean.register(new LongConverter(), Long.class);
		convertUtilsBean.register(new DoubleConverter(), Double.class);
		convertUtilsBean.register(new DateConverter(), Date.class);
		convertUtilsBean.register(new StringConverter(), String.class);
		beanUtils = new BeanUtilsBean(convertUtilsBean, new PropertyUtilsBean());
	}
}
