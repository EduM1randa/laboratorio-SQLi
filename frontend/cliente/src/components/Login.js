import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3002/users/login", {
        username,
        password,
      });

      if (response.data.success) {
        setMessage(`Login exitoso! Bienvenido ${response.data.user.username}`);
        setUser(response.data.user);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al conectar con el servidor"
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMessage("");
    setUsername("");
    setPassword("");
  };

  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-panel">
          <h2>Panel de Usuario</h2>
          <div className="user-info">
            <p>
              <strong>Usuario:</strong> {user.username}
            </p>
            <p>
              <strong>Rol:</strong> {user.role}
            </p>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
          </div>
          <button onClick={handleLogout} className="auth-button">
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>

        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Procesando..." : "Ingresar"}
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}

export default Login;
