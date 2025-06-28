import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/tailwind.css';
import { supabase } from '../../services/supaBase';

const ReadingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) return;

      const { data, error } = await supabase
        .from('reading_history')
        .select('*, books:books!fk_reading_history_book(id, title, image_url)')
        .eq('user_id', userId)
        .order('read_at', { ascending: false });

      if (error) {
        console.error('Gagal mengambil riwayat:', error);
        setHistory([]);
      } else {
        setHistory(data);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [page]);

  const paginatedData = history.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(history.length / pageSize);

  return (
    <div className="history-page bg-[#c7e2e5] min-h-screen">
      <div className="hero-banner bg-[#379fa3] text-white py-12 text-center rounded-xl mb-10 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold">Riwayat Bacaan</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-28">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : paginatedData.length === 0 ? (
          <p className="text-center col-span-full">Tidak ada riwayat bacaan.</p>
        ) : (
          paginatedData.map((entry, index) => (
            <div
              key={index}
              onClick={() => navigate(`/anggota/book/${entry.books?.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <img
                src={entry.books?.image_url || 'https://via.placeholder.com/400x600'}
                alt={entry.books?.title}
                className="w-full h-[450px] object-cover"
              />
              <div className="p-5">
                <p className="text-base text-teal-600 font-semibold mb-1">Judul</p>
                <p className="text-gray-700 text-sm mb-2">{entry.books?.title}</p>
                <p className="text-gray-800 text-xs">📅 Dibaca pada: {new Date(entry.read_at).toLocaleDateString('id-ID')}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {history.length > pageSize && (
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

export default ReadingHistory;
