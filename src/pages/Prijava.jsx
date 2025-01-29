import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast"; // ✅ Notifikacije

const Prijava = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      toast.error("Molimo popunite sva polja!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.accessToken) {
        toast.error(data.message || "Greška pri prijavljivanju.");
        return;
      }

      // ✅ Čuvamo token i korisničke podatke
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("✔ Token sačuvan:", data.accessToken);

      loginUser(data.user, data.accessToken);

      toast.success("Uspešno ste prijavljeni!");
      navigate("/");
    } catch (err) {
      toast.error("❌ Nije moguće povezati se sa serverom. Pokušajte kasnije.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-danger">Prijava</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-dark text-light p-4 rounded shadow"
      >
        <h5 className="text-danger mb-4">OBAVEZNE INFORMACIJE</h5>
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
            placeholder="Unesite vašu e-mail adresu"
            required
          />
        </div>
        <div className="mb-3">
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
            placeholder="Unesite vašu lozinku"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">
          Prijavi se
        </button>
      </form>
    </div>
  );
};

export default Prijava;
