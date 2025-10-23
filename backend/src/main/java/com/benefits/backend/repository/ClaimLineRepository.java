package com.benefits.backend.repository;

import com.benefits.backend.entity.Claim;
import com.benefits.backend.entity.ClaimLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ClaimLineRepository extends JpaRepository<ClaimLine, UUID> {
    List<ClaimLine> findByClaim_Member_Id(UUID memberId);
}
