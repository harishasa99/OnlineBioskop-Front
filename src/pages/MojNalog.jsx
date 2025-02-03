import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const MojNalog = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const response = await fetch("http://localhost:5000/api/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            logoutUser();
            navigate("/prijava");
          }
        } catch (error) {
          console.error("❌ Greška pri dohvaćanju korisnika:", error);
          logoutUser();
          navigate("/prijava");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [user, navigate, logoutUser]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        logoutUser();
        navigate("/");
      } else {
        alert("Nešto nije u redu. Pokušajte ponovo.");
      }
    } catch (error) {
      alert("❌ Greška prilikom brisanja naloga.");
    }
  };

  if (loading) return <p className="text-center text-light">Učitavanje...</p>;
  if (!user) return null;

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4 text-center">MOJ NALOG</h2>

      <div className="card user-card bg-dark text-light p-3">
        <table className="table table-dark table-bordered user-table">
          <tbody>
            <tr>
              <th className="text-uppercase">Ime</th>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <th className="text-uppercase">Prezime</th>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <th className="text-uppercase">Datum rođenja</th>
              <td>{new Date(user.dateOfBirth).toLocaleDateString("sr-RS")}</td>
            </tr>
            <tr>
              <th className="text-uppercase">Pol</th>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <th className="text-uppercase">Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th className="text-uppercase">Omiljeni bioskop</th>
              <td>{user.favoriteCinema}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 d-flex flex-wrap gap-3 justify-content-center">
        <button
          onClick={() => navigate("/izmeni-podatke")}
          className="btn btn-primary modern-btn"
        >
          <i className="fas fa-pencil-alt"></i> Izmeni podatke
        </button>
        <button
          onClick={() => navigate("/promeni-lozinku")}
          className="btn btn-warning modern-btn"
        >
          <i className="fas fa-key"></i> Promeni lozinku
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-outline-danger modern-btn"
        >
          <i className="fas fa-trash-alt"></i> Obriši nalog
        </button>
      </div>

      {/* MODAL ZA BRISANJE NALOGA */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">BRISANJE NALOGA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ako zaista želite da obrišete Vaš Cineplexx nalog, možemo to uraditi
            za Vas. Međutim, imajte na umu da nećete moći da ponovo aktivirate
            svoj nalog i da će povezane informacije biti izgubljene.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Otkazi
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MojNalog;
