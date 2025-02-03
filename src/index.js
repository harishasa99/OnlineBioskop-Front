import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.css";
import { UserProvider } from "./context/UserContext";
import { SliderProvider } from "./context/SliderContext";
import { FavouriteProvider } from "./context/FavouriteContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      {" "}
      <SliderProvider>
        <FavouriteProvider>
          <App />
        </FavouriteProvider>
      </SliderProvider>
    </UserProvider>
  </React.StrictMode>
);
