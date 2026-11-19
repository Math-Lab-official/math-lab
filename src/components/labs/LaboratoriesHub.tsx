import React, { useState } from 'react';
import { LabTab } from '../../types';
import {
  Activity,
  CircleDot,
  Layers,
  Grid,
  Compass,
  Binary,
  ArrowRight,
  BookOpen,
  FileText
} from 'lucide-react';
import digitalLabImg from '../../assets/images/digital_lab_visual_1795108888445.jpg';

interface LaboratoriesHubProps {
  onSelectLab: (tab: LabTab) => void;
}

export const LaboratoriesHub: React.FC<LaboratoriesHubProps> = ({ onSelectLab }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Studios' },
    { id: 'analysis', label: 'Calculus' },
    { id: 'geometry', label: 'Geometry & Linear Algebra' },
    { id: 'discrete', label: 'Discrete & Probability' },
  ];

  const labs = [
    {
      id: 'graphing' as LabTab,
      title: 'Function & Graphing Studio',
      domain: 'Calculus',
      category: 'analysis',
      icon: Activity,
      desc: '2D Cartesian plotter with live derivatives, tangent lines, and definite integrals.',
    },
    {
      id: 'geometry' as LabTab,
      title: 'Geometry & Unit Circle',
      domain: 'Trigonometry',
      category: 'geometry',
      icon: CircleDot,
      desc: 'Interactive unit circle with live trig projections and triangle solver.',
    },
    {
      id: 'calculus' as LabTab,
      title: 'Calculus & Riemann Sandbox',
      domain: 'Integration',
      category: 'analysis',
      icon: Layers,
      desc: 'Riemann sum approximations and live Taylor series expansions.',
    },
    {
      id: 'linear-algebra' as LabTab,
      title: 'Linear Algebra Grid',
      domain: 'Matrices',
      category: 'geometry',
      icon: Grid,
      desc: 'Real-time 2×2 matrix transformations, determinants, and basis vectors.',
    },
    {
      id: 'probability' as LabTab,
      title: 'Statistics & Probability',
      domain: 'Distributions',
      category: 'discrete',
      icon: Compass,
      desc: 'Interactive normal/binomial curves and Monte Carlo simulations.',
    },
    {
      id: 'discrete' as LabTab,
      title: 'Number Theory & Discrete',
      domain: 'Modular Arithmetic',
      category: 'discrete',
      icon: Binary,
      desc: 'Prime sieves, modular rings, and combinatorial explorers.',
    },
  ];

  const filteredLabs =
    activeCategory === 'all' ? labs : labs.filter((l) => l.category === activeCategory);

  return (
    <div className="space-y-8 max-w-6xl mx-auto transition-colors">
      {/* Visual Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 text-white">
        <img
          src={digitalLabImg}
          alt="3D mathematical harmonic wave surface"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent" />
        <div className="relative p-7 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <p className="text-xs font-mono tracking-wider uppercase text-sky-400 font-semibold">
              Interactive Studios
            </p>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight">
              The Digital Math Lab
            </h1>
            <p className="text-sm text-slate-300">
              Browser-based simulations to test conjectures and visualize mathematical structures.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-950/70 backdrop-blur-xs rounded-xl border border-white/15 self-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Studios Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLabs.map((lab) => {
          const Icon = lab.icon;
          return (
            <button
              key={lab.id}
              onClick={() => onSelectLab(lab.id)}
              className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/50 dark:hover:border-sky-500/50 rounded-2xl p-6 text-left transition flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0077c8] dark:text-sky-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{lab.domain}</span>
                </div>

                <div>
                  <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                    {lab.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0077c8] dark:text-sky-400">
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </section>

      {/* Supporting Tools */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={() => onSelectLab('notebook')}
          className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-5 text-left transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Lab Notebook</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Write derivations &amp; download as PDF</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077c8]" />
        </button>

        <button
          onClick={() => onSelectLab('formulas')}
          className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/40 rounded-2xl p-5 text-left transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Formula Handbook</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Search theorems &amp; LaTeX identities</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077c8]" />
        </button>
      </section>
    </div>
  );
};
