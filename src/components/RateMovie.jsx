import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RateMovie = () => {
  const { state } = useLocation();
  const { movie } = state || {}; // Preuzimanje podataka o filmu iz state-a
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Logika za slanje ocene na server može ići ovde
    console.log(`Rating submitted: ${rating}`);
    alert("Hvala na oceni!");
    navigate("/"); // Nakon ocenjivanja, vrati korisnika na početnu stranicu
  };

  if (!movie) {
    return (
      <p className="text-center text-light">Podaci o filmu nisu dostupni.</p>
    );
  }

  return (
    <div className="container my-5 text-light">
      <div
        className="text-center bg-dark p-4 rounded shadow-lg"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* Naslov i slika filma */}
        <h1 className="text-uppercase text-danger mb-4">Oceni film</h1>
        <h3 className="text-white">{movie.title}</h3>
        <img
          src={movie.image}
          alt={movie.title}
          className="img-fluid rounded shadow-sm mt-3"
          style={{
            maxHeight: "300px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />

        {/* Ocena */}
        <div className="mb-4">
          <h5 className="text-light mb-3">Vaša ocena:</h5>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fas fa-star ${
                star <= rating ? "text-warning" : "text-secondary"
              }`}
              style={{ cursor: "pointer", fontSize: "2rem", margin: "0 10px" }}
              onClick={() => setRating(star)}
            ></i>
          ))}
        </div>

        {/* Dugme za potvrdu */}
        <button
          className="btn btn-success bg-danger w-100 mt-4"
          onClick={handleSubmit}
        >
          Pošalji ocenu
        </button>
      </div>
    </div>
  );
};

export default RateMovie;
