/*
 * NVH
 */
package common.util;

import java.util.ArrayList;
import java.util.List;

import org.nfunk.jep.JEP;

import common.bean.DynamicExpression;

/**
 * Dynamic calculator. Extends JEP
 *
 * @author lockex1987
 */
public class DynamicCalculator {

	// List of expression
	private final List<DynamicExpression> expressionList;
	// JEP object
	private final JEP jep;

	public DynamicCalculator() {
		expressionList = new ArrayList<>();

		jep = new JEP();
		jep.addStandardFunctions();
		jep.setAllowUndeclared(false);
		jep.setAllowAssignment(false);
		jep.setImplicitMul(true);
	}

	/**
	 * Add a list of expressions.
	 *
	 * @param el
	 *            A list of expression
	 */
	public void addExpressionList(List<DynamicExpression> el) {
		if (el != null) {
			expressionList.addAll(el);
		}
	}

	/**
	 * Add an expression.
	 *
	 * @param expression
	 *            An expression
	 */
	public void addExpression(DynamicExpression expression) {
		expressionList.add(expression);
	}

	/**
	 * Get all information (to log).
	 */
	@Override
	public String toString() {
		StringBuilder output = new StringBuilder();
		for (DynamicExpression e : expressionList) {
			output.append(e.getName()).append(": ").append(e.getValue()).append("\n");
		}
		return output.toString();
	}

	/**
	 * Calculate all prime variables and expressions.
	 */
	public void calculate() {
		for (int i = 0; i < expressionList.size(); i++) {
			DynamicExpression e = expressionList.get(i);
			if (e.getType().equals(DynamicExpression.PRIMARY_TYPE)) {
				// Just add primary variable
				jep.addVariable(e.getName(), e.getValue());
			} else {
				// Calculate expression
				jep.parseExpression(e.getExpression());
				
				// Get return value
				Object value = jep.getValueAsObject();
				e.setValue(value);
				jep.addVariable(e.getName(), value);
			}
		}
	}

	/**
	 * Return expression list (for next process, e.g, insert into database).
	 *
	 * @return Expression list
	 */
	public List<DynamicExpression> getExpressionList() {
		return expressionList;
	}
}
