import React from "react";
import "../css/BillingDashboard.css";

export default function BillingSummaryCards({ kpi }) {
  const cards = [
    { title: "Bills Generated", value: kpi.bills_generated },
    { title: "Final Bills Pending", value: kpi.final_bills_pending },
    { title: "OK Bills", value: kpi.ok_bill_count },
    { title: "MD Bills", value: kpi.md_bill_count },
    { title: "LK Bills", value: kpi.lk_bill_count },
    { title: "Provisional Bills", value: kpi.provisional_bill_count },
    { title: "Unbilled Accounts", value: kpi.unbilled_count },
    { title: "Bill Revisions", value: kpi.total_bill_revision_count },
    { title: "Total Adjustments (₹)", value: kpi.total_adjustment_amount.toLocaleString() },
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
