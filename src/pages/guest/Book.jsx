import React from 'react';
import '../../assets/tailwind.css';
import BannerImg from '../../assets/perpustakaan.jpeg';
import { Link } from 'react-router-dom';
import FeaturedBooks from '../../components/FeaturedBooks';

const Book = () => {
  return (
    <div className="book-page bg-[#c7e2e5] min-h-screen">
      <div>
        <img src={BannerImg} alt="Library" className="w-full h-[450px] object-cover" />
      </div>

      <div className="bg-[#eef7f7] px-6 md:px-28 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="text-teal-600">SIPerpus</span> Featured Collection
          </h2>
          <Link
            to="/books/all"
            className="border border-red-500 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50"
          >
            View All
          </Link>
        </div>

        <div className="text-gray-600 text-base font-semibold leading-relaxed mb-12">
          <p>A curated selection of our most borrowed and loved books. Borrow anytime for free,</p>
          <p>with optional donation to help us grow. Enjoy reading wherever you are, with collections from poetry to architecture.</p>
        </div>

        <FeaturedBooks />
      </div>
    </div>
  );
};

export default Book;
