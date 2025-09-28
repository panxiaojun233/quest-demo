package com.personalblog.repository;

import com.personalblog.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 文章数据访问层
 */
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    /**
     * 根据作者ID查找文章列表
     */
    List<Article> findByAuthorIdOrderByCreateTimeDesc(Long authorId);

    /**
     * 根据作者ID分页查找文章
     */
    Page<Article> findByAuthorIdOrderByCreateTimeDesc(Long authorId, Pageable pageable);

    /**
     * 查找已发布的文章
     */
    @Query("SELECT a FROM Article a WHERE a.status = 'PUBLISHED' ORDER BY a.createTime DESC")
    Page<Article> findPublishedArticles(Pageable pageable);

    /**
     * 根据标题模糊查询已发布的文章
     */
    @Query("SELECT a FROM Article a WHERE a.status = 'PUBLISHED' AND a.title LIKE %:title% ORDER BY a.createTime DESC")
    Page<Article> findPublishedArticlesByTitleContaining(@Param("title") String title, Pageable pageable);

    /**
     * 根据作者ID和文章状态查找文章
     */
    Page<Article> findByAuthorIdAndStatusOrderByCreateTimeDesc(Long authorId, Article.ArticleStatus status, Pageable pageable);

    /**
     * 查找作者的已发布文章
     */
    @Query("SELECT a FROM Article a WHERE a.authorId = :authorId AND a.status = 'PUBLISHED' ORDER BY a.createTime DESC")
    Page<Article> findPublishedArticlesByAuthor(@Param("authorId") Long authorId, Pageable pageable);

    /**
     * 获取已发布文章总数
     */
    @Query("SELECT COUNT(a) FROM Article a WHERE a.status = 'PUBLISHED'")
    long countPublishedArticles();

    /**
     * 获取作者的文章总数
     */
    long countByAuthorId(Long authorId);
}