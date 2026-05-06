import { useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskTable from "../components/tasks/TaskTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import employees from "../data/employees.json";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAdd = (task) => {
    addTask(task);
    setTasks([...getTasks()]);
    toast.success("Task added successfully!");
  };

  const handleDelete = (id) => {
    deleteTask(id);
    setTasks([...getTasks()]);
    toast.error("Task Deleted!");
  };

  const handleStatusChange = (task, status) => {
    updateTask({ ...task, status });
    setTasks([...getTasks()]);
  };

  return (
    <div>

      <h2 className="mb-3">Task Management</h2>

      <TaskForm onSave={handleAdd} employees={employees} />

      <TaskTable
        tasks={tasks}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

    </div>
    
  );
};

export default Tasks;