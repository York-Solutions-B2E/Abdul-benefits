package com.benefits.backend.repository;

import com.benefits.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {
  Member findByUser_Id(UUID userId);
}


