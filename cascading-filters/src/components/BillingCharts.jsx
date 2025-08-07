import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "../css/BillingDashboard.css";

export default function BillingCharts({ kpi }) {
  const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336"];

  const billTypeData = [
    { name: "OK Bills", value: kpi.ok_bill_count },
    { name: "MD Bills", value: kpi.md_bill_count },
    { name: "LK Bills", value: kpi.lk_bill_count },
    { name: "Provisional Bills", value: kpi.provisional_bill_count },
  ];

  const statusData = [
    { name: "Generated", value: kpi.bills_generated },
    { name: "Pending Final", value: kpi.final_bills_pending },
    { name: "Unbilled", value: kpi.unbilled_count },
  ];

  const adjustmentData = [
    { name: "Adjustments", value: kpi.total_adjustment_amount },
    { name: "Others", value: (kpi.bills_generated - kpi.total_bill_revision_count) || 0 },
  ];

  return (
    <div className="charts-section">
      {/* Bill Type Pie */}
      <div className="chart-card">
        <h3>Bill Type Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={billTypeData} dataKey="value" nameKey="name" outerRadius={80} label>
              {billTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Billing Status Bar */}
      <div className="chart-card">
        <h3>Billing Status</h3>
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

      {/* Adjustment Donut */}
      <div className="chart-card">
        <h3>Adjustments</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={adjustmentData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              label
            >
              {adjustmentData.map((entry, index) => (
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
