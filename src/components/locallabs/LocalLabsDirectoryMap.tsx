import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Library, 
  School, 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Send,
  HelpCircle,
  FileText
} from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';

interface LocalLabsDirectoryMapProps {
  onNavigateToOrganizerForm: () => void;
}

export const LocalLabsDirectoryMap: React.FC<LocalLabsDirectoryMapProps> = ({
  onNavigateToOrganizerForm
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Coming Soon Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#1e1b4b] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Chapter Directory • Coming Soon</span>
          </div>

          <h2 className="font-display-bold text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Local Labs Directory: Coming Soon!
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Math Lab is actively assembling its inaugural cohort of community chapters! We do not publish speculative locations or mock data. As local student leaders, teachers, and librarians establish sanctioned chapters in schools, public libraries, and community centers, their meeting times and partner venues will be published here on our national interactive map.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Inaugural Cohort Forming Now</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Free Facilitator Handbooks & Materials</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Direct Mentorship from National Team</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToOrganizerForm}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <span>Be the First to Start a Lab in Your City</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Inaugural%20Local%20Math%20Lab%20Inquiry`}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              <span>Contact National Coordinators</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Three Ideal Venues for Your Local Chapter */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
            Where Chapters Operate
          </span>
          <h3 className="font-display-bold text-xl sm:text-2xl font-bold text-slate-900">
            Host a Local Lab in Your Community
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            You do not need a fancy laboratory or institution to start a Math Lab. Any space with tables, paper, and a shared curiosity for mathematical questions is all you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Public Libraries */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Library className="w-6 h-6" />
              </div>
              <h4 className="font-display-bold text-lg font-bold text-slate-900">
                Public Libraries
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Public libraries regularly host free STEM clubs and youth enrichment programs in meeting halls or study rooms. They are open, welcoming to students from multiple schools, and accessible on weekends or after school.
              </p>
              <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                Ideal for cross-school weekend circles
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              Math Lab provides a sample outreach letter for librarians.
            </div>
          </div>

          {/* High Schools & Middle Schools */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077c8] flex items-center justify-center">
                <School className="w-6 h-6" />
              </div>
              <h4 className="font-display-bold text-lg font-bold text-slate-900">
                Schools & Math Clubs
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bring Math Lab to your high school or middle school as an official student club or after-school seminar. Move beyond standard contest drills into deep, collaborative mathematical investigations with your classmates.
              </p>
              <div className="text-[11px] font-semibold text-[#0077c8] bg-sky-50 px-3 py-1 rounded-lg">
                Ideal for student clubs & advisory periods
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              Math Lab provides faculty advisor support materials.
            </div>
          </div>

          {/* Community Spaces */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-display-bold text-lg font-bold text-slate-900">
                Community Centers & Co-ops
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                YMCAs, youth organizations, cultural community centers, and homeschool co-ops offer dedicated spaces for learners of diverse ages to gather and explore mathematics without competitive pressure.
              </p>
              <div className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">
                Ideal for multi-age community learning
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              Math Lab provides multi-tiered facilitation guides.
            </div>
          </div>
        </div>
      </div>

      {/* 3. What You Receive as an Inaugural Host */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <h3 className="font-display-bold text-xl sm:text-2xl font-bold text-slate-900">
            What Math Lab Provides to Every Local Chapter
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            All materials are 100% free and developed by our Mathematical Investigations & Curriculum team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#0077c8]/10 text-[#0077c8] flex items-center justify-center font-bold text-sm">
              <FileText className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-sm text-slate-900">Monthly Investigation Packets</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Printable investigation sheets with five levels of depth, visual diagrams, and concrete exploration worksheets.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-800 flex items-center justify-center font-bold text-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-sm text-slate-900">Facilitator Handbook</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete 10-chapter guide covering session timing, guiding questions, room setup, and pedagogical philosophies.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-sm text-slate-900">Customizable Flyers & Posters</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Promotional templates to post on school bulletin boards or library community boards to invite attendees.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-sm">
              <Send className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-sm text-slate-900">National Review & Recognition</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit your chapter's student insights to the national team for mathematical review and publication in our monthly digest.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={onNavigateToOrganizerForm}
            className="px-8 py-3.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md inline-flex items-center gap-2"
          >
            <span>Fill Out the Organizer Interest Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
