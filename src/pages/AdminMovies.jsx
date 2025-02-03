import React, { useState, useEffect } from "react";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    genre: "",
    director: "",
    duration: "",
    releaseDate: "",
    price: "",
    categories: [],
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/movies");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Greška pri učitavanju filmova:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setNewMovie((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleAddMovie = async () => {
    const formData = new FormData();
    Object.keys(newMovie).forEach((key) => {
      formData.append(key, newMovie[key]);
    });
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMovies([...movies, data.movie]);
        setNewMovie({
          title: "",
          description: "",
          genre: "",
          director: "",
          duration: "",
          releaseDate: "",
          price: "",
          categories: [],
        });
        setImageFile(null);
      } else {
        console.error("Greška pri dodavanju filma:", data.message);
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete film?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        setMovies(movies.filter((movie) => movie._id !== id));
      } else {
        console.error("Greška pri brisanju filma.");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-danger text-center mb-4">Upravljanje filmovima</h2>

      {/* 📌 Forma za dodavanje filma */}
      <div className="card p-4 mb-4 shadow" style={{ overflowX: "auto" }}>
        <h4>Dodaj novi film</h4>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Naslov"
              value={newMovie.title}
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
            />
            <textarea
              className="form-control mb-2"
              placeholder="Opis"
              value={newMovie.description}
              onChange={(e) =>
                setNewMovie({ ...newMovie, description: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Žanr"
              value={newMovie.genre}
              onChange={(e) =>
                setNewMovie({ ...newMovie, genre: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Režiser"
              value={newMovie.director}
              onChange={(e) =>
                setNewMovie({ ...newMovie, director: e.target.value })
              }
            />

            {/* 📌 Dugme za dodavanje filma (SADA ISPOD REŽISERA) */}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Trajanje"
              value={newMovie.duration}
              onChange={(e) =>
                setNewMovie({ ...newMovie, duration: e.target.value })
              }
            />
            <input
              type="date"
              className="form-control mb-2"
              value={newMovie.releaseDate}
              onChange={(e) =>
                setNewMovie({ ...newMovie, releaseDate: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Cena"
              value={newMovie.price}
              onChange={(e) =>
                setNewMovie({ ...newMovie, price: e.target.value })
              }
            />
            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            {/* 📌 Izbor stranice gde ide film */}
            <div className="mb-3">
              <label className="form-label">Gde će film biti prikazan?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={newMovie.categories.includes("Preporučeno")}
                  onChange={() => handleCategoryChange("Preporučeno")}
                />
                <label className="form-check-label">Preporučeno</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={newMovie.categories.includes("U bioskopu")}
                  onChange={() => handleCategoryChange("U bioskopu")}
                />
                <label className="form-check-label">U bioskopu</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={newMovie.categories.includes("Uskoro")}
                  onChange={() => handleCategoryChange("Uskoro")}
                />
                <label className="form-check-label">Uskoro</label>
              </div>
              <button
                className="btn btn-success mt-2"
                onClick={handleAddMovie}
                style={{ width: "200px" }}
              >
                Dodaj film
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📌 Tabela za prikaz i izmenu filmova */}
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Žanr</th>
              <th>Režiser</th>
              <th>Trajanje</th>
              <th>Cena</th>
              <th>Kategorije</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.director}</td>
                <td>{movie.duration}</td>
                <td>{movie.price} RSD</td>
                <td>{movie.categories.join(", ")}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteMovie(movie._id)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMovies;
