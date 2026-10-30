import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Layers, 
  FileCheck, 
  Share2, 
  BarChart3, 
  Terminal, 
  Mail, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Clock
} from 'lucide-react';
import { STAFF_APPLICATION_URL, OFFICIAL_EMAIL, COMMITTEES } from '../../data/teamData';

interface StaffApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCommitteeId?: string;
}

export const StaffApplicationModal: React.FC<StaffApplicationModalProps> = ({
  isOpen,
  onClose,
  defaultCommitteeId,
}) => {
  const [selectedCommittee, setSelectedCommittee] = useState<string>(
    defaultCommitteeId || 'investigations-curriculum'
  );
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(STAFF_APPLICATION_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const currentComm = COMMITTEES.find((c) => c.id === selectedCommittee) || COMMITTEES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Staff Applications Open</span>
            </div>
            <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-white">
              Join the Math Lab Staff Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Help us expand collaborative mathematical inquiry across communities nationwide. We invite passionate middle school, high school, and undergraduate students to join our five committees.
            </p>
          </div>
        </div>

        {/* Modal Body: Two Columns */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Quick Info Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#0077c8] flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Eligibility</div>
                <div className="text-xs font-bold text-slate-900">Grades 7–12 & College</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Commitment</div>
                <div className="text-xs font-bold text-slate-900">2–4 hours / week (Remote)</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Organization</div>
                <div className="text-xs font-bold text-slate-900">Student-Led Initiative</div>
              </div>
            </div>
          </div>

          {/* Committee Selector Tabs */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Choose a Committee to Explore:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {COMMITTEES.map((comm) => (
                <button
                  key={comm.id}
                  onClick={() => setSelectedCommittee(comm.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    selectedCommittee === comm.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-sky-500/30'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[11px] font-bold leading-tight truncate">
                    {comm.name.split(' ')[0]} {comm.name.split(' ')[1] || ''}
                  </span>
                  <span className={`text-[10px] mt-1 ${selectedCommittee === comm.id ? 'text-sky-300' : 'text-slate-400'}`}>
                    View Details →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Committee Deep-Dive Card */}
          {currentComm && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#0077c8]">
                    Selected Committee Focus
                  </div>
                  <h3 className="font-display-bold text-lg font-bold text-slate-900">
                    {currentComm.name}
                  </h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 self-start">
                  Accepting Applications
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentComm.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    What You'll Work On:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {currentComm.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Helpful Skills & Background:
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentComm.skillsLookedFor.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium px-2.5 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submission Instructions & Link Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ready to Apply? Complete Our Official Google Form</span>
                </h4>
                <p className="text-xs text-emerald-900/80 leading-relaxed max-w-xl">
                  The application takes approximately 10–15 minutes and asks about your mathematical interests, committee preference, and sample ideas. Applications are reviewed on a rolling basis.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                  title="Copy Google Form Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Form Link'}</span>
                </button>

                <a
                  href={STAFF_APPLICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Open Application Form</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-800/80">
              <span className="font-mono truncate max-w-md">
                Direct URL: {STAFF_APPLICATION_URL}
              </span>
              <span>
                Questions? Email <a href={`mailto:${OFFICIAL_EMAIL}`} className="underline font-bold text-emerald-950">{OFFICIAL_EMAIL}</a>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Math Lab • Explore mathematics. Investigate questions. Learn together.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold text-xs"
            >
              Close
            </button>
            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
