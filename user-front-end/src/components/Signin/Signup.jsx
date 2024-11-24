import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./signup.css";
function Signup() {

  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function dataInput(event) {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function validate() {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/; // Ensures the phone number has exactly 10 digits.

    if (!signUpData.name.trim()) {
      nameError = "Name is required.";
    }

    if (!signUpData.email || !emailRegex.test(signUpData.email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!signUpData.phone || !phoneRegex.test(signUpData.phone)) {
      phoneError = "Please enter a valid 10-digit phone number.";
    }

    if (!signUpData.password || signUpData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
    }

    if (nameError || emailError || phoneError || passwordError || confirmPasswordError) {
      setErrors({ name: nameError, email: emailError, phone: phoneError, password: passwordError, confirmPassword: confirmPasswordError });
      return false;
    }

    return true;
  }

  async function signup(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post("/api/signup", signUpData);

      if (response) {
        console.log(response);
        alert("Sign Up Successful");
        navigate("/login");
      } else {
        alert("Sign Up Error");
      }
    } catch (err) {
      alert("Sign Up Error");
      console.log("Error ", err);
    }
  }

  return (
    <>
      <form method="post" action="/login">
        <div className="signupform">
          <h2>Sign Up!</h2>

          <input
            type="text"
            className="input_singup"
            placeholder="Enter Name"
            name="name"
            required
            value={signUpData.name}
            onChange={dataInput}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            className="input_singup"
            placeholder="Enter Email Address"
            name="email"
            value={signUpData.email}
            onChange={dataInput}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            className="input_singup"
            type="tel"
            placeholder="Enter Mobile No."
            name="phone"
            value={signUpData.phone}
            onChange={dataInput}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <textarea
            id="address"
            name="address"
            rows={2}
            className="input_singup"
            placeholder="Enter Address"
            required
            value={signUpData.address}
            onChange={dataInput}
          ></textarea>

          <input
            className="input_singup"
            type="password"
            placeholder="Enter Password"
            name="password"
            value={signUpData.password}
            onChange={dataInput}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            className="input_singup"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={dataInput}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <div className="loginbtndiv">
            <input className="Signupformbtn" id="signupCancelBtn" type="reset" value="Cancel" />
            <input className="Signupformbtn" type="submit" value="Sign Up" onClick={signup} />
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
