import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuSections = [
    {
      title: "Main",
      items: [
        { path: "/dashboard", label: "Dashboard", icon: "speedometer2" },
      ],
    },
    {
      title: "Management",
      items: [
        { path: "/employees", label: "Employees", icon: "people" },
        { path: "/tasks", label: "Tasks", icon: "check-circle" },
        { path: "/projects", label: "Projects", icon: "folder" },
      ],
    },
    {
      title: "Tracking",
      items: [
        { path: "/tracker", label: "Time Tracker", icon: "clock" },
        { path: "/timesheet", label: "Timesheet", icon: "calendar" },
        { path: "/attendance", label: "Attendance", icon: "person-check" },
      ],
    },
    {
      title: "Analytics",
      items: [
        { path: "/analytics", label: "Analytics", icon: "graph-up" },
        { path: "/reports", label: "Reports", icon: "file-text" },
      ],
    },
    {
      title: "Admin",
      items: [
        { path: "/roles", label: "Roles", icon: "lock" },
        { path: "/notifications", label: "Notifications", icon: "bell" },
        { path: "/settings", label: "Settings", icon: "gear" },
        { path: "/help", label: "Help", icon: "question-circle" },
      ],
    },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-backdrop d-md-none" onClick={onClose} />}
      <div className={`sidebar-responsive p-3 ${isOpen ? "d-block" : "d-none"} d-md-block`}>
        {/* Sidebar Header */}
        <div className="sidebar-header mb-3 pb-2 border-bottom border-secondary">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/dashboard" className="logo-minimal d-flex align-items-center">
              <div className="mark">WT</div>
              <div className="brand d-none d-md-block">WorkTracker</div>
            </Link>

            <div className="d-md-none">
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
          </div>
          <small className="sidebar-tag">Admin Panel</small>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-3">
            <div className="sidebar-section-title">{section.title}</div>
            <ul className="list-unstyled mb-0">
              {section.items.map((item) => (
                <li key={item.path} className="mb-1">
                  <Link
                    to={item.path}
                    className={`sidebar-link d-flex align-items-center rounded ${isActive(item.path) ? "active" : ""}`}
                    onClick={onClose}
                  >
                    <i className={`bi bi-${item.icon} me-3 fs-6`}></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;