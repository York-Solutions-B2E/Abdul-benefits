package com.benefits.backend.controller;

import com.benefits.backend.dto.*;
import com.benefits.backend.entity.*;
import com.benefits.backend.repository.*;
import com.benefits.backend.service.GraphQLService;
import com.benefits.backend.util.ClaimPage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
public class GraphQLController {

    private final EnrollmentRepository enrollmentRepo;
    private final GraphQLService graphQLService;


//    Members
    @QueryMapping
    public List<MemberDto> members() {
        return graphQLService.getAllMembers();
    }

    @QueryMapping
    public MemberDto memberById(@Argument UUID id) {
        return graphQLService.getMemberById(id);
    }

//    Plans
    @QueryMapping
    public List<PlanDto> plans() {
        return graphQLService.getAllPlans();
    }


//    Providers
    @QueryMapping
    public List<ProviderDto> providers() {
        return graphQLService.getAllProviders();
    }

    @QueryMapping
    public ClaimPage claimsList(@Argument UUID memberId,
                            @Argument int page,
                            @Argument int size) {
        Pageable pageable = PageRequest.of(page, size);
        return graphQLService.getClaimsByMemberIdPaged(memberId, pageable);
    }

    @QueryMapping
    public ClaimDto getByClaimNumber(@Argument String claimNumber) {
        return graphQLService.getByClaimNumber(claimNumber);
    }

//    Enrollments
    @QueryMapping
    public List<EnrollmentDto> enrollments() {
        return graphQLService.getAllEnrollments();
    }

    @SchemaMapping(typeName = "MemberDto", field = "activeEnrollment")
    public EnrollmentDto getActiveEnrollment(MemberDto memberDto) {
        return graphQLService.getActiveEnrollment(memberDto);
    }

}
