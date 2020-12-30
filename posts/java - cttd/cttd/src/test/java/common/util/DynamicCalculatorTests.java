package common.util;

import org.junit.Test;
import common.bean.DynamicExpression;

public class DynamicCalculatorTests {

	@Test
	public void test() {
		DynamicCalculator calc = new DynamicCalculator();
		
		calc.addExpression(new DynamicExpression("SENIOR", 6D));
		calc.addExpression(new DynamicExpression("POSITION_FACTOR", 3.9D));
		
		// Don't use PRIME_VARIABLE table
		// Use (only) EXPRESSION instead
		calc.addExpression(new DynamicExpression("tham_nien", "SENIOR", "SENIOR"));
		calc.addExpression(new DynamicExpression("he_so_chuc_danh", "POSITION_FACTOR", "POSITION_FACTOR"));
		
		calc.addExpression(new DynamicExpression("senior_salary", "SENIOR * 100", "SENIOR_SALARY"));
		calc.addExpression(new DynamicExpression("position_salary", "if(POSITION_FACTOR < 10, POSITION_FACTOR * 10, POSITION_FACTOR * 9)", "POSITION_SALARY"));
		calc.addExpression(new DynamicExpression("salary", "senior_salary + position_salary", "SALARY"));
		
		calc.calculate();
		System.out.println(calc);
	}
}
