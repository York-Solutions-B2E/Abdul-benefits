package com.benefits.backend.dto;

import com.benefits.backend.entity.Address;
import com.benefits.backend.entity.Enrollment;
import com.benefits.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberDto {
    private UUID id;
    private User user;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String email;
    private String phone;
    private Address mailingAddress;
    private List<Enrollment> enrollments;
}
