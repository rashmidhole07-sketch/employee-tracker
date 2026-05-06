import { useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    workHours: 8,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "workHours" ? parseInt(value || 0, 10) : value,
    }));
  };

  const handleSave = () => {
    // basic validation
    if (!form.name) {
      toast.error("Please enter your name");
      return;
    }

    // persist settings
    localStorage.setItem("settings", JSON.stringify(form));
    toast.success("Settings saved successfully");
  };

  return (
    <div>
      <h2 className="mb-4">Settings</h2>

      <div className="card p-3 shadow-sm">

        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Work Hours / Day</label>
          <input
            name="workHours"
            type="number"
            className="form-control"
            value={form.workHours}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="button" onClick={handleSave}>
          Save Settings
        </button>

      </div>
    </div>
  );
};

export default Settings;