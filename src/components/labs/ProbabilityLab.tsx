import React, { useState, useRef, useEffect, useCallback } from 'react';
import { combinations, factorial } from '../../utils/mathUtils';
import { Play, RotateCcw, Target } from 'lucide-react';

export const ProbabilityLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distributions' | 'monte-carlo' | 'buffon'>('distributions');

  const [distType, setDistType] = useState<'normal' | 'binomial' | 'poisson'>('normal');
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [binN, setBinN] = useState(20);
  const [binP, setBinP] = useState(0.5);
  const [lambdaP, setLambdaP] = useState(4);
  const distCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [coinFlips, setCoinFlips] = useState<{ total: number; heads: number; ratio: number }[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const simCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [buffonDrops, setBuffonDrops] = useState<{ x: number; y: number; angle: number; crosses: boolean }[]>([]);
  const [totalNeedles, setTotalNeedles] = useState(0);
  const [crossings, setCrossings] = useState(0);
  const buffonCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawDistribution = useCallback(() => {
    const canvas = distCanvasRef.current;
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

    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    const padBottom = 40;
    const padTop = 30;
    const padX = 50;
    const plotW = width - 2 * padX;
    const plotH = height - padTop - padBottom;

    if (distType === 'normal') {
      const minX = mu - 4 * sigma;
      const maxX = mu + 4 * sigma;
      const maxPdf = 1 / (sigma * Math.sqrt(2 * Math.PI));

      const toScreenX = (x: number) => padX + ((x - minX) / (maxX - minX)) * plotW;
      const toScreenY = (y: number) => height - padBottom - (y / (maxPdf * 1.15)) * plotH;

      const drawZone = (x1: number, x2: number, fill: string) => {
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.moveTo(toScreenX(x1), toScreenY(0));
        for (let x = x1; x <= x2; x += (x2 - x1) / 50) {
          const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
          ctx.lineTo(toScreenX(x), toScreenY(y));
        }
        ctx.lineTo(toScreenX(x2), toScreenY(0));
        ctx.closePath();
        ctx.fill();
      };

      drawZone(mu - 3 * sigma, mu + 3 * sigma, 'rgba(45, 88, 104, 0.05)');
      drawZone(mu - 2 * sigma, mu + 2 * sigma, 'rgba(45, 88, 104, 0.12)');
      drawZone(mu - sigma, mu + sigma, 'rgba(45, 88, 104, 0.22)');

      ctx.strokeStyle = '#2d5868';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const x = minX + (px / plotW) * (maxX - minX);
        const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
        const sy = toScreenY(y);
        if (px === 0) ctx.moveTo(padX + px, sy);
        else ctx.lineTo(padX + px, sy);
      }
      ctx.stroke();

      ctx.strokeStyle = '#b86822';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(toScreenX(mu), toScreenY(0));
      ctx.lineTo(toScreenX(mu), toScreenY(maxPdf));
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (distType === 'binomial') {
      const n = binN;
      const p = binP;
      const barW = Math.max(3, (plotW / (n + 1)) * 0.7);

      let maxP = 0;
      const probs: number[] = [];
      for (let k = 0; k <= n; k++) {
        const prob = combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        probs.push(prob);
        if (prob > maxP) maxP = prob;
      }

      for (let k = 0; k <= n; k++) {
        const prob = probs[k];
        const barH = (prob / (maxP * 1.15)) * plotH;
        const x = padX + (k / (n + 1)) * plotW;
        const y = height - padBottom - barH;

        ctx.fillStyle = 'rgba(45, 88, 104, 0.35)';
        ctx.strokeStyle = '#2d5868';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(x - barW / 2, y, barW, barH);
        ctx.fill();
        ctx.stroke();
      }
    } else if (distType === 'poisson') {
      const lam = lambdaP;
      const maxK = Math.max(15, Math.ceil(lam * 2.5));
      const barW = Math.max(4, (plotW / (maxK + 1)) * 0.7);

      let maxP = 0;
      const probs: number[] = [];
      for (let k = 0; k <= maxK; k++) {
        const prob = (Math.pow(lam, k) * Math.exp(-lam)) / factorial(k);
        probs.push(prob);
        if (prob > maxP) maxP = prob;
      }

      for (let k = 0; k <= maxK; k++) {
        const prob = probs[k];
        const barH = (prob / (maxP * 1.15)) * plotH;
        const x = padX + (k / (maxK + 1)) * plotW;
        const y = height - padBottom - barH;

        ctx.fillStyle = 'rgba(22, 101, 52, 0.35)';
        ctx.strokeStyle = '#166534';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(x - barW / 2, y, barW, barH);
        ctx.fill();
        ctx.stroke();
      }
    }

    ctx.strokeStyle = '#667085';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, height - padBottom);
    ctx.lineTo(width - padX, height - padBottom);
    ctx.stroke();

    ctx.restore();
  }, [distType, mu, sigma, binN, binP, lambdaP]);

  useEffect(() => {
    if (activeTab === 'distributions') {
      drawDistribution();
    }
  }, [activeTab, drawDistribution]);

  const runCoinSimulation = () => {
    setIsSimulating(true);
    const newHistory: { total: number; heads: number; ratio: number }[] = [];
    let heads = 0;
    const totalFlips = 1000;

    for (let i = 1; i <= totalFlips; i++) {
      if (Math.random() < 0.5) heads++;
      if (i % 2 === 0 || i === totalFlips) {
        newHistory.push({ total: i, heads, ratio: heads / i });
      }
    }
    setCoinFlips(newHistory);
    setIsSimulating(false);
  };

  useEffect(() => {
    if (activeTab !== 'monte-carlo') return;
    const canvas = simCanvasRef.current;
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

    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    const yHalf = height / 2;
    ctx.strokeStyle = '#b86822';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(40, yHalf);
    ctx.lineTo(width - 20, yHalf);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#b86822';
    ctx.font = '11px "Newsreader", serif';
    ctx.fillText('Theoretical p = 0.500', 45, yHalf - 8);

    if (coinFlips.length > 0) {
      const maxFlips = coinFlips[coinFlips.length - 1].total;
      const plotW = width - 60;
      const toY = (r: number) => height - (r * height * 0.8 + height * 0.1);

      ctx.strokeStyle = '#2d5868';
      ctx.lineWidth = 2;
      ctx.beginPath();
      coinFlips.forEach((pt, idx) => {
        const sx = 40 + (pt.total / maxFlips) * plotW;
        const sy = toY(pt.ratio);
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
    }

    ctx.restore();
  }, [activeTab, coinFlips]);

  const dropNeedles = (batchCount = 250) => {
    const lineSpacing = 60;
    const needleLength = 40;
    const w = 400;
    const h = 400;

    let newCrossings = crossings;
    const newDrops = [...buffonDrops];

    for (let i = 0; i < batchCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const angle = Math.random() * Math.PI;

      const rem = y % lineSpacing;
      const distToLine = Math.min(rem, lineSpacing - rem);
      const halfLen = (needleLength / 2) * Math.sin(angle);
      const crosses = distToLine <= halfLen;

      if (crosses) newCrossings++;
      if (newDrops.length < 600) {
        newDrops.push({ x, y, angle, crosses });
      }
    }

    setCrossings(newCrossings);
    setTotalNeedles((t) => t + batchCount);
    setBuffonDrops(newDrops);
  };

  const resetBuffon = () => {
    setBuffonDrops([]);
    setTotalNeedles(0);
    setCrossings(0);
  };

  useEffect(() => {
    if (activeTab !== 'buffon') return;
    const canvas = buffonCanvasRef.current;
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

    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    const lineSpacing = 60;
    ctx.strokeStyle = '#d0c6b4';
    ctx.lineWidth = 1.5;
    for (let y = lineSpacing; y < height; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const needleLength = 40;
    buffonDrops.forEach((n) => {
      ctx.strokeStyle = n.crosses ? '#b91c1c' : '#2d5868';
      ctx.lineWidth = 1.5;
      const dx = (needleLength / 2) * Math.cos(n.angle);
      const dy = (needleLength / 2) * Math.sin(n.angle);

      ctx.beginPath();
      ctx.moveTo(n.x - dx, n.y - dy);
      ctx.lineTo(n.x + dx, n.y + dy);
      ctx.stroke();
    });

    ctx.restore();
  }, [activeTab, buffonDrops]);

  const piEstimate =
    crossings > 0 && totalNeedles > 0 ? (2 * 40 * totalNeedles) / (60 * crossings) : 0;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#e2d8c7]">
              Laboratory 05
            </span>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Statistics & Probability Lab
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Explore continuous and discrete probability distributions, witness the Law of Large Numbers, and estimate π with Buffon's needle.
          </p>
        </div>
        <div className="flex items-center bg-[#faf7f2] p-1 rounded-xl border border-[#ded5c5]">
          <button
            onClick={() => setActiveTab('distributions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'distributions' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Distributions
          </button>
          <button
            onClick={() => setActiveTab('monte-carlo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'monte-carlo' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Coin LLN
          </button>
          <button
            onClick={() => setActiveTab('buffon')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'buffon' ? 'bg-[#254553] text-white shadow-xs' : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Buffon's Needle
          </button>
        </div>
      </div>

      {activeTab === 'distributions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm">
              <canvas ref={distCanvasRef} className="w-full h-full block" />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-[#ded5c5] px-3.5 py-2 rounded-xl text-xs font-mono text-[#182029] space-y-0.5 shadow-xs">
                {distType === 'normal' && (
                  <div>Normal PDF: μ = {mu}, σ = {sigma} (68-95-99.7 Zones)</div>
                )}
                {distType === 'binomial' && (
                  <div>Binomial: n = {binN}, p = {binP} (E[X] = {(binN * binP).toFixed(1)})</div>
                )}
                {distType === 'poisson' && (
                  <div>Poisson: λ = {lambdaP}</div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">Distribution Model</h3>

              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(['normal', 'binomial', 'poisson'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setDistType(t)}
                    className={`px-2 py-2 rounded-lg border capitalize transition shadow-xs ${
                      distType === t
                        ? 'bg-[#254553] text-white border-[#254553] font-semibold'
                        : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {distType === 'normal' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-[#475467] mb-1">
                      <span>Mean (μ)</span>
                      <span className="font-mono text-[#2d5868] font-bold">{mu}</span>
                    </div>
                    <input
                      type="range"
                      min="-3"
                      max="3"
                      step="0.5"
                      value={mu}
                      onChange={(e) => setMu(parseFloat(e.target.value))}
                      className="w-full accent-[#2d5868] cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[#475467] mb-1">
                      <span>Standard Deviation (σ)</span>
                      <span className="font-mono text-[#b86822] font-bold">{sigma}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={sigma}
                      onChange={(e) => setSigma(parseFloat(e.target.value))}
                      className="w-full accent-[#b86822] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {distType === 'binomial' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-[#475467] mb-1">
                      <span>Trials (n)</span>
                      <span className="font-mono text-[#2d5868] font-bold">{binN}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={binN}
                      onChange={(e) => setBinN(parseInt(e.target.value))}
                      className="w-full accent-[#2d5868] cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[#475467] mb-1">
                      <span>Probability (p)</span>
                      <span className="font-mono text-[#b86822] font-bold">{binP.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.95"
                      step="0.05"
                      value={binP}
                      onChange={(e) => setBinP(parseFloat(e.target.value))}
                      className="w-full accent-[#b86822] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {distType === 'poisson' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-[#475467] mb-1">
                      <span>Rate (λ)</span>
                      <span className="font-mono text-[#166534] font-bold">{lambdaP}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={lambdaP}
                      onChange={(e) => setLambdaP(parseFloat(e.target.value))}
                      className="w-full accent-[#166534] cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'monte-carlo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm">
              <canvas ref={simCanvasRef} className="w-full h-full block" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">Law of Large Numbers</h3>
              <p className="text-xs text-[#475467] leading-relaxed">
                As independent Bernoulli trials grow, the sample proportion of successes converges toward theoretical p = 0.500.
              </p>

              <button
                onClick={runCoinSimulation}
                disabled={isSimulating}
                className="w-full py-2.5 bg-[#254553] hover:bg-[#1a343f] text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Play className="w-4 h-4" />
                Run 1,000 Coin Flips
              </button>

              {coinFlips.length > 0 && (
                <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#ded5c5] text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Total Flips:</span>
                    <span className="text-[#182029] font-bold">{coinFlips[coinFlips.length - 1].total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Total Heads:</span>
                    <span className="text-[#2d5868] font-bold">{coinFlips[coinFlips.length - 1].heads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Final Ratio:</span>
                    <span className="text-[#b86822] font-bold">
                      {coinFlips[coinFlips.length - 1].ratio.toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'buffon' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm">
              <canvas ref={buffonCanvasRef} className="w-full h-full block" />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">Buffon's Needle Monte Carlo π</h3>
              <p className="text-xs text-[#475467] leading-relaxed">
                Needles of length L = 40 are dropped randomly onto parallel ruled lines separated by distance D = 60. The probability of line crossing is P = 2L / (π·D).
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => dropNeedles(250)}
                  className="flex-1 py-2 bg-[#254553] hover:bg-[#1a343f] text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5" />
                  Drop 250 Needles
                </button>
                <button
                  onClick={resetBuffon}
                  className="p-2 bg-white hover:bg-[#faf7f2] text-[#475467] rounded-lg border border-[#ded5c5] transition shadow-xs"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#ded5c5] text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#667085]">Total Needles (N):</span>
                  <span className="text-[#182029] font-bold">{totalNeedles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Crossing Needles (C):</span>
                  <span className="text-[#b91c1c] font-bold">{crossings}</span>
                </div>
                <div className="pt-2 border-t border-[#ded5c5] flex justify-between items-center text-sm">
                  <span className="text-[#2d5868] font-sans font-semibold">Estimated π:</span>
                  <span className="text-[#182029] font-bold text-base">
                    {piEstimate > 0 ? piEstimate.toFixed(5) : '—'}
                  </span>
                </div>
                <div className="text-[11px] text-[#667085]">
                  True π = 3.14159 (Error: {piEstimate > 0 ? Math.abs(piEstimate - Math.PI).toFixed(5) : '—'})
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
