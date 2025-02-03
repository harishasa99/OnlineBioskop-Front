import React from "react";
import { Routes, Route } from "react-router-dom";

// Import stranica iz `pages` foldera
import Preporuceno from "./pages/Preporuceno";
import UBioskopu from "./pages/UBioskopu";
import Uskoro from "./pages/Uskoro";
import Reservation from "./pages/Reservation";
import SeatSelection from "./pages/SeatSelection";
import Confirmation from "./pages/Confirmation";
import FilmDetails from "./pages/FilmDetails";
import SearchPage from "./pages/SearchPage";
import RateMovie from "./components/RateMovie";
import Registracija from "./pages/Registracija";
import Prijava from "./pages/Prijava";
import Verifikacija from "./pages/Verifikacija";
import MojNalog from "./pages/MojNalog";
import IzmeniPodatke from "./pages/IzmeniPodatke";
import PromeniLozinku from "./pages/PromeniLozinku";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminMovies from "./pages/AdminMovies";
import AdminCinemas from "./pages/AdminCinemas";
import MojeUlaznice from "./pages/MojeUlaznice";
import MojaListaGledanja from "./pages/MojaListaGledanja";
import ProtectedRouteUser from "./components/ProtectedRouteUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Preporuceno />} />
      <Route path="/preporuceno" element={<Preporuceno />} />
      <Route path="/u-bioskopu" element={<UBioskopu />} />
      <Route path="/uskoro" element={<Uskoro />} />
      <Route path="/film/:id" element={<FilmDetails />} />
      <Route
        path="/reservation/:cinemaId/:showtimeId"
        element={<ProtectedRouteUser element={<Reservation />} />}
      />

      <Route
        path="/seats/:cinemaId/:showtimeId"
        element={<ProtectedRouteUser element={<SeatSelection />} />}
      />
      <Route
        path="/confirmation/:cinemaId/:showtimeId"
        element={<ProtectedRouteUser element={<Confirmation />} />}
      />

      {/* Ostale stranice */}
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/rate-movie"
        element={<ProtectedRouteUser element={<RateMovie />} />}
      />
      <Route path="/registracija" element={<Registracija />} />
      <Route path="/prijava" element={<Prijava />} />
      <Route path="/verifikacija/:token" element={<Verifikacija />} />
      <Route path="/moj-nalog" element={<MojNalog />} />
      <Route path="/izmeni-podatke" element={<IzmeniPodatke />} />
      <Route path="/promeni-lozinku" element={<PromeniLozinku />} />
      <Route
        path="/admin"
        element={<ProtectedRoute element={<AdminDashboard />} />}
      />
      <Route
        path="/admin/users"
        element={<ProtectedRoute element={<AdminUsers />} />}
      />
      <Route
        path="/admin/movies"
        element={<ProtectedRoute element={<AdminMovies />} />}
      />
      <Route
        path="/admin/cinemas"
        element={<ProtectedRoute element={<AdminCinemas />} />}
      />
      <Route
        path="/moje-ulaznice"
        element={<ProtectedRouteUser element={<MojeUlaznice />} />}
      />
      <Route
        path="/moja-lista"
        element={<ProtectedRouteUser element={<MojaListaGledanja />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
