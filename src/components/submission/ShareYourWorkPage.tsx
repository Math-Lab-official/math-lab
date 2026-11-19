import React from 'react';
import { Mail, FileText, Sparkles, Compass } from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';
import { PageHero } from '../common/PageHero';
import heroSubmitProofImg from '../../assets/images/hero_submit_proof_1795109646763.jpg';

interface Props {
  onNavigateHome?: () => void;
}

export const ShareYourWorkPage: React.FC<Props> = () => {
  const formats = [
    { icon: FileText, title: 'Proofs & Write-Ups', desc: 'Complete or partial derivations.' },
    { icon: Sparkles, title: 'Conjectures', desc: 'Observed patterns and open questions.' },
    { icon: Compass, title: 'Visual Models', desc: 'Diagrams, plots, and lab exports.' },
  ];

  return (
    <div className="transition-colors">
      <PageHero
        title="Share Your Work."
        subtitle="Submit solutions, partial proofs, conjectures, or visual models from any investigation."
        image={heroSubmitProofImg}
        imageAlt="Abstract geometric prism and drafting grid illustration"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {formats.map((item) => {
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
              Submission Form — Coming Soon
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our online submission portal is in preparation. Until it launches, email your work directly to our team.
            </p>
          </div>

          <a
            href={`mailto:${OFFICIAL_EMAIL}?subject=Student%20Investigation%20Work`}
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
