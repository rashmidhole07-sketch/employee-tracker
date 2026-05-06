import employeesData from "../data/employees.json";

let employees = [...employeesData];

export const getEmployees = () => employees;

export const addEmployee = (emp) => {
  emp.id = Date.now();
  employees.push(emp);
};

export const updateEmployee = (updatedEmp) => {
  employees = employees.map(emp =>
    emp.id === updatedEmp.id ? updatedEmp : emp
  );
};

export const deleteEmployee = (id) => {
  employees = employees.filter(emp => emp.id !== id);
};