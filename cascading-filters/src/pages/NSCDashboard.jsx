// src/pages/NSCDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import Filters from "../components/Filters";
import NSCSummaryCards from "../components/NSCSummaryCards";
import NSCCharts from "../components/NSCCharts";
import { UserContext } from "../context/UserContext";
import "../css/NSCDashboard.css";

export default function NSCDashboard() {
  const { user } = useContext(UserContext);
  const [filters, setFilters] = useState({ section_id: null, year: null, month: null });
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  useEffect(() => {
    if (filters.section_id && filters.year && filters.month) {
      setLoading(true);
      setError("");

      fetch(
        `https://mis-test-api.onrender.com/test/kpi/?section_id=${filters.section_id}&year=${filters.year}&month=${filters.month}`
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
    }
  }, [filters]);

  return (
    <div className="nsc-dashboard">
      <h2 className="dashboard-title">New Service Connection Dashboard</h2>

      {/* Pass employee_id to Filters if required */}
      <Filters employeeId={user?.employee_id} onApply={handleApplyFilters} />

      {loading && <p className="loading-text">Loading data...</p>}
      {error && <p className="error-text">{error}</p>}

      {kpiData && !loading && !error ? (
        <>
          <NSCSummaryCards kpi={kpiData} />
          <NSCCharts kpi={kpiData} />
        </>
      ) : (
        !loading && !error && <p className="placeholder-text">Select Section, Year, and Month to view data</p>
      )}
    </div>
  );
}
