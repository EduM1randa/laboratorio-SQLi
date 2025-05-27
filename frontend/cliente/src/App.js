import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import UsersList from "./components/UsersList";

function App() {
  const [activeView, setActiveView] = useState("login");

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          <h1>Laboratorio de Seguridad Web</h1>
          <p className="subtitle">Aplicación Vulnerable para Prácticas</p>
        </div>
        <nav className="app-nav">
          <button
            className={`nav-button ${activeView === "login" ? "active" : ""}`}
            onClick={() => setActiveView("login")}
          >
            Login
          </button>
          <button
            className={`nav-button ${activeView === "users" ? "active" : ""}`}
            onClick={() => setActiveView("users")}
          >
            Usuarios
          </button>
        </nav>
      </header>

      <main className="app-content">
        {activeView === "login" ? <Login /> : <UsersList />}
      </main>

      <footer className="app-footer">
        <p>Laboratorio de Seguridad Web - Inyección SQL</p>
        <p className="warning">
          ⚠️ APLICACIÓN VULNERABLE PARA FINES EDUCATIVOS ⚠️
        </p>
      </footer>
    </div>
  );
}

export default App;
