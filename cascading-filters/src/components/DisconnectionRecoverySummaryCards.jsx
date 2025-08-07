import React from "react";
import "../css/DisconnectionRecoveryDashboard.css";

export default function DisconnectionRecoverySummaryCards({ kpi }) {
  const cards = [
    { title: "Disconnections Done", value: kpi.disconnections_done },
    { title: "Reconnections Done", value: kpi.reconnections_done },
    { title: "Recovery Amount (₹)", value: kpi.recovery_amount.toLocaleString() },
    { title: "Final Bill Count", value: kpi.final_bill_count },
    { title: "Final Bill Amount (₹)", value: kpi.final_bill_amount.toLocaleString() },
    { title: "Final Bill Recovery (%)", value: `${kpi.final_bill_recovery_percentage}%` },
    { title: "Certificate Case Count", value: kpi.certificate_case_count },
    { title: "Certificate Case Arrear (₹)", value: kpi.certificate_case_total_arrear.toLocaleString() },
    { title: "Certificate Case Recovery (%)", value: `${kpi.certificate_case_recovery_percentage}%` },
  ];

  return (
    <div className="dashboard-container">
      {cards.map((card, idx) => (
        <div className="dashboard-card" key={idx}>
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
