package com.clinic.clinic.controller;

import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.repository.DoctorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    private final DoctorRepository repo;

    public DoctorController(DoctorRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Doctor> getDoctors() {
        return repo.findAll();
    }
}