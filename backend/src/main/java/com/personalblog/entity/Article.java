package com.personalblog.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 文章实体类
 */
@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "summary", length = 500)
    private String summary;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ArticleStatus status = ArticleStatus.DRAFT;

    @Column(name = "view_count", nullable = false)
    private Integer viewCount = 0;

    @CreatedDate
    @Column(name = "create_time", nullable = false, updatable = false)
    private LocalDateTime createTime;

    @LastModifiedDate
    @Column(name = "update_time", nullable = false)
    private LocalDateTime updateTime;

    /**
     * 文章状态枚举
     */
    public enum ArticleStatus {
        DRAFT("草稿"),
        PUBLISHED("已发布");

        private final String description;

        ArticleStatus(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    /**
     * 构造函数（用于创建文章）
     */
    public Article(String title, String content, String summary, Long authorId) {
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.authorId = authorId;
        this.status = ArticleStatus.DRAFT;
        this.viewCount = 0;
    }

    /**
     * 发布文章
     */
    public void publish() {
        this.status = ArticleStatus.PUBLISHED;
    }

    /**
     * 撤回为草稿
     */
    public void unpublish() {
        this.status = ArticleStatus.DRAFT;
    }

    /**
     * 增加阅读量
     */
    public void incrementViewCount() {
        this.viewCount++;
    }
}