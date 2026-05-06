import { useState } from "react";

const TaskForm = ({ onSave, employees }) => {
  const [task, setTask] = useState({
    title: "",
    assignedTo: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({ title: "", assignedTo: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">

      <div className="row">
        <div className="col-md-5">
          <input
            name="title"
            className="form-control"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <select
            name="assignedTo"
            className="form-control"
            value={task.assignedTo}
            onChange={handleChange}
          >
            <option value="">Assign Employee</option>
            {employees.map((emp, i) => (
              <option key={i}>{emp.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <button className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </div>

    </form>
  );
};

export default TaskForm;