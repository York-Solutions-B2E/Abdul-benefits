package com.benefits.backend.mapper;

import com.benefits.backend.dto.EnrollmentDto;
import com.benefits.backend.entity.Enrollment;

public class EnrollmentMapper {

    public static EnrollmentDto enrollmentToDto(Enrollment enrollment) {
            return new EnrollmentDto(
                    enrollment.getId(),
                    enrollment.getMember(),
                    enrollment.getPlan(),
                    enrollment.getCoverageStart(),
                    enrollment.getCoverageEnd(),
                    enrollment.getActive(),
                    enrollment.getAccumulators()
            );
    }
    public static Enrollment dtoToEnrollment(EnrollmentDto dto) {

        Enrollment enrollment = new Enrollment();

        enrollment.setId(dto.getId());
        enrollment.setMember(dto.getMember());
        enrollment.setPlan(dto.getPlan());
        enrollment.setCoverageStart(dto.getCoverageStart());
        enrollment.setCoverageEnd(dto.getCoverageEnd());
        enrollment.setActive(dto.getActive());
        enrollment.setAccumulators(dto.getAccumulators());
        return enrollment;
    }
}
