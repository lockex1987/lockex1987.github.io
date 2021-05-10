/*
 * NVH.
 */
package dba.service;

import common.util.Jdbc;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

/**
 *
 * @author huyennv
 */
public class CharsetConverter {

    private static final char[] MARK = new char[]{
        '̀', '́', '̃', '̉', '̣'
    };
    private static final char[] VOWEL = new char[]{
        'a',
        'ă',
        'â',
        'e',
        'ê',
        'i',
        'o',
        'ô',
        'ơ',
        'u',
        'ư',
        'y',
        'A',
        'Ă',
        'Â',
        'E',
        'Ê',
        'I',
        'O',
        'Ô',
        'Ơ',
        'U',
        'Ư',
        'Y'
    };
    private static final char[] CP1258_TO_UTF8 = new char[]{
        'à', 'á', 'ã', 'ả', 'ạ',
        'ằ', 'ắ', 'ẵ', 'ẳ', 'ặ',
        'ầ', 'ấ', 'ẫ', 'ẩ', 'ậ',
        'è', 'é', 'ẽ', 'ẻ', 'ẹ',
        'ề', 'ế', 'ễ', 'ể', 'ệ',
        'ì', 'í', 'ĩ', 'ỉ', 'ị',
        'ò', 'ó', 'õ', 'ỏ', 'ọ',
        'ồ', 'ố', 'ỗ', 'ổ', 'ộ',
        'ờ', 'ớ', 'ỡ', 'ở', 'ợ',
        'ù', 'ú', 'ũ', 'ủ', 'ụ',
        'ừ', 'ứ', 'ữ', 'ử', 'ự',
        'ỳ', 'ý', 'ỹ', 'ỷ', 'ỵ',
        'À', 'Á', 'Ã', 'Ả', 'Ạ',
        'Ằ', 'Ắ', 'Ẵ', 'Ẳ', 'Ặ',
        'Ầ', 'Ấ', 'Ẫ', 'Ẩ', 'Ậ',
        'È', 'É', 'Ẽ', 'Ẻ', 'Ẹ',
        'Ề', 'Ế', 'Ễ', 'Ể', 'Ệ',
        'Ì', 'Í', 'Ĩ', 'Ỉ', 'Ị',
        'Ò', 'Ó', 'Õ', 'Ỏ', 'Ọ',
        'Ồ', 'Ố', 'Ỗ', 'Ổ', 'Ộ',
        'Ờ', 'Ớ', 'Ỡ', 'Ở', 'Ợ',
        'Ù', 'Ú', 'Ũ', 'Ủ', 'Ụ',
        'Ừ', 'Ứ', 'Ữ', 'Ử', 'Ự',
        'Ỳ', 'Ý', 'Ỹ', 'Ỷ', 'Ỵ'
    };

    public CharsetConverter() throws Exception {
        // Step 1: Initiate database connection
        Connection con = Jdbc.openDatabase("./_etc/src.properties");

        // Step 2: Initiate query object
        String select = " SELECT income_taxpayer_declare_id, full_name "
                + " FROM Income_Taxpayer_Declare "
                + " WHERE full_name LIKE ? "
                + " OR full_name LIKE ? "
                + " OR full_name LIKE ? "
                + " OR full_name LIKE ? "
                + " OR full_name LIKE ? ";
        String update = " UPDATE Income_Taxpayer_Declare SET full_name = ? WHERE income_taxpayer_declare_id = ? ";
        CallableStatement stm = con.prepareCall(select);
        for (int i = 0; i < MARK.length; i++) {
            stm.setString(i + 1, "%" + MARK[i] + "%");
        }
        ResultSet rs = stm.executeQuery();
        CallableStatement cs = con.prepareCall(update);

        // Step 3: Process data
        int count = 1;
        while (rs.next()) {
            String oldName = rs.getString(2);
            if (oldName != null) {
                String newName = convertCp1258ToUTF8(oldName);
                if (oldName.length() != newName.length()) {
                    System.out.println(count + ". " + oldName + " --> " + newName);
                    count++;
                    int id = rs.getInt(1);
                    cs.setString(1, newName);
                    cs.setInt(2, id);
                    cs.executeUpdate();
                }
            }
        }
        
        // Step 4: Close resources
        rs.close();
        stm.close();
        cs.close();
        con.close();
    }

    public static String convertCp1258ToUTF8(String input) {
        int i = 1;
        while (i < input.length()) {
            char c = input.charAt(i);
            int idx = MARK.length - 1;
            while ((idx >= 0) && (MARK[idx] != c)) {
                idx--;
            }
            if (idx >= 0) {
                char pre = input.charAt(i - 1);
                for (int k = 0; k < VOWEL.length; k++) {
                    if (pre == VOWEL[k]) {
                        input = input.substring(0, i - 1)
                                + CP1258_TO_UTF8[k * MARK.length + idx]
                                + input.substring(i + 1);
                        break;
                    }
                }
            }
            i++;
        }
        return input;
    }
}
