import React, { useState, useEffect } from "react";
import { fetchFilters } from "../api";
import { getEmployeeId } from "../auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Filters() {
  const [filters, setFilters] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(7);

  const navigate = useNavigate();
  const { search } = useLocation();
  const dashboard = new URLSearchParams(search).get("dashboard");

  useEffect(() => {
    fetchFilters(getEmployeeId()).then(data => setFilters(data));
  }, []);

  if (!filters) return <p>Loading filters...</p>;

  const divisions = filters.divisions || [];
  const subdivisions = filters.sub_divisions?.filter(sd => !selectedDivision || sd.DivisionID == selectedDivision) || [];
  const sections = filters.sections?.filter(sec => !selectedSubdivision || sec.SubdivisionID == selectedSubdivision) || [];

  const handleSubmit = () => {
    navigate(`/dashboard?dashboard=${dashboard}&section=${selectedSection}&year=${year}&month=${month}`);
  };

  return (
    <div>
      <h2>{dashboard} Filters</h2>
      <div>
        <label>Division:</label>
        <select onChange={e => setSelectedDivision(e.target.value)}>
          <option value="">Select Division</option>
          {divisions.map(d => <option key={d.DivisionID} value={d.DivisionID}>{d.DivisionName}</option>)}
        </select>
      </div>
      <div>
        <label>Subdivision:</label>
        <select onChange={e => setSelectedSubdivision(e.target.value)}>
          <option value="">Select Subdivision</option>
          {subdivisions.map(sd => <option key={sd.SubdivisionID} value={sd.SubdivisionID}>{sd.SubdivisionName}</option>)}
        </select>
      </div>
      <div>
        <label>Section:</label>
        <select onChange={e => setSelectedSection(e.target.value)}>
          <option value="">Select Section</option>
          {sections.map(sec => <option key={sec.SectionID} value={sec.SectionID}>{sec.SectionName}</option>)}
        </select>
      </div>
      <div>
        <label>Year:</label>
        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
      </div>
      <div>
        <label>Month:</label>
        <input type="number" value={month} onChange={e => setMonth(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
