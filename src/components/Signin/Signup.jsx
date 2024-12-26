import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function validate() {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;

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

    if (
      nameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError
    ) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return false;
    }

    return true;
  }

  const signup = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("/api/users/signup", signUpData);

      if (response.status === 201) {
        console.log(response.data);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Error ", err.response);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSignUpData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <>
      <form method="post" action="/login" onSubmit={signup}>
        <div className="signupform">
          <h2>Sign Up!</h2>

          <input
            className="input_signup"
            type="text"
            placeholder="Enter Name"
            name="name"
            value={signUpData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            className="input_signup"
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            className="input_signup"
            type="tel"
            placeholder="Enter Mobile No."
            name="phone"
            value={signUpData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            className="input_signup"
            type="password"
            placeholder="Enter Password"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            className="input_signup"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <div className="loginbtndiv">
            <button
              className="Signupformbtn"
              id="signupCancelBtn"
              type="reset"
              onClick={resetForm}
            >
              Cancel
            </button>

            <button className="Signupformbtn" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;

/*

          <textarea
            id="address"
            name="address"
            rows={2}
            className="input_singup"
            placeholder="Enter Address"
            required
            value={signUpData.address}
            onChange={dataInput}
          ></textarea>*/