import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // 🟢 Koristimo UserContext
import "../styles/style.css"; // 🟢 Dodajemo CSS fajl

const UserSidebar = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(UserContext); // 🟢 Dobijamo funkciju logoutUser iz konteksta

  const handleLogout = () => {
    logoutUser(); // ✅ Pozivamo logout funkciju iz konteksta
    navigate("/"); // ✅ Preusmeravanje na početnu stranicu
  };

  return (
    <div className="user-sidebar">
      <ul className="nav flex-column">
        <li>
          <NavLink to="/moj-nalog" className="nav-link">
            <i className="fas fa-user"></i> Moj nalog
          </NavLink>
        </li>
        <li>
          <NavLink to="/moje-ulaznice" className="nav-link">
            <i className="fas fa-ticket-alt"></i> Moje ulaznice
          </NavLink>
        </li>
        <li>
          <NavLink to="/moja-istorija" className="nav-link">
            <i className="fas fa-history"></i> Moja istorija
          </NavLink>
        </li>
        <li>
          <NavLink to="/moja-lista-gledanja" className="nav-link">
            <i className="fas fa-heart"></i> Moja lista za gledanje
          </NavLink>
        </li>
        <li className="logout">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Odjavi se
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
