package com.benefits.backend.repository;

import com.benefits.backend.entity.Accumulator;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface AccumulatorRepository extends CrudRepository<Accumulator, UUID> {
}
