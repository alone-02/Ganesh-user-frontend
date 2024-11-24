import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import LoginIcon from '@mui/icons-material/Login';

function Login() {
  const navigator = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function dataInput(event) {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Validation function
  function validate() {
    let emailError = "";
    let passwordError = "";

    const emailRegex = /\S+@\S+\.\S+/;

    if (!loginData.email || !emailRegex.test(loginData.email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!loginData.password || loginData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    return true;
  }

  async function login(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    console.log("Login");

    try {
      const response = await axios.post("/api/login", loginData);

      if (response.status === 200) {
        console.log("User Found");
        alert("Sign In Successful");
        navigator("/explore");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Error ", err);
    }
  }

  return (
    <>
      <form method="post" action="./login">
        <div className="loginform">
          <h2>Log In</h2>

          <input
            className="login_input"
            placeholder="Enter Email"
            required
            name="email"
            onChange={dataInput}
            value={loginData.email}
          />
          {errors.email && <p className="error" style={{ color: "red" }}>{errors.email}</p>}

          <input
            className="login_input"
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            onChange={dataInput}
            value={loginData.password}
          />
          {errors.password && <p className="error" style={{ color: "red" }}>{errors.password}</p>}

          <Link to="/signup" className="linksingup">
            Not have an Account? Signup
          </Link>
          <input className="loginformbtn" type="submit" value="Log In" onClick={login} />
        </div>
      </form>
    </>
  );
}

export default Login;
