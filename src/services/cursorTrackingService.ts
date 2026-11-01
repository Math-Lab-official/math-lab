import { 
  ref, 
  set, 
  onValue, 
  onDisconnect, 
  remove, 
  Unsubscribe 
} from 'firebase/database';
import { database } from './firebase';

export interface CollaborativeCursor {
  sessionId: string;
  userName: string;
  userColor: string;
  xPercent: number; // 0 - 100%
  yPercent: number; // 0 - 100%
  isActive: boolean;
  isClicking?: boolean;
  lastUpdated: number;
  labId: string;
}

export interface CollaboratorProfile {
  sessionId: string;
  userName: string;
  userColor: string;
}

const PRESET_COLORS = [
  '#0284c7', // Sky 600
  '#059669', // Emerald 600
  '#d97706', // Amber 600
  '#e11d48', // Rose 600
  '#7c3aed', // Purple 600
  '#4f46e5', // Indigo 600
  '#0d9488', // Teal 600
  '#ea580c', // Orange 600
];

const RESEARCHER_TITLES = [
  'Euler',
  'Gauss',
  'Noether',
  'Fermat',
  'Ramanujan',
  'Hypatia',
  'Lovelace',
  'Riemann',
  'Pascal',
  'Cantor',
  'Poincaré',
  'Curie',
];

/**
 * Retrieve or generate a persistent local collaborator profile
 */
export function getOrCreateCollaboratorProfile(): CollaboratorProfile {
  try {
    const stored = localStorage.getItem('mathlab_collaborator_profile');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.sessionId && parsed.userName && parsed.userColor) {
        return parsed;
      }
    }
  } catch {
    // fallback if localStorage unavailable
  }

  const randomNum = Math.floor(100 + Math.random() * 900);
  const randomTitle = RESEARCHER_TITLES[Math.floor(Math.random() * RESEARCHER_TITLES.length)];
  const randomColor = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
  const sessionId = 'usr_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);

  const newProfile: CollaboratorProfile = {
    sessionId,
    userName: `${randomTitle} #${randomNum}`,
    userColor: randomColor,
  };

  try {
    localStorage.setItem('mathlab_collaborator_profile', JSON.stringify(newProfile));
  } catch {
    // Ignore storage quota errors
  }

  return newProfile;
}

export function updateCollaboratorProfile(name: string, color: string): CollaboratorProfile {
  const current = getOrCreateCollaboratorProfile();
  const updated: CollaboratorProfile = {
    ...current,
    userName: name.trim() || current.userName,
    userColor: color || current.userColor,
  };

  try {
    localStorage.setItem('mathlab_collaborator_profile', JSON.stringify(updated));
  } catch {
    // Ignore
  }

  return updated;
}

export class CursorCollaborationHub {
  private labId: string;
  private profile: CollaboratorProfile;
  private broadcastChannel: BroadcastChannel | null = null;
  private firebaseUnsub: Unsubscribe | null = null;
  private onCursorsChanged: (cursors: CollaborativeCursor[]) => void;
  private localCursorsMap: Map<string, CollaborativeCursor> = new Map();
  private throttleTimeout: any = null;
  private pendingUpdate: Partial<CollaborativeCursor> | null = null;
  private isDestroyed = false;

  constructor(labId: string, onCursorsChanged: (cursors: CollaborativeCursor[]) => void) {
    this.labId = labId;
    this.profile = getOrCreateCollaboratorProfile();
    this.onCursorsChanged = onCursorsChanged;

    this.initBroadcastChannel();
    this.initFirebaseRTDB();
  }

  /**
   * Cross-tab / cross-window broadcast for real-time collaboration
   */
  private initBroadcastChannel() {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel(`mathlab_cursors_${this.labId}`);
        this.broadcastChannel.onmessage = (event) => {
          if (this.isDestroyed) return;
          const data = event.data;
          if (data && data.type === 'cursor_update') {
            this.handleRemoteCursor(data.cursor);
          } else if (data && data.type === 'cursor_leave') {
            this.handleRemoteCursorLeave(data.sessionId);
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel unavailable:', e);
    }
  }

  /**
   * Firebase Realtime Database setup
   */
  private initFirebaseRTDB() {
    if (!database) {
      return;
    }

    try {
      const cursorsRef = ref(database, `labs_collaboration/${this.labId}/cursors`);
      const userRef = ref(database, `labs_collaboration/${this.labId}/cursors/${this.profile.sessionId}`);

      // Setup onDisconnect cleanup
      try {
        onDisconnect(userRef).remove().catch(() => {});
      } catch {
        // Safe disconnect fallback
      }

      // Listen to real-time cursor updates from other researchers
      this.firebaseUnsub = onValue(
        cursorsRef,
        (snapshot) => {
          if (this.isDestroyed) return;
          const val = snapshot.val();
          if (!val) {
            this.pruneFirebaseCursors(new Set());
            return;
          }

          const now = Date.now();
          const remoteIds = new Set<string>();

          Object.keys(val).forEach((sessId) => {
            if (sessId === this.profile.sessionId) return; // skip self
            const c = val[sessId] as CollaborativeCursor;
            // Prune stale cursors older than 20 seconds
            if (c && now - c.lastUpdated < 20000 && c.isActive) {
              remoteIds.add(sessId);
              this.localCursorsMap.set(sessId, c);
            }
          });

          this.pruneFirebaseCursors(remoteIds);
          this.notifySubscribers();
        },
        (error) => {
          console.info('Firebase Realtime Database cursor stream notification:', error.message);
        }
      );
    } catch (err) {
      console.info('Firebase cursor initialization notice:', err);
    }
  }

  private pruneFirebaseCursors(validIds: Set<string>) {
    let changed = false;
    for (const [id] of this.localCursorsMap.entries()) {
      if (!validIds.has(id)) {
        this.localCursorsMap.delete(id);
        changed = true;
      }
    }
    if (changed) {
      this.notifySubscribers();
    }
  }

  private handleRemoteCursor(cursor: CollaborativeCursor) {
    if (!cursor || cursor.sessionId === this.profile.sessionId) return;
    if (cursor.isActive) {
      this.localCursorsMap.set(cursor.sessionId, cursor);
    } else {
      this.localCursorsMap.delete(cursor.sessionId);
    }
    this.notifySubscribers();
  }

  private handleRemoteCursorLeave(sessionId: string) {
    if (this.localCursorsMap.has(sessionId)) {
      this.localCursorsMap.delete(sessionId);
      this.notifySubscribers();
    }
  }

  private notifySubscribers() {
    const now = Date.now();
    const activeCursors: CollaborativeCursor[] = [];

    for (const [_, c] of this.localCursorsMap.entries()) {
      // Discard older than 15s
      if (now - c.lastUpdated < 15000 && c.isActive) {
        activeCursors.push(c);
      }
    }

    this.onCursorsChanged(activeCursors);
  }

  /**
   * Broadcast cursor position to collaborators
   */
  public updateCursorPosition(xPercent: number, yPercent: number, isClicking: boolean = false) {
    if (this.isDestroyed) return;

    const clampedX = Math.max(0, Math.min(100, xPercent));
    const clampedY = Math.max(0, Math.min(100, yPercent));

    const cursorData: CollaborativeCursor = {
      sessionId: this.profile.sessionId,
      userName: this.profile.userName,
      userColor: this.profile.userColor,
      xPercent: clampedX,
      yPercent: clampedY,
      isActive: true,
      isClicking,
      lastUpdated: Date.now(),
      labId: this.labId,
    };

    // 1. BroadcastChannel (Immediate 0ms cross-tab sync)
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'cursor_update',
          cursor: cursorData,
        });
      } catch {
        // Ignore
      }
    }

    // 2. Throttled Firebase Realtime Database update (every 40ms)
    this.pendingUpdate = cursorData;
    if (!this.throttleTimeout) {
      this.throttleTimeout = setTimeout(() => {
        this.throttleTimeout = null;
        this.flushFirebaseUpdate();
      }, 40);
    }
  }

  /**
   * Mark local user cursor as inactive / left canvas
   */
  public setCursorInactive() {
    if (this.isDestroyed) return;

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'cursor_leave',
          sessionId: this.profile.sessionId,
        });
      } catch {
        // Ignore
      }
    }

    if (database) {
      try {
        const userRef = ref(database, `labs_collaboration/${this.labId}/cursors/${this.profile.sessionId}`);
        set(userRef, {
          sessionId: this.profile.sessionId,
          isActive: false,
          lastUpdated: Date.now(),
        }).catch(() => {});
      } catch {
        // Ignore
      }
    }
  }

  private flushFirebaseUpdate() {
    if (!this.pendingUpdate || !database || this.isDestroyed) return;

    const data = this.pendingUpdate;
    this.pendingUpdate = null;

    try {
      const userRef = ref(database, `labs_collaboration/${this.labId}/cursors/${this.profile.sessionId}`);
      set(userRef, data).catch(() => {});
    } catch {
      // Ignore
    }
  }

  public getProfile(): CollaboratorProfile {
    return this.profile;
  }

  public setProfile(newProfile: CollaboratorProfile) {
    this.profile = newProfile;
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.throttleTimeout) {
      clearTimeout(this.throttleTimeout);
      this.throttleTimeout = null;
    }

    this.setCursorInactive();

    if (this.firebaseUnsub) {
      try {
        this.firebaseUnsub();
      } catch {
        // Ignore
      }
      this.firebaseUnsub = null;
    }

    if (database) {
      try {
        const userRef = ref(database, `labs_collaboration/${this.labId}/cursors/${this.profile.sessionId}`);
        remove(userRef).catch(() => {});
      } catch {
        // Ignore
      }
    }

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.close();
      } catch {
        // Ignore
      }
      this.broadcastChannel = null;
    }

    this.localCursorsMap.clear();
  }
}
