package org.o7planning.socialsecurity.util;
 
import org.o7planning.socialsecurity.model.MyUserAccount;
import org.o7planning.socialsecurity.user.MySocialUserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
 
public class SecurityUtil {
 
  
   // Tự động đăng nhập.
   public static void logInUser(MyUserAccount user) {
 
       MySocialUserDetails userDetails = new MySocialUserDetails(user);
 
       Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
               userDetails.getAuthorities());
       SecurityContextHolder.getContext().setAuthentication(authentication);
   }
  
}