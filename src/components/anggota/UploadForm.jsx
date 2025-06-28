import React, { useState } from "react";
import { supabase } from "../../services/supaBase";
import { Link } from "react-router-dom";

const UploadForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [fade, setFade] = useState("");
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleOptionChange = (e) => {
    setFade("opacity-0");
    setTimeout(() => {
      setSelectedOption(e.target.value);
      setForm({});
      setFile(null);
      setFade("opacity-100");
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
    setMessage("Mengunggah...");

    try {
      if (!file) return setMessage("File belum dipilih.");

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `buku/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("buku")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase
        .storage
        .from("buku")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("books")
        .insert([
          {
            title: form.title,
            author: form.author,
            publisher: form.publisher,
            year: parseInt(form.year),
            isbn: form.isbn,
            description: form.description,
            available_copies: parseInt(form.available_copies),
            file_path: filePath,
            file_url: publicUrlData.publicUrl,
            uploaded_by: "user-uuid-di-sini", // ganti dengan ID user yang login
            upload_status: "pending",
          }
        ]);

      if (insertError) throw insertError;

      setMessage("✅ Buku berhasil diunggah!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Gagal mengunggah buku.");
    }
  };

  return (
    <div className="upload-page max-w-4xl mx-auto p-8 bg-gray-50 rounded-xl shadow-md mt-10">
      <Link to="/anggota/riwayat" className="text-[#579DA5] hover:text-[#478c94] text-2xl">←</Link>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Upload Data</h1>

      {/* Pilih Tipe Upload */}
      <div className="mb-8 flex justify-center space-x-8">
        <label className="flex items-center space-x-2">
          <input type="radio" name="uploadType" value="buku" onChange={handleOptionChange} />
          <span className="font-semibold">Buku / Tulisan</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="uploadType" value="event" onChange={handleOptionChange} />
          <span className="font-semibold">Event</span>
        </label>
      </div>

      {/* Form Buku */}
      {selectedOption === "buku" && (
        <form onSubmit={handleBukuSubmit} className={`transition-opacity duration-300 ${fade}`}>
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
                  <input type={field === "year" || field === "available_copies" ? "number" : "text"} name={field} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                )}
              </div>
            ))}
            <div>
              <label className="block font-semibold">Uploaded By</label>
              <input type="text" value="Dhea Amanda" readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
            <button type="submit" className="bg-[#579DA5] text-white px-6 py-2 rounded hover:bg-[#478c94] transition">
              Upload Buku
            </button>
            {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadForm;
