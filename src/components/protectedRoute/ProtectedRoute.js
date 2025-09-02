// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("auth"); // cek login dari localStorage

  if (!token) {
    // kalau belum login, redirect ke /login
    return <Navigate to="/login" replace />;
  }

  return children; // kalau sudah login, tampilkan halaman
}
