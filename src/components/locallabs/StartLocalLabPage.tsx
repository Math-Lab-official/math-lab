import React, { useState } from 'react';
import {
  Mail,
  Users,
  BookOpen,
  Building2,
  Compass,
  ExternalLink,
  Download,
  ChevronDown,
  Calendar
} from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';
import { PageHero } from '../common/PageHero';
import heroLocalCirclesImg from '../../assets/images/hero_local_circles_1795109646408.jpg';

const LOCAL_LAB_FORM_URL =
  'https://docs.google.com/forms/d/1L93d6rciu7A9t11BQ10WwA750YwrWHiqnIlRP-jtL1s/edit';
const LEADERSHIP_GUIDE_PATH =
  '/assets/aistudio/_Math_Lab__Local_Lab_Overview___Leadership_Guide_ec7a6f52';

export const StartLocalLabPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const leaderRoles = [
    {
      icon: Building2,
      title: 'Establish a Local Lab',
      desc: 'Partner with a school, library, or community center and obtain host permission.',
    },
    {
      icon: BookOpen,
      title: 'Organize Sessions',
      desc: 'Run free weekly, biweekly, or monthly sessions using Math Lab investigations or your own curriculum.',
    },
    {
      icon: Users,
      title: 'Engage Participants',
      desc: 'Foster collaborative exploration across all 5 depth levels where every approach is welcomed.',
    },
    {
      icon: Compass,
      title: 'Stay Connected',
      desc: 'Coordinate via Slack with the national executive team and share local progress updates.',
    },
  ];

  const steps = [
    'Apply via the Local Lab Leader form',
    'Hear back via email in 2–3 days',
    'Join Slack & receive starter materials',
    'Confirm host space & session cadence',
    'Launch your Local Math Lab',
  ];

  const faqs = [
    {
      q: 'Is a Local Lab a tutoring program?',
      a: 'No. Local Labs focus on mathematical investigation and discovery rather than routine homework help or tutoring.',
    },
    {
      q: 'Do I need to create my own math curriculum?',
      a: 'No. National Math Lab provides monthly investigation problems, solutions, and resources. You may also teach your own curriculum alongside the monthly investigation.',
    },
    {
      q: 'Does my Local Lab need to be hosted at a school?',
      a: 'No. Local Labs operate in schools, public libraries, community centers, or other suitable spaces. You can identify a host location after applying.',
    },
    {
      q: 'Do I need to be an expert in mathematics?',
      a: 'No. Local Lab Leaders organize and facilitate opportunities for mathematical exploration—you do not need to be an expert in every topic.',
    },
  ];

  return (
    <div className="transition-colors">
      <PageHero
        title="Local Labs."
        subtitle="Student-led math circles bringing monthly investigations to schools, libraries, and community spaces."
        image={heroLocalCirclesImg}
        imageAlt="Abstract interlocking geometric circles illustration"
        actions={
          <>
            <a
              href={LOCAL_LAB_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#0a192f] text-xs sm:text-sm font-semibold transition shadow-sm"
            >
              <span>Start a Local Lab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={LEADERSHIP_GUIDE_PATH}
              download="Math_Lab_Local_Lab_Leadership_Guide.txt"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/75 text-white hover:bg-white/15 text-xs sm:text-sm font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Leadership Guide</span>
            </a>
          </>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* What Local Lab Leaders Do */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
              What Local Lab Leaders Do
            </h2>
            <a
              href={LEADERSHIP_GUIDE_PATH}
              download="Math_Lab_Local_Lab_Leadership_Guide.txt"
              className="text-sm font-semibold text-[#0077c8] dark:text-sky-400 hover:underline inline-flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Overview &amp; Guide</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leaderRoles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-2.5"
                >
                  <Icon className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What Happens After Applying */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              What Happens After Applying
            </h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0077c8] dark:text-sky-400 font-semibold">
              <Calendar className="w-4 h-4" />
              <span>Deadline: Nov 25, 2026 @ 11:59 EDT</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {steps.map((step, i) => (
              <div
                key={step}
                className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 p-3.5 space-y-1.5"
              >
                <div className="text-xs font-mono font-bold text-[#0077c8] dark:text-sky-400">
                  0{i + 1}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compact FAQ Accordion */}
        <section className="space-y-4">
          <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-slate-200/80 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Apply & Contact Bar */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Ready to Start a Local Lab?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Apply online or email our team with any questions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={LOCAL_LAB_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077c8] hover:bg-[#005fa3] text-white text-sm font-semibold transition"
            >
              <span>Apply to Lead a Lab</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Starting%20a%20Local%20Math%20Lab`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition"
            >
              <Mail className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
              <span>{OFFICIAL_EMAIL}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
