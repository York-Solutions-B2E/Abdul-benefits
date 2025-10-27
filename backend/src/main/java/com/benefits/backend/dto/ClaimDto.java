package com.benefits.backend.dto;

import com.benefits.backend.entity.ClaimLine;
import com.benefits.backend.entity.ClaimStatusEvent;
import com.benefits.backend.entity.Member;
import com.benefits.backend.entity.Provider;
import com.benefits.backend.entity.enums.ClaimStatus;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClaimDto {
    private UUID id;
    private String claimNumber;
    private Member member;
    private Provider provider;
    private LocalDate serviceStartDate;
    private LocalDate serviceEndDate;
    private LocalDate receivedDate;
    private ClaimStatus status;
    private BigDecimal totalBilled;
    private BigDecimal totalAllowed;
    private BigDecimal totalPlanPaid;
    private BigDecimal totalMemberResponsibility;
    private List<ClaimLine> lines;
    private List<ClaimStatusEvent> statusHistory;
    private OffsetDateTime updatedAt;
}
