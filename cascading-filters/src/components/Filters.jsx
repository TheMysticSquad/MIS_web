import React, { useEffect, useState } from "react";
import "./Filter.css";

export default function Filter({ employeeId, onChange }) {
  const [filters, setFilters] = useState(null);
  const [selected, setSelected] = useState({
    circle: "",
    division: "",
    subdivision: "",
    section: ""
  });

  useEffect(() => {
    async function fetchFilters() {
      try {
        const res = await fetch(`https://mis-test-api.onrender.com/filters/?employee_id=${employeeId}`);
        const data = await res.json();
        setFilters(data);

        // Auto-select defaults if single option
        setSelected({
          circle: data.circle?.CircleID || "",
          division: data.divisions?.length === 1 ? data.divisions[0].DivisionID : "",
          subdivision: data.sub_divisions?.length === 1 ? data.sub_divisions[0].SubdivisionID : "",
          section: data.sections?.length === 1 ? data.sections[0].SectionID : ""
        });

      } catch (err) {
        console.error("Error fetching filters", err);
      }
    }
    fetchFilters();
  }, [employeeId]);

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  if (!filters) return <p>Loading filters...</p>;

  return (
    <div className="filter-container">
      {/* Circle */}
      {filters.circle && (
        <div>
          <label>Circle</label>
          <select
            value={selected.circle}
            onChange={(e) => setSelected({ ...selected, circle: e.target.value })}
          >
            <option value={filters.circle.CircleID}>{filters.circle.CircleName}</option>
          </select>
        </div>
      )}

      {/* Division */}
      {filters.divisions?.length > 0 && (
        <div>
          <label>Division</label>
          <select
            value={selected.division}
            onChange={(e) => setSelected({ ...selected, division: e.target.value })}
          >
            <option value="">Select Division</option>
            {filters.divisions.map((d) => (
              <option key={d.DivisionID} value={d.DivisionID}>{d.DivisionName}</option>
            ))}
          </select>
        </div>
      )}

      {/* Subdivision */}
      {filters.sub_divisions?.length > 0 && (
        <div>
          <label>Subdivision</label>
          <select
            value={selected.subdivision}
            onChange={(e) => setSelected({ ...selected, subdivision: e.target.value })}
          >
            <option value="">Select Subdivision</option>
            {filters.sub_divisions
              .filter(sd => !selected.division || sd.DivisionID === parseInt(selected.division))
              .map((sd) => (
                <option key={sd.SubdivisionID} value={sd.SubdivisionID}>{sd.SubdivisionName}</option>
              ))}
          </select>
        </div>
      )}

      {/* Section */}
      {filters.sections?.length > 0 && (
        <div>
          <label>Section</label>
          <select
            value={selected.section}
            onChange={(e) => setSelected({ ...selected, section: e.target.value })}
          >
            <option value="">Select Section</option>
            {filters.sections
              .filter(sec => !selected.subdivision || sec.SubdivisionID === parseInt(selected.subdivision))
              .map((sec) => (
                <option key={sec.SectionID} value={sec.SectionID}>{sec.SectionName}</option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
}
