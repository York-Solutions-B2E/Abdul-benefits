package com.benefits.backend.mapper;

import com.benefits.backend.dto.ProviderDto;
import com.benefits.backend.entity.Provider;

public class ProviderMapper {


    public static ProviderDto providerToDto(Provider provider) {

        return new ProviderDto(
                provider.getId(),
                provider.getName(),
                provider.getSpecialty(),
                provider.getAddress(),
                provider.getPhone()
        );
    }

    public static Provider  dtoToProvider(ProviderDto providerDto) {
        Provider  provider = new Provider();
        provider.setName(providerDto.getName());
        provider.setSpecialty(providerDto.getSpecialty());
        provider.setAddress(providerDto.getAddress());
        provider.setPhone(providerDto.getPhone());
        return provider;
    }

}
