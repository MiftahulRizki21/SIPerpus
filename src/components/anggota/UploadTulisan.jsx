import React from "react";
import '../../assets/tailwind.css';

const writings = [
  {
    title: "Lettus Vulputate",
    subtitle: "Access freely, no fees",
    image: "https://covers.openlibrary.org/b/id/10523387-L.jpg",
    status: "Waiting",
  },
  {
    title: "Creative Pages",
    subtitle: "Free to borrow",
    image: "https://covers.openlibrary.org/b/id/11153223-L.jpg",
    status: "Accepted",
  },
  {
    title: "A Novel Man",
    subtitle: "Free to borrow",
    image: "https://covers.openlibrary.org/b/id/10958384-L.jpg",
    status: "Accepted",
  },
  {
    title: "Morbi Leo Risus",
    subtitle: "No charge to borrow",
    image: "https://covers.openlibrary.org/b/id/10492365-L.jpg",
    status: "Rejected",
  },
  {
    title: "The Art of Ideas",
    subtitle: "Free to borrow",
    image: "https://covers.openlibrary.org/b/id/11153219-L.jpg",
    status: "Revision",
  },
  {
    title: "Libero Fermentum",
    subtitle: "Always free to borrow",
    image: "https://covers.openlibrary.org/b/id/10695095-L.jpg",
    status: "Accepted",
  },
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
