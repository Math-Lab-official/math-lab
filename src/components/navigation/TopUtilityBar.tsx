import React from 'react';
import { Search, Mail, ExternalLink, ShieldCheck, UserCheck } from 'lucide-react';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, STAFF_APPLICATION_URL } from '../../data/teamData';
import { useAuth } from '../../context/AuthContext';

interface TopUtilityBarProps {
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onOpenProgress?: () => void;
  onOpenGmailCenter?: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  onOpenSearch,
  onOpenContact,
  onOpenProgress,
  onOpenGmailCenter,
}) => {
  const { isGmailConnected, googleUser } = useAuth();

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
        <div className="flex items-center gap-4 ml-auto text-xs font-medium">
          {/* Gmail Connect & Compose Hub */}
          {onOpenGmailCenter && (
            <button
              onClick={onOpenGmailCenter}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition text-xs font-semibold ${
                isGmailConnected
                  ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/80'
                  : 'bg-red-950/60 border border-red-800/60 text-red-200 hover:bg-red-900/80'
              }`}
              title="Open Math Lab Gmail Center (Compose, Send, Check status)"
            >
              <Mail className="w-3 h-3 text-[#ea4335]" />
              <span className="truncate max-w-[140px]">
                {isGmailConnected && googleUser ? (googleUser.displayName || googleUser.email?.split('@')[0]) : 'Gmail'}
              </span>
              {isGmailConnected && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
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


