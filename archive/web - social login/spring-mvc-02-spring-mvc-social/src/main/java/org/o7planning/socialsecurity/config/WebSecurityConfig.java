package org.o7planning.socialsecurity.config;
 
import org.o7planning.socialsecurity.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.social.security.SpringSocialConfigurer;
 
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
 
   @Autowired
   private MyUserDetailsService myUserDetailsService;
 
   @Autowired
   public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
 
  
       // Sét đặt Service tải thông tin các User trong DB.
       auth.userDetailsService(myUserDetailsService);
   }
 
   @Override
   protected void configure(HttpSecurity http) throws Exception {
 
       http.csrf().disable();
 
    
       // Các trang không yêu cầu login
       http.authorizeRequests().antMatchers("/", "/signup", "/login", "/logout").permitAll();
 
    
       // Trang /userInfo yêu cầu phải login với vai trò ROLE_USER
       // Nếu chưa login, nó sẽ redirect tới trang /login.
       http.authorizeRequests().antMatchers("/userInfo").access("hasRole('ROLE_USER')");
 
       // Form Login config
       http.authorizeRequests().and().formLogin()//
               // Submit URL of login page.
               .loginProcessingUrl("/j_spring_security_check") // Submit URL
               .loginPage("/login")//
               .defaultSuccessUrl("/userInfo")//
               .failureUrl("/login?error=true")//
               .usernameParameter("username")//
               .passwordParameter("password");
 
       // Logout Config
       http.authorizeRequests().and().logout().logoutUrl("/logout").logoutSuccessUrl("/");
 
       // Spring Social Config.
       http.apply(new SpringSocialConfigurer())
               //
               .signupUrl("/signup");
 
   }
    
 
   // This bean is load the user specific data when form login is used.
   @Override
   public UserDetailsService userDetailsService() {
       return myUserDetailsService;
   }
    
}