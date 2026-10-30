import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  Users, 
  Video, 
  BellRing,
  ArrowRight
} from 'lucide-react';
import { LabTab } from '../../types';

interface Props {
  onNavigate: (tab: LabTab) => void;
}

export const UpcomingEventsPage: React.FC<Props> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSignedUp(true);
  };

  return (
    <div className="space-y-12 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Future Roadmap</span>
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            NATIONAL PROGRAMMING & EVENTS
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Math Lab is building an accessible nationwide ecosystem of mathematical inquiry. While our current focus centers on our active network of Local Labs and our monthly National Investigations, online national events are scheduled to debut shortly.
          </p>
        </div>
      </div>

      {/* Main "Coming Soon" Feature Block */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-sky-100 text-[#0077c8] flex items-center justify-center mx-auto shadow-inner">
          <Globe2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0077c8] bg-sky-50 px-3 py-1 rounded-full">
            Coming Soon • Target Launch in ~3 Months
          </span>
          <h2 className="font-display-bold text-2xl sm:text-4xl font-extrabold text-slate-900">
            Online National Programming
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            For now, we just have our network of local labs and our monthly national investigation. After around three months we plan to introduce national programming and events that anyone can join which will all be online!
          </p>
        </div>

        {/* Planned Event Previews */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0077c8] flex items-center justify-center font-bold">
              <Video className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-slate-900">Guest Mathematician Colloquia</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Live online dialogues with researchers in combinatorics, number theory, and geometric analysis.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-slate-900">National Solution Showcases</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Student participants from across all Local Labs present their visual models and proof breakthroughs.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-slate-900">Collaborative Problem Sprints</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Live interactive problem sessions tackling Level 4 & Level 5 open questions in mixed teams.
            </p>
          </div>
        </div>

        {/* Notification Sign-up Box */}
        <div className="pt-6 border-t border-slate-100 max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
            <BellRing className="w-4 h-4 text-amber-500" />
            <span>Be Notified When Online Programming Launches</span>
          </div>

          {signedUp ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You're on the priority list! We'll notify you as events go live.</span>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077c8]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow-xs shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Back Link to Current Activities */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('investigations')}
            className="text-xs font-bold text-[#0077c8] hover:underline flex items-center gap-1"
          >
            <span>Explore Current National Investigation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigate('local-labs')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 hover:underline"
          >
            Find or Start a Local Lab
          </button>
        </div>
      </div>
    </div>
  );
};
