import React from 'react';
import { ShieldCheck, Compass, Cpu, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Official Header */}
      <div className="bg-white border border-[#ded5c5] rounded-2xl p-8 sm:p-12 shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full mx-auto overflow-hidden shadow-xs border border-[#ded5c5] mb-2">
          <img
            src="/assets/aistudio/unnamed_7f1902d3.jpg"
            alt="Math Lab Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#182029]">
              About Math Lab
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">
              Educational Non-Profit
            </span>
          </div>
          <p className="font-serif-editorial italic text-base text-[#2d5868]">
            The Official Non-Profit Visual Platform for Mathematical Research & Learning
          </p>
        </div>
        <p className="text-sm text-[#475467] max-w-2xl mx-auto leading-relaxed">
          Math Lab is an educational non-profit organization dedicated to transforming abstract mathematical theory into intuitive, interactive visual simulations. 
          By combining numerical computation with tactile graphical laboratories, students, educators, and competition researchers can test hypotheses, visualize transformations, and develop deeper geometric intuition—100% free with zero paywalls.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#faf7f2] text-[#2d5868] border border-[#ded5c5] flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-lg font-bold text-[#182029]">
            Visual Intuition
          </h3>
          <p className="text-xs text-[#475467] leading-relaxed">
            Directly touch the unit circle, observe coordinate basis grids warp under matrix transformations, and witness Riemann slices converge into exact calculus integrals.
          </p>
        </div>

        <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#faf7f2] text-[#166534] border border-[#ded5c5] flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-lg font-bold text-[#182029]">
            Interactive Computation
          </h3>
          <p className="text-xs text-[#475467] leading-relaxed">
            High precision numerical differentiation, Simpson's rule numerical integration, Monte Carlo simulation engines, and exact Euclidean arithmetic.
          </p>
        </div>

        <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#faf7f2] text-[#b86822] border border-[#ded5c5] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif-editorial text-lg font-bold text-[#182029]">
            Curated Reference
          </h3>
          <p className="text-xs text-[#475467] leading-relaxed">
            Searchable formula handbook with variable definitions, daily problem challenges with step-by-step solutions, and persistent notebook logging.
          </p>
        </div>
      </div>

      {/* Open Source & Licensing */}
      <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#166534]" />
          <h3 className="font-serif-editorial text-lg font-bold text-[#182029]">
            Open Source & Licensing
          </h3>
        </div>
        <p className="text-xs text-[#475467] leading-relaxed">
          Math Lab is published under the terms of the <strong className="text-[#182029]">Apache License 2.0</strong>, allowing free educational and research use, modification, and distribution.
        </p>
        <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#ded5c5] text-xs font-mono text-[#667085] space-y-1">
          <div>Repository: <span className="text-[#182029] font-bold">mathlabofficial/math-lab</span></div>
          <div>License: <span className="text-[#166534] font-bold">Apache-2.0</span></div>
          <div>Runtime: <span className="text-[#2d5868] font-bold">Web (Node.js 22 & Vite SPA)</span></div>
        </div>
      </div>
    </div>
  );
};
