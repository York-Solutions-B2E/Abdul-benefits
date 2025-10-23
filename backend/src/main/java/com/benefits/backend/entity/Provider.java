package com.benefits.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "providers")
public class Provider {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String specialty;

    @Embedded
    private Address address;

    private String phone;
}
