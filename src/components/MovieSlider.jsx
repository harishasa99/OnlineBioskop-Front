import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSlider } from "../context/SliderContext";

const MovieSlider = () => {
  const { currentSlide, setCurrentSlide } = useSlider();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/movies/category/Uskoro"
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Greška pri dohvatanju filmova:", error);
    }
  };

  // Funkcija za filtriranje 3 najbliža datuma
  const getClosestMovies = () => {
    const currentDate = new Date();
    return movies
      .filter((movie) => new Date(movie.releaseDate) >= currentDate)
      .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
      .slice(0, 3);
  };

  const sortedMovies = getClosestMovies();

  const handleMovieClick = (movieId) => {
    navigate(`/film/${movieId}`);
  };

  return (
    <Carousel
      activeIndex={currentSlide}
      onSelect={(selectedIndex) => setCurrentSlide(selectedIndex)}
    >
      {sortedMovies.map((movie) => (
        <Carousel.Item
          key={movie._id}
          onClick={() => handleMovieClick(movie._id)}
          style={{ cursor: "pointer" }}
        >
          <img
            className="d-block w-100"
            src={
              movie.image.startsWith("http")
                ? movie.image
                : `http://localhost:5000${movie.image}`
            }
            alt={movie.title}
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h2 className="text-uppercase fw-bold text-light">{movie.title}</h2>
            <p className="text-light">{movie.description}</p>
            <button className="btn btn-warning">
              Početak: {new Date(movie.releaseDate).toISOString().split("T")[0]}
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MovieSlider;
