import React from "react";
import { Routes, Route } from "react-router-dom";

// Import stranica iz `pages` foldera
import Preporuceno from "./pages/Preporuceno";
import UBioskopu from "./pages/UBioskopu";
import Uskoro from "./pages/Uskoro";
import ChooseCinema from "./pages/ChooseCinema";
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Glavne stranice */}
      <Route path="/" element={<Preporuceno />} />
      <Route path="/preporuceno" element={<Preporuceno />} />
      <Route path="/u-bioskopu" element={<UBioskopu />} />
      <Route path="/uskoro" element={<Uskoro />} />
      {/* Stranice za proces kupovine */}
      <Route path="/film/:id" element={<FilmDetails />} />
      <Route path="/cinema" element={<ChooseCinema />} />
      <Route
        path="/reservation/:cinemaId/:showtimeId"
        element={<Reservation />}
      />
      <Route path="/seats/:cinemaId/:showtimeId" element={<SeatSelection />} />
      <Route
        path="/confirmation/:cinemaId/:showtimeId"
        element={<Confirmation />}
      />
      {/* Ostale stranice */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/rate-movie" element={<RateMovie />} />
      <Route path="/registracija" element={<Registracija />} />
      <Route path="/prijava" element={<Prijava />} />
      <Route path="/verifikacija/:token" element={<Verifikacija />} />
      <Route path="/moj-nalog" element={<MojNalog />} />
      <Route path="/izmeni-podatke" element={<IzmeniPodatke />} />
      <Route path="/promeni-lozinku" element={<PromeniLozinku />} />
      {/* Admin Panel (zaštićena ruta) */}
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
    </Routes>
  );
};

export default AppRoutes;
