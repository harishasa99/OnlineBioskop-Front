import React from "react";
import ReactDOM from "react-dom/client"; // Ovo je ispravna import linija za React 18
import App from "./App";
import "./styles/style.css"; // Dodajte ovde vaš CSS fajl
import { SliderProvider } from "./context/SliderContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FavouriteProvider } from "./context/FavouriteContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // Pravimo root element
root.render(
  <React.StrictMode>
    <SliderProvider>
      <FavouriteProvider>
        <App />
      </FavouriteProvider>
    </SliderProvider>
  </React.StrictMode>
);
