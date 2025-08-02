// src/components/NSCSummaryCards.jsx
import React from "react";
import "../css/NSCDashboard.css";

export default function NSCSummaryCards({ kpi }) {
  const totalApplications = kpi?.service_connections?.total_applications || 0;
  const approved = kpi?.service_connections?.released || 0;
  const pending = totalApplications - approved;

  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Applications</h3>
        <p>{totalApplications}</p>
      </div>
      <div className="card approved">
        <h3>Approved Connections</h3>
        <p>{approved}</p>
      </div>
      <div className="card pending">
        <h3>Pending Applications</h3>
        <p>{pending}</p>
      </div>
    </div>
  );
}
