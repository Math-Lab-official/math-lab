import React, { useState, useEffect, useRef } from 'react';
import { Check, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'circle' | 'square' | 'math' | 'star';
  symbol?: string;
  opacity: number;
}

interface CompletionCheckboxProps {
  isCompleted: boolean;
  onToggle: () => void;
  size?: 'compact' | 'standard' | 'large';
  label?: string;
  completedLabel?: string;
  className?: string;
}

// Subtle celebratory tone using Web Audio API
const playCompletionChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // 2-tone pleasant harmonic chime (C6 -> G6)
    const tones = [
      { freq: 1046.5, time: 0, dur: 0.18 },      // C6
      { freq: 1567.98, time: 0.08, dur: 0.32 },  // G6
    ];

    tones.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      // Soft envelope to avoid clicks
      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.045, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });

    // Close context after playback
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 600);
  } catch {
    // Graceful fallback for environments with blocked autoplay
  }
};

export const CompletionCheckbox: React.FC<CompletionCheckboxProps> = ({
  isCompleted,
  onToggle,
  size = 'standard',
  label = 'Mark as Completed',
  completedLabel = 'Completed ✓',
  className = '',
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPopping, setIsPopping] = useState(false);
  const [showRewardPill, setShowRewardPill] = useState(false);
  const prevCompletedRef = useRef(isCompleted);

  // Colors aligned with Math Lab identity (Azure blue, Emerald, Amber, Violet, Rose)
  const confettiColors = [
    '#10b981', // emerald-500
    '#059669', // emerald-600
    '#0077c8', // math lab blue
    '#38bdf8', // sky-400
    '#f59e0b', // amber-500
    '#fbbf24', // amber-400
    '#8b5cf6', // purple-500
    '#ec4899', // pink-500
  ];

  const mathSymbols = ['π', '∑', '∫', '∆', 'θ', '√', '★', '✦'];

  const triggerCelebration = () => {
    setIsPopping(true);
    setShowRewardPill(true);
    playCompletionChime();

    // Spawn 18 subtle confetti particles radiating outward
    const newParticles: Particle[] = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      const distance = 28 + Math.random() * 38; // 28px - 66px radius
      const shapeType = Math.random() > 0.65 ? 'math' : Math.random() > 0.45 ? 'star' : Math.random() > 0.5 ? 'square' : 'circle';
      const symbol = shapeType === 'math' ? mathSymbols[Math.floor(Math.random() * mathSymbols.length)] : undefined;

      newParticles.push({
        id: Date.now() + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        vx: Math.cos(angle) * (1.2 + Math.random()),
        vy: Math.sin(angle) * (1.2 + Math.random()) + 0.3, // slight gravity
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: shapeType === 'math' ? 11 : shapeType === 'circle' ? 5 + Math.random() * 3 : 6 + Math.random() * 3,
        rotation: Math.random() * 360,
        shape: shapeType,
        symbol,
        opacity: 1,
      });
    }

    setParticles(newParticles);

    // Clear after animation finishes
    const popTimer = setTimeout(() => {
      setIsPopping(false);
    }, 600);

    const particlesTimer = setTimeout(() => {
      setParticles([]);
    }, 900);

    const pillTimer = setTimeout(() => {
      setShowRewardPill(false);
    }, 1100);

    return () => {
      clearTimeout(popTimer);
      clearTimeout(particlesTimer);
      clearTimeout(pillTimer);
    };
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCompleted) {
      triggerCelebration();
    }
    onToggle();
  };

  // Watch for external completions
  useEffect(() => {
    if (!prevCompletedRef.current && isCompleted) {
      triggerCelebration();
    }
    prevCompletedRef.current = isCompleted;
  }, [isCompleted]);

  // Size styling maps
  const sizeStyles = {
    compact: {
      button: 'px-2.5 py-1 text-[11px] gap-1.5 rounded-lg',
      checkbox: 'w-4 h-4 rounded-[5px]',
      icon: 'w-3 h-3',
      text: 'text-[11px]',
    },
    standard: {
      button: 'px-3 py-1.5 text-xs gap-2 rounded-xl',
      checkbox: 'w-5 h-5 rounded-md',
      icon: 'w-3.5 h-3.5',
      text: 'text-xs',
    },
    large: {
      button: 'px-4 py-2 text-xs font-extrabold gap-2.5 rounded-xl',
      checkbox: 'w-5 h-5 rounded-md',
      icon: 'w-3.5 h-3.5',
      text: 'text-xs',
    },
  }[size];

  return (
    <div className="relative inline-flex items-center">
      {/* Floating "+1 Lab Completed!" reward pill */}
      {showRewardPill && (
        <div 
          aria-hidden="true"
          className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none z-30 animate-float-reward whitespace-nowrap"
        >
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-600 to-[#0077c8] text-white shadow-md border border-white/20">
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            <span>+1 Completed!</span>
          </span>
        </div>
      )}

      {/* Confetti Particles Container */}
      {particles.length > 0 && (
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center z-20"
        >
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute inline-block transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`,
                opacity: p.opacity,
                color: p.color,
                fontSize: `${p.size}px`,
                lineHeight: 1,
              }}
            >
              {p.shape === 'circle' && (
                <span
                  className="block rounded-full shadow-2xs"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                  }}
                />
              )}
              {p.shape === 'square' && (
                <span
                  className="block rounded-xs shadow-2xs"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                  }}
                />
              )}
              {p.shape === 'star' && (
                <span style={{ color: p.color }}>✦</span>
              )}
              {p.shape === 'math' && (
                <span className="font-bold font-mono select-none" style={{ color: p.color }}>
                  {p.symbol}
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Expanding Ripple Ring upon completion */}
      {isPopping && (
        <span 
          aria-hidden="true" 
          className="absolute inset-0 rounded-xl bg-emerald-400/40 pointer-events-none animate-reward-ring z-0" 
        />
      )}

      {/* Main Interactive Button / Checkbox */}
      <button
        type="button"
        onClick={handleClick}
        title={isCompleted ? 'Click to mark as incomplete' : 'Click to mark laboratory as completed'}
        className={`relative z-10 font-bold transition-all duration-200 flex items-center justify-center select-none shadow-2xs active:scale-95 group ${
          sizeStyles.button
        } ${
          isCompleted
            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-emerald-500/10'
            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-emerald-400 hover:text-emerald-700'
        } ${className}`}
      >
        {/* Custom Checkbox Square with scale-up and checkmark animation */}
        <div
          className={`flex items-center justify-center transition-all duration-200 shrink-0 border ${
            sizeStyles.checkbox
          } ${
            isCompleted
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
              : 'bg-white border-slate-300 group-hover:border-emerald-500 text-transparent'
          } ${isPopping ? 'animate-checkmark-pop' : ''}`}
        >
          {isCompleted ? (
            <Check 
              className={`${sizeStyles.icon} stroke-[3] ${isPopping ? 'scale-110' : 'scale-100'} transition-transform`} 
            />
          ) : (
            <CheckCircle2 className={`${sizeStyles.icon} text-slate-300 group-hover:text-emerald-400 opacity-60`} />
          )}
        </div>

        {/* Text Label */}
        <span className={`tracking-tight ${sizeStyles.text}`}>
          {isCompleted ? completedLabel : label}
        </span>

        {/* Subtle undo indicator when completed */}
        {isCompleted && (
          <span title="Undo completion" className="inline-flex items-center">
            <RotateCcw 
              className="w-3 h-3 text-emerald-600/60 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 shrink-0" 
            />
          </span>
        )}
      </button>
    </div>
  );
};
