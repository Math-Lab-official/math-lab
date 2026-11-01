import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LabTab } from '../../types';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Download, 
  Image as ImageIcon, 
  Check, 
  ChevronDown,
  Camera,
  Users,
  Radio,
  Eye,
  Settings,
  Sparkles,
  Palette
} from 'lucide-react';
import { getStudentProgress, setLabProgressStatus } from '../../utils/studentProgress';
import { 
  CursorCollaborationHub, 
  CollaborativeCursor, 
  CollaboratorProfile,
  getOrCreateCollaboratorProfile, 
  updateCollaboratorProfile 
} from '../../services/cursorTrackingService';
import { CollaborativeCursorsOverlay } from './CollaborativeCursorsOverlay';

interface LabContainerProps {
  labId: LabTab;
  title: string;
  category: string;
  onBack: () => void;
  onOpenProgress?: () => void;
  children: React.ReactNode;
}

const PALETTE_OPTIONS = [
  '#0284c7', // Sky
  '#059669', // Emerald
  '#d97706', // Amber
  '#e11d48', // Rose
  '#7c3aed', // Purple
  '#4f46e5', // Indigo
  '#0d9488', // Teal
  '#ea580c', // Orange
];

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

  // Real-Time Collaborative Cursor State
  const [collabOpen, setCollabOpen] = useState(false);
  const collabDropdownRef = useRef<HTMLDivElement | null>(null);
  const [remoteCursors, setRemoteCursors] = useState<CollaborativeCursor[]>([]);
  const [broadcastEnabled, setBroadcastEnabled] = useState(true);
  const [profile, setProfile] = useState<CollaboratorProfile>(getOrCreateCollaboratorProfile);
  const [nameInput, setNameInput] = useState(profile.userName);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [canvasBox, setCanvasBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [simulatedPeerActive, setSimulatedPeerActive] = useState(false);

  const hubRef = useRef<CursorCollaborationHub | null>(null);

  // Sync completion status from student progress
  useEffect(() => {
    const handleUpdate = () => {
      const p = getStudentProgress();
      setIsCompleted(p.labs[labId]?.status === 'completed');
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, [labId]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
      if (collabDropdownRef.current && !collabDropdownRef.current.contains(e.target as Node)) {
        setCollabOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Initialize Cursor Collaboration Hub for current lab
  useEffect(() => {
    const hub = new CursorCollaborationHub(labId, (cursors) => {
      setRemoteCursors(cursors);
    });
    hubRef.current = hub;

    return () => {
      hub.destroy();
      hubRef.current = null;
    };
  }, [labId]);

  // Measure and align overlay with the active simulation canvas inside the workspace
  const updateCanvasBounds = useCallback(() => {
    const workspaceEl = workspaceRef.current;
    if (!workspaceEl) return;

    const canvases = Array.from(workspaceEl.querySelectorAll('canvas'));
    if (canvases.length === 0) {
      setCanvasBox(null);
      return;
    }

    // Select the largest visible canvas
    const primaryCanvas = canvases.reduce((prev, curr) => {
      const prevArea = prev.offsetWidth * prev.offsetHeight;
      const currArea = curr.offsetWidth * curr.offsetHeight;
      return currArea >= prevArea ? curr : prev;
    }, canvases[0]);

    const wRect = workspaceEl.getBoundingClientRect();
    const cRect = primaryCanvas.getBoundingClientRect();

    setCanvasBox({
      left: Math.max(0, cRect.left - wRect.left),
      top: Math.max(0, cRect.top - wRect.top),
      width: cRect.width,
      height: cRect.height,
    });
  }, []);

  // Track canvas size and position with ResizeObserver
  useEffect(() => {
    updateCanvasBounds();
    const workspaceEl = workspaceRef.current;
    if (!workspaceEl) return;

    const observer = new ResizeObserver(() => {
      updateCanvasBounds();
    });

    observer.observe(workspaceEl);

    // Also observe any canvases
    const canvases = workspaceEl.querySelectorAll('canvas');
    canvases.forEach((c) => observer.observe(c));

    const interval = setInterval(updateCanvasBounds, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [updateCanvasBounds, children]);

  // Handle pointer tracking on the active canvas
  useEffect(() => {
    const workspaceEl = workspaceRef.current;
    if (!workspaceEl) return;

    const getPrimaryCanvas = () => {
      const canvases = Array.from(workspaceEl.querySelectorAll('canvas'));
      if (canvases.length === 0) return null;
      return canvases.reduce((prev, curr) => {
        const prevArea = prev.offsetWidth * prev.offsetHeight;
        const currArea = curr.offsetWidth * curr.offsetHeight;
        return currArea >= prevArea ? curr : prev;
      }, canvases[0]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!broadcastEnabled || !hubRef.current) return;
      const canvas = getPrimaryCanvas();
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      // Check if mouse is within canvas bounds
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
        hubRef.current.updateCursorPosition(xPercent, yPercent, isMouseDown);
      } else {
        hubRef.current.setCursorInactive();
      }
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      if (broadcastEnabled && hubRef.current) {
        const canvas = getPrimaryCanvas();
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const xPercent = ((window.event as any)?.clientX - rect.left) / rect.width * 100;
          const yPercent = ((window.event as any)?.clientY - rect.top) / rect.height * 100;
          if (!isNaN(xPercent) && !isNaN(yPercent)) {
            hubRef.current.updateCursorPosition(xPercent, yPercent, true);
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      if (hubRef.current) {
        hubRef.current.setCursorInactive();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    workspaceEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      workspaceEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [broadcastEnabled, isMouseDown]);

  // Optional simulated study partner for single-user live verification
  useEffect(() => {
    if (!simulatedPeerActive) return;

    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.05;
      const xPercent = 50 + 28 * Math.cos(angle);
      const yPercent = 50 + 22 * Math.sin(angle * 1.4);
      const isClicking = Math.sin(angle * 3) > 0.85;

      const simCursor: CollaborativeCursor = {
        sessionId: 'simulated_peer_euler',
        userName: 'Euler (Peer)',
        userColor: '#059669',
        xPercent,
        yPercent,
        isActive: true,
        isClicking,
        lastUpdated: Date.now(),
        labId,
      };

      setRemoteCursors((prev) => {
        const filtered = prev.filter((c) => c.sessionId !== simCursor.sessionId);
        return [...filtered, simCursor];
      });
    }, 40);

    return () => {
      clearInterval(interval);
      setRemoteCursors((prev) => prev.filter((c) => c.sessionId !== 'simulated_peer_euler'));
    };
  }, [simulatedPeerActive, labId]);

  const handleUpdateName = () => {
    const updated = updateCollaboratorProfile(nameInput, profile.userColor);
    setProfile(updated);
    if (hubRef.current) {
      hubRef.current.setProfile(updated);
    }
  };

  const handleSelectColor = (color: string) => {
    const updated = updateCollaboratorProfile(profile.userName, color);
    setProfile(updated);
    if (hubRef.current) {
      hubRef.current.setProfile(updated);
    }
  };

  const handleToggleComplete = () => {
    const nextStatus = isCompleted ? 'in_progress' : 'completed';
    setLabProgressStatus(labId, nextStatus);
    setIsCompleted(!isCompleted);
  };

  /**
   * Export the active studio canvas to the user's local filesystem as PNG or JPEG.
   */
  const handleExportCanvas = (format: 'png' | 'jpeg') => {
    setExportOpen(false);
    const container = workspaceRef.current;
    if (!container) return;

    const canvases = Array.from(container.querySelectorAll('canvas'));
    if (canvases.length === 0) {
      setExportFeedback('No canvas found to export');
      setTimeout(() => setExportFeedback(null), 2500);
      return;
    }

    const canvas = canvases.reduce((prev, curr) => {
      const prevArea = prev.width * prev.height;
      const currArea = curr.width * curr.height;
      return currArea >= prevArea ? curr : prev;
    }, canvases[0]);

    try {
      const width = canvas.width;
      const height = canvas.height;
      
      const footerHeight = Math.max(48, Math.round(height * 0.065));
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height + footerHeight;

      const ctx = offscreen.getContext('2d');
      if (!ctx) return;

      const isDark = document.documentElement.classList.contains('dark');

      ctx.fillStyle = isDark ? '#0b0f19' : '#faf7f2';
      ctx.fillRect(0, 0, offscreen.width, offscreen.height);
      ctx.drawImage(canvas, 0, 0);

      ctx.fillStyle = isDark ? '#111827' : '#f4ede1';
      ctx.fillRect(0, height, width, footerHeight);

      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = Math.max(1, Math.round(width / 1000));
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.stroke();

      const fontSize = Math.max(13, Math.round(width * 0.016));
      ctx.font = `600 ${fontSize}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
      ctx.textBaseline = 'middle';

      ctx.fillStyle = isDark ? '#38bdf8' : '#0077c8';
      ctx.textAlign = 'left';
      ctx.fillText(`MATH LAB  ·  ${title.toUpperCase()}`, Math.round(width * 0.03), height + footerHeight / 2);

      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.textAlign = 'right';
      ctx.fillText(`Exported ${formattedDate}`, width - Math.round(width * 0.03), height + footerHeight / 2);

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

  const totalCollaborators = remoteCursors.length + (broadcastEnabled ? 1 : 0);

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
          
          {/* Live Collaborative Cursor Tracking Toolbar Button */}
          <div className="relative" ref={collabDropdownRef}>
            <button
              onClick={() => setCollabOpen(!collabOpen)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition flex items-center gap-2 shadow-2xs group"
              title="Real-Time Collaborative Cursor Tracking (Firebase Realtime Database)"
              aria-expanded={collabOpen}
            >
              <div className="relative flex items-center justify-center">
                <Users className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="font-mono text-xs">
                {totalCollaborators} {totalCollaborators === 1 ? 'Researcher' : 'Researchers'}
              </span>
              <span 
                className="w-2.5 h-2.5 rounded-full border border-white/50" 
                style={{ backgroundColor: profile.userColor }}
                title={`Your assigned color: ${profile.userColor}`}
              />
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Collaboration Settings & Active Peer Modal */}
            {collabOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-5 z-40 animate-in fade-in-50 zoom-in-95 duration-150 space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                        Live Canvas Collaboration
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Firebase Realtime Database sync
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold">
                    Realtime Active
                  </span>
                </div>

                {/* My Identity & Pointer Settings */}
                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">My Screen Name</span>
                    <span className="text-[10px] text-slate-400">Visible to peers</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onBlur={handleUpdateName}
                      onKeyDown={(e) => e.key === 'Enter' && handleUpdateName()}
                      placeholder="e.g. Euler #481"
                      className="flex-1 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0077c8]"
                    />
                    <button
                      onClick={handleUpdateName}
                      className="px-2.5 py-1.5 bg-[#0077c8] hover:bg-[#005fa3] text-white text-xs font-bold rounded-lg transition"
                    >
                      Save
                    </button>
                  </div>

                  {/* Color Palette Selector */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Palette className="w-3 h-3 text-[#0077c8]" />
                      <span>Cursor Color</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {PALETTE_OPTIONS.map((c) => (
                        <button
                          key={c}
                          onClick={() => handleSelectColor(c)}
                          className={`w-6 h-6 rounded-full transition-transform ${
                            profile.userColor === c ? 'scale-125 ring-2 ring-offset-2 ring-slate-800 dark:ring-offset-slate-900' : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: c }}
                          aria-label={`Select color ${c}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Broadcast Toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/50">
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      Share My Cursor
                    </span>
                    <button
                      onClick={() => setBroadcastEnabled(!broadcastEnabled)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                        broadcastEnabled
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {broadcastEnabled ? 'Broadcasting' : 'Muted'}
                    </button>
                  </div>
                </div>

                {/* Active Researchers in this Laboratory */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Active in this Studio ({totalCollaborators})</span>
                    <span className="text-[10px] text-slate-400">Canvas Overlay Active</span>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {/* Self */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: profile.userColor }}
                        />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {profile.userName} <span className="text-slate-400 text-[10px] font-mono">(You)</span>
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        {broadcastEnabled ? 'Online' : 'Hidden'}
                      </span>
                    </div>

                    {/* Remote Collaborators */}
                    {remoteCursors.map((c) => (
                      <div 
                        key={c.sessionId}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: c.userColor }}
                          />
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {c.userName}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          ({Math.round(c.xPercent)}%, {Math.round(c.yPercent)}%)
                        </span>
                      </div>
                    ))}

                    {remoteCursors.length === 0 && (
                      <div className="p-3 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                        No other researchers in this studio right now. Open another tab or test with the simulator below!
                      </div>
                    )}
                  </div>
                </div>

                {/* Single-User Simulator for Immediate Demonstration */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Test Partner Cursor:
                  </span>
                  <button
                    onClick={() => setSimulatedPeerActive(!simulatedPeerActive)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      simulatedPeerActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{simulatedPeerActive ? 'Stop Demo Peer' : 'Simulate Peer'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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

      {/* Lab Component Workspace with Real-Time Collaborative Cursor Overlay */}
      <div 
        ref={workspaceRef}
        className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xs transition-colors"
      >
        {/* Pixel-perfect canvas overlay positioning */}
        {canvasBox && (
          <div
            style={{
              position: 'absolute',
              left: `${canvasBox.left}px`,
              top: `${canvasBox.top}px`,
              width: `${canvasBox.width}px`,
              height: `${canvasBox.height}px`,
              pointerEvents: 'none',
              zIndex: 30,
            }}
          >
            <CollaborativeCursorsOverlay cursors={remoteCursors} containerRef={workspaceRef} />
          </div>
        )}

        {/* Fallback full workspace overlay if no canvas is present */}
        {!canvasBox && remoteCursors.length > 0 && (
          <CollaborativeCursorsOverlay cursors={remoteCursors} containerRef={workspaceRef} />
        )}

        {children}
      </div>
    </div>
  );
};
