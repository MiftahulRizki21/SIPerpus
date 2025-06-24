import React from "react";
import '../../assets/tailwind.css';

const UploadForm = () => {
  return (
    <div className="upload-page">
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
