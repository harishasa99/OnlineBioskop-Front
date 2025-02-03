import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Reservation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cinemaData, setCinemaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    if (!state || !state.cinemaId || !state.movieId) {
      setLoading(false);
      return;
    }

    const fetchCinemaData = async () => {
      try {
        const response = await fetch(
          `https://onlinebiskop-production.up.railway.app/api/cinemas/${state.cinemaId}/movies/${state.showtime}`
        );
        if (!response.ok) throw new Error("Greška pri učitavanju podataka!");
        const data = await response.json();

        console.log("📌 API podaci primljeni u Reservation.jsx:", data); // ✅ Provera odgovora

        setCinemaData(data);
      } catch (error) {
        console.error("❌ Greška pri učitavanju bioskopa i filma:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaData();
  }, [state]);

  if (loading) return <h2 className="text-center text-light">Učitavanje...</h2>;
  if (!cinemaData)
    return <h2 className="text-center text-light">Podaci nisu dostupni!</h2>;

  const { movie, cinema } = cinemaData;
  const maxTickets = 6;
  const pricePerTicket = movie.price;

  const handleNextStep = () => {
    if (ticketCount > 0) {
      console.log("📌 Podaci koje šaljem u SeatSelection:", {
        movieId: movie._id, // ✅ Proveri u konzoli da li postoji
        cinemaId: state.cinemaId,
        showtime: state.showtime,
      });

      navigate(
        `/seats/${state.cinemaId}/${encodeURIComponent(state.showtime)}`,
        {
          state: {
            movieTitle: movie.title,
            movieImage: movie.image,
            cinemaName: cinema.name,
            cinemaLocation: cinema.location,
            ticketCount,
            pricePerTicket,
            movieId: movie._id, // ✅ Dodajemo movieId
          },
        }
      );
    }
  };

  return (
    <div className="container my-5 text-light">
      <div className="row bg-dark p-4 rounded shadow">
        <div className="col-md-4">
          <img
            src={
              movie.image.startsWith("/")
                ? `https://onlinebiskop-production.up.railway.app${movie.image}`
                : movie.image
            }
            alt={movie.title}
            className="img-fluid rounded"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          ` `
        </div>
        <div className="col-md-8">
          <h3 className="text-danger fw-bold text-uppercase">{movie.title}</h3>
          <p>
            <strong>Bioskop:</strong> {cinema.name} - {cinema.location}
          </p>
          <p>
            <strong>Datum i vreme:</strong> {state.showtime}
          </p>
          <p className="text-muted">
            Možete rezervisati do <strong>{maxTickets}</strong> ulaznica.
          </p>
          <div className="d-flex align-items-center mt-3">
            <button
              className="btn btn-secondary me-3"
              onClick={() => setTicketCount((prev) => Math.max(0, prev - 1))}
              disabled={ticketCount === 0}
            >
              -
            </button>
            <span className="fs-4 fw-bold">{ticketCount}</span>
            <button
              className="btn btn-secondary ms-3"
              onClick={() =>
                setTicketCount((prev) => Math.min(maxTickets, prev + 1))
              }
              disabled={ticketCount === maxTickets}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-danger btn-lg"
          onClick={handleNextStep}
          disabled={ticketCount === 0}
        >
          Sledeći korak
        </button>
      </div>
    </div>
  );
};

export default Reservation;
