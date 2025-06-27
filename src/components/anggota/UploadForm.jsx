import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/tailwind.css";

const UploadForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [fade, setFade] = useState("");

  const handleOptionChange = (e) => {
    setFade("opacity-0");
    setTimeout(() => {
      setSelectedOption(e.target.value);
      setFade("opacity-100");
    }, 200);
  };

  const handleBukuSubmit = (e) => {
    e.preventDefault();
    console.log("Buku form submitted");
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    console.log("Event form submitted");
  };

  return (
    <div className="upload-page max-w-4xl mx-auto p-8 bg-gray-50 rounded-xl shadow-md mt-10">
        <button className="top-4 left-4 text-[#579DA5] hover:text-[#478c94] transition text-2xl"><Link to="/anggota/riwayat">←</Link></button>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Upload Data</h1>

      {/* Pilihan Type Upload */}
      <div className="mb-8 flex justify-center space-x-8">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="uploadType"
            value="buku"
            onChange={handleOptionChange}
          />
          <span className="font-semibold">Buku / Tulisan</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="uploadType"
            value="event"
            onChange={handleOptionChange}
          />
          <span className="font-semibold">Event</span>
        </label>
      </div>

      {/* Form Buku */}
      {selectedOption === "buku" && (
        <form
          onSubmit={handleBukuSubmit}
          className={`transition-opacity duration-300 ${fade}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Upload File</label>
              <input type="file" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Title</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Author</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Publisher</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Year</label>
              <input type="number" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">ISBN</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Description</label>
              <textarea className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Available Copies</label>
              <input type="number" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">File URL</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Uploaded By</label>
              <input
                type="text"
                value="Dhea Amanda"
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="bg-[#579DA5] text-white px-6 py-2 rounded hover:bg-[#478c94] transition"
            >
              Upload Buku
            </button>
          </div>
        </form>
      )}

      {/* Form Event */}
      {selectedOption === "event" && (
        <form
          onSubmit={handleEventSubmit}
          className={`transition-opacity duration-300 ${fade}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Event Image</label>
              <input type="file" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Title</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Description</label>
              <textarea className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Location</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Start Time</label>
              <input type="datetime-local" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">End Time</label>
              <input type="datetime-local" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Created By</label>
              <input
                type="text"
                value="Dhea Amanda"
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="bg-[#579DA5] text-white px-6 py-2 rounded hover:bg-[#478c94] transition"
            >
              Upload Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadForm;
