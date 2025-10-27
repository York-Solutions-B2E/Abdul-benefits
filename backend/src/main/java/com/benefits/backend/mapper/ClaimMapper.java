package com.benefits.backend.mapper;

import com.benefits.backend.dto.ClaimDto;
import com.benefits.backend.entity.Claim;

public class ClaimMapper {

    public static ClaimDto claimToDto(Claim claim) {
        return new ClaimDto(
                claim.getId(),
                claim.getClaimNumber(),
                claim.getMember(),
                claim.getProvider(),
                claim.getServiceStartDate(),
                claim.getServiceEndDate(),
                claim.getReceivedDate(),
                claim.getStatus(),
                claim.getTotalBilled(),
                claim.getTotalAllowed(),
                claim.getTotalPlanPaid(),
                claim.getTotalMemberResponsibility(),
                claim.getLines(),
                claim.getStatusHistory(),
                claim.getUpdatedAt()
        );
    }

    public static Claim dtoToClaim(ClaimDto dto) {
        Claim claim = new Claim();

        claim.setClaimNumber(dto.getClaimNumber());
        claim.setMember(dto.getMember());
        claim.setProvider(dto.getProvider());
        claim.setServiceStartDate(dto.getServiceStartDate());
        claim.setServiceEndDate(dto.getServiceEndDate());
        claim.setReceivedDate(dto.getReceivedDate());
        claim.setStatus(dto.getStatus());
        claim.setTotalBilled(dto.getTotalBilled());
        claim.setTotalAllowed(dto.getTotalAllowed());
        claim.setTotalPlanPaid(dto.getTotalPlanPaid());
        claim.setTotalMemberResponsibility(dto.getTotalMemberResponsibility());
        claim.setLines(dto.getLines());
        claim.setStatusHistory(dto.getStatusHistory());
        claim.setUpdatedAt(dto.getUpdatedAt());
        return claim;

    }
}