import React from 'react';
import { LabTab } from '../../types';
import {
  ArrowRight,
  Activity,
  Compass,
  Building2,
  Layers,
  CircleDot,
  Grid,
  Binary,
  Snowflake,
  BookOpen,
  FileText
} from 'lucide-react';
import { NATIONAL_INVESTIGATIONS } from '../../data/investigationsData';
import heroMathImg from '../../assets/images/hero_math_geometry_1795108888129.jpg';
import winterSierpinskiImg from '../../assets/images/winter_sierpinski_fractal_1795108888358.jpg';

interface HomePageProps {
  onSelectTab: (tab: LabTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab }) => {
  const studios: { id: LabTab; title: string; domain: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'graphing', title: 'Function Plotter', domain: 'Calculus', icon: Activity },
    { id: 'geometry', title: 'Unit Circle', domain: 'Geometry', icon: CircleDot },
    { id: 'calculus', title: 'Riemann Sandbox', domain: 'Integration', icon: Layers },
    { id: 'linear-algebra', title: 'Matrix Grid', domain: 'Linear Algebra', icon: Grid },
    { id: 'probability', title: 'Probability Lab', domain: 'Statistics', icon: Compass },
    { id: 'discrete', title: 'Number Theory', domain: 'Discrete Math', icon: Binary },
  ];

  return (
    <div className="transition-colors">
      {/* 1. Full-Bleed Abstract Mathematical Hero */}
      <section className="relative w-full min-h-[72vh] flex items-center overflow-hidden bg-[#0a192f]">
        <img
          src={heroMathImg}
          alt="Abstract geometric polyhedra and mathematical curves"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#071426]/92 via-[#0e274d]/65 to-[#102c57]/40" />

        <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14">
          <div className="max-w-2xl space-y-6">
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.06] tracking-tight text-balance">
              Transforming mathematics through the power of curiosity.
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onSelectTab('investigations')}
                className="px-6 py-3 bg-white hover:bg-slate-100 text-[#0a192f] text-xs sm:text-sm font-semibold rounded-full transition shadow-sm"
              >
                Explore Investigations
              </button>

              <button
                onClick={() => onSelectTab('laboratories')}
                className="px-6 py-3 bg-transparent hover:bg-white/15 text-white border border-white/80 text-xs sm:text-sm font-semibold rounded-full transition"
              >
                Open Digital Lab
              </button>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-5 right-8 z-10 max-w-xs text-right">
          <p className="text-[11px] text-white/65 leading-relaxed">
            National student-led mathematics initiative. Free investigations, interactive studios, and local chapters.
          </p>
        </div>
      </section>

      {/* Content Sections Below Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-9 space-y-9">
        {/* 2. December 2026 Winter Thematic Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#0c1f36] text-white shadow-sm">
          <img
            src={winterSierpinskiImg}
            alt="Crystalline winter Sierpiński fractal"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/95 via-[#0f2542]/80 to-[#0a192f]/40" />

          <div className="relative p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-300 font-semibold">
                <Snowflake className="w-3.5 h-3.5" />
                <span>National Investigation</span>
                <span aria-hidden="true">·</span>
                <span>December 2026</span>
              </div>
              <h2 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white tracking-tight">
                December Investigation — Coming Soon!
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed">
                Pascal&apos;s Triangle, Hidden Patterns &amp; Binomial Invariants — Lucas&apos; theorem and the Sierpiński fractal.
              </p>
            </div>

            <button
              onClick={() => onSelectTab('investigations')}
              className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-full transition flex items-center gap-2 shrink-0 self-start sm:self-center shadow-sm"
            >
              <span>Preview &amp; Archive ({NATIONAL_INVESTIGATIONS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* 3. Digital Math Lab — Clean 6-Studio Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Digital Math Lab
            </h2>
            <button
              onClick={() => onSelectTab('laboratories')}
              className="text-xs font-semibold text-[#0077c8] dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>All Studios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {studios.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectTab(s.id)}
                  className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/50 dark:hover:border-sky-500/50 rounded-2xl p-3.5 text-left transition flex flex-col justify-between gap-3"
                >
                  <Icon className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
                      {s.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {s.domain}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Quick Tools & Community */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          <button
            onClick={() => onSelectTab('notebook')}
            className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-4 text-left transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#0077c8] dark:text-sky-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Lab Notebook</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Derivations &amp; PDF export</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0077c8] group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onSelectTab('formulas')}
            className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-4 text-left transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-[#0077c8] dark:text-sky-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Formula Handbook</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Search theorems &amp; LaTeX</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0077c8] group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onSelectTab('local-labs')}
            className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-4 text-left transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[#0077c8] dark:text-sky-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Local Labs</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Start a student chapter</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0077c8] group-hover:translate-x-0.5 transition-all" />
          </button>
        </section>
      </div>
    </div>
  );
};
