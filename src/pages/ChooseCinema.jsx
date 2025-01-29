import React from "react";
import { useNavigate } from "react-router-dom";

const ChooseCinema = () => {
  const navigate = useNavigate();

  const cinemas = [
    {
      id: 1,
      name: "Cineplexx Ušće Shopping Center",
      showtimes: [
        { id: 1, movie: "Better Man", time: "22:10", hall: "Sala 10" },
      ],
    },
    {
      id: 2,
      name: "Cineplexx 4D Delta City",
      showtimes: [
        { id: 2, movie: "Spider-Man", time: "21:30", hall: "Sala 5" },
      ],
    },
  ];

  const handleSelectShowtime = (cinemaId, showtimeId) => {
    navigate(`/reservation/${cinemaId}/${showtimeId}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Izaberite Bioskop</h1>
      {cinemas.map((cinema) => (
        <div key={cinema.id} className="mb-4">
          <h3>{cinema.name}</h3>
          <ul className="list-group">
            {cinema.showtimes.map((showtime) => (
              <li
                key={showtime.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {showtime.movie} - {showtime.time} ({showtime.hall})
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectShowtime(cinema.id, showtime.id)}
                >
                  Izaberi
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChooseCinema;
