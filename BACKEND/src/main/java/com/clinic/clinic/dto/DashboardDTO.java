package com.clinic.clinic.dto;

public class DashboardDTO {

    private long totalAppointments;
    private long todayAppointments;
    private long waiting;

    public DashboardDTO() {}

    public DashboardDTO(long totalAppointments, long todayAppointments, long waiting) {
        this.totalAppointments = totalAppointments;
        this.todayAppointments = todayAppointments;
        this.waiting = waiting;
    }

    public long getTotalAppointments() {
        return totalAppointments;
    }

    public void setTotalAppointments(long totalAppointments) {
        this.totalAppointments = totalAppointments;
    }

    public long getTodayAppointments() {
        return todayAppointments;
    }

    public void setTodayAppointments(long todayAppointments) {
        this.todayAppointments = todayAppointments;
    }

    public long getWaiting() {
        return waiting;
    }

    public void setWaiting(long waiting) {
        this.waiting = waiting;
    }
}