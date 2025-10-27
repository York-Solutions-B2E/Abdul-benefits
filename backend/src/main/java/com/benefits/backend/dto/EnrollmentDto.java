package com.benefits.backend.dto;

import com.benefits.backend.entity.Accumulator;
import com.benefits.backend.entity.Member;
import com.benefits.backend.entity.Plan;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDto {
    private UUID id;
    private Member member;
    private Plan plan;
    private LocalDate coverageStart;
    private LocalDate coverageEnd;
    private Boolean active;
    private List<Accumulator> accumulators = new ArrayList<>();

}