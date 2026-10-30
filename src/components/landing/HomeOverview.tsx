import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Building2, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  Target, 
  Cpu, 
  ShieldCheck, 
  Compass, 
  Calendar, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  Code2,
  Users,
  Activity
} from 'lucide-react';
import { NATIONAL_INVESTIGATIONS, FIVE_LEVELS_OVERVIEW } from '../../data/investigationsData';
import { LabTab } from '../../types';

interface Props {
  onNavigate: (tab: LabTab, detailId?: string) => void;
}

export const HomeOverview: React.FC<Props> = ({ onNavigate }) => {
  const latestInvestigation = NATIONAL_INVESTIGATIONS[0];
  const [selectedDepthPreview, setSelectedDepthPreview] = useState<number>(1);

  const activeLevel = FIVE_LEVELS_OVERVIEW.find((l) => l.level === selectedDepthPreview) || FIVE_LEVELS_OVERVIEW[0];

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section: Direct Mission & Primary Action CTAs */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-16 lg:pt-16 lg:pb-24 rounded-3xl border border-slate-800 shadow-2xl">
        <div 
          aria-hidden="true" 
          className="absolute top-0 right-0 w-[55%] h-full bg-[#0077c8]/15 -skew-x-12 transform origin-top-right pointer-events-none"
        />
        <div 
          aria-hidden="true" 
          className="absolute -top-24 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute -bottom-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission & Tagline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-amber-400 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>EDUCATIONAL NON-PROFIT INITIATIVE &bull; OPEN ACCESS</span>
              </div>

              <h1 className="font-display-bold text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                EXPLORE MATHEMATICS. <span className="text-[#38bdf8]">INVESTIGATE QUESTIONS.</span> <span className="text-[#f59e0b]">LEARN TOGETHER.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                Math Lab is a student-centered initiative built around a simple idea: mathematics is more than a subject to study—it is something to investigate, question, and discover together through collaborative inquiries and locally organized learning communities.
              </p>

              {/* Three Primary Action Links (As required: Explore, Submit, Start Local Lab) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('investigations')}
                  className="px-6 py-3.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Explore Investigations</span>
                  <ArrowRight className="w-4 h-4 text-sky-200" />
                </button>

                <button
                  onClick={() => onNavigate('share-work')}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Submit Work</span>
                  <Send className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('local-labs')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs tracking-wider uppercase rounded-full border border-white/25 transition-all duration-150 flex items-center gap-2"
                >
                  <span>Start a Local Lab</span>
                  <Building2 className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Core Feature Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>5 Levels of Mathematical Depth</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>Monthly National Inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>School & Library Chapters</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Quick Look Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-7 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    Latest Investigation Focus
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {latestInvestigation.month} {latestInvestigation.year}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display-bold text-xl sm:text-2xl font-bold text-white leading-tight">
                    {latestInvestigation.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {latestInvestigation.overview}
                  </p>
                </div>

                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>The Question:</span>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-slate-200 leading-snug">
                    "{latestInvestigation.theCoreQuestion}"
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate('investigations', latestInvestigation.id)}
                    className="flex-1 py-3 px-4 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center shadow-xs"
                  >
                    Open Investigation →
                  </button>
                  <button
                    onClick={() => onNavigate('share-work')}
                    className="py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition text-center"
                  >
                    Submit Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Section: Introducing the Five Levels of Mathematical Depth */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0077c8]">
            <Layers className="w-4 h-4" />
            <span>Pedagogical Architecture</span>
          </div>
          <h2 className="font-display-bold text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Five Levels of Mathematical Depth
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every National Investigation is scaffolded across five distinct tiers. This allows students of all mathematical backgrounds—from middle schoolers trying hands-on experiments to olympiad competitors formulating topological generalizations—to enter at their comfort level and stretch toward rigorous inquiry.
          </p>
        </div>

        {/* 5-Level Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {FIVE_LEVELS_OVERVIEW.map((lvl) => {
            const isSelected = selectedDepthPreview === lvl.level;
            return (
              <button
                key={lvl.level}
                onClick={() => setSelectedDepthPreview(lvl.level)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all space-y-3 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-900 border border-slate-200'
                    }`}>
                      L{lvl.level}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-200/70 text-slate-600'
                    }`}>
                      Depth {lvl.level}
                    </span>
                  </div>

                  <h4 className="font-display-bold text-sm sm:text-base font-bold leading-snug">
                    {lvl.title}
                  </h4>
                  <p className={`text-[11px] leading-snug ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {lvl.subtitle}
                  </p>
                </div>

                <div className={`text-[10px] font-semibold uppercase tracking-wider pt-2 border-t ${
                  isSelected ? 'border-slate-700 text-sky-300' : 'border-slate-200 text-[#0077c8]'
                }`}>
                  {isSelected ? 'Viewing Detail ↓' : 'Click to preview'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight Box for Selected Level */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-900 text-white rounded-lg">
                Level {activeLevel.level} Spotlight
              </span>
              <h3 className="font-display-bold text-lg font-bold text-slate-900">
                {activeLevel.title}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {activeLevel.tag}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activeLevel.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              See how Level {activeLevel.level} is applied in our active investigation:
            </span>
            <button
              onClick={() => onNavigate('investigations')}
              className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <span>View in October Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Featured Investigation Showcase */}
      <section className="bg-gradient-to-br from-slate-900 via-[#0a192f] to-[#182029] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Featured Monthly Program
            </div>
            <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-white">
              {latestInvestigation.month} {latestInvestigation.year} National Investigation
            </h2>
          </div>
          <button
            onClick={() => onNavigate('investigations')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View All Investigations Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-display-bold text-xl sm:text-2xl font-bold text-white">
              {latestInvestigation.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-serif italic">
              "{latestInvestigation.subtitle}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {latestInvestigation.overview}
            </p>

            <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                The Core Inquiry Question:
              </span>
              <p className="font-serif text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
                {latestInvestigation.theCoreQuestion}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-800/60 rounded-2xl border border-slate-700/80 p-6 space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Investigation Snapshot
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Category:</span>
                <span className="font-bold text-sky-400">{latestInvestigation.category}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Depth Progression:</span>
                <span className="font-bold text-emerald-400">Levels 1 through 5</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="text-slate-400">Suggested Review Date:</span>
                <span className="font-bold text-amber-400">{latestInvestigation.submissionDeadline}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => onNavigate('investigations', latestInvestigation.id)}
                className="w-full py-3 px-4 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Read Full Investigation & Levels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('share-work')}
                className="w-full py-2.5 px-4 bg-transparent hover:bg-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <span>Submit Student Findings</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Mathematical Laboratories Feature Callout (Honoring Fola's App & Visual Suite) */}
      <section className="bg-gradient-to-r from-sky-50 via-indigo-50/50 to-purple-50 rounded-3xl border border-sky-200/80 p-8 sm:p-12 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077c8]/10 text-[#0077c8] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Interactive Visual Laboratories & Tools</span>
            </div>
            <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900">
              Interactive Mathematics Exploration Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Explore tactile mathematical tools built directly into Math Lab. Manipulate continuous 2D Cartesian plots, warp coordinate planes under 2x2 matrix transformations, observe unit circle trigonometric projections, simulate Riemann sum convergence, and run Monte Carlo Buffon π estimations.
            </p>
            <p className="text-xs text-slate-500 italic">
              Special Feature: Fola’s app and computational visualization modules are integrated directly into our interactive laboratory workspace.
            </p>
          </div>

          <div className="shrink-0 space-y-2">
            <button
              onClick={() => onNavigate('laboratories')}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Launch Interactive Labs</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </button>
            <span className="block text-[11px] text-slate-500 text-center">
              6 Simulation Engines Included
            </span>
          </div>
        </div>
      </section>

      {/* 5. How to Get Involved: Three Clear Pathway Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
            Participation
          </div>
          <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900">
            How You Can Participate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            You do not need to have all the answers to begin exploring mathematics. Curiosity, persistence, and a willingness to reason carefully are all you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Students */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0077c8] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">For Students</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tackle monthly investigations at any of the five depth levels. Submit your reasoning, novel lemmas, or conjectures to our peer review committee and get featured.
              </p>
            </div>
            <button
              onClick={() => onNavigate('investigations')}
              className="w-full py-2.5 px-4 bg-sky-50 hover:bg-sky-100 text-[#0077c8] font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Explore Inquiries</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Educators & Local Organizers */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">For Community Organizers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bring mathematical inquiry into your school, public library, or youth community space. Access our free facilitator guidebooks, session timelines, and student kits.
              </p>
            </div>
            <button
              onClick={() => onNavigate('local-labs')}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Start a Local Lab</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Staff & Collaborators */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">For Contributors & Staff</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join one of our five national student committees: Mathematical Investigations, Solutions Review, Outreach, Research & Impact, or Technology.
              </p>
            </div>
            <button
              onClick={() => onNavigate('team')}
              className="w-full py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Meet the Team & Apply</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
