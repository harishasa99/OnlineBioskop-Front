import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFavourite } from "../context/FavouriteContext";
import { UserContext } from "../context/UserContext";

const MovieCard = ({ movie }) => {
  const { addToFavourites, removeFromFavourites, isFavourite, favourites } =
    useFavourite();
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(isFavourite(movie._id));

  useEffect(() => {
    setFavourite(isFavourite(movie._id));
  }, [favourites]);

  const handleCardClick = () => {
    if (!movie._id) return;
    navigate(`/film/${movie._id}`);
  };

  const handleFavouriteClick = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/prijava"); // Ako korisnik nije prijavljen, preusmeri ga na prijavu
      return;
    }

    if (favourite) {
      removeFromFavourites(movie._id);
    } else {
      addToFavourites(movie);
    }
    setFavourite(!favourite);
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card bg-dark text-light h-100 shadow position-relative"
        onClick={handleCardClick}
      >
        <img
          src={
            movie.image.startsWith("http")
              ? movie.image
              : `http://localhost:5000${movie.image}`
          }
          className="card-img-top"
          alt={movie.title}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{movie.title}</h5>
          <p className="text-center text-light">
            <strong>Početak prikazivanja:</strong>{" "}
            {new Date(movie.releaseDate).toLocaleDateString("sr-RS")}
          </p>
        </div>

        {/* Prikaz ❤️ ikonice samo za prijavljene korisnike */}
        {isAuthenticated && (
          <button
            className={`position-absolute top-0 end-0 m-2 btn btn-sm ${
              favourite ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={handleFavouriteClick}
          >
            <i className={`fa-heart ${favourite ? "fas" : "far"}`}></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
