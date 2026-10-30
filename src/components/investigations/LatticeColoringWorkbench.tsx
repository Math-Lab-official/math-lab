import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Play, 
  HelpCircle, 
  Bookmark, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Grid
} from 'lucide-react';
import { recordLatticeExperiment, saveNewConjecture } from '../../utils/studentProgress';
import { InlineMath, BlockMath } from '../common/MathView';

type PointColor = 'red' | 'blue' | 'green' | 'uncolored';

interface MonochromaticRectangle {
  r1: number;
  r2: number;
  c1: number;
  c2: number;
  color: 'red' | 'blue' | 'green';
}

const COLOR_MAP: Record<PointColor, { label: string; bg: string; border: string; ring: string; text: string }> = {
  red: { label: 'Red', bg: 'bg-rose-500', border: 'border-rose-600', ring: 'ring-rose-400', text: 'text-rose-600 dark:text-rose-400' },
  blue: { label: 'Blue', bg: 'bg-sky-500', border: 'border-sky-600', ring: 'ring-sky-400', text: 'text-sky-600 dark:text-sky-400' },
  green: { label: 'Green', bg: 'bg-emerald-500', border: 'border-emerald-600', ring: 'ring-emerald-400', text: 'text-emerald-600 dark:text-emerald-400' },
  uncolored: { label: 'Empty', bg: 'bg-slate-200 dark:bg-slate-700', border: 'border-slate-300 dark:border-slate-600', ring: 'ring-slate-300', text: 'text-slate-400' },
};

export const LatticeColoringWorkbench: React.FC = () => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [colorCount, setColorCount] = useState<2 | 3>(2);
  const [activePalette, setActivePalette] = useState<'red' | 'blue' | 'green'>('red');
  
  // Grid state: 2D array of PointColor [row][col]
  const [grid, setGrid] = useState<PointColor[][]>(() => {
    return Array.from({ length: 3 }, () => Array(3).fill('uncolored'));
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Resize grid when rows/cols change
  const handleResize = (newR: number, newC: number) => {
    setRows(newR);
    setCols(newC);
    setGrid(Array.from({ length: newR }, () => Array(newC).fill('uncolored')));
    recordLatticeExperiment();
  };

  // Toggle point color on click
  const handlePointClick = (r: number, c: number) => {
    setGrid((prev) => {
      const next = prev.map((rowArr) => [...rowArr]);
      const current = next[r][c];
      const palette: PointColor[] = colorCount === 2 ? ['red', 'blue', 'uncolored'] : ['red', 'blue', 'green', 'uncolored'];
      
      // If clicking with a selected brush, set it; if already that color, toggle to next
      if (current !== activePalette) {
        next[r][c] = activePalette;
      } else {
        const nextIdx = (palette.indexOf(current) + 1) % palette.length;
        next[r][c] = palette[nextIdx];
      }
      return next;
    });
    recordLatticeExperiment();
  };

  // Algorithmically detect all monochromatic rectangles
  const detectedRectangles = useMemo<MonochromaticRectangle[]>(() => {
    const rects: MonochromaticRectangle[] = [];
    const targetColors: ('red' | 'blue' | 'green')[] = colorCount === 2 ? ['red', 'blue'] : ['red', 'blue', 'green'];

    for (let r1 = 0; r1 < rows; r1++) {
      for (let r2 = r1 + 1; r2 < rows; r2++) {
        for (let c1 = 0; c1 < cols; c1++) {
          for (let c2 = c1 + 1; c2 < cols; c2++) {
            const p1 = grid[r1][c1];
            const p2 = grid[r1][c2];
            const p3 = grid[r2][c1];
            const p4 = grid[r2][c2];

            if (p1 !== 'uncolored' && p1 === p2 && p2 === p3 && p3 === p4) {
              if (targetColors.includes(p1 as any)) {
                rects.push({ r1, r2, c1, c2, color: p1 as any });
              }
            }
          }
        }
      }
    }
    return rects;
  }, [grid, rows, cols, colorCount]);

  // Compute column pairs & Pigeonhole invariant analysis
  const invariantAnalysis = useMemo(() => {
    // Total pairs possible across r rows: C(r, 2)
    const combinationsR2 = (rows * (rows - 1)) / 2;
    // Pigeonhole threshold: with `colorCount` colors, each color can have combinationsR2 distinct pairs.
    // Total safe pair slots before duplicate is forced = colorCount * combinationsR2.
    const maxSafePairs = colorCount * combinationsR2;

    // Count monochromatic pairs per column
    let totalMonochromaticPairs = 0;
    const columnPairsBreakdown: { col: number; pairs: { r1: number; r2: number; color: PointColor }[] }[] = [];

    for (let c = 0; c < cols; c++) {
      const colPairs: { r1: number; r2: number; color: PointColor }[] = [];
      for (let r1 = 0; r1 < rows; r1++) {
        for (let r2 = r1 + 1; r2 < rows; r2++) {
          if (grid[r1][c] !== 'uncolored' && grid[r1][c] === grid[r2][c]) {
            colPairs.push({ r1, r2, color: grid[r1][c] });
            totalMonochromaticPairs++;
          }
        }
      }
      columnPairsBreakdown.push({ col: c, pairs: colPairs });
    }

    // Minimum monochromatic pairs per column if all points are colored (by Pigeonhole Principle):
    // For each column of r points with c colors, by PHP there are at least ceil(r/colorCount) points of same color
    const minSameColorPerCol = Math.ceil(rows / colorCount);
    const minPairsPerCol = (minSameColorPerCol * (minSameColorPerCol - 1)) / 2;
    const theoreticalGuaranteedPairs = cols * minPairsPerCol;

    const phpForcesRectangle = theoreticalGuaranteedPairs > maxSafePairs;

    return {
      combinationsR2,
      maxSafePairs,
      totalMonochromaticPairs,
      columnPairsBreakdown,
      theoreticalGuaranteedPairs,
      phpForcesRectangle,
    };
  }, [grid, rows, cols, colorCount]);

  // Preset loaders
  const loadPreset = (presetRows: number, presetCols: number, desc: string) => {
    handleResize(presetRows, presetCols);
    setNotification(desc);
    setTimeout(() => setNotification(null), 4000);
  };

  // Backtracking solver to find a valid rectangle-free coloring
  const handleAutoSolve = () => {
    const targetColors: PointColor[] = colorCount === 2 ? ['red', 'blue'] : ['red', 'blue', 'green'];
    const newGrid: PointColor[][] = Array.from({ length: rows }, () => Array(cols).fill('uncolored'));

    const isValid = (r: number, c: number, color: PointColor): boolean => {
      // Check if placing `color` at (r, c) creates a monochromatic rectangle with any previous row r0 < r and col c0 < c
      for (let r0 = 0; r0 < r; r0++) {
        if (newGrid[r0][c] === color) {
          for (let c0 = 0; c0 < c; c0++) {
            if (newGrid[r][c0] === color && newGrid[r0][c0] === color) {
              return false; // Rectangle formed!
            }
          }
        }
      }
      return true;
    };

    const solve = (pos: number): boolean => {
      if (pos === rows * cols) return true;
      const r = Math.floor(pos / cols);
      const c = pos % cols;

      // Randomize color order to find varied solutions
      const shuffledColors = [...targetColors].sort(() => Math.random() - 0.5);

      for (const color of shuffledColors) {
        if (isValid(r, c, color)) {
          newGrid[r][c] = color;
          if (solve(pos + 1)) return true;
          newGrid[r][c] = 'uncolored';
        }
      }
      return false;
    };

    const success = solve(0);
    if (success) {
      setGrid(newGrid);
      setNotification(`Found valid rectangle-free coloring for ${rows}×${cols} lattice!`);
    } else {
      setNotification(`Mathematically impossible: No rectangle-free coloring exists for ${rows}×${cols} with ${colorCount} colors (Pigeonhole Theorem verified).`);
    }
    setTimeout(() => setNotification(null), 5000);
    recordLatticeExperiment();
  };

  // Random fill
  const handleRandomFill = () => {
    const colors: PointColor[] = colorCount === 2 ? ['red', 'blue'] : ['red', 'blue', 'green'];
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => colors[Math.floor(Math.random() * colors.length)])
    );
    setGrid(newGrid);
    recordLatticeExperiment();
  };

  // Clear
  const handleClear = () => {
    setGrid(Array.from({ length: rows }, () => Array(cols).fill('uncolored')));
  };

  // Save finding as conjecture
  const handleSaveToNotebook = () => {
    const text = `Explored ${rows}×${cols} integer lattice with ${colorCount} colors. Found ${detectedRectangles.length} monochromatic rectangles. Total column-pairs: ${invariantAnalysis.totalMonochromaticPairs} (max capacity before PHP collision: ${invariantAnalysis.maxSafePairs}).`;
    saveNewConjecture('lattice-coloring', 'The Chromatic Invariants of Integer Lattices', rows === 3 && cols === 3 ? 1 : 2, text, ['Lattice', 'Pigeonhole', 'Ramsey Theory']);
    setNotification('Saved observation & data to your Research Notebook!');
    setTimeout(() => setNotification(null), 4000);
  };

  const isPointInMonochromaticRectangle = (r: number, c: number) => {
    return detectedRectangles.some(
      (rect) => (rect.r1 === r || rect.r2 === r) && (rect.c1 === c || rect.c2 === c)
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
      {/* Header & Mission Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-400/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Inquiry Workbench</span>
          </div>
          <h3 className="font-display-bold text-2xl font-extrabold text-slate-900 dark:text-white">
            Integer Lattice Chromatic Invariant Simulator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Test conjectures on grid coloring. Click points to assign colors, scan for axis-aligned monochromatic rectangles, and verify how the Pigeonhole Principle forces invariants.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadPreset(3, 3, 'Level 1: 3×3 Grid. Notice: Can you avoid all monochromatic rectangles?')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              rows === 3 && cols === 3
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            3×3 Grid (L1)
          </button>
          <button
            onClick={() => loadPreset(3, 7, 'Level 2/3: 3×7 Critical Ramsey Threshold! Can 7 columns avoid duplicate pairs?')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              rows === 3 && cols === 7
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            3×7 Ramsey (L2/L3)
          </button>
          <button
            onClick={() => loadPreset(4, 4, '4×4 Grid with 2 colors: Investigating higher combinatorial density.')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              rows === 4 && cols === 4
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            4×4 Grid
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs font-medium text-amber-900 dark:text-amber-200 flex items-center gap-2 animate-in fade-in">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid Configuration Controls & Brush Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
        {/* Dimension sliders */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Grid Dimensions: {rows} Rows × {cols} Columns
          </label>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-slate-500 w-12">Rows: {rows}</span>
            <input
              type="range"
              min="2"
              max="6"
              value={rows}
              onChange={(e) => handleResize(parseInt(e.target.value), cols)}
              className="flex-1 accent-[#0077c8]"
            />
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-slate-500 w-12">Cols: {cols}</span>
            <input
              type="range"
              min="2"
              max="10"
              value={cols}
              onChange={(e) => handleResize(rows, parseInt(e.target.value))}
              className="flex-1 accent-[#0077c8]"
            />
          </div>
        </div>

        {/* Colors & Palette Brush */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Number of Colors: {colorCount}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setColorCount(2)}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition ${
                colorCount === 2
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              2 Colors (R, B)
            </button>
            <button
              onClick={() => setColorCount(3)}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition ${
                colorCount === 3
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              3 Colors (R, B, G)
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500">Active Brush:</span>
            <button
              onClick={() => setActivePalette('red')}
              className={`w-6 h-6 rounded-full bg-rose-500 border-2 transition ${
                activePalette === 'red' ? 'ring-2 ring-rose-400 scale-110 border-white' : 'border-transparent opacity-70'
              }`}
              title="Red Brush"
            />
            <button
              onClick={() => setActivePalette('blue')}
              className={`w-6 h-6 rounded-full bg-sky-500 border-2 transition ${
                activePalette === 'blue' ? 'ring-2 ring-sky-400 scale-110 border-white' : 'border-transparent opacity-70'
              }`}
              title="Blue Brush"
            />
            {colorCount === 3 && (
              <button
                onClick={() => setActivePalette('green')}
                className={`w-6 h-6 rounded-full bg-emerald-500 border-2 transition ${
                  activePalette === 'green' ? 'ring-2 ring-emerald-400 scale-110 border-white' : 'border-transparent opacity-70'
                }`}
                title="Green Brush"
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoSolve}
              className="flex-1 py-2 px-3 bg-[#0077c8] hover:bg-[#005fa3] text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Auto-Find Solution</span>
            </button>
            <button
              onClick={handleRandomFill}
              className="py-2 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition"
              title="Fill randomly with chosen colors"
            >
              Random
            </button>
            <button
              onClick={handleClear}
              className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl text-xs transition"
              title="Clear all points"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleSaveToNotebook}
            className="w-full py-1.5 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 hover:opacity-90"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Finding to Notebook</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Lattice Board & Detection Readout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lattice SVG Board (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative min-h-[360px] overflow-x-auto">
          <div className="text-center mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Interactive Integer Lattice (Click vertices to toggle color)
            </span>
          </div>

          {/* Grid Container */}
          <div 
            className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-800 inline-block"
            style={{ minWidth: `${cols * 50 + 60}px` }}
          >
            {/* Column Indices */}
            <div className="flex justify-between pl-8 pr-4 mb-2">
              {Array.from({ length: cols }).map((_, c) => (
                <span key={c} className="font-mono text-[10px] text-slate-400 font-bold w-9 text-center">
                  c{c + 1}
                </span>
              ))}
            </div>

            {/* Rows with Points */}
            <div className="space-y-4">
              {grid.map((rowArr, r) => (
                <div key={r} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-400 font-bold w-5 text-right">
                    r{r + 1}
                  </span>

                  <div className="flex items-center gap-4">
                    {rowArr.map((color, c) => {
                      const isInRect = isPointInMonochromaticRectangle(r, c);
                      return (
                        <button
                          key={c}
                          onClick={() => handlePointClick(r, c)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all transform hover:scale-115 active:scale-95 relative border-2 ${
                            COLOR_MAP[color].bg
                          } ${COLOR_MAP[color].border} ${
                            isInRect
                              ? 'ring-4 ring-amber-400 animate-pulse shadow-lg scale-110'
                              : 'shadow-xs'
                          }`}
                          title={`Point (${r + 1}, ${c + 1}): ${COLOR_MAP[color].label}`}
                        >
                          <span className="text-[10px] font-mono text-white font-extrabold select-none">
                            {color !== 'uncolored' ? color[0].toUpperCase() : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Lattice Grid Lines SVG Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-math-grid" />
          </div>

          {/* Status Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            {detectedRectangles.length === 0 ? (
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Monochromatic Rectangles (Valid Coloring!)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800">
                <AlertTriangle className="w-4 h-4" />
                <span>
                  {detectedRectangles.length} Monochromatic Rectangle{detectedRectangles.length > 1 ? 's' : ''} Detected!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Live Mathematical Invariant Analysis (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Pigeonhole Principle & Invariant Counter
              </span>
              <h4 className="font-display-bold text-base font-bold text-slate-900 dark:text-white">
                Column-Pair Invariant Analysis
              </h4>
            </div>

            {/* Combinatorial Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <div className="text-base font-bold text-[#0077c8] dark:text-sky-400">
                  <InlineMath math={`\\binom{${rows}}{2} = ${invariantAnalysis.combinationsR2}`} />
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-1">
                  Row-Pairs per Column
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <div className="text-base font-bold text-amber-600 dark:text-amber-400">
                  <InlineMath math={`k \\binom{r}{2} = ${invariantAnalysis.maxSafePairs}`} />
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-1">
                  Max Safe Pigeonhole Pairs
                </div>
              </div>
            </div>

            {/* Invariant Bound Formula */}
            <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 text-center">
              <span className="text-[10px] uppercase font-bold text-[#0077c8] dark:text-sky-400 block mb-0.5">
                Pigeonhole Invariant Condition
              </span>
              <BlockMath math={`\\sum_{j=1}^{${cols}} \\binom{k_j}{2} \\le ${colorCount} \\binom{${rows}}{2}`} className="text-xs text-[#0077c8] dark:text-sky-300 my-0 py-0.5" />
            </div>

            {/* Current Invariant Status */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-600 dark:text-slate-400">Current Same-Color Pairs:</span>
                <span className="font-mono text-sm text-slate-900 dark:text-white">
                  {invariantAnalysis.totalMonochromaticPairs} / {invariantAnalysis.maxSafePairs}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full transition-all ${
                    invariantAnalysis.totalMonochromaticPairs > invariantAnalysis.maxSafePairs
                      ? 'bg-rose-500'
                      : 'bg-[#0077c8]'
                  }`}
                  style={{ width: `${Math.min(100, (invariantAnalysis.totalMonochromaticPairs / (invariantAnalysis.maxSafePairs || 1)) * 100)}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {invariantAnalysis.totalMonochromaticPairs > invariantAnalysis.maxSafePairs ? (
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    The total monochromatic pairs ({invariantAnalysis.totalMonochromaticPairs}) strictly exceeds the maximum capacity of unique pair assignments ({invariantAnalysis.maxSafePairs}). By the Pigeonhole Principle, at least two columns must share the identical row-pair color, creating an inescapable rectangle!
                  </span>
                ) : (
                  <span>
                    Current pairs are below collision threshold. Notice how each new column forces additional vertical pairs.
                  </span>
                )}
              </p>
            </div>

            {/* Detected Rectangles Coordinates List */}
            {detectedRectangles.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Monochromatic Rectangles Found:</span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1 text-[11px] font-mono">
                  {detectedRectangles.map((rect, idx) => (
                    <div 
                      key={idx}
                      className="p-2 rounded-lg bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-slate-800 dark:text-slate-200 flex items-center justify-between"
                    >
                      <span className="font-bold capitalize text-rose-700 dark:text-rose-400">
                        {rect.color} Rectangle #{idx + 1}
                      </span>
                      <span>
                        rows [{rect.r1 + 1}, {rect.r2 + 1}], cols [{rect.c1 + 1}, {rect.c2 + 1}]
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
