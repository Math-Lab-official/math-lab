import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Matrix2x2, computeDeterminant, computeTrace, computeInverse, computeEigenvalues } from '../../utils/mathUtils';
import { Grid, RefreshCw } from 'lucide-react';

interface MatrixPreset {
  name: string;
  matrix: Matrix2x2;
  desc: string;
}

const PRESETS: MatrixPreset[] = [
  { name: 'Identity (No-Op)', matrix: { a: 1, b: 0, c: 0, d: 1 }, desc: 'Standard basis vectors are unchanged' },
  { name: '45° Rotation', matrix: { a: 0.707, b: -0.707, c: 0.707, d: 0.707 }, desc: 'Rotates all space counterclockwise by π/4 rad' },
  { name: '90° Rotation', matrix: { a: 0, b: -1, c: 1, d: 0 }, desc: 'Perpendicular rotation, det = +1' },
  { name: 'Horizontal Shear', matrix: { a: 1, b: 1.5, c: 0, d: 1 }, desc: 'Slides coordinate layers along X, det = 1 (area preserved)' },
  { name: 'Vertical Shear', matrix: { a: 1, b: 0, c: 1.2, d: 1 }, desc: 'Slides coordinate layers along Y' },
  { name: '2x Scaling', matrix: { a: 2, b: 0, c: 0, d: 2 }, desc: 'Uniform scaling, area multiplies by 4' },
  { name: 'Reflection (y = x)', matrix: { a: 0, b: 1, c: 1, d: 0 }, desc: 'Swaps x and y, flips orientation (det = -1)' },
  { name: 'Singular / Projection', matrix: { a: 1, b: 2, c: 0.5, d: 1 }, desc: 'Rows are linearly dependent, det = 0, collapses space onto line' },
];

export const LinearAlgebraLab: React.FC = () => {
  const [matrix, setMatrix] = useState<Matrix2x2>({ a: 1.2, b: 0.5, c: 0.3, d: 1.5 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const det = computeDeterminant(matrix);
  const trace = computeTrace(matrix);
  const inverse = computeInverse(matrix);
  const eigen = computeEigenvalues(matrix);

  const drawTransformation = useCallback(() => {
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
    const unitScale = 45;

    const toScreen = (x: number, y: number) => ({
      x: centerX + x * unitScale,
      y: centerY - y * unitScale,
    });

    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(0, 0, width, height);

    const applyT = (x: number, y: number) => ({
      x: matrix.a * x + matrix.b * y,
      y: matrix.c * x + matrix.d * y,
    });

    // Original Faint Grid
    ctx.strokeStyle = '#e6ddce';
    ctx.lineWidth = 1;
    for (let i = -6; i <= 6; i++) {
      const p1 = toScreen(i, -6);
      const p2 = toScreen(i, 6);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      const h1 = toScreen(-6, i);
      const h2 = toScreen(6, i);
      ctx.beginPath();
      ctx.moveTo(h1.x, h1.y);
      ctx.lineTo(h2.x, h2.y);
      ctx.stroke();
    }

    // Transformed Grid Lines
    ctx.strokeStyle = 'rgba(45, 88, 104, 0.25)';
    ctx.lineWidth = 1.2;
    for (let i = -6; i <= 6; i++) {
      const tp1 = applyT(i, -6);
      const tp2 = applyT(i, 6);
      const s1 = toScreen(tp1.x, tp1.y);
      const s2 = toScreen(tp2.x, tp2.y);
      ctx.beginPath();
      ctx.moveTo(s1.x, s1.y);
      ctx.lineTo(s2.x, s2.y);
      ctx.stroke();

      const hp1 = applyT(-6, i);
      const hp2 = applyT(6, i);
      const hs1 = toScreen(hp1.x, hp1.y);
      const hs2 = toScreen(hp2.x, hp2.y);
      ctx.beginPath();
      ctx.moveTo(hs1.x, hs1.y);
      ctx.lineTo(hs2.x, hs2.y);
      ctx.stroke();
    }

    // Transformed Unit Square Parallelogram
    const o = toScreen(0, 0);
    const iTrans = applyT(1, 0);
    const jTrans = applyT(0, 1);
    const cornerTrans = applyT(1, 1);

    const sI = toScreen(iTrans.x, iTrans.y);
    const sJ = toScreen(jTrans.x, jTrans.y);
    const sCorner = toScreen(cornerTrans.x, cornerTrans.y);

    if (Math.abs(det) < 0.001) {
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(o.x, o.y);
      ctx.lineTo(sCorner.x, sCorner.y);
      ctx.stroke();
    } else {
      ctx.fillStyle = det > 0 ? 'rgba(45, 88, 104, 0.16)' : 'rgba(185, 28, 28, 0.16)';
      ctx.strokeStyle = det > 0 ? '#2d5868' : '#b91c1c';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(o.x, o.y);
      ctx.lineTo(sI.x, sI.y);
      ctx.lineTo(sCorner.x, sCorner.y);
      ctx.lineTo(sJ.x, sJ.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Basis Vectors
    const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, label: string) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      const angle = Math.atan2(toY - fromY, toX - fromX);
      const headLen = 9;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 12px "Newsreader", serif';
      ctx.fillText(label, toX + 8, toY - 4);
    };

    drawArrow(o.x, o.y, sI.x, sI.y, '#b86822', `T(î) = [${matrix.a.toFixed(1)}, ${matrix.c.toFixed(1)}]`);
    drawArrow(o.x, o.y, sJ.x, sJ.y, '#2d5868', `T(ĵ) = [${matrix.b.toFixed(1)}, ${matrix.d.toFixed(1)}]`);

    ctx.fillStyle = '#182029';
    ctx.beginPath();
    ctx.arc(o.x, o.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [matrix, det]);

  useEffect(() => {
    drawTransformation();
  }, [drawTransformation]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#e2d8c7]">
              Laboratory 04
            </span>
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Linear Algebra & Matrix Grid
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Observe the geometric warping of coordinate space under 2D matrix transformations, basis vector movement, and determinant signed area.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMatrix({ a: 1, b: 0, c: 0, d: 1 })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-[#faf7f2] text-[#475467] rounded-lg border border-[#ded5c5] transition shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Identity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-[#ded5c5] bg-[#faf7f2] shadow-sm flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block" />

            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#ded5c5] px-4 py-2.5 rounded-xl text-xs shadow-xs space-y-0.5">
              <div className="text-[#667085] text-[11px]">Determinant (Area Scaling):</div>
              <div className="font-mono text-base font-bold flex items-center gap-2">
                <span className={det > 0 ? 'text-[#166534]' : det < 0 ? 'text-[#b91c1c]' : 'text-amber-800'}>
                  det(A) = {det.toFixed(3)}
                </span>
                <span className="text-[11px] font-sans font-normal text-[#667085]">
                  {det > 0 ? '(Preserves Orientation)' : det < 0 ? '(Reversed Orientation)' : '(Degenerate)'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Presets Strip */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#667085] font-medium whitespace-nowrap">Presets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setMatrix(p.matrix)}
                className="px-2.5 py-1 bg-white border border-[#ded5c5] hover:bg-[#faf7f2] text-[#475467] rounded-lg whitespace-nowrap transition shadow-xs"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-[#182029] flex items-center gap-2 font-serif-editorial">
              <Grid className="w-4 h-4 text-[#2d5868]" />
              Transformation Matrix A
            </h3>

            <div className="flex items-center justify-center p-4 bg-[#faf7f2] rounded-xl border border-[#ded5c5]">
              <div className="text-3xl font-serif text-[#98a2b3] mr-2">[</div>
              <div className="grid grid-cols-2 gap-3 w-48 text-center font-mono">
                <div>
                  <span className="text-[10px] text-[#b86822] block mb-0.5 font-bold">a (î_x)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={matrix.a}
                    onChange={(e) => setMatrix({ ...matrix, a: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white border border-[#d0c6b4] rounded px-2 py-1 text-[#b86822] text-center text-sm font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#2d5868] block mb-0.5 font-bold">b (ĵ_x)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={matrix.b}
                    onChange={(e) => setMatrix({ ...matrix, b: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white border border-[#d0c6b4] rounded px-2 py-1 text-[#2d5868] text-center text-sm font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#b86822] block mb-0.5 font-bold">c (î_y)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={matrix.c}
                    onChange={(e) => setMatrix({ ...matrix, c: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white border border-[#d0c6b4] rounded px-2 py-1 text-[#b86822] text-center text-sm font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#2d5868] block mb-0.5 font-bold">d (ĵ_y)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={matrix.d}
                    onChange={(e) => setMatrix({ ...matrix, d: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white border border-[#d0c6b4] rounded px-2 py-1 text-[#2d5868] text-center text-sm font-bold"
                  />
                </div>
              </div>
              <div className="text-3xl font-serif text-[#98a2b3] ml-2">]</div>
            </div>
          </div>

          <div className="bg-white border border-[#ded5c5] rounded-2xl p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              Spectral Invariants
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5]">
                <span className="text-[#667085] block">Trace tr(A)</span>
                <span className="font-mono text-[#182029] text-base font-bold mt-0.5 block">
                  {trace.toFixed(3)}
                </span>
                <span className="text-[10px] text-[#98a2b3] block">a + d</span>
              </div>

              <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5]">
                <span className="text-[#667085] block">Determinant det(A)</span>
                <span className={`font-mono text-base font-bold mt-0.5 block ${det >= 0 ? 'text-[#166534]' : 'text-[#b91c1c]'}`}>
                  {det.toFixed(3)}
                </span>
                <span className="text-[10px] text-[#98a2b3] block">ad - bc</span>
              </div>
            </div>

            <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5] text-xs font-mono">
              <span className="text-[#667085] block text-[11px] font-sans mb-1 font-semibold">Eigenvalues:</span>
              {eigen.isComplex ? (
                <div className="text-[#b86822]">
                  λ₁,₂ = {eigen.lambda1.toFixed(3)} ± {eigen.imagPart?.toFixed(3)}i
                </div>
              ) : (
                <div className="text-[#2d5868] flex justify-between font-bold">
                  <span>λ₁ = {eigen.lambda1.toFixed(3)}</span>
                  <span>λ₂ = {eigen.lambda2.toFixed(3)}</span>
                </div>
              )}
            </div>

            <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#ded5c5] text-xs font-mono">
              <span className="text-[#667085] block text-[11px] font-sans mb-1 font-semibold">Inverse Matrix A⁻¹:</span>
              {inverse ? (
                <div className="text-[#166534]">
                  [[{inverse.a.toFixed(2)}, {inverse.b.toFixed(2)}], [{inverse.c.toFixed(2)}, {inverse.d.toFixed(2)}]]
                </div>
              ) : (
                <div className="text-[#b91c1c]">Singular (det = 0)</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
