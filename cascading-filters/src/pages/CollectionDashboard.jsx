// src/pages/CollectionDashboard.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import CollectionSummaryCards from "../components/CollectionSummaryCards";
import CollectionCharts from "../components/CollectionCharts";
import { UserContext } from "../context/UserContext";
import "../css/CollectionDashboard.css";

export default function CollectionDashboard() {
  const { user } = useContext(UserContext);

  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Top anchor ref - we'll scroll this into view after data loads
  const topRef = useRef(null);

  const handleApplyFilters = (selectedFilters) => {
    if (!selectedFilters.section_id || !selectedFilters.year || !selectedFilters.month) {
      setError("Please select all filters");
      return;
    }

    setLoading(true);
    setError("");
    setKpiData(null);

    fetch(
      `https://mis-test-api.onrender.com/test/kpi?model=collection&section_id=${selectedFilters.section_id}&year=${selectedFilters.year}&month=${selectedFilters.month}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch KPI data");
        return res.json();
      })
      .then((data) => {
        setKpiData(data);
        setLoading(false);
        // scroll AFTER data has been set (give browser a tick to render)
        setTimeout(() => {
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  };

  // Extra safety: if kpiData is set elsewhere, scroll to top as well
  useEffect(() => {
    if (kpiData) {
      const t = setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [kpiData]);

  return (
    <div className="collection-dashboard">
      {/* Anchor to scroll to (keeps header visible) */}
      <div ref={topRef} />

      <Header
        title="Collection Dashboard"
        subtitle="Track dues, collections, and efficiency"
      />

      <div className="filters-section">
        <Filters employeeId={user?.employee_id} onApply={handleApplyFilters} />
      </div>

      <main className="collection-content">
        {loading && <p className="loading-text">Loading data...</p>}
        {error && <p className="error-text">{error}</p>}

        {kpiData && !loading && !error ? (
          <>
            <CollectionSummaryCards kpi={kpiData} />
            <CollectionCharts kpi={kpiData} />
          </>
        ) : (
          !loading &&
          !error && (
            <p className="placeholder-text">
              Please select filters and click Apply to view data
            </p>
          )
        )}
      </main>
    </div>
  );
}
