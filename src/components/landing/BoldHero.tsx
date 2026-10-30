import React, { useState, useEffect } from 'react';
import { LabTab } from '../../types';
import { ArrowRight, ChevronDown, Sparkles, Activity, Layers, Compass, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

interface BoldHeroProps {
  onSelectTab: (tab: LabTab) => void;
  onScrollToExploration: () => void;
}

export const BoldHero: React.FC<BoldHeroProps> = ({
  onSelectTab,
  onScrollToExploration,
}) => {
  // Mini interactive live harmonic preview in hero card
  const [freq, setFreq] = useState(2);
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 0.05) % (Math.PI * 2));
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Generate SVG path for sin(freq * x + phase)
  const width = 360;
  const height = 180;
  const points: string[] = [];
  for (let px = 0; px <= width; px += 4) {
    const x = (px / width) * 4 * Math.PI - 2 * Math.PI;
    const y = Math.sin(freq * x + phase) * Math.cos(x * 0.5);
    const py = height / 2 - y * 55;
    points.push(`${px},${py.toFixed(1)}`);
  }
  const wavePath = `M ${points.join(' L ')}`;

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Background Bold Geometric Angled Slices */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-[55%] h-full bg-[#0077c8]/20 -skew-x-12 transform origin-top-right pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute -top-24 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Headline & Mission */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-amber-400 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EDUCATIONAL NON-PROFIT &bull; OPEN ACCESS</span>
            </div>

            {/* Main Headline - Bold, impactful, polished */}
            <h1 className="font-display-bold text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              BUILDING THE <span className="text-[#38bdf8]">VISUAL SYSTEMS</span> THAT UNLOCK DEEP <span className="text-[#f59e0b]">MATHEMATICAL INTUITION</span>.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Math Lab is an educational non-profit dedicated to making higher mathematics tactile and intuitive. Warp coordinate planes under 2D matrix transformations, explore circle invariants, simulate Riemann integration, and follow guided curriculum pathways.
            </p>

            {/* Action Buttons: Bold rounded pill styling */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onSelectTab('laboratories')}
                className="px-7 py-3.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Explore Laboratories</span>
                <ArrowRight className="w-4 h-4 text-sky-200" />
              </button>

              <button
                onClick={() => onSelectTab('education')}
                className="px-6 py-3.5 bg-purple-600/90 hover:bg-purple-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg transition flex items-center gap-2"
              >
                <span>Student Center</span>
                <span className="text-purple-200">★</span>
              </button>

              <button
                onClick={onScrollToExploration}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase rounded-full border border-white/30 backdrop-blur-xs transition flex items-center gap-2"
              >
                <span>Live Circle Invariant</span>
                <ChevronDown className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Quick feature highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>6 Specialized Simulators</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Account Barrier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Apache 2.0 Open Source</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Showcase framed in angled slices */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Bold diagonal corner accents */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#0077c8] via-[#38bdf8] to-[#f59e0b] rounded-3xl opacity-75 blur-xs group-hover:opacity-100 transition duration-300" />

              <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-2xl overflow-hidden">
                {/* Card Top Utility Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="font-mono text-[11px] text-slate-400 ml-1.5">
                      harmonic_wave_engine.ts
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] flex items-center gap-1 transition"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                      onClick={() => {
                        setFreq((f) => (f % 4) + 1);
                      }}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Next frequency harmonic"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Live Canvas / Wave Preview */}
                <div className="py-3">
                  <div className="relative h-44 w-full bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                    {/* Coordinate axes */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-700/60" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-slate-700/60" />

                    {/* SVG Curve */}
                    <svg
                      viewBox={`0 0 ${width} ${height}`}
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                      <path
                        d={wavePath}
                        fill="none"
                        stroke="url(#waveGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Live mathematical readout overlay */}
                    <div className="absolute top-2 left-2 font-mono text-[11px] bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-sky-300">
                      f(x) = sin({freq}x + {(phase).toFixed(1)}) &middot; cos(x/2)
                    </div>

                    <div className="absolute bottom-2 right-2 font-mono text-[10px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-amber-300">
                      Harmonic &omega; = {freq} rad/s
                    </div>
                  </div>
                </div>

                {/* Interactive Controls inside Hero */}
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1 font-mono text-[11px]">
                      <span>Harmonic Mode Frequency (n)</span>
                      <span className="text-white font-bold">{freq}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="1"
                      value={freq}
                      onChange={(e) => setFreq(Number(e.target.value))}
                      className="w-full accent-[#0077c8] cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[10px]">
                    <button
                      onClick={() => onSelectTab('graphing')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-sky-950 border border-slate-800 hover:border-sky-500/50 transition text-slate-300 hover:text-white"
                    >
                      <Activity className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1" />
                      <span>Graphing</span>
                    </button>
                    <button
                      onClick={() => onSelectTab('geometry')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-amber-950 border border-slate-800 hover:border-amber-500/50 transition text-slate-300 hover:text-white"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                      <span>Unit Circle</span>
                    </button>
                    <button
                      onClick={() => onSelectTab('calculus')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-purple-950 border border-slate-800 hover:border-purple-500/50 transition text-slate-300 hover:text-white"
                    >
                      <Compass className="w-3.5 h-3.5 text-purple-400 mx-auto mb-1" />
                      <span>Riemann</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar with bold contrast */}
      <div className="mt-14 pt-8 border-t border-slate-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="font-display-bold text-3xl font-extrabold text-[#38bdf8]">6</div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Interactive Laboratories
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-display-bold text-3xl font-extrabold text-[#f59e0b]">60 FPS</div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Hardware Canvas Engine
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-display-bold text-3xl font-extrabold text-emerald-400">100%</div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Open Source (Apache 2.0)
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-display-bold text-3xl font-extrabold text-purple-400">Non-Profit</div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Educational Mission
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
