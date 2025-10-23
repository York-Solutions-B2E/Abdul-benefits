package com.benefits.backend.controller;


import com.benefits.backend.dto.MemberDto;
import com.benefits.backend.entity.Member;
import com.benefits.backend.entity.User;
import com.benefits.backend.repository.MemberRepository;
import com.benefits.backend.service.MemberService;
import com.benefits.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@AllArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final MemberRepository memberRepo;
    private final MemberService memberService;

    @GetMapping("/api/auth/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) return Map.of("authenticated", false);

        String sub = jwt.getClaim("sub");
        String email = jwt.getClaim("email");
        String givenName = jwt.getClaim("given_name");
        String familyName = jwt.getClaim("family_name");


        User user = userService.getOrCreateUser("google", sub, email, givenName, familyName);

        MemberDto member = memberService.findByUser_Id(user.getId());

        return Map.of(
                "authenticated", true,
                "userId", user.getId(),
                "email", user.getEmail(),
                "name", member != null ? member.getFirstName() + " " + member.getLastName() : givenName + " " + familyName,
                "memberId", member != null ? member.getId() : null,
                "token", jwt.getTokenValue()
        );
    }
}