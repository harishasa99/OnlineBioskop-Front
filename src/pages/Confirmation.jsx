import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    movieTitle,
    movieImage = "/default-movie.jpg",
    cinemaName,
    cinemaLocation,
    showtime,
    selectedSeats = [],
    pricePerTicket,
    cinemaId,
    movieId,
    userId,
  } = state || {};

  const totalPrice = selectedSeats.length * pricePerTicket;

  // ✅ Funkcija za kupovinu karata
  const handlePurchase = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Morate biti prijavljeni da biste kupili kartu.");
      navigate("/login");
      return;
    }

    if (
      !userId ||
      !movieId ||
      !cinemaId ||
      !showtime ||
      selectedSeats.length === 0
    ) {
      alert(
        "Nedostaju podaci za kupovinu. Proverite da li ste izabrali sve opcije."
      );
      return;
    }

    const requestData = {
      userId,
      movieId,
      cinemaId,
      showtime: new Date(showtime).toISOString(),
      seats: selectedSeats,
    };

    console.log("📌 Šaljem podatke na backend:", requestData);

    try {
      const response = await fetch(
        "https://onlinebiskop-production.up.railway.app/api/tickets/purchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const responseData = await response.json();
      console.log("📩 Backend odgovor:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Greška pri kupovini karata.");
      }

      alert("🎉 Uspešno ste kupili karte!");
      navigate("/rate-movie", {
        state: {
          movieTitle,
          movieImage,
          movieId,
        },
      }); // ✅ SADA ISPRAVNO PROSLEĐUJEMO PODATKE KA RATE MOVIE STRANICI
    } catch (error) {
      console.error("❌ Greška pri kupovini karata:", error);
      alert(error.message || "Došlo je do greške pri kupovini.");
    }
  };

  return (
    <div className="container my-5 text-light">
      <div className="row bg-dark p-4 rounded shadow-lg">
        <div className="col-md-4">
          <img
            src={
              movieImage.startsWith("/")
                ? `https://onlinebiskop-production.up.railway.app${movieImage}`
                : movieImage
            }
            alt={movieTitle || "Film"}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <h3 className="text-uppercase fw-bold text-danger">{movieTitle}</h3>
          <h5 className="text-uppercase text-danger">
            {cinemaName} - {cinemaLocation}
          </h5>
          <p>
            <strong>Datum i vreme:</strong> {showtime}
          </p>
          <div className="my-3">
            <h6 className="text-danger fw-bold">Izabrana sedišta:</h6>
            <p>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "Nema izabranih sedišta"}
            </p>
          </div>

          <div className="bg-secondary p-3 rounded text-white">
            <p>
              <strong>Ukupno karata:</strong> {selectedSeats.length}
            </p>
            <p>
              <strong>Cena po karti:</strong> {pricePerTicket.toLocaleString()}{" "}
              RSD
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
            <button
              className="btn btn-danger"
              onClick={handlePurchase}
              disabled={!userId}
            >
              Kupi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
