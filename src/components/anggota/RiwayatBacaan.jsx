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
    <div className="history-page bg-gray-100 min-h-screen p-6">
      {/* Hero Banner */}
      <div className="hero-banner bg-blue-600 text-white py-12 text-center rounded-xl mb-8">
        <h1 className="text-4xl font-bold">Riwayat Bacaan</h1>
      </div>

      {/* Book Grid */}
      <div className="book-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <div
            key={index}
            className="book-card bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <img src={book.image} alt={book.title} className="w-full aspect-[3/4] object-cover" />
            <div className="book-info p-4">
              <strong className="text-lg text-gray-800">{book.title}</strong>
              <p className="text-gray-600">{book.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center items-center space-x-2 mt-8">
        <button className="px-3 py-1 border rounded hover:bg-blue-50">{`<`}</button>
        <button className="px-3 py-1 border rounded bg-blue-500">1</button>
        <button className="px-3 py-1 border rounded hover:bg-blue-50">2</button>
        <button className="px-3 py-1 border rounded hover:bg-blue-50">3</button>
        <button className="px-3 py-1 border rounded hover:bg-blue-50">{`>`}</button>
      </div>
    </div>
  );
};

export default ReadingHistory;
