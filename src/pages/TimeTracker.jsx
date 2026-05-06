import { useState, useEffect } from "react";
import Timer from "../components/tracker/Timer";

const TimeTracker = () => {
  const [logs, setLogs] = useState([]);

  // Load logs from localStorage
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("timeLogs")) || [];
    setLogs(savedLogs);
  }, []);

  // Save session
  const handleSave = (session) => {
    const updatedLogs = [...logs, session];
    setLogs(updatedLogs);

    // Save to localStorage
    localStorage.setItem("timeLogs", JSON.stringify(updatedLogs));
  };

  // Format seconds
  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Total time
  const totalSeconds = logs.reduce((sum, log) => sum + log.duration, 0);

  return (
    <div>

      <h2 className="mb-4">Time Tracker</h2>

      {/* Timer */}
      <Timer onSave={handleSave} />

      {/* Total Time */}
      <div className="mt-4">
        <h5>Total Time Today: {formatTime(totalSeconds)}</h5>
      </div>

      {/* Logs Table */}
      <div className="mt-4">

        <h5>Session Logs</h5>

        <div className="table-responsive">
          <table className="table table-bordered">
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No logs yet
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index}>
                  <td>{new Date(log.start).toLocaleTimeString()}</td>
                  <td>{new Date(log.end).toLocaleTimeString()}</td>
                  <td>{formatTime(log.duration)}</td>
                </tr>
              ))
            )}
          </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default TimeTracker;