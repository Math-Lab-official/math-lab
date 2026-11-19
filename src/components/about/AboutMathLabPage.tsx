import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../data/teamData';
import { LabTab } from '../../types';
import localLabsImg from '../../assets/images/local_labs_community_1795108888140.jpg';

interface Props {
  onNavigate: (tab: LabTab) => void;
}

export const AboutMathLabPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto transition-colors">
      {/* Header Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs font-mono tracking-wider uppercase text-[#0077c8] dark:text-sky-400 font-semibold">
            About Math Lab
          </p>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Explore mathematics. Investigate questions. Learn together.
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Math Lab brings students together beyond the classroom through monthly multi-level investigations, interactive digital laboratories, and student-led Local Labs.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 aspect-video bg-slate-100 dark:bg-slate-900">
            <img
              src={localLabsImg}
              alt="Mathematical notebook, compass, and geometric models on a study table"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-3">
          <div className="text-xs font-mono font-semibold text-[#0077c8] dark:text-sky-400">01</div>
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
            National Investigations
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Monthly inquiries across 5 depth levels, from hands-on pattern discovery to formal proofs.
          </p>
          <button
            onClick={() => onNavigate('investigations')}
            className="text-xs font-semibold text-[#0077c8] dark:text-sky-400 hover:underline inline-flex items-center gap-1 pt-1"
          >
            <span>Explore Investigations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-3">
          <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">02</div>
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
            Local Labs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Student-organized math circles in schools and public libraries.
          </p>
          <button
            onClick={() => onNavigate('local-labs')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 pt-1"
          >
            <span>Start a Local Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Questions or chapter inquiries? Reach our student team.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-2 transition"
          >
            <Mail className="w-3.5 h-3.5 text-[#0077c8] dark:text-sky-400" />
            <span>{OFFICIAL_EMAIL}</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-xs transition"
          >
            Instagram ({INSTAGRAM_HANDLE})
          </a>
        </div>
      </section>
    </div>
  );
};
