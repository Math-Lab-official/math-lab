import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  LogOut, 
  Sparkles, 
  ExternalLink, 
  AlertCircle,
  FileText,
  UserCheck,
  RefreshCw,
  Inbox
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_EMAIL } from '../../data/teamData';
import { EmailConfirmationModal } from './EmailConfirmationModal';
import { SendEmailOptions } from '../../services/gmailService';

interface GmailCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRecipient?: string;
  defaultSubject?: string;
  defaultBody?: string;
}

export const GmailCenterModal: React.FC<GmailCenterModalProps> = ({
  isOpen,
  onClose,
  defaultRecipient = OFFICIAL_EMAIL,
  defaultSubject = 'Math Lab Inquiry & Collaboration',
  defaultBody = '',
}) => {
  const { 
    isGmailConnected, 
    googleUser, 
    gmailProfile, 
    signInWithGoogle, 
    disconnectGoogle, 
    isConnecting, 
    refreshGmailProfile,
    authError,
    clearAuthError
  } = useAuth();

  const [to, setTo] = useState(defaultRecipient);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [template, setTemplate] = useState<string>('custom');

  // Confirmation modal state
  const [pendingEmail, setPendingEmail] = useState<SendEmailOptions | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [lastSentResult, setLastSentResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyTemplate = (type: string) => {
    setTemplate(type);
    if (type === 'general') {
      setTo(OFFICIAL_EMAIL);
      setSubject('General Inquiry: Math Lab National Initiative');
      setBody(`Hello Math Lab Team,\n\nI am reaching out regarding your open mathematical investigations and student inquiry resources.\n\n[Please enter your question, feedback, or school details here]\n\nBest regards,\n${googleUser?.displayName || '[Your Name]'}`);
    } else if (type === 'chapter') {
      setTo(OFFICIAL_EMAIL);
      setSubject('Starting a Local Math Lab Chapter: Facilitation Inquiry');
      setBody(`Hello Math Lab Team,\n\nI am interested in establishing a student-led Local Math Lab chapter in our community.\n\nLocation: [City, State / School / Library]\nIntended Frequency: [e.g. Bi-weekly]\nEstimated Attendees: [e.g. 10-15 students]\n\nWe would appreciate guidance and access to the Facilitator Starter Kit.\n\nWarm regards,\n${googleUser?.displayName || '[Your Name]'}`);
    } else if (type === 'research') {
      setTo(OFFICIAL_EMAIL);
      setSubject('Investigation Submission Question / Proof Feedback');
      setBody(`Dear Math Lab Curriculum & Review Committee,\n\nI have been working on the monthly investigation and have a question regarding Level 3 & Level 4 generalizations.\n\nInvestigation: [e.g. Chromatic Invariants of Integer Lattices]\nMy specific conjecture / question:\n[Describe your question or attach link to draft]\n\nThank you for reviewing,\n${googleUser?.displayName || '[Your Name]'}`);
    }
  };

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !subject.trim() || !body.trim()) return;

    setPendingEmail({
      to: to.trim(),
      subject: subject.trim(),
      bodyText: body.trim(),
      fromName: googleUser?.displayName || undefined,
    });
    setIsConfirmOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#ea4335]/10 text-[#ea4335] flex items-center justify-center border border-[#ea4335]/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white">
                    Math Lab Gmail Integration
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Direct API
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Send real correspondence directly from your authenticated Google account
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Account Status Strip */}
          <div className="px-6 py-3.5 bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            {isGmailConnected && googleUser ? (
              <div className="flex items-center gap-3">
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.displayName || 'Google Avatar'}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {(googleUser.displayName || googleUser.email || 'G')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{googleUser.displayName || 'Authenticated Google User'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {googleUser.email}
                    {gmailProfile && (
                      <span className="ml-2 text-slate-400">
                        ({gmailProfile.messagesTotal.toLocaleString()} total messages in mailbox)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>No Google Account connected with Gmail permissions yet.</span>
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {isGmailConnected ? (
                <>
                  <button
                    onClick={refreshGmailProfile}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    title="Refresh Gmail Profile"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={disconnectGoogle}
                    className="px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  disabled={isConnecting}
                  className="px-4 py-2 bg-[#4285f4] hover:bg-[#3367d6] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isConnecting ? 'Authenticating...' : 'Sign in with Google'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Body Content - Scrollable */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            {authError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start justify-between">
                <div>
                  <strong>Authentication notice: </strong>
                  {authError}
                </div>
                <button onClick={clearAuthError} className="text-red-500 hover:text-red-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {lastSentResult && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lastSentResult}</span>
              </div>
            )}

            {/* Quick Templates */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Quick Message Templates
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('general')}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    template === 'general'
                      ? 'border-[#0077c8] bg-sky-50 dark:bg-sky-950/50 text-[#0077c8] dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold">General Inquiry</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Questions for national staff</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate('chapter')}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    template === 'chapter'
                      ? 'border-[#0077c8] bg-sky-50 dark:bg-sky-950/50 text-[#0077c8] dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold">Start Local Lab</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">School/Library venue guidance</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyTemplate('research')}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    template === 'research'
                      ? 'border-[#0077c8] bg-sky-50 dark:bg-sky-950/50 text-[#0077c8] dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold">Research Feedback</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Conjecture & proof inquiries</div>
                </button>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleOpenConfirmation} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Recipient (To)
                </label>
                <input
                  type="email"
                  required
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#0077c8]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject line"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-[#0077c8]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Email Message Body
                </label>
                <textarea
                  rows={6}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#0077c8] leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Sending triggers an explicit confirmation modal before sending via Gmail API.
                </span>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#ea4335] hover:bg-[#d93025] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Review & Send</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Explicit User Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        emailDetails={pendingEmail}
        title="Confirm Gmail Dispatch"
        description="Verify the recipient and content before dispatching from your Gmail account."
        onSuccess={(result) => {
          if (result.type === 'sent') {
            setLastSentResult(`Message successfully sent to ${pendingEmail?.to} via Gmail!`);
            setBody('');
          } else {
            setLastSentResult(`Message draft saved in your Gmail account.`);
          }
          setIsConfirmOpen(false);
        }}
      />
    </>
  );
};
