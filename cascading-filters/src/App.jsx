// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import NSCDashboard from "./pages/NSCDashboard";
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

          {/* You can add more dashboards here */}
          {/* <Route path="/billing-dashboard" element={<BillingDashboard />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}
