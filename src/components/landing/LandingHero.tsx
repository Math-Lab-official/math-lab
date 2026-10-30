import React from 'react';
import { LabTab } from '../../types';
import { ArrowDown, Sparkles } from 'lucide-react';

interface LandingHeroProps {
  onScrollToExploration: () => void;
  onSelectTab: (tab: LabTab) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onScrollToExploration, onSelectTab }) => {
  return (
    <div className="bg-[#faf7f2] text-[#1c2430] pt-14 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Big Editorial Display Typography */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-xs sm:text-sm text-[#667085] font-normal tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#b86822]" />
            Official Visual Laboratory & Learning Platform
          </p>

          <h1 className="font-serif-editorial text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#182029] leading-[0.98]">
            Where math<br />
            becomes{' '}
            <span className="relative inline-block italic text-[#2d5868] font-normal">
              visual.
              {/* Subtle curved underline matching reference aesthetic */}
              <svg
                className="absolute -bottom-2.5 left-0 w-full h-4 overflow-visible"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M 2 8 C 30 11, 70 12, 98 4"
                  fill="none"
                  stroke="#b86822"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Right Column: Math Lab Mission & Prompt */}
        <div className="lg:col-span-5 space-y-6 pt-4 lg:pt-8 lg:pl-6">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#182029] leading-snug">
            Intuition before computation.
          </h2>

          <p className="text-sm sm:text-base text-[#475467] leading-relaxed">
            Math Lab transforms abstract mathematical concepts into living, tactile simulations. 
            Manipulate dynamic function derivatives, warp coordinate planes under 2D matrix transformations, explore circle invariants, and test hypotheses in real time.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onScrollToExploration}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#2d5868] hover:text-[#19323c] transition-colors"
            >
              <span>Explore live invariants</span>
              <span className="text-[#b86822] group-hover:translate-y-0.5 transition-transform">
                ↓
              </span>
            </button>
            <span className="text-[#d0c6b4]">•</span>
            <button
              onClick={() => onSelectTab('graphing')}
              className="text-sm font-medium text-[#667085] hover:text-[#182029] transition-colors"
            >
              Open Graphing Studio →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
