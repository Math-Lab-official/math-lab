import React from 'react';
import { Building2, Sparkles, Mail, Users } from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';

export const StartLocalLabPage: React.FC = () => {
  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#0a1426] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Community Chapters</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Local Labs
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Local Labs are student-led math circles meeting in schools, libraries, and community spaces to explore investigations and solve problems together.
          </p>
        </div>
      </div>

      {/* Coming Soon Notice Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Local Labs Chapters — Coming Soon!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We are preparing our official chapter documentation, facilitator handbook, and registration links. External links and guides will be published here soon!
          </p>
        </div>

        {/* Contact info */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interested in starting a Local Lab at your school or local library?
          </p>
          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Starting%20a%20Local%20Math%20Lab`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch ({OFFICIAL_EMAIL})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
