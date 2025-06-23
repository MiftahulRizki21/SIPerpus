import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
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

      <div className="profile-container">
        <h2>Informasi Profile</h2>
        <form className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nama</label>
              <input type="text" value="Dhea Amanda" readOnly />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value="dhea23ti@mahasiswa.pcr.ac.id" readOnly />
            </div>
          </div>
          <div className="form-group">
            <label>Jenis Anggota</label>
            <input type="text" value="Mahasiswa" readOnly />
          </div>
          <div className="form-group">
            <label>Login Terakhir</label>
            <input type="text" value="18.30 wib\nRabu,08-06-2005" readOnly />
          </div>
          <button type="button" className="save-button">Simpan Perubahan</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
