import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import HomePage from "./pages/HomePage";
import UserDetailPage from "./pages/UserDetailPage";
import "./App.css";

export default function App() {
  return (
    <UserProvider>
      <div className="app-shell">
        <header className="app-header">
          <Link to="/" className="brand">
            <span className="brand__mark">U</span>
            User Directory
          </Link>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

function NotFound() {
  return (
    <section className="detail-view">
      <h1>Page not found</h1>
      <p>
        <Link to="/">Back to the directory</Link>
      </p>
    </section>
  );
}
