// src/components/Footer.jsx
import React from "react";
import "./../styles/style.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <div className="container text-center">
        <div className="row justify-content-center">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">O Nama</h5>
            <p>
              Dobrodošli u naš bioskop! Nudimo najnovije filmove, vrhunski
              doživljaj gledanja i komforne sale. Pridružite nam se i uživajte u
              najboljim filmskim trenucima.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Brzi Linkovi</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/preporuceno" className="text-light">
                  Preporučeno
                </a>
              </li>
              <li>
                <a href="/u-bioskopu" className="text-light">
                  U Bioskopima
                </a>
              </li>
              <li>
                <a href="/uskoro" className="text-light">
                  Uskoro
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Pratite Nas</h5>
            <div className="d-flex justify-content-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <p className="mb-0">&copy; {new Date().getFullYear()} FilmFront.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
