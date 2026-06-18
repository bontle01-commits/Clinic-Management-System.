package com.clinic.clinic.repository;

import com.clinic.clinic.model.ConditionSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConditionScheduleRepository
        extends JpaRepository<ConditionSchedule, Long> {

    Optional<ConditionSchedule> findByConditionName(String conditionName);
}