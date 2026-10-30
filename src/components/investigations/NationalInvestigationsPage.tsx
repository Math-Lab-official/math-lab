import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  Tag, 
  CheckCircle2, 
  Send, 
  HelpCircle, 
  FileText, 
  ExternalLink,
  Filter,
  Sparkles,
  BookOpen,
  Eye,
  Target,
  Cpu,
  ShieldCheck,
  ChevronDown,
  Award,
  Edit3,
  Bookmark
} from 'lucide-react';
import { NATIONAL_INVESTIGATIONS, FIVE_LEVELS_OVERVIEW } from '../../data/investigationsData';
import { NationalInvestigation, LabTab } from '../../types';
import { LatticeColoringWorkbench } from './LatticeColoringWorkbench';
import { 
  getStudentProgress, 
  setInvestigationLevelStatus, 
  saveNewConjecture,
  StudentProgressState,
  LevelStatus 
} from '../../utils/studentProgress';

interface Props {
  onNavigate: (tab: LabTab, detailId?: string) => void;
  selectedInvestigationId?: string;
  onOpenProgress?: () => void;
}

export const NationalInvestigationsPage: React.FC<Props> = ({ 
  onNavigate, 
  selectedInvestigationId,
  onOpenProgress
}) => {
  const [activeInvestigationId, setActiveInvestigationId] = useState<string>(
    selectedInvestigationId || NATIONAL_INVESTIGATIONS[0].id
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLevelTab, setActiveLevelTab] = useState<number>(1);
  const [showFacilitatorNotes, setShowFacilitatorNotes] = useState<boolean>(false);
  const [activeViewMode, setActiveViewMode] = useState<'levels' | 'workbench'>('levels');
  const [userNote, setUserNote] = useState<string>('');
  const [progressState, setProgressState] = useState<StudentProgressState>(getStudentProgress());

  useEffect(() => {
    const handleUpdate = () => {
      setProgressState(getStudentProgress());
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, []);

  const activeInvestigation = NATIONAL_INVESTIGATIONS.find(
    (inv) => inv.id === activeInvestigationId
  ) || NATIONAL_INVESTIGATIONS[0];

  const currentLevelProgress = progressState.investigations[activeInvestigation.id]?.[activeLevelTab] || {
    status: 'not_started',
    notes: '',
    lastUpdated: 0,
  };

  useEffect(() => {
    setUserNote(currentLevelProgress.notes || '');
  }, [activeLevelTab, activeInvestigation.id]);

  const categories = ['All', 'Discrete & Combinatorics', 'Geometry & Invariants', 'Number Theory & Algebra'];

  const filteredInvestigations = selectedCategory === 'All' 
    ? NATIONAL_INVESTIGATIONS 
    : NATIONAL_INVESTIGATIONS.filter((inv) => inv.category === selectedCategory);

  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1: return <Eye className="w-4 h-4 text-amber-500" />;
      case 2: return <Target className="w-4 h-4 text-sky-500" />;
      case 3: return <Cpu className="w-4 h-4 text-purple-500" />;
      case 4: return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 5: return <Compass className="w-4 h-4 text-rose-500" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (status: LevelStatus) => {
    const next = setInvestigationLevelStatus(activeInvestigation.id, activeLevelTab, status, userNote);
    setProgressState(next);
  };

  const handleSaveNote = () => {
    const status = currentLevelProgress.status === 'not_started' ? 'exploring' : currentLevelProgress.status;
    const next = setInvestigationLevelStatus(activeInvestigation.id, activeLevelTab, status, userNote);
    setProgressState(next);
  };

  return (
    <div className="space-y-12 py-4">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Monthly Flagship Program</span>
            </div>

            {onOpenProgress && (
              <button
                onClick={onOpenProgress}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-sky-300 text-xs font-bold transition"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>My Research Progress Tracker</span>
              </button>
            )}
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            NATIONAL INVESTIGATIONS
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every month, Math Lab releases a rich mathematical investigation designed for collaborative inquiry across five progressive levels of mathematical depth. Rather than routine calculation drills, these investigations challenge students to notice patterns, formulate invariants, construct proofs, and explore open questions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free for All Students & Local Labs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>5 Progressive Depth Levels</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Interactive Experiment Simulator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Archive Browser & Category Filter */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
                <span>Monthly Archive</span>
              </h2>
              <span className="text-xs font-bold text-slate-400">
                {NATIONAL_INVESTIGATIONS.length} Available
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select an investigation to read the core questions, examine the 5 levels of depth, and access problem worksheets.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Investigation List Cards */}
            <div className="space-y-2.5 pt-2">
              {filteredInvestigations.map((inv) => {
                const isSelected = inv.id === activeInvestigation.id;
                return (
                  <button
                    key={inv.id}
                    onClick={() => {
                      setActiveInvestigationId(inv.id);
                      setActiveLevelTab(1);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs space-y-1.5 relative ${
                      isSelected
                        ? 'bg-sky-50/80 dark:bg-sky-950/40 border-[#0077c8] dark:border-sky-500 shadow-xs ring-1 ring-[#0077c8]'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {inv.month} {inv.year}
                      </span>
                      {inv.status === 'current' ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                          Current Focus
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">
                          Archived
                        </span>
                      )}
                    </div>

                    <h4 className={`font-bold leading-snug line-clamp-2 ${isSelected ? 'text-[#0077c8] dark:text-sky-400' : 'text-slate-900 dark:text-white'}`}>
                      {inv.title}
                    </h4>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {inv.category}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Callout */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/50 dark:border-amber-600/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Share Student Solutions</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Have you discovered an invariant or new counterexample? Submit your work to our Solutions Review & Student Scholarship committee.
            </p>
            <button
              onClick={() => onNavigate('share-work')}
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Submit Findings & Conjectures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Active Investigation Deep Dive */}
        <div className="lg:col-span-8 space-y-6">
          <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-9 shadow-xs space-y-8 transition-colors">
            {/* Header Metadata */}
            <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0077c8] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-md">
                    {activeInvestigation.month} {activeInvestigation.year} National Investigation
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {activeInvestigation.category}
                  </span>
                </div>
                {activeInvestigation.submissionDeadline && (
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Suggested Deadline: <strong className="text-slate-800 dark:text-slate-200">{activeInvestigation.submissionDeadline}</strong>
                  </span>
                )}
              </div>

              <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {activeInvestigation.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic font-serif">
                "{activeInvestigation.subtitle}"
              </p>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {activeInvestigation.overview}
              </p>
            </div>

            {/* The Core Question Box */}
            <div className="bg-gradient-to-br from-slate-900 to-[#0a192f] text-white rounded-2xl p-6 sm:p-7 space-y-3 shadow-md border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>The Core Investigation Question</span>
              </div>
              <p className="font-serif text-lg sm:text-xl font-medium leading-relaxed text-amber-100/90">
                {activeInvestigation.theCoreQuestion}
              </p>
            </div>

            {/* Mode Switcher: Levels vs. Interactive Workbench */}
            {activeInvestigation.id === 'lattice-coloring' && (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveViewMode('levels')}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    activeViewMode === 'levels'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4 text-[#0077c8]" />
                  <span>Five Levels of Depth</span>
                </button>
                <button
                  onClick={() => setActiveViewMode('workbench')}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    activeViewMode === 'workbench'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Interactive Lattice Simulator (Actual Math)</span>
                </button>
              </div>
            )}

            {/* VIEW MODE 1: FIVE LEVELS OF DEPTH */}
            {activeViewMode === 'levels' && (
              <div className="space-y-6 pt-2 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-display-bold text-xl font-bold text-slate-900 dark:text-white">
                      Five Levels of Mathematical Depth
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Students can participate at any level that challenges them, from tactile patterns to open questions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Level {activeLevelTab} of 5</span>
                    <button
                      onClick={() => setActiveViewMode('workbench')}
                      className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-lg hover:bg-amber-200 transition"
                    >
                      Open Simulator ↗
                    </button>
                  </div>
                </div>

                {/* Level Selector Tabs */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {activeInvestigation.levels.map((lvl) => {
                    const isActive = activeLevelTab === lvl.level;
                    const rec = progressState.investigations[activeInvestigation.id]?.[lvl.level];
                    const isDone = rec?.status === 'mastered' || rec?.status === 'conjectured';

                    return (
                      <button
                        key={lvl.level}
                        onClick={() => setActiveLevelTab(lvl.level)}
                        className={`p-2 sm:p-3 rounded-xl border text-center transition-all relative ${
                          isActive
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isDone && (
                          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                        <div className="flex items-center justify-center mb-1">
                          {getLevelIcon(lvl.level)}
                        </div>
                        <div className="font-bold text-xs sm:text-sm">
                          L{lvl.level}
                        </div>
                        <div className="text-[10px] hidden sm:block truncate opacity-70">
                          {lvl.level === 1 && 'Observation'}
                          {lvl.level === 2 && 'Conjectures'}
                          {lvl.level === 3 && 'Algebra'}
                          {lvl.level === 4 && 'Proof'}
                          {lvl.level === 5 && 'Extensions'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Level Content Display */}
                {(() => {
                  const currentLvl = activeInvestigation.levels.find(
                    (l) => l.level === activeLevelTab
                  ) || activeInvestigation.levels[0];

                  return (
                    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 sm:p-7 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getLevelIcon(currentLvl.level)}
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Level {currentLvl.level} Focus
                            </span>
                          </div>
                          <h4 className="font-display-bold text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                            {currentLvl.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                            {currentLvl.subtitle}
                          </p>
                        </div>

                        {/* Level Progress Status Selector */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {(['not_started', 'exploring', 'conjectured', 'mastered'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(st)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition ${
                                currentLevelProgress.status === st
                                  ? st === 'mastered'
                                    ? 'bg-emerald-600 text-white'
                                    : st === 'conjectured'
                                    ? 'bg-amber-500 text-white'
                                    : st === 'exploring'
                                    ? 'bg-sky-600 text-white'
                                    : 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white'
                                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {st.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Problem Prompt */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Investigation Prompt
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-[15px]">
                          {currentLvl.prompt}
                        </p>
                      </div>

                      {/* Guiding Questions */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Guiding Discussion & Analysis Questions:
                        </div>
                        <ul className="space-y-2">
                          {currentLvl.guidingQuestions.map((q, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sample Data or Visual Hint */}
                      {currentLvl.sampleVisualOrData && (
                        <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-1 font-mono">
                          <div className="font-bold text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-300 font-sans">
                            Observation Reference:
                          </div>
                          <div>{currentLvl.sampleVisualOrData}</div>
                        </div>
                      )}

                      {/* Hint / Extension */}
                      {currentLvl.hintOrExtension && (
                        <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 rounded-xl p-4 text-xs text-purple-900 dark:text-purple-200 space-y-1">
                          <span className="font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider text-[11px] block">
                            Clue & Analytical Invariant:
                          </span>
                          <p className="leading-relaxed">{currentLvl.hintOrExtension}</p>
                        </div>
                      )}

                      {/* Student Notebook & Conjecture Input Box */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Bookmark className="w-3.5 h-3.5 text-[#0077c8]" />
                            <span>My Notes & Conjectures for Level {currentLvl.level}</span>
                          </span>
                          <button
                            onClick={handleSaveNote}
                            className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold rounded-lg hover:opacity-90 transition"
                          >
                            Save Note
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={userNote}
                          onChange={(e) => setUserNote(e.target.value)}
                          placeholder="Record your observations, pattern proofs, or open questions here..."
                          className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                        />
                      </div>

                      {/* Level Navigation Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          disabled={activeLevelTab === 1}
                          onClick={() => setActiveLevelTab((prev) => Math.max(1, prev - 1))}
                          className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg disabled:opacity-40"
                        >
                          ← Previous Level
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveViewMode('workbench')}
                            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Test in Lattice Simulator</span>
                          </button>

                          <button
                            onClick={() => onNavigate('share-work')}
                            className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                          >
                            <span>Submit Level {currentLvl.level} Work</span>
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          disabled={activeLevelTab === 5}
                          onClick={() => setActiveLevelTab((prev) => Math.min(5, prev + 1))}
                          className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg disabled:opacity-40"
                        >
                          Next Level →
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* VIEW MODE 2: INTERACTIVE WORKBENCH */}
            {activeViewMode === 'workbench' && (
              <div className="space-y-6 pt-2 animate-in fade-in">
                <LatticeColoringWorkbench />
              </div>
            )}

            {/* Facilitator Notes Accordion */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setShowFacilitatorNotes(!showFacilitatorNotes)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-left transition"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Facilitator Notes for Local Math Labs
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showFacilitatorNotes ? 'rotate-180' : ''}`} />
              </button>

              {showFacilitatorNotes && (
                <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-medium text-slate-600 dark:text-slate-400">
                    Tips for organizing a 60–90 minute Local Lab meeting around this investigation:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    {activeInvestigation.facilitatorTips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">{tip}</li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('local-labs')}
                      className="text-[#0077c8] dark:text-sky-400 hover:underline font-bold"
                    >
                      Request full facilitator guide packet & printable session kit →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
