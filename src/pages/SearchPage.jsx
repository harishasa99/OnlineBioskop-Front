import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import medaImage from "../assets/images/slika1.jpg";

// Simulirani podaci o filmovima
const movies = [
  {
    id: 1,
    title: "Meda Pedington u Džungli",
    director: "John Doe",
    description: "Uzbudljiva avantura medveda Pedingtona u srcu džungle.",
    releaseDate: "2025-01-09",
    image: medaImage,
  },
  {
    id: 2,
    title: "Dražen",
    director: "Jane Smith",
    description: "Inspirativna priča o košarkaškoj legendi Draženu Petroviću.",
    releaseDate: "2024-12-15",
    image: medaImage,
  },
  {
    id: 3,
    title: "Crveni",
    director: "Michael Johnson",
    description: "Napeta akcija koja će vas držati na ivici sedišta.",
    releaseDate: "2024-11-07",
    image: medaImage,
  },
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtriranje filmova po nazivu i režiseru
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMovieClick = (id) => {
    navigate(`/film/${id}`);
  };

  return (
    <div className="container my-5">
      {/* Naslov stranice */}
      <h1 className="mb-4 text-dark">Pretraga filmova</h1>

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
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            outline: "none", // Uklanja plavi okvir na fokus
            boxShadow: "none", // Uklanja dodatne senke
          }}
        />
      </div>

      {/* Lista filmova */}
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="d-flex align-items-center p-3 mb-3 bg-dark rounded shadow-sm"
            style={{
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onClick={() => handleMovieClick(movie.id)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {/* Prikaz slike filma */}
            <img
              src={movie.image}
              alt={movie.title}
              className="me-3 rounded"
              style={{
                width: "150px",
                height: "200px",
                objectFit: "cover",
              }}
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
        ))}
      </div>

      {/* Poruka ako nema rezultata */}
      {filteredMovies.length === 0 && (
        <p className="text-center text-muted">
          Nema rezultata za vašu pretragu.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
