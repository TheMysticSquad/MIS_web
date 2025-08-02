import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import bspLogo from "../assets/images/BSPHCL.png";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://mis-test-api.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store user in context
        setUser({
          employee_id: data.employee_id,
          name: data.name,
          role: data.role,
        });

        navigate("/landing");
      } else {
        setError(data.detail || "Login failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-card">
      <img src={bspLogo} alt="BSPHCL Logo" />
      <h2>BSPHCL MIS Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
