package cttd.admin.dao;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import common.bean.PaginationList;
import cttd.admin.dao.UserDAO;
import cttd.admin.model.User;
import lombok.extern.slf4j.Slf4j;
import common.util.DBUtil;

@Slf4j
public class UserDAOTests {

	private UserDAO userDAO = new UserDAO();

	@After
	public void closeConnection() {
		DBUtil.commitTransaction();
		DBUtil.closeSession();
	}

	@Before
	public void openConnection() {
		DBUtil.openThreadSession();
		DBUtil.beginTransaction();
	}

	@Test
	public void searchTest() {
		PaginationList pl = userDAO.search("", 0);
		List<User> list = pl.getItems();
		for (User u : list) {
			log.info(u.toString());
		}
	}
}
