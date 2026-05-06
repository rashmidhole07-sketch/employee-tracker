const KPICards = () => {
  const data = {
    totalEmployees: 25,
    activeTasks: 12,
    hoursToday: 68,
    tasksCompleted: 30,
  };

  const productivity = ((data.tasksCompleted / data.hoursToday) * 100).toFixed(0);

  return (
    <div className="row">

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Total Employees</h6>
          <h3>{data.totalEmployees}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Active Tasks</h6>
          <h3>{data.activeTasks}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Hours Today</h6>
          <h3>{data.hoursToday}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 shadow-sm bg-success text-white">
          <h6>Productivity</h6>
          <h3>{productivity}%</h3>
        </div>
      </div>

    </div>
  );
};

export default KPICards;