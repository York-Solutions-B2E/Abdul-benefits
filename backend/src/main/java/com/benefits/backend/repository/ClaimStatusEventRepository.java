package com.benefits.backend.repository;

import com.benefits.backend.entity.ClaimStatusEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ClaimStatusEventRepository extends JpaRepository<ClaimStatusEvent, UUID> {
}
