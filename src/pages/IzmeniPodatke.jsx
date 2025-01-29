import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const IzmeniPodatke = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    favoriteCinema: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.warn("❌ Nema tokena! Preusmeravam na prijavu...");
        navigate("/prijava");
        return;
      }

      if (user) {
        console.log("✅ Korisnik već postoji u kontekstu:", user);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
          gender: user.gender || "",
          favoriteCinema: user.favoriteCinema || "",
        });
        setLoading(false);
        return;
      }

      console.log("📡 Dohvatanje korisnika sa tokenom:", token);

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          console.log("✅ Korisnik uspešno dohvaćen:", data);
          updateUser(data);
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
            gender: data.gender || "",
            favoriteCinema: data.favoriteCinema || "",
          });
        } else {
          console.error("❌ Autentifikacija nije uspela:", data);
          localStorage.removeItem("accessToken");
          toast.error("Sesija je istekla. Prijavite se ponovo.");
          navigate("/prijava");
        }
      } catch (error) {
        console.error("❌ Greška pri dohvaćanju korisnika:", error);
        navigate("/prijava");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, updateUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Morate biti prijavljeni!");
      navigate("/prijava");
      return;
    }

    console.log("📡 Slanje zahteva za ažuriranje sa tokenom:", token);

    try {
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Podaci uspešno ažurirani:", data);
        updateUser(data);
        toast.success("Podaci su uspešno izmenjeni!");
        navigate("/moj-nalog");
      } else {
        console.error("❌ Greška pri ažuriranju:", data);
        toast.error(data.message || "Greška pri ažuriranju podataka.");
      }
    } catch (error) {
      console.error("❌ Greška u mreži:", error);
      toast.error("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  if (loading) return <p className="text-light">Učitavanje podataka...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-danger mb-4">IZMENI PODATKE</h2>
      <div className="card bg-dark text-light p-4 rounded shadow">
        <table className="table table-bordered custom-table">
          <tbody>
            <tr>
              <th>Ime</th>
              <td>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Prezime</th>
              <td>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Datum rođenja</th>
              <td>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-control rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>Pol</th>
              <td>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-control rounded"
                  required
                >
                  <option value="Muško">Muško</option>
                  <option value="Žensko">Žensko</option>
                  <option value="Drugo">Drugo</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Omiljeni bioskop</th>
              <td>
                <input
                  type="text"
                  name="favoriteCinema"
                  value={formData.favoriteCinema}
                  onChange={handleChange}
                  className="form-control rounded"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit} className="btn btn-danger w-100 mt-3">
        Sačuvaj
      </button>
    </div>
  );
};

export default IzmeniPodatke;
