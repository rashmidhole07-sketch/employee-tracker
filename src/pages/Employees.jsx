import { useState, useEffect } from "react";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeTable from "../components/employee/EmployeeTable";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleSave = (emp) => {
    if (emp.id) {
      updateEmployee(emp);
    } else {
      addEmployee(emp);
    }

    setEmployees([...getEmployees()]);
    setSelected(null);
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees([...getEmployees()]);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <h2 className="mb-3">Employee Management</h2>

      {/* Search */}
      <input
        className="form-control mb-3"
        placeholder="Search employee..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form */}
      <EmployeeForm onSave={handleSave} selected={selected} />

      {/* Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={setSelected}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default Employees;