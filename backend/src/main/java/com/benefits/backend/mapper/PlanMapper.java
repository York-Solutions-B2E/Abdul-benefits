package com.benefits.backend.mapper;

import com.benefits.backend.dto.PlanDto;
import com.benefits.backend.entity.Plan;

public class PlanMapper {

    public static PlanDto planToDto(Plan plan) {

        return new PlanDto(
                plan.getId(),
                plan.getName(),
                plan.getType(),
                plan.getNetworkName(),
                plan.getPlanYear()
        );
    }

    public static  Plan dtoToPlan(PlanDto planDto) {
        Plan plan = new Plan();
        plan.setName( planDto.getName());
        plan.setType( planDto.getType());
        plan.setNetworkName(planDto.getNetworkName());
        plan.setPlanYear(planDto.getPlanYear());
        return plan;
    }
}
