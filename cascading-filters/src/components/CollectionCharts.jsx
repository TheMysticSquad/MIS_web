import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "../css/CollectionDashboard.css";

export default function CollectionCharts({ kpi }) {
  const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"];

  const modeData = [
    { name: "Online", value: kpi.online_collection },
    { name: "Cash", value: kpi.cash_collection },
    { name: "Cheque", value: kpi.cheque_collection },
    { name: "POS", value: kpi.pos_collection },
    { name: "Other", value: kpi.other_collection },
  ];

  const statusData = [
    { name: "Total Due", value: kpi.total_due },
    { name: "Collected", value: kpi.total_collected },
  ];

  const efficiencyData = [
    { name: "Efficiency", value: kpi.collection_efficiency },
    { name: "Gap", value: 100 - kpi.collection_efficiency },
  ];

  return (
    <div className="charts-section">
      {/* Mode of Collection Pie */}
      <div className="chart-card">
        <h3>Collection by Mode</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={modeData} dataKey="value" nameKey="name" outerRadius={80} label>
              {modeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Collection vs Due Bar */}
      <div className="chart-card">
        <h3>Collection vs Due</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Efficiency Donut */}
      <div className="chart-card">
        <h3>Collection Efficiency</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={efficiencyData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              label
            >
              {efficiencyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
