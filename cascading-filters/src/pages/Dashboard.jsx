import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [sectionId, setSectionId] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { employee_id, name, role } = location.state || {};

  useEffect(() => {
    if (!employee_id) {
      alert("Please log in first.");
      navigate("/login");
    }
  }, [employee_id, navigate]);

  // Fetch KPI Data dynamically
  const fetchData = () => {
    if (sectionId && year && month) {
      fetch(`https://mis-test-api.onrender.com/test/kpi/?section_id=${sectionId}&year=${year}&month=${month}`)
        .then(res => res.json())
        .then(kpi => setData(kpi))
        .catch(err => console.error("Error fetching KPI:", err));
    }
  };

  const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#2196F3"];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">{role} Dashboard - Welcome {name}</h2>

      {/* Filters */}
      <div className="bg-gray-100 p-4 rounded shadow flex flex-wrap gap-4 items-center">
        <input
          type="number"
          placeholder="Section ID"
          value={sectionId}
          onChange={e => setSectionId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Load Data
        </button>
      </div>

      {/* KPI Data Display */}
      {!data ? (
        <p className="p-6">Please select filters and click "Load Data"</p>
      ) : (
        <>
          {/* ---------- Service Connections ---------- */}
          {data.service_connections && (
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-2">Service Connections</h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-100 p-4 rounded shadow">Success %: {((data.service_connections.released / data.service_connections.total_applications) * 100).toFixed(1)}%</div>
                <div className="bg-blue-100 p-4 rounded shadow">Docs Verified: {((data.service_connections.verified_docs / data.service_connections.total_applications) * 100).toFixed(1)}%</div>
                <div className="bg-yellow-100 p-4 rounded shadow">Site Inspected: {((data.service_connections.site_inspected / data.service_connections.total_applications) * 100).toFixed(1)}%</div>
              </div>

              <BarChart width={500} height={300} data={[data.service_connections]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_applications" fill="#8884d8" />
                <Bar dataKey="released" fill="#82ca9d" />
                <Bar dataKey="pending_amisp" fill="#ffc658" />
              </BarChart>
            </div>
          )}

          {/* ---------- Metering ---------- */}
          {data.metering && (
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-2">Metering</h3>
              <PieChart width={400} height={300}>
                <Pie data={[
                  { name: "Installed", value: data.metering.meters_installed },
                  { name: "Replaced", value: data.metering.meters_replaced }
                ]}
                  cx="50%" cy="50%" outerRadius={100} label
                  dataKey="value">
                  {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          )}

          {/* ---------- Billing ---------- */}
          {data.billing && (
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-2">Billing</h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-100 p-4 rounded shadow">Bills Generated: {data.billing.bills_generated}</div>
                <div className="bg-red-100 p-4 rounded shadow">Pending: {data.billing.final_bills_pending}</div>
              </div>

              <LineChart width={500} height={300} data={[data.billing]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bills_generated" stroke="#8884d8" />
                <Line type="monotone" dataKey="final_bills_pending" stroke="#ff7300" />
              </LineChart>
            </div>
          )}

          {/* ---------- Collection ---------- */}
          {data.collection && (
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-2">Collection</h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-100 p-4 rounded shadow">Collection Efficiency: {data.collection.collection_efficiency}%</div>
                <div className="bg-blue-100 p-4 rounded shadow">Total Collected: ₹{data.collection.total_collected.toLocaleString()}</div>
              </div>

              <BarChart width={500} height={300} data={[data.collection]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_due" fill="#f44336" />
                <Bar dataKey="total_collected" fill="#4CAF50" />
              </BarChart>
            </div>
          )}

          {/* ---------- Disconnection Recovery ---------- */}
          {data.disconnection_recovery && (
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-2">Disconnection & Recovery</h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-red-100 p-4 rounded shadow">Disconnections: {data.disconnection_recovery.disconnections_done}</div>
                <div className="bg-green-100 p-4 rounded shadow">Reconnections: {data.disconnection_recovery.reconnections_done}</div>
                <div className="bg-blue-100 p-4 rounded shadow">Recovery ₹: {data.disconnection_recovery.recovery_amount.toLocaleString()}</div>
              </div>

              <BarChart width={500} height={300} data={[data.disconnection_recovery]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="disconnections_done" fill="#f44336" />
                <Bar dataKey="reconnections_done" fill="#4CAF50" />
              </BarChart>
            </div>
          )}
        </>
      )}
    </div>
  );
}
