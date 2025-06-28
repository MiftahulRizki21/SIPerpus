import React, { useEffect, useState } from "react";
import '../../assets/tailwind.css';
import { supabase } from '../../services/supaBase';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  Pending: "#f9a825",
  Accepted: "#2e7d32",
  Rejected: "#c62828",
};

const WritingHistory = () => {
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWritings = async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) return;

      const { data, error } = await supabase
        .from('books')
        .select('id, title, description, image_url, upload_status, created_at')
        .eq('uploaded_by', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Gagal mengambil data tulisan:', error);
        setWritings([]);
      } else {
        setWritings(data);
      }
      setLoading(false);
    };

    fetchWritings();
  }, [page]);

  const paginated = writings.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(writings.length / pageSize);

  return (
    <div className="writing-page bg-[#c7e2e5] min-h-screen">
      <div className="hero-banner bg-[#379fa3] text-white py-12 text-center rounded-xl mb-10 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold">Riwayat Tulisan</h1>
          <button
            onClick={() => navigate("/anggota/upload-form")}
            className="px-6 py-2 bg-white text-[#379fa3] font-semibold rounded-full shadow hover:bg-gray-100 transition"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-28">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : paginated.length === 0 ? (
          <p className="text-center col-span-full">Tidak ada tulisan yang diunggah.</p>
        ) : (
          paginated.map((book, i) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <img
                src={book.image_url || 'https://via.placeholder.com/400x600'}
                alt={book.title}
                className="w-full h-[450px] object-cover"
              />
              <div className="p-5 space-y-2">
                <strong className="text-lg text-gray-800">{book.title}</strong>
                <p className="text-gray-600">{book.description || 'Free to borrow'}</p>
                <p className="text-gray-500 text-xs italic">
                  🕓 Diajukan: {book.created_at ? new Date(book.created_at).toLocaleDateString('id-ID') : 'Tidak diketahui'}
                </p>
                <span
                  className="inline-block px-3 py-1 text-sm font-semibold rounded-full border"
                  style={{
                    color: statusColors[book.upload_status] || '#555',
                    borderColor: statusColors[book.upload_status] || '#ccc',
                  }}
                >
                  {book.upload_status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {writings.length > pageSize && (
        <div className="pagination flex justify-center items-center space-x-2 mt-10">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded hover:bg-[#e0f7fa] disabled:opacity-50"
          >{`<`}</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-[#379fa3] text-white' : 'hover:bg-[#e0f7fa]'}`}
            >{i + 1}</button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded hover:bg-[#e0f7fa] disabled:opacity-50"
          >{`>`}</button>
        </div>
      )}
    </div>
  );
};

export default WritingHistory;
