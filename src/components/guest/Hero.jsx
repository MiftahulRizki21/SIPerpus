import React from "react";
import libraryImg from "../../assets/SIPerpus.jpg"; // pastikan path benar

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#f0f8ff] flex items-center justify-between px-10 py-20 font-sans overflow-hidden">
      {/* Kiri: Teks */}
<div className="w-full md:w-1/2 flex flex-col justify-center space-y-7 pl-16 -mt-30">
  <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
    Read Once
  </h1>
  <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
    Remember Forever
  </h1>
  <p className="text-gray-700 text-xl font-semibold leading-relaxed pr-10">
    Discover thousands of books, limitless knowledge, and inspiring stories
    that will shape your perspective and accompany your intellectual journey.
  </p><br></br>
  <button className="bg-[#579DA5] hover:bg-[#4a8a93] text-white py-4 px-9 rounded-md text-base font-semibold transition w-fit shadow-md tracking-wide">
    Explore Books Now
  </button>
</div>



      {/* Kanan: Gambar */}
      <div className="hidden md:flex justify-center items-end w-[40%]">
        <img
          src={libraryImg}
          alt="Library"
          className="h-[900px] w-[700px] object-cover rounded-[350px_350px_0_0] shadow-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
