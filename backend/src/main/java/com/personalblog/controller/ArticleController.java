package com.personalblog.controller;

import com.personalblog.dto.ApiResponse;
import com.personalblog.dto.ArticleRequest;
import com.personalblog.dto.ArticleResponse;
import com.personalblog.dto.PageResponse;
import com.personalblog.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * 文章控制器
 */
@RestController
@RequestMapping("/articles")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    /**
     * 获取已发布文章列表（公开访问）
     */
    @GetMapping
    public ResponseEntity<?> getPublishedArticles(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String search) {
        try {
            PageResponse<ArticleResponse> response = articleService.getPublishedArticles(page, size, search);
            return ResponseEntity.ok(ApiResponse.success("获取文章列表成功", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("获取文章列表失败"));
        }
    }

    /**
     * 根据ID获取文章详情（公开访问）
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable Long id) {
        try {
            ArticleResponse response = articleService.getArticleById(id);
            return ResponseEntity.ok(ApiResponse.success("获取文章详情成功", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("文章不存在"));
        }
    }

    /**
     * 创建文章（需要认证）
     */
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createArticle(@Valid @RequestBody ArticleRequest articleRequest) {
        ApiResponse response = articleService.createArticle(articleRequest);
        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * 更新文章（需要认证）
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateArticle(@PathVariable Long id, 
                                         @Valid @RequestBody ArticleRequest articleRequest) {
        ApiResponse response = articleService.updateArticle(id, articleRequest);
        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * 删除文章（需要认证）
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteArticle(@PathVariable Long id) {
        ApiResponse response = articleService.deleteArticle(id);
        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * 获取当前用户的文章列表（需要认证）
     */
    @GetMapping("/my")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getCurrentUserArticles(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String status) {
        try {
            PageResponse<ArticleResponse> response = articleService.getCurrentUserArticles(page, size, status);
            return ResponseEntity.ok(ApiResponse.success("获取我的文章列表成功", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("获取我的文章列表失败"));
        }
    }
}