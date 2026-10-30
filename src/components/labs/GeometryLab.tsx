import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Compass, RotateCw, Triangle } from 'lucide-react';

interface SpecialAngle {
  radStr: string;
  deg: number;
  rad: number;
  sinStr: string;
  cosStr: string;
  tanStr: string;
}

const SPECIAL_ANGLES: SpecialAngle[] = [
  { deg: 0, rad: 0, radStr: '0', sinStr: '0', cosStr: '1', tanStr: '0' },
  { deg: 30, rad: Math.PI / 6, radStr: 'π/6', sinStr: '1/2', cosStr: '√3/2', tanStr: '√3/3' },
  { deg: 45, rad: Math.PI / 4, radStr: 'π/4', sinStr: '√2/2', cosStr: '√2/2', tanStr: '1' },
  { deg: 60, rad: Math.PI / 3, radStr: 'π/3', sinStr: '√3/2', cosStr: '1/2', tanStr: '√3' },
  { deg: 90, rad: Math.PI / 2, radStr: 'π/2', sinStr: '1', cosStr: '0', tanStr: 'Undefined' },
  { deg: 120, rad: (2 * Math.PI) / 3, radStr: '2π/3', sinStr: '√3/2', cosStr: '-1/2', tanStr: '-√3' },
  { deg: 135, rad: (3 * Math.PI) / 4, radStr: '3π/4', sinStr: '√2/2', cosStr: '-√2/2', tanStr: '-1' },
  { deg: 150, rad: (5 * Math.PI) / 6, radStr: '5π/6', sinStr: '1/2', cosStr: '-√3/2', tanStr: '-√3/3' },
  { deg: 180, rad: Math.PI, radStr: 'π', sinStr: '0', cosStr: '-1', tanStr: '0' },
  { deg: 270, rad: (3 * Math.PI) / 2, radStr: '3π/2', sinStr: '-1', cosStr: '0', tanStr: 'Undefined' },
  { deg: 360, rad: 2 * Math.PI, radStr: '2π', sinStr: '0', cosStr: '1', tanStr: '0' },
];

export const GeometryLab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'unit-circle' | 'triangle-solver'>('unit-circle');

  const [angleRad, setAngleRad] = useState<number>(Math.PI / 4);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [sideA, setSideA] = useState<number>(5);
  const [sideB, setSideB] = useState<number>(6);
  const [sideC, setSideC] = useState<number>(7);
  const triangleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const angleDeg = (angleRad * 180) / Math.PI;
  const cosVal = Math.cos(angleRad);
  const sinVal = Math.sin(angleRad);
  const tanVal = Math.tan(angleRad);

  const drawUnitCircle = useCallback(() => {
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

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.36;

    // Warm background
    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid axes
    ctx.strokeStyle = '#e2dacb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // The Unit Circle
    ctx.strokeStyle = '#2d5868';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Standard Angle radial dots
    SPECIAL_ANGLES.forEach((sa) => {
      const markX = centerX + radius * Math.cos(sa.rad);
      const markY = centerY - radius * Math.sin(sa.rad);
      ctx.fillStyle = '#98a2b3';
      ctx.beginPath();
      ctx.arc(markX, markY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Angle Arc
    ctx.strokeStyle = '#b86822';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 35, 0, -angleRad, true);
    ctx.stroke();

    const px = centerX + radius * cosVal;
    const py = centerY - radius * sinVal;

    // Right triangle fill
    ctx.fillStyle = 'rgba(45, 88, 104, 0.12)';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, centerY);
    ctx.lineTo(px, py);
    ctx.closePath();
    ctx.fill();

    // Cosine line (Horizontal - Forest green)
    ctx.strokeStyle = '#166534';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, centerY);
    ctx.stroke();

    // Sine line (Vertical - Slate teal)
    ctx.strokeStyle = '#2d5868';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Hypotenuse (Amber)
    ctx.strokeStyle = '#b86822';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Center pivot
    ctx.fillStyle = '#182029';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Circumference point
    ctx.fillStyle = '#2d5868';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Labels
    ctx.font = 'italic 12px "Newsreader", serif';
    ctx.fillStyle = '#166534';
    ctx.fillText(`cos = ${cosVal.toFixed(3)}`, (centerX + px) / 2 - 25, centerY + 18);

    ctx.fillStyle = '#2d5868';
    ctx.fillText(`sin = ${sinVal.toFixed(3)}`, px + 8, (centerY + py) / 2);

    ctx.restore();
  }, [angleRad, cosVal, sinVal]);

  const isValidTriangle = sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
  const s = (sideA + sideB + sideC) / 2;
  const triangleArea = isValidTriangle ? Math.sqrt(Math.max(0, s * (s - sideA) * (s - sideB) * (s - sideC))) : 0;
  
  const angleAlpha = isValidTriangle ? (Math.acos((sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)) * 180) / Math.PI : 0;
  const angleBeta = isValidTriangle ? (Math.acos((sideA ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideA * sideC)) * 180) / Math.PI : 0;
  const angleGamma = isValidTriangle ? 180 - angleAlpha - angleBeta : 0;

  const drawTriangle = useCallback(() => {
    const canvas = triangleCanvasRef.current;
    if (!canvas || !isValidTriangle) return;
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

    const alphaRad = (angleAlpha * Math.PI) / 180;
    const ptAx = 0;
    const ptAy = 0;
    const ptBx = sideC;
    const ptBy = 0;
    const ptCx = sideB * Math.cos(alphaRad);
    const ptCy = sideB * Math.sin(alphaRad);

    const minX = Math.min(ptAx, ptBx, ptCx);
    const maxX = Math.max(ptAx, ptBx, ptCx);
    const minY = Math.min(ptAy, ptBy, ptCy);
    const maxY = Math.max(ptAy, ptBy, ptCy);

    const tWidth = maxX - minX || 1;
    const tHeight = maxY - minY || 1;
    const scale = Math.min((width * 0.7) / tWidth, (height * 0.7) / tHeight);

    const offsetX = (width - tWidth * scale) / 2 - minX * scale;
    const offsetY = (height + tHeight * scale) / 2 + minY * scale;

    const mapX = (x: number) => offsetX + x * scale;
    const mapY = (y: number) => offsetY - y * scale;

    ctx.fillStyle = 'rgba(45, 88, 104, 0.12)';
    ctx.strokeStyle = '#2d5868';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mapX(ptAx), mapY(ptAy));
    ctx.lineTo(mapX(ptBx), mapY(ptBy));
    ctx.lineTo(mapX(ptCx), mapY(ptCy));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const vertices = [
      { x: mapX(ptAx), y: mapY(ptAy), label: `A (${angleAlpha.toFixed(1)}°)` },
      { x: mapX(ptBx), y: mapY(ptBy), label: `B (${angleBeta.toFixed(1)}°)` },
      { x: mapX(ptCx), y: mapY(ptCy), label: `C (${angleGamma.toFixed(1)}°)` },
    ];

    vertices.forEach((v) => {
      ctx.fillStyle = '#b86822';
      ctx.beginPath();
      ctx.arc(v.x, v.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '12px "Newsreader", serif';
      ctx.fillStyle = '#182029';
      ctx.fillText(v.label, v.x - 18, v.y - 10);
    });

    ctx.restore();
  }, [isValidTriangle, angleAlpha, angleBeta, angleGamma, sideB, sideC]);

  useEffect(() => {
    if (activeSubTab === 'unit-circle') {
      drawUnitCircle();
    } else {
      drawTriangle();
    }
  }, [activeSubTab, drawUnitCircle, drawTriangle]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#e2d8c7]">
              Laboratory 02
            </span>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Geometry & Trigonometry Explorer
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Interact with the continuous unit circle, explore exact trigonometric projections, and solve arbitrary triangles with the Law of Cosines.
          </p>
        </div>
        <div className="flex items-center bg-[#faf7f2] p-1 rounded-xl border border-[#ded5c5]">
          <button
            onClick={() => setActiveSubTab('unit-circle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'unit-circle'
                ? 'bg-[#254553] text-white shadow-xs'
                : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Unit Circle
          </button>
          <button
            onClick={() => setActiveSubTab('triangle-solver')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'triangle-solver'
                ? 'bg-[#254553] text-white shadow-xs'
                : 'text-[#475467] hover:text-[#182029]'
            }`}
          >
            Triangle Solver
          </button>
        </div>
      </div>

      {activeSubTab === 'unit-circle' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Canvas Display */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full block" />

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#ded5c5] px-3.5 py-2 rounded-xl text-xs shadow-xs space-y-0.5">
                <div className="text-[#667085] text-[11px]">Position (x, y) = (cos θ, sin θ)</div>
                <div className="font-mono text-[#182029] text-sm font-semibold">
                  (<span className="text-[#166534]">{cosVal.toFixed(4)}</span>,{' '}
                  <span className="text-[#2d5868]">{sinVal.toFixed(4)}</span>)
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#ded5c5] px-3.5 py-2 rounded-xl text-xs shadow-xs font-mono font-semibold text-[#b86822]">
                θ = {angleDeg.toFixed(1)}° &nbsp; ({(angleRad / Math.PI).toFixed(2)}π rad)
              </div>
            </div>

            {/* Special Angles Buttons */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[#667085] font-medium whitespace-nowrap">Special Angles:</span>
              {SPECIAL_ANGLES.map((sa) => (
                <button
                  key={sa.deg}
                  onClick={() => setAngleRad(sa.rad)}
                  className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition shadow-xs ${
                    Math.abs(angleDeg - sa.deg) < 1
                      ? 'bg-[#254553] text-white border-[#254553] font-semibold'
                      : 'bg-white text-[#475467] border-[#ded5c5] hover:bg-[#faf7f2]'
                  }`}
                >
                  {sa.deg}° ({sa.radStr})
                </button>
              ))}
            </div>
          </div>

          {/* Controls & Identities */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] flex items-center gap-2 font-serif-editorial">
                <RotateCw className="w-4 h-4 text-[#2d5868]" />
                Angle Adjustment
              </h3>

              <div>
                <div className="flex justify-between text-xs text-[#475467] mb-1">
                  <span>Angle θ (Degrees)</span>
                  <span className="font-mono text-[#2d5868] font-bold">{angleDeg.toFixed(1)}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="0.5"
                  value={angleDeg}
                  onChange={(e) => setAngleRad((parseFloat(e.target.value) * Math.PI) / 180)}
                  className="w-full accent-[#2d5868] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#475467] mb-1">
                  <span>Angle θ (Radians)</span>
                  <span className="font-mono text-[#b86822] font-bold">{angleRad.toFixed(3)} rad</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.PI * 2}
                  step="0.01"
                  value={angleRad}
                  onChange={(e) => setAngleRad(parseFloat(e.target.value))}
                  className="w-full accent-[#b86822] cursor-pointer"
                />
              </div>
            </div>

            {/* Trig Values Card */}
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">Trigonometric Quantities</h3>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5]">
                  <span className="text-[11px] text-[#2d5868] block font-semibold">sin(θ)</span>
                  <span className="text-base font-bold font-mono text-[#182029] mt-1 block">
                    {sinVal.toFixed(4)}
                  </span>
                </div>

                <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5]">
                  <span className="text-[11px] text-[#166534] block font-semibold">cos(θ)</span>
                  <span className="text-base font-bold font-mono text-[#182029] mt-1 block">
                    {cosVal.toFixed(4)}
                  </span>
                </div>

                <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5]">
                  <span className="text-[11px] text-[#b86822] block font-semibold">tan(θ)</span>
                  <span className="text-base font-bold font-mono text-[#182029] mt-1 block">
                    {Math.abs(cosVal) < 0.0001 ? 'Undefined' : tanVal.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pythagorean Proof */}
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                Fundamental Identity
              </h3>
              <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5] font-mono text-xs text-[#182029]">
                <div className="flex justify-between items-center">
                  <span>sin²(θ) + cos²(θ)</span>
                  <span className="text-[#166534] font-bold text-sm">
                    {(sinVal ** 2 + cosVal ** 2).toFixed(5)} = 1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Triangle Solver Tab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm flex items-center justify-center">
              {isValidTriangle ? (
                <canvas ref={triangleCanvasRef} className="w-full h-full block" />
              ) : (
                <div className="text-center p-6 text-rose-800">
                  <p className="font-serif-editorial font-bold text-lg">Triangle Inequality Violated</p>
                  <p className="text-xs text-[#667085] mt-1">The sum of any two sides must be strictly greater than the third side.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#182029] flex items-center gap-2 font-serif-editorial">
                <Triangle className="w-4 h-4 text-[#2d5868]" />
                Side Lengths (SSS)
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-[#475467] mb-1">
                    <span>Side a</span>
                    <span className="font-mono text-[#2d5868] font-bold">{sideA}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={sideA}
                    onChange={(e) => setSideA(parseFloat(e.target.value))}
                    className="w-full accent-[#2d5868] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#475467] mb-1">
                    <span>Side b</span>
                    <span className="font-mono text-[#2d5868] font-bold">{sideB}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={sideB}
                    onChange={(e) => setSideB(parseFloat(e.target.value))}
                    className="w-full accent-[#2d5868] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#475467] mb-1">
                    <span>Side c</span>
                    <span className="font-mono text-[#2d5868] font-bold">{sideC}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={sideC}
                    onChange={(e) => setSideC(parseFloat(e.target.value))}
                    className="w-full accent-[#2d5868] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {isValidTriangle && (
              <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-3 shadow-xs">
                <h3 className="text-sm font-bold text-[#182029] font-serif-editorial">Calculated Metrics</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5]">
                    <span className="text-[#667085]">Area (Heron's)</span>
                    <span className="font-mono text-[#182029] font-bold block text-sm mt-0.5">
                      {triangleArea.toFixed(3)}
                    </span>
                  </div>
                  <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5]">
                    <span className="text-[#667085]">Perimeter (2s)</span>
                    <span className="font-mono text-[#182029] font-bold block text-sm mt-0.5">
                      {(sideA + sideB + sideC).toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5] space-y-1 text-xs">
                  <span className="text-[#667085] block font-medium">Computed Angles:</span>
                  <div className="flex justify-between font-mono text-[#182029]">
                    <span>∠A = {angleAlpha.toFixed(1)}°</span>
                    <span>∠B = {angleBeta.toFixed(1)}°</span>
                    <span>∠C = {angleGamma.toFixed(1)}°</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
