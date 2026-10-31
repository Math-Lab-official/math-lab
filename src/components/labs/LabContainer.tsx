import React, { useState, useEffect, useRef } from 'react';
import { LabTab } from '../../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Download, 
  Image as ImageIcon, 
  Check, 
  ChevronDown,
  Camera
} from 'lucide-react';
import { getStudentProgress, setLabProgressStatus } from '../../utils/studentProgress';

interface LabContainerProps {
  labId: LabTab;
  title: string;
  category: string;
  onBack: () => void;
  onOpenProgress?: () => void;
  children: React.ReactNode;
}

export const LabContainer: React.FC<LabContainerProps> = ({
  labId,
  title,
  category,
  onBack,
  onOpenProgress,
  children,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    const p = getStudentProgress();
    return p.labs[labId]?.status === 'completed';
  });

  const [exportOpen, setExportOpen] = useState(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      const p = getStudentProgress();
      setIsCompleted(p.labs[labId]?.status === 'completed');
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, [labId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleToggleComplete = () => {
    const nextStatus = isCompleted ? 'in_progress' : 'completed';
    setLabProgressStatus(labId, nextStatus);
    setIsCompleted(!isCompleted);
  };

  /**
   * Export the active studio canvas to the user's local filesystem as PNG or JPEG.
   * Renders with an offscreen canvas to guarantee solid background contrast (no black transparent PNG artifacts)
   * and stamps a crisp, academic Math Lab title watermark.
   */
  const handleExportCanvas = (format: 'png' | 'jpeg') => {
    setExportOpen(false);
    const container = workspaceRef.current;
    if (!container) return;

    // Search for all canvas elements in the workspace and choose the largest visible one
    const canvases = Array.from(container.querySelectorAll('canvas'));
    if (canvases.length === 0) {
      setExportFeedback('No canvas found to export');
      setTimeout(() => setExportFeedback(null), 2500);
      return;
    }

    // Select the primary canvas with highest pixel area
    const canvas = canvases.reduce((prev, curr) => {
      const prevArea = prev.width * prev.height;
      const currArea = curr.width * curr.height;
      return currArea >= prevArea ? curr : prev;
    }, canvases[0]);

    try {
      const width = canvas.width;
      const height = canvas.height;
      
      // Calculate high-DPR scaled footer banner
      const footerHeight = Math.max(48, Math.round(height * 0.065));
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height + footerHeight;

      const ctx = offscreen.getContext('2d');
      if (!ctx) return;

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Solid canvas background to prevent transparent-to-black artifacts on JPEG
      ctx.fillStyle = isDark ? '#0b0f19' : '#faf7f2';
      ctx.fillRect(0, 0, offscreen.width, offscreen.height);

      // 2. Draw active simulation canvas
      ctx.drawImage(canvas, 0, 0);

      // 3. Draw academic footer bar
      ctx.fillStyle = isDark ? '#111827' : '#f4ede1';
      ctx.fillRect(0, height, width, footerHeight);

      // Hairline boundary line
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = Math.max(1, Math.round(width / 1000));
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.stroke();

      // Academic metadata footer typography
      const fontSize = Math.max(13, Math.round(width * 0.016));
      ctx.font = `600 ${fontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      ctx.textBaseline = 'middle';

      // Left: Studio title
      ctx.fillStyle = isDark ? '#38bdf8' : '#0077c8';
      ctx.textAlign = 'left';
      ctx.fillText(`MATH LAB  ·  ${title.toUpperCase()}`, Math.round(width * 0.03), height + footerHeight / 2);

      // Right: Timestamp
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.textAlign = 'right';
      ctx.fillText(`Exported ${formattedDate}`, width - Math.round(width * 0.03), height + footerHeight / 2);

      // 4. Generate download trigger
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const dataUrl = offscreen.toDataURL(mimeType, 0.95);

      const link = document.createElement('a');
      const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const dateIso = new Date().toISOString().slice(0, 10);
      link.download = `mathlab-${sanitizedTitle}-${dateIso}.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportFeedback(`Exported ${format.toUpperCase()}`);
      setTimeout(() => setExportFeedback(null), 2500);
    } catch (err) {
      console.error('Failed to export canvas:', err);
      setExportFeedback('Export failed');
      setTimeout(() => setExportFeedback(null), 2500);
    }
  };

  return (
    <div className="space-y-6 py-2 animate-in fade-in">
      {/* Top Navigation & Status Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xs transition-colors">
        
        {/* Left: Return & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 transition flex items-center gap-1.5 text-xs font-semibold"
            title="Return to Laboratories Overview"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Laboratories Suite</span>
          </button>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-[#0077c8] dark:text-sky-400">{category}</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Studio</span>
            </div>
            <h2 className="font-serif-editorial text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Right: Functional Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 self-end lg:self-auto">
          
          {/* Export Work Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition flex items-center gap-2 shadow-2xs"
              title="Export current canvas plot or diagram as an image"
              aria-expanded={exportOpen}
            >
              {exportFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">{exportFeedback}</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5 text-[#0077c8] dark:text-sky-400" />
                  <span>Export Canvas</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {exportOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Download Image File
                </div>
                <button
                  onClick={() => handleExportCanvas('png')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">PNG Image</div>
                      <div className="text-[10px] text-slate-400">Crisp, lossless for papers & slides</div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                </button>

                <button
                  onClick={() => handleExportCanvas('jpeg')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">JPEG Image</div>
                      <div className="text-[10px] text-slate-400">95% quality, compact file size</div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                </button>
              </div>
            )}
          </div>

          {/* Notebook / Milestones Trigger */}
          {onOpenProgress && (
            <button
              onClick={onOpenProgress}
              className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Award className="w-3.5 h-3.5 text-[#0077c8] dark:text-sky-400" />
              <span>Milestones</span>
            </button>
          )}

          {/* Mark Complete Action */}
          <button
            onClick={handleToggleComplete}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 shadow-2xs ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100'
                : 'bg-[#0077c8] hover:bg-[#005fa3] text-white border-transparent'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-white'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Lab Component Workspace with Export Target Reference */}
      <div 
        ref={workspaceRef}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs transition-colors"
      >
        {children}
      </div>
    </div>
  );
};

