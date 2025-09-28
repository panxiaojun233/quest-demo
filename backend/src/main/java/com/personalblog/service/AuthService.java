package com.personalblog.service;

import com.personalblog.dto.*;
import com.personalblog.entity.User;
import com.personalblog.repository.UserRepository;
import com.personalblog.security.JwtUtils;
import com.personalblog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 用户认证服务
 */
@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * 用户登录
     */
    public JwtResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        LocalDateTime expiresAt = LocalDateTime.now().plusDays(1); // 24小时后过期

        return new JwtResponse(jwt, userPrincipal.getId(), userPrincipal.getUsername(), 
                              userPrincipal.getEmail(), null, expiresAt);
    }

    /**
     * 用户注册
     */
    @Transactional
    public ApiResponse register(RegisterRequest registerRequest) {
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ApiResponse.error("用户名已存在");
        }

        // 检查邮箱是否已存在
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ApiResponse.error("邮箱已被注册");
        }

        // 创建新用户
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setNickname(registerRequest.getNickname() != null ? registerRequest.getNickname() : registerRequest.getUsername());

        userRepository.save(user);

        return ApiResponse.success("用户注册成功");
    }

    /**
     * 验证Token
     */
    public ApiResponse validateToken(String token) {
        if (jwtUtils.validateJwtToken(token)) {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            User user = userRepository.findByUsername(username).orElse(null);
            
            if (user != null) {
                UserProfileResponse userProfile = new UserProfileResponse(
                    user.getId(), user.getUsername(), user.getEmail(), user.getNickname(),
                    user.getBio(), user.getAvatar(), user.getCreateTime(), user.getUpdateTime()
                );
                return ApiResponse.success("Token有效", userProfile);
            }
        }
        return ApiResponse.error("Token无效");
    }
}