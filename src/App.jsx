// File: App.jsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

// Import Layouts
import MainLayout from "./layout/admin/MainLayout";
import GuestLayout from "./layout/guest/GuestLayout";
import AnggotaLayout from "./layout/anggota/AnggotaLayout";

// Import Pages
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Members = lazy(() => import("./pages/admin/Members"));
const Books = lazy(() => import("./pages/admin/Books"));
const Profile = lazy(() => import("./pages/admin/Profile"));
const Approves = lazy(() => import("./pages/admin/Approves"));

// Anggota
const AboutAnggota = lazy(() => import("./components/anggota/About"));
const Beranda = lazy(() => import("./components/anggota/Beranda"));
const BookAnggota = lazy(() => import("./components/anggota/Book"));
const ContactAnggota = lazy(() => import("./components/anggota/Contact"));
const DonationAnggota = lazy(() => import("./components/anggota/Donation"));
const LoginAnggota = lazy(() => import("./components/anggota/Login"));
const LoginUpload = lazy(() => import("./components/anggota/LoginUpload"));
const Lokasi = lazy(() => import("./components/anggota/Lokasi"));
const ProfileAnggota = lazy(() => import("./components/anggota/Profile"));
const RiwayatBacaan = lazy(() => import("./components/anggota/RiwayatBacaan"));
const UploadTulisan = lazy(() => import("./components/anggota/UploadTulisan"));
const UploadForm = lazy(() => import("./components/anggota/UploadForm"));
const ReadBook = lazy(() => import("./components/ReadBook"));
const BookListAnggota = lazy(() => import("./components/anggota/BookList"));
const EventAnggota = lazy(() => import("./components/anggota/EventGuest"));
const EventAnggotaDetail = lazy(() => import("./components/anggota/EventDetail"));

// Guest
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Donation = lazy(() => import("./pages/guest/Donation"));
const About = lazy(() => import("./pages/guest/About"));
const Contact = lazy(() => import("./pages/guest/Contact"));
const Book = lazy(() => import("./pages/guest/Book"));
const BookList = lazy(() => import("./pages/guest/BookList"));
const EventGuest = lazy(() => import("./pages/guest/EventGuest"));
const EventDetail = lazy(() => import("./pages/guest/EventDetail"));
const Hero = lazy(() => import("./components/guest/Hero"));

import PrivateRoute from "./utils/PrivateRoute";
export default function App() {
  const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f7fafa]">
    <div className="animate-spin h-12 w-12 border-4 border-[#579DA5] border-t-transparent rounded-full"></div>
    <p className="ml-4 text-[#579DA5] font-semibold">Loading...</p>
  </div>
);
  return (
    <Suspense fallback={<LoadingScreen />}>

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
        <Route path="/book/:id" element={<ReadBook />} />
      </Route>

      {/* Anggota routes */}
      <Route element={<PrivateRoute allowedRole="anggota" />}>
        <Route element={<AnggotaLayout />}>
          <Route path="/anggota/about" element={<AboutAnggota />} />
          <Route path="/anggota/beranda" element={<Beranda />} />
          <Route path="/anggota/book" element={<BookAnggota />} />
          <Route path="/anggota/books/all" element={<BookListAnggota />} />
          <Route path="/anggota/contact" element={<ContactAnggota />} />
          <Route path="/anggota/donation" element={<DonationAnggota />} />
          <Route path="/anggota/login" element={<LoginAnggota />} />
          <Route path="/anggota/login-upload" element={<LoginUpload />} />
          <Route path="/anggota/lokasi" element={<Lokasi />} />
          <Route path="/anggota/profile" element={<ProfileAnggota />} />
          <Route path="/anggota/riwayat" element={<RiwayatBacaan />} />
          <Route path="/anggota/upload" element={<UploadTulisan />} />
          <Route path="/anggota/upload-form" element={<UploadForm />} />
          <Route path="/anggota/book/:id" element={<ReadBook />} />
          <Route path="/anggota/event" element={<EventAnggota />} />
          <Route path="/anggota/event/:id" element={<EventAnggotaDetail />} />
        </Route>
      </Route>
      

      {/* Admin routes */}
      <Route element={<PrivateRoute allowedRole="admin" />}>
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/members" element={<Members />} />
            <Route path="/admin/books" element={<Books />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/Approves" element={<Approves />} />
          </Route>
      </Route>
    </Routes>
</Suspense>

  );
}
