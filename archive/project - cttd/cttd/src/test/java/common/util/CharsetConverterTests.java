package common.util;

import java.util.List;

public class CharsetConverterTests {

	public void convertCharset() {
		List<Object[]> list = getList();
		updateList(list);
	}

	private List<Object[]> getList() {
		// Query selectQuery = DBUtil.createQuery(" SELECT incomeTaxpayerDeclareId, fullName "
		// + " FROM IncomeTaxpayerDeclareBO "
		// + " WHERE (fullName LIKE ? "
		// + " OR fullName LIKE ? "
		// + " OR fullName LIKE ? "
		// + " OR fullName LIKE ? "
		// + " OR fullName LIKE ?) ");
		// char[] marks = CharsetConverter.getMarkCharacters();
		// for (int i = 0; i < marks.length; i++) {
		// selectQuery.setParameter(i, "%" + marks[i] + "%");
		// }
		// List<Object[]> list = selectQuery.list();
		// return list;

		return null;
	}

	private void updateList(List<Object[]> list) {
		// Query updateQuery = DBUtil.createQuery(" UPDATE IncomeTaxpayerDeclareBO "
		// + " SET fullName = ? "
		// + " WHERE incomeTaxpayerDeclareId = ? ");

		System.out.println(list.size());
		int count = 1;
		for (Object[] a : list) {
			Long incomeTaxpayerDeclareId = (Long) a[0];
			String oldName = (String) a[1];
			String newName = CharsetConverter.convertCp1258ToUTF8(oldName);
			System.out.println(count + ". " + oldName + " --> " + newName);
			count++;

			// updateQuery.setParameter(0, newName);
			// updateQuery.setParameter(1, incomeTaxpayerDeclareId);
			// updateQuery.executeUpdate();
		}
	}
}
