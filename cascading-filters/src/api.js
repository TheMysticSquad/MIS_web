// src/api.js
import axios from "axios";
import { getToken } from "./auth";
import qs from "qs"; // for form-data serialization

const BASE_URL = "https://mis-test-api.onrender.com";

// ================= USER LOGIN =================
export const userLogin = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data;
};

// ================= ADMIN LOGIN =================
export const adminLogin = async (email, password) => {
  const res = await axios.post(
    `${BASE_URL}/admin/login`,
    { email, password },
    
  );
  return res.data;
};

// ================= ADMIN USER MANAGEMENT =================

// Create user (form-data)
export const createAdminUser = async (userData) => {
  const res = await axios.post(
    `${BASE_URL}/admin/users`,
    qs.stringify(userData),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }
  );
  return res.data;
};

// List all users
export const fetchAdminUsers = async () => {
  const res = await axios.get(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

// Update user (form-data)
export const updateAdminUser = async (employeeId, updateData) => {
  const res = await axios.put(
    `${BASE_URL}/admin/users/${employeeId}`,
    qs.stringify(updateData),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }
  );
  return res.data;
};

// Delete user
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
