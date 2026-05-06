import { useState, useRef, useEffect } from "react";

const Roles = () => {
  const [role, setRole] = useState("Employee");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const roles = ["Admin", "Manager", "Employee"];

  return (
    <div>
      <h2 className="mb-4">User Roles & Permissions</h2>

      <div className="card p-3 shadow-sm">

        <label className="d-block mb-2">Select Role</label>

        <div className="mb-2" ref={ref} style={{ display: "inline-block" }}>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary dropdown-toggle"
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
            >
              {role}
            </button>

            <ul className={`dropdown-menu${open ? " show" : ""}`}>
              {roles.map((r) => (
                <li key={r}>
                  <button
                    className={`dropdown-item${r === role ? " active" : ""}`}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setOpen(false);
                    }}
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3">
          <h5>Access Control</h5>

          {role === "Admin" && <p>Full access to all modules</p>}
          {role === "Manager" && <p>Manage employees and tasks</p>}
          {role === "Employee" && <p>View tasks and track time</p>}
        </div>

      </div>
    </div>
  );
};

export default Roles;