import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const MojeUlaznice = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://onlinebiskop-production.up.railway.app/api/tickets/my-tickets",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Greška pri učitavanju ulaznica.");

        setTickets(data);
      } catch (error) {
        console.error("❌ Greška pri učitavanju ulaznica:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [navigate]);

  if (loading)
    return <p className="text-center text-light">Učitavanje ulaznica...</p>;

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4 text-center">MOJE ULAZNICE</h2>

      {tickets.length === 0 ? (
        <p className="text-center text-dark">Nemate kupljenih ulaznica.</p>
      ) : (
        <div className="row">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="col-md-6 col-lg-4">
              <div className="card ticket-card bg-dark text-light mb-4 p-3 shadow">
                <img
                  src={
                    ticket.movie.image.startsWith("/")
                      ? `https://onlinebiskop-production.up.railway.app${ticket.movie.image}`
                      : ticket.movie.image
                  }
                  alt={ticket.movie.title}
                  className="img-fluid rounded"
                />
                <div className="card-body">
                  <h5 className="card-title text-danger">
                    {ticket.movie.title}
                  </h5>
                  <p>
                    <strong>Kupac:</strong> {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <strong>Broj karte:</strong> {ticket._id}
                  </p>
                  <p>
                    <strong>Sedišta:</strong> {ticket.seats.join(", ")}
                  </p>
                  <p>
                    <strong>Bioskop:</strong> {ticket.cinema.name} (
                    {ticket.cinema.location})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MojeUlaznice;
