package com.ifi.boot.main;

import java.util.concurrent.ConcurrentLinkedQueue;

import javax.annotation.PostConstruct;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;

import org.apache.activemq.spring.ActiveMQConnectionFactory;
import org.apache.camel.CamelContext;
import org.apache.camel.ConsumerTemplate;
import org.apache.camel.Exchange;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.RoutesBuilder;
import org.apache.camel.TypeConverter;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.spring.SpringCamelContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;

import com.ifi.boot.jms.route.Route;
import com.ifi.boot.processing.SendAlert;
import com.ifi.boot.processing.sms.SendAlertSMS;

@SpringBootApplication
@ComponentScan(basePackages = "com.ifi.boot")
@PropertySource(value = { "classpath:jms.properties", "classpath:cassandra.properties",
		"classpath:application.properties" })
public class SendingAlertApplication {
	public static ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<String>();

	public static void main(String[] args) {
		SpringApplication.run(SendingAlertApplication.class, args);
//		SendAlertSMS alertSMS = new SendAlertSMS();
//		String message = SendAlert.getMessageTemplate();
//		alertSMS.sendSMS("84916245581", message);
	}

	@Autowired(required = false)
	private RoutesBuilder[] routesBuilders;
	@Autowired
	private ApplicationContext applicationContext;
	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private ResourceLoader resourceLoader;

	@Bean
	CamelContext camelContext() throws Exception {
		CamelContext camelContext = new SpringCamelContext(applicationContext);
		camelContext.getProperties().put(Exchange.LOG_DEBUG_BODY_MAX_CHARS, "-1");
		if (routesBuilders != null) {
			for (RoutesBuilder routesBuilder : routesBuilders) {
				camelContext.addRoutes(routesBuilder);
			}
		}
		return camelContext;
	}

	@Bean
	public ConnectionFactory ConnectionFactory(@Value("${broker.url}") String url,
			@Value("${broker.username}") String userName, @Value("${broker.password}") String password)
			throws JMSException {
		ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory();
		activeMQConnectionFactory.setTrustAllPackages(true);
		activeMQConnectionFactory.setBrokerURL(url);
		activeMQConnectionFactory.setUserName(userName);
		activeMQConnectionFactory.setPassword(password);

		return activeMQConnectionFactory;
	}

	@Bean
	public RouteBuilder routeBuilder() {
		return new Route();
	}

	@Bean
	ProducerTemplate producerTemplate() throws Exception {

		return camelContext().createProducerTemplate();
	}

	@Bean
	ConsumerTemplate consumerTemplate() throws Exception {
		return camelContext().createConsumerTemplate();

	}

	@Bean
	TypeConverter typeConverter() throws Exception {
		return camelContext().getTypeConverter();
	}

	// cassandra properties
	@Value("${cassandra.port}")
	private int cassandra_port;

	@Value("${cassandra.contactpoints}")
	private String[] cassandra_contactpoints;

	@Value("${sms.api.url}")
	private String urlSMSAPI;

	@Value("${sms.api.key}")
	private String apiKey;

	@Value("${csm.api.alert.userInfo}")
	private String urlAPICSMAlertUserInfo;

	@Value("${spring.mail.username}")
	private String emailSender;

	@PostConstruct
	public void postConstruct() {
		com.ifi.boot.processing.sms.SendAlertSMS.URL_API_SMS = this.urlSMSAPI;
		com.ifi.boot.processing.sms.SendAlertSMS.API_KEY = this.apiKey;
		com.ifi.boot.processing.SendAlert.resourceLoader = this.resourceLoader;
		com.ifi.boot.processing.mail.SendAlertEmail.javaMailSender = this.javaMailSender;
		com.ifi.boot.processing.SendAlert.URL_API_CSM_GET_USER_INFO = this.urlAPICSMAlertUserInfo;
		com.ifi.boot.processing.mail.SendAlertEmail.emailSender = this.emailSender;
		// com.ifi.boot.cas.common.ConnectionFactory.keyspace_premium =
		// keyspace_premium;
	}
}
