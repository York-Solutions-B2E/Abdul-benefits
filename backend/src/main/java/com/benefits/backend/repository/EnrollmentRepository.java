package com.benefits.backend.repository;

import com.benefits.backend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {
    Enrollment findByMember_id(UUID memberId);

    List<Enrollment> findByMemberId(UUID memberId);
}
