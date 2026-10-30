import React from 'react';
import { X, Check, BookOpen, Layers, Shield } from 'lucide-react';

interface LandingModalsProps {
  activeModal: 'take-a-moment' | 'how-it-works' | 'plans' | 'signin' | 'signup' | null;
  onClose: () => void;
}

export const LandingModals: React.FC<LandingModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-2xl border border-[#ded5c5] shadow-2xl p-6 sm:p-8 text-[#182029]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#667085] hover:text-[#182029] rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === 'take-a-moment' && (
          <div className="space-y-4 text-center py-4">
            <span className="font-serif-editorial italic text-amber-700 text-sm">
              Mathematical Reflection
            </span>
            <h3 className="font-serif-editorial text-3xl font-bold text-[#182029]">
              Take a moment.
            </h3>
            <p className="text-sm text-[#475467] leading-relaxed max-w-md mx-auto">
              Real mathematical insight is rarely an instantaneous flash. When examining an unfamiliar geometry figure or algebraic structure, pause before computing.
            </p>
            <div className="bg-white p-4 rounded-xl border border-[#e8dfcf] text-xs font-serif-editorial italic text-[#2d5868] leading-relaxed">
              "Look for what remains invariant when everything else moves. Track the symmetries, deform the boundaries, and discover the hidden law."
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#254553] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#1a333e] transition"
            >
              Continue Exploring
            </button>
          </div>
        )}

        {activeModal === 'how-it-works' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#b86822] font-semibold">
                Architecture & Method
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#182029]">
                About Math Lab
              </h3>
            </div>
            <div className="space-y-3 text-xs text-[#475467] leading-relaxed">
              <div className="p-3.5 bg-white rounded-xl border border-[#e8dfcf]">
                <strong className="text-[#182029] block text-sm mb-1">1. Visual Geometric & Algebraic Modeling</strong>
                Interact directly with live diagrams to discover geometric invariants, area preservation, and spectral transformations before performing symbol manipulation.
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#e8dfcf]">
                <strong className="text-[#182029] block text-sm mb-1">2. Six Dedicated Simulation Engines</strong>
                Full numerical suites covering Calculus (Riemann convergence & Taylor series), Linear Algebra (matrix grids & eigenvalues), Trigonometry (unit circle & triangle solvers), Probability (distributions & Buffon π), and Discrete Math.
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#e8dfcf]">
                <strong className="text-[#182029] block text-sm mb-1">3. Open Source Platform</strong>
                Free and accessible under the Apache 2.0 license for students, researchers, and educators globally.
              </div>
            </div>
          </div>
        )}

        {activeModal === 'plans' && (
          <div className="space-y-5">
            <div className="space-y-1 text-center">
              <span className="text-xs uppercase tracking-wider text-[#2d5868] font-semibold">
                Open Access
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#182029]">
                Math Lab Access
              </h3>
            </div>

            <div className="p-5 bg-white rounded-xl border-2 border-[#2d5868] space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-[#2d5868]">Open Source Edition</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Free Forever
                </span>
              </div>
              <p className="text-[#667085]">
                Complete interactive laboratories, formula databases, and calculation scratchpad under the Apache 2.0 license.
              </p>
              <ul className="space-y-1.5 pt-1 text-[#475467]">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> All 6 interactive simulation laboratories</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Interactive geometry invariant experiments</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Comprehensive formula handbook & scratchpad</li>
              </ul>
            </div>
          </div>
        )}

        {(activeModal === 'signin' || activeModal === 'signup') && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full mx-auto overflow-hidden shadow-xs border border-[#ded5c5] mb-2">
                <img
                  src="/assets/aistudio/unnamed_7f1902d3.jpg"
                  alt="Math Lab"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#182029]">
                Math Lab Workspace
              </h3>
              <p className="text-xs text-[#667085]">
                Save observations, export notebooks, and track mathematical challenge streaks.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-[#475467] font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="mathlab.official12@gmail.com"
                  className="w-full bg-white border border-[#d0c6b4] rounded-lg px-3 py-2 text-[#182029] focus:outline-none focus:border-[#2d5868]"
                />
              </div>

              <div>
                <label className="block text-[#475467] font-medium mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full bg-white border border-[#d0c6b4] rounded-lg px-3 py-2 text-[#182029] focus:outline-none focus:border-[#2d5868]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#254553] hover:bg-[#1a333e] text-white text-xs font-semibold rounded-lg shadow-sm transition mt-2"
              >
                Enter Math Lab Workspace
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
