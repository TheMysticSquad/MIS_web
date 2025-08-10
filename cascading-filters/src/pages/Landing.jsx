// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Landing.css";
import { logout } from "../auth";

// Icon Imports
import BillingIcon from "../assets/icons/billing.png";
import CollectionIcon from "../assets/icons/collection.png";
import DisconnectionIcon from "../assets/icons/disconnection.jpg";
import MeteringIcon from "../assets/icons/metering.jpg";
import NSCIcon from "../assets/icons/nsc.png";
import TheftIcon from "../assets/icons/theft.png";
import BSPHCLLogo from "../assets/images/BSPHCL.png"; // ✅ BSPHCL Logo

export default function Landing() {
  const navigate = useNavigate();

  const dashboards = [
    {
      name: "NSC Dashboard",
      desc: "Monitor new service connection metrics.",
      path: "/nsc-dashboard",
      icon: NSCIcon,
    },
    {
      name: "Billing Dashboard",
      desc: "Track billing cycles and outstanding payments.",
      path: "/billing-dashboard",
      icon: BillingIcon,
    },
    {
      name: "Collection Dashboard",
      desc: "Monitor payment collections and recovery rates.",
      path: "/collection-dashboard",
      icon: CollectionIcon,
    },
    {
      name: "Metering Dashboard",
      desc: "Access meter readings and smart meter deployments.",
      path: "/metering-dashboard",
      icon: MeteringIcon,
    },
    {
      name: "DND Dashboard",
      desc: "Monitor distribution network performance.",
      path: "/disconnection-dashboard",
      icon: DisconnectionIcon,
    },
    {
      name: "Theft Dashboard",
      desc: "Track power theft cases and recovery actions.",
      path: "/theft-dashboard",
      icon: TheftIcon,
    },
  ];

  const handleLogout = () => {
    logout(); // Clear session / token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="landing-page">
      {/* ✅ Header */}
      <header className="landing-header">
        <div className="header-left">
          <img src={BSPHCLLogo} alt="BSPHCL Logo" />
          <h1>BSPHCL Dashboard Portal</h1>
        </div>
        <div className="header-right">
          <span>Welcome</span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "15px",
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
            title="Logout"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ✅ Dashboard Cards */}
      <div className="dashboard-container">
        {dashboards.map((dash, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            onClick={() => navigate(dash.path)}
          >
            <img
              src={dash.icon}
              alt={`${dash.name} Icon`}
              style={{ height: "60px", marginBottom: "10px" }}
            />
            <h3 style={{ color: "#000" }}>{dash.name}</h3>
            <p style={{ color: "#000" }}>{dash.desc}</p>
          </div>
        ))}
      </div>

      {/* ✅ Footer */}
      <footer className="footer">© 2025 BSPHCL. All rights reserved.</footer>
    </div>
  );
}
