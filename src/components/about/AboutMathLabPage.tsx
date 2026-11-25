import React from 'react';
import { ArrowRight, Mail, Compass, Building2, Cpu } from 'lucide-react';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../data/teamData';
import { LabTab } from '../../types';
import { PageHero } from '../common/PageHero';
import heroMathImg from '../../assets/images/hero_math_geometry_1795108888129.jpg';

interface Props {
  onNavigate: (tab: LabTab) => void;
}

export const AboutMathLabPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="transition-colors">
      <PageHero
        title="About Math Lab."
        subtitle="Open-access mathematical inquiry, interactive studios, and student-led chapters."
        image={heroMathImg}
        imageAlt="Abstract geometric polyhedra and mathematical curves"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Clean 3-Column Iconography Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-3">
            <Compass className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              National Investigations
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Monthly 5-level inquiries from pattern discovery to formal proofs.
            </p>
            <button
              onClick={() => onNavigate('investigations')}
              className="text-sm font-semibold text-[#0077c8] dark:text-sky-400 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-3">
            <Cpu className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Digital Math Lab
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Six browser-based visual sandboxes for calculus, geometry, and number theory.
            </p>
            <button
              onClick={() => onNavigate('laboratories')}
              className="text-sm font-semibold text-[#0077c8] dark:text-sky-400 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Launch Studios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-3">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Local Labs
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Student-organized math circles in schools and public libraries.
            </p>
            <button
              onClick={() => onNavigate('local-labs')}
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Start a Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Contact Bar */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Questions or chapter inquiries? Reach our student team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${OFFICIAL_EMAIL}`}
              className="px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-2 transition"
            >
              <Mail className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
              <span>{OFFICIAL_EMAIL}</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-sm transition"
            >
              Instagram ({INSTAGRAM_HANDLE})
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
