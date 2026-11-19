import React from 'react';
import { Mail } from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';
import localLabsImg from '../../assets/images/local_labs_community_1795108888140.jpg';

export const StartLocalLabPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto transition-colors">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-3">
          <p className="text-xs font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
            Community Chapters
          </p>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Local Labs
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Student-led math circles in schools, libraries, and community spaces.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 aspect-video bg-slate-100 dark:bg-slate-900">
            <img
              src={localLabsImg}
              alt="Library study table with grid notebook, brass compass, and geometric polyhedra"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-lg">
          <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
            Chapter Portal — Coming Soon
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Our facilitator handbook and chapter registration links are coming soon. Reach out to start a Local Lab at your school or library.
          </p>
        </div>

        <a
          href={`mailto:${OFFICIAL_EMAIL}?subject=Starting%20a%20Local%20Math%20Lab`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shrink-0 self-start sm:self-center"
        >
          <Mail className="w-4 h-4" />
          <span>Email {OFFICIAL_EMAIL}</span>
        </a>
      </section>
    </div>
  );
};
