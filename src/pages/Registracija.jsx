import React, { useState, useEffect } from "react";

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

  const [cinemas, setCinemas] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await fetch(
          "https://onlinebiskop-production.up.railway.app/api/cinemas"
        );
        if (!response.ok) throw new Error("Greška pri učitavanju bioskopa!");
        const data = await response.json();
        setCinemas(data);
      } catch (err) {
        console.error("❌ Greška pri učitavanju bioskopa:", err);
        setError("Ne mogu da dohvatim listu bioskopa.");
      }
    };

    fetchCinemas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !favoriteCinema ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Molimo popunite sva obavezna polja!");
      return;
    }

    try {
      const formattedDateOfBirth = new Date(dateOfBirth).toISOString();

      const response = await fetch(
        "https://onlinebiskop-production.up.railway.app/api/auth/register",
        {
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
        }
      );

      const data = await response.json();

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
            {cinemas.map((cinema) => (
              <option key={cinema._id} value={cinema._id}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-danger w-100 mt-4">
          Kreiraj nalog
        </button>
      </form>
    </div>
  );
};

export default Registracija;
