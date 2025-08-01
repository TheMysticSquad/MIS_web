import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee_id, name, role } = location.state || {};

  const dashboards = ["NSC", "Billing", "Collection", "Metering", "Disconnection", "Theft"];

  // Redirect to login if no employee_id (security check)
  React.useEffect(() => {
    if (!employee_id) {
      alert("Please log in first.");
      navigate("/login");
    }
  }, [employee_id, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome {name || "User"} ({role || "Role"})</h2>
      <h3>Select Dashboard</h3>
      {dashboards.map((d) => (
        <button
          key={d}
          style={{ display: "block", margin: "0.5rem 0" }}
          onClick={() =>
            navigate("/dashboard", {
              state: { employee_id, dashboard: d, name, role }
            })
          }
        >
          {d} Dashboard
        </button>
      ))}
    </div>
  );
}
