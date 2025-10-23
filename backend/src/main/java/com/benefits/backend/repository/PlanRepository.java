package com.benefits.backend.repository;

import com.benefits.backend.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface PlanRepository extends JpaRepository<Plan, UUID> {
    Plan findByName(String basicHmo);
}
