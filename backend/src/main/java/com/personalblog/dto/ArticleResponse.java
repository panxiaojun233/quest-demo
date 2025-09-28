package com.personalblog.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 文章响应DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponse {

    private Long id;
    private String title;
    private String content;
    private String summary;
    private Long authorId;
    private String authorName;
    private String status;
    private Integer viewCount;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    /**
     * 简化构造函数（用于列表展示）
     */
    public ArticleResponse(Long id, String title, String summary, Long authorId, String authorName, 
                          String status, Integer viewCount, LocalDateTime createTime, LocalDateTime updateTime) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.authorId = authorId;
        this.authorName = authorName;
        this.status = status;
        this.viewCount = viewCount;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}