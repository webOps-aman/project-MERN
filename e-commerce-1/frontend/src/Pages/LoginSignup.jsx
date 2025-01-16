import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let responseData;
    try {
      await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const signup = async () => {
    let responseData;
    try {
      await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => (responseData = data));

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="logInSignUp">
      <div className="logInSignUp-container">
        <h1>{state}</h1>
        <div className="logInSignUp-fields">
          {state === "Sign up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>
        <p className="logInSignUp-login">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setState("Login")} style={{ cursor: "pointer", color: "blue" }}>
                LogIn Here
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span onClick={() => setState("Sign up")} style={{ cursor: "pointer", color: "blue" }}>
                Click Here
              </span>
            </>
          )}
        </p>
        {state === "Sign up" && (
          <div className="logInSignUp-agree">
            <input type="checkbox" id="agree" />
            <p>
              By continuing, I agree to the terms of use & privacy policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
