import React, { useState } from 'react';
import { Search, X, ArrowRight, CheckCircle2, Mail, HelpCircle, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { LabTab } from '../../types';
import { OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../data/teamData';

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
  const [contactMsg, setContactMsg] = useState('');
  const [contactDone, setContactDone] = useState(false);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-7 text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Modal */}
        {activeModal === 'search' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900">
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8] focus:bg-white"
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
                    className="p-3 bg-slate-50 hover:bg-sky-50 rounded-xl cursor-pointer transition flex items-center justify-between group border border-slate-100"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-[#0077c8] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#0077c8]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0077c8] group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Contact / Support Modal */}
        {(activeModal === 'support' || activeModal === 'newsletter') && (
          <div className="space-y-4 py-1">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0077c8] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display-bold text-slate-900">
                Contact Math Lab
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Have questions about starting a Local Lab, exploring a National Investigation, or collaborating with our team? Send us a message or reach out directly.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Official Email:</span>
                <a href={`mailto:${OFFICIAL_EMAIL}`} className="font-mono font-bold text-[#0077c8] hover:underline">
                  {OFFICIAL_EMAIL}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Instagram:</span>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-pink-600 hover:underline">
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>

            {contactDone ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thank you! Message noted.</span>
                </div>
                <p className="text-[11px] text-emerald-800/80">
                  For immediate correspondence, you can also email us directly at <strong>{OFFICIAL_EMAIL}</strong>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (contactMsg) setContactDone(true);
                }}
                className="space-y-3 pt-1 text-xs"
              >
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message or Inquiry</label>
                  <textarea
                    rows={3}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="How can we help your school or community chapter?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0077c8] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
