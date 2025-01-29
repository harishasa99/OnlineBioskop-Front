import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dedaMrazImage from "../assets/images/slika1.jpg";

// Simulirani podaci o filmu
const movieData = {
  title: "Bob Dylan: Potpuni Neznanac",
  cinema: "Cineplexx Big Kragujevac",
  hall: "Sala 2",
  format: "2D",
  showtime: "14.01.2025, 20:00",
  pricePerTicket: 590,
  image: dedaMrazImage, // Zameni sa stvarnom slikom
};

const Confirmation = () => {
  const { state } = useLocation();
  const { selectedSeats = [] } = state || {}; // Uzmi sedišta iz state-a ili postavi podrazumevanu vrednost
  const navigate = useNavigate();

  const totalPrice = selectedSeats.length * movieData.pricePerTicket;

  const handleRateMovie = () => {
    navigate("/rate-movie", { state: { movie: movieData } });
  };

  return (
    <div className="container my-5 text-light">
      <div className="row bg-dark p-4 rounded shadow-lg">
        {/* Sekcija sa slikom filma */}
        <div className="col-md-4">
          <img
            src={movieData.image}
            alt={movieData.title}
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Sekcija sa informacijama o rezervaciji */}
        <div className="col-md-8">
          <h3 className="text-uppercase fw-bold text-danger">
            {movieData.title}
          </h3>
          <h5 className="text-uppercase text-danger">{movieData.cinema}</h5>
          <p>
            <strong>Datum i vreme:</strong> {movieData.showtime}
          </p>
          <p>
            <strong>Sala:</strong> {movieData.hall}
          </p>
          <p>
            <strong>Format:</strong> {movieData.format}
          </p>

          {/* Izabrana sedišta */}
          <div className="my-3">
            <h6 className="text-danger fw-bold">Izabrana sedišta:</h6>
            <p>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "Nema izabranih sedišta"}
            </p>
          </div>

          {/* Cena i dugme za kupovinu */}
          <div className="bg-secondary p-3 rounded text-white">
            <p className="mb-2">
              <strong>Ukupno karata:</strong> {selectedSeats.length}
            </p>
            <p className="mb-2">
              <strong>Cena po karti:</strong>{" "}
              {movieData.pricePerTicket.toLocaleString()} RSD
            </p>
            <h4>
              <strong>Ukupna cena:</strong> {totalPrice.toLocaleString()} RSD
            </h4>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-light"
              onClick={() => navigate(-1)}
            >
              ← Nazad
            </button>
            <button className="btn btn-danger" onClick={handleRateMovie}>
              Kupi
            </button>
          </div>

          {/* Informacija o prijavi */}
          <p className="mt-3 text-muted text-center">
            Niste prijavljeni? <br />
            Ukoliko želite da kupite karte, neophodno je da se prijavite.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
