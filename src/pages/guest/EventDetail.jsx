import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import perpusImage from '../../assets/perpus1.jpeg';

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = {
    title: 'Pendakian Gunung Buku Kembali Dibuka, Pembaca Antusias Menyambut!',
    category: 'Megapolitan',
    date: '28 Juni 2025',
    content: `Kegiatan pendakian buku kembali diadakan setelah sempat ditutup karena renovasi besar pada jalur akses ke rak-rak literasi tertinggi.
      Kegiatan ini mendapat sambutan meriah dari para pembaca yang telah lama menanti. Banyak tokoh pendidikan dan pencinta buku hadir dalam pembukaan tersebut.
      Fasilitas baru seperti tempat duduk baca outdoor, peta lokasi buku, serta sistem peminjaman QR kini menjadi daya tarik utama.
      Acara dibuka dengan pembacaan puisi literasi oleh anak-anak sekolah dasar, kemudian dilanjutkan talkshow bertema "Mendaki Ilmu, Menembus Batas".
      Kegiatan ini diharapkan dapat menumbuhkan kembali semangat membaca pada generasi muda di era digital.`
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 lg:px-32">
      {/* Tombol Back Sederhana */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-white bg-blue-600 px-5 py-2 rounded-full shadow hover:bg-blue-700 transition duration-300 mb-8"
      >
        Back
      </button>

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        <img
          src={perpusImage}
          alt="detail"
          className="w-full h-[600px] object-cover"
        />
        <div className="p-10 lg:p-14">
          <p className="text-sm text-gray-500 mb-4">{data.category} • {data.date}</p>
          <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">{data.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
