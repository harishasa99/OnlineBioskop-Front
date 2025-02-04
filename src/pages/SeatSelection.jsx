import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const SeatSelection = () => {
  const { cinemaId, showtimeId } = useParams();
  console.log("📌 Showtime ID primljen u SeatSelection:", showtimeId);
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    ticketCount = 0,
    movieTitle = "",
    movieImage = "/default-movie.jpg",
    cinemaName = "",
    cinemaLocation = "",
    pricePerTicket = 0,
    movieId,
  } = state || {};

  const [seats, setSeats] = useState({ availableSeats: [], bookedSeats: [] });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log("📌 Showtime ID primljen u SeatSelection:", showtimeId);
    if (!showtimeId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error("❌ showtimeId nije ObjectId! Vrednost:", showtimeId);
    } else {
      console.log("✅ showtimeId je validan ObjectId:", showtimeId);
    }

    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `https://onlinebiskop-production.up.railway.app/api/showtimes/${showtimeId}/seats`
        );
        if (!response.ok) throw new Error("Greška pri učitavanju sedišta!");
        const data = await response.json();
        setSeats(data);
      } catch (error) {
        console.error("❌ Greška pri učitavanju sedišta:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.warn("⚠️ Nema access tokena! Korisnik nije prijavljen.");
        alert("Morate biti prijavljeni da biste nastavili.");
        navigate("/login"); // ✅ Ako nema tokena, preusmeri korisnika
        return;
      }

      console.log("🔑 Access Token pronađen u localStorage:", accessToken);

      try {
        const response = await fetch(
          "https://onlinebiskop-production.up.railway.app/api/users/me",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUserId(data._id);
          console.log("✅ Korisnik ID:", data._id); // ✅ Debug log
        } else {
          console.error("❌ Greška pri dohvatanju korisnika:", data.message);
          alert("Sesija je istekla. Prijavite se ponovo.");
          localStorage.removeItem("accessToken"); // ✅ Brišemo nevažeći token
          navigate("/login"); // ✅ Preusmeravamo na login
        }
      } catch (error) {
        console.error("❌ Greška pri dohvatanju korisnika:", error);
      }
    };

    fetchSeats();
    fetchUser();
  }, [showtimeId, navigate]);

  const handleSeatClick = (seat) => {
    if (seats.bookedSeats.includes(seat) || selectedSeats.length >= ticketCount)
      return;

    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat]
    );
  };

  const handleNextStep = () => {
    if (selectedSeats.length !== ticketCount) return;

    console.log("➡️ Navigacija ka Confirmation sa podacima:", {
      movieTitle,
      movieImage,
      cinemaName,
      cinemaLocation,
      showtime: showtimeId,
      selectedSeats,
      pricePerTicket,
      movieId, // ✅ Osiguravamo da je movieId prisutan
      cinemaId,
      userId,
    });

    navigate(`/confirmation/${cinemaId}/${showtimeId}`, {
      state: {
        movieTitle,
        movieImage,
        cinemaName,
        cinemaLocation,
        showtime: showtimeId,
        selectedSeats,
        pricePerTicket,
        movieId, // ✅ Movie ID sigurno postoji
        cinemaId,
        userId,
      },
    });
  };

  if (loading)
    return <h2 className="text-center text-light">Učitavanje sedišta...</h2>;

  return (
    <div className="container my-5 text-light text-center">
      <h1 className="text-center mb-4 text-danger">Izaberite sedišta</h1>
      <div className="row d-flex flex-wrap justify-content-center">
        {Array.from({ length: 48 }, (_, i) => i + 1).map((seat) => (
          <div
            key={seat}
            className={`col-1 m-2 p-3 text-center rounded seat-box ${
              seats.bookedSeats.includes(seat)
                ? "bg-danger text-white" // 🟥 Zauzeto
                : selectedSeats.includes(seat)
                ? "bg-warning text-white" // 🟨 Izabrano
                : "bg-success text-white" // 🟩 Slobodno
            }`}
            style={{
              cursor: seats.bookedSeats.includes(seat)
                ? "not-allowed"
                : "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-danger btn-lg"
          onClick={handleNextStep}
          disabled={selectedSeats.length !== ticketCount || !userId}
        >
          Sledeći korak
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
