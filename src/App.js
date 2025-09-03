import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import GuestRoute from "./components/protectedRoute/GuestRoute";
import Login from "./pages/auth/Login";
import Layout from "./pages/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import AccountBook from "./pages/settings/accountBook/AccountBook";
import AccountBookForm from "./pages/settings/accountBook/Form";
import Member from "./pages/settings/member/Member";
import MemberForm from "./pages/settings/member/Form";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* halaman login tidak perlu proteksi */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        {/* halaman lain diproteksi */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings">
            <Route path="account-book" element={<AccountBook />} />
            <Route path="account-book/add" element={<AccountBookForm />} />
            {/* <Route path="account-book/edit/:id" element={<AccountBookForm />} /> */}
            <Route path="member" element={<Member />} />
            <Route path="member/add" element={<MemberForm />} />
            {/* <Route path="member/edit/:id" element={<MemberForm />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
