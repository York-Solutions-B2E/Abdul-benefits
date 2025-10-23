package com.benefits.backend.util;

import com.benefits.backend.entity.Claim;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@AllArgsConstructor
@Data
public class ClaimPage {
    private List<Claim> content;
    private long totalElements;
    private int totalPages;
    private int currentPage;

    public ClaimPage(Page<Claim> page) {
        this.content = page.getContent();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.currentPage = page.getNumber();
    }

}
