import React from "react";
import "../css/MeteringDashboard.css";

export default function MeteringSummaryCards({ kpi }) {
  const cards = [
    { title: "Meters Installed", value: kpi.meters_installed },
    { title: "Meters Replaced", value: kpi.meters_replaced },
    { title: "Meters Tested", value: kpi.meters_tested },
    { title: "Meters Faulty", value: kpi.meters_faulty },
    { title: "Meters Sent to Lab", value: kpi.meters_sent_for_lab_testing },
    { title: "Meters Recovered", value: kpi.meters_recovered_from_defaulters },
    { title: "Smart Meters Installed", value: kpi.smart_meters_installed },
    { title: "Prepaid Meters Installed", value: kpi.prepaid_meters_installed },
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

