import { MathChallenge } from '../types';

export const MATH_CHALLENGES: MathChallenge[] = [
  {
    id: 'ch-1',
    title: 'The Tangent Line Slope',
    category: 'Calculus',
    difficulty: 'Intermediate',
    question: 'Find the slope of the tangent line to the curve f(x) = 3x² - 4x + 2 at the point x = 2.',
    latex: 'f(x) = 3x^2 - 4x + 2, \\quad \\text{find } f\'(2)',
    options: ['6', '8', '10', '12'],
    correctAnswer: 1, // index 1 -> '8'
    hint: 'First take the derivative f\'(x) using the power rule: d/dx(x^n) = n·x^(n-1), then substitute x = 2.',
    explanation: 'The derivative is f\'(x) = 6x - 4. Substituting x = 2 gives f\'(2) = 6(2) - 4 = 12 - 4 = 8.',
  },
  {
    id: 'ch-2',
    title: 'Matrix Area Scaling',
    category: 'Linear Algebra',
    difficulty: 'Intermediate',
    question: 'A 2D square with area 5 is transformed by the matrix [[3, 1], [2, 4]]. What is the area of the transformed shape?',
    latex: 'A = \\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}',
    options: ['20', '35', '50', '60'],
    correctAnswer: 2, // det = 12 - 2 = 10, area = 5 * 10 = 50
    hint: 'The area scaling factor of a 2D linear transformation equals the absolute value of the determinant of its matrix.',
    explanation: 'det(A) = (3)(4) - (1)(2) = 12 - 2 = 10. The transformed area is original area × |det(A)| = 5 × 10 = 50.',
  },
  {
    id: 'ch-3',
    title: 'Unit Circle Coordinates',
    category: 'Trigonometry',
    difficulty: 'Elementary',
    question: 'What are the exact Cartesian coordinates (x, y) of the point on the unit circle at angle θ = 5π/6 radians?',
    latex: '\\theta = \\frac{5\\pi}{6}',
    options: [
      '(-√3/2, 1/2)',
      '(-1/2, √3/2)',
      '(√3/2, -1/2)',
      '(-√2/2, √2/2)',
    ],
    correctAnswer: 0,
    hint: '5π/6 radians is in Quadrant II (150°), where cosine is negative and sine is positive.',
    explanation: 'On the unit circle, x = cos(5π/6) = -√3/2 and y = sin(5π/6) = 1/2. Therefore (x, y) = (-√3/2, 1/2).',
  },
  {
    id: 'ch-4',
    title: 'Definite Integral of Sine',
    category: 'Calculus',
    difficulty: 'Elementary',
    question: 'Evaluate the definite integral of sin(x) from 0 to π.',
    latex: '\\int_{0}^{\\pi} \\sin(x)\\,dx',
    options: ['0', '1', '2', 'π'],
    correctAnswer: 2, // -cos(pi) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2
    hint: 'The antiderivative of sin(x) is -cos(x). Apply the Fundamental Theorem of Calculus: [-cos(x)] from 0 to π.',
    explanation: '[-cos(x)] from 0 to π = -cos(π) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2.',
  },
  {
    id: 'ch-5',
    title: 'Euclid\'s Divisors',
    category: 'Discrete Math',
    difficulty: 'Elementary',
    question: 'Using the Euclidean algorithm, what is the Greatest Common Divisor (GCD) of 252 and 105?',
    latex: '\\gcd(252, 105)',
    options: ['7', '15', '21', '42'],
    correctAnswer: 2, // 252 = 2*105 + 42, 105 = 2*42 + 21, 42 = 2*21 + 0 -> 21
    hint: '252 = 2 × 105 + 42. Next divide 105 by 42.',
    explanation: '252 = 2 × 105 + 42; 105 = 2 × 42 + 21; 42 = 2 × 21 + 0. The last non-zero remainder is 21.',
  },
  {
    id: 'ch-6',
    title: 'Dice Probability - Sum of 7',
    category: 'Statistics & Probability',
    difficulty: 'Intermediate',
    question: 'What is the theoretical probability of rolling a total sum of 7 with two standard 6-sided dice?',
    latex: 'P(\\text{Sum} = 7)',
    options: ['1/12', '1/6', '7/36', '1/4'],
    correctAnswer: 1, // 6 outcomes out of 36 = 1/6
    hint: 'Count all pairs (d1, d2) that sum to 7 out of 36 equally likely outcomes.',
    explanation: 'The pairs summing to 7 are: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — 6 outcomes. 6 / 36 = 1/6.',
  },
];
