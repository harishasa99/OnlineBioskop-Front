import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const SeatSelection = () => {
  const { cinemaId, showtimeId } = useParams();
  const { state } = useLocation();
  const { ticketCount } = state;
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    reserved: i % 5 === 0,
  }));

  const handleSeatClick = (seat) => {
    if (seat.reserved) return;
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleNextStep = () => {
    navigate(`/confirmation/${cinemaId}/${showtimeId}`, {
      state: { selectedSeats },
    });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Izaberite sedišta</h1>
      <div className="row">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`col-1 m-2 border text-center seat ${
              seat.reserved
                ? "bg-secondary"
                : selectedSeats.includes(seat.id)
                ? "bg-danger text-white"
                : "bg-light"
            }`}
            style={{ cursor: seat.reserved ? "not-allowed" : "pointer" }}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary bg-danger mt-4 d-block mx-auto"
        onClick={handleNextStep}
        disabled={selectedSeats.length !== ticketCount}
      >
        Sledeći korak
      </button>
    </div>
  );
};

export default SeatSelection;
