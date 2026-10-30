export interface ExecMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  focusArea: string;
  imageSrc?: string;
  github?: string;
  imagePlaceholderColor?: string;
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

export const EXEC_MEMBERS: ExecMember[] = [
  {
    id: 'emily-bu',
    name: 'Emily Bu',
    role: 'Founder & Executive Director',
    bio: 'Leads overall strategic vision, national partnerships, and community laboratory coordination. Passionate about empowering students to experience mathematics as an investigative, collaborative science.',
    focusArea: 'Initiative Leadership & Community Lab Development',
    imagePlaceholderColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'folarera-kassim',
    name: 'Folarera Kassim',
    role: 'Curriculum Manager & Website Creator',
    bio: 'Architect of Math Lab’s five-tier inquiry curriculum framework and creator of the official web platform. Leads the design of multi-level mathematical investigations and develops accessible digital infrastructure for learners and local facilitators.',
    focusArea: 'Curriculum Architecture & Web Platform Engineering',
    imagePlaceholderColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'shourya-sharan',
    name: 'Shourya Sharan',
    role: 'Technical Lead & Website Creator',
    bio: 'Leads digital systems engineering, web architecture, and interactive mathematical tool development. Spearheads the development and deployment of the official Math Lab web platform and digital infrastructure.',
    focusArea: 'Web Architecture & Technical Systems Leadership',
    imagePlaceholderColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'director-local-labs',
    name: 'Executive Board Member',
    role: 'Director of Local Lab Networks',
    bio: 'Coordinates facilitator onboarding, community center and library partnerships, and chapter support materials for student-led local investigation hubs.',
    focusArea: 'Local Chapter Expansion & Facilitator Support',
    imagePlaceholderColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'director-review',
    name: 'Executive Board Member',
    role: 'Director of Solutions Review & Scholarship',
    bio: 'Oversees student submission synthesis, highlighting creative student proofs, novel conjectures, and coordinating peer commentary for the monthly digest.',
    focusArea: 'Student Submissions & Mathematical Review',
    imagePlaceholderColor: 'from-purple-600 to-pink-700'
  }
];

export const COMMITTEES: Committee[] = [
  {
    id: 'investigations-curriculum',
    name: 'Mathematical Investigations & Curriculum',
    lead: 'Folarera Kassim (Curriculum Manager)',
    description: 'Designs and calibrates each monthly National Investigation, crafting the multi-level progression from elementary tactile patterns up to open mathematical questions.',
    responsibilities: [
      'Author monthly investigation questions and 5-tier depth scaffolding',
      'Create visual diagrams, coordinate grids, and exploratory problem sets',
      'Develop facilitator session guides and pedagogical hint sequences',
      'Ensure accessibility across diverse student mathematical backgrounds'
    ],
    skillsLookedFor: ['Proof writing', 'Olympiad / Contest Math (AMC/AIME/USAMO)', 'Curriculum design', 'LaTeX / TikZ typesetting'],
    icon: 'Layers'
  },
  {
    id: 'solutions-review',
    name: 'Solutions Review & Student Scholarship',
    description: 'Reads, analyzes, and synthesizes monthly student submissions from Local Labs and independent participants worldwide, celebrating novel approaches.',
    responsibilities: [
      'Review student submissions for mathematical validity and creative insights',
      'Identify unique proofs, counterexamples, and unexpected conjectures',
      'Draft constructive, encouraging feedback letters for participating students',
      'Compile the monthly National Synthesis digest showcasing student contributions'
    ],
    skillsLookedFor: ['Mathematical critique', 'Clear written communication', 'Peer mentoring', 'Proof verification'],
    icon: 'FileCheck'
  },
  {
    id: 'outreach-communications',
    name: 'Outreach & Communications',
    description: 'Expands the Math Lab community by connecting with schools, libraries, teachers, student math clubs, and community education centers.',
    responsibilities: [
      'Communicate with prospective Local Lab organizers and venue coordinators',
      'Manage official communications via email and Instagram (@mathlabofficial_)',
      'Produce visual flyers, announcement graphics, and informational newsletters',
      'Coordinate participant onboarding and community Q&A sessions'
    ],
    skillsLookedFor: ['Community organizing', 'Digital design & copywriting', 'Social media management', 'Educator correspondence'],
    icon: 'Share2'
  },
  {
    id: 'research-impact',
    name: 'Research & Impact',
    description: 'Conducts systematic study into how students engage with collaborative mathematics, examining misconceptions, problem-solving strategies, and pedagogy.',
    responsibilities: [
      'Formulate research questions with measurable outcomes and ethical safeguards',
      'Collect and analyze anonymous qualitative data on student reasoning growth',
      'Evaluate which investigation prompts stimulate the deepest student discourse',
      'Publish open findings on collaborative mathematics education'
    ],
    skillsLookedFor: ['Educational psychology', 'Qualitative & quantitative research', 'Data analysis', 'Academic writing'],
    icon: 'BarChart3'
  },
  {
    id: 'tech-digital',
    name: 'Technology & Digital Development and Communications',
    lead: 'Shourya Sharan (Technical Lead)',
    description: 'Builds, maintains, and advances the digital infrastructure of Math Lab, including interactive visualization tools, submission workflows, and web platforms.',
    responsibilities: [
      'Maintain and expand the official Math Lab web platform and interactive tools',
      'Implement accessible interactive visualizers (graphing, geometry, lattices)',
      'Manage form submission routing and data security in compliance with student privacy',
      'Ensure high mobile responsiveness, accessibility, and fast global loading'
    ],
    skillsLookedFor: ['TypeScript & React / Next.js', 'Canvas & WebGL visualization', 'UI/UX accessibility', 'Form automation'],
    icon: 'Terminal'
  }
];
