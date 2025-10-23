package com.benefits.backend.entity;

import com.benefits.backend.entity.enums.ClaimStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "claim_status_events")
public class ClaimStatusEvent {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "claim_id", nullable = false)
    private Claim claim;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    @Column(name = "occurred_at")
    private OffsetDateTime occurredAt;

    private String note;
}
