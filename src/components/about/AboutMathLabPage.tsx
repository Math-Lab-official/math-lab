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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Clean 3-Column Iconography Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-2.5">
            <Compass className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <h2 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
              National Investigations
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Monthly 5-level inquiries from pattern discovery to formal proofs.
            </p>
            <button
              onClick={() => onNavigate('investigations')}
              className="text-xs font-semibold text-[#0077c8] dark:text-sky-400 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-2.5">
            <Cpu className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <h2 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
              Digital Math Lab
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Six browser-based visual sandboxes for calculus, geometry, and number theory.
            </p>
            <button
              onClick={() => onNavigate('laboratories')}
              className="text-xs font-semibold text-[#0077c8] dark:text-sky-400 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Launch Studios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-2.5">
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
              Local Labs
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Student-organized math circles in schools and public libraries.
            </p>
            <button
              onClick={() => onNavigate('local-labs')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Start a Chapter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Contact Bar */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Questions or chapter inquiries? Reach our student team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${OFFICIAL_EMAIL}`}
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-2 transition"
            >
              <Mail className="w-3.5 h-3.5 text-[#0077c8] dark:text-sky-400" />
              <span>{OFFICIAL_EMAIL}</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-xs transition"
            >
              Instagram ({INSTAGRAM_HANDLE})
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
