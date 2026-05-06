import { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, selected }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: "", role: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">

      <div className="row">
        <div className="col">
          <input
            name="name"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <input
            name="role"
            className="form-control"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <input
            name="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <button className="btn btn-primary">
            {selected ? "Update" : "Add"}
          </button>
        </div>
      </div>

    </form>
  );
};

export default EmployeeForm;