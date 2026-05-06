import { useEffect, useState } from "react";

const Timesheet = () => {
  const [logs, setLogs] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Load logs
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("timeLogs")) || [];
    setLogs(saved);
  }, []);

  // Save logs
  const updateStorage = (updated) => {
    setLogs(updated);
    localStorage.setItem("timeLogs", JSON.stringify(updated));
  };

  // Get week range based on offset
  const getWeekRange = () => {
    const now = new Date();
    const firstDay = new Date(now);
    firstDay.setDate(now.getDate() - now.getDay() + weekOffset * 7);

    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);

    return { firstDay, lastDay };
  };

  const { firstDay, lastDay } = getWeekRange();

  // Format helpers
  const formatDate = (date) => new Date(date).toLocaleDateString();

  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Filter logs for current week
  const weeklyLogs = logs.filter((log) => {
    const d = new Date(log.start);
    return d >= firstDay && d <= lastDay;
  });

  // Group by date
  const grouped = {};
  weeklyLogs.forEach((log) => {
    const date = formatDate(log.start);
    if (!grouped[date]) grouped[date] = 0;
    grouped[date] += log.duration;
  });

  const sortedEntries = Object.entries(grouped).sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  );

  const totalSeconds = sortedEntries.reduce(
    (sum, [, sec]) => sum + sec,
    0
  );

  // Delete log
  const handleDelete = (index) => {
    const updated = logs.filter((_, i) => i !== index);
    updateStorage(updated);
  };

  // Start editing
  const startEdit = (index, duration) => {
    setEditingIndex(index);
    setEditValue(duration);
  };

  // Save edited value
  const saveEdit = (index) => {
    const updated = [...logs];
    updated[index].duration = parseInt(editValue) || 0;
    updateStorage(updated);
    setEditingIndex(null);
  };

  return (
    <div>

      <h2 className="mb-3">Timesheet</h2>

      {/* Week Navigation */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setWeekOffset(weekOffset - 1)}
        >
          ◀ Previous
        </button>

        <h5 className="text-break">
          {formatDate(firstDay)} - {formatDate(lastDay)}
        </h5>

        <button
          className="btn btn-outline-primary"
          onClick={() => setWeekOffset(weekOffset + 1)}
        >
          Next ▶
        </button>
      </div>

      {/* Summary */}
      <div className="row row-cols-1 row-cols-md-2 g-3 mb-3">

        <div className="col">
          <div className="card p-3 shadow-sm">
            <h6>Total Days</h6>
            <h4>{sortedEntries.length}</h4>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 shadow-sm">
            <h6>Total Hours</h6>
            <h4>{formatTime(totalSeconds)}</h4>
          </div>
        </div>

      </div>

      {/* Daily Summary */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Daily Breakdown</h5>

        <div className="table-responsive timesheet-table-wrapper">
          <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
            </tr>
          </thead>

          <tbody>
            {sortedEntries.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center">
                  No data for this week
                </td>
              </tr>
            ) : (
              sortedEntries.map(([date, sec]) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{formatTime(sec)}</td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      {/* Raw Logs (Editable) */}
      <div className="card p-3 shadow-sm">
        <h5>Session Logs (Editable)</h5>

        <div className="table-responsive timesheet-table-wrapper">
          <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {weeklyLogs.map((log, index) => (
              <tr key={index}>
                <td>{new Date(log.start).toLocaleTimeString()}</td>
                <td>{new Date(log.end).toLocaleTimeString()}</td>

                <td>
                  {editingIndex === index ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    formatTime(log.duration)
                  )}
                </td>

                <td>
                  <div className="d-flex flex-column flex-sm-row gap-2">
                    {editingIndex === index ? (
                      <button
                        className="btn btn-success btn-sm w-100 w-sm-auto"
                        onClick={() => saveEdit(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm w-100 w-sm-auto"
                        onClick={() => startEdit(index, log.duration)}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      className="btn btn-danger btn-sm w-100 w-sm-auto"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default Timesheet;