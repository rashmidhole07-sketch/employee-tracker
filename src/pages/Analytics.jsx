import { useEffect, useState } from "react";
import ProductivityChart from "../components/charts/ProductivityChart";
import EmployeeChart from "../components/charts/EmployeeChart";

import { getTasks } from "../services/taskService";

const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [productivity, setProductivity] = useState(0);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("timeLogs")) || [];
    const tasks = getTasks();

    // Total hours
    const totalSeconds = logs.reduce((sum, log) => sum + log.duration, 0);
    const totalHours = totalSeconds / 3600;

    // Completed tasks
    const completedTasks = tasks.filter(
      (t) => t.status === "Completed"
    ).length;

    // Productivity score
    const prod = totalHours > 0
      ? (completedTasks / totalHours).toFixed(2)
      : 0;

    setProductivity(prod);

    // Chart 1: Hours vs Tasks
    setChartData([
      {
        name: "Work",
        hours: parseFloat(totalHours.toFixed(2)),
        tasks: completedTasks,
      },
    ]);

    // Chart 2: Employee comparison
    const empMap = {};

    tasks.forEach((task) => {
      if (!empMap[task.assignedTo]) {
        empMap[task.assignedTo] = 0;
      }

      if (task.status === "Completed") {
        empMap[task.assignedTo]++;
      }
    });

    const empData = Object.keys(empMap).map((emp) => ({
      employee: emp,
      tasks: empMap[emp],
    }));

    setEmployeeData(empData);

  }, []);

  return (
    <div>

      <h2 className="mb-4">Productivity Analytics</h2>

      {/* KPI Cards */}
      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Total Hours</h6>
            <h3>{chartData[0]?.hours || 0}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Tasks Completed</h6>
            <h3>{chartData[0]?.tasks || 0}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm bg-success text-white">
            <h6>Productivity Score</h6>
            <h3>{productivity}</h3>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="row">

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Hours vs Tasks</h5>
            <ProductivityChart data={chartData} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Employee Performance</h5>
            <EmployeeChart data={employeeData} />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;