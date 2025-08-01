import axios from "axios";
import { getToken } from "./auth";

const BASE_URL = "https://mis-test-api.onrender.com";

// LOGIN
export const login = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { username, password });
  return res.data; // expect token + employee_id + role
};

// FETCH FILTERS (after dashboard selection)
export const fetchFilters = async (employeeId) => {
  const res = await axios.get(`${BASE_URL}/filters/?employee_id=${employeeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

// FETCH KPI DATA
export const fetchKpis = async (sectionId, year, month) => {
  const res = await axios.get(`${BASE_URL}/test/kpi/`, {
    params: { section_id: sectionId, year, month },
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};
