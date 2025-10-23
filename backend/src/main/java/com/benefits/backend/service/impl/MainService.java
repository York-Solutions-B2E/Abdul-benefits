package com.benefits.backend.service.impl;


import com.benefits.backend.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class MainService {

    private final AccumulatorRepository  accumulatorRepo;
    private final ClaimStatusEventRepository claimStatusEventRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final ClaimRepository claimRepo;
    private final ClaimLineRepository claimLineRepo;
    private final MemberRepository memberRepo;
    private final UserRepository userRepo;
    private final PlanRepository planRepo;
    private final ProviderRepository providerRepo;


//    Clear database
    public void deleteAll() {
        accumulatorRepo.deleteAll();
        enrollmentRepo.deleteAll();
        claimStatusEventRepo.deleteAll();
        claimLineRepo.deleteAll();
        claimRepo.deleteAll();
        memberRepo.deleteAll();
        userRepo.deleteAll();
        planRepo.deleteAll();
        providerRepo.deleteAll();
    }


}
