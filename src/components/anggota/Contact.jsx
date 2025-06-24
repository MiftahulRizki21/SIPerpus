import React from "react";
import '../../assets/tailwind.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
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
    </div>
  );
};

export default ContactUs;
