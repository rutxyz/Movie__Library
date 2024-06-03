import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch(https://movie-library-three-fawn.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        navigate("/dem");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login. Please try again.');
    }
  };

  const signup = async () => {
    try {
      const response = await fetch('https://movie-library-three-fawn.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        navigate("/dem");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input type="text" placeholder="Your name" name="username" value={formData.username} onChange={changeHandler} />}
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Login" ?
          <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
          : <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>}
        
      </div>
    </div>
  );
};

export default LoginSignup;
