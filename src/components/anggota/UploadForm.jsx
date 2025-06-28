import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { supabase } from "../../services/supaBase";

const UploadForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [fade, setFade] = useState("");
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleOptionChange = (e) => {
    setFade("opacity-0 translate-y-5");
    setTimeout(() => {
      setSelectedOption(e.target.value);
      setForm({});
      setFile(null);
      setFade("opacity-100 translate-y-0");
      setMessage("");
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBukuSubmit = async (e) => {
    e.preventDefault();
    setMessage("Mengunggah Buku...");

    try {
      console.log("Form Buku:", form);
      console.log("File:", file);
      // Dummy Upload
      setTimeout(() => {
        setMessage("✅ Buku berhasil diunggah! (dummy)");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Gagal mengunggah buku.");
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setMessage("Mengunggah Event...");

    try {
      console.log("Form Event:", form);
      console.log("File:", file);
      // Dummy Upload
      setTimeout(() => {
        setMessage("✅ Event berhasil diunggah! (dummy)");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Gagal mengunggah event.");
    }
  };

  return (
    <div className="upload-page max-w-4xl mx-auto p-8 bg-gray-50 rounded-xl shadow-md mt-10">
      {/* Tombol Kembali */}
      <Link to="/anggota/upload" className="text-[#579DA5] hover:text-[#478c94] text-2xl mb-4 inline-block">←</Link>

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Upload Data</h1>

      {/* Pilihan Tipe Upload */}
      <div className="mb-8 flex justify-center space-x-8 animate-fadeIn">
        {["buku", "event"].map((type) => (
          <label
            key={type}
            className={`flex items-center space-x-2 px-4 py-2 rounded cursor-pointer border transition ${
              selectedOption === type ? "bg-[#E0F7FA] border-[#579DA5]" : "border-gray-300"
            }`}
          >
            <input type="radio" name="uploadType" value={type} onChange={handleOptionChange} />
            <span className="font-semibold capitalize">{type === "buku" ? "Buku / Tulisan" : "Event"}</span>
          </label>
        ))}
      </div>

      {/* Form Buku */}
      {selectedOption === "buku" && (
        <form
          onSubmit={handleBukuSubmit}
          className={`bg-white p-6 rounded-xl shadow transition-all duration-500 ease-in-out transform ${fade}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Upload File</label>
              <input type="file" onChange={handleFileChange} className="w-full border rounded px-3 py-2" />
            </div>
            {["title", "author", "publisher", "year", "isbn", "available_copies", "description"].map((field) => (
              <div key={field}>
                <label className="block font-semibold capitalize">{field.replace("_", " ")}</label>
                {field === "description" ? (
                  <textarea name={field} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                ) : (
                  <input
                    type={field === "year" || field === "available_copies" ? "number" : "text"}
                    name={field}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              </div>
            ))}
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
              disabled={message.includes("Mengunggah")}
              className={`w-full text-white px-6 py-2 rounded transition ${
                message.includes("Mengunggah") ? "bg-gray-400 cursor-not-allowed" : "bg-[#579DA5] hover:bg-[#478c94]"
              }`}
            >
              {message.includes("Mengunggah") ? "Mengunggah..." : "Upload Buku"}
            </button>
          </div>
        </form>
      )}

      {/* Form Event */}
      {selectedOption === "event" && (
        <form
          onSubmit={handleEventSubmit}
          className={`bg-white p-6 rounded-xl shadow transition-all duration-500 ease-in-out transform ${fade}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Event Image</label>
              <input type="file" onChange={handleFileChange} className="w-full border rounded px-3 py-2" />
            </div>
            {["title", "description", "location", "start_time", "end_time"].map((field) => (
              <div key={field}>
                <label className="block font-semibold capitalize">{field.replace("_", " ")}</label>
                {field === "description" ? (
                  <textarea name={field} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                ) : field.includes("time") ? (
                  <input
                    type="datetime-local"
                    name={field}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                ) : (
                  <input type="text" name={field} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                )}
              </div>
            ))}
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
              disabled={message.includes("Mengunggah")}
              className={`w-full text-white px-6 py-2 rounded transition ${
                message.includes("Mengunggah") ? "bg-gray-400 cursor-not-allowed" : "bg-[#579DA5] hover:bg-[#478c94]"
              }`}
            >
              {message.includes("Mengunggah") ? "Mengunggah..." : "Upload Event"}
            </button>
          </div>
        </form>
      )}

      {/* Pesan Upload */}
      {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default UploadForm;
