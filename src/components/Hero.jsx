import libraryImg from '../assets/SIPerpus.jpg'; // gunakan gambar sesuai path Anda

export default function Hero(){
  return (
<section className="min-h-screen bg-[#f0f8ff] flex items-center px-10 py-20">
      <div className="w-1/2 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Read Once</h1>
        <h2 className="text-3xl font-bold text-gray-800">Remember Forever</h2>
        <p className="text-gray-600 text-lg">
          Temukan ribuan koleksi buku dan ilmu yang menginspirasi perjalanan hidupmu
        </p>
        <button className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700">
          Explore Books Now
        </button>
      </div>
      <div className="w-1/2 flex justify-center">
        <img
          src={libraryImg}
          alt="Library"
          className="w-[90%] h-auto object-cover rounded-t-full shadow-lg"
        />
      </div>
    </section>
  );
};
