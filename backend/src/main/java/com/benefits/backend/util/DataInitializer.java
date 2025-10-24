package com.benefits.backend.util;


import com.benefits.backend.entity.*;
import com.benefits.backend.entity.enums.AccumulatorType;
import com.benefits.backend.entity.enums.ClaimStatus;
import com.benefits.backend.entity.enums.NetworkTier;
import com.benefits.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final PlanRepository planRepo;
    private final ProviderRepository providerRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final ClaimRepository claimRepo;
    private final ClaimLineRepository claimLineRepo;
    private final ClaimStatusEventRepository claimStatusEventRepo;
    private final MemberRepository memberRepo;

    public String createInitialDataForMember(Member member) {
        if (member == null) throw new IllegalStateException("No member provided");
        if (enrollmentRepo.findByMember_id(member.getId()) != null) return "Already seeded!";

        // Pick a plan & provider
        Plan plan = planRepo.findAll().stream().findFirst().orElse(null);
        Provider provider = providerRepo.findAll().stream().findFirst().orElse(null);

        if (plan == null) throw new IllegalStateException("No plan found");
        if (provider == null) throw new IllegalStateException("No provider found");

        // Enrollment


        LocalDate now = LocalDate.now();

        Enrollment pastEnrollment1 = new Enrollment();
        pastEnrollment1.setMember(member);
        pastEnrollment1.setPlan(plan);
        pastEnrollment1.setCoverageStart(now.minusYears(2).withDayOfYear(1)); // Jan 1, 2 years ago
        pastEnrollment1.setCoverageEnd(now.minusYears(2).withMonth(12).withDayOfMonth(31)); // Dec 31, 2 years ago
        pastEnrollment1.setActive(false);

        Enrollment pastEnrollment2 = new Enrollment();
        pastEnrollment2.setMember(member);
        pastEnrollment2.setPlan(plan);
        pastEnrollment2.setCoverageStart(now.minusYears(1).withDayOfYear(1)); // Jan 1, last year
        pastEnrollment2.setCoverageEnd(now.minusYears(1).withMonth(12).withDayOfMonth(31)); // Dec 31, last year
        pastEnrollment2.setActive(false);

        Enrollment currentEnrollment = new Enrollment();
        currentEnrollment.setMember(member);
        currentEnrollment.setPlan(plan);
        currentEnrollment.setCoverageStart(LocalDate.now());
        currentEnrollment.setCoverageEnd(LocalDate.now().plusYears(1));
        currentEnrollment.setActive(true);


        // Seed accumulators
        Accumulator dedIn = new Accumulator(null, currentEnrollment, AccumulatorType.DEDUCTIBLE, NetworkTier.IN_NETWORK, new BigDecimal("1500.00"), BigDecimal.ZERO);
        Accumulator dedOut = new Accumulator(null, currentEnrollment, AccumulatorType.DEDUCTIBLE, NetworkTier.OUT_OF_NETWORK, new BigDecimal("3000.00"), BigDecimal.ZERO);
        Accumulator oopIn = new Accumulator(null, currentEnrollment, AccumulatorType.OOP_MAX, NetworkTier.IN_NETWORK, new BigDecimal("4000.00"), BigDecimal.ZERO);
        Accumulator oopOut = new Accumulator(null, currentEnrollment, AccumulatorType.OOP_MAX, NetworkTier.OUT_OF_NETWORK, new BigDecimal("8000.00"), BigDecimal.ZERO);

//        currentEnrollment.setAccumulators(List.of(dedIn, dedOut, oopIn, oopOut));
//        currentEnrollment.setAccumulators(new ArrayList<>(List.of(dedIn, dedOut, oopIn, oopOut)));

        currentEnrollment.getAccumulators().addAll(List.of(dedIn, dedOut, oopIn, oopOut));

        member.setEnrollments(List.of(pastEnrollment1, pastEnrollment2, currentEnrollment));


        Member newMember = memberRepo.save(member);

        ClaimStatus[] statuses = ClaimStatus.values();

        Random  random = new Random();

        // Claims
        for (int i = 1; i <= 16; i++) {

            ClaimStatus randomStatus = statuses[random.nextInt(statuses.length)];

            Provider RandomProvider = providerRepo.findAll().stream()
                    .skip(new Random().nextInt((int) providerRepo.count()))
                    .findFirst().orElse(null);

            Claim claim = new Claim();

            claim.setClaimNumber("C-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase());
            claim.setMember(member);
            claim.setProvider(RandomProvider);
            claim.setServiceStartDate(LocalDate.now().minusDays(20L * i));
            claim.setServiceEndDate(LocalDate.now().minusDays(20L * (i - 1)));
            claim.setReceivedDate(LocalDate.now().minusDays(20L * (i - 1)));
            claim.setStatus(randomStatus);
            claim.setTotalBilled(BigDecimal.valueOf(300 + i * 50));
            claim.setTotalAllowed(BigDecimal.valueOf(250 + i * 40));
            claim.setTotalPlanPaid(BigDecimal.valueOf(200 + i * 30));
            claim.setTotalMemberResponsibility(BigDecimal.valueOf(50 + i * 10));
            claim.setUpdatedAt(OffsetDateTime.now());
            claimRepo.save(claim);

            // Claim lines
            List<ClaimLine> claimLines = List.of(
                    new ClaimLine(
                            null,  // id auto-generated
                            claim, // parent claim
                            1,     // lineNumber
                            "99213", // CPT code
                            "Office visit, established patient, 15 minutes",
                            new BigDecimal("150.00"), // billedAmount
                            new BigDecimal("120.00"), // allowedAmount
                            new BigDecimal("20.00"),  // deductibleApplied
                            new BigDecimal("10.00"),  // copayApplied
                            new BigDecimal("0.00"),   // coinsuranceApplied
                            new BigDecimal("90.00"),  // planPaid
                            new BigDecimal("20.00")   // memberResponsibility
                    ),
                    new ClaimLine(
                            null,
                            claim,
                            2,
                            "80050",
                            "General health panel (lab tests)",
                            new BigDecimal("300.00"),
                            new BigDecimal("240.00"),
                            new BigDecimal("0.00"),
                            new BigDecimal("0.00"),
                            new BigDecimal("0.00"),
                            new BigDecimal("240.00"),
                            new BigDecimal("60.00")
                    ),
                    new ClaimLine(
                            null,
                            claim,
                            3,
                            "87086",
                            "Urine culture, bacterial",
                            new BigDecimal("90.00"),
                            new BigDecimal("75.00"),
                            new BigDecimal("0.00"),
                            new BigDecimal("0.00"),
                            new BigDecimal("5.00"),
                            new BigDecimal("70.00"),
                            new BigDecimal("15.00")
                    )
            );


            claimLineRepo.saveAll(claimLines);

            // Update IN_NETWORK accumulators
            BigDecimal totalDeductibleUsed = claimLines.stream()
                    .map(ClaimLine::getDeductibleApplied)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal totalOopUsed = claimLines.stream()
                    .map(line -> line.getDeductibleApplied()
                            .add(line.getCopayApplied())
                            .add(line.getCoinsuranceApplied()))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);


        if(claim.getStatus() == ClaimStatus.PAID || claim.getStatus() == ClaimStatus.PROCESSED){
            for (Accumulator acc : currentEnrollment.getAccumulators()) {
                if (acc.getTier() == NetworkTier.IN_NETWORK) {
                    if (acc.getType() == AccumulatorType.DEDUCTIBLE) {
                        acc.setUsedAmount(acc.getUsedAmount().add(totalDeductibleUsed));
                    }
                    if (acc.getType() == AccumulatorType.OOP_MAX) {
                        acc.setUsedAmount(acc.getUsedAmount().add(totalOopUsed));
                    }
                }
            }
        }

            // Status events
            ClaimStatusEvent event = new ClaimStatusEvent();
            event.setClaim(claim);
            event.setStatus(claim.getStatus());
            event.setOccurredAt(OffsetDateTime.now().minusDays(3));
            claimStatusEventRepo.save(event);
        }
        enrollmentRepo.save(currentEnrollment);

        if (newMember.getId() != null) {
            System.out.println("Initial data created for member: " + member.getEmail());
            return "Success";
        } else {
            return "Failed";
        }
    }
}
