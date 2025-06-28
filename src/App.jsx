// File: App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

// Import Layouts
import MainLayout from "./layout/admin/MainLayout";
import GuestLayout from "./layout/guest/GuestLayout";
import AnggotaLayout from "./layout/anggota/AnggotaLayout";

// Import Pages
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import ApprovePosts from "./pages/admin/ApprovePosts";
import Books from "./pages/admin/Books";
import Articles from "./pages/admin/Articles";
import Profile from "./pages/admin/Profile";
import Events from "./pages/admin/Events";

// Import Anggota
import AboutAnggota from "./components/anggota/About";
import Beranda from "./components/anggota/Beranda";
import BookAnggota from "./components/anggota/Book";
import ContactAnggota from "./components/anggota/Contact";
import DonationAnggota from "./components/anggota/Donation";
import LoginAnggota from "./components/anggota/Login";
import LoginUpload from "./components/anggota/LoginUpload";
import Lokasi from "./components/anggota/Lokasi";
import ProfileAnggota from "./components/anggota/Profile";
import RiwayatBacaan from "./components/anggota/RiwayatBacaan";
import UploadTulisan from "./components/anggota/UploadTulisan";
import UploadForm from "./components/anggota/UploadForm";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Donation from './pages/guest/Donation';
import About from './pages/guest/About';
import Contact from './pages/guest/Contact';
import Book from './pages/guest/Book';
import BookList from './pages/guest/BookList';
import EventGuest from './pages/guest/EventGuest';
import EventDetail from './pages/guest/EventDetail';


import Hero from "./components/guest/Hero";

export default function App() {
  return (
    <Routes>
      {/* Guest routes */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        <Route path="/books/all" element={<BookList />} />
        <Route path="/eventguest" element={<EventGuest />} />
        <Route path="/event/:id" element={<EventDetail />} />

      </Route>

      {/* Anggota routes */}
      <Route element={<AnggotaLayout />}>
        <Route path="/anggota/about" element={<AboutAnggota />} />
        <Route path="/anggota/beranda" element={<Beranda />} />
        <Route path="/anggota/book" element={<BookAnggota />} />
        <Route path="/anggota/contact" element={<ContactAnggota />} />
        <Route path="/anggota/donation" element={<DonationAnggota />} />
        <Route path="/anggota/login" element={<LoginAnggota />} />
        <Route path="/anggota/login-upload" element={<LoginUpload />} />
        <Route path="/anggota/lokasi" element={<Lokasi />} />
        <Route path="/anggota/profile" element={<ProfileAnggota />} />
        <Route path="/anggota/riwayat" element={<RiwayatBacaan />} />
        <Route path="/anggota/upload" element={<UploadTulisan />} />
        <Route path="/anggota/upload-form" element={<UploadForm />} />
      </Route>

      {/* Admin routes */}
      <Route element={<MainLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/members" element={<Members />} />
        <Route path="/admin/approve-posts" element={<ApprovePosts />} />
        <Route path="/admin/books" element={<Books />} />
        <Route path="/admin/articles" element={<Articles />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/events" element={<Events />} />
      </Route>
    </Routes>
  );
}
