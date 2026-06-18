package com.clinic.clinic.controller;

import com.clinic.clinic.dto.DashboardDTO;
import com.clinic.clinic.model.Appointment;
import com.clinic.clinic.repository.AppointmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentRepository repo;

    public AppointmentController(AppointmentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Appointment> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {

        long count = repo.count();

        appointment.setQueueNumber((int) count + 1);
        appointment.setStatus("Waiting for Consultation");

        return repo.save(appointment);
    }

    @GetMapping("/dashboard")
    public DashboardDTO getDashboardStats() {

        List<Appointment> all = repo.findAll();

        long total = all.size();

        String today = java.time.LocalDate.now().toString();

        long todayCount = all.stream()
                .filter(a -> today.equals(a.getAppointmentDate()))
                .count();

        long waitingCount = all.stream()
                .filter(a -> "Waiting for Consultation".equals(a.getStatus()))
                .count();

        return new DashboardDTO(total, todayCount, waitingCount);
    }
}