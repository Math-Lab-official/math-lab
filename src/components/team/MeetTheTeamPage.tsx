import React from 'react';
import {
  ExternalLink,
  Layers,
  FileCheck,
  Share2,
  BarChart3,
  Terminal,
  Mail,
  Sparkles,
} from 'lucide-react';
import {
  EXEC_MEMBERS,
  STAFF_MEMBERS,
  COMMITTEES,
  STAFF_APPLICATION_URL,
  OFFICIAL_EMAIL,
} from '../../data/teamData';
import { PageHero } from '../common/PageHero';
import heroTeamNetworkImg from '../../assets/images/hero_team_network_1795109646506.jpg';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const AVATAR_STYLES = [
  'bg-gradient-to-br from-[#0077c8] to-[#0a3d6b] text-white',
  'bg-gradient-to-br from-indigo-600 to-slate-900 text-white',
  'bg-gradient-to-br from-sky-600 to-cyan-800 text-white',
  'bg-gradient-to-br from-emerald-600 to-teal-900 text-white',
  'bg-gradient-to-br from-blue-700 to-indigo-950 text-white',
  'bg-gradient-to-br from-slate-700 to-slate-950 text-white',
];

const getCommitteeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layers':
      return Layers;
    case 'FileCheck':
      return FileCheck;
    case 'Share2':
      return Share2;
    case 'BarChart3':
      return BarChart3;
    case 'Terminal':
      return Terminal;
    default:
      return Sparkles;
  }
};

export const MeetTheTeamPage: React.FC = () => {
  const executiveLeads = EXEC_MEMBERS.slice(0, 2);
  const executiveDirectors = EXEC_MEMBERS.slice(2);

  return (
    <div className="transition-colors">
      <PageHero
        title="Meet the Team."
        subtitle="Students organizing monthly investigations, digital tools, and local math chapters."
        image={heroTeamNetworkImg}
        imageAlt="Abstract mathematical graph network constellation"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Executive Board */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#0077c8] dark:text-sky-400 font-semibold">
                National Leadership
              </p>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
                Executive Board
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {EXEC_MEMBERS.length} student officers guiding national programs
            </p>
          </div>

          {/* Featured Top Officers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {executiveLeads.map((member, index) => (
              <div
                key={member.id}
                className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-[#0077c8]/50 dark:hover:border-sky-500/50 p-6 transition-all hover:shadow-md flex items-center gap-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0077c8] via-sky-400 to-cyan-400 opacity-85" />
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-sans font-bold text-lg tracking-tight shrink-0 shadow-xs ${
                    AVATAR_STYLES[index % AVATAR_STYLES.length]
                  }`}
                >
                  {getInitials(member.name)}
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[#0077c8] dark:text-sky-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Directors & Leads Grid (untruncated, crisp 3-col layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {executiveDirectors.map((member, index) => (
              <div
                key={member.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-[#0077c8]/45 dark:hover:border-sky-500/45 p-5 transition-all hover:shadow-sm flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-sans font-bold text-sm tracking-tight shrink-0 ${
                    AVATAR_STYLES[(index + 2) % AVATAR_STYLES.length]
                  }`}
                >
                  {getInitials(member.name)}
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Committee Staff */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                Curriculum &amp; Research
              </p>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
                Committee Staff
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STAFF_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 p-5 transition-all hover:shadow-sm flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-sans font-bold text-sm tracking-tight shrink-0 ${
                    AVATAR_STYLES[(index + 3) % AVATAR_STYLES.length]
                  }`}
                >
                  {getInitials(member.name)}
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Committees Overview */}
        <section className="space-y-4">
          <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              Working Groups
            </p>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
              Our Committees
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMITTEES.map((committee) => {
              const Icon = getCommitteeIcon(committee.icon);
              return (
                <div
                  key={committee.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0077c8] dark:text-sky-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {committee.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {committee.description}
                    </p>
                  </div>
                  {committee.lead && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium text-slate-500 dark:text-slate-400">
                      Lead: <span className="text-slate-800 dark:text-slate-200">{committee.lead}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Elevated Join Our Staff Banner */}
        <section className="relative overflow-hidden bg-[#0a192f] text-white rounded-3xl border border-slate-800 p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
          <div className="absolute inset-0 bg-dot-grid-dark opacity-60 pointer-events-none" />
          <div className="relative space-y-1.5 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
              Open Applications
            </p>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Join Our Staff
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Collaborate with students nationwide on curriculum, solutions review, outreach, or digital studios.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white hover:bg-slate-100 text-[#0a192f] text-sm font-semibold rounded-full transition inline-flex items-center gap-2 shadow-sm"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Joining%20Math%20Lab%20Staff`}
              className="px-5 py-3 border border-white/30 hover:bg-white/10 text-white text-sm font-medium rounded-full transition inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Ask a Question</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
