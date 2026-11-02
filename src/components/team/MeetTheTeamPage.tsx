import React from 'react';
import { 
  Users, 
  ExternalLink, 
  Sparkles, 
  Mail, 
  UserCheck
} from 'lucide-react';
import { 
  EXEC_MEMBERS, 
  STAFF_MEMBERS, 
  STAFF_APPLICATION_URL, 
  OFFICIAL_EMAIL 
} from '../../data/teamData';

export const MeetTheTeamPage: React.FC = () => {
  return (
    <div className="space-y-10 py-4 transition-colors">
      {/* Header Banner */}
      <div className="bg-[#0a1426] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Student Leadership & Staff</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Meet the Team
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Math Lab is organized by passionate students bringing collaborative mathematical inquiry into communities around the world.
          </p>
        </div>
      </div>

      {/* Executive Board */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0077c8] dark:text-sky-400">
            Leadership
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Executive Board
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXEC_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0077c8] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {member.name}
                  </h3>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-snug">
                    {member.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Section */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Committee Staff
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Staff <span className="text-xs font-normal text-slate-400 font-mono">(more incoming in November)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STAFF_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Staff Application Callout */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Interested in joining our staff?</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            We welcome students passionate about math curriculum, outreach, and research.
          </p>
        </div>

        <a
          href={STAFF_APPLICATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <span>Apply to Staff</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
