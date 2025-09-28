package com.personalblog.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

/**
 * 分页响应DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {

    private List<T> content;        // 数据内容
    private Integer page;           // 当前页码（从0开始）
    private Integer size;           // 每页大小
    private Long totalElements;     // 总记录数
    private Integer totalPages;     // 总页数
    private Boolean first;          // 是否第一页
    private Boolean last;           // 是否最后一页
    private Boolean empty;          // 是否为空

    /**
     * 创建成功响应
     */
    public static <T> PageResponse<T> of(List<T> content, Integer page, Integer size, Long totalElements, Integer totalPages) {
        PageResponse<T> response = new PageResponse<>();
        response.setContent(content);
        response.setPage(page);
        response.setSize(size);
        response.setTotalElements(totalElements);
        response.setTotalPages(totalPages);
        response.setFirst(page == 0);
        response.setLast(page == totalPages - 1);
        response.setEmpty(content.isEmpty());
        return response;
    }
}