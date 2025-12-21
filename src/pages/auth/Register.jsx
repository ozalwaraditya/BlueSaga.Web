import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.get("https://localhost:7001/api/CouponAPI");
      console.log(response.data); // Access the actual data here
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setTimeout(() => {
    //   console.log("Form Data:", formdata);

    //   setLoading(false);

    //   setFormdata({
    //     username: "",
    //     email: "",
    //     phoneNumber: "",
    //     password: "",
    //     confirmPassword: "",
    //   });
    // }, 2000);

    setLoading(false);
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
