import React, { useState, useRef, useEffect, useCallback } from 'react';
import { evaluateMathFunction, numericalDerivative, numericalIntegral } from '../../utils/mathUtils';
import { ZoomIn, ZoomOut, RotateCcw, Sliders, Layers, Play, Pause, Compass } from 'lucide-react';

interface Preset {
  name: string;
  expr: string;
  desc: string;
}

const PRESETS: Preset[] = [
  { name: 'Harmonic Wave', expr: 'a * sin(b * x + c) + d', desc: 'Standard sinusoidal oscillation with amplitude, frequency, and phase' },
  { name: 'Damped Oscillator', expr: 'exp(-0.25 * x) * cos(2 * x)', desc: 'Exponential decay envelope modulating a cosine wave' },
  { name: 'Cubic with Extrema', expr: 'x^3 - 3*x', desc: 'Local maximum at x=-1, local minimum at x=1, inflection at x=0' },
  { name: 'Gaussian Bell', expr: 'exp(-x^2 / 2)', desc: 'Standard normal distribution probability density shape' },
  { name: 'Witch of Agnesi', expr: '1 / (x^2 + 1)', desc: 'Smooth bell-shaped curve with horizontal asymptote y = 0' },
  { name: 'Sinc Function', expr: 'sin(x) / x', desc: 'Unnormalized sinc wave with central peak at (0, 1)' },
];

export const GraphingLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Expressions
  const [func1, setFunc1] = useState('a * sin(b * x + c) + d');
  const [func2, setFunc2] = useState('0.5 * x');
  const [showFunc2, setShowFunc2] = useState(false);
  const [showDerivative, setShowDerivative] = useState(false);
  const [showTangent, setShowTangent] = useState(false);
  const [showIntegral, setShowIntegral] = useState(false);

  // Sliders
  const [paramA, setParamA] = useState(1.5);
  const [paramB, setParamB] = useState(1.0);
  const [paramC, setParamC] = useState(0.0);
  const [paramD, setParamD] = useState(0.0);

  // Tangent point
  const [tangentX, setTangentX] = useState(1.0);

  // Integral bounds
  const [integralA, setIntegralA] = useState(0.0);
  const [integralB, setIntegralB] = useState(3.14);

  // Animation
  const [animating, setAnimating] = useState(false);

  // Viewport
  const [view, setView] = useState({
    minX: -6,
    maxX: 6,
    minY: -4,
    maxY: 4,
  });

  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!animating) return;
    let animId: number;
    const step = () => {
      setParamC((prev) => (prev + 0.04) % (Math.PI * 2));
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [animating]);

  const draw = useCallback(() => {
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

    const toScreenX = (x: number) => ((x - view.minX) / (view.maxX - view.minX)) * width;
    const toScreenY = (y: number) => height - ((y - view.minY) / (view.maxY - view.minY)) * height;
    const toMathX = (px: number) => view.minX + (px / width) * (view.maxX - view.minX);
    const toMathY = (py: number) => view.maxY - (py / height) * (view.maxY - view.minY);

    // Warm paper canvas background
    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    // Dotted / subtle grid lines
    ctx.lineWidth = 1;
    const gridStepX = Math.pow(10, Math.floor(Math.log10((view.maxX - view.minX) / 6)));
    const gridStepY = Math.pow(10, Math.floor(Math.log10((view.maxY - view.minY) / 6)));

    ctx.strokeStyle = '#e8dfcf';
    const startX = Math.floor(view.minX / gridStepX) * gridStepX;
    const endX = Math.ceil(view.maxX / gridStepX) * gridStepX;
    for (let x = startX; x <= endX; x += gridStepX) {
      const sx = toScreenX(x);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.stroke();

      if (Math.abs(x) > 0.001) {
        ctx.fillStyle = '#98a2b3';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(x.toFixed(x % 1 === 0 ? 0 : 1), sx + 4, toScreenY(0) + 14);
      }
    }

    const startY = Math.floor(view.minY / gridStepY) * gridStepY;
    const endY = Math.ceil(view.maxY / gridStepY) * gridStepY;
    for (let y = startY; y <= endY; y += gridStepY) {
      const sy = toScreenY(y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();

      if (Math.abs(y) > 0.001) {
        ctx.fillStyle = '#98a2b3';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(y.toFixed(y % 1 === 0 ? 0 : 1), toScreenX(0) + 4, sy - 4);
      }
    }

    // Axes
    ctx.strokeStyle = '#667085';
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

    // Definite Integral Area
    if (showIntegral) {
      const a = Math.min(integralA, integralB);
      const b = Math.max(integralA, integralB);
      ctx.fillStyle = 'rgba(45, 88, 104, 0.16)';
      ctx.beginPath();
      ctx.moveTo(toScreenX(a), toScreenY(0));

      const steps = 150;
      const dx = (b - a) / steps;
      for (let i = 0; i <= steps; i++) {
        const x = a + i * dx;
        const y = evaluateMathFunction(func1, x, { a: paramA, b: paramB, c: paramC, d: paramD });
        if (!isNaN(y)) {
          ctx.lineTo(toScreenX(x), toScreenY(y));
        }
      }
      ctx.lineTo(toScreenX(b), toScreenY(0));
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#2d5868';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(toScreenX(a), toScreenY(0));
      ctx.lineTo(toScreenX(a), toScreenY(evaluateMathFunction(func1, a, { a: paramA, b: paramB, c: paramC, d: paramD })));
      ctx.moveTo(toScreenX(b), toScreenY(0));
      ctx.lineTo(toScreenX(b), toScreenY(evaluateMathFunction(func1, b, { a: paramA, b: paramB, c: paramC, d: paramD })));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Function 1: f(x) (Deep Slate Teal)
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#2d5868';
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= width; px += 2) {
      const x = toMathX(px);
      const y = evaluateMathFunction(func1, x, { a: paramA, b: paramB, c: paramC, d: paramD });
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

    // Function 2: g(x) (Terracotta)
    if (showFunc2) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#b86822';
      ctx.beginPath();
      started = false;
      for (let px = 0; px <= width; px += 2) {
        const x = toMathX(px);
        const y = evaluateMathFunction(func2, x);
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
    }

    // Derivative Curve f'(x) (Muted Plum)
    if (showDerivative) {
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#7e22ce';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      started = false;
      const f1 = (x: number) => evaluateMathFunction(func1, x, { a: paramA, b: paramB, c: paramC, d: paramD });
      for (let px = 0; px <= width; px += 3) {
        const x = toMathX(px);
        const dy = numericalDerivative(f1, x);
        if (isNaN(dy) || Math.abs(dy) > 1000) {
          started = false;
          continue;
        }
        const sy = toScreenY(dy);
        if (!started) {
          ctx.moveTo(px, sy);
          started = true;
        } else {
          ctx.lineTo(px, sy);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Tangent Line (Ochre)
    if (showTangent) {
      const f1 = (x: number) => evaluateMathFunction(func1, x, { a: paramA, b: paramB, c: paramC, d: paramD });
      const y0 = f1(tangentX);
      const m = numericalDerivative(f1, tangentX);

      if (!isNaN(y0) && !isNaN(m)) {
        const xStart = view.minX;
        const yStart = m * (xStart - tangentX) + y0;
        const xEnd = view.maxX;
        const yEnd = m * (xEnd - tangentX) + y0;

        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(toScreenX(xStart), toScreenY(yStart));
        ctx.lineTo(toScreenX(xEnd), toScreenY(yEnd));
        ctx.stroke();

        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.arc(toScreenX(tangentX), toScreenY(y0), 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Crosshair hover coordinate
    if (hoverCoord) {
      ctx.strokeStyle = 'rgba(45, 85, 104, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);

      const hx = toScreenX(hoverCoord.x);
      const hy = toScreenY(hoverCoord.y);

      ctx.beginPath();
      ctx.moveTo(hx, 0);
      ctx.lineTo(hx, height);
      ctx.moveTo(0, hy);
      ctx.lineTo(width, hy);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }, [view, func1, func2, showFunc2, showDerivative, showTangent, showIntegral, paramA, paramB, paramC, paramD, tangentX, integralA, integralB, hoverCoord]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  const zoom = (factor: number) => {
    setView((v) => {
      const cx = (v.minX + v.maxX) / 2;
      const cy = (v.minY + v.maxY) / 2;
      const halfW = ((v.maxX - v.minX) * factor) / 2;
      const halfH = ((v.maxY - v.minY) * factor) / 2;
      return {
        minX: cx - halfW,
        maxX: cx + halfW,
        minY: cy - halfH,
        maxY: cy + halfH,
      };
    });
  };

  const resetView = () => {
    setView({ minX: -6, maxX: 6, minY: -4, maxY: 4 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = view.minX + (px / rect.width) * (view.maxX - view.minX);
    const y = view.maxY - (py / rect.height) * (view.maxY - view.minY);
    setHoverCoord({ x, y });
  };

  const f1AtTangent = evaluateMathFunction(func1, tangentX, { a: paramA, b: paramB, c: paramC, d: paramD });
  const f1DerivAtTangent = numericalDerivative(
    (x) => evaluateMathFunction(func1, x, { a: paramA, b: paramB, c: paramC, d: paramD }),
    tangentX
  );
  const integralValue = numericalIntegral(
    (x) => evaluateMathFunction(func1, x, { a: paramA, b: paramB, c: paramC, d: paramD }),
    Math.min(integralA, integralB),
    Math.max(integralA, integralB)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#e2d8c7]">
              Laboratory 01
            </span>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Function & Graphing Studio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Plot 2D mathematical expressions, manipulate live transformation coefficients, examine derivatives, and visualize Riemann area integration.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAnimating(!animating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border shadow-xs ${
              animating
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-[#475467] border-[#d0c6b4] hover:bg-[#faf7f2]'
            }`}
          >
            {animating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {animating ? 'Pause Wave' : 'Animate Wave'}
          </button>
          <button
            onClick={() => zoom(0.8)}
            className="p-2 bg-white hover:bg-[#faf7f2] text-[#475467] rounded-lg border border-[#d0c6b4] transition shadow-xs"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => zoom(1.25)}
            className="p-2 bg-white hover:bg-[#faf7f2] text-[#475467] rounded-lg border border-[#d0c6b4] transition shadow-xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetView}
            className="p-2 bg-white hover:bg-[#faf7f2] text-[#475467] rounded-lg border border-[#d0c6b4] transition shadow-xs"
            title="Reset Grid"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair block"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoverCoord(null)}
            />

            {hoverCoord && (
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md border border-[#ded5c5] rounded-md px-2.5 py-1 text-xs font-mono text-[#182029] shadow-xs">
                x: <span className="text-[#2d5868] font-bold">{hoverCoord.x.toFixed(2)}</span> &nbsp; y:{' '}
                <span className="text-[#b86822] font-bold">{hoverCoord.y.toFixed(2)}</span>
              </div>
            )}

            {/* Legend */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md border border-[#ded5c5] p-2.5 rounded-xl text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#2d5868] rounded-full" />
                <span className="font-mono text-[#2d5868] font-semibold text-[11px]">f(x) = {func1}</span>
              </div>
              {showFunc2 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#b86822] rounded-full" />
                  <span className="font-mono text-[#b86822] font-semibold text-[11px]">g(x) = {func2}</span>
                </div>
              )}
              {showDerivative && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 border-b border-dashed border-[#7e22ce]" />
                  <span className="font-mono text-[#7e22ce] font-semibold text-[11px]">f'(x) (Numerical)</span>
                </div>
              )}
              {showTangent && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#d97706]" />
                  <span className="font-mono text-[#d97706] font-semibold text-[11px]">Tangent x={tangentX.toFixed(2)}</span>
                </div>
              )}
              {showIntegral && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-2 bg-[#2d5868]/20 border border-[#2d5868] rounded-xs" />
                  <span className="font-mono text-[#2d5868] font-semibold text-[11px]">
                    ∫ f(x)dx ≈ {integralValue.toFixed(3)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Presets Strip */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#667085] font-medium whitespace-nowrap">Presets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setFunc1(p.expr);
                  if (p.name === 'Harmonic Wave') {
                    setParamA(1.5);
                    setParamB(1.0);
                    setParamC(0);
                    setParamD(0);
                  }
                }}
                className={`px-3 py-1 rounded-lg border whitespace-nowrap transition-all shadow-xs ${
                  func1 === p.expr
                    ? 'bg-[#254553] text-white border-[#254553] font-semibold'
                    : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Console */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#182029] flex items-center gap-2 font-serif-editorial">
              <Layers className="w-4 h-4 text-[#2d5868]" />
              Expressions
            </h3>

            <div>
              <label className="text-xs text-[#2d5868] font-semibold mb-1 block">Primary Function f(x)</label>
              <input
                type="text"
                value={func1}
                onChange={(e) => setFunc1(e.target.value)}
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-1.5 font-mono text-xs text-[#182029] focus:outline-none focus:border-[#2d5868]"
              />
              <span className="text-[10px] text-[#667085] mt-1 block">
                Supports: +, -, *, /, ^, sin, cos, tan, exp, ln, sqrt, abs, a, b, c, d
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-[#b86822] font-semibold">Secondary Function g(x)</label>
                <button
                  onClick={() => setShowFunc2(!showFunc2)}
                  className={`text-xs px-2 py-0.5 rounded transition ${
                    showFunc2 ? 'bg-[#b86822]/15 text-[#b86822] font-semibold' : 'text-[#667085] hover:text-[#182029]'
                  }`}
                >
                  {showFunc2 ? 'Active' : 'Enable'}
                </button>
              </div>
              {showFunc2 && (
                <input
                  type="text"
                  value={func2}
                  onChange={(e) => setFunc2(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-3 py-1.5 font-mono text-xs text-[#182029] focus:outline-none focus:border-[#b86822]"
                />
              )}
            </div>

            {/* Overlays */}
            <div className="pt-2 border-t border-[#eee7db] space-y-2">
              <span className="text-xs font-semibold text-[#182029] block">Overlays</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setShowDerivative(!showDerivative)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold border text-center transition ${
                    showDerivative
                      ? 'bg-purple-50 text-purple-900 border-purple-300'
                      : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                  }`}
                >
                  f'(x)
                </button>
                <button
                  onClick={() => setShowTangent(!showTangent)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold border text-center transition ${
                    showTangent
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                  }`}
                >
                  Tangent
                </button>
                <button
                  onClick={() => setShowIntegral(!showIntegral)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold border text-center transition ${
                    showIntegral
                      ? 'bg-[#2d5868]/15 text-[#2d5868] border-[#2d5868]/30'
                      : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                  }`}
                >
                  Area ∫
                </button>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-[#182029] flex items-center justify-between font-serif-editorial">
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2d5868]" />
                Transformation Sliders
              </span>
              <button
                onClick={() => {
                  setParamA(1);
                  setParamB(1);
                  setParamC(0);
                  setParamD(0);
                }}
                className="text-[11px] text-[#2d5868] hover:underline"
              >
                Reset
              </button>
            </h3>

            <div>
              <div className="flex justify-between text-xs text-[#475467] mb-1">
                <span>Amplitude (a)</span>
                <span className="font-mono text-[#2d5868] font-bold">{paramA.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={paramA}
                onChange={(e) => setParamA(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#475467] mb-1">
                <span>Frequency (b)</span>
                <span className="font-mono text-[#2d5868] font-bold">{paramB.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={paramB}
                onChange={(e) => setParamB(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#475467] mb-1">
                <span>Phase Shift (c)</span>
                <span className="font-mono text-[#2d5868] font-bold">{paramC.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-6.28"
                max="6.28"
                step="0.05"
                value={paramC}
                onChange={(e) => setParamC(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#475467] mb-1">
                <span>Vertical Offset (d)</span>
                <span className="font-mono text-[#2d5868] font-bold">{paramD.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={paramD}
                onChange={(e) => setParamD(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>
          </div>

          {showTangent && (
            <div className="bg-white border border-amber-300 rounded-2xl p-4 space-y-2 text-xs shadow-xs">
              <span className="font-bold text-amber-900 block font-serif-editorial">Tangent Inspector</span>
              <div className="flex justify-between text-[#475467]">
                <span>Point x₀</span>
                <span className="font-mono text-amber-800 font-bold">{tangentX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={tangentX}
                onChange={(e) => setTangentX(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="bg-[#faf7f2] p-2.5 rounded-xl border border-[#ded5c5] font-mono text-[11px] text-[#182029] space-y-1">
                <div>f({tangentX.toFixed(2)}) = {f1AtTangent.toFixed(4)}</div>
                <div>Slope m = f'({tangentX.toFixed(2)}) = {f1DerivAtTangent.toFixed(4)}</div>
                <div className="text-amber-800 font-semibold">
                  y = {f1DerivAtTangent.toFixed(2)}x {(-f1DerivAtTangent * tangentX + f1AtTangent) >= 0 ? '+' : ''}{(-f1DerivAtTangent * tangentX + f1AtTangent).toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {showIntegral && (
            <div className="bg-white border border-[#2d5868]/40 rounded-2xl p-4 space-y-2 text-xs shadow-xs">
              <span className="font-bold text-[#2d5868] block font-serif-editorial">Definite Integral Bounds</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[#667085] block mb-0.5">Lower limit a</label>
                  <input
                    type="number"
                    step="0.1"
                    value={integralA}
                    onChange={(e) => setIntegralA(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-2 py-1 font-mono text-[#2d5868]"
                  />
                </div>
                <div>
                  <label className="text-[#667085] block mb-0.5">Upper limit b</label>
                  <input
                    type="number"
                    step="0.1"
                    value={integralB}
                    onChange={(e) => setIntegralB(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-lg px-2 py-1 font-mono text-[#2d5868]"
                  />
                </div>
              </div>
              <div className="bg-[#faf7f2] p-2.5 rounded-xl border border-[#ded5c5] font-mono text-xs text-[#182029] mt-2">
                ∫_{integralA}^{integralB} f(x) dx ≈ <span className="font-bold text-[#2d5868]">{integralValue.toFixed(4)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
