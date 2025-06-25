import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import Bgperpus from '../../assets/bg-perpus.jpg';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Contact = () => {
  return (
    <div className="bg-[#c9e2e6] min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src={Bgperpus}
          alt="Books Background"
          className="w-full h-[500px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col justify-center items-center">
          <motion.h1
            className="text-white text-5xl font-bold mb-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-white text-base md:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Reach us for inquiries, suggestions, or collaboration.
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        className="bg-white py-12 px-4 md:px-16"
        {...fadeInUp}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="grid md:grid-cols-3 gap-[60px] max-w-6xl mx-auto">
          {[FaMapMarkerAlt, FaEnvelope, FaPhone].map((Icon, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow p-6 text-center border border-gray-300 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Icon className="text-3xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">
                {['Address', 'Email Us', 'Call Now'][i]}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {[
                  'Jl. Yos Sudarso No.88, Rumbai,\nPekanbaru, Riau, 28265',
                  'sipus.rumbai@gmail.com\ninfo@siperpus.id',
                  '+62 761 123 456\n+62 813 6543 7890',
                ][i]}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Question Form Section */}
      <motion.div className="bg-[#eaf6f8] pt-16 px-4" {...fadeInUp} transition={{ delay: 0.2, duration: 1 }}>
        <div className="max-w-4xl mx-auto text-center mb-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            Have Any Question?
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            SIPerpus helps readers stay focused with clear, organized, and easily accessible content every time.
          </motion.p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md"
          {...fadeInUp}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Your Name" className="border border-gray-300 p-3 rounded outline-none" />
            <input type="email" placeholder="Your Email" className="border border-gray-300 p-3 rounded outline-none" />
            <input type="text" placeholder="Your Phone" className="border border-gray-300 p-3 rounded outline-none" />
            <input type="text" placeholder="Subject" className="border border-gray-300 p-3 rounded outline-none" />
            <textarea placeholder="Message" className="border border-gray-300 p-3 rounded outline-none col-span-1 md:col-span-2 h-32"></textarea>
            <div className="col-span-1 md:col-span-2 text-center">
              <button type="submit" className="bg-[#4aa4b3] hover:bg-[#398a97] text-white font-semibold py-2 px-6 rounded transition">
                Get In Touch
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div className="bg-[#eaf6f8] py-16 px-4 text-center" {...fadeInUp} transition={{ delay: 0.6, duration: 0.8 }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Update & Notifications Area</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Want to stay connected with our newest collections, exciting events, and important information from SIPerpus? Register your email now to receive direct notifications.
          </p>
          <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-1 p-3 rounded-full border border-gray-300 outline-none"
            />
            <button type="submit" className="bg-[#4aa4b3] hover:bg-[#398a97] text-white font-semibold px-6 py-3 rounded-full">
              Subscribe
            </button>
          </form>
        </motion.div>

        <motion.div className="-mx-4 md:-mx-16 mt-12" {...fadeInUp} transition={{ delay: 0.8, duration: 1 }}>
          <iframe
            title="SIPerpus Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.235201984125!2d101.42656964040284!3d0.4862204566118726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5af96d78d11ab%3A0xbb8d8f1f2dc4fecd!2sKFC%20Rumbai!5e0!3m2!1sen!2sid!4v1719220000000!5m2!1sen!2sid"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </motion.div>

      <footer className="bg-[#0a2a43] py-12 px-4 md:px-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-gray-200 text-sm"
          {...fadeInUp}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#4aa4b3] text-white p-2 rounded-full">📚</div>
              <h3 className="text-lg font-bold text-white">SIPerpus</h3>
            </div>
            <p>
              SIPerpus provides easy access to a diverse collection of books, journals, and reference materials, along with interactive features to support your literacy and learning needs.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">SERVICES</h4>
            <ul className="space-y-1">
              <li>Digital Book Catalog</li>
              <li>Online Borrowing</li>
              <li>E-Book Reading</li>
              <li>Membership Registration</li>
              <li>Virtual Reading Room</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">IMPORTANT LINK</h4>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">CONTACT</h4>
            <p>Jl. Yos Sudarso No.88, Rumbai, Pekanbaru, Riau, 28265</p>
            <p className="mt-2">📞 +62 761 123 456<br />📱 +62 813 6543 7890</p>
            <p className="mt-2">✉️ sipus.rumbai@gmail.com<br />📧 info@siperpus.id</p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Contact;
