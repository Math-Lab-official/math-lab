import React from 'react';
import { LabTab } from '../types';
import { ExternalLink } from 'lucide-react';
import { STAFF_APPLICATION_URL, OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/teamData';

interface FooterProps {
  onSelectTab: (tab: LabTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const go = (tab: LabTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="font-display-bold text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            MATH LAB
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <a href={`mailto:${OFFICIAL_EMAIL}`} className="hover:text-[#0077c8] dark:hover:text-sky-400 transition-colors">
              {OFFICIAL_EMAIL}
            </a>
            <span aria-hidden="true">·</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077c8] dark:hover:text-sky-400 transition-colors">
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-5 text-xs font-medium">
          <button onClick={() => go('investigations')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Investigations
          </button>
          <button onClick={() => go('laboratories')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Digital Lab
          </button>
          <button onClick={() => go('local-labs')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Local Labs
          </button>
          <button onClick={() => go('team')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Team
          </button>
          <button onClick={() => go('about')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            About
          </button>
          <a
            href={STAFF_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0077c8] dark:text-sky-400 hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>Join Staff</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>
      </div>
    </footer>
  );
};
