import React, { useState, useEffect, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import { evaluateMathFunction } from '../utils/mathUtils';
import { NotebookEntry, FormulaItem } from '../types';
import { FORMULA_DATABASE } from '../data/formulas';
import { useAuth } from '../context/AuthContext';
import { BlockMath, InlineMath } from './common/MathView';
import {
  Plus,
  Trash2,
  Download,
  Calculator,
  FileText,
  Search,
  BookOpen,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileCode,
  FileSpreadsheet
} from 'lucide-react';

const STARTER_NOTES: NotebookEntry[] = [
  {
    id: 'note-1',
    title: 'Harmonic Motion & Phase Invariants',
    content: 'The differential equation y\'\' + w^2 y = 0 has general solution y(t) = A cos(wt) + B sin(wt). When damping is introduced, exponential decay envelopes the oscillation.',
    expression: '1.5 * cos(3 * x)',
    evaluatedResult: 'Evaluates dynamically on x',
    category: 'Calculus',
    timestamp: Date.now() - 3600000,
  },
  {
    id: 'note-2',
    title: 'Matrix Determinant Area Rule',
    content: 'A positive determinant det(A) > 0 preserves the spatial orientation of basis vectors (i_hat and j_hat). A negative determinant reverses orientation.',
    expression: '2 * 4 - 1 * 3',
    evaluatedResult: '5',
    category: 'Linear Algebra',
    timestamp: Date.now() - 7200000,
  },
];

export const LabNotebook: React.FC = () => {
  const { effectiveUser } = useAuth();

  const [entries, setEntries] = useState<NotebookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('math_lab_notes');
      return saved ? JSON.parse(saved) : STARTER_NOTES;
    } catch {
      return STARTER_NOTES;
    }
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [expression, setExpression] = useState('');
  const [liveResult, setLiveResult] = useState('');
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Formula Search Panel State
  const [isFormulaSearchOpen, setIsFormulaSearchOpen] = useState(false);
  const [formulaSearchTerm, setFormulaSearchTerm] = useState('');
  const [selectedFormulaCat, setSelectedFormulaCat] = useState('All');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);
  const [insertNotice, setInsertNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('math_lab_notes', JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  useEffect(() => {
    if (!expression.trim()) {
      setLiveResult('');
      return;
    }
    const val = evaluateMathFunction(expression, 1);
    setLiveResult(isNaN(val) ? 'Invalid Expression' : String(val));
  }, [expression]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const newNote: NotebookEntry = {
      id: `note-${Date.now()}`,
      title: title.trim() || 'Untitled Mathematical Note',
      content: content.trim(),
      category,
      expression: expression.trim() || undefined,
      evaluatedResult: liveResult || undefined,
      timestamp: Date.now(),
    };

    setEntries([newNote, ...entries]);
    setTitle('');
    setContent('');
    setExpression('');
    setLiveResult('');
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((n) => n.id !== id));
  };

  // Filter formulas for the formula search drawer
  const formulaCategories = [
    'All',
    'Algebra',
    'Geometry',
    'Trigonometry',
    'Calculus',
    'Linear Algebra',
    'Statistics & Probability',
    'Discrete Math',
  ];

  const filteredFormulas = useMemo(() => {
    return FORMULA_DATABASE.filter((f) => {
      const matchesCat = selectedFormulaCat === 'All' || f.category === selectedFormulaCat;
      const term = formulaSearchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        f.name.toLowerCase().includes(term) ||
        f.description.toLowerCase().includes(term) ||
        f.latex.toLowerCase().includes(term) ||
        f.variables.some((v) => v.meaning.toLowerCase().includes(term) || v.symbol.toLowerCase().includes(term));
      return matchesCat && matchesSearch;
    });
  }, [formulaSearchTerm, selectedFormulaCat]);

  // Insert Formula into the Note Content textarea
  const handleInsertIntoNote = (formula: FormulaItem) => {
    const formatted = `\n\n[Formula: ${formula.name}]\nLaTeX: $$${formula.latex}$$\n${formula.description}`;
    setContent((prev) => (prev ? prev + formatted : formatted.trim()));
    setInsertNotice(`Inserted "${formula.name}" into notes!`);
    setTimeout(() => setInsertNotice(null), 2500);
  };

  // Insert formula expression into the live scratchpad
  const handleInsertIntoScratchpad = (formula: FormulaItem) => {
    // Convert popular formulas to expression-friendly scratchpad strings
    let scratchExpr = '';
    if (formula.id === 'quad-formula') scratchExpr = '(-4 + sqrt(4^2 - 4 * 1 * (-5))) / (2 * 1)';
    else if (formula.id === 'pythagoras') scratchExpr = 'sqrt(3^2 + 4^2)';
    else if (formula.id === 'heron') scratchExpr = 'sqrt(6 * (6-3) * (6-4) * (6-5))';
    else if (formula.id === 'pythagorean-trig') scratchExpr = 'sin(pi/4)^2 + cos(pi/4)^2';
    else if (formula.id === 'matrix-det-2x2') scratchExpr = '3 * 5 - 2 * 4';
    else if (formula.id === 'riemann-sum') scratchExpr = 'sin(0.5) * 0.5 + sin(1.0) * 0.5';
    else scratchExpr = formula.name;

    setExpression(scratchExpr);
    setInsertNotice(`Loaded computation for "${formula.name}" in scratchpad!`);
    setTimeout(() => setInsertNotice(null), 2500);
  };

  const handleCopyLatex = (formula: FormulaItem) => {
    navigator.clipboard.writeText(formula.latex);
    setCopiedFormulaId(formula.id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  // EXPORT AS PDF
  const exportNotesAsPdf = () => {
    setIsExportingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter', // 612 x 792 pt
      });

      const pageWidth = 612;
      const pageHeight = 792;
      const margin = 40;
      const contentWidth = pageWidth - margin * 2; // 532 pt

      // Header Banner Background
      doc.setFillColor(15, 23, 42); // deep slate/navy #0f172a
      doc.rect(margin, 35, contentWidth, 68, 'F');

      // Header Logo & Title
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('MATH LAB', margin + 15, 62);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(186, 230, 253); // sky-200
      doc.text('Student Research Notebook & Mathematical Derivations', margin + 15, 80);

      // Meta info banner under title
      let currentY = 120;
      doc.setTextColor(71, 85, 105); // slate-600
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      const scholarName = effectiveUser?.displayName || 'Student Scholar';
      const scholarEmail = effectiveUser?.email || 'Scholar Research Session';
      const exportDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      doc.text(`Scholar: ${scholarName} (${scholarEmail})`, margin, currentY);
      doc.text(`Exported: ${exportDate}  •  Total Records: ${entries.length}`, margin, currentY + 14);

      currentY += 30;

      // Divider
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.setLineWidth(1);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 20;

      if (entries.length === 0) {
        doc.setFontSize(11);
        doc.setTextColor(148, 163, 184);
        doc.text('No investigation records logged yet.', margin, currentY + 20);
      }

      // Iterate through entries
      entries.forEach((note, index) => {
        // Calculate needed height for entry
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);

        const contentLines = doc.splitTextToSize(note.content || '(No derivation notes recorded)', contentWidth - 24);
        const hasExpr = !!note.expression;
        const exprHeight = hasExpr ? 42 : 0;
        const entryHeight = 50 + contentLines.length * 13 + exprHeight + 20;

        // Check if page break is needed
        if (currentY + entryHeight > pageHeight - 60) {
          doc.addPage();
          currentY = 45;
        }

        const boxStartY = currentY;

        // Background box for note entry
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.roundedRect(margin, boxStartY, contentWidth, entryHeight - 10, 6, 6, 'FD');

        // Left accent indicator strip
        doc.setFillColor(0, 119, 200); // #0077c8
        doc.roundedRect(margin, boxStartY, 4, entryHeight - 10, 2, 2, 'F');

        // Category Tag
        doc.setFillColor(240, 249, 255); // sky-50
        doc.setDrawColor(186, 230, 253); // sky-200
        doc.roundedRect(margin + 16, boxStartY + 10, 95, 16, 3, 3, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(0, 119, 200);
        doc.text(note.category.toUpperCase(), margin + 22, boxStartY + 21);

        // Date
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text(new Date(note.timestamp).toLocaleDateString(), margin + 120, boxStartY + 21);

        // Note Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(note.title, margin + 16, boxStartY + 42);

        // Content / Derivations
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(51, 65, 85); // slate-700
        let textY = boxStartY + 58;
        contentLines.forEach((line: string) => {
          doc.text(line, margin + 16, textY);
          textY += 13;
        });

        // Expression Scratchpad Block (if present)
        if (hasExpr) {
          const exprBoxY = textY + 5;
          doc.setFillColor(248, 250, 252); // slate-50
          doc.setDrawColor(226, 232, 240);
          doc.roundedRect(margin + 16, exprBoxY, contentWidth - 32, 32, 4, 4, 'FD');

          doc.setFont('courier', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(0, 119, 200);
          doc.text(`Expression: ${note.expression}`, margin + 24, exprBoxY + 14);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(5, 150, 105); // emerald-600
          doc.text(`= ${note.evaluatedResult || ''}`, margin + 24, exprBoxY + 26);
        }

        currentY = boxStartY + entryHeight + 8;
      });

      // Add footers on all pages
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          'Math Lab National Student Initiative • Collaborative Mathematical Exploration',
          margin,
          pageHeight - 25
        );
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 25, { align: 'right' });
      }

      const fileDate = new Date().toISOString().slice(0, 10);
      doc.save(`math-lab-notebook-${fileDate}.pdf`);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const exportNotesAsMarkdown = () => {
    let md = `# Math Lab — Student Research Notebook\nGenerated: ${new Date().toLocaleDateString()}\n\n---\n\n`;
    entries.forEach((e) => {
      md += `### ${e.title}\n`;
      md += `*Category:* ${e.category} | *Date:* ${new Date(e.timestamp).toLocaleDateString()}\n\n`;
      md += `${e.content}\n\n`;
      if (e.expression) {
        md += `\`\`\`math\n${e.expression} = ${e.evaluatedResult}\n\`\`\`\n\n`;
      }
      md += `---\n\n`;
    });
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `math-lab-notebook-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  const exportNotes = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `math-lab-notebook-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 transition-colors">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
              Student Lab Notebook & Derivations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Capture mathematical hypotheses, calculate derivations, search standard formulas, and export clean PDF reports.
          </p>
        </div>

        {/* Action Buttons: Formula Search Toggle + PDF / Markdown / JSON Exports */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Formula Search Button */}
          <button
            onClick={() => setIsFormulaSearchOpen(!isFormulaSearchOpen)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition shadow-xs ${
              isFormulaSearchOpen
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold border-amber-400'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100'
            }`}
            title="Search mathematical formulas and insert into notes"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isFormulaSearchOpen ? 'Close Formula Search' : 'Formula Search'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200 dark:bg-amber-900 font-mono font-bold">
              {FORMULA_DATABASE.length}
            </span>
          </button>

          {/* Export PDF Button */}
          <button
            onClick={exportNotesAsPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#ea4335] hover:bg-[#d93025] text-white rounded-xl shadow-xs transition disabled:opacity-50"
            title="Export all notes and derivations as a styled PDF document"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Generating PDF...' : 'Export PDF (.pdf)'}</span>
          </button>

          {/* Export Markdown */}
          <button
            onClick={exportNotesAsMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#0077c8] hover:bg-[#005fa3] text-white rounded-xl shadow-xs transition"
            title="Export as Markdown for Notion or Obsidian"
          >
            <FileCode className="w-4 h-4" />
            <span className="hidden sm:inline">Markdown</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={exportNotes}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition shadow-2xs"
            title="Export raw JSON backup"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Floating Notice when formula is inserted */}
      {insertNotice && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold">{insertNotice}</span>
          </div>
          <button onClick={() => setInsertNotice(null)} className="text-slate-400 hover:text-slate-700">
            ×
          </button>
        </div>
      )}

      {/* FORMULA SEARCH EXPANDABLE SECTION */}
      {isFormulaSearchOpen && (
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700/60 rounded-2xl p-5 sm:p-6 shadow-md space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Formula Reference & Mathematical Search</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    {filteredFormulas.length} found
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Search theorem identities, LaTeX equations, and insert them directly into your derivation or scratchpad.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFormulaSearchOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Close
            </button>
          </div>

          {/* Search bar & Categories */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search formulas by name, concept, variable (e.g. Pythagoras, Euler, derivative, Taylor, Bayes)..."
                value={formulaSearchTerm}
                onChange={(e) => setFormulaSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {formulaCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFormulaCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedFormulaCat === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Formula Cards Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-96 overflow-y-auto pr-1">
            {filteredFormulas.length === 0 ? (
              <div className="col-span-full text-center py-8 text-xs text-slate-400">
                No formulas matching "{formulaSearchTerm}" in {selectedFormulaCat}.
              </div>
            ) : (
              filteredFormulas.map((f) => (
                <div
                  key={f.id}
                  className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 flex flex-col justify-between hover:border-amber-400 transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#0077c8] dark:text-sky-400 uppercase">
                        {f.category}
                      </span>
                      <button
                        onClick={() => handleCopyLatex(f)}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition"
                        title="Copy LaTeX"
                      >
                        {copiedFormulaId === f.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{f.name}</h4>

                    {/* KaTeX display */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg p-2.5 my-2 border border-slate-200 dark:border-slate-800 overflow-x-auto text-center min-h-[50px] flex items-center justify-center">
                      <BlockMath math={f.latex} className="text-xs text-[#0077c8] dark:text-sky-300" />
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug line-clamp-2 mb-2">
                      {f.description}
                    </p>
                  </div>

                  {/* Actions to insert */}
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                    <button
                      type="button"
                      onClick={() => handleInsertIntoNote(f)}
                      className="px-2 py-1.5 bg-white dark:bg-slate-700 hover:bg-sky-50 dark:hover:bg-slate-600 text-[#0077c8] dark:text-sky-300 border border-slate-200 dark:border-slate-600 rounded-lg text-[10px] font-bold text-center transition"
                      title="Insert formula notation and description into note text"
                    >
                      + Insert in Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertIntoScratchpad(f)}
                      className="px-2 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-[10px] font-bold text-center transition"
                      title="Load calculation into expression scratchpad"
                    >
                      Compute
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Grid: Form on Left, Saved Entries on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Entry Creator Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleAddNote} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif-editorial">
                <Plus className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                New Investigation Entry
              </h3>

              <button
                type="button"
                onClick={() => setIsFormulaSearchOpen(!isFormulaSearchOpen)}
                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                <span>Search Formulas</span>
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Invariant curvature under shear"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
              >
                <option value="General">General Math</option>
                <option value="Calculus">Calculus</option>
                <option value="Geometry">Geometry & Trig</option>
                <option value="Linear Algebra">Linear Algebra</option>
                <option value="Probability">Probability & Stats</option>
                <option value="Discrete Math">Discrete Math</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-slate-600 dark:text-slate-400">Notes / Derivation</label>
                <span className="text-[10px] text-slate-400">LaTeX $$...$$ supported</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Write observations, derivations, or problem notes (or click 'Insert in Notes' from Formula Search above)..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077c8] leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Expression Scratchpad
              </label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g. sqrt(144) + 2^4, sin(pi/4), 3 * 5 - 2 * 4"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
              />
              {liveResult && (
                <div className="mt-1 text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  = {liveResult}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-xs rounded-xl shadow-xs transition"
            >
              Save Entry
            </button>
          </form>
        </div>

        {/* Entries List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Saved Research Records ({entries.length})
            </div>
            {entries.length > 0 && (
              <button
                onClick={exportNotesAsPdf}
                className="text-[11px] font-bold text-[#ea4335] hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export as PDF</span>
              </button>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No entries saved yet. Log observations from your lab sessions or search formulas above to begin!
            </div>
          ) : (
            entries.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3 relative group transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#0077c8] dark:text-sky-400">
                      {note.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(note.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition opacity-0 group-hover:opacity-100"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
                  {note.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>

                {note.expression && (
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs flex items-center justify-between">
                    <span className="text-[#0077c8] dark:text-sky-300">{note.expression}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{note.evaluatedResult}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
