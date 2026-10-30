import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ChordsExploration: React.FC = () => {
  const [angleOffset, setAngleOffset] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showReasoning, setShowReasoning] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Geometric parameters:
  // Circle radius R = 17, OP = 10, Power(P) = 17^2 - 10^2 = 189
  const R = 17;

  const drawFigure = useCallback(() => {
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

    // Warm background
    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    // Dotted grid pattern
    ctx.fillStyle = 'rgba(45, 85, 104, 0.15)';
    const dotSpacing = 22;
    for (let x = 12; x < width; x += dotSpacing) {
      for (let y = 12; y < height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const centerX = width * 0.52;
    const centerY = height * 0.5;
    const scale = Math.min(width, height) * 0.023;

    const toScreen = (x: number, y: number) => ({
      x: centerX + x * scale,
      y: centerY - y * scale,
    });

    const baseTheta = Math.acos(0.6);
    const theta = baseTheta + angleOffset;

    const ux = Math.cos(theta);
    const uy = Math.sin(theta);

    const B_term = 6 * ux + 8 * uy;
    const disc = Math.sqrt(B_term * B_term + 189);
    const t_C = -B_term + disc;
    const t_D = -B_term - disc;

    const ptP = { x: 6, y: 8 };
    const ptA = { x: 15, y: 8 };
    const ptB = { x: -15, y: 8 };
    const ptC = { x: ptP.x + t_C * ux, y: ptP.y + t_C * uy };
    const ptD = { x: ptP.x + t_D * ux, y: ptP.y + t_D * uy };

    const scrO = toScreen(0, 0);
    const scrP = toScreen(ptP.x, ptP.y);
    const scrA = toScreen(ptA.x, ptA.y);
    const scrB = toScreen(ptB.x, ptB.y);
    const scrC = toScreen(ptC.x, ptC.y);
    const scrD = toScreen(ptD.x, ptD.y);

    // Circle
    ctx.strokeStyle = '#2d5868';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(scrO.x, scrO.y, R * scale, 0, Math.PI * 2);
    ctx.stroke();

    // Chord AB (Fixed)
    ctx.strokeStyle = '#2d5868';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(scrB.x, scrB.y);
    ctx.lineTo(scrA.x, scrA.y);
    ctx.stroke();

    // Chord CD (Rotatable)
    ctx.strokeStyle = '#2d5868';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(scrD.x, scrD.y);
    ctx.lineTo(scrC.x, scrC.y);
    ctx.stroke();

    // Dotted chords
    ctx.strokeStyle = 'rgba(45, 88, 104, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(scrA.x, scrA.y);
    ctx.lineTo(scrC.x, scrC.y);
    ctx.moveTo(scrB.x, scrB.y);
    ctx.lineTo(scrD.x, scrD.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Length labels
    ctx.font = 'italic 12px "Newsreader", "EB Garamond", serif';
    ctx.fillStyle = '#b45309';
    const midPA = { x: (scrP.x + scrA.x) / 2, y: (scrP.y + scrA.y) / 2 };
    ctx.fillText('9', midPA.x - 3, midPA.y - 8);

    const midPB = { x: (scrP.x + scrB.x) / 2, y: (scrP.y + scrB.y) / 2 };
    ctx.fillText('21', midPB.x - 6, midPB.y + 16);

    // Points
    const drawPoint = (scr: { x: number; y: number }, label: string, offset: { x: number; y: number }, isHandle = false) => {
      ctx.fillStyle = isHandle ? '#2d5868' : '#1c2430';
      ctx.beginPath();
      ctx.arc(scr.x, scr.y, isHandle ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      if (isHandle) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.fillStyle = '#1c2430';
      ctx.font = 'italic 16px "Newsreader", "EB Garamond", Georgia, serif';
      ctx.fillText(label, scr.x + offset.x, scr.y + offset.y);
    };

    drawPoint(scrA, 'A', { x: 8, y: -6 });
    drawPoint(scrB, 'B', { x: -22, y: 4 });
    drawPoint(scrP, 'P', { x: -16, y: -8 });
    drawPoint(scrC, 'C', { x: 10, y: -6 }, true);
    drawPoint(scrD, 'D', { x: -18, y: 16 });

    ctx.restore();
  }, [angleOffset]);

  useEffect(() => {
    drawFigure();
  }, [drawFigure]);

  const handleCheckAnswer = () => {
    const val = parseInt(userAnswer.trim());
    if (val === 289) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const baseTheta = Math.acos(0.6);
  const theta = baseTheta + angleOffset;
  const ux = Math.cos(theta);
  const uy = Math.sin(theta);
  const B_term = 6 * ux + 8 * uy;
  const disc = Math.sqrt(B_term * B_term + 189);
  const curPC = -B_term + disc;
  const curPD = Math.abs(-B_term - disc);

  return (
    <div className="bg-[#faf7f2] text-[#1c2430] border-t border-b border-[#e7e1d5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Problem & Invariant Insight */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <span className="font-serif-editorial italic text-amber-700 text-sm tracking-wide block">
              Interactive Geometry Invariant
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-[#182029] leading-tight">
              Two chords.<br />
              One hidden radius.
            </h2>
          </div>

          <p className="text-sm text-[#475467] leading-relaxed">
            In any circle, intersecting chords satisfy the Power of a Point theorem. Can you determine the square of the circle's radius <em>r</em>²?
          </p>

          <div className="bg-[#f2ece1] rounded-xl p-4 font-serif-editorial text-sm space-y-1 border border-[#e2dacb]">
            <div className="text-[#2d5868] font-semibold tracking-wide">
              <em>PA</em> = 9, &nbsp; <em>PB</em> = 21, &nbsp; <em>PC</em> = 7, &nbsp; <em>PD</em> = 27
            </div>
            <div className="text-[#2d5868]">
              cos ∠<em>APC</em> = <sup>3</sup>/<sub>5</sub>
            </div>
          </div>

          {/* Interactive Answer Input */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-medium text-[#475467] block">
              Your answer for <em>r</em>²
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  setFeedback('idle');
                }}
                placeholder="Try an integer"
                className="flex-1 bg-white border border-[#d0c6b4] rounded-lg px-3.5 py-2 text-sm text-[#182029] placeholder-[#98a2b3] focus:outline-none focus:border-[#2d5868] shadow-xs"
              />
              <button
                onClick={handleCheckAnswer}
                className="px-5 py-2 bg-[#2d5868] hover:bg-[#234553] text-white text-sm font-medium rounded-lg shadow-sm transition flex items-center gap-1.5"
              >
                <span>Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {feedback === 'correct' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Correct!</strong> <em>r</em>² = 289 (Radius <em>r</em> = 17, and chord <em>CD</em> forms a diameter of length 34).</span>
              </div>
            )}

            {feedback === 'incorrect' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Not quite. Hint: Use Power of a Point to relate <em>r</em>² to distance <em>d</em> = <em>OP</em>.</span>
              </div>
            )}
          </div>

          {/* Explore Reasoning Accordion */}
          <div>
            <button
              onClick={() => setShowReasoning(!showReasoning)}
              className="text-xs font-medium text-[#2d5868] hover:underline flex items-center gap-1 transition"
            >
              <span>Explore the mathematical reasoning</span>
              {showReasoning ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showReasoning && (
              <div className="mt-3 p-4 bg-white border border-[#e4dcce] rounded-xl text-xs text-[#344054] space-y-2.5 leading-relaxed shadow-sm animate-in fade-in">
                <div className="font-semibold text-[#182029]">1. The Power of Point Invariant</div>
                <p>
                  For any secant line through <em>P</em> intersecting the circle at <em>X</em> and <em>Y</em>, 
                  the product <em>PX</em> · <em>PY</em> = <em>r</em>² − <em>d</em>² = 9 · 21 = 189.
                </p>

                <div className="font-semibold text-[#182029]">2. Chord Midpoints & Right Triangles</div>
                <p>
                  Chord <em>AB</em> has length 30 with midpoint <em>M</em> (distance <em>PM</em> = 6). 
                  Chord <em>CD</em> has length 34 with midpoint <em>N</em> (distance <em>PN</em> = 10).
                </p>

                <div className="font-semibold text-[#182029]">3. Computing Distance to Center d² = OP²</div>
                <p>
                  Using angle cos ∠<em>APC</em> = 3/5 to resolve the projections of <em>PO</em> yields <em>d</em>² = 100.
                </p>

                <div className="font-semibold text-emerald-800 pt-1 border-t border-[#eee7db]">
                  Therefore, <em>r</em>² = <em>d</em>² + 189 = 100 + 189 = <strong>289</strong>.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Diagram */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl border border-[#ded5c5] shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#475467]">
              <span className="font-medium text-[#182029]">
                Move the chord. Follow the invariant.
              </span>
              <button
                onClick={() => setAngleOffset(0)}
                className="p-1.5 hover:bg-[#f2ece1] rounded-lg text-[#2d5868] transition"
                title="Reset chord position"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-[#faf7f2] border border-[#e7e0d3]">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-[#344054]">
                <span className="font-medium">Rotate chord CD</span>
                <span className="font-mono text-[#2d5868]">
                  {((theta * 180) / Math.PI).toFixed(1)}°
                </span>
              </div>
              <input
                type="range"
                min="-0.7"
                max="0.7"
                step="0.01"
                value={angleOffset}
                onChange={(e) => setAngleOffset(parseFloat(e.target.value))}
                className="w-full accent-[#2d5868] cursor-pointer"
              />
            </div>

            <div className="pt-3 border-t border-[#eee7db] space-y-1">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#667085]">
                PC × PD (Power of Point P)
              </span>
              <div className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#182029]">
                {curPC.toFixed(2)} × {curPD.toFixed(2)}{' '}
                <span className="text-[#2d5868]">= 189.00</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                Rotating changes the individual lengths, but their product stays strictly <strong>189</strong>. Reset to return to the initial configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
