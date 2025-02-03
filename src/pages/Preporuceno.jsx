import React, { useEffect, useState } from "react";
import MovieSlider from "../components/MovieSlider";
import MovieCard from "../components/MovieCard";

const Preporuceno = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://onlinebiskop-production.up.railway.app/api/movies/category/Preporučeno"
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Greška pri dohvatanju filmova:", error);
    }
  };

  return (
    <div className="container my-5">
      <MovieSlider movies={movies} />
      <h1 className="text-center mt-5">Preporučeni filmovi</h1>
      <div className="row">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Preporuceno;
