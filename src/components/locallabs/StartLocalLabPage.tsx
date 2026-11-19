import React from 'react';
import { Mail, Users, BookOpen, Calendar } from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';
import { PageHero } from '../common/PageHero';
import heroLocalCirclesImg from '../../assets/images/hero_local_circles_1795109646408.jpg';

export const StartLocalLabPage: React.FC = () => {
  const highlights = [
    { icon: Users, title: 'Student-Led Circles', desc: 'Peer-facilitated problem solving.' },
    { icon: BookOpen, title: 'Monthly Packets', desc: 'Ready-to-run 5-level guides.' },
    { icon: Calendar, title: 'Flexible Cadence', desc: 'Weekly or monthly sessions.' },
  ];

  return (
    <div className="transition-colors">
      <PageHero
        title="Local Labs."
        subtitle="Student-led math circles in schools, libraries, and community spaces."
        image={heroLocalCirclesImg}
        imageAlt="Abstract interlocking geometric circles illustration"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 space-y-2"
              >
                <Icon className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            );
          })}
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-lg">
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Chapter Portal — Coming Soon
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Facilitator handbooks and chapter registration are launching soon. Email us to start a Local Lab.
            </p>
          </div>

          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Starting%20a%20Local%20Math%20Lab`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-semibold transition shrink-0 self-start sm:self-center"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email {OFFICIAL_EMAIL}</span>
          </a>
        </section>
      </div>
    </div>
  );
};
