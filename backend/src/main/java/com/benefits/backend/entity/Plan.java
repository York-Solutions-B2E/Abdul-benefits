package com.benefits.backend.entity;

import com.benefits.backend.entity.enums.PlanType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "plans")
public class Plan {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Enumerated(EnumType.STRING)
    private PlanType type;

    @Column(name = "network_name")
    private String networkName;

    @Column(name = "plan_year")
    private Integer planYear;
}


