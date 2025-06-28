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
  Revision: "#fb8c00",
};

const WritingHistory = () => {
  return (
    <div className="writing-page bg-[#c7e2e5] min-h-screen">

      {/* Hero Banner */}
      <div
        className="hero-banner bg-[#379fa3] text-white py-12 text-center rounded-xl mb-10 max-w-screen-xl mx-auto"
      >
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold">Riwayat Tulisan</h1>
          <button
            onClick={() => window.location.href = "/anggota/upload-form"}
            className="px-6 py-2 bg-white text-[#379fa3] font-semibold rounded-full shadow hover:bg-gray-100 transition"
          >
            Upload
          </button>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-28">
        {writings.map((book, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-[450px] object-cover"
            />
            <div className="p-5 space-y-2">
              <strong className="text-lg text-gray-800">{book.title}</strong>
              <p className="text-gray-600">{book.subtitle}</p>
              <span
                className="inline-block px-3 py-1 text-sm font-semibold rounded-full border"
                style={{
                  color: statusColors[book.status],
                  borderColor: statusColors[book.status],
                }}
              >
                {book.status}
              </span>
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

export default WritingHistory;
