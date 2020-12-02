package cttd.admin.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import common.bean.PaginationList;
import common.util.DBUtil;

@Repository
public class RoleDAO {

	public PaginationList search(String query, Integer page) {
		StringBuilder queryString = new StringBuilder(" from Role t where 1 = 1 ");
		List<Object> paramList = new ArrayList<>();

		if (!query.trim().isEmpty()) {
			queryString.append(" and ( lower(t.code) like ? or lower(t.name) like ? ) ");
			query = "%" + query.trim().toLowerCase() + "%";
			paramList.add(query);
			paramList.add(query);
		}
		Query countQuery = DBUtil.createQuery(" select count(*) " + queryString);
		Query objectQuery = DBUtil.createQuery(" select t " + queryString + " order by t.id desc ");
		return new PaginationList(countQuery, objectQuery, page, 10, paramList, paramList);
	}
}
