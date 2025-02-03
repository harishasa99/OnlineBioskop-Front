import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

const FavouriteContext = createContext();

export const useFavourite = () => useContext(FavouriteContext);

export const FavouriteProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavourites();
    } else {
      setFavourites([]); // Ako korisnik nije prijavljen, lista je prazna
    }
  }, [user, isAuthenticated]);

  const fetchFavourites = async () => {
    try {
      const response = await fetch(
        "https://onlinebiskop-production.up.railway.app/api/users/favourites",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setFavourites(data);
      } else {
        console.error("Greška pri dohvatanju omiljenih filmova:", data.message);
      }
    } catch (error) {
      console.error("❌ Greška pri dohvatanju omiljenih filmova:", error);
    }
  };

  const addToFavourites = async (movie) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(
        "https://onlinebiskop-production.up.railway.app/api/users/favourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ movieId: movie._id }),
        }
      );

      if (response.ok) {
        setFavourites((prev) => [...prev, movie]);
      }
    } catch (error) {
      console.error("❌ Greška pri dodavanju filma u omiljene:", error);
    }
  };

  const removeFromFavourites = async (movieId) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(
        `https://onlinebiskop-production.up.railway.app/api/users/favourites/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        setFavourites((prev) => prev.filter((movie) => movie._id !== movieId));
      }
    } catch (error) {
      console.error("❌ Greška pri uklanjanju filma iz omiljenih:", error);
    }
  };

  const isFavourite = (movieId) =>
    favourites.some((movie) => movie._id === movieId);

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
