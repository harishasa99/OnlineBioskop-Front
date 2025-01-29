import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavourite } from "../context/FavouriteContext";

const MovieCard = ({ movie }) => {
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourite();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!movie._id) return; // 🛑
    navigate(`/film/${movie._id}`);
  };

  const formattedDate = new Date(movie.releaseDate).toISOString().split("T")[0];
  const imageUrl = movie.image.startsWith("http")
    ? movie.image
    : `http://localhost:5000${movie.image}`;

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card bg-dark text-light h-100 shadow position-relative"
        style={{ cursor: "pointer" }}
        onClick={handleCardClick}
      >
        <img
          src={imageUrl}
          className="card-img-top"
          alt={movie.title}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{movie.title}</h5>
          <p className="card-text text-center">
            Početak prikazivanja: <strong>{formattedDate}</strong>
          </p>
        </div>
        <button
          className={`position-absolute top-0 end-0 m-2 btn btn-sm ${
            isFavourite(movie.id) ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            isFavourite(movie.id)
              ? removeFromFavourites(movie.id)
              : addToFavourites(movie);
          }}
        >
          <i
            className={`fa-heart ${isFavourite(movie.id) ? "fas" : "far"}`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
