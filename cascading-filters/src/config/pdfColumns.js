// src/config/pdfColumns.js
const pdfColumns = {
  billing: [
    ["Bills Generated", "bills_generated"],
    ["Final Bills Pending", "final_bills_pending"],
    ["OK Bills", "ok_bill_count"],
    ["MD Bills", "md_bill_count"],
    ["LK Bills", "lk_bill_count"],
    ["Provisional Bills", "provisional_bill_count"],
    ["Unbilled Count", "unbilled_count"],
    ["Total Adjustment Amount", "total_adjustment_amount"],
    ["Bill Revisions", "total_bill_revision_count"],
  ],

  collection: [
    ["Total Dues", "total_dues_amount"],
    ["Total Collection", "total_collection_amount"],
    ["Current Collection", "current_collection_amount"],
    ["Arrear Collection", "arrear_collection_amount"],
    ["Collection Efficiency (%)", "collection_efficiency_percentage"],
    ["Demand Raised", "total_demand_amount"],
    ["Current Demand", "current_demand_amount"],
    ["Arrear Demand", "arrear_demand_amount"],
    ["Pending Amount", "pending_amount"],
  ],

  metering: [
    ["Total Consumers", "total_consumers"],
    ["Consumers with Meters", "consumers_with_meters"],
    ["Consumers without Meters", "consumers_without_meters"],
    ["Meters Installed", "meters_installed"],
    ["Meters Replaced", "meters_replaced"],
    ["Defective Meters", "defective_meters"],
    ["Meter Reading Compliance (%)", "meter_reading_compliance_percentage"],
    ["Smart Meters Installed", "smart_meters_installed"],
    ["AMISP Installation Efficiency (%)", "amisp_installation_efficiency_percentage"],
  ],

  disconnection: [
    ["Disconnection Notices Issued", "disconnection_notices_issued"],
    ["Connections Disconnected", "connections_disconnected"],
    ["Connections Reconnected", "connections_reconnected"],
    ["Pending Reconnections", "pending_reconnections"],
    ["Recovery Amount", "recovery_amount"],
    ["Recovery Percentage (%)", "recovery_percentage"],
    ["Total Demand Before Disconnection", "total_demand_before_disconnection"],
    ["Recovered After Disconnection", "recovered_after_disconnection"],
  ],

  service: [
    ["Total Applications", "total_applications"],
    ["Released", "released"],
    ["Verified Docs", "verified_docs"],
    ["Site Inspected", "site_inspected"],
    ["Pending AMISP", "pending_amisp"],
    ["Pending Field Verification", "pending_field_verification"],
    ["Pending Estimation", "pending_estimation"],
    ["Connections Rejected", "connections_rejected"],
    ["Active Connections", "connections_converted_to_active"],
    ["Avg. Connection Time (Days)", "average_connection_time_days"],
    ["Service Revenue (₹)", "service_connection_revenue"],
    ["Security Deposit (₹)", "total_revenue_from_security_deposit"],
    ["Section Load (MW)", "total_section_load_mw"],
    ["Vendor Name", "vendor_name"],
    ["Smart Meters Installed", "smart_meters_installed_by_vendor"],
    ["Vendor Efficiency (%)", "vendor_installation_efficiency_percentage"],
  ],

  theft: [
    ["Inspections Done", "total_inspections_done"],
    ["Suspected Cases", "suspected_cases_found"],
    ["Confirmed Cases", "confirmed_theft_cases"],
    ["Energy Loss (kWh)", "energy_loss_units"],
    ["Revenue Loss (₹)", "revenue_loss_amount"],
    ["Assessment Amount (₹)", "assessment_amount"],
    ["Recovery Amount (₹)", "recovery_amount"],
    ["Recovery Percentage (%)", "recovery_percentage"],
    ["Penalty Amount (₹)", "penalty_amount"],
    ["FIRs Registered", "firs_registered"],
    ["Cases in Court", "cases_in_court"],
    ["Cases Closed", "cases_closed"],
  ]
};

export default pdfColumns;
