import React from 'react';
import {
  ExternalLink,
  Mail,
  ArrowUpRight,
  Layers,
  FileCheck,
  Share2,
  BarChart3,
  Terminal,
  Sparkles,
} from 'lucide-react';
import {
  EXEC_MEMBERS,
  STAFF_MEMBERS,
  COMMITTEES,
  STAFF_APPLICATION_URL,
  OFFICIAL_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
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

const ROLE_SCOPE: Record<string, string> = {
  'emily-bu': 'Vision & National Strategy',
  'sahanaa-rao': 'Operations & Chapter Support',
  'hemanth-parvathaneni': 'National & Local Programming',
  'matthew-baek': 'Chapter Expansion & Partnerships',
  'shourya-sharan': 'Digital Lab & Web Engineering',
  'piyush-kolekar': 'Pedagogy & Impact Evaluation',
  'hiba-naz': 'Community Outreach & Media',
  'folarera-kassim': 'Investigations & Web Editorial',
};

export const MeetTheTeamPage: React.FC = () => {
  const topOfficers = EXEC_MEMBERS.slice(0, 2);
  const directors = EXEC_MEMBERS.slice(2);

  return (
    <div className="transition-colors">
      <PageHero
        title="Meet the Team."
        subtitle="A student-led leadership board and curriculum collective building open mathematical inquiry nationwide."
        image={heroTeamNetworkImg}
        imageAlt="Abstract mathematical graph network constellation"
        actions={
          <a
            href={STAFF_APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0a192f] text-sm font-semibold transition shadow-sm"
          >
            <span>Join Our Staff</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
        {/* 1. Executive Leadership — Asymmetric Editorial Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Editorial Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#0077c8] dark:text-sky-400">
                National Leadership
              </p>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight text-balance">
                Executive Board
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Eight student officers guiding monthly National Investigations, Digital Math Lab engineering, and local chapters across schools and libraries.
              </p>
            </div>

            <dl className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800 text-sm">
              <div className="py-3.5 flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-400">Executive Officers</dt>
                <dd className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                  {EXEC_MEMBERS.length}
                </dd>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-400">Committee Staff</dt>
                <dd className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                  {STAFF_MEMBERS.length}
                </dd>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-400">Working Committees</dt>
                <dd className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                  {COMMITTEES.length}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Leadership Directory */}
          <div className="lg:col-span-8 space-y-8">
            {/* Featured Top Two Officers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {topOfficers.map((member, idx) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-colors hover:border-[#0077c8]/40 dark:hover:border-sky-500/40"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif-editorial text-xl font-bold ${
                        idx === 0
                          ? 'bg-[#0a192f] text-white dark:bg-sky-500 dark:text-slate-950'
                          : 'bg-[#0077c8] text-white'
                      }`}
                    >
                      {getInitials(member.name)}
                    </div>
                    <span className="font-mono tabular-nums text-sm text-slate-400 dark:text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-base font-medium text-[#0077c8] dark:text-sky-400">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 pt-1">
                      {ROLE_SCOPE[member.id]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Directors & Leads — Clean Typographic Ledger */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800">
              {directors.map((member, idx) => (
                <div
                  key={member.id}
                  className="px-6 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-serif-editorial text-base font-bold flex items-center justify-center shrink-0">
                      {getInitials(member.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:text-right pl-15 sm:pl-0 shrink-0">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {ROLE_SCOPE[member.id]}
                    </span>
                    <span className="font-mono tabular-nums text-xs text-slate-400 dark:text-slate-500">
                      0{idx + 3}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Committee Staff — Clean Two-Up Editorial Cards */}
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Curriculum &amp; Investigations
              </p>
              <h2 className="font-serif-editorial text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
                Committee Staff
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Authoring and reviewing monthly multi-level problem sets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STAFF_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-serif-editorial text-xl font-bold flex items-center justify-center shrink-0">
                  {getInitials(member.name)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Working Committees — Architectural Catalog Grid */}
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              How We Work
            </p>
            <h2 className="font-serif-editorial text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
              Committees &amp; Working Groups
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
            {COMMITTEES.map((committee, idx) => {
              const Icon = getCommitteeIcon(committee.icon);
              return (
                <div
                  key={committee.id}
                  className="p-6 sm:p-7 border-r border-b border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
                      <Icon className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
                      <span className="font-mono tabular-nums text-xs">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {committee.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {committee.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 space-y-1">
                    {committee.lead && (
                      <div>
                        Lead: <span className="font-medium text-slate-800 dark:text-slate-200">{committee.lead}</span>
                      </div>
                    )}
                    <div>
                      {committee.skillsLookedFor.join(' · ')}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 6th Grid Cell: Open Invitation */}
            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 sm:p-7 border-r border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 hover:bg-[#0a192f] hover:text-white transition-colors flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#0077c8] group-hover:text-sky-300">
                    Open Roles
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-[#0077c8] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white group-hover:text-white">
                  Join a Committee
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 group-hover:text-slate-200 leading-relaxed">
                  Students interested in writing investigations, reviewing proofs, outreach, or engineering are welcome to apply.
                </p>
              </div>
              <div className="text-sm font-semibold text-[#0077c8] group-hover:text-white">
                Open Staff Application →
              </div>
            </a>
          </div>
        </section>

        {/* 4. Dark Cobalt Editorial Footer Banner */}
        <section className="relative overflow-hidden bg-[#0a192f] text-white rounded-3xl border border-slate-800 p-8 sm:p-11 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm font-medium text-sky-300">
              Student Applications Open
            </p>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white leading-tight">
              Help shape Math Lab with our team.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Work alongside fellow students on monthly mathematical investigations, outreach, and visual laboratories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-[#0a192f] text-sm sm:text-base font-semibold rounded-full transition inline-flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Joining%20Math%20Lab%20Staff`}
              className="px-5 py-3.5 border border-white/30 hover:bg-white/10 text-white text-sm sm:text-base font-medium rounded-full transition inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              <span>{OFFICIAL_EMAIL}</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 border border-white/20 hover:bg-white/10 text-slate-200 text-sm sm:text-base font-medium rounded-full transition whitespace-nowrap"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
