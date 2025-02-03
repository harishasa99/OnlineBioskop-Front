import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Verifikacija = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifikacija u toku...");

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await fetch(
          `https://onlinebiskop-production.up.railway.app/api/auth/verify/${token}`
        );
        const data = await response.json();

        if (response.ok) {
          setMessage(
            "Uspešno ste verifikovali nalog! Sada se možete prijaviti."
          );
        } else {
          setMessage(data.message || "Verifikacija nije uspela.");
        }
      } catch (error) {
        setMessage("Greška prilikom verifikacije. Pokušajte kasnije.");
      }
    };

    verifyAccount();
  }, [token]);

  return (
    <div className="container text-center my-5">
      <h2 className="text-danger">Verifikacija naloga</h2>
      <p>{message}</p>
      <a href="/prijava" className="btn btn-danger">
        Prijavi se
      </a>
    </div>
  );
};

export default Verifikacija;
