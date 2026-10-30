// Mathematical evaluation & calculation utilities for Math Lab

/**
 * Safely evaluates a 1-variable mathematical expression f(x)
 * Supports: sin, cos, tan, exp, log/ln, sqrt, abs, pow (^), pi, e
 */
export function evaluateMathFunction(expr: string, x: number, params: { a?: number; b?: number; c?: number; d?: number } = {}): number {
  const { a = 1, b = 1, c = 0, d = 0 } = params;
  try {
    // Sanitize and replace math tokens with JS Math equivalents
    let clean = expr.trim().toLowerCase();
    
    // Replace constant names first
    clean = clean.replace(/\bpi\b/g, `(${Math.PI})`);
    clean = clean.replace(/\be\b/g, `(${Math.E})`);
    
    // Replace parameters
    clean = clean.replace(/\ba\b/g, `(${a})`);
    clean = clean.replace(/\bb\b/g, `(${b})`);
    clean = clean.replace(/\bc\b/g, `(${c})`);
    clean = clean.replace(/\bd\b/g, `(${d})`);

    // Handle implicit multiplication like 2x, 3sin(x), (x+1)(x-1)
    clean = clean.replace(/(\d+)([a-z\(])/g, '$1*$2');
    clean = clean.replace(/(\))(\()/g, '$1*$2');
    clean = clean.replace(/(\))([a-z0-9])/g, '$1*$2');

    // Replace functions
    clean = clean.replace(/\bsin\b/g, 'Math.sin');
    clean = clean.replace(/\bcos\b/g, 'Math.cos');
    clean = clean.replace(/\btan\b/g, 'Math.tan');
    clean = clean.replace(/\basin\b/g, 'Math.asin');
    clean = clean.replace(/\bacos\b/g, 'Math.acos');
    clean = clean.replace(/\batan\b/g, 'Math.atan');
    clean = clean.replace(/\bexp\b/g, 'Math.exp');
    clean = clean.replace(/\bln\b/g, 'Math.log');
    clean = clean.replace(/\blog\b/g, 'Math.log10');
    clean = clean.replace(/\bsqrt\b/g, 'Math.sqrt');
    clean = clean.replace(/\babs\b/g, 'Math.abs');
    
    // Power operator ^ -> **
    clean = clean.replace(/\^/g, '**');

    // Only allow safe characters
    if (/[^0-9a-zA-Z\.\+\-\*\/\(\)\s\,]/.test(clean)) {
      return NaN;
    }

    // Function constructor execution with x bound
    const fn = new Function('x', 'Math', `try { return (${clean}); } catch (e) { return NaN; }`);
    const res = fn(x, Math);
    return typeof res === 'number' && !isNaN(res) && isFinite(res) ? res : NaN;
  } catch {
    return NaN;
  }
}

/**
 * Computes numerical derivative f'(x) using central difference
 */
export function numericalDerivative(fn: (x: number) => number, x: number, h = 1e-5): number {
  return (fn(x + h) - fn(x - h)) / (2 * h);
}

/**
 * Computes numerical definite integral from a to b using Simpson's rule
 */
export function numericalIntegral(fn: (x: number) => number, a: number, b: number, n = 200): number {
  if (a === b) return 0;
  if (a > b) return -numericalIntegral(fn, b, a, n);
  if (n % 2 !== 0) n++; // Must be even
  const h = (b - a) / n;
  let sum = fn(a) + fn(b);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    const val = fn(x);
    if (isNaN(val)) continue;
    sum += i % 2 === 0 ? 2 * val : 4 * val;
  }
  return (h / 3) * sum;
}

/**
 * 2x2 Matrix utilities
 */
export interface Matrix2x2 {
  a: number; // [0,0]
  b: number; // [0,1]
  c: number; // [1,0]
  d: number; // [1,1]
}

export function computeDeterminant(m: Matrix2x2): number {
  return m.a * m.d - m.b * m.c;
}

export function computeTrace(m: Matrix2x2): number {
  return m.a + m.d;
}

export function computeInverse(m: Matrix2x2): Matrix2x2 | null {
  const det = computeDeterminant(m);
  if (Math.abs(det) < 1e-10) return null;
  return {
    a: m.d / det,
    b: -m.b / det,
    c: -m.c / det,
    d: m.a / det,
  };
}

export function computeEigenvalues(m: Matrix2x2): { lambda1: number; lambda2: number; isComplex: boolean; imagPart?: number } {
  const tr = computeTrace(m);
  const det = computeDeterminant(m);
  const disc = tr * tr - 4 * det;
  if (disc >= 0) {
    const sqrtDisc = Math.sqrt(disc);
    return {
      lambda1: (tr + sqrtDisc) / 2,
      lambda2: (tr - sqrtDisc) / 2,
      isComplex: false,
    };
  } else {
    return {
      lambda1: tr / 2,
      lambda2: tr / 2,
      isComplex: true,
      imagPart: Math.sqrt(-disc) / 2,
    };
  }
}

/**
 * Factorial
 */
export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

/**
 * Combinations n choose k
 */
export function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let res = 1;
  for (let i = 1; i <= k; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return Math.round(res);
}

/**
 * Permutations P(n, k)
 */
export function permutations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let res = 1;
  for (let i = 0; i < k; i++) {
    res *= n - i;
  }
  return res;
}

/**
 * Greatest common divisor using Euclidean algorithm with steps
 */
export function gcdWithSteps(a: number, b: number): { gcd: number; steps: { a: number; b: number; q: number; r: number }[] } {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  const steps: { a: number; b: number; q: number; r: number }[] = [];

  if (y > x) {
    const temp = x;
    x = y;
    y = temp;
  }

  while (y > 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    steps.push({ a: x, b: y, q, r });
    x = y;
    y = r;
  }

  return { gcd: x || y, steps };
}

/**
 * Prime factorization
 */
export function primeFactors(n: number): { factor: number; power: number }[] {
  let num = Math.abs(Math.round(n));
  if (num < 2) return [];
  const factors: { factor: number; power: number }[] = [];

  for (let d = 2; d * d <= num; d++) {
    if (num % d === 0) {
      let count = 0;
      while (num % d === 0) {
        count++;
        num /= d;
      }
      factors.push({ factor: d, power: count });
    }
  }

  if (num > 1) {
    factors.push({ factor: num, power: 1 });
  }

  return factors;
}
