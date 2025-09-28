package com.personalblog.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * JWT认证响应DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String nickname;
    private LocalDateTime expiresAt;

    public JwtResponse(String accessToken, Long id, String username, String email, String nickname, LocalDateTime expiresAt) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.nickname = nickname;
        this.expiresAt = expiresAt;
    }
}