"use client";

import React, { useState } from "react";
import AnimatedButton from "./AnimatedButton";

export default function ConsultationForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 rounded-2xl glass-panel border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 text-sm max-w-md mx-auto flex items-center justify-center gap-2">
        <span>✨</span>
        <span>Thank you! Our concierge team will reach out within 24 hours.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address..."
        className="w-full px-5 py-3.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 text-sm shadow-inner"
      />
      <AnimatedButton type="submit" className="w-full sm:w-auto shrink-0">
        Get in Touch
      </AnimatedButton>
    </form>
  );
}
