import React, { useState, useEffect } from 'react';
import { evaluateMathFunction } from '../utils/mathUtils';
import { NotebookEntry } from '../types';
import { Plus, Trash2, Download, Calculator, FileText } from 'lucide-react';

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
  const [entries, setEntries] = useState<NotebookEntry[]>(() => {
    const saved = localStorage.getItem('math_lab_notes');
    return saved ? JSON.parse(saved) : STARTER_NOTES;
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [expression, setExpression] = useState('');
  const [liveResult, setLiveResult] = useState('');

  useEffect(() => {
    localStorage.setItem('math_lab_notes', JSON.stringify(entries));
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
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
              Student Lab Notebook & Scratchpad
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Capture mathematical hypotheses, calculate ad-hoc expressions, and preserve lab observations locally.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportNotesAsMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#0077c8] hover:bg-[#005fa3] text-white rounded-xl shadow-xs transition"
            title="Export as Markdown for Notion, Obsidian, or LaTeX"
          >
            <Download className="w-4 h-4" />
            Export Markdown (.md)
          </button>
          <button
            onClick={exportNotes}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition shadow-2xs"
            title="Export raw JSON backup"
          >
            JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleAddNote} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-serif-editorial">
              <Plus className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
              New Investigation Entry
            </h3>

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
              <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">Notes / Derivation</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Write observations, derivations, or problem notes..."
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
                placeholder="e.g. sqrt(144) + 2^4, sin(pi/4)"
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
          <div className="text-xs text-slate-500 dark:text-slate-400 px-1 font-semibold">
            Saved Research Records ({entries.length})
          </div>

          {entries.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              No entries saved yet. Log observations from your lab sessions!
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
