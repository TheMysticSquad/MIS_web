import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import MeteringSummaryCards from "../components/MeteringSummaryCards";
import MeteringCharts from "../components/MeteringCharts";
import { UserContext } from "../context/UserContext";
import "../css/MeteringDashboard.css";

export default function MeteringDashboard() {
  const { user } = useContext(UserContext);

  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApplyFilters = (selectedFilters) => {
    if (!selectedFilters.section_id || !selectedFilters.year || !selectedFilters.month) {
      setError("Please select all filters");
      return;
    }

    setLoading(true);
    setError("");
    setKpiData(null);

    fetch(
      `https://mis-test-api.onrender.com/test/kpi?model=metering&section_id=${selectedFilters.section_id}&year=${selectedFilters.year}&month=${selectedFilters.month}`
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
    <div className="metering-dashboard">
      <Header
        title="Metering Dashboard"
        subtitle="Monitor installation, replacement, and performance of meters"
      />

      <div className="filters-section">
        <Filters employeeId={user?.employee_id} onApply={handleApplyFilters} />
      </div>

      {loading && <p className="loading-text">Loading data...</p>}
      {error && <p className="error-text">{error}</p>}

      {kpiData && !loading && !error ? (
        <>
          <MeteringSummaryCards kpi={kpiData} />
          <MeteringCharts kpi={kpiData} />
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
