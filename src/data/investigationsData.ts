import { NationalInvestigation } from '../types';

export const NATIONAL_INVESTIGATIONS: NationalInvestigation[] = [
  {
    id: 'october-2026-grid-invariants',
    month: 'October',
    year: 2026,
    title: 'The Chromatic Invariants of Integer Lattices & Orthogonal Graphs',
    subtitle: 'From grid paths and forbidden monochromatic rectangles to algebraic area invariants',
    category: 'Discrete & Combinatorics',
    status: 'current',
    overview: 'In an m × n integer lattice grid, points are assigned colors according to specific local constraints. This investigation studies what structural configurations are inevitable regardless of color choices, leading into Ramsey theory on lattices and bivariate polynomial invariants.',
    theCoreQuestion: 'What is the minimum grid size (m × n) that guarantees the existence of a monochromatic rectangle whose sides are parallel to the grid axes, when each grid point is colored with one of c colors?',
    mathematicalFocus: [
      'Pigeonhole Principle & Ramsey Theory on Grids',
      'Forbidden Monochromatic Subgraphs',
      'Bivariate Generating Functions for Grid Walk Areas',
      'Polynomial Invariants under Lattice Shear Transformations'
    ],
    submissionDeadline: 'October 31, 2026',
    facilitatorTips: [
      'Encourage students to begin with physical graph paper or 3×3 and 4×4 pegboards using 2 colors.',
      'Have groups list all possible column colorings before trying to prove impossibility.',
      'Highlight how counting column pairs connects directly to combinatorial combinations C(m, 2).'
    ],
    levels: [
      {
        level: 1,
        title: 'Level 1: Concrete Observation & Pattern Discovery',
        subtitle: 'Hands-on experimentation with small lattices and two colors',
        prompt: 'On a 3 × 3 grid of points, try to color every point either Red or Blue such that NO four vertices forming an axis-aligned rectangle share the same color. Can you do it?',
        guidingQuestions: [
          'Can you find a 2-coloring of a 3×3 grid without any monochromatic rectangle?',
          'What happens if you expand the grid to 3×7? Try drawing several configurations.',
          'In each column of 3 points with 2 colors, how many points must share the same color by the Pigeonhole Principle?'
        ],
        sampleVisualOrData: 'Column types for 3 rows with {R, B}: RRR, RRB, RBR, BRR, BBR, BRB, RBB, BBB (8 possible 3-tuples).',
        hintOrExtension: 'Notice that with 3 rows and 2 colors, every single column has at least two points of the identical color.'
      },
      {
        level: 2,
        title: 'Level 2: Formulation of Conjectures & Invariants',
        subtitle: 'Formalizing the column-pair invariant and lower bounds',
        prompt: 'Formulate an invariant tracking the number of same-color vertical pairs across columns. How many columns are required in a 3-row grid before two columns must contain matching color pairs in the exact same row positions?',
        guidingQuestions: [
          'For 3 rows, there are C(3, 2) = 3 possible pairs of rows: {1,2}, {1,3}, and {2,3}. How many color options exist for each pair?',
          'If a column has 2 Red points, it claims one of these row pairs for Red.',
          'How many columns can you populate before the Pigeonhole Principle forces a duplicate pair?'
        ],
        hintOrExtension: 'Consider that each column has at least one monochromatic pair. With 2 colors and 3 row pairs, there are 2 × 3 = 6 possible color-pair assignments.'
      },
      {
        level: 3,
        title: 'Level 3: Systematic Generalization & Algebraic Formulation',
        subtitle: 'Deriving general bounds for r rows and c colors',
        prompt: 'Generalize your observation to an r × n grid with c colors. Express the minimum number of columns n(r, c) required to guarantee a monochromatic rectangle in terms of r and c.',
        guidingQuestions: [
          'By the Pigeonhole Principle, each column of r points with c colors contains at least ⌈r/c⌉ points of some color.',
          'How many monochromatic pairs are created within that column? (Use binomial coefficients C(k, 2)).',
          'Summing these pairs across n columns, at what value of n does the total number of monochromatic pairs exceed c · C(r, 2)?'
        ],
        hintOrExtension: 'Use Jensen’s inequality or convexity of C(x, 2) to establish the sharpest lower bound on pairs per column.'
      },
      {
        level: 4,
        title: 'Level 4: Rigorous Construction of Proofs & Boundary Cases',
        subtitle: 'Exact determination of small Ramsey grid numbers R_grid(2, c)',
        prompt: 'Prove rigorously that for c = 2 colors, the minimum grid guaranteed to contain a monochromatic rectangle is 3 × 7 or 4 × 4. Provide a valid 2-coloring of 3 × 6 (or 4 × 4 counterexample if applicable) that avoids monochromatic rectangles.',
        guidingQuestions: [
          'Construct a certified non-monochromatic 2-coloring matrix of size 3 × 6.',
          'Provide a combinatorial double-counting proof demonstrating that any 2-coloring of a 3 × 7 grid must contain at least one monochromatic rectangle.',
          'Investigate symmetry: Does a 5 × 5 grid colored with 2 colors always contain a monochromatic square?'
        ],
        hintOrExtension: 'Double count the set S = { ( {col1, col2}, {row1, row2} ) : both points share color k }.'
      },
      {
        level: 5,
        title: 'Level 5: Open Extensions, Unsolved Questions & Interdisciplinary Synthesis',
        subtitle: 'Higher dimensions, monochromatic equilateral triangles, and algebraic topology',
        prompt: 'Extend the problem into higher dimensions or alternative geometries. For instance: In a 3D lattice m × n × p colored with c colors, what guarantees a monochromatic rectangular prism? Or: Can you translate the grid coloring problem into a system of polynomial equations over finite fields and study its Hilbert Nullstellensatz certificate?',
        guidingQuestions: [
          'What happens when grid points are replaced by continuous torus coordinates R²/Z²?',
          'Can you formulate an algorithmic SAT solver or integer linear program to find maximal monochromatic-free grids for c = 3 and c = 4?',
          'What are the open problems regarding monochromatic equilateral triangles in hexagonal grids?'
        ],
        hintOrExtension: 'Look into the Erdős–Graham problem on grid colorings and van der Waerden-type theorems in multidimensional integer arrays.'
      }
    ]
  },
  {
    id: 'september-2026-circle-chords',
    month: 'September',
    year: 2026,
    title: 'Chords, Power of a Point, and Projective Invariants in Cyclic Quadrilaterals',
    subtitle: 'From intersecting secants and cross-ratios to the Poncelet Porism on confocal conics',
    category: 'Geometry & Invariants',
    status: 'archive',
    overview: 'When lines intersect a circle, products of lengths remain strictly invariant regardless of line angle. This investigation traces that simple geometry fact up through projective collineations, harmonic bundles, and the remarkable symmetries of cyclic polygons.',
    theCoreQuestion: 'How does the Power of a Point theorem generalize when circular boundaries undergo projective transformations, and what geometric invariants remain preserved?',
    mathematicalFocus: [
      'Power of a Point & Radical Axis Theorems',
      'Harmonic Conjugates & Cross-Ratios (A, B; C, D)',
      'Pole-Polar Duality with Respect to Inscribed Conics',
      'Simson Lines and Miquel Point Concurrency'
    ],
    submissionDeadline: 'September 30, 2026',
    facilitatorTips: [
      'Provide compasses and straightedges or use our built-in Geometry & Unit Circle laboratory.',
      'Ask students to measure products EA · EB and EC · ED with a ruler before revealing the theorem.'
    ],
    levels: [
      {
        level: 1,
        title: 'Level 1: Concrete Observation & Pattern Discovery',
        subtitle: 'Empirical verification with intersecting chords',
        prompt: 'Draw a circle and pick an interior point P. Draw three different chords AB, CD, and EF all passing through P. Measure the segment lengths with a ruler. Compute PA · PB, PC · PD, and PE · PF. What do you notice?',
        guidingQuestions: [
          'Do the products remain equal across all angles?',
          'What happens if P is placed outside the circle with secant lines PAB and PCD?',
          'What happens if one of the lines is tangent to the circle at point T?'
        ]
      },
      {
        level: 2,
        title: 'Level 2: Formulation of Conjectures & Invariants',
        subtitle: 'Similar triangles and the algebraic invariant d² - r²',
        prompt: 'Connect AC and BD for two intersecting chords AB and CD through P. Prove that triangles PAC and PDB are similar. Use this to prove PA · PB = PC · PD.',
        guidingQuestions: [
          'Why are angles ∠PAC and ∠PDB equal? (Inscribed angle subtending the same arc).',
          'If the center of the circle is O with radius r, and the distance OP = d, what is the exact algebraic value of the product PA · PB?'
        ]
      },
      {
        level: 3,
        title: 'Level 3: Systematic Generalization & Algebraic Formulation',
        subtitle: 'The Radical Axis and Radical Center of multiple circles',
        prompt: 'Given two non-concentric circles C1 and C2, investigate the locus of all points P whose power with respect to C1 equals its power with respect to C2.',
        guidingQuestions: [
          'Write down Cartesian equations (x - x1)² + (y - y1)² - r1² = (x - x2)² + (y - y2)² - r2².',
          'Notice how the quadratic terms cancel out! What kind of geometric object does this linear equation describe?',
          'What is the radical center of three mutually intersecting circles?'
        ]
      },
      {
        level: 4,
        title: 'Level 4: Rigorous Construction of Proofs & Boundary Cases',
        subtitle: 'Projective cross-ratios and pole-polar duality',
        prompt: 'Define the cross-ratio (A, B; C, D) for four collinear points. Prove that central projection from a point on the circle onto a line preserves cross-ratios.',
        guidingQuestions: [
          'Show that the power of a point is an affine artifact of the projective Cayley-Klein metric.',
          'Demonstrate how Pascal’s Mystic Hexagram theorem can be proved using cross-ratios.'
        ]
      },
      {
        level: 5,
        title: 'Level 5: Open Extensions, Unsolved Questions & Interdisciplinary Synthesis',
        subtitle: 'Poncelet porisms and elliptic curve additions',
        prompt: 'Investigate Poncelet’s Porism: If an n-sided polygon is inscribed in conic C1 and circumscribed about conic C2, then any point on C1 begins a closed n-sided polygon.',
        guidingQuestions: [
          'How does Poncelet’s Porism relate to the group law on elliptic curves?',
          'Can you formulate an interactive computational model demonstrating Poncelet triangles between non-concentric ellipses?'
        ]
      }
    ]
  },
  {
    id: 'august-2026-integer-partitions',
    month: 'August',
    year: 2026,
    title: 'Partition Functions, Ferrers Diagrams & Ramanujan Congruences',
    subtitle: 'Exploring the combinatorial ways an integer breaks into positive sums',
    category: 'Number Theory & Algebra',
    status: 'archive',
    overview: 'The partition function p(n) counts the number of distinct ways to express n as a sum of positive integers. Despite its simple definition, p(n) harbors deep algebraic structures, modular forms, and Euler’s Pentagonal Number Theorem.',
    theCoreQuestion: 'How can visual Ferrers diagrams and generating functions reveal surprising identities between partitions with restricted parts?',
    mathematicalFocus: [
      'Ferrers and Young Tableaux Conjugacy',
      'Euler’s Pentagonal Number Theorem & Involutions',
      'Partitions with Odd Parts vs Partitions with Distinct Parts (Euler’s Theorem)',
      'Ramanujan’s Modulo 5, 7, and 11 Congruences'
    ],
    submissionDeadline: 'August 31, 2026',
    facilitatorTips: [
      'Have students use coins, glass beads, or square tiles to represent partitions of 4, 5, and 6.',
      'Show how flipping a Ferrers diagram across the main diagonal proves a 1-to-1 bijection.'
    ],
    levels: [
      {
        level: 1,
        title: 'Level 1: Concrete Observation & Pattern Discovery',
        subtitle: 'Counting partitions of small integers by hand',
        prompt: 'List all partitions of integers n = 1, 2, 3, 4, 5, and 6. For example, for n = 4: 4, 3+1, 2+2, 2+1+1, 1+1+1+1 (so p(4) = 5). Compute p(n) for n up to 8.',
        guidingQuestions: [
          'Is p(n) always increasing? How rapidly does it grow compared to 2ⁿ?',
          'For n = 5, list partitions into ODD parts: (5, 3+1+1, 1+1+1+1+1) -> 3 partitions.',
          'Now list partitions of n = 5 into DISTINCT parts: (5, 4+1, 3+2) -> 3 partitions! Do you get the same count for n = 6?'
        ]
      },
      {
        level: 2,
        title: 'Level 2: Formulation of Conjectures & Invariants',
        subtitle: 'Conjugate partitions and Ferrers diagrams',
        prompt: 'Draw a Ferrers diagram of dots for a partition. Flip the diagram across its diagonal. Prove that the number of partitions of n with at most k parts equals the number of partitions of n whose largest part is at most k.',
        guidingQuestions: [
          'Why does transposition preserve the total number of dots n?',
          'What corresponds to the number of rows? What corresponds to the number of columns?'
        ]
      },
      {
        level: 3,
        title: 'Level 3: Systematic Generalization & Algebraic Formulation',
        subtitle: 'Generating functions and Euler’s product formula',
        prompt: 'Show that the generating function for p(n) is the infinite product ∏_{k=1}^∞ (1 / (1 - xᵏ)). Multiply the first few terms by hand to verify the coefficients of x⁰ through x⁵.',
        guidingQuestions: [
          'How does each term 1/(1 - xᵏ) = 1 + xᵏ + x²ᵏ + ... correspond to choosing how many parts of size k to include?',
          'Prove Euler’s theorem: The number of partitions into odd parts equals the number of partitions into distinct parts using generating functions.'
        ]
      },
      {
        level: 4,
        title: 'Level 4: Rigorous Construction of Proofs & Boundary Cases',
        subtitle: 'Franklin’s combinatorial proof of Euler’s Pentagonal Theorem',
        prompt: 'Investigate Euler’s pentagonal recurrence: p(n) = p(n-1) + p(n-2) - p(n-5) - p(n-7) + ... where indices are generalized pentagonal numbers (3k² ± k)/2.',
        guidingQuestions: [
          'Study Franklin’s geometric bijection between Ferrers diagrams with an even number of distinct parts and those with an odd number of distinct parts.',
          'Identify the exact two exceptional families where the bijection fails.'
        ]
      },
      {
        level: 5,
        title: 'Level 5: Open Extensions, Unsolved Questions & Interdisciplinary Synthesis',
        subtitle: 'Ramanujan congruences and modular forms',
        prompt: 'Ramanujan observed p(5k + 4) ≡ 0 (mod 5), p(7k + 5) ≡ 0 (mod 7), and p(11k + 6) ≡ 0 (mod 11). Investigate Dyson’s rank and Andrews-Garvan crank that explain these symmetries combinatorially.',
        guidingQuestions: [
          'Can you write a script to test whether p(13k + a) is ever congruent to 0 mod 13 for all k?',
          'Explore modern work by Ken Ono on partition congruences for all prime moduli.'
        ]
      }
    ]
  }
];

export const FIVE_LEVELS_OVERVIEW = [
  {
    level: 1,
    title: 'Concrete Observation',
    subtitle: 'Hands-on exploration, computation & patterns',
    description: 'Students start with concrete numbers, physical diagrams, small grids, and hands-on experiments. The goal is to notice what happens, identify patterns, and build genuine tactile familiarity before formal abstraction.',
    iconName: 'Eye',
    color: 'from-amber-500 to-orange-500',
    tag: 'Start Here • Hands-On'
  },
  {
    level: 2,
    title: 'Conjectures & Invariants',
    subtitle: 'Formulating hypotheses & spotting what stays constant',
    description: 'Move from observation to questioning: What properties remain invariant when coordinates shift or parameters change? Students articulate formal conjectures in their own words and test for potential counterexamples.',
    iconName: 'Target',
    color: 'from-sky-500 to-blue-600',
    tag: 'Hypothesis & Invariants'
  },
  {
    level: 3,
    title: 'Algebraic Generalization',
    subtitle: 'Symbolic notation & scalable equations',
    description: 'Transform specific numbers into variables and general parameters (n, k, x, y). Students construct equations, recursive formulas, or generating functions that predict the behavior of entire families of mathematical objects.',
    iconName: 'Cpu',
    color: 'from-purple-500 to-indigo-600',
    tag: 'Formula & Generalization'
  },
  {
    level: 4,
    title: 'Rigorous Proof',
    subtitle: 'Constructing deductive arguments & boundary cases',
    description: 'Why must the pattern always hold? Students assemble deductive chains, double-counting arguments, induction proofs, invariants, or geometric transformations to verify their claims with mathematical certainty.',
    iconName: 'ShieldCheck',
    color: 'from-emerald-500 to-teal-600',
    tag: 'Deduction & Rigor'
  },
  {
    level: 5,
    title: 'Open Extensions & Synthesis',
    subtitle: 'Unsolved horizons, higher dimensions & modern research',
    description: 'Push beyond the original question into higher dimensions, related unsolved problems, computer simulations, and connections to fields like topology, physics, or algorithmic computer science.',
    iconName: 'Compass',
    color: 'from-rose-500 to-pink-600',
    tag: 'Open Horizons & Research'
  }
];
