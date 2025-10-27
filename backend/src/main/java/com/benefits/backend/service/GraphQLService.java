package com.benefits.backend.service;

import com.benefits.backend.dto.*;
import com.benefits.backend.entity.*;
import com.benefits.backend.util.ClaimPage;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface GraphQLService {
    MemberDto getMemberById(UUID id);
    List<MemberDto> getAllMembers();
    List<PlanDto> getAllPlans();
    List<ProviderDto> getAllProviders();
    List<Claim> getClaimByMemberId(UUID memberId);
    ClaimDto getByClaimNumber(String claimNumber);
    List<EnrollmentDto> getAllEnrollments();
    EnrollmentDto getActiveEnrollment(MemberDto memberDto);
//    List<Claim> getClaimsByMemberIdPaged(UUID memberId, Pageable pageable);
    ClaimPage getClaimsByMemberIdPaged(UUID memberId, Pageable pageable);
}
