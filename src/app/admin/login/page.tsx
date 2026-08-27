"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/ui/Navbar";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@auratech.design");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (
        (email.trim().toLowerCase() === "admin@auratech.design" && password === "admin123") ||
        (email.trim().length > 3 && password.length >= 4)
      ) {
        localStorage.setItem("auratech_cms_auth", "true");
        localStorage.setItem("auratech_cms_user", email);
        window.dispatchEvent(new Event("storage"));
        router.push("/admin");
      } else {
        setError("Invalid credentials. Please use the demo credentials below.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-16">
        <div className="w-full max-w-md glass-panel border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient inner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Authorized Personnel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              CMS Control Plane
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Sign in to manage studio schemas, portfolio, and Strapi APIs.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@auratech.design"
                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Access Key / Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-purple-600 accent-purple-600"
                />
                <span>Remember session</span>
              </label>
              <span className="text-purple-600 dark:text-purple-400 text-[11px] font-mono">
                SSL 256-bit
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:scale-[1.01] transition-transform disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-purple-600 dark:text-purple-400">Demo Access Credentials:</span>
              <div className="mt-1 font-mono text-[11px] text-slate-700 dark:text-slate-200">
                Email: <span className="font-bold">admin@auratech.design</span> | Password: <span className="font-bold">admin123</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-slate-500 dark:text-slate-400">
        AURATECH Studio • Confidential Enterprise Admin Interface
      </footer>
    </div>
  );
}
