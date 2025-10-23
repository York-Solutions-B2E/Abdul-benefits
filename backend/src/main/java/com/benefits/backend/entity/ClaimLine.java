package com.benefits.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "claim_lines")
public class ClaimLine {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "claim_id", nullable = false)
    private Claim claim;

    @Column(name = "line_number")
    private Integer lineNumber;

    @Column(name = "cpt_code")
    private String cptCode;

    private String description;

    @Column(name = "billed_amount")
    private BigDecimal billedAmount;

    @Column(name = "allowed_amount")
    private BigDecimal allowedAmount;

    @Column(name = "deductible_applied")
    private BigDecimal deductibleApplied;

    @Column(name = "copay_applied")
    private BigDecimal copayApplied;

    @Column(name = "coinsurance_applied")
    private BigDecimal coinsuranceApplied;

    @Column(name = "plan_paid")
    private BigDecimal planPaid;

    @Column(name = "member_responsibility")
    private BigDecimal memberResponsibility;

}
