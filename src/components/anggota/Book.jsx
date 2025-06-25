import React from 'react';
import '../../assets/tailwind.css';
import BannerImg from '../../assets/perpustakaan.jpeg';
import Book1 from '../../assets/book1.jpeg';
import Book2 from '../../assets/book2.jpeg';
import Book3 from '../../assets/book3.jpeg';
import Book4 from '../../assets/book4.jpeg';

const Book = () => {
  return (
    <div className="book-page bg-[#c7e2e5] min-h-screen">

      {/* Banner */}
      <div>
        <img src={BannerImg} alt="Library" className="w-full h-[450px] object-cover" />
      </div>

      {/* Featured Collection */}
      <div className="bg-[#eef7f7] px-6 md:px-28 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="text-teal-600">SIPerpus</span> Featured Collection
          </h2>
          <button className="border border-red-500 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50">
            View All
          </button>
        </div>

        {/* Description */}
        <div className="text-gray-600 text-base font-semibold leading-relaxed mb-12">
          <p>A curated selection of our most borrowed and loved books. Borrow anytime for free,</p>
          <p>with optional donation to help us grow. Enjoy reading wherever you are, with collections from poetry to architecture.</p>
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Book 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
            <img src={Book1} alt="Book 1" className="w-full h-[450px] object-cover" />
            <div className="p-5">
              <p className="text-base text-teal-600 font-semibold mb-1">Poetry | Literature</p>
              <p className="text-gray-700 text-sm mb-2">Free Borrowing</p>
              <p className="text-gray-800 text-xs">⭐ 4.5 · Donation Helps Us Thrive</p>
            </div>
          </div>

          {/* Book 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
            <img src={Book2} alt="Book 2" className="w-full h-[450px] object-cover" />
            <div className="p-5">
              <p className="text-base text-teal-600 font-semibold mb-1">Fiction | Mystery</p>
              <p className="text-gray-700 text-sm mb-2">Free Borrowing</p>
              <p className="text-gray-800 text-xs">⭐ 4.5 · Voluntary Donation</p>
            </div>
          </div>

          {/* Book 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
            <img src={Book3} alt="Book 3" className="w-full h-[450px] object-cover" />
            <div className="p-5">
              <p className="text-base text-teal-600 font-semibold mb-1">Non-Fiction | Architecture</p>
              <p className="text-gray-700 text-sm mb-2">Free Borrowing</p>
              <p className="text-gray-800 text-xs">⭐ 4.5 · Support with Donation</p>
            </div>
          </div>

          {/* Book 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
            <img src={Book4} alt="Book 4" className="w-full h-[450px] object-cover" />
            <div className="p-5">
              <p className="text-base text-teal-600 font-semibold mb-1">Science | Biography</p>
              <p className="text-gray-700 text-sm mb-2">Free Borrowing</p>
              <p className="text-gray-800 text-xs">⭐ 4.7 · Readers' Favorite</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Book;
