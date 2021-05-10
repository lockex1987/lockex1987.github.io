/*
 * NVH.
 */
package app.util;

import common.util.CommonUtils;

/**
 *
 * @author gpdn_huyennv1
 */
public class Utils {

    public static final String OUTPUT_FOLDER = "_output/";
    public static final String CONFIG_FILE = CommonUtils.getAbsolutePathByClassLoader("application.properties");

    /**
     * Chuyen xau kieu CSDL sang xau kieu Java, ky tu dau tien viet thuong.
     *
     * @param input Xau dang ABC_DEF
     * @return Xau dang abcDef
     */
    public static String columnName(String input) {
        try {
            String output = "";
            for (int i = 0; i < input.length(); i++) {
                if (input.charAt(i) == '_') {
                    i++;
                    output += Character.toUpperCase(input.charAt(i));
                } else {
                    output += Character.toLowerCase(input.charAt(i));
                }
            }
            return output;
        } catch (Exception ex) {
            return "ABC";
        }
    }

    /**
     * Viet hoa ky tu dau tien.
     *
     * @param input Xau dau vao dang abcDef
     * @return Xau dang AbcDef
     */
    public static String tableName(String input) {
        input = columnName(input);
        return Character.toUpperCase(input.charAt(0)) + input.substring(1);
    }

    /**
     * Alias cua bang.
     *
     * @param input Xau dang ABC_DEF
     * @return ADF
     */
    public static String alias(String input) {
        String output = "";
        output += input.charAt(0);
        for (int i = 1; i < input.length() - 1; i++) {
            if (input.charAt(i) == '_') {
                i++;
                output += input.charAt(i);
            }
        }
        output += input.charAt(input.length() - 1);
        return output;
    }
}
