/*
 * NVH.
 */
package common.bean;

/**
 * Dynamic Formula Expression, equivalent to Prime Variable and Expression.
 *
 * @author lockex1987
 */
public class DynamicExpression {

	// Primary variable
	public static final Long PRIMARY_TYPE = 0L;
	// Expression
	public static final Long MEDIATE_TYPE = 1L;

	// Name of variable or expression
	private String name;
	// Type: 0 - primary variable, 1 - expression
	private Long type;
	// Expression
	// If the bean is primary variable, field expression is empty
	private String expression;
	// Value of bean
	// If the bean is primary variable, field value is already defined
	private Object value;
	// Column in the database
	private String column;

	/**
	 * Constructor of a prime variable
	 * 
	 * @param name
	 * @param value
	 */
	public DynamicExpression(String name, Object value) {
		this.name = name;
		this.value = value;
		this.type = PRIMARY_TYPE;
	}

	/**
	 * Constructor of an expression
	 * 
	 * @param name
	 * @param expression
	 * @param column
	 */
	public DynamicExpression(String name, String expression, String column) {
		this.name = name;
		this.expression = expression;
		this.column = column;
		this.type = MEDIATE_TYPE;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getType() {
		return type;
	}

	public void setType(Long type) {
		this.type = type;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public String getColumn() {
		return column;
	}

	public void setColumn(String column) {
		this.column = column;
	}
}
