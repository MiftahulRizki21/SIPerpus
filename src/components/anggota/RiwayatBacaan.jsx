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
    category: "Fiction | Drama",
    rating: 4.5,
  },
  {
    title: "Feugiat Curare Nostra",
    subtitle: "Read at no cost",
    image: book2,
    category: "Education | History",
    rating: 4.6,
  },
  {
    title: "Morbi Leo Risus",
    subtitle: "No charge to borrow",
    image: book3,
    category: "Science | Biography",
    rating: 4.7,
  },
];

const ReadingHistory = () => {
  return (
    <div className="history-page bg-[#c7e2e5] min-h-screen">

      {/* Hero Banner */}
      <div
        className="hero-banner text-white py-12 text-center rounded-xl mb-10 max-w-screen-xl mx-auto"
      >
        <h1 className="text-4xl font-bold">Riwayat Bacaan</h1><br />
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-28">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-[450px] object-cover"
            />
            <div className="p-5">
              <p className="text-base text-teal-600 font-semibold mb-1">{book.category}</p>
              <p className="text-gray-700 text-sm mb-2">{book.subtitle}</p>
              <p className="text-gray-800 text-xs">⭐ {book.rating} · Recent Reading</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center items-center space-x-2 mt-10">
        <button className="px-3 py-1 border rounded hover:bg-[#e0f7fa]">{`<`}</button>
        <button className="px-3 py-1 border rounded bg-[#379fa3]">1</button>
        <button className="px-3 py-1 border rounded hover:bg-[#e0f7fa]">2</button>
        <button className="px-3 py-1 border rounded hover:bg-[#e0f7fa]">3</button>
        <button className="px-3 py-1 border rounded hover:bg-[#e0f7fa]">{`>`}</button>
      </div>
    </div>
  );
};

export default ReadingHistory;
