import React, { useState } from 'react';
import { LabTab } from '../../types';
import { ChevronDown, Menu, X, ArrowRight, Layers } from 'lucide-react';

interface LandingHeaderProps {
  currentTab: LabTab;
  onSelectTab: (tab: LabTab) => void;
  onOpenModal: (modal: 'take-a-moment' | 'how-it-works' | 'plans' | 'signin' | 'signup') => void;
  onScrollToExploration?: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ 
  currentTab, 
  onSelectTab, 
  onOpenModal,
  onScrollToExploration 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);

  const labItems: { id: LabTab; name: string; desc: string }[] = [
    { id: 'graphing', name: 'Function & Graphing Studio', desc: '2D Cartesian plotter, derivatives & tangent lines' },
    { id: 'geometry', name: 'Geometry & Unit Circle', desc: 'Continuous unit circle & triangle law of cosines' },
    { id: 'calculus', name: 'Calculus & Riemann Sandbox', desc: 'Riemann partitions, limits & Taylor series' },
    { id: 'linear-algebra', name: 'Linear Algebra Grid', desc: '2x2 Matrix warping, determinant & eigenvalues' },
    { id: 'probability', name: 'Statistics & Probability', desc: 'Normal, Binomial distributions & Buffon π' },
    { id: 'discrete', name: 'Discrete & Number Theory', desc: 'Prime factorization, Euclidean GCD & mod clock' },
  ];

  const handleTabClick = (tab: LabTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setLabsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e7e1d5] text-[#1c2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Group with Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => handleTabClick('overview')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            {/* The Logo from user asset */}
            <div className="w-9 h-9 rounded-full overflow-hidden shadow-xs border border-[#d6ccb9] group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/assets/aistudio/unnamed_7f1902d3.jpg"
                alt="Math Lab Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-serif-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#182029]">
              Math Lab
            </span>
          </div>

          <span className="hidden sm:inline-block text-[#c4bba8] text-base font-light">|</span>

          <span className="hidden sm:inline-block text-xs sm:text-sm text-[#667085] font-serif-editorial italic">
            The visual mathematics laboratory.
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm text-[#475467] font-medium">
          {/* Interactive Laboratories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
              onMouseEnter={() => setLabsDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-[#182029] transition-colors py-2"
            >
              <Layers className="w-3.5 h-3.5 text-[#2d5868]" />
              <span>Laboratories</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085]" />
            </button>

            {labsDropdownOpen && (
              <div
                onMouseLeave={() => setLabsDropdownOpen(false)}
                className="absolute top-full left-0 w-84 bg-white border border-[#ded5c5] rounded-xl shadow-xl p-2 space-y-1 z-50 animate-in fade-in"
              >
                {labItems.map((lab) => (
                  <button
                    key={lab.id}
                    onClick={() => handleTabClick(lab.id)}
                    className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-[#faf7f2] transition"
                  >
                    <div className="font-semibold text-[#182029]">{lab.name}</div>
                    <div className="text-[11px] text-[#667085] mt-0.5">{lab.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (currentTab !== 'overview') onSelectTab('overview');
              setTimeout(() => onScrollToExploration?.(), 100);
            }}
            className="hover:text-[#182029] transition-colors"
          >
            Visual Invariants
          </button>

          <button
            onClick={() => handleTabClick('formulas')}
            className="hover:text-[#182029] transition-colors"
          >
            Formulas
          </button>

          <button
            onClick={() => handleTabClick('challenges')}
            className="hover:text-[#182029] transition-colors"
          >
            Daily Challenges
          </button>

          <button
            onClick={() => handleTabClick('notebook')}
            className="hover:text-[#182029] transition-colors flex items-center gap-1"
          >
            <span>Scratchpad</span>
            <span className="text-xs">↗</span>
          </button>

          <button
            onClick={() => onOpenModal('how-it-works')}
            className="hover:text-[#182029] transition-colors"
          >
            About
          </button>

          <button
            onClick={() => handleTabClick('graphing')}
            className="px-4 py-2 bg-[#254553] hover:bg-[#1a343f] text-white text-xs font-semibold rounded-lg shadow-xs transition flex items-center gap-1.5"
          >
            <span>Launch Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Mobile menu hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#475467] hover:text-[#182029]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e7e1d5] px-6 py-6 space-y-4">
          <button
            onClick={() => handleTabClick('overview')}
            className="block w-full text-left font-serif-editorial text-base text-[#182029]"
          >
            Overview
          </button>

          <div className="py-2 border-t border-[#eee7db]">
            <span className="text-[11px] uppercase tracking-wider text-[#98a2b3] font-bold block mb-2">
              Laboratories
            </span>
            <div className="grid grid-cols-1 gap-1.5 pl-2">
              {labItems.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleTabClick(l.id)}
                  className="text-left text-xs text-[#254553] py-1"
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleTabClick('formulas')}
            className="block w-full text-left text-sm text-[#475467]"
          >
            Formulas & Identities
          </button>
          <button
            onClick={() => handleTabClick('challenges')}
            className="block w-full text-left text-sm text-[#475467]"
          >
            Daily Math Challenges
          </button>
          <button
            onClick={() => handleTabClick('notebook')}
            className="block w-full text-left text-sm text-[#475467]"
          >
            Scratchpad & Notes
          </button>

          <div className="pt-2 border-t border-[#eee7db]">
            <button
              onClick={() => handleTabClick('graphing')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#254553] rounded-lg"
            >
              Launch Graphing Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
