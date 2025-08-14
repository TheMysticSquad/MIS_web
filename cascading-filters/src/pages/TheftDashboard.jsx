import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import { UserContext } from "../context/UserContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import ExportPDF from "../components/ExportPDF";
import pdfColumns from "../config/pdfColumns"; 
import "../css/TheftDashboard.css";

export default function TheftDashboard() {
  const { user } = useContext(UserContext);
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApplyFilters = (filters) => {
    if (!filters.section_id || !filters.year || !filters.month) {
      setError("Please select all filters");
      return;
    }
    setLoading(true);
    setError("");
    setKpiData(null);

    fetch(`https://mis-test-api.onrender.com/test/kpi?model=theft_management&section_id=${filters.section_id}&year=${filters.year}&month=${filters.month}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then(data => {
        setKpiData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="theft-dashboard">
      <Header 
        title="Theft Management Dashboard"
        subtitle="Monitor inspections, confirmed theft cases, and recovery performance"
      />

      <div className="filters-section">
        <Filters employeeId={user?.employee_id} onApply={handleApplyFilters} />
      </div>
      {/* Export PDF Button */}
      {kpiData && !loading && !error && (
        <div style={{ textAlign: "right", padding: "10px 30px" }}>
          <ExportPDF
            title="Collection KPI Report"
            kpiData={kpiData}
            columns={pdfColumns.collection} 
            chartsId="chartsSection"
          />
        </div>
      )}


      {loading && <p className="loading-text">Loading data...</p>}
      {error && <p className="error-text">{error}</p>}

      {kpiData && !loading && !error ? (
        <>
          {/* KPI Cards */}
          <div className="dashboard-container">
            {[
              { title: "Inspections Done", value: kpiData.total_inspections_done },
              { title: "Suspected Cases", value: kpiData.suspected_cases_found },
              { title: "Confirmed Cases", value: kpiData.confirmed_theft_cases },
              { title: "Energy Loss (kWh)", value: kpiData.energy_loss_units },
              { title: "Revenue Loss (₹)", value: kpiData.revenue_loss_amount },
              { title: "Assessment Amount (₹)", value: kpiData.assessment_amount },
              { title: "Recovery Amount (₹)", value: kpiData.recovery_amount },
              { title: "Recovery %", value: `${kpiData.recovery_percentage}%` },
              { title: "Penalty Amount (₹)", value: kpiData.penalty_amount },
              { title: "FIRs Registered", value: kpiData.firs_registered },
              { title: "Cases in Court", value: kpiData.cases_in_court },
              { title: "Cases Closed", value: kpiData.cases_closed }
            ].map((card, idx) => (
              <div className="dashboard-card" key={idx}>
                <h3>{card.title}</h3>
                <p>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="charts-section">
            {/* Case Pipeline */}
            <div className="chart-card">
              <h3>Case Pipeline</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { name: "Inspections", value: kpiData.total_inspections_done },
                  { name: "Suspected", value: kpiData.suspected_cases_found },
                  { name: "Confirmed", value: kpiData.confirmed_theft_cases },
                  { name: "Closed", value: kpiData.cases_closed }
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Financial Impact */}
            <div className="chart-card">
              <h3>Financial Impact</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { name: "Revenue Loss", value: kpiData.revenue_loss_amount },
                  { name: "Assessment", value: kpiData.assessment_amount },
                  { name: "Recovery", value: kpiData.recovery_amount }
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Case Outcomes */}
            <div className="chart-card">
              <h3>Case Outcomes</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "In Court", value: kpiData.cases_in_court },
                      { name: "Closed", value: kpiData.cases_closed }
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    <Cell fill="#FF8042" />
                    <Cell fill="#00C49F" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        !loading && !error && <p className="placeholder-text">Please select filters and click Apply to view data</p>
      )}
    </div>
  );
}
