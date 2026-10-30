import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  BookOpen, 
  Download, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Sparkles, 
  MessageSquare,
  ArrowRight,
  School,
  Library,
  Compass,
  AlertCircle,
  Globe2,
  ExternalLink,
  Clock,
  Mail
} from 'lucide-react';
import { LocalLabInquiry } from '../../types';
import { LocalLabsDirectoryMap } from './LocalLabsDirectoryMap';
import { FacilitatorHandbookModal } from './FacilitatorHandbookModal';
import { STAFF_APPLICATION_URL, OFFICIAL_EMAIL } from '../../data/teamData';

export const StartLocalLabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'guide' | 'organizer-form' | 'resources' | 'feedback'>('directory');
  const [isHandbookModalOpen, setIsHandbookModalOpen] = useState<boolean>(false);
  const [handbookSection, setHandbookSection] = useState<number>(1);

  // Interest Form state
  const [organizerForm, setOrganizerForm] = useState<LocalLabInquiry>({
    organizerName: '',
    email: '',
    role: 'student',
    organizationOrVenue: '',
    cityState: '',
    meetingFrequency: 'Bi-weekly (Twice a month)',
    approximateAttendees: '8 - 15 students',
    requestedMaterials: ['Facilitator Guide', 'Printable Investigation Worksheets'],
    additionalNotes: ''
  });
  const [organizerSubmitted, setOrganizerSubmitted] = useState<boolean>(false);

  // Feedback form state
  const [feedbackForm, setFeedbackForm] = useState({
    labName: '',
    facilitatorEmail: '',
    sessionDate: '',
    attendeeCount: '',
    investigationExplored: 'The Chromatic Invariants of Integer Lattices (October 2026)',
    highlightsAndQuestions: '',
    suggestionsForNationalTeam: ''
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const toggleMaterial = (material: string) => {
    if (organizerForm.requestedMaterials.includes(material)) {
      setOrganizerForm({
        ...organizerForm,
        requestedMaterials: organizerForm.requestedMaterials.filter((m) => m !== material)
      });
    } else {
      setOrganizerForm({
        ...organizerForm,
        requestedMaterials: [...organizerForm.requestedMaterials, material]
      });
    }
  };

  const handleOrganizerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizerForm.organizerName || !organizerForm.email || !organizerForm.cityState) return;
    setOrganizerSubmitted(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.labName || !feedbackForm.facilitatorEmail) return;
    setFeedbackSubmitted(true);
  };

  return (
    <div className="space-y-12 py-4">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Community-Based Math Exploration</span>
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            START A LOCAL MATH LAB
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Local Labs are student- or educator-led community groups that gather in schools, public libraries, and community centers to explore Math Lab's National Investigations and collaborative mathematics.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Free Materials & Toolkits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Operates in Any Community Space</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Connected to a Nationwide Network</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'directory'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Globe2 className="w-4 h-4 text-sky-300" />
              <span>Chapter Directory (Coming Soon)</span>
            </button>
            <button
              onClick={() => {
                setHandbookSection(1);
                setIsHandbookModalOpen(true);
              }}
              className="px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-md flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Facilitator Handbook</span>
            </button>
            <button
              onClick={() => setActiveTab('organizer-form')}
              className="px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-[#0077c8] hover:bg-[#005fa3] text-white transition shadow-md flex items-center gap-2"
            >
              <span>Start a New Local Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'directory'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Chapter Directory (Coming Soon)</span>
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'guide'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Practical Startup Guide
        </button>
        <button
          onClick={() => setActiveTab('organizer-form')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'organizer-form'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Organizer Interest & Curriculum Form
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'resources'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Facilitator Resources & Session Kits
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'feedback'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Facilitator Feedback & Session Reporting
        </button>
      </div>

      {/* Tab 0: Find a Local Lab & Community Partners (Searchable Map & Directory) */}
      {activeTab === 'directory' && (
        <div className="animate-in fade-in">
          <LocalLabsDirectoryMap
            onNavigateToOrganizerForm={() => setActiveTab('organizer-form')}
          />
        </div>
      )}

      {/* Tab 1: Practical Startup Guide */}
      {activeTab === 'guide' && (
        <div className="space-y-10 animate-in fade-in">
          {/* What is a Local Math Lab */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="max-w-3xl space-y-2">
              <h2 className="font-display-bold text-2xl font-bold text-slate-900">
                What is a Local Math Lab?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                A Local Math Lab is an informal, collaborative learning environment where students meet regularly to investigate mathematical questions together. Unlike a traditional tutoring center or test-prep class, a Local Lab is driven by inquiry: participants test conjectures, build visual models, debate different proof strategies, and contribute their insights to the monthly National Investigation.
              </p>
            </div>

            {/* Where Can One Operate */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0077c8] flex items-center justify-center">
                  <School className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Middle & High Schools</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Operate as an after-school math club, lunch-hour investigation circle, or an enrichment component for enthusiastic students seeking exploration beyond routine curricula.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Library className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Public Libraries</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Libraries love youth enrichment programs! Host a free weekend or afternoon circle in a study room or meeting hall with access to whiteboards and tables.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Community Spaces & Centers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  YMCAs, community centers, homeschooling co-ops, and local cultural centers offer accessible spaces for cross-school collaboration and peer mentorship.
                </p>
              </div>
            </div>
          </div>

          {/* Practical 4-Step Guide to Finding a Host Location */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="font-display-bold text-2xl font-bold text-slate-900">
                A Practical 4-Step Guide to Starting Your Chapter
              </h2>
              <p className="text-xs text-slate-500">
                Follow this proven roadmap to establish a vibrant Local Math Lab in your community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <h4 className="font-bold text-sm text-slate-900">Identify a Host Location</h4>
                  <p className="leading-relaxed">
                    Contact your school’s math department chair, student activities director, or youth services librarian. Ask for a quiet room with a table, chairs, and whiteboard for 60 to 90 minutes.
                  </p>
                  <p className="text-slate-500 italic">
                    Tip: Most public libraries and community centers provide meeting rooms free of charge for student-led educational activities and youth clubs!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <h4 className="font-bold text-sm text-slate-900">Register with the National Team</h4>
                  <p className="leading-relaxed">
                    Submit the Local Lab interest form on this page so our national team can connect with you, add your chapter to our directory, and send facilitator guidebooks and printable materials.
                  </p>
                  <button
                    onClick={() => setActiveTab('directory')}
                    className="inline-flex items-center gap-1.5 text-[#0077c8] hover:text-[#005fa3] font-bold text-xs pt-1 group"
                  >
                    <span>View currently active local labs & partners on the map</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <h4 className="font-bold text-sm text-slate-900">Invite Participants & Host First Session</h4>
                  <p className="leading-relaxed">
                    Print our customizable session flyers. Start your first session with a Level 1 concrete experiment from the current National Investigation. Encourage students to draw on whiteboards and work in small pairs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <h4 className="font-bold text-sm text-slate-900">Synthesize & Share Findings</h4>
                  <p className="leading-relaxed">
                    At the close of your session, take photos of student whiteboards or notes. Submit your chapter’s conjectures or proofs to the National Review committee to be featured in the monthly digest!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => setActiveTab('organizer-form')}
                className="px-6 py-3.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md inline-flex items-center gap-2"
              >
                <span>Fill Out Local Lab Organizer Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Organizer Interest & Curriculum Request Form */}
      {activeTab === 'organizer-form' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h2 className="font-display-bold text-2xl font-bold text-slate-900">
              Local Lab Organizer & Curriculum Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Interested in starting a Local Lab or requesting investigation packets for an existing group? Fill out this brief form and our Outreach & Communications committee will assist you with onboarding.
            </p>
          </div>

          {organizerSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display-bold text-xl font-bold text-emerald-950">
                Local Lab Inquiry Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900/80 max-w-lg mx-auto leading-relaxed">
                Thank you for your leadership in bringing mathematical exploration to your community! Our Outreach & Communications committee will reach out to <strong>{organizerForm.email}</strong> within 2–3 business days with facilitator guides and onboarding resources.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setOrganizerSubmitted(false)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-xs"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOrganizerSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Organizer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organizerForm.organizerName}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, organizerName: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Contact Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={organizerForm.email}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Your Role
                  </label>
                  <select
                    value={organizerForm.role}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  >
                    <option value="student">Student / Student Leader</option>
                    <option value="educator">Teacher / Math Faculty</option>
                    <option value="parent">Parent / Homeschool Facilitator</option>
                    <option value="community_member">Librarian / Community Organizer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Proposed Host Venue
                  </label>
                  <input
                    type="text"
                    value={organizerForm.organizationOrVenue}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, organizationOrVenue: e.target.value })}
                    placeholder="e.g., Central High School, or Downtown Public Library"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    City & State / Region <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organizerForm.cityState}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, cityState: e.target.value })}
                    placeholder="e.g., Chicago, IL or Seattle, WA"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Target Meeting Frequency
                  </label>
                  <select
                    value={organizerForm.meetingFrequency}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, meetingFrequency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  >
                    <option>Weekly</option>
                    <option>Bi-weekly (Twice a month)</option>
                    <option>Monthly (Aligned with National Investigation)</option>
                    <option>Special Weekend Workshop Series</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Estimated Student Group Size
                  </label>
                  <select
                    value={organizerForm.approximateAttendees}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, approximateAttendees: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  >
                    <option>4 - 8 students (Small inquiry circle)</option>
                    <option>8 - 15 students (Standard club / group)</option>
                    <option>15 - 30+ students (School grade / large chapter)</option>
                  </select>
                </div>
              </div>

              {/* Request Curriculum / Materials checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Request Specific Materials from the National Team:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Facilitator Guide & Session Timelines',
                    'Printable Investigation Worksheets (PDF)',
                    'Host Outreach Letter (for principals/librarians)',
                    'Customized Math Lab Session Poster / Flyer',
                    'Pedagogical Hints & Solution Commentary',
                    'Video / Zoom Facilitator Onboarding Session'
                  ].map((mat) => {
                    const checked = organizerForm.requestedMaterials.includes(mat);
                    return (
                      <button
                        type="button"
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                          checked
                            ? 'bg-sky-50 border-[#0077c8] text-slate-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{mat}</span>
                        {checked && <CheckCircle2 className="w-4 h-4 text-[#0077c8] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Additional Notes or Questions for the National Team
                </label>
                <textarea
                  rows={3}
                  value={organizerForm.additionalNotes}
                  onChange={(e) => setOrganizerForm({ ...organizerForm, additionalNotes: e.target.value })}
                  placeholder="Tell us about your community, specific mathematical interests, or any questions about getting started..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Local Lab Registration & Material Request</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 3: Facilitator Resources & Approved Session Kits */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8 animate-in fade-in">
          <div>
            <h2 className="font-display-bold text-2xl font-bold text-slate-900">
              Facilitator Resources & Approved Session Kits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All approved Local Lab facilitators receive open access to pedagogical templates, session run-downs, and mathematical materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#0077c8] font-bold text-sm">
                  <FileText className="w-5 h-5" />
                  <span>Local Lab Facilitator Handbook (Full 10 Chapters)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A comprehensive guide covering our philosophy ("One Investigation → Multiple Levels → Shared Discovery"), host locations, audience building, session timelines, and launch checklist.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Official Math Lab Publication • Open Access</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(1);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 self-start"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Read Full Facilitator Handbook</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <FileText className="w-5 h-5" />
                  <span>60-Minute Session Run-Down Agenda</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Step-by-step timeline: Arrive 30 mins early → 10m Warmup observation → 20m Small-group experimentation → 15m Group synthesis → 15m Rigorous extensions.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Chapter 6 of Facilitator Packet</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(6);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 self-start"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Session Agenda & Questions</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                  <FileText className="w-5 h-5" />
                  <span>Host Venue Outreach Email Template</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pre-written formal outreach email explaining Math Lab's collaborative student inquiry model to present to librarians, principals, and community center directors.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Chapter 2 of Facilitator Packet</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(2);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 self-start"
              >
                <Mail className="w-3.5 h-3.5 text-purple-300" />
                <span>Copy Host Outreach Letter</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                  <FileText className="w-5 h-5" />
                  <span>Customizable Session Poster & Flyer Kit</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Printable announcement template to post in school hallways, library bulletin boards, and student common areas with meeting times and room numbers.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Chapter 4 of Facilitator Packet</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(4);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 self-start"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>View Flyer & Announcement Kit</span>
              </button>
            </div>
          </div>

          {/* Join National Staff Callout */}
          <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Want to Help Lead Math Lab Nationally?</span>
              </div>
              <h3 className="font-display-bold text-lg sm:text-xl font-bold text-white">
                Apply for a National Staff Position
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We are actively recruiting passionate student mathematicians, curriculum writers, graphic designers, and outreach coordinators across our five national committees.
              </p>
            </div>

            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2"
            >
              <span>Staff Application Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Tab 4: Feedback Collection & Session Reporting */}
      {activeTab === 'feedback' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h2 className="font-display-bold text-2xl font-bold text-slate-900">
              Local Lab Session Feedback & Outcome Reporting
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consistent feedback from Local Lab facilitators enables Math Lab to refine future National Investigations, improve pedagogy, and understand student reasoning dynamics.
            </p>
          </div>

          {feedbackSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display-bold text-xl font-bold text-emerald-950">
                Session Report Received!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900/80 max-w-lg mx-auto leading-relaxed">
                Thank you for reporting back to the national team. Your observations help our Mathematical Investigations & Curriculum and Research & Impact committees evaluate what prompts stimulate the deepest student discourse.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setFeedbackSubmitted(false)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-xs"
                >
                  Submit Another Report
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Local Lab Chapter Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={feedbackForm.labName}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, labName: e.target.value })}
                    placeholder="e.g., Evanston Public Library Local Lab"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Facilitator Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={feedbackForm.facilitatorEmail}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, facilitatorEmail: e.target.value })}
                    placeholder="facilitator@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={feedbackForm.sessionDate}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, sessionDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Number of Student Attendees
                  </label>
                  <input
                    type="number"
                    value={feedbackForm.attendeeCount}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, attendeeCount: e.target.value })}
                    placeholder="e.g., 12"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Investigation Explored
                </label>
                <input
                  type="text"
                  value={feedbackForm.investigationExplored}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, investigationExplored: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Session Highlights, Student Conjectures & Discussion Dynamics
                </label>
                <textarea
                  rows={3}
                  value={feedbackForm.highlightsAndQuestions}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, highlightsAndQuestions: e.target.value })}
                  placeholder="Which levels did students spend the most time on? Did any unexpected conjectures or misconceptions emerge?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Suggestions or Resource Requests for the National Team
                </label>
                <textarea
                  rows={3}
                  value={feedbackForm.suggestionsForNationalTeam}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestionsForNationalTeam: e.target.value })}
                  placeholder="What additional materials, visual aids, or hints would have helped your session run more smoothly?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Session Report</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Facilitator Handbook Modal (Full 10 Chapters) */}
      <FacilitatorHandbookModal
        isOpen={isHandbookModalOpen}
        onClose={() => setIsHandbookModalOpen(false)}
        initialSection={handbookSection}
      />
    </div>
  );
};
