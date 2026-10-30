import React from 'react';
import { LabTab } from '../types';
import { Sparkles, ExternalLink, Mail, Users, Building2, Send, Calendar, BookOpen, Clock, Activity } from 'lucide-react';
import { STAFF_APPLICATION_URL, OFFICIAL_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/teamData';

interface FooterProps {
  onSelectTab: (tab: LabTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top Tagline Banner */}
        <div className="pb-10 mb-10 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-display-bold text-2xl font-extrabold text-white tracking-tight">
              MATH LAB
            </span>
            <p className="font-serif italic text-amber-200/90 text-sm">
              One Investigation → Multiple Levels → Shared Discovery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Staff Application Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                onSelectTab('local-labs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition border border-white/10 flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Start a Local Lab</span>
            </button>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Initiative Overview */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              About Math Lab
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Math Lab is a student-centered initiative bringing collaborative mathematical investigations, monthly inquiries across five levels of depth, and community Local Labs into schools, libraries, and learning spaces.
            </p>
            <div className="pt-1 text-[11px] text-slate-400 space-y-1">
              <div>Founder & Executive Director: <strong className="text-slate-200">Emily Bu</strong></div>
              <div>Curriculum Manager & Website Creator: <strong className="text-slate-200">Folarera Kassim</strong></div>
              <div>Technical Lead & Website Creator: <strong className="text-slate-200">Shourya Sharan</strong></div>
              <div>Official Email: <a href={`mailto:${OFFICIAL_EMAIL}`} className="underline text-sky-400">{OFFICIAL_EMAIL}</a></div>
              <div>Instagram: <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline text-pink-400">{INSTAGRAM_HANDLE}</a></div>
            </div>
          </div>

          {/* Col 2: Core Programs & Community */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Core Programs
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('investigations')} className="hover:text-white transition flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#0077c8]" />
                  <span>National Investigations</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('local-labs')} className="hover:text-white transition flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-sky-400" />
                  <span>Start a Local Math Lab</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('share-work')} className="hover:text-white transition flex items-center gap-1.5">
                  <Send className="w-3 h-3 text-amber-400" />
                  <span>Share Your Work & Research</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('team')} className="hover:text-white transition flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-purple-400" />
                  <span>Meet the Team & 5 Committees</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-white transition flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-emerald-400" />
                  <span>Why Math Lab Exists</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Facilitators & Opportunities */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Facilitators & Roadmaps
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('local-labs')} className="hover:text-white transition flex items-center gap-1.5">
                  <span>Facilitator Handbook (10 Chapters)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('local-labs')} className="hover:text-white transition flex items-center gap-1.5">
                  <span>Chapter Directory & Map</span>
                </button>
              </li>
              <li>
                <a
                  href={STAFF_APPLICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 text-amber-400 font-bold transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Staff Member Application ↗</span>
                </a>
              </li>
              <li>
                <button onClick={() => onSelectTab('events')} className="hover:text-white transition flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>National Events (Coming Soon)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('laboratories')} className="hover:text-white transition flex items-center gap-1.5 text-sky-400 font-medium">
                  <Activity className="w-3 h-3 text-sky-400" />
                  <span>Interactive Studios (6 Labs)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community Mission */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Our Vision
            </h4>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-[11px]">
              <div className="text-slate-300 font-bold">
                Inquiry Before Memorization
              </div>
              <p className="text-slate-400 leading-relaxed">
                Mathematics is more than formulas to remember — it is an active exploration of patterns, reasoning, and collaborative discovery open to all learners.
              </p>
            </div>
            <div className="text-[11px] text-slate-500">
              Community Inquiries: <br />
              <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-slate-300 underline">{OFFICIAL_EMAIL}</a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} Math Lab Initiative. All rights reserved. Explore mathematics. Investigate questions. Learn together.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => onSelectTab('overview')} className="hover:text-slate-300 transition">
              Home
            </button>
            <button onClick={() => onSelectTab('about')} className="hover:text-slate-300 transition">
              About
            </button>
            <button onClick={() => onSelectTab('team')} className="hover:text-slate-300 transition">
              Team
            </button>
            <a href={STAFF_APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition">
              Staff Application
            </a>
            <button onClick={() => onSelectTab('local-labs')} className="hover:text-slate-300 transition">
              Local Labs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
