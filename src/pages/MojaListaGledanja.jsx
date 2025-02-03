import React, { useContext } from "react";
import { useFavourite } from "../context/FavouriteContext";
import { UserContext } from "../context/UserContext";
import MovieCard from "../components/MovieCard";
import { Navigate } from "react-router-dom";

const MojaListaGledanja = () => {
  const { favourites } = useFavourite();
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <Navigate to="/prijava" />;
  }

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4 text-center">MOJA LISTA ZA GLEDANJE</h2>

      {favourites.length === 0 ? (
        <p className="text-center text-dark">Nemate filmove u omiljenim.</p>
      ) : (
        <div className="row">
          {favourites.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MojaListaGledanja;
