// src/components/Header.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BSPHCLLogo from "../assets/images/BSPHCL.png";
import { UserContext } from "../context/UserContext";
import "../css/Header.css";

export default function Header({ title, subtitle }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <img src={BSPHCLLogo} alt="BSPHCL Logo" className="bsp-logo" />
        <div className="header-text">
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="header-right">
        <span className="welcome-text">
          Welcome, <strong>{user?.name || "User"}</strong>
        </span>
        <button className="back-btn" onClick={() => navigate("/landing")}>
          ← Back
        </button>
      </div>
    </header>
  );
}
