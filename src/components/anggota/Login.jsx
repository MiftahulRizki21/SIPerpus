import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">
          <img src="https://img.icons8.com/ios-filled/50/379fa3/open-book--v1.png" alt="logo" />
          <span>SIPerpus</span>
        </div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Book</a>
          <a href="#">Contact</a>
          <a href="#">Donation</a>
          <a href="#">Login</a>
          <a href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" alt="search" /></a>
          <a href="#"><img src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png" alt="cart" /></a>
        </nav>
      </header>

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
