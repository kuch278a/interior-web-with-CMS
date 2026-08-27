import React from "react";

interface GlassCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
}

/**
 * GlassCard – reusable card with glassmorphism, border glow, and interactive hover.
 */
export default function GlassCard({
  title,
  subtitle,
  children,
  badge,
  className = "",
  footer,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl glass-panel glass-panel-hover p-6 sm:p-7 flex flex-col justify-between border border-slate-200 dark:border-white/10 ${className}`}
    >
      {/* Subtle top accent highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        {(badge || title) && (
          <div className="flex items-start justify-between gap-3 mb-3">
            {title && (
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                {title}
              </h3>
            )}
            {badge && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                {badge}
              </span>
            )}
          </div>
        )}

        {subtitle && (
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">{subtitle}</p>
        )}

        <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{children}</div>
      </div>

      {footer && <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">{footer}</div>}
    </div>
  );
}
