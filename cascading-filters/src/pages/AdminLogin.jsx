// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";
import { setAuthData } from "../auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors
    try {
      const res = await adminLogin(email, password);
      const token = res.access_token || res.token || res.accessToken;

      if (!token) {
        throw new Error("No token received from server");
      }

      // Save admin token + role to sessionStorage
      setAuthData(token, res.employee_id, res.role);

      // Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.response?.data?.detail || err.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );
}
