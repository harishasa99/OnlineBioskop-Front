import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SliderProvider } from "./context/SliderContext";
import { UserProvider } from "./context/UserContext"; // 🟢 Dodali smo UserProvider
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <SliderProvider>
        <Router>
          <Toaster position="top-right" reverseOrder={false} />
          <Navbar />
          <AppRoutes />
          <Footer />
        </Router>
      </SliderProvider>
    </UserProvider>
  );
}

export default App;
