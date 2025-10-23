package com.benefits.backend.service.impl;

import com.benefits.backend.dto.MemberDto;
import com.benefits.backend.entity.Member;
import com.benefits.backend.mapper.MemberMapper;
import com.benefits.backend.repository.MemberRepository;
import com.benefits.backend.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@AllArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private MemberRepository memberRepo;

    @Override
    public MemberDto findByUser_Id(UUID id) {
        Member  member = memberRepo.findByUser_Id(id);
        return MemberMapper.memberToDto(member);
    }
}
