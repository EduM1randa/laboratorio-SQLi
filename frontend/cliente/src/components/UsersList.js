import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersList.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async (filterValue = "") => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:3002/users${
          filterValue ? `?username=${filterValue}` : ""
        }`
      );
      setUsers(response.data);
    } catch (err) {
      setError("Error al conectar con el servidor: " + err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(filter);
  };

  return (
    <div className="users-container">
      <div className="users-panel">
        <h2>Listado de Usuarios</h2>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar por nombre de usuario..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>

        {loading ? (
          <div className="loading">Cargando usuarios...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="users-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-results">
                      No se encontraron usuarios
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersList;
