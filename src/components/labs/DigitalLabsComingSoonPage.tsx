import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Grid, 
  Compass, 
  Binary, 
  Calendar,
  Building2,
  Send
} from 'lucide-react';
import { LabTab } from '../../types';
import { STAFF_APPLICATION_URL, OFFICIAL_EMAIL } from '../../data/teamData';

interface Props {
  onNavigate: (tab: LabTab) => void;
}

export const DigitalLabsComingSoonPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Under Active Development</span>
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            DIGITAL INQUIRY LABS
          </h1>

          <p className="font-serif italic text-amber-200 text-sm sm:text-base">
            Coming Soon! Interactive browser-based simulation tools.
          </p>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Math Lab's Technology & Digital Development committee is currently conceptualizing and building interactive visualizers, coordinate grid sandboxes, and proof exploratory tools to accompany future National Investigations. For now, all Math Lab investigations can be explored using graph paper, physical manipulatives, or any computational tool you prefer.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('investigations')}
              className="px-6 py-3 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow-md flex items-center gap-2"
            >
              <span>Explore Current National Investigations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('local-labs')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition border border-white/20"
            >
              Find or Start a Local Lab
            </button>
          </div>
        </div>
      </div>

      {/* Main Notice Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0077c8]">
            Transparency & Supported Features
          </span>
          <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why are labs listed as "Coming Soon"?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At Math Lab, we believe in only presenting features that are authentic and fully supported. Rather than displaying simulated mock labs, our student technology committee is taking the time to design open-source, mathematically rigorous web tools that align directly with our monthly National Investigations.
          </p>
        </div>

        {/* Committee Roadmap Preview */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Inquiry Tools in Development by Our Technology Committee:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0077c8] flex items-center justify-center">
                <Grid className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Integer Lattice Sandbox</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                An interactive coordinate plane allowing students to color lattice points, test chromatic boundaries, and visualize monochromatic rectangle constraints for National Investigations.
              </p>
              <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Planned Phase 1
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Geometric Invariant Canvas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A dynamic geometry workspace where learners can drag vertices, inspect invariant ratios, and test conjectures about circle chords and pedal triangles in real time.
              </p>
              <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Planned Phase 2
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Binary className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Discrete Pattern Simulator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visualizing cellular partitions, modular arithmetic cycles, and graph colorings to assist student teams working through Levels 3, 4, and 5 of monthly problems.
              </p>
              <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Planned Phase 3
              </span>
            </div>
          </div>
        </div>

        {/* Join the Tech Committee CTA */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Technology & Digital Development Committee</span>
            </div>
            <h3 className="font-display-bold text-xl font-bold text-white">
              Are You a Student Developer Interested in Building These Tools?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We welcome middle school, high school, and undergraduate programmers passionate about TypeScript, React, canvas graphics, and mathematical visualization to apply for our technology committee.
            </p>
          </div>

          <a
            href={STAFF_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2"
          >
            <span>Apply for Tech Committee</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
