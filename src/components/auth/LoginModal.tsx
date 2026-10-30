import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { email: string; name: string; role?: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = name || email.split('@')[0] || 'Math Scholar';
    const userData = { email, name: userName, role: 'Scholar' };
    
    if (rememberMe) {
      localStorage.setItem('math_lab_user', JSON.stringify(userData));
    }
    setSuccessMsg(`Welcome, ${userName}!`);
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
      setSuccessMsg('');
    }, 700);
  };

  const handleDemoLogin = (demoName: string, demoEmail: string, role: string) => {
    const userData = { email: demoEmail, name: demoName, role };
    localStorage.setItem('math_lab_user', JSON.stringify(userData));
    setSuccessMsg(`Logged in as ${demoName} (${role})`);
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
      setSuccessMsg('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden text-slate-800">
        {/* Bold top decorative strip */}
        <div className="h-2 bg-gradient-to-r from-[#4a044e] via-[#0077c8] to-[#f59e0b]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header branding */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-xs shrink-0">
              <img
                src="/assets/aistudio/unnamed_7f1902d3.jpg"
                alt="Math Lab Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display-bold text-xl font-bold tracking-tight text-slate-900">
                  MATH LAB PORTAL
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Educational Non-Profit
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                100% Free Open Educational Research Suite
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-200 mb-6 text-sm">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 pb-2.5 font-bold text-center border-b-2 transition-colors ${
                mode === 'signin'
                  ? 'border-[#0077c8] text-[#0077c8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 pb-2.5 font-bold text-center border-b-2 transition-colors ${
                mode === 'signup'
                  ? 'border-[#0077c8] text-[#0077c8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Free Account
            </button>
          </div>

          {successMsg ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="font-bold text-slate-900 text-base">{successMsg}</p>
              <p className="text-xs text-slate-500">Redirecting to your research space...</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Quick Demo Login Presets */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Instant One-Click Demo Access
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('Emily Bu', 'emily@mathlab.edu', 'Student Scholar')}
                    className="p-2 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-left transition shadow-2xs group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-[#0077c8] flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#0077c8]" />
                      <span>Student</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Emily Bu</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('Dr. Euler', 'dr.euler@academy.org', 'Lab Faculty Mentor')}
                    className="p-2 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg text-left transition shadow-2xs group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-purple-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                      <span>Faculty</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Dr. L. Euler</div>
                  </button>
                </div>
              </div>

              {/* Standard Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {mode === 'signup' && (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#0077c8] focus:bg-white text-xs"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@mathlab.edu"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#0077c8] focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#0077c8] focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#0077c8] focus:ring-[#0077c8]"
                    />
                    <span>Remember on this browser</span>
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to demo registered email.')}
                      className="text-[11px] font-semibold text-[#0077c8] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 tracking-wide uppercase text-xs"
                >
                  <span>{mode === 'signin' ? 'Sign In to Math Lab' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-100">
                <span>By continuing, you agree to the Math Lab </span>
                <span className="font-semibold text-slate-700">Open Research Code of Conduct</span>.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
