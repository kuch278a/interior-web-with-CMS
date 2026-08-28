"use client";

import React, { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const currentIsDark = stored ? stored === "dark" : true;
    setIsDark(currentIsDark);
    if (currentIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("storage"));
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full glass-panel opacity-50" />
    );
  }

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label="Toggle dark/light mode"
      className="relative w-10 h-10 rounded-full glass-panel text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 active:scale-90 transition-all duration-150 focus:outline-none shadow-sm cursor-pointer flex items-center justify-center group"
    >
      <div className="transition-transform duration-200 group-hover:rotate-12">
        {isDark ? (
          <svg
            className="w-5 h-5 text-amber-400 animate-fadeIn"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-purple-600 animate-fadeIn"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
