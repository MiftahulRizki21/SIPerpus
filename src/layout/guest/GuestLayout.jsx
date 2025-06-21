import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/guest/Navbar'; // path dari components

const GuestLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default GuestLayout;
