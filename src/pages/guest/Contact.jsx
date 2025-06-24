import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import Bgperpus from '../../assets/bg-perpus.jpg'; // Pastikan file ini ada di path ini

const Contact = () => {
    return (
        <div className="bg-[#c9e2e6] min-h-screen">
            {/* Hero Section */}
            <div className="relative">
                <img
                    src={Bgperpus}
                    alt="Books Background"
                    className="w-full h-[500px] object-cover object-center"
                />
                <h1 className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold bg-black/30 backdrop-blur-sm">
                    Contact Us
                </h1>
            </div>

            {/* Contact Cards */}
            <div className="bg-white py-12 px-4 md:px-16">
                <div className="grid md:grid-cols-3 gap-[60px] max-w-6xl mx-auto">
                    {/* Address */}
                    <div className="bg-white rounded-xl shadow p-6 text-center border border-gray-300 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
                        <FaMapMarkerAlt className="text-3xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Address</h3>
                        <p className="text-sm text-gray-600">
                            Jl. Yos Sudarso No.88, Rumbai,<br />Pekanbaru, Riau, 28265
                        </p>
                    </div>

                    {/* Email */}
                    <div className="bg-white rounded-xl shadow p-7 text-center border border-gray-300 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
                        <FaEnvelope className="text-3xl text-gray-400 mx-auto mb-7" />
                        <h3 className="text-lg font-bold mb-2">Email Us</h3>
                        <p className="text-sm text-gray-600">
                            sipus.rumbai@gmail.com<br />info@siperpus.id
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white rounded-xl shadow p-6 text-center border border-gray-300 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
                        <FaPhone className="text-3xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Call Now</h3>
                        <p className="text-sm text-gray-600">
                            +62 761 123 456<br />+62 813 6543 7890
                        </p>
                    </div>
                </div>
            </div>

            {/* Question Form Section */}
            <div className="bg-[#eaf6f8] py-16 px-4">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Any Question?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        SIPerpus helps readers stay focused with clear, organized, and easily accessible content every time.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="border border-gray-300 p-3 rounded outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border border-gray-300 p-3 rounded outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Your Phone"
                            className="border border-gray-300 p-3 rounded outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="border border-gray-300 p-3 rounded outline-none"
                        />
                        <textarea
                            placeholder="Message"
                            className="border border-gray-300 p-3 rounded outline-none col-span-1 md:col-span-2 h-32"
                        ></textarea>
                        <div className="col-span-1 md:col-span-2 text-center">
                            <button
                                type="submit"
                                className="bg-[#4aa4b3] hover:bg-[#398a97] text-white font-semibold py-2 px-6 rounded transition"
                            >
                                Get In Touch
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Google Map Section */}
            <div className="w-full">
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
            </div>

            {/* Update & Notification Area */}
            <div className="bg-[#eaf6f8] py-16 px-4 text-center">
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
                    <button
                        type="submit"
                        className="bg-[#4aa4b3] hover:bg-[#398a97] text-white font-semibold px-6 py-3 rounded-full"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Footer Section */}
            <footer className="bg-[#d9f0f3] py-12 px-4 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-gray-700 text-sm">
                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-[#4aa4b3] text-white p-2 rounded-full">
                                📚
                            </div>
                            <h3 className="text-lg font-bold text-[#1f4458]">SIPerpus</h3>
                        </div>
                        <p>
                            SIPerpus provides easy access to a diverse collection of books, journals, and reference materials, along with interactive features to support your literacy and learning needs.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold mb-3">SERVICES</h4>
                        <ul className="space-y-1">
                            <li>Digital Book Catalog</li>
                            <li>Online Borrowing</li>
                            <li>E-Book Reading</li>
                            <li>Membership Registration</li>
                            <li>Virtual Reading Room</li>
                        </ul>
                    </div>

                    {/* Important Link */}
                    <div>
                        <h4 className="font-bold mb-3">IMPORTANT LINK</h4>
                        <ul className="space-y-1">
                            <li>About Us</li>
                            <li>FAQ</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold mb-3">CONTACT</h4>
                        <p>Jl. Yos Sudarso No.88, Rumbai, Pekanbaru, Riau, 28265</p>
                        <p className="mt-2">📞 +62 761 123 456<br />📱 +62 813 6543 7890</p>
                        <p className="mt-2">✉️ sipus.rumbai@gmail.com<br />📧 info@siperpus.id</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;