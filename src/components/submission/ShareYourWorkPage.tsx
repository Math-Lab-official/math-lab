import React from 'react';
import { Mail } from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';

interface Props {
  onNavigateHome?: () => void;
}

export const ShareYourWorkPage: React.FC<Props> = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto transition-colors">
      <section className="space-y-3">
        <p className="text-xs font-mono tracking-wider uppercase text-[#0077c8] dark:text-sky-400 font-semibold">
          Submissions
        </p>
        <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          Share Your Work
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl">
          Submit solutions, partial proofs, conjectures, or visual models from any investigation.
        </p>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-5">
        <div className="space-y-2">
          <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
            Submission Form — Coming Soon
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
            Our online submission portal is in preparation. Until it launches, email your work directly to our team.
          </p>
        </div>

        <a
          href={`mailto:${OFFICIAL_EMAIL}?subject=Student%20Investigation%20Work`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-semibold transition"
        >
          <Mail className="w-4 h-4" />
          <span>Email {OFFICIAL_EMAIL}</span>
        </a>
      </section>
    </div>
  );
};
