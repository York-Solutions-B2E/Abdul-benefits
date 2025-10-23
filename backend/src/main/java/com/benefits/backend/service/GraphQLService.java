package com.benefits.backend.service;

import com.benefits.backend.dto.MemberDto;
import com.benefits.backend.dto.PlanDto;
import com.benefits.backend.entity.*;
import com.benefits.backend.util.ClaimPage;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface GraphQLService {
    MemberDto getMemberById(UUID id);
    List<MemberDto> getAllMembers();
    List<PlanDto> getAllPlans();
    List<Provider> getAllProviders();
    List<Claim> getClaimByMemberId(UUID memberId);
    Claim  getByClaimNumber(String claimNumber);
    List<Enrollment> getAllEnrollments();
//    List<Claim> getClaimsByMemberIdPaged(UUID memberId, Pageable pageable);
    ClaimPage getClaimsByMemberIdPaged(UUID memberId, Pageable pageable);
}
