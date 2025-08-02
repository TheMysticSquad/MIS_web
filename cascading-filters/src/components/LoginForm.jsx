import React from "react";
import PropTypes from "prop-types";
import bspLogo from "../assets/images/BSPHCL.png"; // Import your BSPHCL logo

export default function LoginForm({
  email,
  password,
  error,
  setEmail,
  setPassword,
  onSubmit,
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
      {/* BSPHCL Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={bspLogo}
          alt="BSPHCL Logo"
          className="w-20 h-auto"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        BSPHCL MIS Login
      </h2>

      {/* Login Form */}
      <form onSubmit={onSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-gray-600 mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 text-sm">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      {/* Forgot Password */}
      <p className="text-center text-sm text-blue-600 mt-4 hover:underline cursor-pointer">
        Forgot Password?
      </p>

      <hr className="my-4" />
      <p className="text-xs text-gray-500">
        © 2025 BSPHCL. All rights reserved.
      </p>
    </div>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
