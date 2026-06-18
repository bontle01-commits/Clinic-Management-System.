import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        ClinicCare
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/book"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Book Appointment
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Appointments
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;