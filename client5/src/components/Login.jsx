import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/AuthSlice";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  const styles = {
    authContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
    },
    authCard: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      width: "300px",
      textAlign: "center",
    },
    authInput: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    authButton: {
      width: "100%",
      padding: "10px",
      background: "#007bff",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    authError: {
      color: "red",
    },
  };
  

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-card"]}>
        <h2>Login</h2>
        {error && <p className={styles["auth-error"]}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["auth-input"]}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["auth-input"]}
          />
          <button type="submit" className={styles["auth-button"]} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className={styles["auth-switch"]}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

