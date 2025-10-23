package com.benefits.backend.entity;

import com.benefits.backend.entity.enums.AccumulatorType;
import com.benefits.backend.entity.enums.NetworkTier;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "accumulators")
public class Accumulator {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @Enumerated(EnumType.STRING)
    private AccumulatorType type;

    @Enumerated(EnumType.STRING)
    private NetworkTier tier;

    @Column(name = "limit_amount")
    private BigDecimal limitAmount;

    @Column(name = "used_amount")
    private BigDecimal usedAmount;
}
