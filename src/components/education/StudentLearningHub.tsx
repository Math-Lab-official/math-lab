import React, { useState } from 'react';
import { LabTab } from '../../types';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  FileText, 
  Download, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Lightbulb,
  Award,
  Activity,
  CircleDot,
  Layers,
  Grid,
  Binary,
  Compass
} from 'lucide-react';

interface StudentLearningHubProps {
  onNavigateToLab: (tab: LabTab) => void;
  user: { email: string; name: string; role?: string } | null;
}

export const StudentLearningHub: React.FC<StudentLearningHubProps> = ({
  onNavigateToLab,
  user,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<'calculus' | 'geometry' | 'linear-algebra' | 'discrete'>('calculus');
  const [activeQuizQuestion, setActiveQuizQuestion] = useState<number>(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [copiedSheet, setCopiedSheet] = useState<string | null>(null);

  const studentTracks = [
    {
      id: 'calculus' as const,
      title: 'AP/IB Calculus Intuition Pathway',
      subtitle: 'From Static Secants to Living Riemann Integrals',
      icon: Layers,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      labLink: 'calculus' as LabTab,
      labName: 'Launch Calculus Sandbox',
      overview: 'Master differential and integral calculus through geometric exploration instead of mindless symbolic manipulation.',
      modules: [
        {
          title: '1. The Tangent Problem & Slope as Limit',
          desc: 'Watch the secant line between (x, f(x)) and (x+h, f(x+h)) snap into the instantaneous tangent as h → 0.',
          formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
          lab: 'graphing' as LabTab,
        },
        {
          title: '2. Riemann Sum Slices & Area Under the Curve',
          desc: 'Compare Left, Right, Midpoint, and Trapezoidal approximations as the partition count N increases from 2 to 100.',
          formula: '\\int_a^b f(x)dx = \\lim_{N \\to \\infty} \\sum_{i=1}^N f(x_i^*) \\Delta x',
          lab: 'calculus' as LabTab,
        },
        {
          title: '3. Taylor Polynomial Series Convergence',
          desc: 'Observe higher-degree polynomial terms (degree 1 to 11) hug transcendental curves like sin(x) and eˣ.',
          formula: 'P_N(x) = \\sum_{n=0}^N \\frac{f^{(n)}(a)}{n!} (x - a)^n',
          lab: 'calculus' as LabTab,
        },
      ],
    },
    {
      id: 'geometry' as const,
      title: 'Competition Geometry & Invariants (AMC/AIME)',
      subtitle: 'Power of a Point, Cyclic Quadrilaterals & Trigonometric Projections',
      icon: CircleDot,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      labLink: 'geometry' as LabTab,
      labName: 'Launch Geometry & Circle Studio',
      overview: 'Develop the visual intuition required for AMC 10/12 and AIME contest geometry problems.',
      modules: [
        {
          title: '1. Power of a Point & Inscribed Angles',
          desc: 'For intersecting chords AB and CD inside a circle, the product AP · PB = CP · PD remains invariant no matter where P moves.',
          formula: 'AP \\cdot PB = CP \\cdot PD',
          lab: 'geometry' as LabTab,
        },
        {
          title: '2. Continuous Unit Circle Projections',
          desc: 'Visualize sine as vertical projection, cosine as horizontal projection, and tangent as the intercept on x=1.',
          formula: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1, \\quad \\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}',
          lab: 'geometry' as LabTab,
        },
        {
          title: '3. Triangle Invariants & SSS Solving',
          desc: 'Solve non-right triangles using the Law of Cosines and test triangle inequalities interactively.',
          formula: 'c^2 = a^2 + b^2 - 2ab\\cos(C)',
          lab: 'geometry' as LabTab,
        },
      ],
    },
    {
      id: 'linear-algebra' as const,
      title: 'Linear Algebra & Coordinate Warping',
      subtitle: '2D Transformations, Determinant Signed Area & Eigenvalues',
      icon: Grid,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      labLink: 'linear-algebra' as LabTab,
      labName: 'Launch Linear Algebra Grid',
      overview: 'Understand matrices as coordinate space transformations, stretching, shearing, and flipping the coordinate grid.',
      modules: [
        {
          title: '1. Basis Vectors Transformation',
          desc: 'Watch the entire coordinate plane follow the new positions of unit vectors i-hat (1,0) and j-hat (0,1).',
          formula: 'T(\\vec{v}) = x \\cdot T(\\hat{i}) + y \\cdot T(\\hat{j}) = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix}',
          lab: 'linear-algebra' as LabTab,
        },
        {
          title: '2. The Determinant as Area Scaling Factor',
          desc: 'det(A) measures the factor by which areas expand or compress. A negative determinant indicates orientation reversal (reflection).',
          formula: '\\det(A) = ad - bc',
          lab: 'linear-algebra' as LabTab,
        },
        {
          title: '3. Eigenvectors & Invariant Axes',
          desc: 'Discover vectors that do not change direction during transformation, only scaling by eigenvalue λ.',
          formula: 'A\\vec{v} = \\lambda \\vec{v}',
          lab: 'linear-algebra' as LabTab,
        },
      ],
    },
    {
      id: 'discrete' as const,
      title: 'Number Theory, Primes & Cryptography',
      subtitle: 'Sieve of Eratosthenes, Euclidean GCD & Modular Clock Arithmetic',
      icon: Binary,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      labLink: 'discrete' as LabTab,
      labName: 'Launch Discrete Math Lab',
      overview: 'Build foundational intuition for integers, divisibility, and modern public-key cryptography algorithms like RSA.',
      modules: [
        {
          title: '1. Prime Sieve Elimination',
          desc: 'Cross out composite multiples in a 1–100 grid to reveal the distribution of primes.',
          formula: 'n \\in \\mathbb{P} \\iff \\forall d \\in \\{2, \\dots, \\lfloor\\sqrt{n}\\rfloor\\}, d \\nmid n',
          lab: 'discrete' as LabTab,
        },
        {
          title: '2. Euclidean Algorithm Step-by-Step GCD',
          desc: 'Track recursive quotient and remainder divisions to find greatest common divisors with speed.',
          formula: '\\gcd(a, b) = \\gcd(b, a \\bmod b)',
          lab: 'discrete' as LabTab,
        },
        {
          title: '3. Modular Arithmetic Clock Rings',
          desc: 'Wrap numbers around a circle modulo n to understand cyclic groups Z/nZ and multiplicative inverses.',
          formula: 'a \\equiv b \\pmod{n} \\iff n \\mid (a - b)',
          lab: 'discrete' as LabTab,
        },
      ],
    },
  ];

  const currentTrackData = studentTracks.find((t) => t.id === selectedTrack) || studentTracks[0];

  // Interactive Student Concept Check Quiz
  const quizQuestions = [
    {
      question: 'What does the determinant of a 2x2 matrix geometrically represent for any region in the plane?',
      options: [
        'The perimeter of the resulting polygon',
        'The signed area scaling factor of the transformation',
        'The angle between the eigenvectors',
        'The length of the trace diagonal',
      ],
      correct: 1,
      explanation: 'det(A) = ad - bc is the factor by which any 2D area scales under transformation. If det(A) is negative, the orientation of space is inverted (flipped).',
    },
    {
      question: 'In the AIME Two Chords Theorem, if chords AB and CD intersect at P inside a circle, which product is constant?',
      options: [
        'AP + PB = CP + PD',
        'AP · PB = CP · PD',
        'AP · CP = BP · DP',
        'Area(APB) = Area(CPD)',
      ],
      correct: 1,
      explanation: 'By the Power of a Point theorem, AP · PB = CP · PD. This follows from similar triangles formed by inscribed angles intercepting the same arc.',
    },
    {
      question: 'When approximating an integral with Riemann sums, what happens to the approximation error as the partition count N → ∞?',
      options: [
        'The error oscillates without bounds',
        'The error converges to zero for continuous functions',
        'The error stays equal to (b - a)/2',
        'The error approaches infinity',
      ],
      correct: 1,
      explanation: 'For Riemann integrable functions, the mesh size goes to zero as N → ∞, and the upper and lower sums squeeze together, yielding exact definite integral.',
    },
  ];

  const currentQuiz = quizQuestions[activeQuizQuestion];

  const handleCopySheet = (name: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSheet(name);
    setTimeout(() => setCopiedSheet(null), 2000);
  };

  const cheatSheets = [
    {
      name: 'Calculus AB/BC Invariants',
      tag: 'Calculus',
      summary: 'Derivative definitions, tangent lines, Riemann sums, Fundamental Theorem, and Taylor Series.',
      text: `# Math Lab: Calculus Cheat Sheet\n- Derivative: f'(x) = lim_{h->0} (f(x+h) - f(x))/h\n- Tangent Equation: y - f(a) = f'(a)(x - a)\n- Riemann Integral: ∫_a^b f(x)dx = lim_{N->∞} Σ f(x_i*)Δx\n- Taylor Polynomial: P_n(x) = Σ f^(k)(a)/k! (x - a)^k\n- Fundamental Theorem: d/dx ∫_a^x f(t)dt = f(x)`,
    },
    {
      name: 'Olympiad & AIME Geometry Theorems',
      tag: 'Geometry',
      summary: 'Power of a point, inscribed angle theorem, Law of Cosines, Heron’s formula, and cyclic quadrilaterals.',
      text: `# Math Lab: Geometry Invariants\n- Power of a Point: AP · PB = CP · PD\n- Inscribed Angle: θ = (1/2) * Arc Measure\n- Law of Cosines: c² = a² + b² - 2ab cos(C)\n- Law of Sines: a/sin(A) = b/sin(B) = c/sin(C) = 2R\n- Triangle Area: K = (1/2)ab sin(C) = sqrt(s(s-a)(s-b)(s-c))`,
    },
    {
      name: 'Linear Algebra & 2D Matrices',
      tag: 'Linear Algebra',
      summary: 'Determinant area scaling, basis vector maps, matrix inverse, rotation matrix, and eigenvalues.',
      text: `# Math Lab: Matrix Transformations\n- Matrix Map: [a b; c d] * [x; y] = [ax + by; cx + dy]\n- Determinant: det(A) = ad - bc (Signed Area Factor)\n- Rotation 2D: [cos θ, -sin θ; sin θ, cos θ]\n- Inverse: A^(-1) = (1/det(A)) * [d -b; -c a]\n- Eigen equation: A v = λ v => det(A - λI) = 0`,
    },
  ];

  return (
    <div className="space-y-10 py-6">
      {/* 1. Header Banner - Highlighting Student Education & Educational Non-Profit Mission */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div 
          aria-hidden="true" 
          className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#0077c8]/25 rounded-full blur-3xl pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute -left-10 -top-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Educational Non-Profit</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Learning Center</span>
            </span>
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            GUIDED LEARNING PATHWAYS FOR STUDENTS
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Math Lab was built by mathematicians and educators as an open-access educational non-profit. Our mission is to make advanced mathematical intuition accessible to every high school, college, and competition student in the world—free of charge, with zero ads or paywalls.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Accounts Required to Learn</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>AMC / AP / IB Aligned Curricula</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Tactile Geometric Sandboxes</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Track Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display-bold text-2xl font-bold text-slate-900">
              Curated Curriculum Tracks
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose a discipline below to explore guided visual lessons and matching simulation engines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {studentTracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#0077c8] shadow-md ring-2 ring-[#0077c8]/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs'
                }`}
              >
                <div className="space-y-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${track.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display-bold text-sm font-bold text-slate-900 leading-snug">
                    {track.title}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {track.subtitle}
                  </p>
                </div>
                <div className={`mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold flex items-center justify-between ${
                  isSelected ? 'text-[#0077c8]' : 'text-slate-400'
                }`}>
                  <span>{isSelected ? 'Active Track' : 'View Track'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Track Detailed Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077c8]">
              Active Student Track
            </span>
            <h3 className="font-display-bold text-2xl font-bold text-slate-900 mt-0.5">
              {currentTrackData.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {currentTrackData.overview}
            </p>
          </div>

          <button
            onClick={() => onNavigateToLab(currentTrackData.labLink)}
            className="px-5 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-xs transition flex items-center gap-2 shrink-0"
          >
            <span>{currentTrackData.labName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Track Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {currentTrackData.modules.map((mod, i) => (
            <div
              key={i}
              className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:bg-white hover:border-[#0077c8]/40 transition-all shadow-2xs group"
            >
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  LESSON {i + 1}
                </span>
                <h4 className="font-display-bold text-sm font-bold text-slate-900 group-hover:text-[#0077c8] transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {mod.desc}
                </p>
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-xs text-[#0077c8] font-bold text-center overflow-x-auto">
                  {mod.formula}
                </div>
              </div>

              <button
                onClick={() => onNavigateToLab(mod.lab)}
                className="mt-4 pt-3 border-t border-slate-200/60 w-full text-left text-xs font-bold text-[#0077c8] hover:underline flex items-center justify-between"
              >
                <span>Launch Lesson Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Interactive Student Concept Checker Quiz */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-display-bold text-lg font-bold text-slate-900">
                Interactive Student Concept Checker
              </h3>
              <p className="text-xs text-slate-500">
                Test your geometric & calculus intuition with instant visual explanations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            {quizQuestions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveQuizQuestion(idx);
                  setQuizSelectedAnswer(null);
                  setQuizSubmitted(false);
                }}
                className={`w-7 h-7 rounded-lg font-bold transition ${
                  activeQuizQuestion === idx
                    ? 'bg-[#0077c8] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 max-w-3xl">
          <p className="text-sm font-semibold text-slate-900">
            {currentQuiz.question}
          </p>

          <div className="space-y-2.5">
            {currentQuiz.options.map((opt, i) => {
              const isChosen = quizSelectedAnswer === i;
              const isCorrect = currentQuiz.correct === i;
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

              if (quizSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                } else if (isChosen && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                }
              } else if (isChosen) {
                btnStyle = 'bg-sky-50 border-[#0077c8] text-[#0077c8] font-bold';
              }

              return (
                <button
                  key={i}
                  disabled={quizSubmitted}
                  onClick={() => setQuizSelectedAnswer(i)}
                  className={`w-full text-left p-3.5 rounded-xl border transition text-xs flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {quizSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              disabled={quizSelectedAnswer === null}
              onClick={() => setQuizSubmitted(true)}
              className="px-5 py-2.5 bg-[#0077c8] disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Verify My Answer
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <span className={quizSelectedAnswer === currentQuiz.correct ? 'text-emerald-700' : 'text-amber-700'}>
                  {quizSelectedAnswer === currentQuiz.correct ? '✓ Correct Reasoning!' : '💡 Conceptual Explanation:'}
                </span>
              </div>
              <p className="leading-relaxed text-slate-600">
                {currentQuiz.explanation}
              </p>
              <button
                onClick={() => {
                  const next = (activeQuizQuestion + 1) % quizQuestions.length;
                  setActiveQuizQuestion(next);
                  setQuizSelectedAnswer(null);
                  setQuizSubmitted(false);
                }}
                className="mt-2 text-xs font-bold text-[#0077c8] hover:underline"
              >
                Next Concept Question →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 5. Free Downloadable / Printable Student Cheat Sheets */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
            Study Guides & Reference Sheets
          </span>
          <h3 className="font-display-bold text-2xl font-bold text-slate-900 mt-0.5">
            Free Printable Student Reference Sheets
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Download or copy Markdown & LaTeX equation guides for high school classes and competition prep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cheatSheets.map((sheet) => (
            <div
              key={sheet.name}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[#0077c8]">
                  {sheet.tag}
                </span>
                <h4 className="font-display-bold text-base font-bold text-slate-900">
                  {sheet.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sheet.summary}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleCopySheet(sheet.name, sheet.text)}
                  className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0077c8]" />
                  <span>{copiedSheet === sheet.name ? 'Copied to Clipboard! ✓' : 'Copy Study Sheet'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Nonprofit Commitment to Students */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-current" />
            <span>Our Non-Profit Promise</span>
          </div>
          <h4 className="font-display-bold text-lg font-bold text-slate-900">
            Education Without Barriers or Subscriptions
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Math Lab operates as an educational non-profit organization. Every line of code, interactive simulation, and study pathway is open-source (Apache-2.0) and provided free of charge to students, teachers, and schools worldwide.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => onNavigateToLab('about')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Non-Profit Charter & Mission
          </button>
        </div>
      </div>
    </div>
  );
};
