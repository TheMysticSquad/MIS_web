import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "../css/DisconnectionRecoveryDashboard.css";

export default function DisconnectionRecoveryCharts({ kpi }) {
  const COLORS = ["#2196f3", "#4caf50", "#ff9800", "#f44336"];

  const actionData = [
    { name: "Disconnections", value: kpi.disconnections_done },
    { name: "Reconnections", value: kpi.reconnections_done },
    { name: "Dismantles", value: kpi.dismantle_count },
  ];

  const recoveryData = [
    { name: "Final Bill Recovery", value: kpi.final_bill_recovery_amount },
    { name: "Certificate Case Recovery", value: kpi.certificate_case_recovery_amount },
  ];

  const efficiencyData = [
    { name: "Final Bill %", value: kpi.final_bill_recovery_percentage },
    { name: "Certificate Case %", value: kpi.certificate_case_recovery_percentage },
  ];

  return (
    <div className="charts-section">
      {/* Actions Bar */}
      <div className="chart-card">
        <h3>Actions Summary</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={actionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recovery by Type Pie */}
      <div className="chart-card">
        <h3>Recovery by Type</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={recoveryData} dataKey="value" nameKey="name" outerRadius={80} label>
              {recoveryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Efficiency Donut */}
      <div className="chart-card">
        <h3>Recovery Efficiency</h3>
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
