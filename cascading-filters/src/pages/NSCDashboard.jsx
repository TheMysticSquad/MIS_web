import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import { UserContext } from "../context/UserContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import "../css/ServiceConnectionDashboard.css";

export default function ServiceConnectionDashboard() {
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

    fetch(`https://mis-test-api.onrender.com/test/kpi?model=service_connections&section_id=${filters.section_id}&year=${filters.year}&month=${filters.month}`)
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
    <div className="service-dashboard">
      {/* Sticky Header */}
      <div className="header-fixed">
        <Header
          title="Service Connection Dashboard"
          subtitle="Track applications, approvals, revenue, and vendor efficiency"
        />
      </div>

      {/* Sticky Filters */}
      <div className="filters-fixed">
        <Filters employeeId={user?.employee_id} onApply={handleApplyFilters} />
      </div>

      {/* Scrollable Dashboard */}
      <div className="dashboard-scroll">
        {loading && <p className="loading-text">Loading data...</p>}
        {error && <p className="error-text">{error}</p>}

        {kpiData && !loading && !error ? (
          <>
            {/* KPI Cards */}
            <div className="dashboard-container">
              {[
                { title: "Total Applications", value: kpiData.total_applications },
                { title: "Released", value: kpiData.released },
                { title: "Verified Docs", value: kpiData.verified_docs },
                { title: "Site Inspected", value: kpiData.site_inspected },
                { title: "Pending AMISP", value: kpiData.pending_amisp },
                { title: "Pending Field Verification", value: kpiData.pending_field_verification },
                { title: "Pending Estimation", value: kpiData.pending_estimation },
                { title: "Connections Rejected", value: kpiData.connections_rejected },
                { title: "Active Connections", value: kpiData.connections_converted_to_active },
                { title: "Avg. Connection Time (Days)", value: kpiData.average_connection_time_days },
                { title: "Service Revenue (₹)", value: kpiData.service_connection_revenue },
                { title: "Security Deposit (₹)", value: kpiData.total_revenue_from_security_deposit },
                { title: "Section Load (MW)", value: kpiData.total_section_load_mw },
                { title: "Vendor Name", value: kpiData.vendor_name },
                { title: "Smart Meters Installed", value: kpiData.smart_meters_installed_by_vendor },
                { title: "Vendor Efficiency (%)", value: `${kpiData.vendor_installation_efficiency_percentage}%` }
              ].map((card, idx) => (
                <div className="dashboard-card" key={idx}>
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="charts-section">
              {/* Application Status */}
              <div className="chart-card">
                <h3>Application Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { name: "Applications", value: kpiData.total_applications },
                    { name: "Verified", value: kpiData.verified_docs },
                    { name: "Inspected", value: kpiData.site_inspected },
                    { name: "Released", value: kpiData.released },
                    { name: "Active", value: kpiData.connections_converted_to_active }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pending Breakdown */}
              <div className="chart-card">
                <h3>Pending Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Pending AMISP", value: kpiData.pending_amisp },
                        { name: "Pending Field", value: kpiData.pending_field_verification },
                        { name: "Pending Estimation", value: kpiData.pending_estimation }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#82ca9d"
                      label
                    >
                      <Cell fill="#FFBB28" />
                      <Cell fill="#FF8042" />
                      <Cell fill="#00C49F" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Financial Overview */}
              <div className="chart-card">
                <h3>Financial Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { name: "Service Revenue", value: kpiData.service_connection_revenue },
                    { name: "Security Deposit", value: kpiData.total_revenue_from_security_deposit }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          !loading && !error && <p className="placeholder-text">Please select filters and click Apply to view data</p>
        )}
      </div>
    </div>
  );
}
