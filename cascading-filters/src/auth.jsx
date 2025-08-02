export const setAuthData = (token, employeeId, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("employee_id", employeeId);
  localStorage.setItem("role", role);
};

export const getToken = () => localStorage.getItem("token");
export const getEmployeeId = () => localStorage.getItem("employee_id");
export const getRole = () => localStorage.getItem("role");

export const logout = () => {
  localStorage.clear();
};
