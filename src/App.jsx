console.log("Rendering Notes...");

import { createRoot } from "react-dom/client";
import React from "react";
import './assets/tailwind.css';

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Members from './pages/admin/Members'
import ApprovePosts from './pages/admin/ApprovePosts'
import Books from './pages/admin/Books'
import Articles from './pages/admin/Articles'
import Profile from './pages/admin/Profile'
import Events from './pages/admin/Events'
import MainLayout from "./layout/admin/MainLayout";

export default function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/members" element={<Members />} />
                <Route path="/approve-posts" element={<ApprovePosts />} />
                <Route path="/books" element={<Books />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events" element={<Events />} />
            </Route>
        </Routes>
    )
}


