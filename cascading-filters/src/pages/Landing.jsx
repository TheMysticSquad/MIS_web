import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Landing.css";
import BSPHCLLogo from "../assets/images/BSPHCL.png";
import { UserContext } from "../context/UserContext";

export default function Landing() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const dashboards = [
    { name: "NSC Dashboard", desc: "Monitor new service connection metrics.", path: "/nsc-dashboard" },
    { name: "Billing Dashboard", desc: "Track billing cycles and outstanding payments.", path: "/billing-dashboard" },
    { name: "Collection Dashboard", desc: "Monitor payment collections and recovery rates.", path: "/collection-dashboard" },
    { name: "Metering Dashboard", desc: "Access meter readings and smart meter deployments.", path: "/metering-dashboard" },
    { name: "DND Dashboard", desc: "Monitor distribution network performance.", path: "/disconnection-dashboard" },
    { name: "Theft Dashboard", desc: "Track power theft cases and recovery actions.", path: "/theft-dashboard" },
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="header-left">
          <img src={BSPHCLLogo} alt="BSPHCL Logo" />
          <h1>BSPHCL MIS</h1>
        </div>
        <div className="header-right">
          <span>Welcome, {user?.name || "User"}</span>
        </div>
      </header>

      {/* Dashboard Section */}
      <main>
        <div className="dashboard-container">
          {dashboards.map((dash, idx) => (
            <div
              key={idx}
              className="dashboard-card"
              onClick={() => navigate(dash.path)}
              style={{ cursor: "pointer" }}
            >
              <h3>{dash.name}</h3>
              <p>{dash.desc}</p>
              <small>Click to view details</small>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2025 BSPHCL Management Information System. All rights reserved.
      </footer>
    </div>
  );
}
