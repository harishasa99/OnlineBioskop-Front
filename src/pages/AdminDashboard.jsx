import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container my-5">
      <h2 className="text-dark text-center mb-4 display-5">Admin Panel</h2>

      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
          <div className="card bg-dark text-light p-5 shadow-lg rounded-3 text-center w-100">
            <h4 className="text-warning fw-bold">Upravljanje korisnicima</h4>
            <p className="text-secondary fs-5">
              Pregled, pretraga i brisanje korisnika.
            </p>
            <Link
              to="/admin/users"
              className="btn btn-outline-warning w-100 fs-5 py-2"
            >
              <i className="fas fa-users"></i> Upravljaj korisnicima
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
          <div className="card bg-dark text-light p-5 shadow-lg rounded-3 text-center w-100">
            <h4 className="text-warning fw-bold">Upravljanje filmovima</h4>
            <p className="text-secondary fs-5">
              Dodavanje, izmena i brisanje filmova.
            </p>
            <Link
              to="/admin/movies"
              className="btn btn-outline-warning w-100 fs-5 py-2"
            >
              <i className="fas fa-film"></i> Upravljaj filmovima
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <div className="card bg-dark text-light p-5 shadow-lg rounded-3 text-center w-100">
            <h4 className="text-warning fw-bold">Upravljanje bioskopima</h4>
            <p className="text-secondary fs-5">
              Dodavanje, izmena i upravljanje bioskopima i filmovima.
            </p>
            <Link
              to="/admin/cinemas"
              className="btn btn-outline-warning w-100 fs-5 py-2"
            >
              <i className="fas fa-video"></i> Upravljaj bioskopima
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
