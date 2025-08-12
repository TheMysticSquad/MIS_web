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
  // ✅ removed the trailing slash before query params to avoid 307 redirect
  const res = await axios.get(`${BASE_URL}/filters`, {
    params: { employee_id: employeeId },
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

// FETCH KPI DATA
export const fetchKpis = async (sectionId, year, month) => {
  // ✅ removed the trailing slash before query params
  const res = await axios.get(`${BASE_URL}/test/kpi`, {
    params: { section_id: sectionId, year, month },
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};
