// File: App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

// Import Layouts
import MainLayout from "./layout/admin/MainLayout";
import GuestLayout from "./layout/guest/GuestLayout";

// Import Pages
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import ApprovePosts from "./pages/admin/ApprovePosts";
import Books from "./pages/admin/Books";
import Articles from "./pages/admin/Articles";
import Profile from "./pages/admin/Profile";
import Events from "./pages/admin/Events";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Donation from './pages/guest/Donation';
import About from './pages/guest/About';

// 🔥 Tambahkan import Hero di sini
import Hero from "./components/guest/Hero";

export default function App() {
  return (
    <Routes>
      {/* Guest routes */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Hero />} /> {/* 👈 sekarang '/' menampilkan Hero */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Admin routes */}
      <Route element={<MainLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/approve-posts" element={<ApprovePosts />} />
        <Route path="/books" element={<Books />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
      </Route>
    </Routes>
  );
}
