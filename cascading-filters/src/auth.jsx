// ---------------------
// API Base URL
// ---------------------
export const API_URL = "https://mis-test-api.onrender.com";

// ---------------------
// Auth Helpers
// ---------------------
export const setAuthData = (token, employeeId, role) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("employee_id", employeeId);
  sessionStorage.setItem("role", role);
};

export const getToken = () => sessionStorage.getItem("token");
export const getEmployeeId = () => sessionStorage.getItem("employee_id");
export const getRole = () => sessionStorage.getItem("role");

export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  if (setUser) setUser(null);
};

// ---------------------
// Normal User Login
// ---------------------
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  setAuthData(data.access_token, data.employee_id, data.role);
  return data;
}

// ---------------------
// Admin Login (now same as normal login)
// ---------------------
export async function loginAdmin(email, password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Admin login failed");
  const data = await res.json();
  setAuthData(data.access_token, data.employee_id, data.role);
  return data;
}

// ---------------------
// Auth Check Helpers
// ---------------------
export function isUserLoggedIn() {
  return !!getToken();
}

export function isAdminLoggedIn() {
  return getRole() === "admin" && !!getToken();
}

