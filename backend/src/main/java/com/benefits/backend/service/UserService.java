package com.benefits.backend.service;

import com.benefits.backend.entity.User;


public interface UserService {
    User getOrCreateUser(String provider, String sub, String email, String givenName, String familyName);
}
