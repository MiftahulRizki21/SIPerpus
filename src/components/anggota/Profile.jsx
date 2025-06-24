import React from "react";
import '../../assets/tailwind.css';

const Profile = () => {
  return (
    <div className="profile-page">
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
