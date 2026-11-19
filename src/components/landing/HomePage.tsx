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
    <div className="space-y-12 transition-colors">
      {/* 1. Minimalist Split Hero with Editorial Geometry Visual */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs font-mono tracking-wider uppercase text-[#0077c8] dark:text-sky-400 font-semibold">
            National Student Initiative
          </p>

          <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-[1.12] tracking-tight text-balance">
            Explore mathematics through open inquiry.
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
            Monthly multi-level investigations, interactive visual laboratories, and student-led local math circles.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onSelectTab('investigations')}
              className="px-5 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white text-sm font-semibold rounded-xl transition flex items-center gap-2 shadow-xs"
            >
              <span>Explore Investigations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab('laboratories')}
              className="px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-sm font-semibold rounded-xl transition"
            >
              Open Digital Lab
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm aspect-video bg-slate-900">
            <img
              src={heroMathImg}
              alt="Translucent geometric polyhedra and golden mathematical curves"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. December 2026 Winter Thematic Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#0c1f36] text-white shadow-md">
        <img
          src={winterSierpinskiImg}
          alt="Crystalline winter Sierpiński fractal"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/95 via-[#0f2542]/80 to-[#0a192f]/40" />

        <div className="relative p-6 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold">
              <Snowflake className="w-3.5 h-3.5" />
              <span>National Investigation</span>
              <span aria-hidden="true">·</span>
              <span>December 2026</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
              December Investigation — Coming Soon!
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Pascal&apos;s Triangle, Hidden Patterns &amp; Binomial Invariants — from odd/even colorings to Lucas&apos; theorem and the Sierpiński fractal.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('investigations')}
            className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2 shrink-0 self-start sm:self-center shadow-sm"
          >
            <span>Preview &amp; Archive ({NATIONAL_INVESTIGATIONS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Digital Math Lab — Clean 6-Studio Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
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
                className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/50 dark:hover:border-sky-500/50 rounded-2xl p-4 text-left transition flex flex-col justify-between gap-4"
              >
                <Icon className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
                    {s.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {s.domain}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Quick Tools & Community */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={() => onSelectTab('notebook')}
          className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-5 text-left transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#0077c8] dark:text-sky-400 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Lab Notebook</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Derivations &amp; PDF export</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077c8] group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onSelectTab('formulas')}
          className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-5 text-left transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#0077c8] dark:text-sky-400 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Formula Handbook</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Search theorems &amp; LaTeX</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077c8] group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onSelectTab('local-labs')}
          className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-5 text-left transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-[#0077c8] dark:text-sky-400 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Local Labs</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Start a student chapter</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077c8] group-hover:translate-x-0.5 transition-all" />
        </button>
      </section>
    </div>
  );
};
