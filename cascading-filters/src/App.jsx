// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import NSCDashboard from "./pages/NSCDashboard";
import DNDDashboard from "./pages/DNDDashboard";
import BillingDashboard from "./pages/BillingDashboard"; 
import CollectionDashboard from "./pages/CollectionDashboard"; 
import MeteringDashboard from "./pages/MeteringDashboard";
import TheftDashboard from "./pages/TheftDashboard";
import DisconnectionRecoveryDashboard from "./pages/DNDDashboard.jsx"; // ✅ Added import
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default route → Login */}
          <Route path="/" element={<Login />} />

          {/* Landing page after login */}
          <Route path="/landing" element={<Landing />} />

          {/* NSC Dashboard */}
          <Route path="/nsc-dashboard" element={<NSCDashboard />} />

          {/* DND Dashboard */}
          <Route path="/dnd-dashboard" element={<DNDDashboard />} />

          {/* Collection Dashboard */}
          <Route path="/collection-dashboard" element={<CollectionDashboard />} />

          {/* Metering Dashboard */}
          <Route path="/metering-dashboard" element={<MeteringDashboard />} />

          {/* Theft Dashboard */}
          <Route path="/theft-dashboard" element={<TheftDashboard />} />  

          {/* Billing Dashboard */}
          <Route path="/billing-dashboard" element={<BillingDashboard />} />

          {/* Disconnection & Recovery Dashboard */}
          <Route path="/disconnection-dashboard" element={<DisconnectionRecoveryDashboard />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}
