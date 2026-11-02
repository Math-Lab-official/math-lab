import React from 'react';
import { Sparkles, Mail } from 'lucide-react';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../data/teamData';
import { LabTab } from '../../types';

interface Props {
  onNavigate: (tab: LabTab) => void;
}

export const AboutMathLabPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto transition-colors">
      {/* Header Banner */}
      <div className="bg-[#0a1426] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Student-Centered Mathematical Exploration</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            About Math Lab
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-amber-200/90 font-medium">
            Explore mathematics. Investigate questions. Learn together.
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Math Lab brings students together to explore math in ways that go beyond the classroom. Through our monthly investigations and Local Labs, students get to tackle interesting problems, share different approaches, and learn from one another. We want to give students more opportunities to be curious about math, think through challenging questions, and discover just how much there is to explore.
          </p>
        </div>
      </div>

      {/* Two Pillars Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-2">
          <span className="text-xs font-mono font-bold text-[#0077c8] dark:text-sky-400 uppercase">
            Pillar 1
          </span>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Monthly National Investigations
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Rich mathematical inquiries with 5 levels of depth, welcoming everyone from concrete observers to formal proof builders.
          </p>
          <button
            onClick={() => onNavigate('investigations')}
            className="text-xs font-bold text-[#0077c8] dark:text-sky-400 hover:underline pt-2 inline-block"
          >
            Explore Investigations →
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
            Pillar 2
          </span>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Community Local Labs
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Locally organized student math circles in schools and public libraries fostering curiosity and teamwork.
          </p>
          <button
            onClick={() => onNavigate('local-labs')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 inline-block"
          >
            Learn About Local Labs →
          </button>
        </div>
      </div>

      {/* Contact & Socials */}
      <div className="bg-[#0a1426] text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif-editorial text-2xl font-bold">
            Connect with Math Lab
          </h3>
          <p className="text-xs text-slate-300">
            Have questions or want to start a chapter? Reach out to our student team.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>{OFFICIAL_EMAIL}</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/40 to-pink-600/40 hover:from-purple-600/60 hover:to-pink-600/60 border border-pink-500/30 text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <span>Instagram ({INSTAGRAM_HANDLE})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
