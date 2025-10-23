package com.benefits.backend.repository;

import com.benefits.backend.entity.Claim;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ClaimRepository extends JpaRepository<Claim, UUID> {

    List<Claim> findByMember_id(UUID id);

    List<Claim> findByMember_Id(UUID memberId);

    Claim findByClaimNumber(String claimNumber);

    Page<Claim> findByMemberId(UUID memberId, Pageable pageable);


}
