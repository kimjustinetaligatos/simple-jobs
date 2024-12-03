import React, { useState } from "react";
import { signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(formData);
      const token = result.data[0]?.token;
      setMessage(result.message);
      if (token) {
        localStorage.setItem("token", token); // Save token for authentication
        localStorage.setItem("username", formData.username); // Save token for authentication
        navigate("/jobs"); // Redirect to Jobs page
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Signup
          </button>
        </form>
        {message && <div className="mt-3 alert alert-info">{message}</div>}

        <p className="mt-3 text-center">
          Already have an account? <Link to="/">Login here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Signup;
