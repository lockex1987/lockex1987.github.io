package org.o7planning.socialsecurity.mapper;
 
import java.sql.ResultSet;
import java.sql.SQLException;
 
import org.o7planning.socialsecurity.model.MyUserAccount;
import org.springframework.jdbc.core.RowMapper;
 
public class MyUserAccountMapper implements RowMapper<MyUserAccount> {
 
    @Override
    public MyUserAccount mapRow(ResultSet rs, int rowNum) throws SQLException {
 
        String id = rs.getString("id");
  
        String email = rs.getString("email");
        String userName= rs.getString("user_name");
        String firstName = rs.getString("first_name");
        String lastName = rs.getString("last_name");
        String password = rs.getString("password");
        String role = rs.getString("role");
 
        return new MyUserAccount(id, email,userName, firstName, //
                lastName, password, //
                role );
    }
 
}