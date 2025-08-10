// src/api.js
import axios from "axios";
import { getToken } from "./auth";

const BASE_URL = "https://mis-test-api.onrender.com";

// ================= USER LOGIN =================
export const userLogin = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data; // { access_token, employee_id, role }
};

// ================= ADMIN LOGIN =================
export const adminLogin = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/admin/login`, { email, password });
  return res.data; // { access_token, employee_id, role }
};

// ================= ADMIN USER MANAGEMENT =================
export const createAdminUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/admin/users`, userData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const fetchAdminUsers = async () => {
  const res = await axios.get(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data.users; // Only return array
};

export const updateAdminUser = async (employeeId, updateData) => {
  const res = await axios.put(`${BASE_URL}/admin/users/${employeeId}`, updateData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const deleteAdminUser = async (employeeId) => {
  const res = await axios.delete(`${BASE_URL}/admin/users/${employeeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

// ================= FILTERS =================
export const fetchFilters = async (employeeId) => {
  const res = await axios.get(`${BASE_URL}/filters`, {
    params: { employee_id: employeeId },
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

// ================= KPIs =================
export const fetchKpis = async (sectionId, year, month) => {
  const res = await axios.get(`${BASE_URL}/test/kpi`, {
    params: { section_id: sectionId, year, month },
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};
