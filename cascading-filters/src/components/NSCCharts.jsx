import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
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

  return (
    <div className="charts-section">
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
    </div>
  );
}