import React from 'react';
import { ExternalLink, Mail, FileText, Sparkles, Compass } from 'lucide-react';
import { OFFICIAL_EMAIL } from '../../data/teamData';
import { PageHero } from '../common/PageHero';
import heroSubmitProofImg from '../../assets/images/hero_submit_proof_1795109646763.jpg';

const SOLUTIONS_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSevTw-EbwOl0Y4Kn2YfKcRYgXVV8XswHjoVQwurFnzsTcRlBA/viewform?usp=header';

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
        actions={
          <a
            href={SOLUTIONS_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#0a192f] text-xs sm:text-sm font-semibold transition shadow-sm"
          >
            <span>Submit Your Solutions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {formats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-2.5"
              >
                <Icon className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            );
          })}
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-lg">
            <h2 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
              Submit Your Solutions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Use our official submission form to share your investigation write-ups, PDFs, or conjectures with the national team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={SOLUTIONS_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077c8] hover:bg-[#005fa3] text-white text-sm font-semibold transition"
            >
              <span>Open Submission Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Student%20Investigation%20Work`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition"
            >
              <Mail className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
              <span>Questions?</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
