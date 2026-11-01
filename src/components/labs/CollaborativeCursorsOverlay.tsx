import React from 'react';
import { CollaborativeCursor } from '../../services/cursorTrackingService';

interface CollaborativeCursorsOverlayProps {
  cursors: CollaborativeCursor[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const CollaborativeCursorsOverlay: React.FC<CollaborativeCursorsOverlayProps> = ({
  cursors,
}) => {
  if (cursors.length === 0) return null;

  return (
    <div 
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
    >
      {cursors.map((cursor) => {
        const leftPercent = cursor.xPercent;
        const topPercent = cursor.yPercent;

        return (
          <div
            key={cursor.sessionId}
            className="absolute transition-all duration-75 ease-out select-none"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: 'translate(-2px, -2px)',
            }}
          >
            {/* Click Pulse Ring */}
            {cursor.isClicking && (
              <span 
                className="absolute -top-2 -left-2 w-7 h-7 rounded-full animate-ping opacity-75 pointer-events-none"
                style={{ backgroundColor: cursor.userColor }}
              />
            )}

            {/* Custom SVG Cursor Arrow */}
            <svg
              className="w-5 h-5 drop-shadow-md"
              viewBox="0 0 24 24"
              fill={cursor.userColor}
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            </svg>

            {/* Collaborator Name Tag */}
            <div
              className="absolute left-3.5 top-3.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-white shadow-md flex items-center gap-1.5 whitespace-nowrap pointer-events-none border border-white/20"
              style={{ backgroundColor: cursor.userColor }}
            >
              <span>{cursor.userName}</span>
              {cursor.isClicking && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
