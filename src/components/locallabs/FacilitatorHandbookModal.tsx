import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Copy, 
  Check, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Printer, 
  Compass, 
  Building2, 
  Users, 
  Clock, 
  Layers, 
  Send, 
  FileText, 
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';

interface FacilitatorHandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: number;
}

export const FacilitatorHandbookModal: React.FC<FacilitatorHandbookModalProps> = ({
  isOpen,
  onClose,
  initialSection = 1,
}) => {
  const [activeSection, setActiveSection] = useState<number>(initialSection);
  const [copiedEmailTemplate, setCopiedEmailTemplate] = useState<boolean>(false);
  const [copiedFlyerTemplate, setCopiedFlyerTemplate] = useState<boolean>(false);
  
  // Interactive Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'c1': false,
    'c2': false,
    'c3': false,
    'c4': false,
    'c5': false,
    'c6': false,
    'c7': false,
    'c8': false,
    'c9': false,
    'c10': false,
  });

  if (!isOpen) return null;

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const handleCopyEmailTemplate = () => {
    const emailText = `Subject: Request to Host a Local Math Lab

Dear [Contact Name],

My name is [Your Name], and I am organizing a local Math Lab to provide opportunities for students and other community members to explore mathematics through investigation, problem-solving, and collaboration.

Math Lab follows the principle “One Investigation → Multiple Levels → Shared Discovery.” Participants investigate mathematical questions, develop their own approaches, and learn by sharing ideas with others.

I am reaching out to ask whether [Organization Name] might be interested in hosting our Local Lab. We hope to hold sessions at a convenient recurring time, with the activities and intended audience adapted to the needs of the community.

We would be happy to discuss possible scheduling, room availability, supervision requirements, and any policies we would need to follow.

Would you be available to discuss this possibility? Thank you for considering the opportunity to support mathematical exploration in our community.

Best regards,

[Your Name]
Local Lab Facilitator, Math Lab
[Your Contact Information]`;

    navigator.clipboard.writeText(emailText);
    setCopiedEmailTemplate(true);
    setTimeout(() => setCopiedEmailTemplate(false), 2500);
  };

  const handleCopyFlyerTemplate = () => {
    const flyerText = `MATH LAB: EXPLORE MATHEMATICS TOGETHER
One Investigation → Multiple Levels → Shared Discovery

Are you curious about patterns, puzzles, and mathematical discoveries?
Join us for a free, hands-on mathematical investigation session!

Date & Time: [Insert Date, e.g. Saturday, Nov 14, 2:00 PM – 3:30 PM]
Location: [Insert Library / School / Community Room Name & Address]
Who Can Attend: Open to students in grades [K–12 / 6–12]. No previous competition experience required!
Cost: Completely Free

What we do:
• Explore a compelling mathematical mystery together
• Test hypotheses and build visual diagrams
• Collaborate with peers and share unique problem-solving approaches
• Contribute solutions to the national Math Lab network

To register or learn more, contact: [Your Email] or visit [Math Lab Website]`;

    navigator.clipboard.writeText(flyerText);
    setCopiedFlyerTemplate(true);
    setTimeout(() => setCopiedFlyerTemplate(false), 2500);
  };

  const sections = [
    { id: 1, title: '1. Introduction & Philosophy' },
    { id: 2, title: '2. Finding a Host Location' },
    { id: 3, title: '3. Building an Audience' },
    { id: 4, title: '4. Promoting Your First Session' },
    { id: 5, title: '5. Facilitator Responsibilities' },
    { id: 6, title: '6. Running a Math Lab Session' },
    { id: 7, title: '7. Five Levels of Exploration' },
    { id: 8, title: '8. National Investigations' },
    { id: 9, title: '9. Documentation & Resources' },
    { id: 10, title: '10. Launch Checklist' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handbook Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close handbook"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Facilitator Handbook & Practical Packet</span>
            </div>
            <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-white">
              Local Lab Facilitator Handbook
            </h2>
            <p className="font-serif italic text-amber-200 text-sm sm:text-base">
              One Investigation → Multiple Levels → Shared Discovery.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              A practical guide to launching, organizing, and leading your own community Math Lab. You do not need to be an expert in every area of mathematics or have a large budget. You need a place to meet, an interest in helping people explore mathematics, and a willingness to learn alongside your participants.
            </p>
          </div>
        </div>

        {/* Content Container: Sidebar + Section Body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Section Navigation Sidebar */}
          <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-3 sm:p-4 overflow-y-auto shrink-0 space-y-1">
            <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Handbook Chapters
            </div>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-[#0077c8] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <span>{sec.title}</span>
                {activeSection === sec.id && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-slate-200 px-2 space-y-2 text-[11px] text-slate-500">
              <div className="font-bold text-slate-700">Need Guidance?</div>
              <div>Email the national team at:</div>
              <a href={`mailto:${OFFICIAL_EMAIL}`} className="underline text-[#0077c8] font-mono block">
                {OFFICIAL_EMAIL}
              </a>
            </div>
          </div>

          {/* Section Body */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Section 1: Introduction to Math Lab */}
            {activeSection === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 1
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Introduction to Math Lab
                  </h3>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 font-medium">
                    <strong className="block text-sky-900 font-bold mb-1">Our Core Tagline:</strong>
                    "One Investigation → Multiple Levels → Shared Discovery."
                  </div>

                  <h4 className="font-bold text-base text-slate-900">What Is Math Lab?</h4>
                  <p>
                    Math Lab creates opportunities for people to explore mathematics through investigation, experimentation, problem-solving, and discussion. The goal is to make mathematical exploration accessible to a broad audience while encouraging deeper thinking and collaboration.
                  </p>

                  <h4 className="font-bold text-base text-slate-900">What Is a Local Lab?</h4>
                  <p>
                    A Local Lab is a community-based group that brings people together to explore mathematics. It provides a welcoming environment where participants can:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Explore interesting mathematical questions.</li>
                    <li>Work collaboratively to solve problems and share conjectures.</li>
                    <li>Investigate patterns, symmetries, and algebraic relationships.</li>
                    <li>Explain reasoning and compare multiple solution avenues.</li>
                    <li>Participate in Math Lab's broader nationwide network of discovery.</li>
                  </ul>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                    <h5 className="font-bold text-amber-900 text-xs sm:text-sm">
                      Important Note on Facilitator Flexibility:
                    </h5>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Facilitators may teach any topic related to mathematics that they wish! The intended audience may be any age level from kindergarten through grade 12 (K–12). However, Local Labs should dedicate at least a few sessions each month to the current National Investigation and submit a group solution to the Math Lab website.
                    </p>
                  </div>

                  <h4 className="font-bold text-base text-slate-900">What You Need to Get Started</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>A suitable host location (library, school classroom, community room).</li>
                    <li>An intended audience (elementary, middle school, or high school).</li>
                    <li>A date and recurring meeting time for your first session.</li>
                    <li>A simple way for participants to express interest or register.</li>
                    <li>An inquiry-based mathematical investigation or problem.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Section 2: Finding a Host Location */}
            {activeSection === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 2
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Finding a Host Location
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    Your first major milestone is finding a physical space where your Local Lab can meet comfortably.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#0077c8]" />
                        <span>Public Libraries</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Often have free community meeting rooms, Wi-Fi, whiteboards, and naturally welcome educational initiatives.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span>Schools & Classrooms</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Ask a math teacher or faculty advisor to sponsor an after-school or lunch period Math Lab club.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-purple-600" />
                        <span>Community Centers</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        YMCAs, cultural centers, youth centers, and neighborhood study halls.
                      </p>
                    </div>
                  </div>

                  {/* Copyable Email Template */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-amber-300">
                        Sample Host Outreach Email Template
                      </div>
                      <button
                        onClick={handleCopyEmailTemplate}
                        className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 border border-white/20"
                      >
                        {copiedEmailTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmailTemplate ? 'Copied to Clipboard!' : 'Copy Template'}</span>
                      </button>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
{`Subject: Request to Host a Local Math Lab

Dear [Contact Name],

My name is [Your Name], and I am organizing a local Math Lab to provide opportunities for students and other community members to explore mathematics through investigation, problem-solving, and collaboration.

Math Lab follows the principle “One Investigation → Multiple Levels → Shared Discovery.” Participants investigate mathematical questions, develop their own approaches, and learn by sharing ideas with others.

I am reaching out to ask whether [Organization Name] might be interested in hosting our Local Lab. We hope to hold sessions at a convenient recurring time, with the activities and intended audience adapted to the needs of the community.

We would be happy to discuss possible scheduling, room availability, supervision requirements, and any policies we would need to follow.

Would you be available to discuss this possibility? Thank you for considering the opportunity to support mathematical exploration in our community.

Best regards,
[Your Name]
Local Lab Facilitator, Math Lab
[Your Contact Information]`}
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 pt-2">Key Questions to Clarify with the Host:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Is there a room fee or deposit? (Many hosts grant free space for student community educational groups).</li>
                    <li>Are whiteboards, markers, or projectors accessible?</li>
                    <li>What supervision or sign-in protocols are required for minor attendees?</li>
                    <li>What is the cancellation or recurring room reservation policy?</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Section 3: Building an Audience Before Launch */}
            {activeSection === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 3
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Building an Audience Before Launch
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    One of the most common challenges for a new Local Lab is attracting initial participants. <strong>The solution is to start building interest before the first session is announced.</strong>
                  </p>

                  <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50">
                    <h4 className="font-bold text-slate-900 text-sm">
                      1 Week Before: Launch a Simple Participant Interest Form
                    </h4>
                    <p className="text-xs text-slate-600">
                      Create a quick Google Form asking interested families and students about their availability.
                    </p>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="font-bold text-slate-800">Recommended Questions:</div>
                      <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                        <li>Would you or your student be interested in attending future Math Lab sessions? (Yes / Maybe / Need Info)</li>
                        <li>Email address for session announcements</li>
                        <li>Target age group (K–2, Grades 3–5, Grades 6–8, Grades 9–12)</li>
                        <li>Preferred meeting days & times (Weekday after school / Saturday mornings)</li>
                      </ol>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
                    <h5 className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0077c8]" />
                      <span>Curriculum Support from the National Team</span>
                    </h5>
                    <p className="text-xs text-sky-900 leading-relaxed">
                      You do not need to create investigations or problem sets from scratch! If you would prefer ready-made materials, request curriculum directly from Math Lab via the Curriculum Request Form or browse our monthly published National Investigations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Promoting Your First Session */}
            {activeSection === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 4
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Promoting & Organizing Your First Session
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    Use multiple promotion avenues instead of relying on a single social post.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="font-bold text-slate-900 text-xs">Flyers & Bulletin Boards</div>
                      <p className="text-[11px] text-slate-500">
                        Print physical flyers with a clear QR code linking to your registration form and place them in libraries, schools, and community centers.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="font-bold text-slate-900 text-xs">Local Parent & School Groups</div>
                      <p className="text-[11px] text-slate-500">
                        Post in local neighborhood Facebook groups, PTA email threads, and town community weekly newsletters.
                      </p>
                    </div>
                  </div>

                  {/* Copyable Flyer Announcement Text */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-emerald-300">
                        Sample Flyer & Announcement Copy
                      </div>
                      <button
                        onClick={handleCopyFlyerTemplate}
                        className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 border border-white/20"
                      >
                        {copiedFlyerTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedFlyerTemplate ? 'Copied!' : 'Copy Announcement'}</span>
                      </button>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
{`MATH LAB: EXPLORE MATHEMATICS TOGETHER
One Investigation → Multiple Levels → Shared Discovery

Are you curious about patterns, puzzles, and mathematical discoveries?
Join us for a free, hands-on mathematical exploration session!

Date & Time: [Insert Date & Time]
Location: [Insert Library / School / Community Room Name & Address]
Who Can Attend: Open to students in grades [K–12].
Cost: Completely Free

What we do:
• Explore a compelling mathematical mystery together
• Test hypotheses and build visual diagrams
• Collaborate with peers and share unique problem-solving approaches
• Contribute solutions to the national Math Lab network

To register: [Insert Link or QR Code]`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section 5: Facilitator Responsibilities */}
            {activeSection === 5 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 5
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Facilitator Responsibilities
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    A facilitator's primary role is not to lecture, but to guide exploration, foster inclusive discourse, and maintain safety and engagement.
                  </p>

                  <div className="space-y-3">
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1">
                      <div className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#0077c8]">
                        Before Each Session:
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                        <li>Coordinate room access and confirm table arrangements with the host.</li>
                        <li>Print investigation worksheets or gather tactile tools (graph paper, markers, cubes).</li>
                        <li>Review possible student questions and solution approaches in advance.</li>
                      </ul>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1">
                      <div className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-700">
                        During Each Session:
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                        <li><strong>Arrive 30 minutes early</strong> to prepare room layout and greet participants.</li>
                        <li>Set a welcoming, low-pressure tone where wrong turns are celebrated as learning data.</li>
                        <li>Encourage quiet students to pair with peers and share visual diagrams.</li>
                        <li>Ask guiding questions rather than giving answers directly.</li>
                      </ul>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1">
                      <div className="font-bold text-slate-900 text-xs uppercase tracking-wider text-purple-700">
                        After Each Session:
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                        <li>Leave the host room cleaner than you found it.</li>
                        <li>Record attendance counts and brief facilitator reflections.</li>
                        <li>Submit a collective solution or notable conjectures to the Math Lab website!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section 6: Running a Math Lab Session */}
            {activeSection === 6 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 6
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Running a Math Lab Session
                  </h3>
                </div>

                <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                    <div className="font-bold text-amber-900 text-xs sm:text-sm">
                      Leader Arrival Rule:
                    </div>
                    <p className="text-xs text-amber-800">
                      The session leader should arrive <strong>30 minutes prior to start time</strong> to set up chairs, check whiteboards, and greet arriving families.
                    </p>
                  </div>

                  <h4 className="font-bold text-base text-slate-900">Sample 60-Minute Session Timeline:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-mono font-bold text-xs px-2 py-1 rounded bg-[#0077c8] text-white shrink-0">
                        00:00 – 00:10
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">Warm-Up & Observation (10 mins)</div>
                        <p className="text-[11px] text-slate-600">Introduce the inquiry question. Students write down what they observe without pressure for an answer.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-mono font-bold text-xs px-2 py-1 rounded bg-emerald-600 text-white shrink-0">
                        00:10 – 00:30
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">Small-Group Investigation (20 mins)</div>
                        <p className="text-[11px] text-slate-600">Students work in pairs or trios, testing small cases, sketching patterns, and generating conjectures.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-mono font-bold text-xs px-2 py-1 rounded bg-purple-600 text-white shrink-0">
                        00:30 – 00:45
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">Group Discussion & Synthesis (15 mins)</div>
                        <p className="text-[11px] text-slate-600">Groups share their findings on the whiteboard. Compare different methods and debate why patterns hold.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-mono font-bold text-xs px-2 py-1 rounded bg-rose-600 text-white shrink-0">
                        00:45 – 01:00
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">Extensions & Session Wrap-Up (15 mins)</div>
                        <p className="text-[11px] text-slate-600">Push to deeper levels (proof, generalization), summarize key takeaways, and announce next date.</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 pt-2">Powerful Questions Facilitators Can Ask:</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li><em>"What do you notice when the numbers get larger?"</em></li>
                    <li><em>"Can you find a counterexample where your conjecture fails?"</em></li>
                    <li><em>"Why do you think that happens every single time?"</em></li>
                    <li><em>"Can you explain your partner's diagram in your own words?"</em></li>
                    <li><em>"What question does this discovery make you want to ask next?"</em></li>
                  </ul>
                </div>
              </div>
            )}

            {/* Section 7: The Five Levels of Exploration */}
            {activeSection === 7 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 7
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    The Five Levels of Exploration
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    Every Math Lab investigation is architected so learners of different mathematical maturities can explore the same starting question across five depths:
                  </p>

                  <div className="space-y-3">
                    {[
                      { level: 1, name: 'Observation & Concrete Exploration', desc: 'Tactile interaction, small cases (n=1,2,3), visual sketches, recording data tables.' },
                      { level: 2, name: 'Numerical & Structural Conjectures', desc: 'Identifying repeating cycles, formulating "if-then" hypotheses, searching for patterns.' },
                      { level: 3, name: 'Algebraic & Symbolic Representation', desc: 'Translating patterns into equations, summation notation, recurrences, and coordinate systems.' },
                      { level: 4, name: 'Formal Proof & Deductive Rigor', desc: 'Induction, invariant arguments, contradiction, or combinatorial bijections proving why.' },
                      { level: 5, name: 'Generalization & Open Extensions', desc: 'Higher dimensions, altered geometries, modular arithmetic, and unsolved mathematical questions.' }
                    ].map((lvl) => (
                      <div key={lvl.level} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                            Level {lvl.level}
                          </span>
                          <span className="font-bold text-xs text-slate-900">{lvl.name}</span>
                        </div>
                        <p className="text-xs text-slate-600 pl-8">{lvl.desc}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    Note: Levels represent depth of mathematical thinking, NOT fixed school grade levels! An elementary student can reach Level 3, and a high school student can benefit immensely from Level 1 hands-on diagrams.
                  </p>
                </div>
              </div>
            )}

            {/* Section 8: National Investigations */}
            {activeSection === 8 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 8
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    National Investigations
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    National Investigations are shared inquiries published monthly by our Mathematical Investigations & Curriculum committee.
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700">
                    <li><strong>A Shared Challenge:</strong> Chapters across the country work on the same mathematical mystery during that month.</li>
                    <li><strong>Flexible Schedule:</strong> Facilitators can spend one or multiple sessions on the investigation.</li>
                    <li><strong>Group Solutions:</strong> Local Labs can compile their collective discoveries and submit them through our "Share Your Work" portal.</li>
                    <li><strong>National Synthesis:</strong> Exceptional student conjectures, unique proofs, and alternative diagrams are reviewed and published in our monthly digest.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Section 9: Documentation and Resources */}
            {activeSection === 9 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 9
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Documentation & Resources
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    Math Lab provides a suite of standardized documents for your chapter:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-slate-900">Host Outreach Email Template</div>
                      <div className="text-slate-500">Available in Chapter 2 of this handbook</div>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-slate-900">Participant Interest Form</div>
                      <div className="text-slate-500">Google Form blueprint for early audience building</div>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-slate-900">Flyer & Poster Templates</div>
                      <div className="text-slate-500">Printable text and graphics for bulletin boards</div>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-slate-900">Curriculum Request Form</div>
                      <div className="text-slate-500">Request custom investigation packs from national team</div>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-slate-900">Session Reporting Form</div>
                      <div className="text-slate-500">Log attendance & share facilitator reflections</div>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-slate-900">National Submission Form</div>
                      <div className="text-slate-500">Submit student solutions to national investigations</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section 10: Local Lab Launch Checklist */}
            {activeSection === 10 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
                    Chapter 10
                  </div>
                  <h3 className="font-display-bold text-2xl font-bold text-slate-900">
                    Local Lab Launch Checklist
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Launch Progress</div>
                      <div className="text-[11px] text-slate-500">{completedCount} of 10 steps completed</div>
                    </div>
                    <div className="w-32 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${(completedCount / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: 'c1', title: 'Define Target Audience', desc: 'Determine whether your sessions focus on elementary, middle school, or high school.' },
                      { id: 'c2', title: 'Identify Host Organizations', desc: 'List 2–3 local libraries, schools, or community centers.' },
                      { id: 'c3', title: 'Send Host Outreach Email', desc: 'Copy and send the outreach email template to library branch manager or principal.' },
                      { id: 'c4', title: 'Clarify Room Details', desc: 'Confirm availability, room capacity, whiteboards, Wi-Fi, and any supervision policies.' },
                      { id: 'c5', title: 'Register Local Lab Online', desc: 'Submit the registration form on the Math Lab website to join the chapter directory.' },
                      { id: 'c6', title: 'Launch Participant Interest Form', desc: 'Share Google Form 1 week prior to announce plans and build email list.' },
                      { id: 'c7', title: 'Promote First Session', desc: 'Print flyers, post in local community Facebook groups, and email local contacts.' },
                      { id: 'c8', title: 'Review Investigation & Materials', desc: 'Print worksheets and select guiding questions across the five levels.' },
                      { id: 'c9', title: 'Arrive 30 Minutes Early', desc: 'Set up tables, prepare whiteboards, and greet participants warmly.' },
                      { id: 'c10', title: 'Post-Session Submission & Reflection', desc: 'Submit student discoveries and attendance to mathlab.official12@gmail.com.' },
                    ].map((step) => {
                      const isDone = checklist[step.id];
                      return (
                        <div
                          key={step.id}
                          onClick={() => toggleChecklist(step.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                            isDone 
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition ${
                            isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <div className={`text-xs font-bold ${isDone ? 'line-through text-emerald-800' : 'text-slate-900'}`}>
                              {step.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{step.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Handbook Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Official Facilitator Packet</span>
            <span>•</span>
            <span>Questions: <a href={`mailto:${OFFICIAL_EMAIL}`} className="underline font-mono text-[#0077c8]">{OFFICIAL_EMAIL}</a></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
