package com.benefits.backend.service;

import com.benefits.backend.dto.MemberDto;
import com.benefits.backend.entity.Member;

import java.util.UUID;

public interface MemberService {
    MemberDto findByUser_Id(UUID id);
}
