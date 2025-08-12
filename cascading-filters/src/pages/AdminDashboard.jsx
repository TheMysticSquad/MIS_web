import React, { useEffect, useState } from "react";
import { fetchAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from "../api";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Import default header

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", role: "section", circle_id: "", division_id: "", sub_division_id: "", section_id: "" });
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();

  const loadUsers = async () => {
    const res = await fetchAdminUsers();
    setUsers(res.users || []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async () => {
    await createAdminUser({
      username: form.username,
      password: form.password,
      role: form.role,
      circle_id: form.circle_id || null,
      division_id: form.division_id || null,
      sub_division_id: form.sub_division_id || null,
      section_id: form.section_id || null,
    });
    setForm({ username: "", password: "", role: "section", circle_id: "", division_id: "", sub_division_id: "", section_id: "" });
    loadUsers();
  };

  const handleEdit = (u) => {
    setEditing(u.employee_id);
    setForm({
      username: u.username,
      password: "",
      role: u.role,
      circle_id: u.circle_id || "",
      division_id: u.division_id || "",
      sub_division_id: u.sub_division_id || "",
      section_id: u.section_id || "",
    });
  };

  const handleUpdate = async () => {
    await updateAdminUser(editing, {
      username: form.username,
      ...(form.password ? { password: form.password } : {}),
      role: form.role,
      circle_id: form.circle_id || null,
      division_id: form.division_id || null,
      sub_division_id: form.sub_division_id || null,
      section_id: form.section_id || null,
    });
    setEditing(null);
    setForm({ username: "", password: "", role: "section", circle_id: "", division_id: "", sub_division_id: "", section_id: "" });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await deleteAdminUser(id);
    loadUsers();
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Pagination calculations
  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <Header title="Admin Dashboard" subtitle="Manage admin users and roles" />
      <div style={{ padding: 20 }}>
        <h2>Admin — Manage Users</h2>
        <button onClick={handleLogout}>Logout</button>

        <h3>{editing ? "Edit user" : "Create user"}</h3>
        <div style={{ display: "grid", gap: 8, maxWidth: 600 }}>
          <input
            placeholder="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            placeholder="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="admin">admin</option>
            <option value="circle">circle</option>
            <option value="division">division</option>
            <option value="sub_division">sub_division</option>
            <option value="section">section</option>
          </select>
          <input
            placeholder="circle_id"
            value={form.circle_id}
            onChange={(e) => setForm({ ...form, circle_id: e.target.value })}
          />
          <input
            placeholder="division_id"
            value={form.division_id}
            onChange={(e) => setForm({ ...form, division_id: e.target.value })}
          />
          <input
            placeholder="sub_division_id"
            value={form.sub_division_id}
            onChange={(e) => setForm({ ...form, sub_division_id: e.target.value })}
          />
          <input
            placeholder="section_id"
            value={form.section_id}
            onChange={(e) => setForm({ ...form, section_id: e.target.value })}
          />

          {editing ? (
            <div>
              <button onClick={handleUpdate}>Save</button>
              <button
                onClick={() => {
                  setEditing(null);
                  setForm({
                    username: "",
                    password: "",
                    role: "section",
                    circle_id: "",
                    division_id: "",
                    sub_division_id: "",
                    section_id: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleCreate}>Create User</button>
          )}
        </div>

        <h3>Users</h3>
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%", maxWidth: 800 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Circle</th>
              <th>Division</th>
              <th>SubDiv</th>
              <th>Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.employee_id}>
                <td>{u.employee_id}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.circle_id}</td>
                <td>{u.division_id}</td>
                <td>{u.sub_division_id}</td>
                <td>{u.section_id}</td>
                <td>
                  <button onClick={() => handleEdit(u)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(u.employee_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ marginTop: 10 }}>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Prev
          </button>{" "}
          <span>
            Page {page} of {totalPages}
          </span>{" "}
          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
