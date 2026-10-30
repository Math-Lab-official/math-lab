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

  const exportNotes = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'math-lab-notebook.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2d5868]" />
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Lab Notebook & Scratchpad
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Capture mathematical hypotheses, calculate ad-hoc expressions, and preserve lab observations locally.
          </p>
        </div>
        <button
          onClick={exportNotes}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white hover:bg-[#faf7f2] text-[#475467] rounded-xl border border-[#ded5c5] transition shadow-xs"
        >
          <Download className="w-4 h-4" />
          Export Notebook JSON
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleAddNote} className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#182029] flex items-center gap-2 font-serif-editorial">
              <Plus className="w-4 h-4 text-[#2d5868]" />
              New Observation
            </h3>

            <div>
              <label className="text-xs text-[#475467] block mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Invariant curvature under shear"
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-1.5 text-xs text-[#182029] focus:outline-none focus:border-[#2d5868]"
              />
            </div>

            <div>
              <label className="text-xs text-[#475467] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-1.5 text-xs text-[#475467] focus:outline-none focus:border-[#2d5868]"
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
              <label className="text-xs text-[#475467] block mb-1">Notes / Derivation</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Write observations, derivations, or problem notes..."
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg p-3 text-xs text-[#182029] focus:outline-none focus:border-[#2d5868] leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs text-[#475467] block mb-1 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[#166534]" />
                Expression Scratchpad
              </label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g. sqrt(144) + 2^4, sin(pi/4)"
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-1.5 font-mono text-xs text-[#166534]"
              />
              {liveResult && (
                <div className="mt-1 text-xs font-mono text-[#166534] font-bold bg-[#faf7f2] p-2 rounded-lg border border-[#ded5c5]">
                  = {liveResult}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#254553] hover:bg-[#1a343f] text-white font-semibold text-xs rounded-xl shadow-xs transition"
            >
              Save Entry
            </button>
          </form>
        </div>

        {/* Entries List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs text-[#667085] px-1">
            Saved Records ({entries.length})
          </div>

          {entries.length === 0 ? (
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-8 text-center text-[#98a2b3] text-xs">
              No entries saved yet. Log observations from your lab sessions!
            </div>
          ) : (
            entries.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-[#ded5c5] rounded-2xl p-6 shadow-xs space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#ded5c5]">
                      {note.category}
                    </span>
                    <span className="text-[11px] text-[#98a2b3]">
                      {new Date(note.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1 text-[#98a2b3] hover:text-rose-600 rounded transition opacity-0 group-hover:opacity-100"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="font-serif-editorial text-lg font-bold text-[#182029]">
                  {note.title}
                </h4>
                <p className="text-xs text-[#475467] leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>

                {note.expression && (
                  <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5] font-mono text-xs text-[#182029] flex items-center justify-between">
                    <span className="text-[#2d5868]">{note.expression}</span>
                    <span className="text-[#166534] font-bold">{note.evaluatedResult}</span>
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
