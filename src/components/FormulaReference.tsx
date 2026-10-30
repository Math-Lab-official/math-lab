import React, { useState } from 'react';
import { FORMULA_DATABASE } from '../data/formulas';
import { FormulaItem, LabTab } from '../types';
import { Search, ExternalLink, Copy, Check, BookOpen } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-[#2d5868]" />
          <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
            Formula Reference Handbook
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#475467]">
          Curated mathematical theorems, identities, and equations with variable breakdowns and direct links to live laboratory simulations.
        </p>

        {/* Search Bar */}
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#98a2b3] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search formulas by name, concept, or symbols..."
              className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-xl pl-9.5 pr-4 py-2 text-sm text-[#182029] focus:outline-none focus:border-[#2d5868] shadow-xs"
            />
          </div>
        </div>

        {/* Categories Strip */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition shadow-xs ${
                selectedCategory === c
                  ? 'bg-[#254553] text-white font-semibold'
                  : 'bg-white text-[#475467] hover:text-[#182029] border border-[#ded5c5]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((formula) => (
          <div
            key={formula.id}
            className="bg-white border border-[#ded5c5] hover:border-[#2d5868]/40 rounded-2xl p-6 flex flex-col justify-between shadow-xs transition group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#faf7f2] text-[#2d5868] border border-[#e2dacb]">
                  {formula.category}
                </span>
                <button
                  onClick={() => handleCopy(formula)}
                  className="p-1.5 text-[#98a2b3] hover:text-[#182029] rounded-lg hover:bg-[#faf7f2] transition"
                  title="Copy LaTeX"
                >
                  {copiedId === formula.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="font-serif-editorial text-lg font-bold text-[#182029] mb-2">
                {formula.name}
              </h3>

              <div className="bg-[#faf7f2] rounded-xl p-4 border border-[#ded5c5] font-serif-editorial text-center text-lg text-[#2d5868] overflow-x-auto my-3 tracking-wide">
                {formula.latex}
              </div>

              <p className="text-xs text-[#475467] leading-relaxed mb-4">{formula.description}</p>

              {formula.variables.length > 0 && (
                <div className="bg-[#faf7f2] rounded-xl p-3.5 border border-[#eee7db] text-xs space-y-1 mb-4">
                  <span className="text-[10px] text-[#98a2b3] uppercase font-bold block mb-1">
                    Variables & Terms:
                  </span>
                  {formula.variables.map((v, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="font-serif-editorial text-[#b86822] font-semibold min-w-8">{v.symbol}:</span>
                      <span className="text-[#475467]">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {formula.labLink && (
              <button
                onClick={() => onNavigateToLab(formula.labLink!)}
                className="mt-2 w-full py-2 bg-[#2d5868]/10 hover:bg-[#2d5868]/20 text-[#2d5868] border border-[#2d5868]/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                Launch in {formula.labLink.toUpperCase()} Lab
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
