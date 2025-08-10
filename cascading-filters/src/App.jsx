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
import DisconnectionRecoveryDashboard from "./pages/DNDDashboard.jsx";
import { UserProvider } from "./context/UserContext";

//  Admin imports
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* ===== Public Routes ===== */}
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ===== Regular User Dashboards ===== */}
          <Route path="/nsc-dashboard" element={<NSCDashboard />} />
          <Route path="/dnd-dashboard" element={<DNDDashboard />} />
          <Route path="/collection-dashboard" element={<CollectionDashboard />} />
          <Route path="/metering-dashboard" element={<MeteringDashboard />} />
          <Route path="/theft-dashboard" element={<TheftDashboard />} />  
          <Route path="/billing-dashboard" element={<BillingDashboard />} />
          <Route path="/disconnection-dashboard" element={<DisconnectionRecoveryDashboard />} />

          {/* ===== Admin Only (Protected) ===== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}
