import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-page">
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

      <section className="hero">
        Contact Us
      </section>

      <section className="contact-section">
        <div className="contact-card">
          <img src="https://img.icons8.com/ios-filled/50/379fa3/marker.png" alt="Address" />
          <h3>Address</h3>
          <p>
            Jl. Yos Sudarso No.88, Rumbai,<br />
            Pekanbaru, Riau, 28265
          </p>
        </div>
        <div className="contact-card">
          <img src="https://img.icons8.com/ios-filled/50/379fa3/new-post.png" alt="Email" />
          <h3>Email Us</h3>
          <p>
            sipus.rumbai@gmail.com<br />
            info@siperpus.id
          </p>
        </div>
        <div className="contact-card">
          <img src="https://img.icons8.com/ios-filled/50/379fa3/phone.png" alt="Phone" />
          <h3>Call Now</h3>
          <p>
            +62 761 123 456<br />
            +62 813 6543 7890
          </p>
        </div>
      </section>

      <section className="map-section">
        <p className="map-description">
          SIPerpus helps readers stay focused with clear, organized, and easily accessible content every time.
        </p>
        <div className="map-container">
          <img
            src="https://chat.openai.com/mnt/data/6a343c00-4873-43bb-bea8-c1158e0b222f.png"
            alt="Map to SIPerpus"
            className="map-image"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
