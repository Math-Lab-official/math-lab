import { LabTab, LabProgressRecord, UserProgressMap } from '../types';

export const SIMULATION_LAB_IDS: LabTab[] = [
  'graphing',
  'geometry',
  'calculus',
  'linear-algebra',
  'probability',
  'discrete',
];

const getStorageKey = (email: string) => `math_lab_progress_${email.toLowerCase().trim()}`;

/**
 * Returns the progress map for a given user email.
 * Initializes with demo data if it's the demo student or demo faculty account.
 */
export function getStoredProgress(email?: string): UserProgressMap {
  if (!email) return {};

  const key = getStorageKey(email);
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw) as UserProgressMap;
    }
  } catch {
    // ignore parse error and proceed to default seeding
  }

  // Seed demo student (Emily Bu) with 3 completed, 1 in-progress
  if (email.toLowerCase().includes('emily') || email.toLowerCase().includes('bu') || email.toLowerCase().includes('student')) {
    const seed: UserProgressMap = {
      graphing: {
        labId: 'graphing',
        status: 'completed',
        lastInteractedAt: Date.now() - 3600 * 1000 * 4,
        completedAt: Date.now() - 3600 * 1000 * 4,
        interactionCount: 5,
      },
      geometry: {
        labId: 'geometry',
        status: 'completed',
        lastInteractedAt: Date.now() - 3600 * 1000 * 24,
        completedAt: Date.now() - 3600 * 1000 * 24,
        interactionCount: 8,
      },
      calculus: {
        labId: 'calculus',
        status: 'completed',
        lastInteractedAt: Date.now() - 3600 * 1000 * 48,
        completedAt: Date.now() - 3600 * 1000 * 48,
        interactionCount: 6,
      },
      'linear-algebra': {
        labId: 'linear-algebra',
        status: 'in_progress',
        lastInteractedAt: Date.now() - 3600 * 1000 * 2,
        interactionCount: 3,
      },
      probability: {
        labId: 'probability',
        status: 'not_started',
        lastInteractedAt: 0,
        interactionCount: 0,
      },
      discrete: {
        labId: 'discrete',
        status: 'not_started',
        lastInteractedAt: 0,
        interactionCount: 0,
      },
    };
    saveStoredProgress(email, seed);
    return seed;
  }

  // Seed demo faculty (Dr. Euler) with all 6 completed
  if (email.toLowerCase().includes('euler') || email.toLowerCase().includes('faculty')) {
    const seed: UserProgressMap = {};
    SIMULATION_LAB_IDS.forEach((id) => {
      seed[id] = {
        labId: id,
        status: 'completed',
        lastInteractedAt: Date.now() - 3600 * 1000 * 12,
        completedAt: Date.now() - 3600 * 1000 * 12,
        interactionCount: 12,
      };
    });
    saveStoredProgress(email, seed);
    return seed;
  }

  // Default empty map for new users
  const initialMap: UserProgressMap = {};
  SIMULATION_LAB_IDS.forEach((id) => {
    initialMap[id] = {
      labId: id,
      status: 'not_started',
      lastInteractedAt: 0,
      interactionCount: 0,
    };
  });
  saveStoredProgress(email, initialMap);
  return initialMap;
}

export function saveStoredProgress(email: string | undefined, progress: UserProgressMap): void {
  if (!email) return;
  try {
    localStorage.setItem(getStorageKey(email), JSON.stringify(progress));
  } catch {
    // LocalStorage full or disabled
  }
}

/**
 * Automatically records that a user visited or interacted with a simulation lab.
 * Upgrades 'not_started' to 'in_progress'. Keeps 'completed' unchanged.
 */
export function recordLabInteraction(email: string | undefined, labId: LabTab): UserProgressMap {
  if (!email || !SIMULATION_LAB_IDS.includes(labId)) return {};
  const current = getStoredProgress(email);
  const existing = current[labId] || {
    labId,
    status: 'not_started',
    lastInteractedAt: 0,
    interactionCount: 0,
  };

  const updated: LabProgressRecord = {
    ...existing,
    lastInteractedAt: Date.now(),
    interactionCount: (existing.interactionCount || 0) + 1,
    status: existing.status === 'completed' ? 'completed' : 'in_progress',
  };

  const nextMap = { ...current, [labId]: updated };
  saveStoredProgress(email, nextMap);
  return nextMap;
}

/**
 * Toggles a lab between completed and in_progress/not_started.
 */
export function toggleLabCompletion(email: string, labId: LabTab): UserProgressMap {
  if (!email || !SIMULATION_LAB_IDS.includes(labId)) return {};
  const current = getStoredProgress(email);
  const existing = current[labId] || {
    labId,
    status: 'not_started',
    lastInteractedAt: 0,
    interactionCount: 0,
  };

  const isCompleted = existing.status === 'completed';
  const updated: LabProgressRecord = {
    ...existing,
    status: isCompleted ? 'in_progress' : 'completed',
    completedAt: isCompleted ? undefined : Date.now(),
    lastInteractedAt: Date.now(),
  };

  const nextMap = { ...current, [labId]: updated };
  saveStoredProgress(email, nextMap);
  return nextMap;
}

export function getProgressSummary(progress: UserProgressMap) {
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;

  SIMULATION_LAB_IDS.forEach((id) => {
    const rec = progress[id];
    if (!rec || rec.status === 'not_started') {
      notStarted++;
    } else if (rec.status === 'completed') {
      completed++;
    } else if (rec.status === 'in_progress') {
      inProgress++;
    }
  });

  const total = SIMULATION_LAB_IDS.length;
  const percentage = Math.round((completed / total) * 100);

  return {
    total,
    completed,
    inProgress,
    notStarted,
    percentage,
  };
}

export function formatTimeAgo(timestamp?: number): string {
  if (!timestamp) return 'Never';
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  const days = Math.floor(diffSec / 86400);
  return `${days}d ago`;
}
