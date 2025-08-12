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

// Admin imports
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

          {/* ===== Regular User Dashboards (Protected) ===== */}
          <Route
            path="/nsc-dashboard"
            element={
              <ProtectedRoute adminOnly={false}>
                <NSCDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dnd-dashboard"
            element={
              <ProtectedRoute adminOnly={false}>
                <DNDDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collection-dashboard"
            element={
              <ProtectedRoute adminOnly={false}>
                <CollectionDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/metering-dashboard"
            element={
              <ProtectedRoute adminOnly={false}>
                <MeteringDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theft-dashboard"
            element={
              <ProtectedRoute adminOnly={false}>
                <TheftDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing-dashboard"
            element={
              <ProtectedRoute adminOnly={false}>
                <BillingDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disconnection-dashboard"
            element={
              <ProtectedRoute adminOnly={false}>
                <DisconnectionRecoveryDashboard />
              </ProtectedRoute>
            }
          />

          {/* ===== Admin Only (Protected) ===== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}
