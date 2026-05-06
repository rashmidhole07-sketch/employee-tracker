import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="shadow navbar-custom p-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="btn btn-sm btn-outline-light d-md-none me-3"
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>
        <h5 className="mb-0">Employee Productivity Dashboard</h5>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button type="button" className="btn btn-sm theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <span className="me-3">Admin</span>
        <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;