import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="p-4">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      {/* Content */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2">
          Welcome, {user.full_name} 👋
        </h2>

        <div className="bg-white p-4 rounded shadow w-full max-w-md">
          <p>
            <b>Name:</b> {user.full_name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Role:</b> {user.role}
          </p>
          <p>
            <b>Status:</b> {user.status}
          </p>
        </div>

        {/* Admin Section */}
        {user.role === "admin" && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/admin")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Admin Panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
