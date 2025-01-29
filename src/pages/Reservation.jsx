import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import medaImage from "../assets/images/slika1.jpg";

// Simulirani podaci za bioskop i film
const mockData = {
  movie: {
    title: "Bob Dylan: Potpuni Neznanac",
    image: medaImage,
    cinema: "Cineplexx Big Kragujevac",
    hall: "Sala 2",
    format: "2D",
    date: "14.01.2025",
    time: "20:00",
  },
  maxTickets: 6,
};

const Reservation = () => {
  const { cinemaId, showtimeId } = useParams();
  const navigate = useNavigate();

  const [ticketCount, setTicketCount] = useState(0);
  const { movie, maxTickets } = mockData;

  const handleNextStep = () => {
    if (ticketCount > 0) {
      navigate(`/seats/${cinemaId}/${showtimeId}`, { state: { ticketCount } });
    }
  };

  return (
    <div className="container my-5">
      <div
        className="row bg-dark text-light p-4 rounded shadow"
        style={{
          boxShadow: "0px 5px 15px rgba(0,0,0,0.5)",
        }}
      >
        {/* Slika filma */}
        <div className="col-md-4">
          <img
            src={movie.image}
            alt={movie.title}
            className="img-fluid rounded"
            style={{ objectFit: "cover", maxHeight: "300px" }}
          />
        </div>

        {/* Informacije o filmu */}
        <div className="col-md-8">
          <h3 className="text-danger fw-bold">{movie.title}</h3>
          <p className="mb-1">
            <strong className="text-danger">CINEPLEXX:</strong> {movie.cinema}
          </p>
          <p className="mb-1">
            <strong className="text-danger">Sala:</strong> {movie.hall}
          </p>
          <p className="mb-1">
            <strong className="text-danger">Format:</strong> {movie.format}
          </p>
          <p className="mb-1">
            <strong className="text-danger">Datum i vreme:</strong> {movie.date}
            , {movie.time}
          </p>
          <p className="text-muted">
            Možete rezervisati do <strong>{maxTickets}</strong> ulaznica/dan
          </p>

          {/* Broj karata */}
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

      {/* Sledeći korak */}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary bg-danger btn-lg"
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
