import React, { useState, useEffect } from 'react';
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";
import Login from 'views/Login';
import Loader from 'components/Loader';


export default function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    // Simulate loading delay or perform data loading here
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // return <Loader />; 
  }

  return (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/admin/dashboard" replace /> : <Login />} />
            <Route path="/admin/*" element={token ? <AdminLayout /> : <Navigate to="/" replace />} />
            <Route path="/admin/login" element={<Navigate to="/" replace />} />
            {/* <Route path="/we-donate" element={<DonorView />} />  */}
          </Routes>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
}
