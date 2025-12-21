import { auth_api } from "../../utility/url.js";
import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth.jsx";
import toast from "react-hot-toast";

function Login() {
  const { setAppUser } = useAuth();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const loginPromise = axios.post(
      auth_api + "/api/auth/login",
      {
        UserName: formdata.email,
        Password: formdata.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (response) => {
        if (response.data.isSuccess) {
          const { name, email, phoneNumber } = response.data.response.user;
          const { token } = response.data.response.token;

          setAppUser({ name, email, phoneNumber });
          // optionally store token
          // localStorage.setItem("token", token);

          navigate("/");
          return "Logged in successfully!";
        }

        throw new Error(response.data.response.errorMessage);
      },
      error: (error) => {
        return error.response?.data?.message || error.message || "Login failed";
      },
    });

    try {
      await loginPromise;
    } catch {
      // handled by toast.promise
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3>Login</h3>

      <form className="form" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formdata.email}
          onChange={handleInputChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formdata.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging..." : "Login"}
        </button>
      </form>

      <div className="login-link">
        Want to create account?
        <Link to="/register"> Register</Link>
      </div>
    </div>
  );
}

export default Login;
