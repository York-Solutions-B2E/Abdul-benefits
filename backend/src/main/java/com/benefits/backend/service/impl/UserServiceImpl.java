package com.benefits.backend.service.impl;

import com.benefits.backend.entity.*;
import com.benefits.backend.repository.UserRepository;
import com.benefits.backend.service.UserService;
import com.benefits.backend.util.DataInitializer;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Optional;


@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    private final DataInitializer dataInitializer;


    public User getOrCreateUser(String provider, String sub, String email, String givenName, String familyName) {

        Optional<User> existing = userRepo.findByAuthProviderAndAuthSub(provider, sub);
        if (existing.isPresent()) return existing.get();

        User user = new User();

        user.setAuthProvider(provider);
        user.setAuthSub(sub);
        user.setEmail(email);
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());

        user = userRepo.save(user);

//         Seed a minimal Member for this User
        Member member = new Member();
        member.setUser(user);
        member.setFirstName(givenName);
        member.setLastName(familyName);
        member.setEmail(email);

//        Initialize data for new users
        String result = dataInitializer.createInitialDataForMember(member);


        System.out.println(result);
        System.out.println("Creating new Member for user: " + user.getEmail());
        if (result.equals("Success")) {
            System.out.println("Member saved successfully");
        }
        return user;
    }


}
