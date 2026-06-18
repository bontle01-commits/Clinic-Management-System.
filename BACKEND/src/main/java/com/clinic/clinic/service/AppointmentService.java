package com.clinic.clinic.service;
import com.clinic.clinic.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AppointmentService {
  
    private final AppointmentRepository repo;
    
    public AppointmentService(AppointmentRepository repo) {
        this.repo = repo;
    }

    public List<Map<String, Object>> getAppointmentsPerDay() {

        List<Object[]> results = repo.findAppointmentsPerDay();

        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();

            map.put("date", row[0].toString());
            map.put("total", ((Number) row[1]).longValue());

            response.add(map);
        }

        return response;
    }
}