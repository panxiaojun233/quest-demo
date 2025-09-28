package com.personalblog.service;

import com.personalblog.dto.ApiResponse;
import com.personalblog.dto.ArticleRequest;
import com.personalblog.dto.ArticleResponse;
import com.personalblog.dto.PageResponse;
import com.personalblog.entity.Article;
import com.personalblog.entity.User;
import com.personalblog.repository.ArticleRepository;
import com.personalblog.repository.UserRepository;
import com.personalblog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 文章服务
 */
@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * 获取已发布文章列表（分页）
     */
    public PageResponse<ArticleResponse> getPublishedArticles(Integer page, Integer size, String search) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Article> articlePage;
        
        if (search != null && !search.trim().isEmpty()) {
            articlePage = articleRepository.findPublishedArticlesByTitleContaining(search, pageable);
        } else {
            articlePage = articleRepository.findPublishedArticles(pageable);
        }

        List<ArticleResponse> articleResponses = articlePage.getContent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return PageResponse.of(
            articleResponses,
            articlePage.getNumber(),
            articlePage.getSize(),
            articlePage.getTotalElements(),
            articlePage.getTotalPages()
        );
    }

    /**
     * 根据ID获取文章详情
     */
    @Transactional
    public ArticleResponse getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("文章不存在"));

        // 如果是已发布的文章，增加阅读量
        if (article.getStatus() == Article.ArticleStatus.PUBLISHED) {
            article.incrementViewCount();
            articleRepository.save(article);
        }

        return convertToResponse(article);
    }

    /**
     * 创建文章
     */
    @Transactional
    public ApiResponse createArticle(ArticleRequest articleRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Article article = new Article();
        article.setTitle(articleRequest.getTitle());
        article.setContent(articleRequest.getContent());
        article.setSummary(articleRequest.getSummary());
        article.setAuthorId(userPrincipal.getId());
        
        // 设置文章状态
        if ("PUBLISHED".equals(articleRequest.getStatus())) {
            article.setStatus(Article.ArticleStatus.PUBLISHED);
        } else {
            article.setStatus(Article.ArticleStatus.DRAFT);
        }

        Article savedArticle = articleRepository.save(article);
        ArticleResponse response = convertToResponse(savedArticle);

        return ApiResponse.success("文章创建成功", response);
    }

    /**
     * 更新文章
     */
    @Transactional
    public ApiResponse updateArticle(Long id, ArticleRequest articleRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("文章不存在"));

        // 检查文章所有权
        if (!article.getAuthorId().equals(userPrincipal.getId())) {
            return ApiResponse.error("无权限修改此文章");
        }

        article.setTitle(articleRequest.getTitle());
        article.setContent(articleRequest.getContent());
        article.setSummary(articleRequest.getSummary());
        
        // 更新文章状态
        if ("PUBLISHED".equals(articleRequest.getStatus())) {
            article.setStatus(Article.ArticleStatus.PUBLISHED);
        } else {
            article.setStatus(Article.ArticleStatus.DRAFT);
        }

        Article updatedArticle = articleRepository.save(article);
        ArticleResponse response = convertToResponse(updatedArticle);

        return ApiResponse.success("文章更新成功", response);
    }

    /**
     * 删除文章
     */
    @Transactional
    public ApiResponse deleteArticle(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("文章不存在"));

        // 检查文章所有权
        if (!article.getAuthorId().equals(userPrincipal.getId())) {
            return ApiResponse.error("无权限删除此文章");
        }

        articleRepository.delete(article);
        return ApiResponse.success("文章删除成功");
    }

    /**
     * 获取当前用户的文章列表（分页）
     */
    public PageResponse<ArticleResponse> getCurrentUserArticles(Integer page, Integer size, String status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Pageable pageable = PageRequest.of(page, size);
        Page<Article> articlePage;

        if (status != null && !status.trim().isEmpty()) {
            Article.ArticleStatus articleStatus = Article.ArticleStatus.valueOf(status.toUpperCase());
            articlePage = articleRepository.findByAuthorIdAndStatusOrderByCreateTimeDesc(
                userPrincipal.getId(), articleStatus, pageable);
        } else {
            articlePage = articleRepository.findByAuthorIdOrderByCreateTimeDesc(userPrincipal.getId(), pageable);
        }

        List<ArticleResponse> articleResponses = articlePage.getContent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return PageResponse.of(
            articleResponses,
            articlePage.getNumber(),
            articlePage.getSize(),
            articlePage.getTotalElements(),
            articlePage.getTotalPages()
        );
    }

    /**
     * 将Article实体转换为ArticleResponse
     */
    private ArticleResponse convertToResponse(Article article) {
        User author = userRepository.findById(article.getAuthorId()).orElse(null);
        String authorName = author != null ? (author.getNickname() != null ? author.getNickname() : author.getUsername()) : "未知用户";

        return new ArticleResponse(
            article.getId(),
            article.getTitle(),
            article.getContent(),
            article.getSummary(),
            article.getAuthorId(),
            authorName,
            article.getStatus().name(),
            article.getViewCount(),
            article.getCreateTime(),
            article.getUpdateTime()
        );
    }
}