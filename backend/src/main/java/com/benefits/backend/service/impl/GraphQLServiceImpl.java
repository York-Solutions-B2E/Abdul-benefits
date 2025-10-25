package com.benefits.backend.service.impl;

import com.benefits.backend.dto.MemberDto;
import com.benefits.backend.dto.PlanDto;
import com.benefits.backend.dto.ProviderDto;
import com.benefits.backend.entity.*;
import com.benefits.backend.mapper.MemberMapper;
import com.benefits.backend.mapper.PlanMapper;
import com.benefits.backend.mapper.ProviderMapper;
import com.benefits.backend.repository.*;
import com.benefits.backend.service.GraphQLService;
import com.benefits.backend.util.ClaimPage;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GraphQLServiceImpl implements GraphQLService {

    private final MemberRepository memberRepo;
    private final PlanRepository planRepo;
    private final ProviderRepository providerRepo;
    private final ClaimRepository claimRepo;
    private final EnrollmentRepository enrollmentRepo;


//    GraphQl methods


    //    Member
    public MemberDto getMemberById(UUID id) {
        Member member = memberRepo.findById(id).orElse(null);
        if (member == null) {
            System.out.println("Member not found");
            return null;
        }
        return MemberMapper.memberToDto(member);
    }

    public List<MemberDto> getAllMembers() {
        return memberRepo.findAll().stream().map(MemberMapper::memberToDto).collect(Collectors.toList());
    }

    //    Plan
    @Override
    public List<PlanDto> getAllPlans() {
        List<Plan> plans = planRepo.findAll();

        return plans.stream().map((plan) -> PlanMapper.planToDto(plan)).collect(Collectors.toList());
    }

    //        Provider
    @Override
    public List<ProviderDto> getAllProviders() {
//        return providerRepo.findAll();

        List<Provider> providers = providerRepo.findAll();

        return providers.stream().map((provider
                -> ProviderMapper.providerToDto(provider))).collect(Collectors.toList());
    }

    //    Claim
    @Override
    public List<Claim> getClaimByMemberId(UUID memberId) {
        return claimRepo.findByMember_Id(memberId);
    }

    @Override
    public Claim getByClaimNumber(String claimNumber) {
        return claimRepo.findByClaimNumber(claimNumber);
    }

//    public List<Claim> getClaimsByMemberIdPaged(UUID memberId, Pageable pageable) {
//        Page<Claim> pageResult = claimRepo.findByMemberId(memberId, pageable);
//        System.out.println(pageResult.getTotalElements());
//        return pageResult.getContent();
//    }

    @Override
    public ClaimPage getClaimsByMemberIdPaged(UUID memberId, Pageable pageable) {
        Page<Claim> pageResult = claimRepo.findByMemberId(memberId, pageable);
        return new ClaimPage(pageResult);
    }

    //    Enrollment
    @Override
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }
}
