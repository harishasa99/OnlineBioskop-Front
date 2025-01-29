import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PromeniLozinku = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("accessToken"); // ✅ Koristimo ispravan token

    if (!token) {
      setError("Morate biti prijavljeni!");
      navigate("/prijava");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Pravi token
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Greška pri promeni lozinke");
        return;
      }

      setMessage("Lozinka uspešno promenjena!");
      setFormData({ oldPassword: "", newPassword: "" });

      setTimeout(() => navigate("/moj-nalog"), 2000);
    } catch (error) {
      setError("Nije moguće povezati se sa serverom.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-danger">Promeni Lozinku</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded">
        <div className="mb-3">
          <label>Stara lozinka</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Nova lozinka</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">
          Promeni lozinku
        </button>
      </form>
    </div>
  );
};

export default PromeniLozinku;
