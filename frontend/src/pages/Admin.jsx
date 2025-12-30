import { useEffect, useState } from "react";
import api from "../api/axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(null);

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/users?page=${pageNumber}`);
      setUsers(res.data.users);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleActivate = async (id) => {
    setLoadingUserId(id);
    await api.patch(`/admin/users/${id}/activate`);
    fetchUsers(page);
    setLoadingUserId(null);
  };

  const handleDeactivate = async (id) => {
    setLoadingUserId(id);
    await api.patch(`/admin/users/${id}/deactivate`);
    fetchUsers(page);
    setLoadingUserId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.full_name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.status}</td>
              <td className="p-2">
                {u.role === "admin" ? (
                  <span className="text-gray-500 italic">{null}</span>
                ) : u.status === "active" ? (
                  <button
                    disabled={loadingUserId === u.id}
                    onClick={() => handleDeactivate(u.id)}
                    className={`px-2 py-1 rounded text-white ${
                      loadingUserId === u.id ? "bg-gray-400" : "bg-red-500"
                    }`}
                  >
                    {loadingUserId === u.id ? "Processing..." : "Deactivate"}
                  </button>
                ) : (
                  <button
                    disabled={loadingUserId === u.id}
                    onClick={() => handleActivate(u.id)}
                    className={`px-2 py-1 rounded text-white ${
                      loadingUserId === u.id
                        ? "bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loadingUserId === u.id ? "Processing..." : "Activate"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Admin;
