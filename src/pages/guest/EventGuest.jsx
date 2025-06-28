// File: EventGuest.jsx
import React from 'react';
import perpusImage from '../../assets/perpus1.jpeg';
import { useNavigate } from 'react-router-dom';

const EventGuest = () => {
  const navigate = useNavigate(); // ✅ Tambahkan hook ini di dalam komponen

  const smallCards = Array(6).fill({
    image: perpusImage,
    title: 'Judul berita buku menarik dan mendalam untuk dibaca semua kalangan',
    category: 'Megapolitan',
    date: '28 Juni 2025',
  });

  return (
    <div className="eventguest min-h-screen">
      {/* Banner */}
      <div className="relative">
        <img src={perpusImage} alt="Banner" className="w-full h-[480px] object-cover" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold">
          Event
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Card Besar */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden relative h-[500px] w-full">
          <img src={perpusImage} alt="Headline" className="w-full h-full object-cover" />

          {/* Label Headline */}
          <div className="absolute top-4 left-4 bg-white text-blue-700 font-bold px-3 py-1 text-xs rounded-full shadow">
            Headline
          </div>

          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h2 className="text-white text-lg md:text-xl font-bold leading-snug">
              Pendakian Gunung Buku Kembali Dibuka, Pembaca Antusias Menyambut!
            </h2>
          </div>
        </div>

        {/* Card Kecil di Samping, 3 kolom x 2 baris */}
        <div className="grid grid-cols-3 gap-4">
          {smallCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/event/${idx}`)} // ✅ Navigasi saat diklik
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden h-[250px]"
            >
              <img src={card.image} alt={`card-${idx}`} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{card.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{card.category}</p>
                <p className="text-xs text-gray-500">{card.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventGuest;
