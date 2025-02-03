import React, { useState, useEffect } from "react";

const AdminCinemas = () => {
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newCinema, setNewCinema] = useState({ name: "", location: "" });
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showtime, setShowtime] = useState("");
  const [showDate, setShowDate] = useState("");

  useEffect(() => {
    fetchCinemas();
    fetchMovies();
  }, []);

  const fetchCinemas = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cinemas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setCinemas(data);
    } catch (error) {
      console.error("Greška pri dohvatanju bioskopa:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/movies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Greška pri dohvatanju filmova:", error);
    }
  };

  const handleAddCinema = async () => {
    if (!newCinema.name || !newCinema.location) {
      alert("Molimo unesite ime i lokaciju bioskopa.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cinemas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newCinema),
      });

      if (response.ok) {
        fetchCinemas();
        setNewCinema({ name: "", location: "" });
      } else {
        console.error("Greška pri dodavanju bioskopa.");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  const handleAddMovieToCinema = async () => {
    if (!selectedCinema || !selectedMovie || !showtime || !showDate) {
      alert("Molimo popunite sva polja.");
      return;
    }

    const dateTime = `${showDate} ${showtime}`;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cinemas/${selectedCinema}/addMovie`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            movieId: selectedMovie,
            showtimes: [dateTime],
          }),
        }
      );

      if (response.ok) {
        fetchCinemas();
        setSelectedCinema("");
        setSelectedMovie("");
        setShowtime("");
        setShowDate("");
      } else {
        console.error("Greška pri dodavanju filma u bioskop.");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  const handleDeleteCinema = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete bioskop?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/cinemas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        fetchCinemas();
      } else {
        console.error("Greška pri brisanju bioskopa.");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-danger">Upravljanje bioskopima</h2>

      <div className="card p-4 mb-4 shadow">
        <h4>Dodaj novi bioskop</h4>
        <div className="row">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Naziv bioskopa"
              value={newCinema.name}
              onChange={(e) =>
                setNewCinema({ ...newCinema, name: e.target.value })
              }
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Lokacija"
              value={newCinema.location}
              onChange={(e) =>
                setNewCinema({ ...newCinema, location: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAddCinema}>
              Dodaj
            </button>
          </div>
        </div>
      </div>

      <div className="card p-4 mb-4 shadow">
        <h4>Dodaj film u bioskop</h4>
        <div className="row">
          <div className="col-md-4">
            <select
              className="form-control mb-2"
              value={selectedCinema}
              onChange={(e) => setSelectedCinema(e.target.value)}
            >
              <option value="">Izaberi bioskop</option>
              {cinemas.map((cinema) => (
                <option key={cinema._id} value={cinema._id}>
                  {cinema.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-control mb-2"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
            >
              <option value="">Izaberi film</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control mb-2"
              value={showDate}
              onChange={(e) => setShowDate(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="time"
              className="form-control mb-2"
              value={showtime}
              onChange={(e) => setShowtime(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-warning w-100"
              onClick={handleAddMovieToCinema}
            >
              Dodaj film
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Lokacija</th>
              <th>Filmovi</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {cinemas.map((cinema) => (
              <tr key={cinema._id}>
                <td>{cinema.name}</td>
                <td>{cinema.location}</td>
                <td>
                  {cinema.movies.length > 0 ? (
                    cinema.movies.map((m) => (
                      <p key={m.movieId._id}>
                        {m.movieId.title} ({m.showtimes.join(", ")})
                      </p>
                    ))
                  ) : (
                    <i>Nema filmova</i>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCinema(cinema._id)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCinemas;
