import { useEffect, useState } from "react";

const Attendance = () => {
  const [attendance, setAttendance] = useState({});
  const [todayStatus, setTodayStatus] = useState("");

  const today = new Date().toLocaleDateString();

  // Load attendance
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendance(saved);

    if (saved[today]) {
      setTodayStatus(saved[today]);
    }
  }, [today]);

  // Mark attendance (only once per day)
  const markAttendance = (status) => {
    if (attendance[today]) return; // prevent re-marking

    const updated = {
      ...attendance,
      [today]: status,
    };

    setAttendance(updated);
    setTodayStatus(status);

    localStorage.setItem("attendance", JSON.stringify(updated));
  };

  // Get current month dates
  const getMonthDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const days = new Date(year, month + 1, 0).getDate();

    const dates = [];
    for (let i = 1; i <= days; i++) {
      dates.push(new Date(year, month, i).toLocaleDateString());
    }

    return dates;
  };

  const monthDates = getMonthDates();

  // Summary
  const presentDays = Object.values(attendance).filter(
    (s) => s === "Present"
  ).length;

  const absentDays = Object.values(attendance).filter(
    (s) => s === "Absent"
  ).length;

  return (
    <div>

      <h2 className="mb-4">Attendance</h2>

      {/* Today Attendance */}
      <div className="card p-3 mb-4 shadow-sm">

        <h5>Today: {today}</h5>

        <div className="mt-2">

          <button
            className="btn btn-success me-2"
            onClick={() => markAttendance("Present")}
            disabled={!!attendance[today]}
          >
            Mark Present
          </button>

          <button
            className="btn btn-danger"
            onClick={() => markAttendance("Absent")}
            disabled={!!attendance[today]}
          >
            Mark Absent
          </button>

        </div>

        {todayStatus && (
          <p className="mt-2">
            Status: <strong>{todayStatus}</strong>
          </p>
        )}

      </div>

      {/* Summary Cards */}
      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Present Days</h6>
            <h4 className="text-success">{presentDays}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Absent Days</h6>
            <h4 className="text-danger">{absentDays}</h4>
          </div>
        </div>

      </div>

      {/* Monthly Table */}
      <div className="card p-3 shadow-sm">

        <h5>Monthly Attendance</h5>

        <div className="table-responsive">
          <table className="table table-bordered mt-2">

          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {monthDates.map((date) => {
              const status = attendance[date];

              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td
                    className={
                      status === "Present"
                        ? "text-success"
                        : status === "Absent"
                        ? "text-danger"
                        : "text-muted"
                    }
                  >
                    {status || "Not Marked"}
                  </td>
                </tr>
              );
            })}
          </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Attendance;