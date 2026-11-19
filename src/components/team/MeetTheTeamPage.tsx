import React from 'react';
import { ExternalLink, UserCheck, Users } from 'lucide-react';
import {
  EXEC_MEMBERS,
  STAFF_MEMBERS,
  STAFF_APPLICATION_URL,
} from '../../data/teamData';
import { PageHero } from '../common/PageHero';
import heroTeamNetworkImg from '../../assets/images/hero_team_network_1795109646506.jpg';

export const MeetTheTeamPage: React.FC = () => {
  return (
    <div className="transition-colors">
      <PageHero
        title="Meet the Team."
        subtitle="Students organizing monthly investigations, digital tools, and local math chapters."
        image={heroTeamNetworkImg}
        imageAlt="Abstract mathematical graph network constellation"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Executive Board */}
        <section className="space-y-3">
          <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
            Executive Board
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EXEC_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0077c8] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {member.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Committee Staff */}
        <section className="space-y-3">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Staff
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Committee Members</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STAFF_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-xs text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Join Our Staff
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Apply for curriculum, outreach, or research committees.
            </p>
          </div>

          <a
            href={STAFF_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-semibold rounded-full transition inline-flex items-center gap-2 shrink-0"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>
      </div>
    </div>
  );
};
