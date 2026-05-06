import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const sample = [
  { id: 1, text: "Task assigned to you: Design Homepage", time: Date.now() - 1000 * 60 * 60, read: false },
  { id: 2, text: "Deadline approaching: Project Alpha", time: Date.now() - 1000 * 60 * 60 * 24, read: false },
  { id: 3, text: "Attendance reminder for today", time: Date.now() - 1000 * 60 * 20, read: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("notifications"));
      return saved && Array.isArray(saved) ? saved : sample;
    } catch (e) {
      return sample;
    }
  });

  const [prefs, setPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notificationPrefs")) || { email: true, push: true };
    } catch (e) {
      return { email: true, push: true };
    }
  });

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("notificationPrefs", JSON.stringify(prefs));
  }, [prefs]);

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    toast.success("Marked as read");
  };

  const toggleRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
    toast.success("Updated notification status");
  };

  const dismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification dismissed");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked read");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const togglePref = (key) => {
    setPrefs((p) => {
      const next = { ...p, [key]: !p[key] };
      toast.success(`${key === "email" ? "Email" : "Push"} notifications ${next[key] ? "enabled" : "disabled"}`);
      return next;
    });
  };

  const formatTime = (ts) => new Date(ts).toLocaleString();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Notifications</h2>
        <div>
          <button className="btn btn-sm btn-outline-primary me-2" onClick={markAllRead} disabled={notifications.length === 0}>
            Mark all read
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={clearAll} disabled={notifications.length === 0}>
            Clear all
          </button>
        </div>
      </div>

      <div className="card p-3 shadow-sm mb-3">
        <h6 className="mb-3">Preferences</h6>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="prefEmail" checked={prefs.email} onChange={() => togglePref("email")} />
            <label className="form-check-label" htmlFor="prefEmail">Email Notifications</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="prefPush" checked={prefs.push} onChange={() => togglePref("push")} />
            <label className="form-check-label" htmlFor="prefPush">Push Notifications</label>
          </div>
        </div>
      </div>

      <div className="card p-3 shadow-sm">
        {notifications.length === 0 ? (
          <div className="text-center text-muted py-4">No notifications</div>
        ) : (
          <ul className="list-group">
            {notifications.map((note) => (
              <li key={note.id} className={`list-group-item d-flex align-items-start justify-content-between ${note.read ? "" : "fw-bold bg-light"}`}>
                <div>
                  <div>{note.text}</div>
                  <small className="text-muted">{formatTime(note.time)}</small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  {!note.read && <span className="badge bg-success">New</span>}
                  <button className="btn btn-sm btn-outline-secondary" title="Toggle read" onClick={() => toggleRead(note.id)}>
                    <i className={`bi ${note.read ? "bi-envelope-open" : "bi-envelope"}`}></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" title="Dismiss" onClick={() => dismiss(note.id)}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;