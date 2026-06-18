import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointments")
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load appointments");
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status pending";
      case "confirmed":
        return "status confirmed";
      case "cancelled":
        return "status cancelled";
      default:
        return "status";
    }
  };

  if (loading) {
    return <p className="info">Loading appointments...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="appointments-page">
      <h2 className="title">Appointments</h2>

      {appointments.length === 0 ? (
        <p className="info">No appointments found.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Phone</th>
                <th>Reason</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patientName}</td>
                  <td>{a.phone}</td>
                  <td>{a.reasonForVisit}</td>
                  <td>{a.doctor?.name}</td>
                  <td>
                    {new Date(a.appointmentDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={getStatusClass(a.status)}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Appointments;