// src/components/guestRoute/GuestRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth?.token) {
    // kalau sudah login, redirect ke dashboard
    return <Navigate to="/" replace />;
  }

  return children; // kalau belum login, tampilkan halaman (misalnya Login)
}
