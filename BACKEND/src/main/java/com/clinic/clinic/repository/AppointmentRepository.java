package com.clinic.clinic.repository;

import com.clinic.clinic.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query(value = """
        SELECT appointment_date, COUNT(*)
        FROM appointment
        GROUP BY appointment_date
        ORDER BY appointment_date
    """, nativeQuery = true)
    List<Object[]> findAppointmentsPerDay();
}