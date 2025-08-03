import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar
} from "recharts";
import "../css/NSCDashboard.css";

export default function NSCCharts({ kpi }) {
  const totalApplications = kpi?.service_connections?.total_applications || 0;
  const verifiedDocs = kpi?.service_connections?.verified_docs || 0;
  const siteInspected = kpi?.service_connections?.site_inspected || 0;
  const pendingAMISP = kpi?.service_connections?.pending_amisp || 0;

  const pendingDoc = totalApplications - verifiedDocs;
  const pendingSite = verifiedDocs - siteInspected;

  const pieData = [
    { name: "Pending Docs", value: pendingDoc },
    { name: "Pending Site Inspection", value: pendingSite },
    { name: "Pending AMISP", value: pendingAMISP },
  ];

  const COLORS = ["#FFBB28", "#FF8042", "#FF0000"];

  // 🔹 State for trend API data
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch trend data
  useEffect(() => {
    if (!kpi?.section_id || !kpi?.year) return;

    setLoading(true);
    fetch(`https://mis-test-api.onrender.com/trend/?model=service_connections&section_id=${kpi.section_id}&year=${kpi.year}`)
      .then(res => res.json())
      .then(data => {
        // Format for Recharts
        const formatted = data.map(item => ({
          month: new Date(2024, item.month - 1).toLocaleString("default", { month: "short" }),
          total: item.total_applications,
          released: item.released,
          pending: item.pending_amisp
        }));
        setTrendData(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching trend data", err);
        setLoading(false);
      });
  }, [kpi?.section_id, kpi?.year]);

  if (loading) return <p>Loading charts...</p>;

  return (
    <div className="charts-section">
      {/* 🔹 Pie Chart */}
      <div className="chart-container">
        <h3>Pending Applications Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Monthly Trend (Line Chart like screenshot) */}
      <div className="chart-container">
        <h3>Monthly Connection Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#007bff" name="Applications" />
            <Line type="monotone" dataKey="released" stroke="#28a745" name="Approved" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Month-wise Status (Grouped Bar Chart) */}
      <div className="chart-container">
        <h3>Month-wise Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#007bff" name="Total Applications" />
            <Bar dataKey="released" fill="#28a745" name="Released" />
            <Bar dataKey="pending" fill="#FF9800" name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
