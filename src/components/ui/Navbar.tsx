"use client";

import React, { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-xl tracking-wider">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              AURATECH
            </span>
            <span className="text-[10px] uppercase tracking-widest text-purple-600 dark:text-purple-400 font-semibold -mt-1">
              Architecture & Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-colors"
          >
            Services
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-colors"
          >
            Studio
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-colors"
          >
            Insights
          </Link>
          <Link
            href="/testimonials"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-colors"
          >
            Reviews
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <DarkModeToggle />
          <Link
            href="/contact"
            className="relative group overflow-hidden px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 transition-all duration-300 group-hover:scale-105" />
            <span className="relative flex items-center gap-2">
              Book Discovery
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t px-6 py-5 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white"
          >
            Studio
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white"
          >
            Insights
          </Link>
          <Link
            href="/testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-white"
          >
            Reviews
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-md"
          >
            Book Discovery
          </Link>
        </div>
      )}
    </header>
  );
}
