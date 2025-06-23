import React from "react";
import "./UploadForm.css";

const UploadForm = () => {
  return (
    <div className="upload-page">
      <header className="header">
        <div className="logo">
          <img
            src="https://img.icons8.com/ios-filled/50/379fa3/open-book--v1.png"
            alt="logo"
          />
          <span>SIPerpus</span>
        </div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Book</a>
          <a href="#">Contact</a>
          <a href="#">Donation</a>
          <a href="#">Login</a>
          <a href="#">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
              alt="search"
            />
          </a>
          <a href="#">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png"
              alt="cart"
            />
          </a>
        </nav>
      </header>

      <div className="upload-container">
        <h2>
          <span style={{ color: "#379fa3" }}>SI</span>Perpus
        </h2>
        <form className="upload-form">
          <div className="form-group">
            <label>Nama</label>
            <input type="text" placeholder="Masukkan nama anda" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Masukkan email anda" />
          </div>
          <div className="form-group">
            <label>File Tulisan</label>
            <input type="file" />
          </div>
          <button type="submit" className="upload-button">
            KIRIM
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
