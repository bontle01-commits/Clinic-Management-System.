import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BookAppointment.css";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [queueNumber, setQueueNumber] = useState(null);

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    reasonForVisit: "",
    condition: "",
    doctorId: "",
    appointmentDate: ""
  });

  const conditions = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "HIV Care",
    "General Consultation"
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => {
        console.log(err);
        setError("Failed to load doctors");
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
    setMessage("");
    setQueueNumber(null);
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.patientName || !form.phone || !form.reasonForVisit) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (!phoneRegex.test(form.phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return false;
    }

    if (!form.condition) {
      setError("Please select a condition.");
      return false;
    }

    if (!form.doctorId) {
      setError("Please select a doctor.");
      return false;
    }

    if (!form.appointmentDate) {
      setError("Please select an appointment date.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setQueueNumber(null);

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8080/api/appointments", {
        patientName: form.patientName,
        phone: form.phone,
        reasonForVisit: form.reasonForVisit,
        condition: form.condition,
        appointmentDate: form.appointmentDate,
        status: "WAITING",
        doctor: {
          id: form.doctorId
        }
      });

      setQueueNumber(res.data.queueNumber);

      setMessage(
        `Appointment booked successfully! Your queue number is #${res.data.queueNumber}`
      );

      setForm({
        patientName: "",
        phone: "",
        reasonForVisit: "",
        condition: "",
        doctorId: "",
        appointmentDate: ""
      });

    } catch (err) {
      console.log(err);

      setError(
        err.response?.data ||
        "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="page">
      <div className="card">

        <h2 className="title">Smart Clinic Queue System</h2>
        <p className="subtitle">Book appointment and get your queue number instantly</p>

        {message && (
          <div className="success-message">
            {message}
            {queueNumber && (
              <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                🎟️ Your Queue Number: #{queueNumber}
              </div>
            )}
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form">

          <input
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="reasonForVisit"
            placeholder="Reason for Visit"
            value={form.reasonForVisit}
            onChange={handleChange}
          />

          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
          >
            <option value="">Select Condition</option>
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} • {doctor.specialty}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            min={today}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Get Queue Number"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookAppointment;