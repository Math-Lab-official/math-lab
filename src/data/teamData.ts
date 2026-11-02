export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface Committee {
  id: string;
  name: string;
  lead?: string;
  description: string;
  responsibilities: string[];
  skillsLookedFor: string[];
  icon: string;
}

export const STAFF_APPLICATION_URL = 'https://docs.google.com/forms/d/1q29msbUvQDFc1DOiQpF2hKQyM1smlK-mhGMi1dViU-Y/edit';
export const OFFICIAL_EMAIL = 'mathlab.official12@gmail.com';
export const INSTAGRAM_HANDLE = '@mathlabofficial_';
export const INSTAGRAM_URL = 'https://www.instagram.com/mathlabofficial_/';

export const EXEC_MEMBERS: TeamMember[] = [
  { id: 'emily-bu', name: 'Emily Bu', role: 'Founder & Executive Director' },
  { id: 'sahanaa-rao', name: 'Sahanaa Rao', role: 'Vice President' },
  { id: 'hemanth-parvathaneni', name: 'Hemanth Parvathaneni', role: 'Director of Programs' },
  { id: 'matthew-baek', name: 'Matthew Baek', role: 'Director of National Development' },
  { id: 'shrouya-sharan', name: 'Shrouya Sharan', role: 'Tech Lead' },
  { id: 'piyush-kolekar', name: 'Piyush Kolekar', role: 'Research & Evaluation Lead' },
  { id: 'hiba-naz', name: 'Hiba Naz', role: 'Director of Outreach & Communications' },
  { id: 'folarera-kassim', name: 'Folarera Kassim', role: 'Curriculum Manager & Webmaster' },
];

export const STAFF_MEMBERS: TeamMember[] = [
  { id: 'ahzam-rasool', name: 'Ahzam Rasool', role: 'Mathematical Investigations & Curriculum Committee' },
  { id: 'srishti-raj', name: 'Srishti Raj', role: 'Mathematical Investigations & Curriculum Committee' },
];

export const COMMITTEES: Committee[] = [
  {
    id: 'investigations-curriculum',
    name: 'Mathematical Investigations & Curriculum',
    lead: 'Folarera Kassim (Curriculum Manager)',
    description: 'Designs and calibrates each monthly National Investigation across five progressive depth levels.',
    responsibilities: [
      'Author monthly investigation questions and 5-tier depth scaffolding',
      'Create exploratory problem sets and guiding questions',
      'Ensure accessibility across diverse student mathematical backgrounds'
    ],
    skillsLookedFor: ['Proof writing', 'Curriculum design', 'Mathematical inquiry'],
    icon: 'Layers'
  },
  {
    id: 'solutions-review',
    name: 'Solutions Review & Student Scholarship',
    description: 'Reads, analyzes, and synthesizes monthly student submissions from around the world.',
    responsibilities: [
      'Review student submissions for mathematical validity and creative insights',
      'Identify unique proofs, counterexamples, and unexpected conjectures'
    ],
    skillsLookedFor: ['Mathematical critique', 'Clear written communication', 'Proof verification'],
    icon: 'FileCheck'
  },
  {
    id: 'outreach-communications',
    name: 'Outreach & Communications',
    lead: 'Hiba Naz (Director of Outreach)',
    description: 'Connects Math Lab with student communities, schools, libraries, and educators globally.',
    responsibilities: [
      'Manage official outreach and social media channels',
      'Engage with student participants and educators'
    ],
    skillsLookedFor: ['Community outreach', 'Design', 'Communication'],
    icon: 'Share2'
  },
  {
    id: 'research-impact',
    name: 'Research & Evaluation',
    lead: 'Piyush Kolekar (Research & Evaluation Lead)',
    description: 'Evaluates pedagogical methodologies, inquiry outcomes, and collaborative problem-solving patterns.',
    responsibilities: [
      'Analyze student learning feedback and chapter engagement metrics'
    ],
    skillsLookedFor: ['Data analysis', 'Educational research'],
    icon: 'BarChart3'
  },
  {
    id: 'tech-digital',
    name: 'Technology & Web Infrastructure',
    lead: 'Shrouya Sharan (Tech Lead)',
    description: 'Builds and maintains Math Lab web platforms and interactive browser-based simulation studios.',
    responsibilities: [
      'Develop interactive mathematical visualizers and collaborative tools'
    ],
    skillsLookedFor: ['TypeScript / React', 'Canvas & WebGL', 'Web performance'],
    icon: 'Terminal'
  }
];
