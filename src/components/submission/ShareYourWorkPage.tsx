import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  FileText, 
  Shield, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  HelpCircle, 
  Upload, 
  Lock,
  Layers,
  Award,
  Users
} from 'lucide-react';
import { NATIONAL_INVESTIGATIONS } from '../../data/investigationsData';
import { StudentSubmission } from '../../types';

interface Props {
  onNavigateHome?: () => void;
}

export interface SavedSubmission {
  id: string;
  studentNameOrTeam: string;
  email: string;
  gradeLevel: string;
  schoolOrLocalLab: string;
  investigationId: string;
  investigationTitle: string;
  levelAddressed: number;
  title: string;
  summaryOfApproach: string;
  conjecturesOrProofs: string;
  externalDocumentUrl: string;
  timestamp: number;
  status: string;
}

export const ShareYourWorkPage: React.FC<Props> = () => {
  const [formData, setFormData] = useState({
    studentNameOrTeam: '',
    email: '',
    gradeLevel: 'High School (Grades 9-12)',
    schoolOrLocalLab: '',
    investigationId: NATIONAL_INVESTIGATIONS[0].id,
    levelAddressed: 1,
    title: '',
    summaryOfApproach: '',
    conjecturesOrProofs: '',
    externalDocumentUrl: '',
    allowPublicDisplayWithPermission: false,
  });

  const [submissions, setSubmissions] = useState<SavedSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('math_lab_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentNameOrTeam.trim() || !formData.email.trim() || !formData.summaryOfApproach.trim()) {
      setErrorMsg('Please complete all required fields (Name/Team, Email, and Summary of Approach).');
      return;
    }

    const currentInv = NATIONAL_INVESTIGATIONS.find((i) => i.id === formData.investigationId);
    const newSubmission: SavedSubmission = {
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      ...formData,
      investigationTitle: currentInv ? `${currentInv.month} ${currentInv.year}: ${currentInv.title}` : 'Independent Inquiry',
      timestamp: Date.now(),
      status: 'Received & In Committee Queue',
    };

    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('math_lab_submissions', JSON.stringify(updated));

    setErrorMsg('');
    setSubmittedId(newSubmission.id);
  };

  const downloadReceipt = (sub: SavedSubmission) => {
    let md = `# Math Lab — Submission Confirmation Receipt\n`;
    md += `**Receipt ID:** ${sub.id}\n`;
    md += `**Date of Submission:** ${new Date(sub.timestamp).toLocaleString()}\n`;
    md += `**Student / Collaborative Team:** ${sub.studentNameOrTeam}\n`;
    md += `**Contact Email:** ${sub.email}\n`;
    md += `**Institution / Local Lab:** ${sub.schoolOrLocalLab || 'Self-Guided'}\n`;
    md += `**Investigation:** ${sub.investigationTitle}\n`;
    md += `**Highest Level Addressed:** Level ${sub.levelAddressed}\n`;
    md += `**Approach Title:** ${sub.title || 'Untitled Approach'}\n\n`;
    md += `### Summary of Approach\n${sub.summaryOfApproach}\n\n`;
    if (sub.conjecturesOrProofs) {
      md += `### Formulated Conjectures & Invariants\n${sub.conjecturesOrProofs}\n\n`;
    }
    if (sub.externalDocumentUrl) {
      md += `### External Document / LaTeX Source\n${sub.externalDocumentUrl}\n\n`;
    }
    md += `\n---\n*Status:* ${sub.status}\n*Review Body:* Math Lab Solutions Review & Student Scholarship Committee\n`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mathlab-receipt-${sub.id}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      studentNameOrTeam: '',
      email: '',
      gradeLevel: 'High School (Grades 9-12)',
      schoolOrLocalLab: '',
      investigationId: NATIONAL_INVESTIGATIONS[0].id,
      levelAddressed: 1,
      title: '',
      summaryOfApproach: '',
      conjecturesOrProofs: '',
      externalDocumentUrl: '',
      allowPublicDisplayWithPermission: false,
    });
    setSubmittedId(null);
  };

  return (
    <div className="space-y-8 py-2 transition-colors">
      {/* Header Banner */}
      <div className="bg-[#0d1527] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400">
            <line x1="0" y1="200" x2="1000" y2="200" stroke="currentColor" strokeWidth="2" />
            <line x1="500" y1="0" x2="500" y2="400" stroke="currentColor" strokeWidth="2" />
            <circle cx="500" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
            <Send className="w-3.5 h-3.5" />
            <span>Student Research Submission Portal</span>
            <span aria-hidden="true">·</span>
            <span>Solutions Review Committee</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Share Your Mathematical Work
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Mathematics advances through shared inquiry, multiple perspectives, and constructive dialogue. Submit findings, partial solutions, counterexamples, or formal proofs for review by our Student Scholarship Committee.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'submit'
                  ? 'bg-[#0077c8] text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              Submit Investigation Work
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'history'
                  ? 'bg-[#0077c8] text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              My Submissions ({submissions.length})
            </button>
          </div>
        </div>
      </div>

      {/* What Students Can Submit Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
        <div>
          <h2 className="font-display-bold text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            What Can You Submit?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            You do not need a complete, polished textbook proof to share your work with Math Lab. We celebrate genuine mathematical thinking in all forms:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-300 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Complete or Partial Solutions</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Deductive arguments, algebraic derivations, or geometric proofs addressing any of the five levels of depth for the current or archived investigations.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Alternative & Visual Approaches</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Different ways of viewing the problem: visual proofs-without-words, dynamic coordinates, modular symmetries, or combinatorial analogies.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Conjectures, Patterns & Extensions</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Empirical patterns found on graph paper or code, unexpected invariants, proposed generalizations, or intriguing unsolved follow-up questions.
            </p>
          </div>
        </div>
      </div>

      {/* External Form Placeholder Notice */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/40 dark:to-blue-950/40 border-2 border-dashed border-[#0077c8]/40 dark:border-sky-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0077c8]/10 dark:bg-sky-500/20 text-[#0077c8] dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Official Submission Link (Space Reserved)</span>
          </div>
          <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white">
            National Investigation Official Google Form
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The national executive board is preparing a dedicated Google Form for direct file uploads (handwritten scans, LaTeX PDFs, code notebooks). For now, space is reserved here, and you can submit directly using our secure in-app workflow below!
          </p>
        </div>

        <div className="shrink-0 text-center">
          <button 
            type="button"
            className="px-6 py-3 bg-slate-900/10 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl cursor-not-allowed border border-slate-300 dark:border-slate-700"
            disabled
          >
            Google Form Link (Launching Soon)
          </button>
          <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-1">Use in-app form below</span>
        </div>
      </div>

      {/* Two Column Section: Submission Form & Submission Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Submission Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-display-bold text-xl font-bold text-slate-900 dark:text-white">
              Submit Your Investigation Findings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Submissions are read by the Solutions Review & Student Scholarship committee.
            </p>
          </div>

          {submittedId ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display-bold text-xl font-bold text-emerald-950 dark:text-emerald-200">
                Investigation Submission Received!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-300 max-w-lg mx-auto leading-relaxed">
                Thank you for contributing your mathematical thinking to Math Lab! Our Solutions Review & Student Scholarship committee reviews all incoming student work to highlight unique methods and prepare our monthly synthesis digest.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-xs"
                >
                  Submit Another Finding
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Student or Team Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentNameOrTeam}
                    onChange={(e) => setFormData({ ...formData, studentNameOrTeam: e.target.value })}
                    placeholder="e.g., Emily Bu or Westview Math Lab Group"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Contact Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="For committee feedback and confirmations"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Education Level
                  </label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  >
                    <option>Middle School (Grades 6-8)</option>
                    <option>High School (Grades 9-12)</option>
                    <option>Undergraduate / College</option>
                    <option>Independent Learner / Autodidact</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    School or Local Math Lab Chapter
                  </label>
                  <input
                    type="text"
                    value={formData.schoolOrLocalLab}
                    onChange={(e) => setFormData({ ...formData, schoolOrLocalLab: e.target.value })}
                    placeholder="e.g., Central Library Local Lab, or Self-Guided"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Investigation
                  </label>
                  <select
                    value={formData.investigationId}
                    onChange={(e) => setFormData({ ...formData, investigationId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  >
                    {NATIONAL_INVESTIGATIONS.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.month} {inv.year}: {inv.title.slice(0, 40)}...
                      </option>
                    ))}
                    <option value="independent-inquiry">Independent Mathematical Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Highest Depth Level Addressed
                  </label>
                  <select
                    value={formData.levelAddressed}
                    onChange={(e) => setFormData({ ...formData, levelAddressed: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  >
                    <option value={1}>Level 1: Concrete Observation & Patterns</option>
                    <option value={2}>Level 2: Conjectures & Invariants</option>
                    <option value={3}>Level 3: Algebraic Generalization</option>
                    <option value={4}>Level 4: Rigorous Proof</option>
                    <option value={5}>Level 5: Open Extensions & Synthesis</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Title of Your Approach / Discovery
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., A Pigeonhole Coloring Proof for 3x7 Grids or Symmetric Invariants in Secants"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Summary of Mathematical Approach & Reasoning <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.summaryOfApproach}
                  onChange={(e) => setFormData({ ...formData, summaryOfApproach: e.target.value })}
                  placeholder="Explain how you approached the question, key patterns noticed, intermediate lemmas, or calculations performed..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Conjectures, Proof Steps, or Open Questions
                </label>
                <textarea
                  rows={3}
                  value={formData.conjecturesOrProofs}
                  onChange={(e) => setFormData({ ...formData, conjecturesOrProofs: e.target.value })}
                  placeholder="State your formal conjecture, outline your proof steps, or describe any questions that remain open..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Link to Full Write-Up / PDF / Overleaf / Google Drive (Optional)
                </label>
                <input
                  type="url"
                  value={formData.externalDocumentUrl}
                  onChange={(e) => setFormData({ ...formData, externalDocumentUrl: e.target.value })}
                  placeholder="https://drive.google.com/... or https://www.overleaf.com/read/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              {/* Privacy and Public Display Consent */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={formData.allowPublicDisplayWithPermission}
                    onChange={(e) => setFormData({ ...formData, allowPublicDisplayWithPermission: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0077c8] focus:ring-[#0077c8]"
                  />
                  <label htmlFor="privacyConsent" className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Publication Permission (Optional):</strong> I permit Math Lab to highlight mathematical insights or excerpts from this submission in the monthly National Synthesis. <span className="text-slate-500 dark:text-slate-400">In accordance with our strict privacy policy, personal contact details and student identifying information are NEVER publicly displayed without explicit prior permission.</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Findings to National Review Committee</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Submission Requirements & Privacy Commitments */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
            <h4 className="font-display-bold text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Review Process & Standards</span>
            </h4>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>1. Peer Review:</strong> Submissions are reviewed monthly by student committee members on the Solutions Review & Student Scholarship committee.
              </p>
              <p>
                <strong>2. Constructive Feedback:</strong> We prioritize recognizing the reasoning, unique lemmas, and creative paths taken rather than just checking final answers.
              </p>
              <p>
                <strong>3. Featured Synthesis:</strong> At the close of each investigation cycle, an editorial compilation is published summarizing the diverse proofs, diagrams, and open questions submitted nationwide.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-display-bold text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Privacy & Student Safeguards</span>
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              Math Lab adheres strictly to student safety and privacy principles:
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>We do not sell, share, or monetize any student information.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Personal contact details are never disclosed publicly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Students or teams may choose to be credited with first name & city or remain anonymous.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
