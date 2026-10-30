export type LabTab = 
  | 'overview'
  | 'investigations'
  | 'share-work'
  | 'local-labs'
  | 'team'
  | 'about'
  | 'events'
  | 'laboratories'
  | 'education'
  | 'graphing'
  | 'geometry'
  | 'calculus'
  | 'linear-algebra'
  | 'probability'
  | 'discrete'
  | 'formulas'
  | 'challenges'
  | 'notebook';

export interface InvestigationDepthLevel {
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  prompt: string;
  guidingQuestions: string[];
  sampleVisualOrData?: string;
  hintOrExtension?: string;
}

export interface NationalInvestigation {
  id: string;
  month: string;
  year: number;
  title: string;
  subtitle: string;
  category: 'Discrete & Combinatorics' | 'Geometry & Invariants' | 'Number Theory & Algebra' | 'Analysis & Calculus';
  status: 'current' | 'archive';
  overview: string;
  theCoreQuestion: string;
  mathematicalFocus: string[];
  levels: InvestigationDepthLevel[];
  facilitatorTips: string[];
  submissionDeadline?: string;
}

export interface StudentSubmission {
  id: string;
  studentNameOrTeam: string;
  email: string;
  gradeLevel: string;
  schoolOrLocalLab: string;
  investigationId: string;
  levelAddressed: number;
  title: string;
  summaryOfApproach: string;
  conjecturesOrProofs: string;
  externalDocumentUrl?: string;
  allowPublicDisplayWithPermission: boolean;
  submittedAt: number;
}

export interface LocalLabInquiry {
  organizerName: string;
  email: string;
  role: 'student' | 'educator' | 'parent' | 'community_member';
  organizationOrVenue: string;
  cityState: string;
  meetingFrequency: string;
  approximateAttendees: string;
  requestedMaterials: string[];
  additionalNotes: string;
}

export type PartnerVenueType = 'high-school' | 'university' | 'public-library' | 'community-center';
export type ChapterStatus = 'active' | 'founding' | 'launching_soon';

export interface LocalLabChapter {
  id: string;
  name: string;
  city: string;
  stateOrRegion: string;
  country: string;
  venueName: string;
  venueType: PartnerVenueType;
  status: ChapterStatus;
  meetingSchedule: string;
  meetingFrequency: string;
  leadFacilitator: string;
  facilitatorRole: string;
  contactEmail: string;
  activeFocus: string;
  memberCount: number;
  establishedDate: string;
  partnerAffiliation?: string;
  lat: number;
  lng: number;
  highlightNotes?: string;
  acceptingVisitors: boolean;
  websiteOrPage?: string;
}

export interface FormulaItem {
  id: string;
  name: string;
  category: 'Algebra' | 'Geometry' | 'Trigonometry' | 'Calculus' | 'Linear Algebra' | 'Statistics & Probability' | 'Discrete Math';
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
  labLink?: LabTab;
}

export interface MathChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Elementary' | 'Intermediate' | 'Advanced';
  question: string;
  latex?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export interface NotebookEntry {
  id: string;
  title: string;
  content: string;
  expression?: string;
  evaluatedResult?: string;
  timestamp: number;
  category: string;
}

export type LabProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface LabProgressRecord {
  labId: LabTab;
  status: LabProgressStatus;
  lastInteractedAt: number;
  completedAt?: number;
  interactionCount: number;
}

export type UserProgressMap = Record<string, LabProgressRecord>;
