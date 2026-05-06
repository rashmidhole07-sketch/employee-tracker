import tasksData from "../data/tasks.json";

let tasks = [...tasksData];

export const getTasks = () => tasks;

export const addTask = (task) => {
  task.id = Date.now();
  task.status = "Pending";
  task.timeSpent = 0;
  tasks.push(task);
};

export const updateTask = (updatedTask) => {
  tasks = tasks.map(t =>
    t.id === updatedTask.id ? updatedTask : t
  );
};

export const deleteTask = (id) => {
  tasks = tasks.filter(t => t.id !== id);
};