import React, { useState } from 'react';
import { FORMULA_DATABASE } from '../data/formulas';
import { FormulaItem, LabTab } from '../types';
import { Search, ExternalLink, Copy, Check, BookOpen } from 'lucide-react';
import { BlockMath, InlineMath } from './common/MathView';

interface FormulaReferenceProps {
  onNavigateToLab: (tab: LabTab) => void;
}

export const FormulaReference: React.FC<FormulaReferenceProps> = ({ onNavigateToLab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Algebra',
    'Geometry',
    'Trigonometry',
    'Calculus',
    'Linear Algebra',
    'Statistics & Probability',
    'Discrete Math',
  ];

  const filtered = FORMULA_DATABASE.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.latex.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (formula: FormulaItem) => {
    navigator.clipboard.writeText(formula.latex);
    setCopiedId(formula.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 transition-colors">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-[#ded5c5] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-[#2d5868] dark:text-sky-400" />
          <h2 className="font-display-bold text-2xl font-bold text-[#182029] dark:text-white">
            Formula Reference Handbook
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400">
          Curated mathematical theorems, identities, and equations with variable breakdowns and direct links to live laboratory simulations.
        </p>

        {/* Search Bar */}
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#98a2b3] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by theorem, topic, variable, or LaTeX symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#faf7f2] dark:bg-slate-800 border border-[#ded5c5] dark:border-slate-700 rounded-xl text-xs text-[#182029] dark:text-white placeholder-[#98a2b3] focus:outline-none focus:ring-2 focus:ring-[#2d5868] dark:focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#254553] dark:bg-sky-600 text-white shadow-xs'
                    : 'bg-[#faf7f2] dark:bg-slate-800 text-[#475467] dark:text-slate-300 border border-[#ded5c5] dark:border-slate-700 hover:bg-[#eee7db] dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((formula) => (
          <div
            key={formula.id}
            className="bg-white dark:bg-slate-900 border border-[#ded5c5] dark:border-slate-800 hover:border-[#2d5868]/40 dark:hover:border-sky-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xs transition group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#faf7f2] dark:bg-slate-800 text-[#2d5868] dark:text-sky-400 border border-[#e2dacb] dark:border-slate-700">
                  {formula.category}
                </span>
                <button
                  onClick={() => handleCopy(formula)}
                  className="p-1.5 text-[#98a2b3] hover:text-[#182029] dark:hover:text-white rounded-lg hover:bg-[#faf7f2] dark:hover:bg-slate-800 transition"
                  title="Copy LaTeX source"
                >
                  {copiedId === formula.id ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="font-display-bold text-lg font-bold text-[#182029] dark:text-white mb-2">
                {formula.name}
              </h3>

              {/* KaTeX Mathematical Notation Display */}
              <div className="bg-[#faf7f2] dark:bg-slate-950/70 rounded-xl p-4 border border-[#ded5c5] dark:border-slate-800 overflow-x-auto my-3 tracking-wide flex items-center justify-center min-h-[72px]">
                <BlockMath math={formula.latex} className="text-[#2d5868] dark:text-sky-300 text-base" />
              </div>

              <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed mb-4">{formula.description}</p>

              {formula.variables.length > 0 && (
                <div className="bg-[#faf7f2] dark:bg-slate-800/60 rounded-xl p-3.5 border border-[#eee7db] dark:border-slate-700/60 text-xs space-y-1 mb-4">
                  <span className="text-[10px] text-[#98a2b3] dark:text-slate-400 uppercase font-bold block mb-1">
                    Variables & Terms:
                  </span>
                  {formula.variables.map((v, i) => (
                    <div key={i} className="flex gap-2 items-baseline">
                      <span className="font-mono text-[#b86822] dark:text-amber-400 font-semibold min-w-8">
                        {v.symbol.includes('\\') ? <InlineMath math={v.symbol} /> : v.symbol}:
                      </span>
                      <span className="text-[#475467] dark:text-slate-300">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {formula.labLink && (
              <button
                onClick={() => onNavigateToLab(formula.labLink!)}
                className="mt-2 w-full py-2 bg-[#2d5868]/10 dark:bg-sky-500/10 hover:bg-[#2d5868]/20 dark:hover:bg-sky-500/20 text-[#2d5868] dark:text-sky-300 border border-[#2d5868]/30 dark:border-sky-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <span>Launch in {formula.labLink.toUpperCase()} Lab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
