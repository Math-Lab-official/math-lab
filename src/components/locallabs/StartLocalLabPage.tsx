import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Download, 
  Send, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  School, 
  Library, 
  Globe2, 
  ExternalLink, 
  Clock, 
  Mail,
  Check,
  ShieldCheck
} from 'lucide-react';
import { LocalLabInquiry } from '../../types';
import { LocalLabsDirectoryMap, LocalLabChapter } from './LocalLabsDirectoryMap';
import { FacilitatorHandbookModal } from './FacilitatorHandbookModal';
import { STAFF_APPLICATION_URL, OFFICIAL_EMAIL } from '../../data/teamData';
import { downloadFacilitatorStarterKit } from '../../utils/facilitatorKitExport';
import { useAuth } from '../../context/AuthContext';
import { EmailConfirmationModal } from '../common/EmailConfirmationModal';
import { SendEmailOptions } from '../../services/gmailService';

export const StartLocalLabPage: React.FC = () => {
  const { isGmailConnected, googleUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'directory' | 'guide' | 'organizer-form' | 'resources' | 'feedback'>('directory');
  const [isHandbookModalOpen, setIsHandbookModalOpen] = useState<boolean>(false);
  const [handbookSection, setHandbookSection] = useState<number>(1);

  // Email Confirmation State
  const [pendingEmail, setPendingEmail] = useState<SendEmailOptions | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>('Confirm Email Dispatch');
  const [confirmDesc, setConfirmDesc] = useState<string>('');
  const [emailStatusMsg, setEmailStatusMsg] = useState<string>('');

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
  const [newlyCreatedChapter, setNewlyCreatedChapter] = useState<LocalLabChapter | null>(null);

  // Feedback form state
  const [feedbackForm, setFeedbackForm] = useState({
    labName: '',
    facilitatorEmail: '',
    sessionDate: '',
    attendeeCount: '',
    investigationExplored: 'The Chromatic Invariants of Integer Lattices',
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

    const venueType: 'library' | 'school' | 'community' = 
      organizerForm.role === 'educator' ? 'school' : 
      organizerForm.organizationOrVenue.toLowerCase().includes('library') ? 'library' : 
      organizerForm.organizationOrVenue.toLowerCase().includes('school') ? 'school' : 'community';

    const newChapter: LocalLabChapter = {
      id: `local-lab-${Date.now()}`,
      name: organizerForm.organizationOrVenue 
        ? `${organizerForm.organizationOrVenue} Math Lab`
        : `${organizerForm.cityState} Inquiry Circle`,
      cityState: organizerForm.cityState,
      venueType,
      venueName: organizerForm.organizationOrVenue || 'Community Venue',
      facilitatorName: organizerForm.organizerName,
      contactEmail: organizerForm.email,
      meetingFrequency: organizerForm.meetingFrequency,
      groupSize: organizerForm.approximateAttendees,
      status: 'Active Chapter',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    try {
      const existing = localStorage.getItem('math_lab_local_chapters');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newChapter);
      localStorage.setItem('math_lab_local_chapters', JSON.stringify(list));
    } catch {
      // ignore localstorage errors
    }

    setNewlyCreatedChapter(newChapter);
    setOrganizerSubmitted(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.labName || !feedbackForm.facilitatorEmail) return;

    try {
      const existing = localStorage.getItem('math_lab_session_reports');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift({
        ...feedbackForm,
        id: `report-${Date.now()}`,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('math_lab_session_reports', JSON.stringify(list));
    } catch {
      // ignore
    }

    setFeedbackSubmitted(true);
  };

  return (
    <div className="space-y-10 py-2">
      {/* Page Header Blueprint Grid */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1527] p-8 sm:p-12 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>Community-Based Math Exploration</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Start a Local Math Lab
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Local Labs are student- and educator-led community groups that gather in schools, public libraries, and community centers to explore Math Lab's National Investigations and collaborate on original mathematical thinking.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>100% Free Materials & Toolkits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-sky-400" />
              <span>Operates in Any Community Space</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-amber-400" />
              <span>Nationwide Network of Discovery</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 sm:px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 ${
                activeTab === 'directory'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Globe2 className="w-4 h-4 text-sky-300" />
              <span>Chapter Directory</span>
            </button>
            <button
              onClick={() => {
                setHandbookSection(1);
                setIsHandbookModalOpen(true);
              }}
              className="px-4 sm:px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-xs flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Facilitator Handbook</span>
            </button>
            <button
              onClick={downloadFacilitatorStarterKit}
              className="px-4 sm:px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Starter Kit (.md)</span>
            </button>
            <button
              onClick={() => setActiveTab('organizer-form')}
              className="px-4 sm:px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider bg-[#0077c8] hover:bg-[#005fa3] text-white transition shadow-xs flex items-center gap-2"
            >
              <span>Register Your Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition flex items-center gap-1.5 ${
            activeTab === 'directory'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Chapter Directory</span>
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition ${
            activeTab === 'guide'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Practical Startup Guide
        </button>
        <button
          onClick={() => setActiveTab('organizer-form')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition ${
            activeTab === 'organizer-form'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Register Chapter / Request Curriculum
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition ${
            activeTab === 'resources'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Facilitator Resources & Kits
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 text-xs font-bold rounded-md transition ${
            activeTab === 'feedback'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Session Reporting
        </button>
      </div>

      {/* Tab 0: Find a Local Lab & Directory */}
      {activeTab === 'directory' && (
        <div className="animate-in fade-in">
          <LocalLabsDirectoryMap
            onNavigateToOrganizerForm={() => setActiveTab('organizer-form')}
          />
        </div>
      )}

      {/* Tab 1: Practical Startup Guide */}
      {activeTab === 'guide' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
                Foundations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
                What is a Local Math Lab?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A Local Math Lab is an informal, collaborative learning environment where students meet regularly to investigate mathematical questions together. Unlike a traditional tutoring center or contest drill session, a Local Lab is driven by inquiry: participants test conjectures, build visual models, debate different proof strategies, and contribute their insights to the monthly National Investigation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-md bg-sky-100 dark:bg-sky-950 text-[#0077c8] dark:text-sky-400 flex items-center justify-center">
                  <School className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Middle & High Schools</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Operate as an after-school math club, lunch-hour investigation circle, or an enrichment component for enthusiastic students seeking exploration beyond routine curricula.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                  <Library className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Public Libraries</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Libraries love youth enrichment programs! Host a free weekend or afternoon circle in a study room or meeting hall with access to whiteboards and tables.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Community Spaces & Centers</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  YMCAs, community centers, homeschooling co-ops, and local cultural centers offer accessible spaces for cross-school collaboration and peer mentorship.
                </p>
              </div>
            </div>
          </div>

          {/* 4-Step Guide */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
                Action Plan
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
                A Practical 4-Step Guide to Starting Your Chapter
              </h2>
              <p className="text-xs text-slate-500">
                Follow this proven roadmap to establish a vibrant Local Math Lab in your community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="w-7 h-7 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Identify a Host Location</h4>
                  <p className="leading-relaxed">
                    Contact your school's math department chair, student activities director, or youth services librarian. Ask for a quiet room with a table, chairs, and whiteboard for 60 to 90 minutes.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 italic">
                    Tip: Most public libraries provide meeting rooms free of charge for student-led educational activities!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="w-7 h-7 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Register Your Chapter</h4>
                  <p className="leading-relaxed">
                    Submit the Local Lab registration form on this page so our national team connects with you, lists your chapter in our directory, and sends facilitator guidebooks and printable materials.
                  </p>
                  <button
                    onClick={() => setActiveTab('directory')}
                    className="inline-flex items-center gap-1.5 text-[#0077c8] dark:text-sky-400 hover:underline font-bold text-xs pt-1"
                  >
                    <span>View currently active local labs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="w-7 h-7 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Promote & Host Session #1</h4>
                  <p className="leading-relaxed">
                    Print our customizable session flyers. Start your first session with a Level 1 concrete experiment from the current National Investigation. Encourage students to draw on whiteboards and work in small pairs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div className="w-7 h-7 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Synthesize & Share Findings</h4>
                  <p className="leading-relaxed">
                    At the close of your session, take photos of student whiteboards or notes. Submit your chapter's conjectures or proofs to the National Review committee to be featured in the monthly digest!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setActiveTab('organizer-form')}
                className="px-6 py-3 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold text-xs uppercase tracking-wider rounded-md transition shadow-xs inline-flex items-center gap-2"
              >
                <span>Register a Local Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Organizer Registration Form */}
      {activeTab === 'organizer-form' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
              Registration & Onboarding
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white mt-1">
              Local Lab Chapter Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Starting a new Local Lab or requesting investigation packets for an existing group? Fill out this registration to join the national directory and receive starter materials.
            </p>
          </div>

          {organizerSubmitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-emerald-950 dark:text-emerald-100">
                Chapter Successfully Registered!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-300/90 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{organizerForm.organizerName}</strong>! Your chapter has been saved and added to the National Directory. Our Outreach committee will reach out to <strong>{organizerForm.email}</strong> with your customized packet.
              </p>

              {newlyCreatedChapter && (
                <div className="max-w-md mx-auto p-4 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-md text-left text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 dark:text-white">{newlyCreatedChapter.name}</div>
                  <div className="text-slate-500">{newlyCreatedChapter.cityState} · {newlyCreatedChapter.meetingFrequency}</div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">Status: Active in Local Directory</div>
                </div>
              )}

              {emailStatusMsg && (
                <div className="max-w-md mx-auto p-3 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{emailStatusMsg}</span>
                </div>
              )}

              {/* Gmail Action Hub */}
              <div className="max-w-md mx-auto p-4 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#ea4335]" />
                    <span>Gmail Confirmation Options</span>
                  </span>
                  {isGmailConnected && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Connected
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const subject = `Welcome to Math Lab: Chapter Registration for ${organizerForm.organizationOrVenue || organizerForm.cityState}`;
                      const body = `Dear ${organizerForm.organizerName},\n\nCongratulations on establishing your local Math Lab chapter!\n\nChapter: ${organizerForm.organizationOrVenue || organizerForm.cityState}\nCity/State: ${organizerForm.cityState}\nMeeting Frequency: ${organizerForm.meetingFrequency}\nEstimated Group: ${organizerForm.approximateAttendees}\n\nYour chapter has been officially indexed in our directory. Next steps:\n1. Download the Facilitator Starter Kit\n2. Introduce our "One Investigation → Multiple Levels → Shared Discovery" model to your participants\n3. Contact us at ${OFFICIAL_EMAIL} if you require printed student investigation materials.\n\nWarm regards,\nMath Lab National Outreach Committee`;

                      setPendingEmail({
                        to: organizerForm.email,
                        subject,
                        bodyText: body,
                        fromName: 'Math Lab Local Chapter Directory',
                      });
                      setConfirmTitle('Send Facilitator Confirmation via Gmail');
                      setConfirmDesc(`Dispatch chapter onboarding record to your email (${organizerForm.email})`);
                      setIsConfirmOpen(true);
                    }}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-800 text-left transition"
                  >
                    <div className="font-bold text-slate-800 dark:text-slate-200">Email Me Packet</div>
                    <div className="text-[10px] text-slate-500 truncate">{organizerForm.email}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const subject = `[New Chapter Registered] ${organizerForm.organizationOrVenue || organizerForm.cityState} - Facilitated by ${organizerForm.organizerName}`;
                      const body = `New Local Lab Chapter Onboarded:\n\nOrganizer: ${organizerForm.organizerName}\nEmail: ${organizerForm.email}\nRole: ${organizerForm.role}\nVenue: ${organizerForm.organizationOrVenue || 'Community Venue'}\nCity/State: ${organizerForm.cityState}\nFrequency: ${organizerForm.meetingFrequency}\nAttendees: ${organizerForm.approximateAttendees}\nRequested Materials: ${organizerForm.requestedMaterials.join(', ')}\n\nNotes: ${organizerForm.additionalNotes || 'None'}\n\nTimestamp: ${new Date().toISOString()}`;

                      setPendingEmail({
                        to: OFFICIAL_EMAIL,
                        subject,
                        bodyText: body,
                        fromName: organizerForm.organizerName,
                      });
                      setConfirmTitle('Notify National Team via Gmail');
                      setConfirmDesc(`Send official notification to Math Lab Executive Leadership (${OFFICIAL_EMAIL})`);
                      setIsConfirmOpen(true);
                    }}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-800 text-left transition"
                  >
                    <div className="font-bold text-slate-800 dark:text-slate-200">Notify Leadership</div>
                    <div className="text-[10px] text-slate-500 truncate">{OFFICIAL_EMAIL}</div>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={downloadFacilitatorStarterKit}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-md transition shadow-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Facilitator Starter Kit (.md)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('directory')}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-md transition shadow-xs"
                >
                  View in Directory
                </button>
                <button
                  type="button"
                  onClick={() => setOrganizerSubmitted(false)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-md"
                >
                  Register Another Lab
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOrganizerSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Organizer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organizerForm.organizerName}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, organizerName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Contact Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={organizerForm.email}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Your Role
                  </label>
                  <select
                    value={organizerForm.role}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  >
                    <option value="student">Student / Student Leader</option>
                    <option value="educator">Teacher / Math Faculty</option>
                    <option value="parent">Parent / Homeschool Facilitator</option>
                    <option value="community_member">Librarian / Community Organizer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Proposed Host Venue
                  </label>
                  <input
                    type="text"
                    value={organizerForm.organizationOrVenue}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, organizationOrVenue: e.target.value })}
                    placeholder="e.g., Central High School, or Downtown Public Library"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    City & State / Region <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organizerForm.cityState}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, cityState: e.target.value })}
                    placeholder="e.g., Chicago, IL or Seattle, WA"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Meeting Frequency
                  </label>
                  <select
                    value={organizerForm.meetingFrequency}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, meetingFrequency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  >
                    <option>Weekly</option>
                    <option>Bi-weekly (Twice a month)</option>
                    <option>Monthly (Aligned with National Investigation)</option>
                    <option>Weekend Workshop Series</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Estimated Group Size
                  </label>
                  <select
                    value={organizerForm.approximateAttendees}
                    onChange={(e) => setOrganizerForm({ ...organizerForm, approximateAttendees: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  >
                    <option>4 - 8 students (Small inquiry circle)</option>
                    <option>8 - 15 students (Standard club / group)</option>
                    <option>15 - 30+ students (School grade / large chapter)</option>
                  </select>
                </div>
              </div>

              {/* Request Materials */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Request Specific Materials from the National Team:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Facilitator Guide & Session Timelines',
                    'Printable Investigation Worksheets (PDF)',
                    'Host Outreach Letter (for principals/librarians)',
                    'Customized Math Lab Session Poster / Flyer',
                    'Pedagogical Hints & Solution Commentary',
                    'Facilitator Onboarding Session'
                  ].map((mat) => {
                    const checked = organizerForm.requestedMaterials.includes(mat);
                    return (
                      <button
                        type="button"
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className={`p-3 rounded-md border text-left flex items-center justify-between transition ${
                          checked
                            ? 'bg-sky-50 dark:bg-sky-950/40 border-[#0077c8] text-slate-900 dark:text-white font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{mat}</span>
                        {checked && <Check className="w-4 h-4 text-[#0077c8] dark:text-sky-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Additional Notes or Questions for the National Team
                </label>
                <textarea
                  rows={3}
                  value={organizerForm.additionalNotes}
                  onChange={(e) => setOrganizerForm({ ...organizerForm, additionalNotes: e.target.value })}
                  placeholder="Tell us about your community, mathematical interests, or any questions about getting started..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold text-xs uppercase tracking-wider rounded-md transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Register Local Lab & Save to Directory</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 3: Facilitator Resources & Session Kits */}
      {activeTab === 'resources' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
                Toolkits & Downloads
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white mt-1">
                Facilitator Resources & Approved Session Kits
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Open access pedagogical templates, session run-downs, and mathematical materials for all facilitators.
              </p>
            </div>
            <button
              onClick={downloadFacilitatorStarterKit}
              className="px-4 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-md transition shadow-xs flex items-center gap-2 self-start"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete Kit (.md)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#0077c8] dark:text-sky-400 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Facilitator Handbook (Full 10 Chapters)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  A comprehensive guide covering our philosophy ("One Investigation → Multiple Levels → Shared Discovery"), host locations, audience building, and session timelines.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Official Math Lab Publication · Open Access</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(1);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-md transition flex items-center justify-center gap-1.5 self-start"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300 dark:text-amber-500" />
                <span>Read Full Handbook</span>
              </button>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>60-Minute Session Run-Down Agenda</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Structured timeline: 30m Setup → 10m Warmup observation → 20m Small-group exploration → 15m Group discussion → 15m Extensions.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Chapter 6 of Facilitator Packet</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(6);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-md transition flex items-center justify-center gap-1.5 self-start"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Session Agenda</span>
              </button>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Host Venue Outreach Email Template</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Pre-written formal outreach email explaining Math Lab's collaborative student inquiry model to present to librarians, principals, and community center directors.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Chapter 2 of Facilitator Packet</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(2);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-md transition flex items-center justify-center gap-1.5 self-start"
              >
                <Mail className="w-3.5 h-3.5 text-purple-300" />
                <span>Copy Outreach Letter</span>
              </button>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Customizable Flyer & Poster Copy</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Printable announcement template to post in school hallways, library bulletin boards, and student common areas with meeting times and room numbers.
                </p>
                <div className="text-[11px] font-mono text-slate-400">Chapter 4 of Facilitator Packet</div>
              </div>
              <button
                onClick={() => {
                  setHandbookSection(4);
                  setIsHandbookModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-md transition flex items-center justify-center gap-1.5 self-start"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>View Flyer Copy</span>
              </button>
            </div>
          </div>

          {/* Join National Staff Callout */}
          <div className="rounded-xl border border-slate-800 bg-[#0d1527] p-6 sm:p-7 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-300">
                National Leadership Opportunity
              </div>
              <h3 className="font-serif text-xl font-normal text-white">
                Apply for a National Staff Position
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We are actively recruiting student mathematicians, curriculum authors, and outreach coordinators across our five national committees.
              </p>
            </div>

            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition shadow-xs flex items-center gap-2"
            >
              <span>Staff Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Tab 4: Session Reporting */}
      {activeTab === 'feedback' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
              Facilitator Debrief
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white mt-1">
              Local Lab Session Outcome Report
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Observations from facilitators help the national team refine investigation prompts, design extensions, and understand student reasoning dynamics.
            </p>
          </div>

          {feedbackSubmitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-emerald-950 dark:text-emerald-100">
                Session Report Received!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-300/90 max-w-lg mx-auto leading-relaxed">
                Thank you for reporting back to the national team. Your notes have been stored and logged for review by the Curriculum & Impact committees.
              </p>

              {emailStatusMsg && (
                <div className="max-w-md mx-auto p-3 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{emailStatusMsg}</span>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const subject = `[Session Debrief] ${feedbackForm.labName} (${feedbackForm.sessionDate || 'Recent Session'})`;
                    const body = `LOCAL LAB SESSION OUTCOME REPORT\n===============================\nChapter: ${feedbackForm.labName}\nFacilitator: ${feedbackForm.facilitatorEmail}\nDate: ${feedbackForm.sessionDate || 'Not specified'}\nAttendees: ${feedbackForm.attendeeCount || 'Not specified'}\nInvestigation: ${feedbackForm.investigationExplored}\n\nSession Highlights & Student Questions:\n${feedbackForm.highlightsAndQuestions}\n\nSuggestions for National Team:\n${feedbackForm.suggestionsForNationalTeam || 'None'}\n\n---\nReported via Math Lab Facilitator Portal`;

                    setPendingEmail({
                      to: OFFICIAL_EMAIL,
                      subject,
                      bodyText: body,
                      fromName: feedbackForm.labName,
                    });
                    setConfirmTitle('Email Session Debrief via Gmail');
                    setConfirmDesc(`Send full outcome debrief to Math Lab National Curriculum Committee (${OFFICIAL_EMAIL})`);
                    setIsConfirmOpen(true);
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-md transition shadow-xs flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Debrief via Gmail</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFeedbackSubmitted(false)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-md transition shadow-xs"
                >
                  Submit Another Report
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Local Lab Chapter Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={feedbackForm.labName}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, labName: e.target.value })}
                    placeholder="e.g., Evanston Public Library Local Lab"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Facilitator Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={feedbackForm.facilitatorEmail}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, facilitatorEmail: e.target.value })}
                    placeholder="facilitator@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={feedbackForm.sessionDate}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, sessionDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Student Attendees
                  </label>
                  <input
                    type="number"
                    value={feedbackForm.attendeeCount}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, attendeeCount: e.target.value })}
                    placeholder="e.g., 14"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Investigation Explored
                </label>
                <input
                  type="text"
                  value={feedbackForm.investigationExplored}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, investigationExplored: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Highlights, Conjectures & Discussion Dynamics
                </label>
                <textarea
                  rows={3}
                  value={feedbackForm.highlightsAndQuestions}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, highlightsAndQuestions: e.target.value })}
                  placeholder="Which prompts did participants focus on? Any notable conjectures or whiteboard sketches?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Suggestions or Resource Requests
                </label>
                <textarea
                  rows={3}
                  value={feedbackForm.suggestionsForNationalTeam}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestionsForNationalTeam: e.target.value })}
                  placeholder="What additional materials, visual aids, or hints would help your sessions?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-md transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Submit Session Report</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Facilitator Handbook Modal */}
      <FacilitatorHandbookModal
        isOpen={isHandbookModalOpen}
        onClose={() => setIsHandbookModalOpen(false)}
        initialSection={handbookSection}
      />

      {/* Gmail Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        emailDetails={pendingEmail}
        title={confirmTitle}
        description={confirmDesc || 'Please review before dispatching from your Gmail account.'}
        onSuccess={(res) => {
          setIsConfirmOpen(false);
          setEmailStatusMsg(
            res.type === 'sent'
              ? `Message successfully dispatched via Gmail to ${pendingEmail?.to}!`
              : `Draft saved in your Gmail account.`
          );
        }}
      />
    </div>
  );
};
