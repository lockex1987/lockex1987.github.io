package com.ifi.boot.jms.route;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;

import com.ifi.boot.jms.listener.BaseListener;


@PropertySource(value="classpath:jms.properties")
public class Route extends RouteBuilder {
    
	@Value("${route.to.alert}")
    private String toApp;   
    
	@Override
	public void configure() throws Exception {
		if (toApp != null && !toApp.isEmpty()) {
			from(toApp).bean(BaseListener.class);	
		}
	}

}
