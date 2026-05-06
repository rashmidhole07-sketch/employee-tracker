import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form
  const validate = () => {
    if (!form.email || !form.password) {
      return "All fields are required";
    }

    if (!form.email.includes("@")) {
      return "Enter valid email";
    }

    if (form.password.length < 4) {
      return "Password must be at least 4 characters";
    }

    return "";
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    // Mock authentication
    if (form.email === "admin@gmail.com" && form.password === "1234") {
      localStorage.setItem("user", JSON.stringify(form));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page container">
      <div className="row vh-100 d-flex justify-content-center align-items-center">
        
        <div className="col-md-4">
          <div className="card p-4 shadow login-card">

            <h3 className="text-center mb-3 login-card__title">Login</h3>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleLogin}>
              
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary w-100 login-card__button">
                Login
              </button>

            </form>

            <div className="mt-3 text-center text-muted">
              Demo: admin@gmail.com / 1234
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;