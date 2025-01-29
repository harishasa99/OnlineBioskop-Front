import React, { useEffect, useState } from "react";
import MovieSlider from "../components/MovieSlider";
import MovieCard from "../components/MovieCard";

const UBioskopu = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/movies/category/U bioskopu"
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
      <h1 className="text-center mt-5">Filmovi u bioskopima</h1>
      <div className="row">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default UBioskopu;
