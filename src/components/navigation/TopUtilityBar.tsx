import React, { useState, useRef, useEffect } from 'react';
import { Search, Mail, ExternalLink, User, LogOut, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, STAFF_APPLICATION_URL } from '../../data/teamData';
import { useAuth } from '../../context/AuthContext';

interface TopUtilityBarProps {
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
  onOpenProgress?: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  onOpenSearch,
  onOpenContact,
  onOpenLogin,
  onOpenProgress,
}) => {
  const { effectiveUser, isAuthenticated, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#182029] dark:bg-slate-950 text-slate-300 dark:text-slate-400 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Scholarly motto */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="font-serif-editorial italic text-slate-300 dark:text-slate-300 text-xs tracking-wide">
            Explore mathematics. Investigate questions. Learn together.
          </span>
          <span className="text-slate-600 dark:text-slate-700" aria-hidden="true">·</span>
          <span className="text-[11px] font-mono text-slate-400">National Student Initiative</span>
        </div>

        {/* Right: Essential, unboxed utility links */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto text-xs font-medium">
          {/* Real User Auth / Sign In Badge */}
          {isAuthenticated && effectiveUser ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-800/80 text-sky-200 transition text-xs font-semibold shadow-2xs"
                title="Account Settings"
              >
                {effectiveUser.photoURL ? (
                  <img
                    src={effectiveUser.photoURL}
                    alt={effectiveUser.displayName || 'User'}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-[#0077c8] text-white flex items-center justify-center text-[10px] font-bold">
                    {(effectiveUser.displayName || effectiveUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="truncate max-w-[120px] font-medium text-white">
                  {effectiveUser.displayName || effectiveUser.email?.split('@')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-sky-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 text-slate-800 dark:text-slate-200 text-xs space-y-2 animate-in fade-in">
                  <div className="px-2 py-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {effectiveUser.displayName}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {effectiveUser.email}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {effectiveUser.role}
                    </span>
                  </div>

                  {onOpenProgress && (
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenProgress();
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#0077c8] dark:text-sky-400" />
                      <span>Research Portfolio</span>
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      setIsUserMenuOpen(false);
                      await signOut();
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center gap-2 transition font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-xs transition shadow-2xs"
              title="Sign in to your Math Lab account"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          <span className="text-slate-700" aria-hidden="true">·</span>

          <a
            href={STAFF_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 font-semibold"
            title="Apply to join Math Lab's national student staff committees"
          >
            <span>Staff Applications</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <span className="text-slate-700" aria-hidden="true">·</span>

          <button
            onClick={onOpenContact}
            className="hover:text-white transition-colors hidden md:flex items-center gap-1.5 text-slate-300 dark:text-slate-400"
          >
            <Mail className="w-3.5 h-3.5 opacity-70" />
            <span>{OFFICIAL_EMAIL}</span>
          </button>

          <span className="text-slate-700 hidden md:inline" aria-hidden="true">·</span>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors hidden sm:flex items-center gap-1 text-slate-300 dark:text-slate-400"
          >
            <span>Instagram</span>
          </a>

          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="hover:text-sky-300 transition-colors flex items-center gap-1 text-slate-300 dark:text-slate-300"
            title="Search investigations, formulas, and local labs"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
