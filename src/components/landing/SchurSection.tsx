import React, { useState } from 'react';
import { Sliders, RotateCcw } from 'lucide-react';

export const SchurSection: React.FC = () => {
  const [paramA, setParamA] = useState(2);
  const [paramB, setParamB] = useState(2);
  const [paramC, setParamC] = useState(2);

  // a^3 + b^3 + c^3 + 3abc
  const lhs = Math.pow(paramA, 3) + Math.pow(paramB, 3) + Math.pow(paramC, 3) + 3 * paramA * paramB * paramC;

  // sum_sym a^2 b = a^2 b + a b^2 + b^2 c + b c^2 + c^2 a + c a^2
  const rhs =
    Math.pow(paramA, 2) * paramB +
    paramA * Math.pow(paramB, 2) +
    Math.pow(paramB, 2) * paramC +
    paramB * Math.pow(paramC, 2) +
    Math.pow(paramC, 2) * paramA +
    paramC * Math.pow(paramA, 2);

  const delta = lhs - rhs;

  return (
    <div className="bg-[#faf7f2] text-[#1c2430] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#e7e1d5]">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#ded5c5] shadow-sm p-8 sm:p-12 space-y-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#eee7db]">
          <span className="font-semibold text-[#2d5868] tracking-wide text-sm">
            Schur’s inequality
          </span>
          <span className="text-[#667085] text-xs">
            Algebraic Invariant · Symmetric Polynomials
          </span>
        </div>

        {/* Central Display Equation */}
        <div className="py-6 flex flex-col items-center justify-center space-y-4">
          <div className="font-serif-editorial text-3xl sm:text-4xl text-[#182029] tracking-wider text-center">
            <em>a</em>³ + <em>b</em>³ + <em>c</em>³ + 3<em>abc</em>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl text-[#182029] leading-none mb-1">≥</span>
            <div className="font-serif-editorial text-2xl sm:text-3xl text-[#182029] flex items-center gap-1.5">
              <span className="text-3xl font-serif">∑</span>
              <span className="text-xs uppercase font-sans tracking-widest text-[#667085] -ml-1 mt-3">sym</span>
              <span className="ml-1"><em>a</em>²<em>b</em></span>
            </div>
          </div>
        </div>

        {/* Subtitle / Definition */}
        <p className="text-xs sm:text-sm text-[#475467] font-serif-editorial leading-relaxed max-w-xl mx-auto text-center">
          <em>a</em>, <em>b</em>, <em>c</em> ≥ 0. The symmetric sum contains all six terms such as <em>a</em>²<em>b</em> and <em>ab</em>².
        </p>

        {/* Interactive Sliders to Explore Invariant */}
        <div className="bg-[#faf7f2] rounded-xl p-5 border border-[#e8e0d2] space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#182029] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#2d5868]" />
              Interactive Variables
            </span>
            <button
              onClick={() => {
                setParamA(2);
                setParamB(2);
                setParamC(2);
              }}
              className="text-[11px] text-[#2d5868] hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset to <em>a</em> = <em>b</em> = <em>c</em>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs text-[#475467] mb-1">
                <span>Variable <em>a</em></span>
                <span className="font-mono text-[#2d5868] font-bold">{paramA.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.1"
                value={paramA}
                onChange={(e) => setParamA(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#475467] mb-1">
                <span>Variable <em>b</em></span>
                <span className="font-mono text-[#2d5868] font-bold">{paramB.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.1"
                value={paramB}
                onChange={(e) => setParamB(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#475467] mb-1">
                <span>Variable <em>c</em></span>
                <span className="font-mono text-[#2d5868] font-bold">{paramC.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.1"
                value={paramC}
                onChange={(e) => setParamC(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#e2d8c7] font-mono">
            <div>LHS: <span className="font-bold text-[#182029]">{lhs.toFixed(2)}</span></div>
            <div>RHS: <span className="font-bold text-[#182029]">{rhs.toFixed(2)}</span></div>
            <div className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              LHS − RHS = {delta >= -0.001 ? Math.max(0, delta).toFixed(2) : 0} ≥ 0 {Math.abs(delta) < 0.01 && '(Equality!)'}
            </div>
          </div>
        </div>

        {/* Lower Row: Tangent Curves Diagram & Quote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          {/* Tangent Curves Diagram matching Screenshot 3 */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-64 h-36">
              <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                {/* Horizontal Axis */}
                <line x1="20" y1="100" x2="180" y2="100" stroke="#d0c6b4" strokeWidth="1.2" />
                {/* Vertical Axis */}
                <line x1="100" y1="15" x2="100" y2="105" stroke="#d0c6b4" strokeWidth="1.2" />

                {/* Blue Outer Curve */}
                <path
                  d="M 35 95 Q 100 20 165 95"
                  fill="none"
                  stroke="#2d5868"
                  strokeWidth="2"
                />

                {/* Terracotta Inner Curve */}
                <path
                  d="M 45 95 Q 100 40 155 95"
                  fill="none"
                  stroke="#b86822"
                  strokeWidth="1.5"
                />

                {/* Tangency Peak Dot */}
                <circle cx="100" cy="30" r="3.5" fill="#2d5868" />

                {/* Label a = b = c */}
                <text
                  x="106"
                  y="26"
                  fontSize="10"
                  fontFamily="Newsreader, serif"
                  fontStyle="italic"
                  fill="#475467"
                >
                  a = b = c
                </text>
              </svg>
            </div>
          </div>

          {/* Editorial Philosophy Quote */}
          <div className="text-center md:text-right">
            <blockquote className="font-serif-editorial italic text-2xl sm:text-3xl text-[#2d5868] leading-tight">
              A way of seeing,<br />
              before a way of solving.
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};
