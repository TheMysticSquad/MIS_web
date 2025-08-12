import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import bspLogo from "../assets/images/BSPHCL.png";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(email.trim(), password);
      navigate("/landing");
    } catch (err) {
      const message =
        err?.response?.data?.detail || err?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
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
