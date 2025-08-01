import React, { useEffect, useState } from "react";
import { fetchKpis } from "../api";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const section = params.get("section");
  const year = params.get("year");
  const month = params.get("month");
  const dashboard = params.get("dashboard");

  useEffect(() => {
    fetchKpis(section, year, month).then(res => setData(res));
  }, [section, year, month]);

  if (!data) return <p>Loading KPI...</p>;

  return (
    <div>
      <h2>{dashboard} Dashboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
