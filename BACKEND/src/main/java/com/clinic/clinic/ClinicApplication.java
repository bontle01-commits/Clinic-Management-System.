package com.clinic.clinic;

import com.clinic.clinic.model.Doctor;
import com.clinic.clinic.repository.DoctorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClinicApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClinicApplication.class, args);
    }

    @Bean
    CommandLineRunner run(DoctorRepository repo) {
        return args -> {

            if (repo.count() == 0) {

                Doctor d1 = new Doctor();
                d1.setName("Dr Smith");
                d1.setSpecialty("General Practitioner");
                d1.setAvailableDay("Monday");

                Doctor d2 = new Doctor();
                d2.setName("Dr John");
                d2.setSpecialty("Dentist");
                d2.setAvailableDay("Tuesday");

                Doctor d3 = new Doctor();
                d3.setName("Dr Patel");
                d3.setSpecialty("Cardiologist");
                d3.setAvailableDay("Friday");

                repo.save(d1);
                repo.save(d2);
                repo.save(d3);
            }
        };
    }
}