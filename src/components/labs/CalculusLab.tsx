import React, { useState, useRef, useEffect, useCallback } from 'react';
import { evaluateMathFunction, numericalIntegral } from '../../utils/mathUtils';
import { BarChart3, TrendingUp, Sliders } from 'lucide-react';
import { InlineMath, BlockMath } from '../common/MathView';

export const CalculusLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'riemann' | 'taylor' | 'limits'>('riemann');

  // Riemann state
  const [funcExpr, setFuncExpr] = useState('x^2 - 2');
  const [lowerA, setLowerA] = useState(-1);
  const [upperB, setUpperB] = useState(3);
  const [partitionsN, setPartitionsN] = useState(12);
  const [riemannMethod, setRiemannMethod] = useState<'left' | 'right' | 'mid' | 'trapezoid'>('mid');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Taylor state
  const [taylorFunction, setTaylorFunction] = useState<'sin' | 'cos' | 'exp' | 'ln'>('sin');
  const [taylorDegree, setTaylorDegree] = useState(5);
  const taylorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Limit state
  const [limitPreset, setLimitPreset] = useState<'sinc' | 'removable' | 'euler'>('sinc');

  const getTaylorLatex = () => {
    switch (taylorFunction) {
      case 'sin':
        return '\\sin(x) = \\sum_{k=0}^{\\infty} \\frac{(-1)^k}{(2k+1)!} x^{2k+1} \\approx x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots';
      case 'cos':
        return '\\cos(x) = \\sum_{k=0}^{\\infty} \\frac{(-1)^k}{(2k)!} x^{2k} \\approx 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots';
      case 'exp':
        return 'e^x = \\sum_{k=0}^{\\infty} \\frac{x^k}{k!} \\approx 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots';
      case 'ln':
        return '\\ln(1+x) = \\sum_{k=1}^{\\infty} \\frac{(-1)^{k-1}}{k} x^k \\approx x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots';
    }
  };

  const getLimitLatex = () => {
    switch (limitPreset) {
      case 'sinc':
        return '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1';
      case 'removable':
        return '\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = \\lim_{x \\to 1} (x + 1) = 2';
      case 'euler':
        return '\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e \\approx 2.71828';
    }
  };

  const drawRiemann = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const a = Math.min(lowerA, upperB);
    const b = Math.max(lowerA, upperB);
    const n = Math.max(1, partitionsN);
    const dx = (b - a) / n;

    const marginX = (b - a) * 0.3 || 2;
    const minX = a - marginX;
    const maxX = b + marginX;

    let minY = -1;
    let maxY = 5;
    for (let x = minX; x <= maxX; x += (maxX - minX) / 100) {
      const y = evaluateMathFunction(funcExpr, x);
      if (!isNaN(y) && isFinite(y)) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    const marginY = (maxY - minY) * 0.2 || 2;
    minY -= marginY;
    maxY += marginY;

    const toScreenX = (x: number) => ((x - minX) / (maxX - minX)) * width;
    const toScreenY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

    // Canvas background
    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid axes
    ctx.strokeStyle = '#e2dacb';
    ctx.lineWidth = 1.5;
    const axisY = toScreenY(0);
    ctx.beginPath();
    ctx.moveTo(0, axisY);
    ctx.lineTo(width, axisY);
    ctx.stroke();

    const axisX = toScreenX(0);
    ctx.beginPath();
    ctx.moveTo(axisX, 0);
    ctx.lineTo(axisX, height);
    ctx.stroke();

    // Slices / Trapezoids
    ctx.lineWidth = 1;
    for (let i = 0; i < n; i++) {
      const xLeft = a + i * dx;
      const xRight = xLeft + dx;
      let evalX = xLeft;

      if (riemannMethod === 'right') evalX = xRight;
      else if (riemannMethod === 'mid') evalX = (xLeft + xRight) / 2;

      const yLeft = evaluateMathFunction(funcExpr, xLeft);
      const yRight = evaluateMathFunction(funcExpr, xRight);
      const yEval = evaluateMathFunction(funcExpr, evalX);

      const sxLeft = toScreenX(xLeft);
      const sxRight = toScreenX(xRight);
      const syZero = toScreenY(0);

      if (riemannMethod === 'trapezoid') {
        const syL = toScreenY(isNaN(yLeft) ? 0 : yLeft);
        const syR = toScreenY(isNaN(yRight) ? 0 : yRight);

        ctx.fillStyle = 'rgba(45, 88, 104, 0.16)';
        ctx.strokeStyle = '#2d5868';
        ctx.beginPath();
        ctx.moveTo(sxLeft, syZero);
        ctx.lineTo(sxLeft, syL);
        ctx.lineTo(sxRight, syR);
        ctx.lineTo(sxRight, syZero);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        const syEval = toScreenY(isNaN(yEval) ? 0 : yEval);
        ctx.fillStyle = 'rgba(45, 88, 104, 0.16)';
        ctx.strokeStyle = '#2d5868';

        ctx.beginPath();
        ctx.rect(sxLeft, Math.min(syZero, syEval), sxRight - sxLeft, Math.abs(syZero - syEval));
        ctx.fill();
        ctx.stroke();
      }
    }

    // Function curve f(x)
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#b86822';
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= width; px += 2) {
      const x = minX + (px / width) * (maxX - minX);
      const y = evaluateMathFunction(funcExpr, x);
      if (isNaN(y) || Math.abs(y) > 1000) {
        started = false;
        continue;
      }
      const sy = toScreenY(y);
      if (!started) {
        ctx.moveTo(px, sy);
        started = true;
      } else {
        ctx.lineTo(px, sy);
      }
    }
    ctx.stroke();

    ctx.restore();
  }, [funcExpr, lowerA, upperB, partitionsN, riemannMethod]);

  const a = Math.min(lowerA, upperB);
  const b = Math.max(lowerA, upperB);
  const n = Math.max(1, partitionsN);
  const dx = (b - a) / n;
  let approxSum = 0;

  for (let i = 0; i < n; i++) {
    const xL = a + i * dx;
    const xR = xL + dx;
    if (riemannMethod === 'trapezoid') {
      const yL = evaluateMathFunction(funcExpr, xL) || 0;
      const yR = evaluateMathFunction(funcExpr, xR) || 0;
      approxSum += 0.5 * (yL + yR) * dx;
    } else {
      let xEval = xL;
      if (riemannMethod === 'right') xEval = xR;
      if (riemannMethod === 'mid') xEval = (xL + xR) / 2;
      const y = evaluateMathFunction(funcExpr, xEval) || 0;
      approxSum += y * dx;
    }
  }

  const exactIntegral = numericalIntegral((x) => evaluateMathFunction(funcExpr, x), a, b, 400);
  const absoluteError = Math.abs(exactIntegral - approxSum);
  const percentError = exactIntegral !== 0 ? (absoluteError / Math.abs(exactIntegral)) * 100 : 0;

  const drawTaylor = useCallback(() => {
    const canvas = taylorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const minX = -6;
    const maxX = 6;
    const minY = -4;
    const maxY = 4;

    const toScreenX = (x: number) => ((x - minX) / (maxX - minX)) * width;
    const toScreenY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#e2dacb';
    ctx.lineWidth = 1;
    for (let x = -6; x <= 6; x += 1) {
      ctx.beginPath();
      ctx.moveTo(toScreenX(x), 0);
      ctx.lineTo(toScreenX(x), height);
      ctx.stroke();
    }
    for (let y = -4; y <= 4; y += 1) {
      ctx.beginPath();
      ctx.moveTo(0, toScreenY(y));
      ctx.lineTo(width, toScreenY(y));
      ctx.stroke();
    }

    ctx.strokeStyle = '#667085';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, toScreenY(0));
    ctx.lineTo(width, toScreenY(0));
    ctx.moveTo(toScreenX(0), 0);
    ctx.lineTo(toScreenX(0), height);
    ctx.stroke();

    // True Function Curve (Deep Slate Teal)
    ctx.strokeStyle = '#2d5868';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= width; px += 2) {
      const x = minX + (px / width) * (maxX - minX);
      let y = 0;
      if (taylorFunction === 'sin') y = Math.sin(x);
      else if (taylorFunction === 'cos') y = Math.cos(x);
      else if (taylorFunction === 'exp') y = Math.exp(x);
      else if (taylorFunction === 'ln') y = x > -1 ? Math.log(1 + x) : NaN;

      if (isNaN(y) || Math.abs(y) > 20) {
        started = false;
        continue;
      }
      const sy = toScreenY(y);
      if (!started) {
        ctx.moveTo(px, sy);
        started = true;
      } else {
        ctx.lineTo(px, sy);
      }
    }
    ctx.stroke();

    // Taylor Polynomial (Terracotta Dashed)
    ctx.strokeStyle = '#b86822';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    started = false;

    const fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800];

    for (let px = 0; px <= width; px += 2) {
      const x = minX + (px / width) * (maxX - minX);
      let pY = 0;

      if (taylorFunction === 'sin') {
        for (let k = 0; 2 * k + 1 <= taylorDegree; k++) {
          const power = 2 * k + 1;
          const sign = k % 2 === 0 ? 1 : -1;
          pY += (sign * Math.pow(x, power)) / (fact[power] || 1);
        }
      } else if (taylorFunction === 'cos') {
        for (let k = 0; 2 * k <= taylorDegree; k++) {
          const power = 2 * k;
          const sign = k % 2 === 0 ? 1 : -1;
          pY += (sign * Math.pow(x, power)) / (fact[power] || 1);
        }
      } else if (taylorFunction === 'exp') {
        for (let k = 0; k <= taylorDegree; k++) {
          pY += Math.pow(x, k) / (fact[k] || 1);
        }
      } else if (taylorFunction === 'ln') {
        for (let k = 1; k <= taylorDegree; k++) {
          const sign = k % 2 === 1 ? 1 : -1;
          pY += (sign * Math.pow(x, k)) / k;
        }
      }

      if (isNaN(pY) || Math.abs(pY) > 20) {
        started = false;
        continue;
      }
      const sy = toScreenY(pY);
      if (!started) {
        ctx.moveTo(px, sy);
        started = true;
      } else {
        ctx.lineTo(px, sy);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }, [taylorFunction, taylorDegree]);

  useEffect(() => {
    if (activeTab === 'riemann') {
      drawRiemann();
    } else if (activeTab === 'taylor') {
      drawTaylor();
    }
  }, [activeTab, drawRiemann, drawTaylor]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#e2d8c7]">
              Laboratory 03
            </span>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Calculus & Limits Sandbox
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Examine convergence of numerical Riemann integrals, inspect Taylor series expansions, and explore limit behavior.
          </p>
        </div>
        <div className="flex items-center bg-[#faf7f2] p-1 rounded-xl border border-[#ded5c5]">
          <button
            onClick={() => setActiveTab('riemann')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'riemann' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Riemann Sums
          </button>
          <button
            onClick={() => setActiveTab('taylor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'taylor' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Taylor Series
          </button>
          <button
            onClick={() => setActiveTab('limits')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'limits' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Limits Explorer
          </button>
        </div>
      </div>

      {activeTab === 'riemann' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-[#ded5c5] px-3 py-2 rounded-xl text-xs space-y-1 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#b86822]" />
                  <span className="font-mono text-[#b86822] font-semibold text-[11px]">f(x) = {funcExpr}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-2 bg-[#2d5868]/20 border border-[#2d5868]" />
                  <span className="font-mono text-[#2d5868] font-semibold text-[11px]">
                    {riemannMethod.toUpperCase()} (n = {n})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">Riemann Configuration</h3>

              <div>
                <label className="text-xs text-[#475467] block mb-1">Integrand f(x)</label>
                <input
                  type="text"
                  value={funcExpr}
                  onChange={(e) => setFuncExpr(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-2.5 py-1.5 font-mono text-xs text-[#182029] focus:outline-none focus:border-[#2d5868]"
                />
              </div>

              <div>
                <label className="text-xs text-[#475467] block mb-1">Partition Rule</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {(['left', 'right', 'mid', 'trapezoid'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setRiemannMethod(m)}
                      className={`px-2 py-1.5 rounded-lg border capitalize transition shadow-xs ${
                        riemannMethod === m
                          ? 'bg-[#254553] text-white border-[#254553] font-semibold'
                          : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                      }`}
                    >
                      {m === 'mid' ? 'Midpoint' : m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-[#475467] block mb-1">Lower a</label>
                  <input
                    type="number"
                    step="0.5"
                    value={lowerA}
                    onChange={(e) => setLowerA(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-2 py-1 font-mono text-xs text-[#182029]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#475467] block mb-1">Upper b</label>
                  <input
                    type="number"
                    step="0.5"
                    value={upperB}
                    onChange={(e) => setUpperB(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-2 py-1 font-mono text-xs text-[#182029]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#475467] mb-1">
                  <span>Partitions (n)</span>
                  <span className="font-mono text-[#2d5868] font-bold">{partitionsN} slices</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="64"
                  value={partitionsN}
                  onChange={(e) => setPartitionsN(parseInt(e.target.value))}
                  className="w-full accent-[#2d5868] cursor-pointer"
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-white dark:bg-slate-900 border border-[#ded5c5] dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-400">
                Convergence & Partition Calculus
              </h3>

              {/* KaTeX Integral Formula Header */}
              <div className="bg-[#faf7f2] dark:bg-slate-950/60 p-3 rounded-xl border border-[#ded5c5] dark:border-slate-800 text-center">
                <BlockMath math={`\\int_{${lowerA}}^{${upperB}} (${funcExpr})\\,dx \\approx \\sum_{i=1}^{${partitionsN}} f(x_i^*)\\,\\Delta x`} className="text-xs text-[#2d5868] dark:text-sky-300 py-1" />
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  <InlineMath math={`\\Delta x = \\frac{${upperB} - (${lowerA})}{${partitionsN}} = ${((upperB - lowerA) / partitionsN).toFixed(4)}`} />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-[#faf7f2] dark:bg-slate-800/60 p-3 rounded-xl border border-[#ded5c5] dark:border-slate-700 flex justify-between items-center">
                  <span className="text-[#667085] dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <span>Riemann Sum</span>
                    <InlineMath math={`S_{${partitionsN}}:`} />
                  </span>
                  <span className="font-mono text-[#2d5868] dark:text-sky-400 font-bold text-sm">{approxSum.toFixed(5)}</span>
                </div>
                <div className="bg-[#faf7f2] dark:bg-slate-800/60 p-3 rounded-xl border border-[#ded5c5] dark:border-slate-700 flex justify-between items-center">
                  <span className="text-[#667085] dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <span>Exact Integral</span>
                    <InlineMath math="I:" />
                  </span>
                  <span className="font-mono text-[#166534] dark:text-emerald-400 font-bold text-sm">{exactIntegral.toFixed(5)}</span>
                </div>
                <div className="bg-[#faf7f2] dark:bg-slate-800/60 p-3 rounded-xl border border-[#ded5c5] dark:border-slate-700 flex justify-between items-center">
                  <span className="text-[#667085] dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <span>Approximation Error</span>
                    <InlineMath math="|I - S_N|:" />
                  </span>
                  <span className="font-mono text-[#b86822] dark:text-amber-400 font-semibold">{absoluteError.toFixed(5)} ({percentError.toFixed(2)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'taylor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm">
              <canvas ref={taylorCanvasRef} className="w-full h-full block" />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-[#ded5c5] px-3 py-2 rounded-xl text-xs space-y-1 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#2d5868]" />
                  <span className="font-mono text-[#2d5868] font-semibold text-[11px]">Exact function</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 border-b border-dashed border-[#b86822]" />
                  <span className="font-mono text-[#b86822] font-semibold text-[11px]">Taylor Degree N = {taylorDegree}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">Expansion Settings</h3>

              <div>
                <label className="text-xs text-[#475467] block mb-1">Target Function</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'sin', label: 'sin(x)' },
                    { id: 'cos', label: 'cos(x)' },
                    { id: 'exp', label: 'e^x' },
                    { id: 'ln', label: 'ln(1+x)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setTaylorFunction(f.id as any)}
                      className={`px-3 py-2 rounded-xl border font-mono transition shadow-xs ${
                        taylorFunction === f.id
                          ? 'bg-[#254553] text-white border-[#254553] font-bold'
                          : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#475467] mb-1">
                  <span>Polynomial Degree (N)</span>
                  <span className="font-mono text-[#b86822] font-bold">{taylorDegree}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="11"
                  step="1"
                  value={taylorDegree}
                  onChange={(e) => setTaylorDegree(parseInt(e.target.value))}
                  className="w-full accent-[#b86822] cursor-pointer"
                />
              </div>

              {/* KaTeX Taylor Series Formula Card */}
              <div className="bg-[#faf7f2] dark:bg-slate-950/60 p-3.5 rounded-xl border border-[#ded5c5] dark:border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#b86822] dark:text-amber-400 block">
                  Active Taylor Series Expansion
                </span>
                <BlockMath math={getTaylorLatex()} className="text-xs text-[#2d5868] dark:text-sky-300 py-1" />
                <div className="text-[11px] text-slate-500 leading-snug">
                  Maclaurin series centered at <InlineMath math="a = 0" /> truncated at polynomial degree <InlineMath math={`N = ${taylorDegree}`} />.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'limits' && (
        <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#182029]">Numerical Limit Inspection</h3>
              <p className="text-xs text-[#475467] mt-1">
                Investigate indeterminate forms like 0/0 and 1^∞ by evaluating approaching sequence values.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'sinc', label: 'lim(x→0) sin(x)/x' },
                { id: 'removable', label: 'lim(x→1) (x²-1)/(x-1)' },
                { id: 'euler', label: 'lim(x→∞) (1+1/x)^x' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setLimitPreset(p.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition shadow-xs ${
                    limitPreset === p.id
                      ? 'bg-[#254553] text-white border-[#254553]'
                      : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Limit Mathematical Equation Banner */}
          <div className="bg-[#faf7f2] dark:bg-slate-950/60 p-4 rounded-xl border border-[#ded5c5] dark:border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-[#2d5868] dark:text-sky-400 block mb-1">
              Exact Analytic Limit Expression
            </span>
            <BlockMath math={getLimitLatex()} className="text-base text-[#2d5868] dark:text-sky-300 py-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#ded5c5]">
              <span className="text-xs font-bold text-[#2d5868] block mb-2 font-serif-editorial">
                Approaching from the Left (x → c⁻)
              </span>
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="border-b border-[#e2d8c7] text-[#667085]">
                    <th className="pb-1.5">x</th>
                    <th className="pb-1.5">f(x)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee7db] text-[#182029]">
                  {limitPreset === 'sinc' && [
                    { x: -0.1, y: Math.sin(-0.1) / -0.1 },
                    { x: -0.01, y: Math.sin(-0.01) / -0.01 },
                    { x: -0.001, y: Math.sin(-0.001) / -0.001 },
                    { x: -0.0001, y: Math.sin(-0.0001) / -0.0001 },
                  ].map((row) => (
                    <tr key={row.x}>
                      <td className="py-1 text-[#667085]">{row.x}</td>
                      <td className="py-1 text-[#166534] font-bold">{row.y.toFixed(7)}</td>
                    </tr>
                  ))}
                  {limitPreset === 'removable' && [
                    { x: 0.9, y: (0.9 ** 2 - 1) / (0.9 - 1) },
                    { x: 0.99, y: (0.99 ** 2 - 1) / (0.99 - 1) },
                    { x: 0.999, y: (0.999 ** 2 - 1) / (0.999 - 1) },
                    { x: 0.9999, y: (0.9999 ** 2 - 1) / (0.9999 - 1) },
                  ].map((row) => (
                    <tr key={row.x}>
                      <td className="py-1 text-[#667085]">{row.x}</td>
                      <td className="py-1 text-[#166534] font-bold">{row.y.toFixed(7)}</td>
                    </tr>
                  ))}
                  {limitPreset === 'euler' && [
                    { x: 10, y: Math.pow(1 + 1 / 10, 10) },
                    { x: 100, y: Math.pow(1 + 1 / 100, 100) },
                    { x: 1000, y: Math.pow(1 + 1 / 1000, 1000) },
                    { x: 10000, y: Math.pow(1 + 1 / 10000, 1000) },
                  ].map((row) => (
                    <tr key={row.x}>
                      <td className="py-1 text-[#667085]">{row.x}</td>
                      <td className="py-1 text-[#166534] font-bold">{row.y.toFixed(7)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#ded5c5]">
              <span className="text-xs font-bold text-[#b86822] block mb-2 font-serif-editorial">
                Approaching from the Right (x → c⁺)
              </span>
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="border-b border-[#e2d8c7] text-[#667085]">
                    <th className="pb-1.5">x</th>
                    <th className="pb-1.5">f(x)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee7db] text-[#182029]">
                  {limitPreset === 'sinc' && [
                    { x: 0.1, y: Math.sin(0.1) / 0.1 },
                    { x: 0.01, y: Math.sin(0.01) / 0.01 },
                    { x: 0.001, y: Math.sin(0.001) / 0.001 },
                    { x: 0.0001, y: Math.sin(0.0001) / 0.0001 },
                  ].map((row) => (
                    <tr key={row.x}>
                      <td className="py-1 text-[#667085]">{row.x}</td>
                      <td className="py-1 text-[#166534] font-bold">{row.y.toFixed(7)}</td>
                    </tr>
                  ))}
                  {limitPreset === 'removable' && [
                    { x: 1.1, y: (1.1 ** 2 - 1) / (1.1 - 1) },
                    { x: 1.01, y: (1.01 ** 2 - 1) / (1.01 - 1) },
                    { x: 1.001, y: (1.001 ** 2 - 1) / (1.001 - 1) },
                    { x: 1.0001, y: (1.0001 ** 2 - 1) / (1.0001 - 1) },
                  ].map((row) => (
                    <tr key={row.x}>
                      <td className="py-1 text-[#667085]">{row.x}</td>
                      <td className="py-1 text-[#166534] font-bold">{row.y.toFixed(7)}</td>
                    </tr>
                  ))}
                  {limitPreset === 'euler' && [
                    { x: 100000, y: Math.pow(1 + 1 / 100000, 100000) },
                    { x: 1000000, y: Math.pow(1 + 1 / 100000, 1000000) },
                    { x: 10000000, y: Math.pow(1 + 1 / 10000000, 10000000) },
                    { x: "Euler's e", y: Math.E },
                  ].map((row) => (
                    <tr key={String(row.x)}>
                      <td className="py-1 text-[#667085]">{row.x}</td>
                      <td className="py-1 text-[#166534] font-bold">{row.y.toFixed(7)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
