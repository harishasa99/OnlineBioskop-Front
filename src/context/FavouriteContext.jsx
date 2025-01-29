import React, { createContext, useState, useContext } from "react";

// Kreiranje konteksta
const FavouriteContext = createContext();

// Hook za korišćenje konteksta
export const useFavourite = () => useContext(FavouriteContext);

// Provider komponenta
export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  const addToFavourites = (movie) => {
    setFavourites((prev) => {
      const updatedFavourites = [...prev, movie];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => {
      const updatedFavourites = prev.filter((movie) => movie.id !== movieId);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  const isFavourite = (movieId) =>
    favourites.some((movie) => movie.id === movieId);

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
