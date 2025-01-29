import React, { useState } from "react";

const Registracija = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    favoriteCinema: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Funkcija za ažuriranje podataka u formi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funkcija za proveru ispravnosti e-mail adrese
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Funkcija za slanje podataka na backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      favoriteCinema,
      email,
      password,
      confirmPassword,
    } = formData;

    console.log("📤 Podaci koji se šalju na backend:", formData);

    // Validacija podataka
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !dateOfBirth ||
      !gender.trim() ||
      !favoriteCinema.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Molimo popunite sva obavezna polja!");
      return;
    }

    try {
      const formattedDateOfBirth = new Date(dateOfBirth).toISOString(); // Pretvaramo datum u ispravan format

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          dateOfBirth: formattedDateOfBirth,
          gender,
          favoriteCinema,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      console.log("📥 Odgovor sa backenda:", data);

      if (response.ok) {
        setSuccess(
          `Uspešno ste se registrovali! Proverite email (${email}) i verifikujte nalog.`
        );
        setError("");
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          favoriteCinema: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.message || "Došlo je do greške. Pokušajte ponovo.");
      }
    } catch (err) {
      console.error("❌ Greška pri slanju zahteva:", err);
      setError("Nije moguće povezati se sa serverom. Pokušajte kasnije.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-danger">Registracija</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form
        onSubmit={handleSubmit}
        className="bg-dark text-light p-4 rounded shadow"
      >
        <h5 className="text-danger mb-4">OBAVEZNE INFORMACIJE</h5>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              Ime
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Prezime
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Datum rođenja
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="gender" className="form-label">
              Pol
            </label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Izaberite pol</option>
              <option value="Muško">Muško</option>
              <option value="Žensko">Žensko</option>
              <option value="Drugo">Drugo</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="favoriteCinema" className="form-label">
            Omiljeni bioskop
          </label>
          <select
            className="form-control"
            id="favoriteCinema"
            name="favoriteCinema"
            value={formData.favoriteCinema}
            onChange={handleChange}
          >
            <option value="">Izaberite bioskop</option>
            <option value="Cineplexx Kragujevac">Cineplexx Kragujevac</option>
            <option value="Cineplexx Beograd">Cineplexx Beograd</option>
            <option value="Arena Cineplex Novi Sad">
              Arena Cineplex Novi Sad
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-Mail adresa
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Lozinka
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Ponovite lozinku
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-danger w-100 mt-4">
          Kreiraj nalog
        </button>
      </form>
    </div>
  );
};

export default Registracija;
