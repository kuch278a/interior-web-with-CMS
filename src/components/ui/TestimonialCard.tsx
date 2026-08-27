import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  author: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: string;
}

/**
 * TestimonialCard – displays a luxury client testimonial with avatar, rating, and role.
 */
export default function TestimonialCard({
  author,
  role,
  content,
  rating = 5,
  avatar,
}: TestimonialCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.175 0l-3.376 2.455c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.28 9.383c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  ));

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group border border-slate-200 dark:border-white/10">
      {/* Decorative quote mark */}
      <div className="text-4xl text-purple-600/20 dark:text-purple-500/20 font-serif leading-none mb-3 select-none">
        &ldquo;
      </div>

      <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
        {content}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
        {avatar ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30 shrink-0">
            <Image
              src={avatar}
              alt={author}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {author ? author.charAt(0) : "C"}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
            {author}
          </div>
          {role && (
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{role}</div>
          )}
          <div className="flex items-center gap-1 mt-1.5">{stars}</div>
        </div>
      </div>
    </div>
  );
}
