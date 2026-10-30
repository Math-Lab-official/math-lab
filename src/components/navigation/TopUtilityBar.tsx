import React, { useState, useEffect } from 'react';
import { Search, Mail, ExternalLink, Sun, Moon, Award } from 'lucide-react';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, STAFF_APPLICATION_URL } from '../../data/teamData';
import { useTheme } from '../../context/ThemeContext';
import { getStudentProgress, getOverallProgressStats } from '../../utils/studentProgress';

interface TopUtilityBarProps {
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onOpenProgress?: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  onOpenSearch,
  onOpenContact,
  onOpenProgress,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [stats, setStats] = useState(() => getOverallProgressStats(getStudentProgress()));

  useEffect(() => {
    const handleUpdate = () => {
      setStats(getOverallProgressStats(getStudentProgress()));
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, []);

  return (
    <div className="bg-[#3b073e] dark:bg-slate-950 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-purple-900/40 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left tagline / status */}
        <div className="hidden sm:flex items-center gap-2 text-purple-200 dark:text-slate-400">
          <span className="font-serif italic tracking-wide text-amber-200/90 dark:text-amber-300/80 text-xs">
            Explore mathematics. Investigate questions. Learn together.
          </span>
        </div>

        {/* Right utility links */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto font-medium">
          {/* Progress Tracker Trigger */}
          {onOpenProgress && (
            <button
              onClick={onOpenProgress}
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-sky-200 font-bold transition flex items-center gap-1.5 text-[11px] border border-white/10"
              title="View my exploration milestones and research conjectures"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Progress: {stats.overallPercentage}%</span>
            </button>
          )}

          <a
            href={STAFF_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors flex items-center gap-1 text-[11px] shadow-xs"
            title="Apply to join Math Lab's national student staff committees"
          >
            <span>★</span>
            <span className="hidden xs:inline">Join Staff</span>
            <span className="xs:hidden">Apply</span>
          </a>

          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="hover:text-amber-300 transition-colors hidden md:flex items-center gap-1 text-purple-200 dark:text-slate-400"
          >
            <Mail className="w-3.5 h-3.5 text-purple-300 dark:text-slate-400" />
            <span>{OFFICIAL_EMAIL}</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition-colors hidden sm:flex items-center gap-1 text-purple-200 dark:text-slate-400"
          >
            <span>Instagram</span>
          </a>

          <span className="text-purple-400/60 dark:text-slate-700 font-light">|</span>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-300 font-semibold"
            title="Search investigations and local labs"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 transition flex items-center justify-center border border-white/10 ml-1"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-purple-200" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
