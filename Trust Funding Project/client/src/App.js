import React from 'react';
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import Login from 'views/Login';



export default function App() {
  const token = localStorage.getItem('token'); // Get the token from localStorage

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
