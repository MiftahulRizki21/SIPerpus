import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/anggota/Navbar'; // path dari components

const AnggotaLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AnggotaLayout;
