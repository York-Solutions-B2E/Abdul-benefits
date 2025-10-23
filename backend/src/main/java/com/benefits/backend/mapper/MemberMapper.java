package com.benefits.backend.mapper;

import com.benefits.backend.dto.MemberDto;
import com.benefits.backend.entity.Member;

public class MemberMapper {

    public static MemberDto memberToDto(Member member) {

        return new MemberDto(
                member.getId(),
                member.getUser(),
                member.getFirstName(),
                member.getLastName(),
                member.getDateOfBirth(),
                member.getEmail(),
                member.getPhone(),
                member.getMailingAddress(),
                member.getEnrollments()
        );
    }

    public static  Member dtoToMember(MemberDto memberDto) {
      Member member = new Member();
      member.setUser(memberDto.getUser());
      member.setFirstName(memberDto.getFirstName());
      member.setLastName(memberDto.getLastName());
      member.setDateOfBirth(memberDto.getDateOfBirth());
      member.setEmail(memberDto.getEmail());
      member.setPhone(memberDto.getPhone());
      member.setMailingAddress(memberDto.getMailingAddress());
      member.setEnrollments(memberDto.getEnrollments());

      return member;
    }
}
