import React, { useState } from 'react';
import { Search, X, ArrowRight, CheckCircle2, Mail, HelpCircle, BookOpen, Layers, ExternalLink, Send, ShieldCheck } from 'lucide-react';
import { LabTab } from '../../types';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../data/teamData';
import { useAuth } from '../../context/AuthContext';
import { EmailConfirmationModal } from '../common/EmailConfirmationModal';
import { SendEmailOptions } from '../../services/gmailService';

interface SearchAndUtilityModalsProps {
  activeModal: 'search' | 'support' | 'newsletter' | null;
  onClose: () => void;
  onSelectTab: (tab: LabTab) => void;
}

export const SearchAndUtilityModals: React.FC<SearchAndUtilityModalsProps> = ({
  activeModal,
  onClose,
  onSelectTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Inquiry regarding Math Lab National Initiative');
  const [contactMsg, setContactMsg] = useState('');
  const [contactDone, setContactDone] = useState(false);
  const [pendingGmail, setPendingGmail] = useState<SendEmailOptions | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { isGmailConnected, googleUser } = useAuth();

  if (!activeModal) return null;

  const searchableItems: { title: string; category: string; tab: LabTab; desc: string }[] = [
    { title: 'National Investigations', category: 'Inquiry', tab: 'investigations', desc: 'Monthly mathematical investigations across five levels of depth' },
    { title: 'Chromatic Invariants of Integer Lattices', category: 'Investigation', tab: 'investigations', desc: 'Featured October 2026 investigation on grid colorings and monochromatic rectangles' },
    { title: 'Chord Invariants of the Unit Circle', category: 'Investigation', tab: 'investigations', desc: 'Archived September 2026 investigation on intersecting secants and angle sums' },
    { title: 'Schur Partitions & Additive Triples', category: 'Investigation', tab: 'investigations', desc: 'Archived August 2026 investigation on sum-free partitions and Ramsey bounds' },
    { title: 'Share Your Work', category: 'Submissions', tab: 'share-work', desc: 'Submit investigation solutions, alternative approaches, conjectures & proofs' },
    { title: 'Start a Local Math Lab', category: 'Community', tab: 'local-labs', desc: 'Practical guide to hosting in schools/libraries, facilitator toolkits & registration' },
    { title: 'Local Chapter Directory & Map', category: 'Community', tab: 'local-labs', desc: 'Searchable directory of student-led Math Lab chapters and community partners' },
    { title: 'Facilitator Handbook (10 Chapters)', category: 'Resources', tab: 'local-labs', desc: 'Full practical guide, copyable host outreach email, and launch checklist' },
    { title: 'Meet the Team & 5 Staff Committees', category: 'Team', tab: 'team', desc: 'Executive leadership and 5 staff committees with staff application form' },
    { title: 'Staff Member Application', category: 'Opportunities', tab: 'team', desc: 'Official Google Form application for student committee staff roles' },
    { title: 'About Math Lab (Non-Profit)', category: 'About', tab: 'about', desc: 'Why Math Lab exists, the two pillars, our seven principles, and non-profit mission' },
    { title: 'National Programming & Events', category: 'Events', tab: 'events', desc: 'Online national events, colloquia, and showcases (Coming soon in ~3 months)' },
    { title: 'Digital Inquiry Labs', category: 'Labs', tab: 'laboratories', desc: 'Interactive browser-based visualization tools (Coming soon under Technology committee)' },
  ];

  const filtered = searchableItems.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMsg.trim()) return;

    const senderEmail = contactEmail.trim() || googleUser?.email || 'Scholar';
    const emailBody = `From: ${contactName} (${senderEmail})\nTo: Math Lab Executive & Curriculum Leadership\nSubject: ${contactSubject}\n\nMessage:\n${contactMsg}\n\n---\nSent via Math Lab Portal`;

    setPendingGmail({
      to: OFFICIAL_EMAIL,
      subject: `[Math Lab Inquiry] ${contactSubject} - from ${contactName}`,
      bodyText: emailBody,
      fromName: contactName,
    });
    setIsConfirmOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
        <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search Modal */}
          {activeModal === 'search' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Search className="w-4 h-4 text-[#0077c8]" />
                <span>Search Math Lab Inquiries & Resources</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search topics (e.g. lattices, handbook, start a lab, team)..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0077c8] focus:bg-white dark:focus:bg-slate-800"
                />
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 pt-1">
                {filtered.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No matching resources found for "{searchTerm}"
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div
                      key={item.title}
                      onClick={() => {
                        onSelectTab(item.tab);
                        onClose();
                      }}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition flex items-center justify-between group border border-slate-100 dark:border-slate-800"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[#0077c8] dark:text-sky-300">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077c8] dark:group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Contact / Support Modal */}
          {(activeModal === 'support' || activeModal === 'newsletter') && (
            <div className="space-y-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-[#ea4335] flex items-center justify-center border border-red-100 dark:border-red-900/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Contact Math Lab</span>
                    {isGmailConnected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Gmail Ready
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Send inquiries directly to the team via Gmail API
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Official Recipient:</span>
                  <a href={`mailto:${OFFICIAL_EMAIL}`} className="font-mono font-bold text-[#0077c8] dark:text-sky-400 hover:underline">
                    {OFFICIAL_EMAIL}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Instagram:</span>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-pink-600 dark:text-pink-400 hover:underline">
                    {INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>

              {contactDone ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Inquiry successfully sent via Gmail!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                    A copy has been recorded in your Gmail mailbox. Our curriculum and chapter leadership will review it shortly.
                  </p>
                  <button
                    onClick={() => setContactDone(false)}
                    className="mt-2 text-xs font-bold text-[#0077c8] dark:text-sky-400 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 pt-1 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Email (optional)</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder={googleUser?.email || "scholar@example.com"}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Message or Question</label>
                    <textarea
                      rows={3}
                      required
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="How can we help your school, chapter, or mathematical inquiry?"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Dispatched securely via Gmail API
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#ea4335] hover:bg-[#d93025] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Review & Send via Gmail</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        emailDetails={pendingGmail}
        title="Confirm Gmail Dispatch to Math Lab"
        description="Verify your message before dispatching from your Gmail account to mathlab.official12@gmail.com."
        onSuccess={() => {
          setIsConfirmOpen(false);
          setContactDone(true);
          setContactMsg('');
        }}
      />
    </>
  );
};

