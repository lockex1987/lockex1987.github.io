package org.o7planning.socialsecurity.signup;
 
import org.o7planning.socialsecurity.dao.MyUserAccountDAO;
import org.o7planning.socialsecurity.model.MyUserAccount;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;
 
public class MyConnectionSignUp implements ConnectionSignUp {
 
   private MyUserAccountDAO myUserAccountDAO;
 
   public MyConnectionSignUp(MyUserAccountDAO myUserAccountDAO) {
       this.myUserAccountDAO = myUserAccountDAO;
   }
 
  
   // Sau khi đăng nhập mạng xã hội xong.
   // Phương thức này sẽ được gọi để tạo ra một bản ghi User_Account tương ứng
   // nếu nó chưa tồn tại.
   @Override
   public String execute(Connection<?> connection) {
      
 
       MyUserAccount account=    myUserAccountDAO.createUserAccount(connection);
       return account.getId();
   }
 
}