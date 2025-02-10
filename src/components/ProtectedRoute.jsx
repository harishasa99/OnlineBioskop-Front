import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ element }) => {
  const { user, isAdmin, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) return null; // ⏳ Sačekaj dok se ne učita korisnik

  if (!user) return <Navigate to="/prijava" state={{ from: location }} />;

  if (!isAdmin && location.pathname.startsWith("/admin")) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
