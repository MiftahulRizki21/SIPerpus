import React from 'react';
import '../../assets/tailwind.css';
import Novel from '../../assets/metamorfosis.jpeg';
import Bgabout from '../../assets/perpustakaan.jpeg';

const About = () => {
  return (
    <div className="about-page">

      {/* Banner Section */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${Bgabout})` }}
      >
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">About Us</h2>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12 px-8 md:px-20 grid md:grid-cols-2 gap-6 items-center">

        {/* Cover Novel, bentuk persegi empat */}
        <img
          src={Novel}
          alt="Novel Metamorfosis"
          className="w-[400px] h-[400px] object-cover rounded-md shadow-lg mx-auto"
        />

        {/* Deskripsi */}
        <div>
          <p className="text-sm text-teal-600 font-semibold mb-5">EXCLUSIVE OFFER</p>
          <h3 className="text-2xl font-bold mb-5">Metamorfosis Novel Now Available</h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-7">
            Discover the surreal world of Franz Kafka’s <i>Metamorphosis</i>, exploring the existential journey of Gregor Samsa.
            Now available for you to borrow and read online, anytime, anywhere.
          </p>

          {/* Rating + FREE tampil persis */}
          <div className="flex items-center text-base mb-4">
            <div className="mr-4">
              <p className="font-semibold">Read Now</p>
              <div className="text-red-500 text-xl mt-1">★★★★★</div>
            </div>
            <div className="border-l h-12 mx-4"></div>
            <div>
              <p className="font-medium">Only</p>
              <p className="text-red-600 text-lg font-extrabold">FREE!</p>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex space-x-4">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600">Borrow</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-300">Read This Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
