const TaskTable = ({ tasks, onDelete, onStatusChange }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">

      <thead>
        <tr>
          <th>Title</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.assignedTo}</td>

            <td>
              <select
                value={task.status}
                onChange={(e) =>
                  onStatusChange(task, e.target.value)
                }
                className="form-control"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </td>

            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      </table>
    </div>
  );
};

export default TaskTable;