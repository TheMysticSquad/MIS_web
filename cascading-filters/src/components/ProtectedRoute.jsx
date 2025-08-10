// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../auth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
