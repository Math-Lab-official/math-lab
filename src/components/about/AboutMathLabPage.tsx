import React from 'react';
import { 
  Compass, 
  Target, 
  Users, 
  Building2, 
  Sparkles, 
  Mail, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  Award,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../data/teamData';
import { LabTab } from '../../types';

interface Props {
  onNavigate: (tab: LabTab) => void;
}

export const AboutMathLabPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-4 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Student-Centered Mathematical Exploration</span>
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ABOUT MATH LAB
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 font-medium">
            Explore mathematics. Investigate questions. Learn together.
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Math Lab is a student-centered initiative built around a simple idea: mathematics is more than a subject to study—it is something to investigate, question, and discover together. Through collaborative mathematical investigations and locally organized learning communities, Math Lab gives students opportunities to engage deeply with mathematics, sharpen reasoning, and participate in a wider community of mathematical exploration.
          </p>
        </div>
      </div>

      {/* Why Math Lab Exists */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
            Core Philosophy
          </div>
          <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Why Math Lab Exists
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Mathematics education often becomes narrowly focused on memorizing formulas, following pre-packaged procedures, and racing to arrive at a single correct answer. These skills have their place, but they represent only a fraction of what mathematics truly offers.
          </p>
          <p className="text-sm sm:text-base text-slate-800 dark:text-amber-200 leading-relaxed font-serif text-[16px] italic">
            "Mathematics is also about recognizing patterns, asking questions, testing conjectures, constructing proofs, exploring unfamiliar problems, and understanding why something works."
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Math Lab exists to help students experience this authentic side of mathematics. We want to create opportunities for students to move beyond simply receiving information and toward actively investigating mathematical ideas. We also want these opportunities to extend beyond a single classroom, school, or community, building a community in which mathematical curiosity becomes sustained, meaningful participation.
          </p>
        </div>
      </div>

      {/* The Two Pillars: National Investigations vs. Local Labs */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Program Architecture
          </div>
          <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How Math Lab Operates: The Two Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Our model bridges shared national academic inquiry with decentralized community-based student chapters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: National Investigations */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5 flex flex-col justify-between transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center font-bold text-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display-bold text-xl font-bold text-slate-900 dark:text-white">
                1. Monthly National Investigations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                National Investigations are a central part of Math Lab's developing program. Every month, we publish a shared investigation that students explore through participating Local Labs or independent study.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Structured across five levels of mathematical depth (Observation → Conjecture → Algebra → Proof → Extension).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Serves as a common starting point for students across diverse communities to explore identical ideas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Student solutions and conjectures are reviewed monthly by student scholarship committees.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('investigations')}
                className="w-full py-2.5 px-4 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-[#0077c8] dark:text-sky-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Browse Current & Past Investigations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 2: Local Labs */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5 flex flex-col justify-between transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-display-bold text-xl font-bold text-slate-900 dark:text-white">
                2. Community-Based Local Labs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Local Labs are community-based groups that help students participate in Math Lab's activities in their home neighborhoods, schools, libraries, and youth organizations.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Operates freely in schools, public libraries, community centers, and youth learning hubs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Led by student organizers, educators, or community volunteers with open access toolkits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Enables local mathematical collaboration while remaining tied to a supportive nationwide network.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('local-labs')}
                className="w-full py-2.5 px-4 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Learn How to Start a Local Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Our 7 Principles */}
      <div className="bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 transition-colors">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            Values & Operating Standards
          </div>
          <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Our Principles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            These seven foundational principles govern our curriculum design, community engagement, and research activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {[
            {
              title: 'Curiosity Before Memorization',
              desc: 'We value asking questions, exploring ideas, and understanding mathematical reasoning rather than treating mathematics as a collection of formulas to remember.'
            },
            {
              title: 'Reasoning Matters',
              desc: 'An answer is important, but so are the arguments, methods, and insights that lead to it.'
            },
            {
              title: 'Collaboration Expands Opportunity',
              desc: 'Students should have opportunities to learn with others, exchange approaches, discuss ideas, and contribute to shared investigations.'
            },
            {
              title: 'Local Communities, Shared Exploration',
              desc: 'Students should be able to participate in mathematical activities through their own schools and communities while connecting with a wider network.'
            },
            {
              title: 'Accessibility and Inclusion',
              desc: 'Mathematical exploration should welcome students with different backgrounds, experiences, and learning needs. We continuously explore ways to make understanding accessible.'
            },
            {
              title: 'Evidence Over Assumptions',
              desc: 'When Math Lab investigates educational approaches, conclusions should follow from evidence rather than from expectations about what ought to work.'
            },
            {
              title: 'Build, Evaluate, Improve',
              desc: 'Our programs and resources should develop through constant feedback, reflection, and careful evaluation from students and facilitators.'
            }
          ].map((principle, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-[#0077c8] dark:text-sky-400 font-mono">
                Principle 0{idx + 1}
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {principle.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grounded Reach & Data Reporting Note */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
          <BarChart3 className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
          <span>Integrity in Reporting & Initiative Reach</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          Math Lab is a developing, grassroots educational initiative. We strictly avoid inflated claims or speculative metrics. Initiative reach, participating chapter counts, and student figures are shared exclusively where supported by actual verified participation logs reported by our Local Lab facilitators.
        </p>
      </div>

      {/* Contact & Socials Section */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0a192f] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Get Involved & Connect
          </span>
          <h3 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-white">
            Have Questions or Want to Collaborate?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Interested in starting a Local Lab in your area, collaborating on research in mathematics education, or contributing to our monthly investigations? We'd love to hear from you.
          </p>
        </div>

        <div className="space-y-3 w-full md:w-auto shrink-0">
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>{OFFICIAL_EMAIL}</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600/40 to-pink-600/40 hover:from-purple-600/60 hover:to-pink-600/60 border border-pink-500/30 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4 fill-pink-400 shrink-0" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span>Follow on Instagram ({INSTAGRAM_HANDLE})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
