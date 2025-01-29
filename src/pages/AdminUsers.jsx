import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { user, refreshUser, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  // ✅ Modal state za brisanje korisnika
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // ⬅️ Ako korisnik više nije admin, preusmeri ga
      return;
    }
    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error("Greška pri dohvatanju korisnika:", data.message);
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  // ✅ Otvaranje modala za brisanje
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // ✅ Zatvaranje modala
  const closeDeleteModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  // ✅ Brisanje korisnika
  const deleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${selectedUser._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== selectedUser._id));
        closeDeleteModal(); // ⬅️ Zatvori modal nakon brisanja
      } else {
        console.error("Greška pri brisanju korisnika.");
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  // ✅ Izmena uloge korisnika
  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );

        // ✅ Ako admin sebi menja ulogu, osveži korisnika i preusmeri
        if (userId === user._id) {
          await refreshUser();
          navigate("/");
        }
      } else {
        console.error("Greška pri ažuriranju uloge:", data.message);
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2 className="text-danger text-center mb-4">Upravljanje korisnicima</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Unesite ime, prezime ili email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table table-dark table-bordered text-center">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Uloga</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="form-select bg-dark text-light"
                  value={user.role}
                  onChange={(e) => updateUserRole(user._id, e.target.value)}
                >
                  <option value="user">Korisnik</option>
                  <option value="admin">Administrator</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => openDeleteModal(user)}
                >
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <p className="text-light text-center">Nema pronađenih korisnika.</p>
      )}

      {/* 🛑 Modal za brisanje korisnika */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton className="bg-dark text-danger">
          <Modal.Title>BRISANJE KORISNIKA</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light text-center">
          <p>
            Da li želite da obrišete korisnika{" "}
            <b>
              {selectedUser?.firstName} {selectedUser?.lastName}
            </b>
            ?
          </p>
          <p className="text-danger fw-bold">Ova akcija je nepovratna!</p>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="outline-light" onClick={closeDeleteModal}>
            OTKAŽI
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            OBRIŠI
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUsers;
