import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FilmDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === "undefined") return;

    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://onlinebiskop-production.up.railway.app/api/movies/${id}`
        );
        if (!response.ok) throw new Error("Neuspešno učitavanje filma!");
        const data = await response.json();

        console.log("📌 Podaci o filmu:", data); // ✅ Provera API odgovora
        console.log("📌 Cinemas:", data.cinemas); // ✅ Provera bioskopa
        if (data.cinemas?.length > 0) {
          console.log("📌 Prvi bioskop:", data.cinemas[0]);
          console.log(
            "📌 Showtime u prvom bioskopu:",
            data.cinemas[0].showtimes
          );
        }

        setMovie(data);
      } catch (error) {
        console.error("❌ Greška pri učitavanju filma:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <h2 className="text-center text-light">Učitavanje...</h2>;
  if (!movie)
    return <h2 className="text-center text-light">Film nije pronađen!</h2>;

  const handleTicketPurchase = (cinemaId, showtime) => {
    navigate(`/reservation/${cinemaId}/${showtime._id}`, {
      state: {
        cinemaId,
        showtime: showtime._id,
        movieId: movie._id, // Ovaj podatak mora postojati!
        movieImage: movie.image, // Dodajemo sliku filma
      },
    });
  };

  const releaseDateFormatted = movie.releaseDate
    ? new Date(movie.releaseDate).toLocaleDateString("sr-RS")
    : "N/A";

  const imageSrc = movie.image?.startsWith("/")
    ? `https://onlinebiskop-production.up.railway.app${movie.image}`
    : movie.image || "https://placehold.co/300x450?text=Nema+Slike";

  return (
    <div className="container my-5 text-light">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        ← Nazad
      </button>
      <div className="row">
        {/* 🎬 Sekcija sa slikom */}
        <div className="col-md-5">
          <img
            src={imageSrc}
            alt={movie.title}
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        {/* ℹ️ Sekcija sa detaljima */}
        <div className="col-md-7">
          <h1 className="fw-bold text-danger">{movie.title}</h1>
          <p className="text-muted">
            <strong>Režiser:</strong> {movie.director}
          </p>
          <p className="text-muted">
            <strong>Žanr:</strong> {movie.genre}
          </p>
          <p className="text-muted">
            <strong>Trajanje:</strong> {movie.duration} min
          </p>
          <p className="text-muted">
            <strong>Ocena:</strong>{" "}
            <span className="badge bg-success">{movie.rating} / 5</span>
          </p>
          <p className="text-muted">
            <strong>Početak prikazivanja:</strong> {releaseDateFormatted}
          </p>
          <p className="text-muted">
            <strong>Cena:</strong> {movie.price} RSD
          </p>

          <div
            className="p-3 mt-4 rounded"
            style={{
              background: "#222",
              color: "#eee",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h5 className="text-danger mb-3">Opis:</h5>
            <p className="mb-0">{movie.description}</p>
          </div>

          {/* 📍 Prikaz bioskopa i termina */}
          {movie.cinemas?.length > 0 ? (
            <>
              <h3 className="mt-5 text-danger">📍 Prikaz u bioskopima</h3>
              {movie.cinemas.map((cinema, index) => (
                <div
                  key={index}
                  className="cinema-card bg-dark rounded p-3 mb-3 shadow-sm"
                >
                  <h5 className="text-danger text-uppercase">
                    {cinema.name} - {cinema.location}
                  </h5>
                  <div className="d-flex flex-wrap gap-3">
                    {cinema.showtimes?.length > 0 ? (
                      cinema.showtimes.map((showtime, i) => (
                        <div
                          key={i}
                          className="showtime-card bg-dark text-light border border-light p-2 rounded text-center"
                          onClick={() =>
                            handleTicketPurchase(cinema._id, showtime)
                          }
                          style={{
                            cursor: "pointer",
                            transition: "transform 0.2s ease-in-out",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <h6 className="fw-bold mb-1">{showtime}</h6>
                          <small>{cinema.hall || "Sala nepoznata"}</small>
                        </div>
                      ))
                    ) : (
                      <p className="text-warning">Nema dostupnih termina</p>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-warning mt-4">
              Trenutno nema prikazivanja u bioskopima.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
