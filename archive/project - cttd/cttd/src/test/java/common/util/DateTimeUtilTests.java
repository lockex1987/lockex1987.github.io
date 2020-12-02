package common.util;

import org.junit.*;
import static org.junit.Assert.*;

public class DateTimeUtilTests {

	// Run once, e.g. Database connection, connection pool
	@BeforeClass
	public static void runOnceBeforeClass() {
		System.out.println("@BeforeClass - runOnceBeforeClass");
	}

	// Run once, e.g close connection, cleanup
	@AfterClass
	public static void runOnceAfterClass() {
		System.out.println("@AfterClass - runOnceAfterClass");
	}

	// Should rename to @BeforeTestMethod
	// e.g. Creating an similar object and share for all @Test
	@Before
	public void runBeforeTestMethod() {
		System.out.println("  @Before - runBeforeTestMethod");
	}

	// Should rename to @AfterTestMethod
	@After
	public void runAfterTestMethod() {
		System.out.println("  @After - runAfterTestMethod");
	}

	@Test
	public void test_method_1() {
		System.out.println("    @Test - test_method_1");
	}

	@Test
	public void test_method_2() {
		System.out.println("    @Test - test_method_2");
	}
	
	@Test
	public void testGetDayOfMonth() {
		assertEquals(DateTimeUtil.getDaysOfMonth(2, 2016), 29);
	}
}
