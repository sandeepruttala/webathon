import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiAiGenerate2 } from 'react-icons/ri';
import bg from '../bg.png';
import './styles.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Replace the URL with your FastAPI machine’s IP/port
      const response = await fetch("http://13.233.91.36:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Because we are setting/using cookies, include credentials
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user_id", data.user_id);
        navigate("/app");
      } else {
        const data = await response.json();
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Server error, please try again later.");
    }
  };

  return (
    <div>
      <div>
        <img src={bg} alt="background" className="bg" />
        <h2>Login <span style={{ fontFamily: "DM Serif Display", fontStyle: "italic" }}><RiAiGenerate2 /></span></h2>

        {error && <p >{error}</p>}

        <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


export default LoginPage;