import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://onlinebiskop-production.up.railway.app/api/users/me",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          console.error("❌ Neuspešna autentifikacija:", data.message);
          logoutUser();
        }
      } catch (error) {
        console.error("❌ Greška pri dohvaćanju korisnika:", error);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Funkcija za osvežavanje korisnika bez ponovnog logovanja
  const refreshUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch(
        "https://onlinebiskop-production.up.railway.app/api/users/me",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.error("❌ Greška pri osvežavanju korisnika:", error);
    }
  };

  // ✅ Funkcija za ažuriranje korisničkih podataka
  const updateUser = (updatedData) => {
    localStorage.setItem("user", JSON.stringify(updatedData));
    setUser(updatedData);
  };

  // ✅ Funkcija za prijavu
  const loginUser = (userData, token) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Funkcija za odjavu
  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user, // ✅ Da li je korisnik prijavljen?
        isAdmin: user?.role === "admin", // ✅ Provera admin role
        loginUser,
        logoutUser,
        updateUser,
        refreshUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
