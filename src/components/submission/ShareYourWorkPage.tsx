import React from 'react';
import { Send, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';

interface Props {
  onNavigateHome?: () => void;
}

export const ShareYourWorkPage: React.FC<Props> = ({ onNavigateHome }) => {
  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#0a1426] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
            <Send className="w-3.5 h-3.5" />
            <span>Student Research</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Share Your Work
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have you discovered an interesting pattern, partial proof, or alternative approach to one of our investigations? We love seeing student mathematical thinking in all forms.
          </p>
        </div>
      </div>

      {/* Submission Form Notice Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-[#0077c8] dark:text-sky-400 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-[#0077c8] dark:text-sky-400" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Official Submission Form — Coming Soon!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We are setting up our official submission form. Once live, you will be able to submit written solutions, conjectures, and visual proofs directly to our Solutions Review Committee.
          </p>
        </div>

        {/* Email Outreach Option */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Have a solution or finding to share right now? Email us directly:
          </p>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Student%20Investigation%20Work`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold transition shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Email Your Findings ({OFFICIAL_EMAIL})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
