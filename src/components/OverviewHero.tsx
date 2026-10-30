import React from 'react';
import { LabTab } from '../types';
import { 
  Compass, 
  Activity, 
  Grid, 
  BookOpen, 
  Award, 
  FileText, 
  Sparkles, 
  ArrowRight,
  Calculator,
  Cpu,
  Binary,
  Layers,
  CircleDot
} from 'lucide-react';

interface OverviewHeroProps {
  onSelectTab: (tab: LabTab) => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onSelectTab }) => {
  const labs = [
    {
      id: 'graphing' as LabTab,
      num: '01',
      title: 'Function & Graphing Studio',
      desc: '2D Cartesian plotter with dynamic coefficient sliders, instantaneous derivative curves, tangent lines, and shaded Riemann integrals.',
      color: 'from-sky-500/20 to-sky-500/5',
      border: 'border-sky-500/30 group-hover:border-sky-500/60',
      tag: 'Calculus & Functions',
      icon: Activity,
      iconColor: 'text-sky-400',
    },
    {
      id: 'geometry' as LabTab,
      num: '02',
      title: 'Geometry & Unit Circle',
      desc: 'Interactive continuous angle unit circle with real-time sine, cosine, tangent projections, exact fractions, and triangle solver.',
      color: 'from-emerald-500/20 to-emerald-500/5',
      border: 'border-emerald-500/30 group-hover:border-emerald-500/60',
      tag: 'Trigonometry & Shapes',
      icon: CircleDot,
      iconColor: 'text-emerald-400',
    },
    {
      id: 'calculus' as LabTab,
      num: '03',
      title: 'Calculus & Riemann Sandbox',
      desc: 'Explore partition convergence (Left, Right, Midpoint, Trapezoidal), Taylor polynomial approximations, and limit evaluations.',
      color: 'from-indigo-500/20 to-indigo-500/5',
      border: 'border-indigo-500/30 group-hover:border-indigo-500/60',
      tag: 'Integration & Limits',
      icon: Layers,
      iconColor: 'text-indigo-400',
    },
    {
      id: 'linear-algebra' as LabTab,
      num: '04',
      title: 'Linear Algebra Grid',
      desc: 'Visual coordinate plane deformation under 2x2 matrix transformations, basis vector tracking, determinant area, and eigenvalues.',
      color: 'from-blue-500/20 to-blue-500/5',
      border: 'border-blue-500/30 group-hover:border-blue-500/60',
      tag: 'Matrices & Spaces',
      icon: Grid,
      iconColor: 'text-blue-400',
    },
    {
      id: 'probability' as LabTab,
      num: '05',
      title: 'Statistics & Probability Lab',
      desc: 'Normal Gaussian bell curves with empirical rule bands, binomial distributions, and Monte Carlo Buffon’s needle π estimation.',
      color: 'from-amber-500/20 to-amber-500/5',
      border: 'border-amber-500/30 group-hover:border-amber-500/60',
      tag: 'Randomness & LLN',
      icon: Compass,
      iconColor: 'text-amber-400',
    },
    {
      id: 'discrete' as LabTab,
      num: '06',
      title: 'Number Theory & Discrete Math',
      desc: 'Sieve of Eratosthenes prime grid, step-by-step Euclidean division algorithm, modular arithmetic clock, and Pascal triangle.',
      color: 'from-rose-500/20 to-rose-500/5',
      border: 'border-rose-500/30 group-hover:border-rose-500/60',
      tag: 'Primes & Modular Rings',
      icon: Binary,
      iconColor: 'text-rose-400',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-radial from-indigo-950/60 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Official Math Lab Portal & Exploration Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Where Mathematics Becomes{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400">
              Visual, Tactile & Intuitive.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Welcome to Math Lab. Experiment with interactive calculus simulations, warp coordinate planes in real-time linear algebra, dissect unit circle trigonometry, and explore the primes of number theory.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('graphing')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 group"
            >
              <span>Launch Graphing Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onSelectTab('challenges')}
              className="px-5 py-3 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Solve Today's Challenge</span>
            </button>
            <button
              onClick={() => onSelectTab('formulas')}
              className="px-5 py-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium text-sm rounded-xl border border-slate-800 transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Browse Formulas</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          <div>
            <div className="text-2xl font-bold font-mono text-white">6</div>
            <div className="text-xs text-slate-400 mt-0.5">Interactive Laboratories</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-sky-400">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Real-time Numerical Engines</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">LaTeX</div>
            <div className="text-xs text-slate-400 mt-0.5">Formatted Mathematical Typo</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-400">Apache 2.0</div>
            <div className="text-xs text-slate-400 mt-0.5">Open Source Platform</div>
          </div>
        </div>
      </div>

      {/* Laboratories Catalog */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Laboratories</h2>
          <p className="text-sm text-slate-400 mt-1">
            Choose a laboratory domain to begin experimenting with live models, sliders, and visual simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => {
            const Icon = lab.icon;
            return (
              <div
                key={lab.id}
                onClick={() => onSelectTab(lab.id)}
                className={`group cursor-pointer rounded-2xl bg-gradient-to-b ${lab.color} bg-slate-900 border ${lab.border} p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      LAB {lab.num}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                      {lab.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-3">
                    <Icon className={`w-5 h-5 ${lab.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {lab.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lab.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                  <span>Enter Laboratory</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
