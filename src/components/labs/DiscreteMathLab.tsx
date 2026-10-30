import React, { useState } from 'react';
import { primeFactors, gcdWithSteps, combinations } from '../../utils/mathUtils';
import { Hash, Clock } from 'lucide-react';

export const DiscreteMathLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'primes' | 'gcd' | 'mod' | 'pascal'>('primes');

  const [primeInput, setPrimeInput] = useState<number>(360);
  const [gcdA, setGcdA] = useState<number>(252);
  const [gcdB, setGcdB] = useState<number>(105);
  const [modN, setModN] = useState<number>(12);
  const [modVal, setModVal] = useState<number>(17);
  const [combN, setCombN] = useState<number>(8);
  const [combK, setCombK] = useState<number>(3);

  const factors = primeFactors(primeInput);
  const factorStr = factors.map((f) => (f.power > 1 ? `${f.factor}^${f.power}` : `${f.factor}`)).join(' × ') || '1';

  const { gcd, steps: gcdSteps } = gcdWithSteps(gcdA, gcdB);

  const generatePascal = (rows: number) => {
    const triangle: number[][] = [];
    for (let r = 0; r <= rows; r++) {
      const row: number[] = [];
      for (let c = 0; c <= r; c++) {
        row.push(combinations(r, c));
      }
      triangle.push(row);
    }
    return triangle;
  };
  const pascalTriangle = generatePascal(8);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#e2d8c7]">
              Laboratory 06
            </span>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Number Theory & Discrete Math
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Explore the fundamental building blocks of arithmetic: prime factorization, Euclidean division algorithm, modular arithmetic clock, and Pascal combinatorics.
          </p>
        </div>
        <div className="flex items-center bg-[#faf7f2] p-1 rounded-xl border border-[#ded5c5]">
          <button
            onClick={() => setActiveTab('primes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'primes' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Primes & Sieve
          </button>
          <button
            onClick={() => setActiveTab('gcd')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'gcd' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Euclidean GCD
          </button>
          <button
            onClick={() => setActiveTab('mod')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'mod' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Modular Clock
          </button>
          <button
            onClick={() => setActiveTab('pascal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'pascal' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Pascal's Triangle
          </button>
        </div>
      </div>

      {activeTab === 'primes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] flex items-center gap-2 font-serif-editorial">
                <Hash className="w-4 h-4 text-[#2d5868]" />
                Prime Factorization Engine
              </h3>

              <div>
                <label className="text-xs text-[#475467] block mb-1">Enter Integer N (&gt; 1)</label>
                <input
                  type="number"
                  min="2"
                  max="1000000"
                  value={primeInput}
                  onChange={(e) => setPrimeInput(parseInt(e.target.value) || 2)}
                  className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-2 font-mono text-base text-[#182029] font-bold"
                />
              </div>

              <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#ded5c5] space-y-2">
                <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-bold">
                  Canonical Prime Representation:
                </span>
                <div className="text-xl font-mono font-bold text-[#182029]">
                  {primeInput} = <span className="text-[#2d5868]">{factorStr}</span>
                </div>
                <div className="text-xs text-[#667085] pt-1 border-t border-[#ded5c5]">
                  {factors.length === 1 && factors[0].power === 1
                    ? '✨ This number is a prime!'
                    : `Composite number with ${factors.length} distinct prime factor(s).`}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">
                  Sieve of Eratosthenes (1 to 100)
                </h3>
                <span className="text-xs text-[#166534] font-mono font-semibold">25 Primes</span>
              </div>

              <div className="grid grid-cols-10 gap-1.5 text-center font-mono text-xs">
                {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => {
                  const isPrime = n > 1 && primeFactors(n).length === 1 && primeFactors(n)[0].power === 1;
                  return (
                    <div
                      key={n}
                      className={`p-1.5 rounded-lg transition ${
                        isPrime
                          ? 'bg-[#166534]/15 text-[#166534] font-bold border border-[#166534]/30 shadow-xs'
                          : n === 1
                          ? 'bg-[#faf7f2] text-[#98a2b3]'
                          : 'bg-[#faf7f2] text-[#475467] border border-[#eee7db]'
                      }`}
                    >
                      {n}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gcd' && (
        <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#475467] block mb-1">First Number (a)</label>
              <input
                type="number"
                value={gcdA}
                onChange={(e) => setGcdA(parseInt(e.target.value) || 1)}
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-2 font-mono text-base text-[#182029] font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-[#475467] block mb-1">Second Number (b)</label>
              <input
                type="number"
                value={gcdB}
                onChange={(e) => setGcdB(parseInt(e.target.value) || 1)}
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-2 font-mono text-base text-[#182029] font-bold"
              />
            </div>
          </div>

          <div className="bg-[#faf7f2] p-5 rounded-xl border border-[#ded5c5] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#ded5c5]">
              <span className="text-sm font-bold text-[#182029] font-serif-editorial">
                Euclidean Remainder Reductions:
              </span>
              <span className="text-sm font-mono font-bold text-[#166534]">
                gcd({gcdA}, {gcdB}) = {gcd}
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {gcdSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[#475467]">
                  <span className="text-[#98a2b3] w-8">#{idx + 1}:</span>
                  <span className="text-[#182029] font-bold">{step.a}</span> ={' '}
                  <span className="text-[#2d5868]">{step.q}</span> ×{' '}
                  <span className="text-[#182029]">{step.b}</span> +{' '}
                  <span className={step.r === 0 ? 'text-[#166534] font-bold' : 'text-[#b86822]'}>
                    {step.r}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mod' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] flex items-center gap-2 font-serif-editorial">
                <Clock className="w-4 h-4 text-[#2d5868]" />
                Modular Arithmetic (ℤ / nℤ)
              </h3>

              <div>
                <label className="text-xs text-[#475467] block mb-1">Value (x)</label>
                <input
                  type="number"
                  value={modVal}
                  onChange={(e) => setModVal(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-2 font-mono text-base text-[#182029] font-bold"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#475467] mb-1">
                  <span>Modulus (n)</span>
                  <span className="font-mono text-[#2d5868] font-bold">n = {modN}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  value={modN}
                  onChange={(e) => setModN(parseInt(e.target.value))}
                  className="w-full accent-[#2d5868] cursor-pointer"
                />
              </div>

              <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#ded5c5] text-center space-y-1">
                <span className="text-xs text-[#667085]">Modular Congruence:</span>
                <div className="text-2xl font-mono font-bold text-[#166534]">
                  {modVal} ≡ {((modVal % modN) + modN) % modN} (mod {modN})
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">
                Clock Dial Visualizer (mod {modN})
              </h3>
              <div className="flex justify-center p-6">
                <div className="relative w-64 h-64 rounded-full border-2 border-[#d0c6b4] bg-[#faf7f2] flex items-center justify-center shadow-inner">
                  {Array.from({ length: modN }, (_, i) => {
                    const angle = (i * 2 * Math.PI) / modN - Math.PI / 2;
                    const radius = 100;
                    const x = 128 + radius * Math.cos(angle);
                    const y = 128 + radius * Math.sin(angle);
                    const isSelected = i === ((modVal % modN) + modN) % modN;

                    return (
                      <div
                        key={i}
                        className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#254553] text-white shadow-md scale-125 z-10'
                            : 'bg-white text-[#475467] border border-[#ded5c5]'
                        }`}
                        style={{ left: `${x}px`, top: `${y}px` }}
                      >
                        {i}
                      </div>
                    );
                  })}
                  <div className="text-center">
                    <span className="text-[10px] text-[#98a2b3] uppercase font-bold block">Remainder</span>
                    <span className="text-2xl font-mono font-bold text-[#2d5868]">
                      {((modVal % modN) + modN) % modN}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pascal' && (
        <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">
                Pascal's Triangle & Binomial Coefficients
              </h3>
              <p className="text-xs text-[#475467]">
                Each entry is the sum of the two directly above: C(n, k) = C(n-1, k-1) + C(n-1, k).
              </p>
            </div>
            <div className="text-xs font-mono text-[#475467]">
              C({combN}, {combK}) ={' '}
              <span className="text-[#2d5868] font-bold text-sm">
                {combinations(combN, combK)}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto py-4">
            <div className="flex flex-col items-center gap-2 min-w-[500px]">
              {pascalTriangle.map((row, r) => (
                <div key={r} className="flex gap-2 justify-center">
                  {row.map((val, c) => (
                    <div
                      key={c}
                      onClick={() => {
                        setCombN(r);
                        setCombK(c);
                      }}
                      className={`w-9 h-7 rounded-lg flex items-center justify-center text-xs font-mono cursor-pointer transition ${
                        r === combN && c === combK
                          ? 'bg-[#254553] text-white font-bold scale-110 shadow-xs'
                          : 'bg-[#faf7f2] text-[#182029] hover:bg-[#ede5d6] border border-[#ded5c5]'
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
