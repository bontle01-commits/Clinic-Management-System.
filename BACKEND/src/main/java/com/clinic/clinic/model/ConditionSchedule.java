package com.clinic.clinic.model;

import jakarta.persistence.*;
import java.time.DayOfWeek;

@Entity
public class ConditionSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String conditionName;

    @Enumerated(EnumType.STRING)
    private DayOfWeek treatmentDay;

    public ConditionSchedule() {
    }

    public ConditionSchedule(String conditionName, DayOfWeek treatmentDay) {
        this.conditionName = conditionName;
        this.treatmentDay = treatmentDay;
    }

    public Long getId() {
        return id;
    }

    public String getConditionName() {
        return conditionName;
    }

    public void setConditionName(String conditionName) {
        this.conditionName = conditionName;
    }

    public DayOfWeek getTreatmentDay() {
        return treatmentDay;
    }

    public void setTreatmentDay(DayOfWeek treatmentDay) {
        this.treatmentDay = treatmentDay;
    }
}