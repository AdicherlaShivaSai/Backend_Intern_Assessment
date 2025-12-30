import { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
        setForm({
          full_name: res.data.full_name,
          email: res.data.email,
        });
      } catch {
        setError("Failed to load profile");
      } finally {
        setPageLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setMessage("");
    setError("");

    try {
      await api.put("/users/profile", form);
      setMessage("Profile updated successfully");
    } catch {
      setError("Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setMessage("");
    setError("");

    try {
      await api.put("/users/password", passwordForm);
      setMessage("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch {
      setError("Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) {
    return <p className="p-4">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Profile Update */}
      <form
        onSubmit={handleProfileUpdate}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="text-lg font-semibold mb-2">Profile Info</h2>

        <input
          type="text"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Full Name"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
        />

        <button
          disabled={profileLoading}
          className={`px-4 py-2 rounded text-white ${
            profileLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {profileLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Password Change */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-white p-4 rounded shadow"
      >
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={passwordForm.currentPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              currentPassword: e.target.value,
            })
          }
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordForm.newPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              newPassword: e.target.value,
            })
          }
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          disabled={passwordLoading}
          className={`px-4 py-2 rounded text-white ${
            passwordLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {passwordLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
