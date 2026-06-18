package com.clinic.clinic.config;

import com.clinic.clinic.model.ConditionSchedule;
import com.clinic.clinic.repository.ConditionScheduleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;

@Component
public class DataLoader implements CommandLineRunner {

    private final ConditionScheduleRepository repository;

    public DataLoader(ConditionScheduleRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {

        if (repository.count() == 0) {

            repository.save(
                    new ConditionSchedule(
                            "Diabetes",
                            DayOfWeek.MONDAY));

            repository.save(
                    new ConditionSchedule(
                            "Hypertension",
                            DayOfWeek.TUESDAY));

            repository.save(
                    new ConditionSchedule(
                            "Asthma",
                            DayOfWeek.WEDNESDAY));

            repository.save(
                    new ConditionSchedule(
                            "HIV Care",
                            DayOfWeek.THURSDAY));

            repository.save(
                    new ConditionSchedule(
                            "General Consultation",
                            DayOfWeek.FRIDAY));
        }
    }
}