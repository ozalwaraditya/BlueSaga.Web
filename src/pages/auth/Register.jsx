import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { auth_api } from "../../utility/url";

function Register() {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [disableStatus, setDisableStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    try {
      const registerPromise = axios.post(
        auth_api + "/api/auth/register",
        {
          Name: formdata.username,
          Email: formdata.email,
          PhoneNumber: formdata.phoneNumber,
          Password: formdata.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.promise(registerPromise, {
        loading: "Registering user...",
        success: (response) => {
          if (response.data?.isSuccess) {
            navigate("/login");
          }
          return response.data?.message || "Registration successful";
        },
        error: (error) => {
          if (error.response) {
            return (
              error.response.data?.message ||
              `Request failed (${error.response.status})`
            );
          }
          return error.message || "Unexpected error occurred";
        },
      });

      await registerPromise;
    } catch (err) {
      console.error("Unhandled error:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const isFormInvalid =
  //     !formdata.username ||
  //     !formdata.email ||
  //     !formdata.phoneNumber ||
  //     !formdata.password ||
  //     !formdata.confirmPassword ||
  //     formdata.password !== formdata.confirmPassword;

  //   setDisableStatus(isFormInvalid);
  // }, [formdata]);

  return (
    <div className="container">
      <h3>Register</h3>

      <div className="form">
        <input
          name="username"
          type="text"
          placeholder="Enter your name"
          value={formdata.username}
          onChange={handleInputChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formdata.email}
          onChange={handleInputChange}
        />

        <input
          name="phoneNumber"
          type="tel"
          placeholder="Enter your number"
          value={formdata.phoneNumber}
          onChange={handleInputChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formdata.password}
          onChange={handleInputChange}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formdata.confirmPassword}
          onChange={handleInputChange}
        />

        <button disabled={disableStatus || loading} onClick={handleFormSubmit}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
      <div className="login-link">
        Already have an account?
        <Link to="/login"> Login</Link>
      </div>
    </div>
  );
}

export default Register;
