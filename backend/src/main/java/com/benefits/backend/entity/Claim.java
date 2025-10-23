package com.benefits.backend.entity;

import com.benefits.backend.entity.enums.ClaimStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "claims")
public class Claim {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "claim_number")
    private String claimNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false)
    private Provider provider;

    @Column(name = "service_start_date")
    private LocalDate serviceStartDate;

    @Column(name = "service_end_date")
    private LocalDate serviceEndDate;

    @Column(name = "received_date")
    private LocalDate receivedDate;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    @Column(name = "total_billed")
    private BigDecimal totalBilled;

    @Column(name = "total_allowed")
    private BigDecimal totalAllowed;

    @Column(name = "total_plan_paid")
    private BigDecimal totalPlanPaid;

    @Column(name = "total_member_responsibility")
    private BigDecimal totalMemberResponsibility;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "claim")
    private List<ClaimLine> lines;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "claim")
    private List<ClaimStatusEvent> statusHistory;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}
