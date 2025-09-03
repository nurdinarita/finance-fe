// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth")); // cek login dari localStorage

  if (!auth || !auth.token) {
    // kalau belum login, redirect ke /login
    return <Navigate to="/login" replace />;
  }

  return children;
}
