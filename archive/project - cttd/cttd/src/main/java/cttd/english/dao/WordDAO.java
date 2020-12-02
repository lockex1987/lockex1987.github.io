package cttd.english.dao;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import common.util.DBUtil;
import cttd.english.model.Word;

@Repository
public class WordDAO {

	public List<Word> search(String filter) {
		String hql = " select new Word(id, word) from Word where lower(word) like ? order by word ";
		Query query = DBUtil.createQuery(hql);
		query.setParameter(0, filter.toLowerCase() + "%");
		query.setMaxResults(10);
		return query.list();
	}
	
	public List<Word> getAll() {
		String hql = " select new Word(id, word) from Word ";
		Query query = DBUtil.createQuery(hql);
		return query.list();
	} 
}
