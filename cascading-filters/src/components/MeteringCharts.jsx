import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "../css/MeteringDashboard.css";

export default function MeteringCharts({ kpi }) {
  const COLORS = ["#4caf50", "#f44336", "#2196f3", "#ff9800"];

  const faultData = [
    { name: "Good Meters", value: kpi.meters_tested - kpi.meters_faulty },
    { name: "Faulty Meters", value: kpi.meters_faulty },
  ];

  const installData = [
    { name: "Installed", value: kpi.meters_installed },
    { name: "Replaced", value: kpi.meters_replaced },
    { name: "Smart", value: kpi.smart_meters_installed },
    { name: "Prepaid", value: kpi.prepaid_meters_installed },
  ];

  const coverageData = [
    { name: "Coverage", value: kpi.metering_coverage_percentage },
    { name: "Remaining", value: 100 - kpi.metering_coverage_percentage },
  ];

  return (
    <div className="charts-section">
      {/* Fault Analysis Pie */}
      <div className="chart-card">
        <h3>Fault Analysis</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={faultData} dataKey="value" nameKey="name" outerRadius={80} label>
              {faultData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Installation Bar */}
      <div className="chart-card">
        <h3>Installation Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={installData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Coverage Donut */}
      <div className="chart-card">
        <h3>Metering Coverage</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={coverageData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              label
            >
              {coverageData.map((entry, index) => (
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
