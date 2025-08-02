// src/pages/NSCDashboard.jsx
import React, { useState, useContext } from "react";
import Header from "../components/Header"; // ✅ Import common header
import Filters from "../components/Filters";
import NSCSummaryCards from "../components/NSCSummaryCards";
import NSCCharts from "../components/NSCCharts";
import { UserContext } from "../context/UserContext";
import "../css/NSCDashboard.css";

export default function NSCDashboard() {
  const { user } = useContext(UserContext);

  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Called only when Apply button is clicked
  const handleApplyFilters = (selectedFilters) => {
    if (!selectedFilters.section_id || !selectedFilters.year || !selectedFilters.month) {
      setError("Please select all filters");
      return;
    }

    setLoading(true);
    setError("");
    setKpiData(null);

    fetch(
      `https://mis-test-api.onrender.com/test/kpi/?section_id=${selectedFilters.section_id}&year=${selectedFilters.year}&month=${selectedFilters.month}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch KPI data");
        return res.json();
      })
      .then((data) => {
        setKpiData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <div className="nsc-dashboard">
      {/* ✅ Common Header */}
      <Header
        title="New Service Connection Dashboard"
        subtitle="Track and monitor new electricity connection requests and approvals"
      />

      {/* ✅ Filters with Apply button */}
      <Filters employeeId={user?.employee_id} onApply={handleApplyFilters} />

      {loading && <p className="loading-text">Loading data...</p>}
      {error && <p className="error-text">{error}</p>}

      {kpiData && !loading && !error ? (
        <>
          <NSCSummaryCards kpi={kpiData} />
          <NSCCharts kpi={kpiData} />
        </>
      ) : (
        !loading && !error && (
          <p className="placeholder-text">
            Please select filters and click Apply to view data
          </p>
        )
      )}
    </div>
  );
}
