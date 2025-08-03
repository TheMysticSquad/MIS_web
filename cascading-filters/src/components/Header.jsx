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
        <img src={BSPHCLLogo} alt="BSPHCL Logo" />
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="header-right">
        <span>Welcome, {user?.name || "User"}</span>
        <button className="back-btn" onClick={() => navigate("/landing")}>
          ← Back
        </button>
      </div>
    </header>
  );
}
