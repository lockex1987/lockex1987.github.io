/*
 * NVH.
 */
package common.bean;

/**
 * Lop Bean quan ly quyen.
 *
 * @author BienNV1
 */
public class PermissionBean {

	private String resourceKey;
	private String operationKey;
	private String type;
	private String parameter;

	public PermissionBean(String resourceKey, String operationKey, String type, String parameter) {
		this.resourceKey = resourceKey;
		this.operationKey = operationKey;
		this.type = type;
		this.parameter = parameter;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public String getOperationKey() {
		return operationKey;
	}

	public void setOperationKey(String operationKey) {
		this.operationKey = operationKey;
	}

	public String getResourceKey() {
		return resourceKey;
	}

	public void setResourceKey(String resourceKey) {
		this.resourceKey = resourceKey;
	}
}
