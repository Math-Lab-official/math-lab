import { FormulaItem } from '../types';

export const FORMULA_DATABASE: FormulaItem[] = [
  // Algebra
  {
    id: 'quad-formula',
    name: 'Quadratic Formula',
    category: 'Algebra',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    description: 'Solves second-degree polynomial equations ax² + bx + c = 0.',
    variables: [
      { symbol: 'a', meaning: 'Quadratic coefficient (a ≠ 0)' },
      { symbol: 'b', meaning: 'Linear coefficient' },
      { symbol: 'c', meaning: 'Constant term' },
      { symbol: 'Δ', meaning: 'Discriminant: b² - 4ac' },
    ],
    labLink: 'graphing',
  },
  {
    id: 'exp-laws',
    name: 'Euler\'s Identity',
    category: 'Algebra',
    latex: 'e^{i\\pi} + 1 = 0',
    description: 'Connects five fundamental mathematical constants: e, i, π, 1, and 0 in a single profound equation.',
    variables: [
      { symbol: 'e', meaning: 'Base of natural logarithm (≈ 2.71828)' },
      { symbol: 'i', meaning: 'Imaginary unit (i² = -1)' },
      { symbol: 'π', meaning: 'Ratio of circumference to diameter (≈ 3.14159)' },
    ],
    labLink: 'geometry',
  },
  {
    id: 'binomial-theorem',
    name: 'Binomial Theorem',
    category: 'Algebra',
    latex: '(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k',
    description: 'Expands powers of a binomial expression into a sum of polynomial terms with binomial coefficients.',
    variables: [
      { symbol: 'n', meaning: 'Non-negative integer power' },
      { symbol: 'k', meaning: 'Summation index (0 to n)' },
      { symbol: 'C(n,k)', meaning: 'Binomial coefficient: n! / (k!(n-k)!)' },
    ],
    labLink: 'discrete',
  },

  // Geometry & Trigonometry
  {
    id: 'pythagoras',
    name: 'Pythagorean Theorem',
    category: 'Geometry',
    latex: 'a^2 + b^2 = c^2',
    description: 'In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.',
    variables: [
      { symbol: 'a, b', meaning: 'Legs perpendicular to each other' },
      { symbol: 'c', meaning: 'Hypotenuse (opposite 90° angle)' },
    ],
    labLink: 'geometry',
  },
  {
    id: 'heron',
    name: 'Heron\'s Formula for Triangle Area',
    category: 'Geometry',
    latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad s = \\frac{a+b+c}{2}',
    description: 'Calculates the area of any triangle given solely the lengths of its three sides.',
    variables: [
      { symbol: 'a, b, c', meaning: 'Lengths of triangle sides' },
      { symbol: 's', meaning: 'Semi-perimeter of the triangle' },
      { symbol: 'A', meaning: 'Calculated area' },
    ],
    labLink: 'geometry',
  },
  {
    id: 'pythagorean-trig',
    name: 'Fundamental Trigonometric Identity',
    category: 'Trigonometry',
    latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1',
    description: 'Direct consequence of the Pythagorean theorem on the unit circle of radius 1.',
    variables: [
      { symbol: 'θ', meaning: 'Angle in radians or degrees' },
      { symbol: 'sin(θ)', meaning: 'y-coordinate on unit circle' },
      { symbol: 'cos(θ)', meaning: 'x-coordinate on unit circle' },
    ],
    labLink: 'geometry',
  },
  {
    id: 'law-of-cosines',
    name: 'Law of Cosines',
    category: 'Trigonometry',
    latex: 'c^2 = a^2 + b^2 - 2ab \\cos(C)',
    description: 'Generalizes the Pythagorean theorem to any arbitrary triangle.',
    variables: [
      { symbol: 'a, b, c', meaning: 'Sides of the triangle' },
      { symbol: 'C', meaning: 'Angle opposite to side c' },
    ],
    labLink: 'geometry',
  },

  // Calculus
  {
    id: 'derivative-def',
    name: 'Definition of the Derivative',
    category: 'Calculus',
    latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
    description: 'The instantaneous rate of change and slope of the tangent line to f(x) at x.',
    variables: [
      { symbol: 'f\'(x)', meaning: 'Derivative of function f at x' },
      { symbol: 'h', meaning: 'Infinitesimal step increment' },
    ],
    labLink: 'graphing',
  },
  {
    id: 'ftc',
    name: 'Fundamental Theorem of Calculus',
    category: 'Calculus',
    latex: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)',
    description: 'Bridges differentiation and integration: definite integral equals difference of antiderivative values.',
    variables: [
      { symbol: 'f(x)', meaning: 'Continuous integrand' },
      { symbol: 'F(x)', meaning: 'Antiderivative where F\'(x) = f(x)' },
      { symbol: '[a,b]', meaning: 'Interval of integration' },
    ],
    labLink: 'calculus',
  },
  {
    id: 'riemann-sum',
    name: 'Riemann Sum Approximation',
    category: 'Calculus',
    latex: '\\int_{a}^{b} f(x)\\,dx \\approx \\sum_{i=1}^{n} f(x_i^*) \\Delta x, \\quad \\Delta x = \\frac{b-a}{n}',
    description: 'Approximates the area under a curve through summation of rectangular partitions.',
    variables: [
      { symbol: 'n', meaning: 'Number of subintervals' },
      { symbol: 'Δx', meaning: 'Width of each slice: (b-a)/n' },
      { symbol: 'x_i^*', meaning: 'Sample evaluation point in interval i' },
    ],
    labLink: 'calculus',
  },
  {
    id: 'taylor-series',
    name: 'Taylor Series Expansion',
    category: 'Calculus',
    latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n',
    description: 'Represents a smooth infinitely differentiable function as an infinite power series around a.',
    variables: [
      { symbol: 'f^(n)(a)', meaning: 'n-th order derivative evaluated at a' },
      { symbol: 'n!', meaning: 'n factorial' },
      { symbol: 'a', meaning: 'Center point of expansion (Maclaurin when a=0)' },
    ],
    labLink: 'calculus',
  },

  // Linear Algebra
  {
    id: 'matrix-det-2x2',
    name: '2x2 Matrix Determinant',
    category: 'Linear Algebra',
    latex: '\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc',
    description: 'Measures the scaling factor of area under the linear transformation, with sign indicating orientation.',
    variables: [
      { symbol: 'a, b, c, d', meaning: 'Entries of the transformation matrix' },
      { symbol: 'det(A)', meaning: 'Area scale factor (>0 preserves, <0 flips)' },
    ],
    labLink: 'linear-algebra',
  },
  {
    id: 'eigen-equation',
    name: 'Eigenvalue Equation',
    category: 'Linear Algebra',
    latex: 'A\\mathbf{v} = \\lambda \\mathbf{v} \\iff \\det(A - \\lambda I) = 0',
    description: 'Vectors whose direction remains invariant under transformation A, scaled only by factor λ.',
    variables: [
      { symbol: 'A', meaning: 'Square matrix transformation' },
      { symbol: 'v', meaning: 'Non-zero eigenvector' },
      { symbol: 'λ', meaning: 'Scalar eigenvalue' },
      { symbol: 'I', meaning: 'Identity matrix' },
    ],
    labLink: 'linear-algebra',
  },

  // Statistics & Probability
  {
    id: 'normal-pdf',
    name: 'Normal (Gaussian) Distribution PDF',
    category: 'Statistics & Probability',
    latex: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}',
    description: 'The ubiquitous bell curve characterizing continuous random variables governed by the Central Limit Theorem.',
    variables: [
      { symbol: 'μ', meaning: 'Mean / expected center of the distribution' },
      { symbol: 'σ', meaning: 'Standard deviation (spread)' },
      { symbol: 'σ²', meaning: 'Variance' },
    ],
    labLink: 'probability',
  },
  {
    id: 'bayes-theorem',
    name: 'Bayes\' Theorem',
    category: 'Statistics & Probability',
    latex: 'P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}',
    description: 'Calculates conditional posterior probability of event A given evidence B.',
    variables: [
      { symbol: 'P(A|B)', meaning: 'Posterior probability of A given B' },
      { symbol: 'P(B|A)', meaning: 'Likelihood of B occurring if A is true' },
      { symbol: 'P(A)', meaning: 'Prior probability of hypothesis A' },
      { symbol: 'P(B)', meaning: 'Marginal probability of evidence B' },
    ],
    labLink: 'probability',
  },

  // Discrete Math
  {
    id: 'euclidean-gcd',
    name: 'Euclidean Algorithm for GCD',
    category: 'Discrete Math',
    latex: '\\gcd(a, b) = \\gcd(b, a \\pmod b), \\quad \\gcd(a, 0) = a',
    description: 'Efficiently computes the greatest common divisor of two integers through iterative remainder reduction.',
    variables: [
      { symbol: 'a, b', meaning: 'Positive integers' },
      { symbol: 'a mod b', meaning: 'Remainder after dividing a by b' },
    ],
    labLink: 'discrete',
  },
  {
    id: 'pigeonhole',
    name: 'Pigeonhole Principle',
    category: 'Discrete Math',
    latex: 'n > k \\implies \\exists \\text{ box with } \\ge \\lceil n/k \\rceil \\text{ items}',
    description: 'If n items are placed into k boxes with n > k, at least one container must hold more than one item.',
    variables: [
      { symbol: 'n', meaning: 'Number of items (pigeons)' },
      { symbol: 'k', meaning: 'Number of compartments (pigeonholes)' },
    ],
    labLink: 'discrete',
  },
];
