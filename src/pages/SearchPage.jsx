import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // 📌 Dohvatanje filmova iz baze pri prvom učitavanju
  useEffect(() => {
    fetchMovies("");
  }, []);

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://onlinebiskop-production.up.railway.app/api/movies?search=${query}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Greška pri dohvatanju filmova:", error);
    }
  };

  // 📌 Filtriranje filmova kada korisnik kuca
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchMovies(value);
  };

  const handleMovieClick = (id) => {
    navigate(`/film/${id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-danger text-center">Pretraga filmova</h1>

      {/* Polje za pretragu */}
      <div className="input-group mb-4">
        <span className="input-group-text bg-dark border-secondary text-light">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary"
          placeholder="Unesite naziv filma ili ime režisera"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Lista filmova */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie._id}
              className="d-flex align-items-center p-3 mb-3 bg-dark rounded shadow-sm"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => handleMovieClick(movie._id)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* Prikaz slike filma */}
              <img
                src={`http://localhost:5000${movie.image}`}
                alt={movie.title}
                className="me-3 rounded"
                style={{ width: "150px", height: "200px", objectFit: "cover" }}
              />
              {/* Detalji filma */}
              <div>
                <h5 className="text-light mb-1">{movie.title}</h5>
                <p className="text-light mb-1">
                  <strong>Režiser:</strong> {movie.director}
                </p>
                <p className="text-muted mb-0">{movie.description}</p>
                <p className="text-muted">
                  Početak prikazivanja: {movie.releaseDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Nema pronađenih filmova.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
