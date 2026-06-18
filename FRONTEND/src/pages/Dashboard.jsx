import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointments/per-day")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const totalAppointments = data.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  const today = new Date().toISOString().split("T")[0];

  const todayCount =
    data.find((item) => item.date === today)?.total || 0;

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* TOP STATS */}
      <div className="stats-grid">

        <div className="stat-card blue">
          <h3>Total Appointments</h3>
          <p>{totalAppointments}</p>
        </div>

        <div className="stat-card green">
          <h3>Today's Appointments</h3>
          <p>{todayCount}</p>
        </div>

        <div className="stat-card purple">
          <h3>Days Recorded</h3>
          <p>{data.length}</p>
        </div>

      </div>

      {/* DAILY BREAKDOWN */}
      <div className="table-card">

        <h3>Appointments Per Day</h3>

        <div className="grid">

          {data.map((item, index) => (
            <div key={index} className="day-card">

              <div className="date">
                {item.date}
              </div>

              <div className="count">
                {item.total} appointments
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;