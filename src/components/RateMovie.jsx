import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RateMovie = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("📌 Stigao state u RateMovie:", state); // 🛠 Proveravamo da li stižu podaci

  const movieTitle = state?.movieTitle || "Nepoznati film";
  const movieImage = state?.movieImage || "/default-movie.jpg";
  const movieId = state?.movieId;

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      alert("Greška: Nedostaje ID filma!");
      navigate("/");
    }
  }, [movieId, navigate]);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Molimo vas da izaberete ocenu pre slanja.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken"); // ✅ Uzimamo token iz localStorage-a

    if (!accessToken) {
      alert("Morate biti prijavljeni da biste ocenili film.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // ✅ Dodajemo token u header
        },
        body: JSON.stringify({ movieId, rating }),
      });

      const data = await response.json();
      console.log("📩 Odgovor sa servera:", data);

      if (!response.ok)
        throw new Error(data.message || "Greška pri ocenjivanju.");

      alert("Hvala na oceni!");
      navigate("/");
    } catch (error) {
      console.error("❌ Greška pri slanju ocene:", error);
      alert("Došlo je do greške pri slanju ocene.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 text-light">
      <div
        className="text-center bg-dark p-4 rounded shadow-lg"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h1 className="text-uppercase text-danger mb-4">Oceni film</h1>
        <h3 className="text-white">{movieTitle}</h3>
        <img
          src={
            movieImage.startsWith("/")
              ? `http://localhost:5000${movieImage}`
              : movieImage
          }
          alt={movieTitle}
          className="img-fluid rounded shadow-sm mt-3"
          style={{
            maxHeight: "300px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />

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

        <button
          className="btn btn-success bg-danger w-100 mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Slanje..." : "Pošalji ocenu"}
        </button>
      </div>
    </div>
  );
};

export default RateMovie;
