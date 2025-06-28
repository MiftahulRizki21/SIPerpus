import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supaBase";

const UploadForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [fade, setFade] = useState("");
  const [form, setForm] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    fetchSession();
  }, []);

  const handleOptionChange = (e) => {
    setFade("opacity-0 translate-y-5");
    setTimeout(() => {
      setSelectedOption(e.target.value);
      setForm({});
      setPdfFile(null);
      setImageFile(null);
      setImagePreview(null);
      setFade("opacity-100 translate-y-0");
      setMessage("");
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file?.type?.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const showNotification = (text, isError = false) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleBukuSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile || !imageFile || !userId) return showNotification("❌ File PDF dan gambar harus dipilih.", true);
    setLoading(true);
    showNotification("📤 Mengunggah buku...");

    try {
      const pdfExt = pdfFile.name.split(".").pop();
      const pdfName = `${userId}/${Date.now()}.${pdfExt}`;
      const { error: pdfErr } = await supabase.storage.from("buku").upload(pdfName, pdfFile);
      if (pdfErr) throw pdfErr;

      const imgExt = imageFile.name.split(".").pop();
      const imgName = `${userId}/${Date.now()}.${imgExt}`;
      const { error: imgErr } = await supabase.storage.from("buku-image").upload(imgName, imageFile);
      if (imgErr) throw imgErr;
      const { data: imgUrl } = supabase.storage.from("buku-image").getPublicUrl(imgName);

      const { error: insertErr } = await supabase.from("books").insert([
        {
          title: form.title,
          author: form.author,
          publisher: form.publisher,
          year: parseInt(form.year),
          isbn: form.isbn,
          available_copies: parseInt(form.available_copies),
          description: form.description,
          file_path: pdfName,
          image_url: imgUrl.publicUrl,
          uploaded_by: userId,
          upload_status: "pending",
        },
      ]);

      if (insertErr) throw insertErr;
      showNotification("✅ Buku berhasil diunggah!");
    } catch (err) {
      console.error(err);
      showNotification("❌ Gagal mengunggah buku.", true);
    } finally {
      setLoading(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !userId) return showNotification("❌ Gambar event belum dipilih atau user tidak terautentikasi.", true);
    setLoading(true);
    showNotification("📤 Mengunggah event...");

    try {
      const ext = imageFile.name.split(".").pop();
      const filename = `${userId}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("events-image").upload(filename, imageFile);
      if (uploadErr) throw uploadErr;

      const { data: publicUrl } = supabase.storage.from("events-image").getPublicUrl(filename);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        showNotification("❌ Session tidak valid. Silakan login ulang.", true);
        setLoading(false);
        return;
      }

      const currentUserId = sessionData.session.user.id;

      const { error: insertErr } = await supabase.from("events").insert([
        {
          title: form.title,
          description: form.description,
          location: form.location,
          start_time: form.start_time,
          end_time: form.end_time,
          created_by: currentUserId,
          image_url: publicUrl.publicUrl,
          status: "pending",
        },
      ]);

      if (insertErr) throw insertErr;
      showNotification("✅ Event berhasil diunggah!");
    } catch (err) {
      console.error(err);
      showNotification("❌ Gagal mengunggah event.", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page max-w-4xl mx-auto p-8 bg-gray-50 rounded-xl shadow-md mt-10">
      <Link to="/anggota/upload" className="text-[#579DA5] hover:text-[#478c94] text-2xl mb-4 inline-block">
        ←
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Upload Data</h1>

      <div className="mb-8 flex justify-center space-x-8">
        {["buku", "event"].map((type) => (
          <label key={type} className={`flex items-center space-x-2 px-4 py-2 rounded cursor-pointer border transition ${selectedOption === type ? "bg-[#E0F7FA] border-[#579DA5]" : "border-gray-300"}`}>
            <input type="radio" name="uploadType" value={type} onChange={handleOptionChange} />
            <span className="font-semibold capitalize">{type === "buku" ? "Buku / Tulisan" : "Event"}</span>
          </label>
        ))}
      </div>

      {loading && (
        <div className="text-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#579DA5] border-solid mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Tunggu sebentar...</p>
        </div>
      )}

      {message && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-700 bg-white px-4 py-2 border rounded inline-block shadow">{message}</p>
        </div>
      )}

      {selectedOption === "buku" && (
        <form onSubmit={handleBukuSubmit} className={`transition-all duration-300 ${fade}`}>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Upload File (PDF)</label>
              <input type="file" onChange={handlePdfChange} className="w-full border rounded px-3 py-2" accept="application/pdf" />
            </div>
            <div>
              <label className="block font-semibold">Upload Gambar (JPG/PNG)</label>
              <input type="file" onChange={handleImageChange} className="w-full border rounded px-3 py-2" accept="image/*" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-48 rounded-lg object-cover" />}
            </div>
            {["title", "author", "publisher", "year", "isbn", "available_copies", "description"].map((field) => (
              <div key={field}>
                <label className="block font-semibold capitalize">{field.replace("_", " ")}</label>
                {field === "description" ? (
                  <textarea name={field} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                ) : (
                  <input
                    type={field.includes("year") || field.includes("copies") ? "number" : "text"}
                    name={field}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              </div>
            ))}
            <button type="submit" className="bg-[#579DA5] hover:bg-[#478c94] text-white px-6 py-2 rounded w-full">
              Upload Buku
            </button>
          </div>
        </form>
      )}

      {selectedOption === "event" && (
        <form onSubmit={handleEventSubmit} className={`transition-all duration-300 ${fade}`}>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Upload Gambar Event</label>
              <input type="file" onChange={handleImageChange} className="w-full border rounded px-3 py-2" accept="image/*" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-48 rounded-lg object-cover" />}
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
            <button type="submit" className="bg-[#579DA5] hover:bg-[#478c94] text-white px-6 py-2 rounded w-full">
              Upload Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadForm;
