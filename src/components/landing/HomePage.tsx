import React from 'react';
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
  Grid
} from 'lucide-react';
import { NATIONAL_INVESTIGATIONS, FIVE_LEVELS_OVERVIEW } from '../../data/investigationsData';
import { STAFF_APPLICATION_URL } from '../../data/teamData';

interface HomePageProps {
  onSelectTab: (tab: LabTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab }) => {
  const latestInvestigation = NATIONAL_INVESTIGATIONS[0];

  const getLevelIcon = (lvl: number) => {
    switch (lvl) {
      case 1: return <Eye className="w-5 h-5 text-amber-500" />;
      case 2: return <Target className="w-5 h-5 text-sky-500" />;
      case 3: return <Cpu className="w-5 h-5 text-purple-500" />;
      case 4: return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 5: return <Compass className="w-5 h-5 text-rose-500" />;
      default: return <Sparkles className="w-5 h-5 text-[#0077c8]" />;
    }
  };

  return (
    <div className="space-y-16 pb-12 transition-colors">
      {/* 1. Hero Section: Clear Introduction to Math Lab & Mission */}
      {/* 1. Hero Section: Authentic Scholarly Mathematical Design */}
      <section className="relative overflow-hidden bg-[#0d1527] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 rounded-3xl border border-slate-800 shadow-xl">
        {/* Subtle SVG Mathematical Blueprint / Polar Coordinates */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none opacity-[0.07] overflow-hidden"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600">
            <defs>
              <pattern id="math-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#math-grid-pattern)" />
            {/* Concentric polar coordinate rings */}
            <circle cx="500" cy="300" r="100" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="500" cy="300" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="500" cy="300" r="260" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="500" y1="0" x2="500" y2="600" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="300" x2="1000" y2="300" stroke="currentColor" strokeWidth="2" />
            {/* Spiral curve preview */}
            <path d="M 500 300 Q 560 300 560 360 T 420 360 T 420 220 T 600 220" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-6">
          {/* Quiet Unboxed Kicker */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
            <span>National Student Initiative</span>
            <span aria-hidden="true">·</span>
            <span>Open Access Inquiry</span>
            <span aria-hidden="true">·</span>
            <span>Five Levels of Rigor</span>
          </div>

          <h1 className="font-serif-editorial text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Explore mathematics. Investigate questions. Learn together.
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 max-w-2xl mx-auto">
            "One Investigation → Multiple Levels → Shared Discovery."
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Math Lab is built around a fundamental conviction: mathematics is more than an exercise in memorization — it is a living discipline to investigate, question, and discover collaboratively. Through structured nationwide monthly inquiries, interactive simulation studios, and community Local Labs, we nurture mathematical intuition and genuine student research.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onSelectTab('investigations')}
              className="px-6 py-3 bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore National Investigations</span>
              <ArrowRight className="w-4 h-4 text-sky-200" />
            </button>

            <button
              onClick={() => onSelectTab('laboratories')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs tracking-wider uppercase rounded-xl border border-slate-700 shadow-md transition-all flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Interactive Studios</span>
            </button>

            <button
              onClick={() => onSelectTab('local-labs')}
              className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-100 font-semibold text-xs tracking-wider uppercase rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Start a Local Lab</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Studios Callout */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400 font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Simulation Studios Live</span>
              <span aria-hidden="true">·</span>
              <span>Canvas Export Enabled</span>
            </div>
            <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
              6 Dedicated Hands-On Mathematical Laboratories
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Deform coordinate grids in real-time, compute dynamic Taylor series polynomials, simulate Buffon's Needle for Monte Carlo approximations of π, and download high-resolution canvas plots for papers and research notes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('laboratories')}
              className="px-5 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-sky-200" />
              <span>Launch Studio Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('investigations')}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition border border-slate-200 dark:border-slate-700 flex items-center gap-2"
            >
              <Grid className="w-4 h-4 text-amber-500" />
              <span>Integer Lattice Coloring</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. What We Do: The Two Main Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0077c8] dark:text-sky-400">
            Program Architecture
          </span>
          <h2 className="font-display-bold text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How Math Lab Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Math Lab connects nationwide inquiry with community-rooted learning through two complementary pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Pillar 1: Monthly National Investigations */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-7 sm:p-9 shadow-xs space-y-5 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0077c8] dark:text-sky-400">Pillar 1</span>
                <h3 className="font-display-bold text-2xl font-bold text-slate-900 dark:text-white">
                  Monthly National Investigations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A shared mathematical inquiry published every month. Rather than focusing on routine worksheets, each investigation encourages students to recognize patterns, test conjectures, construct proofs, and understand why things work across five levels of depth.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077c8] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Accessible starting point for elementary, middle, and high school learners</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077c8] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Submissions reviewed monthly by our student scholarship committee</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTab('investigations')}
              className="w-full py-3 px-4 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-[#0077c8] dark:text-sky-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Browse Current & Past Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Local Math Labs */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-7 sm:p-9 shadow-xs space-y-5 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Pillar 2</span>
                <h3 className="font-display-bold text-2xl font-bold text-slate-900 dark:text-white">
                  Community-Based Local Labs
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Local Labs are student- or educator-led groups operating in public libraries, schools, and community centers. Facilitators have full pedagogical freedom to explore any mathematical topic they wish, while dedicating sessions to the shared monthly investigation.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Free Facilitator Handbook, outreach letters, and session agendas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Chapters connected to a supportive nationwide network</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTab('local-labs')}
              className="w-full py-3 px-4 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Learn How to Start a Chapter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. The Five Levels of Mathematical Depth */}
      <section className="bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Pedagogical Architecture</span>
              <span aria-hidden="true">·</span>
              <span>5 Depth Levels</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              The Five Levels of Mathematical Depth
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every Math Lab inquiry is calibrated across five tiers of depth. <strong>Crucially, levels represent the depth of mathematical thinking, not fixed grade levels.</strong> This structure allows students of diverse backgrounds to investigate the exact same question simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FIVE_LEVELS_OVERVIEW.map((lvl) => (
              <div 
                key={lvl.level}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-3 shadow-2xs hover:border-[#0077c8] dark:hover:border-sky-500 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                      Level 0{lvl.level}
                    </span>
                    {getLevelIcon(lvl.level)}
                  </div>

                  <h3 className="font-display-bold text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {lvl.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lvl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Key Focus: {lvl.subtitle}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Shared Inquiry Principle:</span>
              <span>One inquiry question → progressive levels of exploration → shared collaborative discovery.</span>
            </div>
            <button
              onClick={() => onSelectTab('investigations')}
              className="text-[#0077c8] dark:text-sky-400 font-semibold hover:underline shrink-0"
            >
              See Level Scaffolding in Action →
            </button>
          </div>
        </div>
      </section>

      {/* 5. Featured Latest Investigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Featured National Investigation</span>
              <span aria-hidden="true">·</span>
              <span>{latestInvestigation.month} {latestInvestigation.year}</span>
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {latestInvestigation.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {latestInvestigation.subtitle}
            </p>
          </div>

          <button
            onClick={() => onSelectTab('investigations')}
            className="text-xs font-semibold text-[#0077c8] dark:text-sky-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Investigations Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#0d1627] rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  The Core Mathematical Question:
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-slate-100 leading-snug">
                  "{latestInvestigation.theCoreQuestion}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {latestInvestigation.overview}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {latestInvestigation.mathematicalFocus.map((f, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/10"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/20 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                Five Levels Included:
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {latestInvestigation.levels.map((lvl) => (
                  <li key={lvl.level} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-mono font-bold text-[10px] text-white">
                      {lvl.level}
                    </span>
                    <span className="truncate">{lvl.title}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => onSelectTab('investigations')}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore All 5 Levels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('share-work')}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Submit Solution or Findings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How to Participate */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Get Involved
          </span>
          <h2 className="font-display-bold text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How You Can Participate
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Math Lab welcomes participants across every role and community environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Card 1: Students */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white">
                For Students
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dive into monthly investigations, test hypotheses, explore interactive simulations, and submit your partial or complete proofs. Receive feedback from our student scholarship committee!
              </p>
            </div>
            <button
              onClick={() => onSelectTab('share-work')}
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Submit Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Educators & Community Members */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white">
                For Facilitators & Hosts
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Start a Local Lab in your school, town library, or community center. Use our free Facilitator Handbook, host outreach templates, and session agendas.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('local-labs')}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Facilitator Guide & Toolkit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Student Leaders & Committees */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white">
                Join Our Staff Team
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Apply to join one of our 5 national committees: Curriculum, Solutions Review, Outreach, Research, or Technology. Open to secondary and college students.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('team')}
              className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Meet the Team & Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Future Roadmaps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>National Events Roadmap</span>
            </div>
            <h3 className="font-display-bold text-xl font-bold text-slate-900 dark:text-white">
              Nationwide Virtual Colloquia & Synchronous Inquiries
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We only display features that are active and supported. Live virtual math colloquia, guest mathematician panels, and synchronous cross-chapter problem-solving sessions will debut in upcoming quarters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('events')}
              className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition"
            >
              National Events (Coming Soon)
            </button>
            <button
              onClick={() => onSelectTab('laboratories')}
              className="px-4 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold text-xs rounded-xl transition"
            >
              Try Interactive Studios
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
