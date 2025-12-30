import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <h1 className="text-lg font-bold text-blue-600">
            User Management
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>

            <Link to="/profile" className="hover:text-blue-600">
              Profile
            </Link>

            {user?.role === "admin" && (
              <Link to="/admin" className="hover:text-blue-600">
                Admin
              </Link>
            )}

            <span className="text-sm text-gray-600">
              {user?.full_name} ({user?.role})
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="block"
          >
            Dashboard
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block"
          >
            Profile
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block"
            >
              Admin
            </Link>
          )}

          <div className="text-sm text-gray-600">
            {user?.full_name} ({user?.role})
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-3 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
