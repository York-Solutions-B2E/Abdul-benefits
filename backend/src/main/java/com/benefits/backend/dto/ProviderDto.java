package com.benefits.backend.dto;


import com.benefits.backend.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProviderDto {

    private UUID id;
    private String name;
    private String specialty;
    private Address address;
    private String phone;

}
