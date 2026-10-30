import { LabTab } from '../types';

export type LevelStatus = 'not_started' | 'exploring' | 'conjectured' | 'mastered';

export interface LevelProgressRecord {
  status: LevelStatus;
  notes: string;
  conjecture?: string;
  lastUpdated: number;
}

export interface SavedConjecture {
  id: string;
  investigationId: string;
  investigationTitle: string;
  level: number;
  text: string;
  timestamp: number;
  tags?: string[];
}

export interface StudentProfile {
  name: string;
  schoolOrLab: string;
  gradeLevel: string;
}

export interface StudentProgressState {
  profile: StudentProfile;
  investigations: Record<string, Record<number, LevelProgressRecord>>;
  labs: Record<string, { status: 'not_started' | 'in_progress' | 'completed'; interactionCount: number; lastInteractedAt: number }>;
  conjectures: SavedConjecture[];
  latticeExperimentsRun: number;
  lastActive: number;
}

const STORAGE_KEY = 'math_lab_student_progress_v2';

const DEFAULT_STATE: StudentProgressState = {
  profile: {
    name: 'Student Investigator',
    schoolOrLab: 'Independent / Local Lab',
    gradeLevel: 'High School',
  },
  investigations: {
    'lattice-coloring': {
      1: {
        status: 'exploring',
        notes: 'Explored 3x3 grids with 2 colors. Verified that 8 column patterns exist. Monochromatic rectangles can be avoided for 3x3, but what about 3x7?',
        conjecture: 'On a 3x7 grid with 2 colors, by Pigeonhole, monochromatic rectangles cannot be avoided.',
        lastUpdated: Date.now() - 3600000 * 2,
      },
      2: {
        status: 'not_started',
        notes: '',
        lastUpdated: 0,
      },
      3: {
        status: 'not_started',
        notes: '',
        lastUpdated: 0,
      },
      4: {
        status: 'not_started',
        notes: '',
        lastUpdated: 0,
      },
      5: {
        status: 'not_started',
        notes: '',
        lastUpdated: 0,
      },
    },
  },
  labs: {
    graphing: { status: 'completed', interactionCount: 4, lastInteractedAt: Date.now() - 86400000 },
    geometry: { status: 'in_progress', interactionCount: 2, lastInteractedAt: Date.now() - 43200000 },
    calculus: { status: 'in_progress', interactionCount: 3, lastInteractedAt: Date.now() - 21600000 },
    'linear-algebra': { status: 'not_started', interactionCount: 0, lastInteractedAt: 0 },
    probability: { status: 'not_started', interactionCount: 0, lastInteractedAt: 0 },
    discrete: { status: 'not_started', interactionCount: 0, lastInteractedAt: 0 },
  },
  conjectures: [
    {
      id: 'conj-1',
      investigationId: 'lattice-coloring',
      investigationTitle: 'The Chromatic Invariants of Integer Lattices',
      level: 1,
      text: 'For 3 rows and 2 colors, every column has at least one same-color row pair. Since there are 2 * C(3, 2) = 6 unique same-color row pairs, 7 columns must contain a duplicate pair, forcing an axis-aligned monochromatic rectangle.',
      timestamp: Date.now() - 3600000 * 2,
      tags: ['Pigeonhole', 'Invariants', 'Ramsey'],
    },
  ],
  latticeExperimentsRun: 12,
  lastActive: Date.now(),
};

export function getStudentProgress(): StudentProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_STATE,
        ...parsed,
        profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
        investigations: { ...DEFAULT_STATE.investigations, ...(parsed.investigations || {}) },
        labs: { ...DEFAULT_STATE.labs, ...(parsed.labs || {}) },
        conjectures: Array.isArray(parsed.conjectures) ? parsed.conjectures : DEFAULT_STATE.conjectures,
      };
    }
  } catch {
    // ignore
  }
  return DEFAULT_STATE;
}

export function saveStudentProgress(state: StudentProgressState): void {
  try {
    const toSave = {
      ...state,
      lastActive: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    window.dispatchEvent(new Event('math_lab_progress_updated'));
  } catch {
    // localStorage quota or private browsing
  }
}

export function updateStudentProfile(profile: Partial<StudentProfile>): StudentProgressState {
  const current = getStudentProgress();
  const updated: StudentProgressState = {
    ...current,
    profile: {
      ...current.profile,
      ...profile,
    },
  };
  saveStudentProgress(updated);
  return updated;
}

export function setInvestigationLevelStatus(
  investigationId: string,
  level: number,
  status: LevelStatus,
  notes?: string,
  conjecture?: string
): StudentProgressState {
  const current = getStudentProgress();
  const invLevels = current.investigations[investigationId] || {};
  const currentLevelRecord = invLevels[level] || {
    status: 'not_started',
    notes: '',
    lastUpdated: 0,
  };

  const updatedLevelRecord: LevelProgressRecord = {
    ...currentLevelRecord,
    status,
    notes: notes !== undefined ? notes : currentLevelRecord.notes,
    conjecture: conjecture !== undefined ? conjecture : currentLevelRecord.conjecture,
    lastUpdated: Date.now(),
  };

  const updated: StudentProgressState = {
    ...current,
    investigations: {
      ...current.investigations,
      [investigationId]: {
        ...invLevels,
        [level]: updatedLevelRecord,
      },
    },
  };

  saveStudentProgress(updated);
  return updated;
}

export function saveNewConjecture(
  investigationId: string,
  investigationTitle: string,
  level: number,
  text: string,
  tags: string[] = []
): StudentProgressState {
  const current = getStudentProgress();
  const newConj: SavedConjecture = {
    id: `conj-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    investigationId,
    investigationTitle,
    level,
    text,
    timestamp: Date.now(),
    tags,
  };

  const updated: StudentProgressState = {
    ...current,
    conjectures: [newConj, ...current.conjectures],
  };

  // Also update level record status if needed
  setInvestigationLevelStatus(investigationId, level, 'conjectured', undefined, text);

  saveStudentProgress(updated);
  return updated;
}

export function deleteConjecture(id: string): StudentProgressState {
  const current = getStudentProgress();
  const updated: StudentProgressState = {
    ...current,
    conjectures: current.conjectures.filter((c) => c.id !== id),
  };
  saveStudentProgress(updated);
  return updated;
}

export function recordLatticeExperiment(): void {
  const current = getStudentProgress();
  const updated: StudentProgressState = {
    ...current,
    latticeExperimentsRun: (current.latticeExperimentsRun || 0) + 1,
  };
  saveStudentProgress(updated);
}

export function setLabProgressStatus(
  labId: string,
  status: 'not_started' | 'in_progress' | 'completed'
): StudentProgressState {
  const current = getStudentProgress();
  const existing = current.labs[labId] || {
    status: 'not_started',
    interactionCount: 0,
    lastInteractedAt: 0,
  };

  const updated: StudentProgressState = {
    ...current,
    labs: {
      ...current.labs,
      [labId]: {
        ...existing,
        status,
        interactionCount: (existing.interactionCount || 0) + 1,
        lastInteractedAt: Date.now(),
      },
    },
  };

  saveStudentProgress(updated);
  return updated;
}

export interface OverallProgressStats {
  totalLevelsExplored: number;
  totalLevelsMastered: number;
  totalLabsCompleted: number;
  totalConjectures: number;
  totalLatticeExperiments: number;
  overallPercentage: number;
}

export function getOverallProgressStats(state: StudentProgressState): OverallProgressStats {
  let explored = 0;
  let mastered = 0;
  const totalPossibleLevels = 5; // October investigation 5 levels

  const inv = state.investigations['lattice-coloring'] || {};
  Object.values(inv).forEach((lvl) => {
    if (lvl.status === 'exploring' || lvl.status === 'conjectured' || lvl.status === 'mastered') {
      explored++;
    }
    if (lvl.status === 'mastered') {
      mastered++;
    }
  });

  const totalLabs = 6;
  let completedLabs = 0;
  Object.values(state.labs).forEach((l) => {
    if (l.status === 'completed') {
      completedLabs++;
    }
  });

  const milestonesMax = totalPossibleLevels + totalLabs;
  const milestonesDone = explored + completedLabs;
  const pct = Math.round((milestonesDone / milestonesMax) * 100);

  return {
    totalLevelsExplored: explored,
    totalLevelsMastered: mastered,
    totalLabsCompleted: completedLabs,
    totalConjectures: state.conjectures.length,
    totalLatticeExperiments: state.latticeExperimentsRun || 0,
    overallPercentage: Math.min(100, Math.max(0, pct)),
  };
}

export function exportProgressReport(state: StudentProgressState): string {
  const stats = getOverallProgressStats(state);
  return `# Math Lab — Student Research Portfolio
**Student:** ${state.profile.name}
**Affiliation:** ${state.profile.schoolOrLab} (${state.profile.gradeLevel})
**Date:** ${new Date().toLocaleDateString()}
**Overall Progress:** ${stats.overallPercentage}%

---

## 1. National Investigation Milestones
- Levels Explored: ${stats.totalLevelsExplored} of 5
- Levels Mastered: ${stats.totalLevelsMastered} of 5
- Interactive Lattice Experiments Run: ${stats.totalLatticeExperiments}

### Level Details:
${[1, 2, 3, 4, 5]
  .map((lvl) => {
    const rec = state.investigations['lattice-coloring']?.[lvl];
    const status = rec?.status || 'not_started';
    const notes = rec?.notes ? `\n  *Notes:* ${rec.notes}` : '';
    return `- Level ${lvl}: [${status.toUpperCase()}]${notes}`;
  })
  .join('\n')}

---

## 2. Formulated Conjectures (${state.conjectures.length})
${state.conjectures
  .map(
    (c, i) => `### ${i + 1}. Level ${c.level} Conjecture (${new Date(c.timestamp).toLocaleDateString()})
${c.text}
*Tags: ${c.tags?.join(', ') || 'None'}*`
  )
  .join('\n\n')}

---

## 3. Interactive Mathematics Laboratories
${Object.entries(state.labs)
  .map(([id, info]) => `- ${id.toUpperCase()}: ${info.status.toUpperCase()} (${info.interactionCount} sessions)`)
  .join('\n')}

---
*Math Lab — Explore mathematics. Investigate questions. Learn together.*
*mathlab.official12@gmail.com*
`;
}
