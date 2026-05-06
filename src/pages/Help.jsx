import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e && e.preventDefault();
    // basic validation
    if (!email.trim() || !message.trim()) {
      toast.error("Please provide both email and message.");
      return;
    }

    setSubmitting(true);

    // Simulate async submission (replace with API call when available)
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Your message was submitted successfully. Our team will contact you soon.");
      setEmail("");
      setMessage("");
    }, 700);
  };

  return (
    <div>
      <h2 className="mb-4">Help & Support</h2>

      <div className="card p-3 shadow-sm mb-3">
        <h5>FAQ</h5>
        <ul>
          <li>
            <button type="button" className="btn btn-link p-0" onClick={() => navigate('/tracker')}>
              How to track time? → Go to Time Tracker page
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-link p-0" onClick={() => navigate('/tasks')}>
              How to assign tasks? → Use Task Management
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-link p-0" onClick={() => navigate('/reports')}>
              How to view reports? → Go to Reports page
            </button>
          </li>
        </ul>
      </div>

      <div className="card p-3 shadow-sm">
        <h5>Contact Support</h5>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <textarea
            className="form-control mb-2"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />

          <div className="d-flex align-items-center">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Help;