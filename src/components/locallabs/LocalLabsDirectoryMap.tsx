import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ArrowRight, 
  MapPin, 
  Library, 
  School, 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Send,
  FileText,
  Search,
  Download,
  Mail,
  ExternalLink
} from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';
import { downloadFacilitatorStarterKit } from '../../utils/facilitatorKitExport';

export interface LocalLabChapter {
  id: string;
  name: string;
  cityState: string;
  venueType: 'library' | 'school' | 'community';
  venueName: string;
  facilitatorName: string;
  contactEmail: string;
  meetingFrequency: string;
  groupSize: string;
  status: 'Active Chapter' | 'Charter Chapter' | 'Forming Cohort';
  joinedDate: string;
}

const CHARTER_CHAPTERS: LocalLabChapter[] = [
  {
    id: 'charter-1',
    name: 'Evanston Public Library Inquiry Circle',
    cityState: 'Evanston, IL',
    venueType: 'library',
    venueName: 'Evanston Public Library (Room 102)',
    facilitatorName: 'Marcus Chen',
    contactEmail: OFFICIAL_EMAIL,
    meetingFrequency: 'Bi-weekly Saturdays (2:00 PM – 3:30 PM)',
    groupSize: '12 – 16 students',
    status: 'Charter Chapter',
    joinedDate: 'Sep 2026'
  },
  {
    id: 'charter-2',
    name: 'Boston Latin Inquiry Math Lab',
    cityState: 'Boston, MA',
    venueType: 'school',
    venueName: 'Boston Latin School (Math Wing Room 314)',
    facilitatorName: 'Dr. Sarah Lin & Student Leads',
    contactEmail: OFFICIAL_EMAIL,
    meetingFrequency: 'Weekly Wednesdays (3:30 PM – 4:45 PM)',
    groupSize: '18 – 24 students',
    status: 'Charter Chapter',
    joinedDate: 'Oct 2026'
  },
  {
    id: 'charter-3',
    name: 'Bay Area Youth Math Collective',
    cityState: 'Berkeley, CA',
    venueType: 'library',
    venueName: 'Berkeley Public Library Central Branch',
    facilitatorName: 'Maya Patel',
    contactEmail: OFFICIAL_EMAIL,
    meetingFrequency: 'Alternate Sundays (1:30 PM – 3:00 PM)',
    groupSize: '10 – 14 students',
    status: 'Charter Chapter',
    joinedDate: 'Oct 2026'
  },
  {
    id: 'charter-4',
    name: 'Austin Community STEM Circle',
    cityState: 'Austin, TX',
    venueType: 'community',
    venueName: 'Austin South Community Youth Center',
    facilitatorName: 'David Rodriguez',
    contactEmail: OFFICIAL_EMAIL,
    meetingFrequency: '1st & 3rd Tuesday (6:00 PM – 7:15 PM)',
    groupSize: '12 – 15 students',
    status: 'Active Chapter',
    joinedDate: 'Oct 2026'
  },
  {
    id: 'charter-5',
    name: 'Seattle Youth Math Explorers',
    cityState: 'Seattle, WA',
    venueType: 'library',
    venueName: 'Seattle Central Public Library Meeting Room 4',
    facilitatorName: 'Elena Rostova',
    contactEmail: OFFICIAL_EMAIL,
    meetingFrequency: 'Weekly Thursdays (4:30 PM – 5:45 PM)',
    groupSize: '8 – 12 students',
    status: 'Active Chapter',
    joinedDate: 'Nov 2026'
  },
  {
    id: 'charter-6',
    name: 'Research Triangle Student Circle',
    cityState: 'Chapel Hill, NC',
    venueType: 'community',
    venueName: 'Chapel Hill Community Center Activity Studio',
    facilitatorName: 'Jordan Hayes',
    contactEmail: OFFICIAL_EMAIL,
    meetingFrequency: 'Bi-weekly Saturdays (10:30 AM – 12:00 PM)',
    groupSize: '14 – 18 students',
    status: 'Active Chapter',
    joinedDate: 'Nov 2026'
  }
];

interface LocalLabsDirectoryMapProps {
  onNavigateToOrganizerForm: () => void;
}

export const LocalLabsDirectoryMap: React.FC<LocalLabsDirectoryMapProps> = ({
  onNavigateToOrganizerForm
}) => {
  const [chapters, setChapters] = useState<LocalLabChapter[]>(CHARTER_CHAPTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [venueFilter, setVenueFilter] = useState<'all' | 'library' | 'school' | 'community'>('all');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('math_lab_local_chapters');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setChapters([...parsed, ...CHARTER_CHAPTERS]);
        }
      }
    } catch {
      // fallback to charter chapters
    }
  }, []);

  const filteredChapters = chapters.filter((ch) => {
    const matchesFilter = venueFilter === 'all' || ch.venueType === venueFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      ch.name.toLowerCase().includes(q) || 
      ch.cityState.toLowerCase().includes(q) || 
      ch.venueName.toLowerCase().includes(q) || 
      ch.facilitatorName.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Directory Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1527] p-8 sm:p-10 text-white">
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
            <span>Network Directory</span>
            <span className="text-slate-600">/</span>
            <span>{chapters.length} Sanctioned & Pilot Chapters</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-white font-normal">
            Local Math Lab Directory
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Local Labs are student- and community-led inquiry circles meeting in schools, public libraries, and community spaces. Every chapter explores Math Lab's National Investigations and shares collective findings.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToOrganizerForm}
              className="px-5 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold uppercase tracking-wider rounded-md transition shadow-xs flex items-center gap-2"
            >
              <span>Register Your Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={downloadFacilitatorStarterKit}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-md border border-slate-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Facilitator Starter Kit (.md)</span>
            </button>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Local%20Lab%20Chapter%20Inquiry`}
              className="px-4 py-2.5 bg-transparent hover:bg-white/10 text-slate-300 text-xs font-bold rounded-md border border-slate-700 transition flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact National Staff</span>
            </a>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, state, school, or library name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono uppercase text-slate-400 px-1">Venue:</span>
          {(['all', 'library', 'school', 'community'] as const).map((filter) => {
            const label = filter === 'all' ? 'All Venues' : filter === 'library' ? 'Public Libraries' : filter === 'school' ? 'Schools & Clubs' : 'Community Centers';
            return (
              <button
                key={filter}
                onClick={() => setVenueFilter(filter)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                  venueFilter === filter
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChapters.map((ch) => {
          const VenueIcon = ch.venueType === 'library' ? Library : ch.venueType === 'school' ? School : Users;
          return (
            <div
              key={ch.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#0077c8] dark:text-sky-400">
                    <VenueIcon className="w-3.5 h-3.5" />
                    <span>{ch.venueType === 'library' ? 'Public Library' : ch.venueType === 'school' ? 'School Club' : 'Community Space'}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    {ch.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-normal text-slate-900 dark:text-white leading-snug">
                    {ch.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ch.cityState}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{ch.venueName}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{ch.meetingFrequency}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ch.groupSize} · Facilitator: {ch.facilitatorName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  Est. {ch.joinedDate}
                </span>
                <a
                  href={`mailto:${ch.contactEmail}?subject=Inquiry%20about%20${encodeURIComponent(ch.name)}`}
                  className="inline-flex items-center gap-1 text-[#0077c8] dark:text-sky-400 hover:underline font-bold"
                >
                  <span>Connect</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 space-y-3">
          <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="font-serif text-lg text-slate-900 dark:text-white">No chapters match your query</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try a different search term or register a new chapter in your city to appear on this directory.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setVenueFilter('all'); }}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold rounded-md"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Ideal Venues Overview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
            Venue Guide
          </span>
          <h3 className="font-serif text-2xl font-normal text-slate-900 dark:text-white">
            Where Can a Local Lab Operate?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            You do not need an academic department or large budget. Any space with a table, graph paper, and curiosity is ready for a Math Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              <Library className="w-4 h-4" />
              <span>Public Libraries</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Public libraries provide meeting rooms free of charge for student groups. Welcoming to learners across different schools.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold text-sm">
              <School className="w-4 h-4" />
              <span>Schools & Math Clubs</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Run as an enrichment club or after-school seminar with teacher sponsorship. Focus on inquiry beyond competition drills.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              <span>Community Centers</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              YMCAs, youth organizations, and co-ops offer flexible rooms for weekend workshops and multi-age collaboration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
