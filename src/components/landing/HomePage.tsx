import React, { useState } from 'react';
import { LabTab } from '../../types';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Building2, 
  Send, 
  Calendar, 
  BookOpen, 
  Eye, 
  Target, 
  Cpu, 
  ShieldCheck, 
  Compass, 
  Users, 
  ExternalLink,
  Clock,
  ChevronRight,
  Shield,
  Activity,
  Binary,
  Grid,
  Download,
  Mail,
  Award,
  Play
} from 'lucide-react';
import { NATIONAL_INVESTIGATIONS, FIVE_LEVELS_OVERVIEW } from '../../data/investigationsData';
import { STAFF_APPLICATION_URL } from '../../data/teamData';

interface HomePageProps {
  onSelectTab: (tab: LabTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab }) => {
  const latestInvestigation = NATIONAL_INVESTIGATIONS[0];
  const [previewLevel, setPreviewLevel] = useState<number>(1);

  const getLevelIcon = (lvl: number) => {
    switch (lvl) {
      case 1: return <Eye className="w-4 h-4 text-amber-500" />;
      case 2: return <Target className="w-4 h-4 text-sky-500" />;
      case 3: return <Cpu className="w-4 h-4 text-purple-500" />;
      case 4: return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 5: return <Compass className="w-4 h-4 text-rose-500" />;
      default: return <Sparkles className="w-4 h-4 text-[#0077c8]" />;
    }
  };

  const selectedLevelData = latestInvestigation.levels.find(l => l.level === previewLevel) || latestInvestigation.levels[0];

  const labPreviews = [
    {
      id: 'graphing' as LabTab,
      num: '01',
      title: 'Function & Graphing Studio',
      subtitle: 'Continuous Analysis',
      desc: 'High-precision Cartesian plotter with instantaneous numerical derivatives f\'(x), tangent lines, and live Riemann integrals.',
      formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
      badge: 'Calculus',
      icon: Activity,
    },
    {
      id: 'geometry' as LabTab,
      num: '02',
      title: 'Unit Circle & Trigonometry',
      subtitle: 'Orthogonal Projections',
      desc: 'Interactive continuous angle unit circle with synchronized radians, exact fractions (π/6, π/4, π/3), and SSS triangle solver.',
      formula: '\\cos^2\\theta + \\sin^2\\theta = 1',
      badge: 'Geometry',
      icon: Compass,
    },
    {
      id: 'calculus' as LabTab,
      num: '03',
      title: 'Calculus & Riemann Sandbox',
      subtitle: 'Partitions & Taylor Series',
      desc: 'Compare Left, Right, Midpoint, and Trapezoidal sums alongside dynamic 11th-order Taylor polynomial series expansions.',
      formula: '\\int_a^b f(x)\\,dx \\approx \\sum_{i=1}^n f(x_i^*)\\Delta x',
      badge: 'Analysis',
      icon: Layers,
    },
    {
      id: 'linear-algebra' as LabTab,
      num: '04',
      title: 'Linear Algebra Grid Studio',
      subtitle: 'Matrix Transformations',
      desc: 'Live 2×2 linear matrix transformation sandbox deforming Cartesian basis vectors î and ĵ with real-time determinant area readout.',
      formula: '\\det(A) = ad - bc',
      badge: 'Algebra',
      icon: Grid,
    },
    {
      id: 'probability' as LabTab,
      num: '05',
      title: 'Statistics & Probability Lab',
      subtitle: 'Monte Carlo & Distributions',
      desc: 'Simulate Buffon\'s Needle for empirical π estimation, alongside binomial, Poisson, and normal Gaussian distributions.',
      formula: 'P = \\frac{2L}{\\pi t} \\implies \\pi \\approx \\frac{2L\\cdot N}{t\\cdot C}',
      badge: 'Probability',
      icon: Sparkles,
    },
    {
      id: 'discrete' as LabTab,
      num: '06',
      title: 'Number Theory & Discrete Math',
      subtitle: 'Primes & Modular Rings',
      desc: 'Sieve of Eratosthenes prime explorer, modular arithmetic clock arithmetic, and Collatz 3n+1 conjecture trajectory analyzer.',
      formula: 'a \\equiv b \\pmod{m}',
      badge: 'Discrete',
      icon: Binary,
    },
  ];

  return (
    <div className="space-y-20 pb-16 transition-colors">
      
      {/* 1. Split Hero Section: Authentic Scholarly Academic Design */}
      <section className="relative overflow-hidden bg-[#0a1120] text-white rounded-3xl border border-slate-800 shadow-2xl">
        {/* Subtle SVG Grid Background */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
            <defs>
              <pattern id="hero-math-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-math-pattern)" />
            <circle cx="950" cy="300" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="950" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
          
          {/* Left Column: Scholarly Thesis & Call to Inquiry */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>National Student Initiative</span>
              <span aria-hidden="true">·</span>
              <span>100% Free & Open Access</span>
              <span aria-hidden="true">·</span>
              <span>Five Levels of Rigor</span>
            </div>

            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Explore mathematics. Investigate questions. Learn together.
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 leading-relaxed">
              “One Investigation → Multiple Levels → Shared Discovery.”
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              Math Lab is built around a fundamental conviction: mathematics is more than an exercise in memorization — it is a living discipline to investigate, question, and discover collaboratively. Through structured nationwide monthly inquiries, interactive simulation studios, and community Local Labs, we nurture mathematical intuition and genuine student research.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onSelectTab('investigations')}
                className="px-6 py-3.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 flex items-center gap-2.5 whitespace-nowrap"
              >
                <span>Explore Inquiries</span>
                <ArrowRight className="w-4 h-4 text-sky-200" />
              </button>

              <button
                onClick={() => onSelectTab('laboratories')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase rounded-xl border border-white/20 backdrop-blur-xs transition flex items-center gap-2 whitespace-nowrap"
              >
                <Activity className="w-4 h-4 text-sky-400" />
                <span>6 Interactive Studios</span>
              </button>

              <button
                onClick={() => onSelectTab('local-labs')}
                className="px-5 py-3.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-bold text-xs tracking-wider uppercase rounded-xl border border-emerald-700/60 transition flex items-center gap-2 whitespace-nowrap"
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Start a Local Lab</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_mathematical_inquiry_1793523476009.jpg"
                alt="Mathematical research on blackboard with golden spiral and geometric proofs"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Floating Blueprint Stamp */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                    Featured October 2026 Investigation
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Level 1–5 Open</span>
                </div>
                <div className="font-serif-editorial text-sm font-bold text-white truncate">
                  The Chromatic Invariants of Integer Lattices
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  Grid colorings, monochromatic rectangles, and Ramsey theory bounds in ℤ².
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Metric Academic KPI Bar */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-6 sm:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-300">
          <div>
            <div className="font-serif-editorial text-2xl font-bold text-white">5 Levels</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Concrete exploration to open research</div>
          </div>
          <div>
            <div className="font-serif-editorial text-2xl font-bold text-sky-400">6 Studios</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Continuous analysis, geometry & discrete</div>
          </div>
          <div>
            <div className="font-serif-editorial text-2xl font-bold text-emerald-400">100% Free</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Open source student educational suite</div>
          </div>
          <div>
            <div className="font-serif-editorial text-2xl font-bold text-amber-300">Gmail Hub</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Real email dispatch & proof confirmations</div>
          </div>
        </div>
      </section>

      {/* 2. Featured National Investigation: Deep Dive with Interactive Level Preview */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-7 sm:p-10 shadow-xs transition-colors space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Current National Investigation</span>
              <span aria-hidden="true">·</span>
              <span>{latestInvestigation.month} {latestInvestigation.year}</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {latestInvestigation.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {latestInvestigation.subtitle}
            </p>
          </div>

          <button
            onClick={() => onSelectTab('investigations')}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>Full Investigation Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Blueprint Illustration & Core Question */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative group bg-slate-950">
              <img
                src="/src/assets/images/investigation_lattice_preview_1793523477483.jpg"
                alt="Integer lattice chromatic coloring schematic blueprint"
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono border border-white/20">
                ℤ² Lattice Grid
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
              <span className="font-mono uppercase font-bold text-amber-600 dark:text-amber-400 block text-[11px]">
                The Core Inquiry Question
              </span>
              <p className="font-serif italic text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                "{latestInvestigation.theCoreQuestion}"
              </p>
              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                Topics: {latestInvestigation.mathematicalFocus.join(' · ')}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Level Scaffolding */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Preview Level Scaffolding (1 to 5):
              </div>
              
              {/* Level Selector Tabs */}
              <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {latestInvestigation.levels.map((l) => (
                  <button
                    key={l.level}
                    onClick={() => setPreviewLevel(l.level)}
                    className={`py-2 px-1 text-center text-xs font-bold rounded-lg transition-all ${
                      previewLevel === l.level
                        ? 'bg-white dark:bg-slate-900 text-[#0077c8] dark:text-sky-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Level {l.level}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Level Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                    0{selectedLevelData.level}
                  </div>
                  <div>
                    <h4 className="font-display-bold text-base font-bold text-slate-900 dark:text-white">
                      {selectedLevelData.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Focus: {selectedLevelData.subtitle}
                    </span>
                  </div>
                </div>

                {getLevelIcon(selectedLevelData.level)}
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-sm">
                "{selectedLevelData.prompt}"
              </p>

              {selectedLevelData.guidingQuestions && (
                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Key Questions for this Level:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {selectedLevelData.guidingQuestions.slice(0, 2).map((q, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#0077c8] font-bold">·</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onSelectTab('investigations')}
                  className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <span>Work on Level {selectedLevelData.level} in Full Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectTab('share-work')}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5 text-amber-500" />
                  <span>Submit Proof / Findings</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Interactive Studios Showcase: 6 Laboratories */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400 font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Simulation Studios</span>
              <span aria-hidden="true">·</span>
              <span>In-Browser Visualizers</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Hands-On Mathematical Laboratories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Interactive geometry sandboxes, continuous Riemann partition visualizers, and linear algebra coordinate grids.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('laboratories')}
            className="text-xs font-semibold text-[#0077c8] dark:text-sky-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open All 6 Laboratories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Studio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {labPreviews.map((lab) => {
            const Icon = lab.icon;
            return (
              <div
                key={lab.id}
                onClick={() => onSelectTab(lab.id)}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0077c8] dark:hover:border-sky-500 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group text-xs space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                      {lab.num}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {lab.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display-bold text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
                      {lab.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lab.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                  <span className="font-mono text-[11px] text-[#0077c8] dark:text-sky-400">
                    Launch Sandbox
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0077c8] dark:group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. The Two Main Pillars of Math Lab */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0077c8] dark:text-sky-400 font-semibold">
            Institutional Architecture
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            How Math Lab Operates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A cohesive bridge between shared monthly inquiries and local student-led chapter meetings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#0077c8] dark:text-sky-400">Pillar 1</span>
                <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Monthly National Investigations
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A shared mathematical inquiry published every month. Rather than focusing on repetitive competition drills, each investigation challenges students to identify patterns, form conjectures, write formal proofs, and understand underlying invariants across 5 levels of depth.
              </p>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Calibrated across 5 depths (Level 1 observation to Level 5 open questions)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Student scholarship committee reviews submissions monthly</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('investigations')}
              className="w-full py-3 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-[#0077c8] dark:text-sky-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>Explore National Inquiries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">Pillar 2</span>
                <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Community-Rooted Local Labs
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Student- or educator-led chapters operating in public libraries, schools, and community centers. Facilitators are empowered with a comprehensive 10-chapter handbook, session agendas, and host venue outreach letters with real Gmail integration.
              </p>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>10-chapter Facilitator Handbook & starter kit included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Searchable national directory & community chapter map</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('local-labs')}
              className="w-full py-3 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>Start a Local Math Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Community & Collaborative Learning Spotlight */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Collaborative Mathematical Research</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold leading-tight">
              A Living Community of Math Scholars & Facilitators
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mathematics flourishes when diverse minds gather around a whiteboard to debate invariants, test counterexamples, and construct proofs. Math Lab connects learners of all ages without paywalls, fees, or barriers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('local-labs')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm"
              >
                Join or Start a Chapter
              </button>

              <a
                href={STAFF_APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 border border-white/20"
              >
                <span>National Staff Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
              <img
                src="/src/assets/images/collaborative_math_lab_1793523478407.jpg"
                alt="Students collaborating on mathematics whiteboard and polyhedra models"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
