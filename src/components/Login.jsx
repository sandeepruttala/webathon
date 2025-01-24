import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://3.111.33.239:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Because we are setting/using cookies, include credentials
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user_id", data.user_id);
        navigate("/");
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
        <h2>Login</h2>

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