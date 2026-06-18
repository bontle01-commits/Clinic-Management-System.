import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";

function App() {
  const [appointments, setAppointments] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/book"
          element={
            <BookAppointment setAppointments={setAppointments} />
          }
        />

        <Route
          path="/appointments"
          element={
            <Appointments
              appointments={appointments}
              setAppointments={setAppointments}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;