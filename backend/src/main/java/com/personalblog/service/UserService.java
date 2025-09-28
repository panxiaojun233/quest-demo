package com.personalblog.service;

import com.personalblog.dto.ApiResponse;
import com.personalblog.dto.UserProfileResponse;
import com.personalblog.dto.UserProfileUpdateRequest;
import com.personalblog.entity.User;
import com.personalblog.repository.UserRepository;
import com.personalblog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 用户信息服务
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * 获取当前用户信息
     */
    public UserProfileResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        return new UserProfileResponse(
            user.getId(), user.getUsername(), user.getEmail(), user.getNickname(),
            user.getBio(), user.getAvatar(), user.getCreateTime(), user.getUpdateTime()
        );
    }

    /**
     * 更新用户信息
     */
    @Transactional
    public ApiResponse updateProfile(UserProfileUpdateRequest updateRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 检查邮箱是否已被其他用户使用
        if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(updateRequest.getEmail())) {
                return ApiResponse.error("邮箱已被其他用户使用");
            }
            user.setEmail(updateRequest.getEmail());
        }

        // 更新其他信息
        if (updateRequest.getNickname() != null) {
            user.setNickname(updateRequest.getNickname());
        }
        if (updateRequest.getBio() != null) {
            user.setBio(updateRequest.getBio());
        }
        if (updateRequest.getAvatar() != null) {
            user.setAvatar(updateRequest.getAvatar());
        }

        userRepository.save(user);

        UserProfileResponse updatedProfile = new UserProfileResponse(
            user.getId(), user.getUsername(), user.getEmail(), user.getNickname(),
            user.getBio(), user.getAvatar(), user.getCreateTime(), user.getUpdateTime()
        );

        return ApiResponse.success("用户信息更新成功", updatedProfile);
    }

    /**
     * 根据用户ID获取用户信息（公开信息）
     */
    public UserProfileResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        return new UserProfileResponse(
            user.getId(), user.getUsername(), null, user.getNickname(), // 不返回邮箱
            user.getBio(), user.getAvatar(), user.getCreateTime(), user.getUpdateTime()
        );
    }
}