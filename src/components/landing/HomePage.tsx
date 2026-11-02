import React, { useState } from 'react';
import { LabTab } from '../../types';
import { 
  ArrowRight, 
  Activity, 
  Compass, 
  Building2, 
  Calendar,
  Sparkles,
  Layers,
  CircleDot,
  Grid,
  Binary
} from 'lucide-react';
import { NATIONAL_INVESTIGATIONS } from '../../data/investigationsData';

interface HomePageProps {
  onSelectTab: (tab: LabTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab }) => {
  const [previewLevel, setPreviewLevel] = useState<number>(1);
  const archivedInvestigations = NATIONAL_INVESTIGATIONS;

  const studios = [
    {
      id: 'graphing' as LabTab,
      num: '01',
      title: 'Function Plotter',
      domain: 'Calculus',
      icon: Activity,
      desc: '2D Cartesian plotter with live tangents and Riemann integration.',
    },
    {
      id: 'geometry' as LabTab,
      num: '02',
      title: 'Unit Circle',
      domain: 'Trigonometry',
      icon: CircleDot,
      desc: 'Continuous angle circle with live projections and triangle solver.',
    },
    {
      id: 'calculus' as LabTab,
      num: '03',
      title: 'Riemann Sandbox',
      domain: 'Analysis',
      icon: Layers,
      desc: 'Definite integrals, partition convergence, and Taylor series.',
    },
    {
      id: 'linear-algebra' as LabTab,
      num: '04',
      title: 'Linear Algebra',
      domain: 'Matrices',
      icon: Grid,
      desc: '2D grid transformations, basis vectors, and determinant areas.',
    },
    {
      id: 'probability' as LabTab,
      num: '05',
      title: 'Probability Lab',
      domain: 'Statistics',
      icon: Compass,
      desc: 'Gaussian curves, binomial models, and Buffon needle π simulations.',
    },
    {
      id: 'discrete' as LabTab,
      num: '06',
      title: 'Number Theory',
      domain: 'Discrete Math',
      icon: Binary,
      desc: 'Sieve of Eratosthenes, Euclidean GCD, and modular dials.',
    },
  ];

  return (
    <div className="space-y-8 py-2">
      
      {/* 1. Compact Editorial Hero Banner (Optimized for 100% viewport fit, no image cut-off) */}
      <section className="bg-[#0a1426] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Math Lab</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Free & Open Access</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Collaborative Inquiry</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Explore mathematics. Investigate questions. Learn together.
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-amber-200/90 font-medium">
            “One Investigation → Multiple Levels → Shared Discovery.”
          </p>

          {/* Requested Updated Text */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Math Lab is a place for students to explore mathematics beyond the classroom. Through monthly investigations, interactive simulations, and Local Labs around the world, we bring students together to ask questions, try new ideas, and work through problems in their own ways. Our goal is to make math something students can explore, not just something they learn!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('investigations')}
              className="px-5 py-3 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>Explore Inquiries</span>
              <ArrowRight className="w-4 h-4 text-sky-200" />
            </button>

            <button
              onClick={() => onSelectTab('laboratories')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Digital Math Lab</span>
            </button>

            <button
              onClick={() => onSelectTab('local-labs')}
              className="px-5 py-3 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-bold text-xs tracking-wider uppercase rounded-xl border border-emerald-700/60 transition flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Local Labs</span>
            </button>
          </div>
        </div>

        {/* 4-Metric Academic Quick Bar */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
          <div>
            <div className="font-serif-editorial text-xl font-bold text-white">5 Levels</div>
            <div className="text-[11px] text-slate-400">Concrete exploration to open proof</div>
          </div>
          <div>
            <div className="font-serif-editorial text-xl font-bold text-sky-400">6 Studios</div>
            <div className="text-[11px] text-slate-400">Calculus, geometry & discrete math</div>
          </div>
          <div>
            <div className="font-serif-editorial text-xl font-bold text-emerald-400">100% Free</div>
            <div className="text-[11px] text-slate-400">Accessible for all students</div>
          </div>
          <div>
            <div className="font-serif-editorial text-xl font-bold text-amber-300">Local Labs</div>
            <div className="text-[11px] text-slate-400">Community student chapters</div>
          </div>
        </div>
      </section>

      {/* 2. National Investigation Section — "Coming Soon" for December */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>National Investigation</span>
              <span aria-hidden="true">·</span>
              <span>December 2026</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              December Investigation — Coming Soon!
            </h2>
          </div>

          <button
            onClick={() => onSelectTab('investigations')}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <span>View Monthly Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Coming Soon Callout Card (No heavy image) */}
        <div className="bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Next Inquiry in Preparation</span>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
            We don’t have an active investigation for November, but our December investigation is coming soon! In the meantime, you can explore and solve all past inquiries in our monthly archive.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('investigations')}
              className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
            >
              <span>Explore Archived Inquiries ({archivedInvestigations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. The Digital Math Lab: 6 Studios (Concise & Clean) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              The Digital Math Lab
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive simulations to test ideas, spot patterns, and explore math in real time.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('laboratories')}
            className="text-xs font-bold text-[#0077c8] dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Open All 6</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studios.map((studio) => {
            const Icon = studio.icon;
            return (
              <div
                key={studio.id}
                onClick={() => onSelectTab(studio.id)}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-[#0077c8] dark:hover:border-sky-500 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Studio {studio.num}</span>
                    <span className="text-[#0077c8] dark:text-sky-400 font-semibold">{studio.domain}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/60 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
                      {studio.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {studio.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-[#0077c8] dark:text-sky-400 font-semibold mt-3">
                  <span>Launch Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Two Pillars Quick Overview (Concise, Low Text Density) */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="font-serif-editorial text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How Math Lab Works
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Two simple pillars connecting students everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-[#0077c8] dark:text-sky-400 uppercase">
              Pillar 1
            </span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Monthly National Investigations
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Shared monthly problems explored at 5 progressive levels of depth — from hands-on observation to generalized proofs.
            </p>
            <button
              onClick={() => onSelectTab('investigations')}
              className="text-xs font-bold text-[#0077c8] dark:text-sky-400 hover:underline pt-1 flex items-center gap-1"
            >
              <span>Explore Inquiries</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              Pillar 2
            </span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Community Local Labs
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Student-led chapters meeting in schools and libraries to tackle problems and explore math together.
            </p>
            <button
              onClick={() => onSelectTab('local-labs')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1 flex items-center gap-1"
            >
              <span>Local Labs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
