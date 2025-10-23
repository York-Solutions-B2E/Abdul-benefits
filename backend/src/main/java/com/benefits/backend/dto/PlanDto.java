package com.benefits.backend.dto;


import com.benefits.backend.entity.enums.PlanType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlanDto {

    private UUID id;
    private String name;
    private PlanType type;
    private String networkName;
    private Integer planYear;

}
