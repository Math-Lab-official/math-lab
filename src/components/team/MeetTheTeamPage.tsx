import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  FileCheck, 
  Share2, 
  BarChart3, 
  Terminal, 
  Mail, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { 
  EXEC_MEMBERS, 
  COMMITTEES, 
  STAFF_APPLICATION_URL, 
  OFFICIAL_EMAIL, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL 
} from '../../data/teamData';
import { StaffApplicationModal } from './StaffApplicationModal';

export const MeetTheTeamPage: React.FC = () => {
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>('investigations-curriculum');
  
  const getCommitteeIcon = (id: string) => {
    switch (id) {
      case 'investigations-curriculum':
        return <Layers className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />;
      case 'solutions-review':
        return <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'outreach-communications':
        return <Share2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'research-impact':
        return <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'tech-digital':
        return <Terminal className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <div className="space-y-12 py-4 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Student Leadership & Committees</span>
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            MEET THE TEAM
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Math Lab is organized by passionate student mathematicians, educators, and curriculum developers united by a single vision: bringing collaborative mathematical inquiry into communities across the nation.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Student-Led Initiative</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>5 Specialized Staff Committees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Staff Applications Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Application Callout Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#1e1b4b] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Now Recruiting Staff Members</span>
          </div>
          <h2 className="font-display-bold text-xl sm:text-2xl font-extrabold text-white">
            Join the Math Lab National Staff Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Are you passionate about mathematical problem-solving, curriculum design, student mentorship, digital tools, or community outreach? We invite dedicated middle school, high school, and university students to apply across our five national committees.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setIsStaffModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2"
          >
            <span>Learn About Committees</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={STAFF_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Section 1: Executive Board */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
            Executive Leadership
          </div>
          <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Executive Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            The core directors responsible for Math Lab's national curriculum, technical infrastructure, and chapter coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXEC_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              <div className="space-y-4">
                {/* Photo or Placeholder Area */}
                {member.imageSrc ? (
                  <div className="w-full h-48 rounded-xl overflow-hidden relative shadow-inner bg-slate-900 border border-slate-200 dark:border-slate-800 group">
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-300 bg-slate-900/90 px-2 py-0.5 rounded backdrop-blur-xs border border-amber-400/40 uppercase tracking-wider">
                        Executive Board
                      </span>
                      {member.github && (
                        <a
                          href={`https://github.com/${member.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-white hover:text-amber-300 bg-slate-900/90 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20 transition"
                          title={`GitHub Profile: @${member.github}`}
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>@{member.github}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`w-full h-48 rounded-xl bg-gradient-to-tr ${member.imagePlaceholderColor || 'from-slate-700 to-slate-800'} flex flex-col items-center justify-center text-white relative shadow-inner p-4 text-center`}>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-2 border border-white/30">
                      <UserCheck className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-[11px] font-mono tracking-wider uppercase text-white/80">
                      Photo & Introduction
                    </span>
                    <span className="text-[10px] text-white/60">Executive Board</span>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {member.name}
                    </h3>
                  </div>
                  <div className="text-xs font-bold text-[#0077c8] dark:text-sky-400">
                    {member.role}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Focus Area</span>
                  <span>{member.focusArea}</span>
                </div>
                {member.github && (
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                    title={`View @${member.github} on GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Five Staff Committees */}
      <div className="space-y-6 pt-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            Committee Structure
          </div>
          <h2 className="font-display-bold text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Staff Committees
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Math Lab's day-to-day operations and student enrichment are driven by five specialized committees. Staff members collaborate across these teams to author investigations, evaluate submissions, and support local chapters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMITTEES.map((comm, idx) => (
            <div
              key={comm.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    {getCommitteeIcon(comm.id)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    Committee {idx + 1} of 5
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display-bold text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {comm.name}
                  </h3>
                  {comm.lead && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-sky-950/60 border border-blue-200/80 dark:border-sky-800 text-[#0077c8] dark:text-sky-300 text-[11px] font-semibold">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Leadership:</span>
                      <span>{comm.lead}</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {comm.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Core Responsibilities:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {comm.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Valued Skills & Interests:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {comm.skillsLookedFor.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCommitteeId(comm.id);
                      setIsStaffModalOpen(true);
                    }}
                    className="flex-1 py-2 px-3 bg-slate-900 dark:bg-white hover:bg-[#0077c8] dark:hover:bg-sky-400 text-white dark:text-slate-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <span>Apply for this Committee</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={STAFF_APPLICATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition"
                    title="Direct Google Form link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Apply Card in Committee Grid */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0a192f] text-white rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between border border-slate-800">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display-bold text-xl font-bold text-white leading-snug">
                Apply for Any Committee
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Whether your strength lies in olympiad problem creation, student paper review, graphic design, social media outreach, educational psychology, or software development, there is a place for you at Math Lab.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <a
                href={STAFF_APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Staff Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="text-[10px] text-center text-slate-400">
                Official Google Form &bull; Email <a href={`mailto:${OFFICIAL_EMAIL}`} className="underline text-slate-300">{OFFICIAL_EMAIL}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Application Modal */}
      <StaffApplicationModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        defaultCommitteeId={selectedCommitteeId}
      />
    </div>
  );
};
