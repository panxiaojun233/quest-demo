package com.personalblog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * JPA配置类
 * 启用JPA审计功能，自动设置创建时间和更新时间
 */
@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.personalblog.repository")
public class JpaConfig {
}