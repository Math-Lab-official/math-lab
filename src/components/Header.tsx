import React from 'react';
import { LabTab } from '../types';
import { 
  Compass, 
  Activity, 
  Grid, 
  BookOpen, 
  Award, 
  FileText, 
  Info, 
  Sparkles,
  Layers,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  currentTab: LabTab;
  onSelectTab: (tab: LabTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = React.useState(false);

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

  const isLabActive = ['graphing', 'geometry', 'calculus', 'linear-algebra', 'probability', 'discrete'].includes(currentTab);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('overview')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-[1px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center font-serif text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-sky-300">
              ∫
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">Math Lab</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Official
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block -mt-0.5">
              Interactive Mathematics
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => handleTabClick('overview')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currentTab === 'overview'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Overview
          </button>

          {/* Interactive Labs Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
              onMouseEnter={() => setLabsDropdownOpen(true)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${
                isLabActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>Interactive Labs</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${labsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {labsDropdownOpen && (
              <div 
                onMouseLeave={() => setLabsDropdownOpen(false)}
                className="absolute top-full left-0 w-80 mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-1"
              >
                {labItems.map((lab) => (
                  <button
                    key={lab.id}
                    onClick={() => handleTabClick(lab.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition ${
                      currentTab === lab.id
                        ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/30'
                        : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">{lab.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{lab.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleTabClick('formulas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              currentTab === 'formulas'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            Formulas
          </button>

          <button
            onClick={() => handleTabClick('challenges')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              currentTab === 'challenges'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            Challenges
          </button>

          <button
            onClick={() => handleTabClick('notebook')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              currentTab === 'notebook'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            Scratchpad
          </button>

          <button
            onClick={() => handleTabClick('about')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currentTab === 'about'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleTabClick('overview')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Overview
          </button>
          
          <div className="py-1">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold px-3">
              Laboratories
            </span>
            <div className="space-y-1 mt-1 pl-2">
              {labItems.map((lab) => (
                <button
                  key={lab.id}
                  onClick={() => handleTabClick(lab.id)}
                  className={`w-full text-left py-1.5 px-3 rounded-lg text-xs font-medium ${
                    currentTab === lab.id ? 'bg-indigo-600/30 text-indigo-300' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {lab.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleTabClick('formulas')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Formula Reference
          </button>
          <button
            onClick={() => handleTabClick('challenges')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Daily Math Challenge
          </button>
          <button
            onClick={() => handleTabClick('notebook')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Notebook & Scratchpad
          </button>
          <button
            onClick={() => handleTabClick('about')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            About Math Lab
          </button>
        </div>
      )}
    </header>
  );
};
