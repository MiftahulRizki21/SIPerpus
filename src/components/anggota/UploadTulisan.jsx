import React from "react";
import "./WritingHistory.css";

const writings = [
  { title: "Lettus Vulputate", subtitle: "Access freely, no fees", image: "/assets/book-red.png", status: "Waiting" },
  { title: "Creative Pages", subtitle: "Free to borrow", image: "/assets/book-yellow.png", status: "Accepted" },
  { title: "A Novel Man", subtitle: "Free to borrow", image: "/assets/book-pink.png", status: "Accepted" },
  { title: "Morbi Leo Risus", subtitle: "No charge to borrow", image: "/assets/book-white.png", status: "Rejected" },
  { title: "The Art of Ideas", subtitle: "Free to borrow", image: "/assets/book-soft.png", status: "Revision" },
  { title: "Libero Fermentum", subtitle: "Always free to borrow", image: "/assets/book-blue.png", status: "Accepted" },
];

const statusColors = {
  Waiting: "#f9a825",
  Accepted: "#2e7d32",
  Rejected: "#c62828",
  Revision: "#fb8c00"
};

const WritingHistory = () => {
  return (
    <div className="writing-page">
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

      <div className="hero-banner">
        <h1>Riwayat Tulisan</h1>
      </div>

      <div className="book-grid">
        {writings.map((book, i) => (
          <div className="book-card" key={i}>
            <img src={book.image} alt={book.title} />
            <div className="book-info">
              <strong>{book.title}</strong>
              <p>{book.subtitle}</p>
              <span className="status" style={{ color: statusColors[book.status], borderColor: statusColors[book.status] }}>
                {book.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button>{`<`}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{`>`}</button>
      </div>
    </div>
  );
};

export default WritingHistory;
