import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          FilmFront
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/preporuceno">
                Preporučeno
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/u-bioskopu">
                U Bioskopu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/uskoro">
                Uskoro
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                <i className="fas fa-search"></i>
              </Link>
            </li>

            {user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user"></i> Zdravo, {user.firstName}
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark">
                  {user.role === "admin" && ( // ✅ Samo admin vidi Admin Panel
                    <li>
                      <Link className="dropdown-item text-warning" to="/admin">
                        <i className="fas fa-cogs"></i> Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item text-light" to="/moj-nalog">
                      <i className="fas fa-user-circle"></i> Moj nalog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/moje-ulaznice"
                    >
                      <i className="fas fa-ticket-alt"></i> Moje ulaznice
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/moja-istorija"
                    >
                      <i className="fas fa-history"></i> Moja istorija
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-light" to="/moja-lista">
                      <i className="fas fa-heart"></i> Moja lista za gledanje
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        logoutUser();
                        navigate("/");
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Odjavi se
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/prijava">
                    Prijava
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-danger" to="/registracija">
                    Registracija
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
