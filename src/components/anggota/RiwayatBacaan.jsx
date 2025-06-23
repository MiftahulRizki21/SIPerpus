import React from "react";
import "./ReadingHistory.css";

const books = [
  {
    title: "A Novel Man",
    subtitle: "Free to borrow",
    image: "/assets/book1.jpg",
  },
  {
    title: "Feugiat Curare Nostra",
    subtitle: "Read at no cost",
    image: "/assets/book2.jpg",
  },
  {
    title: "Morbi Leo Risus",
    subtitle: "No charge to borrow",
    image: "/assets/book3.jpg",
  },
];

const ReadingHistory = () => {
  return (
    <div className="history-page">
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
        <h1>Riwayat Bacaan</h1>
      </div>

      <div className="book-grid">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            <img src={book.image} alt={book.title} />
            <div className="book-info">
              <strong>{book.title}</strong>
              <p>{book.subtitle}</p>
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

export default ReadingHistory;
