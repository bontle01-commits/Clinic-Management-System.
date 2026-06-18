import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const total = appointments.length;

  const todayCount = appointments.filter(
    (a) => a.appointmentDate === today
  ).length;

  const waitingCount = appointments.filter(
    (a) => a.status === "Waiting for Consultation"
  ).length;

  return (
    <div className="app-shell">

      {/* TOP BAR */}
      <div className="topbar">
        <h2>Clinic Queue System</h2>
        <div className="topbar-actions">
          <Link to="/book">Book</Link>
          <Link to="/appointments">Queue</Link>
        </div>
      </div>

      <div className="grid-layout">

        {/* MAIN PANEL */}
        <div className="panel main-panel">

          <h1>Welcome 👋</h1>

          <p className="muted">
            Manage patients and track live queue status in real time.
          </p>

          <div className="quick-actions">

            <Link to="/book" className="action-card">
              <div className="icon">➕</div>
              <div>
                <h4>New Appointment</h4>
                <p>Add patient to queue</p>
              </div>
            </Link>

            <Link to="/appointments" className="action-card">
              <div className="icon">📋</div>
              <div>
                <h4>View Queue</h4>
                <p>Manage waiting patients</p>
              </div>
            </Link>

          </div>
        </div>

        {/* SYSTEM STATUS (NOW REAL) */}
        <div className="panel side-panel">

          <h3>System Status</h3>

          <div className="stat">
            <span>Total Appointments</span>
            <strong>{total}</strong>
          </div>

          <div className="stat">
            <span>Today</span>
            <strong>{todayCount}</strong>
          </div>

          <div className="stat">
            <span>Waiting</span>
            <strong>{waitingCount}</strong>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;