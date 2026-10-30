import { LabTab } from '../types';

export interface LabCertificateInfo {
  id: LabTab | 'all';
  title: string;
  shortTitle: string;
  category: string;
  competencies: string[];
  fieldOfStudy: string;
}

export type SimulationLabId = 'graphing' | 'geometry' | 'calculus' | 'linear-algebra' | 'probability' | 'discrete';

export const LAB_CERTIFICATES: Record<SimulationLabId | 'all', LabCertificateInfo> = {
  graphing: {
    id: 'graphing',
    title: 'Function Analysis & Graphing Studio',
    shortTitle: 'Function Studio',
    category: 'Analysis & Real Functions',
    fieldOfStudy: 'Cartesian Dynamics & Differential Analysis',
    competencies: [
      'Continuous 2D Cartesian function plotting & dynamic domain evaluation',
      'Instantaneous numerical derivatives f\'(x) via symmetric difference quotients',
      'Point-slope tangent line reconstruction & dynamic tangent visualizer',
      'Numerical definite integration & real-time Riemann bounded area calculation',
    ],
  },
  geometry: {
    id: 'geometry',
    title: 'Geometry & Unit Circle Studio',
    shortTitle: 'Geometry Studio',
    category: 'Trigonometry & Euclidean Invariants',
    fieldOfStudy: 'Contest Geometry & Orthogonal Projections',
    competencies: [
      'Continuous radian-degree angle synchronization & circular coordinate systems',
      'Orthogonal trigonometric projections: sin θ, cos θ, and tangent secant asymptotes',
      'Exact fraction trigonometric angle snaps (π/6, π/4, π/3, 2π/3, 5π/6)',
      'Law of Cosines invariant solving for general SSS non-right triangles',
    ],
  },
  calculus: {
    id: 'calculus',
    title: 'Calculus & Riemann Sandbox',
    shortTitle: 'Calculus Sandbox',
    category: 'Integral Calculus & Real Analysis',
    fieldOfStudy: 'Approximation Convergence & Infinite Series',
    competencies: [
      'Riemann partition convergence across Left, Right, Midpoint, and Trapezoidal rules',
      'Partition scaling analysis (N=2 to N=100) and delta error convergence to exact integrals',
      'Taylor series polynomial expansions up to degree 11 for transcendental functions',
      'Geometric intuition for the Fundamental Theorem of Calculus',
    ],
  },
  'linear-algebra': {
    id: 'linear-algebra',
    title: 'Linear Algebra Grid Studio',
    shortTitle: 'Linear Algebra',
    category: 'Linear Spaces & Matrix Transformations',
    fieldOfStudy: 'Spatial Coordinate Transformations & Eigen-theory',
    competencies: [
      '2x2 matrix spatial transformation mechanics & coordinate grid deformation',
      'Basis vector manipulation (î and ĵ) under shear, rotation, and reflection',
      'Determinant signed area geometry & orientation inversion detection',
      'Eigenvector invariant axes identification and eigenvalue scaling intuition',
    ],
  },
  probability: {
    id: 'probability',
    title: 'Statistics & Probability Lab',
    shortTitle: 'Probability Lab',
    category: 'Stochastic Models & Inferential Statistics',
    fieldOfStudy: 'Continuous Distributions & Monte Carlo Simulation',
    competencies: [
      'Continuous Gaussian normal distributions with dynamic mean (μ) and variance (σ²)',
      'Empirical Rule interval evaluation (68% - 95% - 99.7%) and Z-score boundaries',
      'Discrete Binomial probability mass functions (PMF) and cumulative distributions',
      'Buffon\'s needle continuous Monte Carlo geometric estimation of the constant π',
    ],
  },
  discrete: {
    id: 'discrete',
    title: 'Number Theory & Discrete Math',
    shortTitle: 'Discrete Math',
    category: 'Discrete Structures & Number Theory',
    fieldOfStudy: 'Algorithmic Arithmetic & Modular Ring Theory',
    competencies: [
      'Sieve of Eratosthenes composite number elimination & prime density analysis',
      'Step-by-step Euclidean algorithm GCD traces with quotients and remainders',
      'Modular arithmetic dial clocks for cyclic residue classes (ℤ/nℤ)',
      'Pascal\'s triangle binomial coefficients & combinatorial invariants',
    ],
  },
  all: {
    id: 'all',
    title: 'Full Mathematical Simulation Suite Mastery',
    shortTitle: 'Grand Mastery',
    category: 'Comprehensive Collegiate & Olympiad Mathematics',
    fieldOfStudy: 'Unified Theoretical & Applied Mathematics',
    competencies: [
      'Mastery across all 6 specialized laboratories (Calculus, Geometry, Linear Algebra, Probability, Discrete Math, Graphing)',
      'Demonstrated tactile understanding of invariant structures, transformations, and limit processes',
      'Empirical computational verification of analytical mathematical conjectures',
      'Exemplary participation in the Math Lab student-centered collaborative initiative',
    ],
  },
};
