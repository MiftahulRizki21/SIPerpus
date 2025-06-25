import React from 'react';
import '../../assets/tailwind.css';
import Novel from '../../assets/metamorfosis.jpeg';
import Bgabout from '../../assets/perpustakaan.jpeg';
import { Link } from 'react-router-dom';
import FeaturedBooks from '../../components/FeaturedBooks';
import CountUp from 'react-countup';
import { FaBook, FaUsers, FaDonate, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-page">
      {/* Banner Section with Animated Background */}
<motion.div
  className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
  style={{ backgroundImage: `url(${Bgabout})` }}
  initial={{ opacity: 0, scale: 1.1 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: 'easeOut' }}
>
  <motion.h2
    className="text-4xl font-bold text-white drop-shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
  >
    About Us
  </motion.h2>
</motion.div>

      {/* Info Section */}
      <div className="container mx-auto py-12 px-8 md:px-20 grid md:grid-cols-2 gap-6 items-center">
        <motion.img
          src={Novel}
          alt="Novel Metamorfosis"
          className="w-[400px] h-[400px] object-cover rounded-md shadow-lg mx-auto"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-teal-600 font-semibold mb-5">EXCLUSIVE OFFER</p>
          <h3 className="text-2xl font-bold mb-5">Metamorfosis Novel Now Available</h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-7">
            Discover the surreal world of Franz Kafka’s <i>Metamorphosis</i>, exploring the existential journey of Gregor Samsa.
            Now available for you to borrow and read online, anytime, anywhere.
          </p>

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

          <div className="flex space-x-4">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600">Borrow</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-300">Read This Book</button>
          </div>
        </motion.div>
      </div>

      {/* Featured Packages */}
      <div className="bg-[#eef7f7] px-6 md:px-20 py-10">
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-teal-600">SIPerpus</span> Featured Collection
          </h2>
          <Link
            to="/books/all"
            className="border border-red-500 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50"
          >
            View All
          </Link>
        </motion.div>

        <motion.div
          className="text-gray-600 text-base font-semibold leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>A curated selection of our most borrowed and loved books. Borrow anytime for free,</p>
          <p>with optional donation to help us grow. Enjoy reading wherever you are, with collections from poetry to architecture.</p>
        </motion.div>

        <div className="w-full px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-4 w-full">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <img src={Bgabout} alt="Package" className="w-full h-56 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {['Classic Collection', 'Modern Access', 'Premium Shelf', 'Youth Edition'][i]}
                  </h3>
                  <p className="text-2xl font-bold text-red-500 mb-4">
                    {i === 2 ? 'DONATE' : 'FREE'}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {[
                      ['+100 Literature Books', 'Free Borrowing', 'Physical & Digital', 'Daily Updates'],
                      ['Online Access 24/7', 'Searchable Catalog', 'Member Dashboard', 'Free Download'],
                      ['Rare Collections', 'Donation Based', 'Community Driven', 'Extended Access'],
                      ['Books for Teens', 'Interactive Stories', 'Free Membership', 'Accessible Design'],
                    ][i].map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <button className="inline-block border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition duration-300 mx-auto">
                    {['Explore Now', 'Get Access', 'Support Now', 'Join Now'][i]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fasilitas Section */}
        <br />
        <div className="w-full bg-[#f5faff] py-16">
          <div className="w-full grid md:grid-cols-2 gap-10 items-center px-4 md:px-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0b1f3a] mb-4 leading-snug">
                We are Providing You<br /> Our Best <span className="text-red-500">SIPerpus</span> Facilities
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                SIPerpus menawarkan fasilitas terbaik untuk mendukung budaya baca dan literasi masyarakat,
                mulai dari akses buku gratis, sistem peminjaman daring, ruang baca nyaman, dan layanan donasi untuk pengembangan koleksi.
              </p>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md shadow hover:bg-red-600 transition duration-300">
                Discover More
              </button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border border-gray-300 rounded-xl p-6 bg-white shadow-md">
              {['📚', '🌐', '🤝', '💺', '💻', '🎁'].map((icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <span className="text-4xl text-[#0b1f3a]">{icon}</span>
                  <p className="mt-3 text-base font-semibold text-gray-800">
                    {['Free Books', 'Online Access', 'Community Support', 'Reading Lounge', 'Digital Library', 'Donation Program'][i]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistik */}
        <br />
        <div className="bg-[#0b1f3a] py-16 w-full text-white text-center">
          <motion.h2
            className="text-3xl font-bold mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SIPerpus in Numbers
          </motion.h2>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-3 text-white">
            {[FaBook, FaUsers, FaDonate, FaGlobe].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Icon className="text-4xl text-cyan-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">
                  <CountUp end={[1200, 300, 750, 15][i]} duration={3} />+
                </h3>
                <p className="text-sm mt-1">
                  {['Books Available', 'Active Members', 'Donations Received', 'Partner Libraries'][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
