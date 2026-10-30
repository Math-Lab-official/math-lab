import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Award, 
  Layers, 
  ArrowRight, 
  FileText, 
  Download, 
  Copy, 
  Trash2, 
  User, 
  Edit3,
  Calendar,
  Grid,
  Check
} from 'lucide-react';
import { 
  getStudentProgress, 
  updateStudentProfile, 
  getOverallProgressStats, 
  exportProgressReport, 
  deleteConjecture,
  setInvestigationLevelStatus,
  setLabProgressStatus,
  StudentProgressState 
} from '../../utils/studentProgress';
import { LabTab } from '../../types';

interface StudentProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: LabTab) => void;
}

export const StudentProgressModal: React.FC<StudentProgressModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [progressState, setProgressState] = useState<StudentProgressState>(getStudentProgress());
  const [activeTab, setActiveTab] = useState<'overview' | 'investigations' | 'labs' | 'conjectures' | 'export'>('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(progressState.profile);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProgressState(getStudentProgress());
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const stats = getOverallProgressStats(progressState);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateStudentProfile(profileForm);
    setProgressState(updated);
    setIsEditingProfile(false);
  };

  const handleCopyReport = () => {
    const report = exportProgressReport(progressState);
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const labsList: { id: string; label: string; tab: LabTab }[] = [
    { id: 'graphing', label: 'Function & Graphing Studio', tab: 'graphing' },
    { id: 'geometry', label: 'Geometry & Unit Circle Studio', tab: 'geometry' },
    { id: 'calculus', label: 'Calculus & Riemann Sandbox', tab: 'calculus' },
    { id: 'linear-algebra', label: 'Linear Algebra Grid Studio', tab: 'linear-algebra' },
    { id: 'probability', label: 'Probability & Distributions Studio', tab: 'probability' },
    { id: 'discrete', label: 'Number Theory & Discrete Math', tab: 'discrete' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display-bold text-xl font-bold text-slate-900 dark:text-white">
                  Student Progress & Research Portfolio
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  {stats.overallPercentage}% Completed
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track your mathematical inquiry journey, saved conjectures, and laboratory investigations.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto">
          {[
            { id: 'overview', label: 'Progress Overview' },
            { id: 'investigations', label: 'National Investigations (5 Levels)' },
            { id: 'labs', label: 'Interactive Math Labs (6)' },
            { id: 'conjectures', label: `My Conjectures (${progressState.conjectures.length})` },
            { id: 'export', label: 'Export Portfolio' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'border-[#0077c8] text-[#0077c8] dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Profile Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg">
                    {progressState.profile.name[0]?.toUpperCase() || 'S'}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {progressState.profile.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {progressState.profile.schoolOrLab} • {progressState.profile.gradeLevel}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {/* Profile Edit Form */}
              {isEditingProfile && (
                <form onSubmit={handleSaveProfile} className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800/60 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Student Name / Handle
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        School or Local Lab Chapter
                      </label>
                      <input
                        type="text"
                        value={profileForm.schoolOrLab}
                        onChange={(e) => setProfileForm({ ...profileForm, schoolOrLab: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="e.g. Oak Park Local Lab"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Grade / Level
                      </label>
                      <input
                        type="text"
                        value={profileForm.gradeLevel}
                        onChange={(e) => setProfileForm({ ...profileForm, gradeLevel: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="e.g. High School (Grades 9-12)"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-xl shadow-xs transition"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              )}

              {/* Progress Milestones Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 text-center">
                  <div className="font-mono text-2xl font-extrabold text-[#0077c8] dark:text-sky-400">
                    {stats.totalLevelsExplored}/5
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Levels Explored
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 text-center">
                  <div className="font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {stats.totalLabsCompleted}/6
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Labs Completed
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 text-center">
                  <div className="font-mono text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                    {stats.totalConjectures}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Saved Conjectures
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 text-center">
                  <div className="font-mono text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                    {stats.totalLatticeExperiments}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Lattice Tests
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Total Program Milestone Progress</span>
                  <span className="text-[#0077c8] dark:text-sky-400 font-mono text-sm">{stats.overallPercentage}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0077c8] to-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${stats.overallPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Math Lab honors genuine curiosity: explore levels, test conjectures in our interactive lattice simulator, and submit your reasoning to the National Synthesis digest!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: NATIONAL INVESTIGATIONS (5 LEVELS) */}
          {activeTab === 'investigations' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display-bold text-base font-bold text-slate-900 dark:text-white">
                    The Chromatic Invariants of Integer Lattices (October 2026)
                  </h4>
                  <p className="text-xs text-slate-500">Track your progress through each of the five mathematical levels.</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateTab('investigations');
                  }}
                  className="px-3 py-1.5 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Open Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { level: 1, title: 'Level 1: Concrete Observation & Pattern Discovery', desc: '3×3 grid coloring with 2 colors without monochromatic rectangles.' },
                  { level: 2, title: 'Level 2: Formulation of Conjectures & Invariants', desc: 'Formalizing the column-pair invariant and lower bounds on 3×7 grid.' },
                  { level: 3, title: 'Level 3: Systematic Generalization & Algebraic Bounds', desc: 'Deriving the n(r, c) bound for r rows and c colors.' },
                  { level: 4, title: 'Level 4: Rigorous Mathematical Proof', desc: 'Constructing deductive proofs using the Pigeonhole Principle.' },
                  { level: 5, title: 'Level 5: Open Extensions & Multi-Dimensional Horizons', desc: 'Generalizing to higher dimensions Z^d and infinite lattices.' },
                ].map((item) => {
                  const record = progressState.investigations['lattice-coloring']?.[item.level] || {
                    status: 'not_started',
                    notes: '',
                    lastUpdated: 0,
                  };

                  return (
                    <div
                      key={item.level}
                      className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[10px] font-bold text-[#0077c8] dark:text-sky-400 uppercase tracking-wider">
                            Level {item.level}
                          </span>
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                            {item.title}
                          </h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </p>
                        </div>

                        {/* Status Select */}
                        <div className="flex items-center gap-1.5">
                          {(['not_started', 'exploring', 'conjectured', 'mastered'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => {
                                const next = setInvestigationLevelStatus('lattice-coloring', item.level, st);
                                setProgressState(next);
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition ${
                                record.status === st
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

                      {/* Notes Section */}
                      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                        <textarea
                          rows={2}
                          value={record.notes}
                          onChange={(e) => {
                            const next = setInvestigationLevelStatus(
                              'lattice-coloring',
                              item.level,
                              record.status === 'not_started' ? 'exploring' : record.status,
                              e.target.value
                            );
                            setProgressState(next);
                          }}
                          placeholder={`Add your observations, calculations, or questions for Level ${item.level}...`}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE MATH LABS */}
          {activeTab === 'labs' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display-bold text-base font-bold text-slate-900 dark:text-white">
                    Interactive Mathematics Laboratories
                  </h4>
                  <p className="text-xs text-slate-500">Six authentic simulation studios with live numerical solvers and geometric tools.</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateTab('laboratories');
                  }}
                  className="px-3 py-1.5 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Open Lab Studio Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {labsList.map((lab) => {
                  const info = progressState.labs[lab.id] || { status: 'not_started', interactionCount: 0 };
                  const isCompleted = info.status === 'completed';

                  return (
                    <div
                      key={lab.id}
                      className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase font-bold text-[#0077c8] dark:text-sky-400">
                            Studio {lab.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isCompleted
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400'
                              : info.status === 'in_progress'
                              ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-400'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }`}>
                            {info.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                          {lab.label}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Interactions recorded: {info.interactionCount}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => {
                            const next = setLabProgressStatus(lab.id, isCompleted ? 'in_progress' : 'completed');
                            setProgressState(next);
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                            isCompleted
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span>{isCompleted ? 'Marked Completed' : 'Mark Complete'}</span>
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateTab(lab.tab);
                          }}
                          className="py-1.5 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl transition hover:opacity-90"
                        >
                          Launch
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: MY CONJECTURES */}
          {activeTab === 'conjectures' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display-bold text-base font-bold text-slate-900 dark:text-white">
                    Recorded Mathematical Conjectures
                  </h4>
                  <p className="text-xs text-slate-500">Hypotheses and invariants you have logged during your explorations.</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateTab('share-work');
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Submit to National Digest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {progressState.conjectures.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <p className="text-xs text-slate-500">No conjectures saved yet.</p>
                  <p className="text-[11px] text-slate-400">
                    Use the "Save Finding to Notebook" button inside the Lattice Simulator or type a conjecture in the Level Tracker!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {progressState.conjectures.map((conj) => (
                    <div
                      key={conj.id}
                      className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 space-y-2 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400">
                            Level {conj.level}
                          </span>
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {conj.investigationTitle}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const next = deleteConjecture(conj.id);
                            setProgressState(next);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition"
                          title="Delete conjecture"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif-editorial italic leading-relaxed">
                        "{conj.text}"
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/80 dark:border-slate-700/60">
                        <span>Logged on {new Date(conj.timestamp).toLocaleDateString()}</span>
                        {conj.tags && conj.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            {conj.tags.map((t, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display-bold text-base font-bold text-slate-900 dark:text-white">
                    Export Research Portfolio
                  </h4>
                  <p className="text-xs text-slate-500">Generate a formatted summary report of all your milestones and conjectures.</p>
                </div>
                <button
                  onClick={handleCopyReport}
                  className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown Report'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs max-h-72 overflow-y-auto leading-relaxed border border-slate-800 whitespace-pre-wrap">
                {exportProgressReport(progressState)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
