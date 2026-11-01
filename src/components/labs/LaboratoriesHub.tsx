import React, { useState, useEffect } from 'react';
import { LabTab } from '../../types';
import { 
  Activity, 
  CircleDot, 
  Layers, 
  Grid, 
  Compass, 
  Binary, 
  ArrowRight, 
  CheckCircle2, 
  CheckCircle,
  Clock,
  RotateCcw,
  Play,
  Award,
  Sparkles
} from 'lucide-react';
import { getStudentProgress, setLabProgressStatus } from '../../utils/studentProgress';

interface LaboratoriesHubProps {
  onSelectLab: (tab: LabTab) => void;
  onOpenProgress?: () => void;
}

export const LaboratoriesHub: React.FC<LaboratoriesHubProps> = ({
  onSelectLab,
  onOpenProgress,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');
  const [progressState, setProgressState] = useState(getStudentProgress());

  useEffect(() => {
    const handleUpdate = () => {
      setProgressState(getStudentProgress());
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, []);

  const handleToggleComplete = (labId: string) => {
    const current = progressState.labs[labId]?.status === 'completed';
    const next = setLabProgressStatus(labId, current ? 'in_progress' : 'completed');
    setProgressState(next);
  };

  const categories = [
    { id: 'all', label: 'All Laboratories (6)' },
    { id: 'analysis', label: 'Calculus & Functions' },
    { id: 'geometry', label: 'Geometry & Linear Algebra' },
    { id: 'discrete', label: 'Discrete & Probability' },
  ];

  const labs = [
    {
      id: 'graphing' as LabTab,
      num: '01',
      title: 'Function & Graphing Studio',
      domain: 'Continuous Analysis',
      category: 'analysis',
      icon: Activity,
      desc: 'High-precision 2D Cartesian plotter with instantaneous numerical derivatives f\'(x), tangent line visualizer, and live numerical Riemann integration.',
      features: ['Dynamic polynomial & trigonometric equations', 'Instantaneous tangent line & slope readout', 'Live shaded numerical definite integral'],
      preset: 'Explore f(x) = x³ - 3x',
    },
    {
      id: 'geometry' as LabTab,
      num: '02',
      title: 'Geometry & Unit Circle Studio',
      domain: 'Trigonometry & Invariants',
      category: 'geometry',
      icon: CircleDot,
      desc: 'Interactive continuous angle unit circle with live projections of sin θ, cos θ, tan θ, exact fraction angle snaps (π/6, π/4, π/3), and SSS triangle solver.',
      features: ['Live continuous angle slider with rad/deg sync', 'Visual color-coded orthogonal projections', 'SSS Triangle law of cosines solver'],
      preset: 'Examine θ = 5π/6 radians',
    },
    {
      id: 'calculus' as LabTab,
      num: '03',
      title: 'Calculus & Riemann Sandbox',
      domain: 'Integration & Series',
      category: 'analysis',
      icon: Layers,
      desc: 'Partition convergence visualizer supporting Left-endpoint, Right-endpoint, Midpoint, and Trapezoidal approximation rules, alongside live Taylor series expansions.',
      features: ['Adjust partition count N from 2 to 100', 'Exact definite integral vs approximation delta', 'Taylor polynomial series up to degree 11'],
      preset: 'Simulate eˣ Taylor approximation',
    },
    {
      id: 'linear-algebra' as LabTab,
      num: '04',
      title: 'Linear Algebra Grid Studio',
      domain: 'Matrix Transformations',
      category: 'geometry',
      icon: Grid,
      desc: 'Real-time coordinate space deformation under arbitrary 2x2 matrices. Witness basis vector rotation, determinant signed area scaling, and eigenvalue axes.',
      features: ['Interactive basis vectors i-hat and j-hat', 'Signed parallelogram area for det(A)', 'Presets for Shear, Reflection, and Rotation'],
      preset: 'Test 45° rotation with shear',
    },
    {
      id: 'probability' as LabTab,
      num: '05',
      title: 'Statistics & Probability Lab',
      domain: 'Distributions & Monte Carlo',
      category: 'discrete',
      icon: Compass,
      desc: 'Interactive Gaussian normal distribution with empirical rule 68-95-99.7% intervals, Binomial PMF charts, and Buffon’s needle Monte Carlo estimation of π.',
      features: ['Dynamic mean μ and standard deviation σ', 'Binomial probability mass distribution', 'Buffon needle needle-drop π simulator'],
      preset: 'Run 1,000 Monte Carlo needle drops',
    },
    {
      id: 'discrete' as LabTab,
      num: '06',
      title: 'Number Theory & Discrete Math',
      domain: 'Primes & Modular Rings',
      category: 'discrete',
      icon: Binary,
      desc: 'Interactive Sieve of Eratosthenes prime grid (1-100), step-by-step Euclidean algorithm GCD demonstrator, modular arithmetic dial clock, and Pascal’s triangle.',
      features: ['Animated composite number elimination sieve', 'Euclidean remainder step trace with quotients', 'Modular ring dial clock for Z/nZ'],
      preset: 'Compute GCD(252, 105) step-by-step',
    },
  ];

  const completedCount = labs.filter((l) => progressState.labs[l.id]?.status === 'completed').length;
  const inProgressCount = labs.filter((l) => progressState.labs[l.id]?.status === 'in_progress').length;

  const filteredLabs = labs.filter((lab) => {
    const matchesCat = activeCategory === 'all' || lab.category === activeCategory;
    if (!matchesCat) return false;

    if (statusFilter !== 'all') {
      const st = progressState.labs[lab.id]?.status || 'not_started';
      if (st !== statusFilter) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 py-2">
      {/* 1. Page Header & Featured Spotlight Banner */}
      <div className="bg-[#0a1426] text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left: Text & Academic Mission */}
          <div className="p-8 sm:p-12 lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>Academic Simulation Suite</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>6 Interactive Studios</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400 font-bold tabular-nums">{completedCount}/6 Completed</span>
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              The Mathematical Laboratory Suite
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every laboratory in Math Lab is an authentic, interactive investigation engine. Manipulate parameters, test boundary cases, visualize Riemann sums, and explore geometric invariants with live numerical feedback and high-resolution canvas export.
            </p>

            {/* Category Segmented Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#0077c8] text-white shadow-xs'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Featured Lab Spotlight (Geometry & Unit Circle Studio) */}
          <div className="lg:col-span-5 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-slate-900/60">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-lg group">
              <img
                src="/assets/images/unit_circle_trig_preview_1793523477946.jpg"
                alt="Unit circle trigonometry invariant simulation"
                className="w-full h-52 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-300">
                  <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Featured Laboratory
                  </span>
                  <span className="text-slate-400">Studio 02</span>
                </div>
                <h3 className="font-serif-editorial text-lg font-bold text-white leading-snug">
                  Unit Circle Trigonometry & Invariants
                </h3>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300 font-mono">
                    sin θ · cos θ · tan θ projections
                  </span>
                  <button
                    onClick={() => onSelectLab('geometry')}
                    className="px-3 py-1.5 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Progress Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center font-bold shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Studio Mastery: <span className="tabular-nums">{completedCount}</span> of 6 Completed
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="tabular-nums">{inProgressCount}</span> in progress · <span className="tabular-nums">{6 - completedCount - inProgressCount}</span> remaining to explore
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            Filter:
          </span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              statusFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All (6)
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
              statusFilter === 'completed'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Completed ({completedCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
              statusFilter === 'in_progress'
                ? 'bg-sky-600 text-white'
                : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>In Progress ({inProgressCount})</span>
          </button>
          {onOpenProgress && (
            <button
              onClick={onOpenProgress}
              className="ml-auto md:ml-2 px-3 py-1 rounded-lg font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              Full Research Portfolio ↗
            </button>
          )}
        </div>
      </div>

      {/* 3. Laboratories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => {
          const Icon = lab.icon;
          const labInfo = progressState.labs[lab.id] || { status: 'not_started', interactionCount: 0 };
          const isCompleted = labInfo.status === 'completed';

          return (
            <div
              key={lab.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                isCompleted ? 'ring-1 ring-emerald-500/50' : ''
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-slate-400">
                    Studio {lab.num}
                  </span>
                  <span className="font-semibold text-[#0077c8] dark:text-sky-400">
                    {lab.domain}
                  </span>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
                    isCompleted 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                      : 'bg-slate-100 dark:bg-slate-800 text-[#0077c8] dark:text-sky-400 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/60'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
                      {lab.title}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {labInfo.interactionCount > 0 ? `Explored ${labInfo.interactionCount} times` : 'Not started yet'}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lab.desc}
                </p>

                {/* Features checklist */}
                <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800">
                  {lab.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Launch & Mark Completed */}
              <div className="p-6 pt-0 bg-slate-50/50 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
                <div className="pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Status</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(lab.id);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Completed</span>
                        <RotateCcw className="w-3 h-3 opacity-60 ml-0.5" />
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mark as Completed</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => onSelectLab(lab.id)}
                  className={`w-full py-2.5 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                    isCompleted
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-[#0077c8] hover:bg-[#005fa3]'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCompleted ? 'Revisit Simulation' : 'Launch Laboratory'}</span>
                  <ArrowRight className="w-4 h-4 text-sky-200" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
