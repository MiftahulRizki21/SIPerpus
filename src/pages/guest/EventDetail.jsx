import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import perpusImage from '../../assets/perpus1.jpeg';

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = {
    title: 'Pendakian Gunung Buku Kembali Dibuka, Pembaca Antusias Menyambut!',
    category: 'Megapolitan',
    date: '28 Juni 2025',
    content: `Keegiatan pendakian buku kembali diadakan setelah sempat ditutup karena renovasi besar pada jalur akses ke rak-rak literasi tertinggi.
Kegiatan ini mendapat sambutan meriah dari para pembaca yang telah lama menanti. Banyak tokoh pendidikan dan pencinta buku hadir dalam pembukaan tersebut.
Fasilitas baru seperti tempat duduk baca outdoor, peta lokasi buku, serta sistem peminjaman QR kini menjadi daya tarik utama.
Acara dibuka dengan pembacaan puisi literasi oleh anak-anak sekolah dasar, kemudian dilanjutkan talkshow bertema "Mendaki Ilmu, Menembus Batas".
Kegiatan ini diharapkan dapat menumbuhkan kembali semangat membaca pada generasi muda di era digital.`
  };

  // animasi huruf per huruf
  const [animatedContent, setAnimatedContent] = useState('');

  // animasi gambar dan judul
  const [showImage, setShowImage] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      setAnimatedContent((prev) => prev + data.content[currentIndex]);
      currentIndex++;
      if (currentIndex >= data.content.length) {
        clearInterval(timer);
      }
    }, 30);

    // trigger animasi lain
    setTimeout(() => setShowImage(true), 300); // jeda sedikit
    setTimeout(() => setShowTitle(true), 600); // muncul setelah gambar

    return () => clearInterval(timer);
  }, [data.content]);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 lg:px-32">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 bg-white px-4 py-2 rounded-full shadow hover:bg-blue-50 transition duration-300 mb-8"
      >
        <span className="text-lg">←</span>
        Kembali ke Halaman Event
      </button>

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Gambar dengan fade+scale */}
        <img
          src={perpusImage}
          alt="detail"
          className={`
            w-full h-[600px] object-cover
            transform transition-all duration-1000
            ${showImage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        />
        <div className="p-10 lg:p-14">
          <p className="text-sm text-gray-500 mb-4">
            {data.category} • {data.date}
          </p>
          {/* Judul dengan fade+slide */}
          <h1
            className={`
              text-4xl font-bold text-gray-800 mb-6 leading-tight
              transform transition-all duration-1000
              ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {data.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {animatedContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
