import React from "react";
import '../../assets/tailwind.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2><span style={{ color: '#379fa3' }}>SI</span>Perpus</h2>
        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <p className="register-link">Don't have an account? <a href="#">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;
