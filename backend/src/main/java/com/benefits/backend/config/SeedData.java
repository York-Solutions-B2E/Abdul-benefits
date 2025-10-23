package com.benefits.backend.config;


import com.benefits.backend.dto.PlanDto;
import com.benefits.backend.entity.Address;
import com.benefits.backend.entity.Plan;
import com.benefits.backend.entity.Provider;
import com.benefits.backend.entity.enums.PlanType;
import com.benefits.backend.mapper.PlanMapper;
import com.benefits.backend.repository.PlanRepository;
import com.benefits.backend.repository.ProviderRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SeedData {

    private final PlanRepository planRepository;
    private final ProviderRepository providerRepository;

    @PostConstruct
    public void seed() {
        if (planRepository.count() == 0) {
            List<PlanDto> planList = List.of(new PlanDto(null, "Basic HMO", PlanType.HMO, "Prime", 2025),
                    new PlanDto(null, "Gold PPO", PlanType.PPO, "Advantage", 2025),
                    new PlanDto(null, "Silver EPO", PlanType.EPO, "Essential", 2025));

            List<Plan> plans = planList.stream().map((plan) -> PlanMapper.dtoToPlan(plan)).collect(Collectors.toList());

            planRepository.saveAll(plans);

            System.out.println("Plan seed data loaded");
        }

        if (providerRepository.count() == 0) {
            providerRepository.saveAll(List.of(new Provider(null, "Springfield Clinic", "Family Medicine",
                            new Address("123 Main St", null, "Springfield", "IL", "62704"), "555-111-2222"),
                    new Provider(null, "Bright Dental", "Dentistry",
                            new Address("45 Smile Ave", null, "Springfield", "IL", "62703"), "555-333-4444"),
                    new Provider(null, "CardioCare Associates", "Cardiology",
                            new Address("78 Heart Blvd", null, "Springfield", "IL", "62702"), "555-555-6666")
            ));

            System.out.println("Provider seed data loaded");
        }

        System.out.println("Seed data loaded");
    }

}
