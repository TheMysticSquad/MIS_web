// src/pages/Filters.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchFilters } from "../api";
import { getEmployeeId } from "../auth";

export default function Filters() {
  const [filters, setFilters] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const navigate = useNavigate();
  const { search } = useLocation();
  const dashboard = new URLSearchParams(search).get("dashboard");

  useEffect(() => {
    fetchFilters(getEmployeeId()).then(data => setFilters(data));
  }, []);

  if (!filters) return <p>Loading filters...</p>;

  const divisions = filters.divisions || (filters.division ? [filters.division] : []);
  const subdivisions = filters.sub_divisions?.filter(sd => !selectedDivision || sd.DivisionID == selectedDivision) || [];
  const sections = filters.sections?.filter(sec => !selectedSubdivision || sec.SubdivisionID == selectedSubdivision) || [];

  const handleSubmit = () => {
    navigate(`/dashboard?dashboard=${dashboard}&section=${selectedSection}&year=${year}&month=${month}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{dashboard} Filters</h2>

      {/* Circle */}
      {filters.circle && (
        <div>
          <label>Circle: </label>
          <input type="text" value={filters.circle.CircleName} readOnly />
        </div>
      )}

      {/* Division */}
      {divisions.length > 0 && (
        <div>
          <label>Division: </label>
          <select value={selectedDivision} onChange={e => setSelectedDivision(e.target.value)}>
            <option value="">Select Division</option>
            {divisions.map(d => <option key={d.DivisionID} value={d.DivisionID}>{d.DivisionName}</option>)}
          </select>
        </div>
      )}

      {/* Subdivision */}
      {subdivisions.length > 0 && (
        <div>
          <label>Subdivision: </label>
          <select value={selectedSubdivision} onChange={e => setSelectedSubdivision(e.target.value)}>
            <option value="">Select Subdivision</option>
            {subdivisions.map(sd => <option key={sd.SubdivisionID} value={sd.SubdivisionID}>{sd.SubdivisionName}</option>)}
          </select>
        </div>
      )}

      {/* Section */}
      {sections.length > 0 && (
        <div>
          <label>Section: </label>
          <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map(sec => <option key={sec.SectionID} value={sec.SectionID}>{sec.SectionName}</option>)}
          </select>
        </div>
      )}

      {/* Year */}
      <div>
        <label>Year: </label>
        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
      </div>

      {/* Month */}
      <div>
        <label>Month: </label>
        <input type="number" value={month} onChange={e => setMonth(e.target.value)} />
      </div>

      <button onClick={handleSubmit} disabled={!selectedSection}>Submit</button>
    </div>
  );
}
