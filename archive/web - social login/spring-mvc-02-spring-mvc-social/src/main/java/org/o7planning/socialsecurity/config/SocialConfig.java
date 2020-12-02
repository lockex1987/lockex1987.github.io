package org.o7planning.socialsecurity.config;

import javax.sql.DataSource;

import org.o7planning.socialsecurity.dao.MyUserAccountDAO;
import org.o7planning.socialsecurity.signup.MyConnectionSignUp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurer;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.jdbc.JdbcUsersConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
//import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.google.connect.GoogleConnectionFactory;
//import org.springframework.social.linkedin.connect.LinkedInConnectionFactory;
import org.springframework.social.security.AuthenticationNameUserIdSource;
//import org.springframework.social.twitter.connect.TwitterConnectionFactory;

@Configuration
@EnableSocial
// Load to Environment.
@PropertySource("classpath:social-cfg.properties")
public class SocialConfig implements SocialConfigurer {

	private boolean autoSignUp = false;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private MyUserAccountDAO myUserAccountDAO;

	// @env: Đọc vào file properties cấu hình bởi @PropertySource
	@Override
	public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment env) {

		// Twitter
//		TwitterConnectionFactory tfactory = new TwitterConnectionFactory(
//				env.getProperty("twitter.consumer.key"),
//				env.getProperty("twitter.consumer.secret"));

		// tfactory.setScope(env.getProperty("twitter.scope"));

//		cfConfig.addConnectionFactory(tfactory);

		// Facebook
//		FacebookConnectionFactory ffactory = new FacebookConnectionFactory(
//				env.getProperty("facebook.app.id"), //
//				env.getProperty("facebook.app.secret"));
//
//		ffactory.setScope(env.getProperty("facebook.scope"));

		// auth_type=reauthenticate

//		cfConfig.addConnectionFactory(ffactory);

		// Linkedin
//		LinkedInConnectionFactory lfactory = new LinkedInConnectionFactory(
//				env.getProperty("linkedin.consumer.key"),
//				env.getProperty("linkedin.consumer.secret"));
//
//		lfactory.setScope(env.getProperty("linkedin.scope"));
//
//		cfConfig.addConnectionFactory(lfactory);

		// Google
		GoogleConnectionFactory gfactory = new GoogleConnectionFactory(//
				env.getProperty("google.client.id"), //
				env.getProperty("google.client.secret"));

		gfactory.setScope(env.getProperty("google.scope"));

		cfConfig.addConnectionFactory(gfactory);
	}

	// The UserIdSource determines the userID of the user.
	@Override
	public UserIdSource getUserIdSource() {
		return new AuthenticationNameUserIdSource();
	}

	// Đọc và ghi vào bảng USERCONNECTION.
	@Override
	public UsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {

		// org.springframework.social.security.SocialAuthenticationServiceRegistry
		JdbcUsersConnectionRepository usersConnectionRepository = new JdbcUsersConnectionRepository(dataSource,
				connectionFactoryLocator,

				Encryptors.noOpText());

		if (autoSignUp) {
			// Cấu hình để:
			// Sau khi đăng nhập vào mạng xã hội.
			// Tự động tạo ra USER_ACCOUNT tương ứng nếu chưa có.
			ConnectionSignUp connectionSignUp = new MyConnectionSignUp(myUserAccountDAO);
			usersConnectionRepository.setConnectionSignUp(connectionSignUp);
		} else {
			// Cấu hình để:
			// Sau khi đăng nhập vào mạng xã hội.
			// Nếu không tìm thấy bản ghi USER_ACCOUNT tương ứng
			// Chuyển tới trang đăng ký.
			usersConnectionRepository.setConnectionSignUp(null);
		}
		return usersConnectionRepository;
	}

	// This bean manages the connection flow between the account provider and
	// the example application.
	@Bean
	public ConnectController connectController(ConnectionFactoryLocator connectionFactoryLocator, //
			ConnectionRepository connectionRepository) {
		return new ConnectController(connectionFactoryLocator, connectionRepository);
	}

}