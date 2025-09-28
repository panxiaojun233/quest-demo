package com.personalblog.controller;

import com.personalblog.dto.ApiResponse;
import com.personalblog.dto.UserProfileResponse;
import com.personalblog.dto.UserProfileUpdateRequest;
import com.personalblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * 用户控制器
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 获取当前用户信息
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getCurrentUser() {
        try {
            UserProfileResponse userProfile = userService.getCurrentUser();
            return ResponseEntity.ok(ApiResponse.success("获取用户信息成功", userProfile));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("获取用户信息失败"));
        }
    }

    /**
     * 更新用户信息
     */
    @PutMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserProfileUpdateRequest updateRequest) {
        ApiResponse response = userService.updateProfile(updateRequest);
        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * 根据用户ID获取用户公开信息
     */
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            UserProfileResponse userProfile = userService.getUserById(userId);
            return ResponseEntity.ok(ApiResponse.success("获取用户信息成功", userProfile));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("用户不存在"));
        }
    }
}