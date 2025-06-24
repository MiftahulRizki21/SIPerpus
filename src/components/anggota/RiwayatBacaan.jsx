import React from "react";
import '../../assets/tailwind.css';
import book1 from "../../assets/book1.jpeg";
import book2 from "../../assets/book2.jpeg";
import book3 from "../../assets/book3.jpeg";

const books = [
  {
    title: "A Novel Man",
    subtitle: "Free to borrow",
    image: book1,
  },
  {
    title: "Feugiat Curare Nostra",
    subtitle: "Read at no cost",
    image: book2,
  },
  {
    title: "Morbi Leo Risus",
    subtitle: "No charge to borrow",
    image: book3,
  },
];

const ReadingHistory = () => {
  return (
    <div className="history-page">
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
