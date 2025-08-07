import React from "react";
import "../css/CollectionDashboard.css";

export default function CollectionSummaryCards({ kpi }) {
  const cards = [
    { title: "Total Due (₹)", value: kpi.total_due.toLocaleString() },
    { title: "Total Collected (₹)", value: kpi.total_collected.toLocaleString() },
    { title: "Collection Efficiency (%)", value: `${kpi.collection_efficiency}%` },
    { title: "Arrear Collection (₹)", value: kpi.arrear_collection.toLocaleString() },
    { title: "Installment Collection (₹)", value: kpi.installment_collection.toLocaleString() },
    { title: "Bill Collection (₹)", value: kpi.bill_collection.toLocaleString() },
    { title: "Suspense Collection (₹)", value: kpi.suspense_collection.toLocaleString() },
    { title: "Online Collection (₹)", value: kpi.online_collection.toLocaleString() },
    { title: "Cash Collection (₹)", value: kpi.cash_collection.toLocaleString() },
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
