import React, { useMemo } from 'react';
import katex from 'katex';

export interface MathProps {
  math?: string;
  children?: string;
  className?: string;
  errorColor?: string;
  renderError?: (error: Error | TypeError) => React.ReactNode;
}

/**
 * Inline mathematical notation rendered with KaTeX.
 * Supports both `math` prop and `children` string (compatible with react-katex).
 */
export const InlineMath: React.FC<MathProps> = ({
  math,
  children,
  className = '',
  errorColor = '#cc0000',
  renderError,
}) => {
  const formula = math ?? children ?? '';

  const html = useMemo(() => {
    if (!formula.trim()) return '';
    try {
      return katex.renderToString(formula, {
        displayMode: false,
        throwOnError: true,
      });
    } catch (error) {
      if (renderError && error instanceof Error) {
        return null;
      }
      try {
        return katex.renderToString(formula, {
          displayMode: false,
          throwOnError: false,
          errorColor,
        });
      } catch {
        return `<span class="text-rose-500 font-mono text-xs">${formula}</span>`;
      }
    }
  }, [formula, errorColor, renderError]);

  if (html === null && renderError) {
    return <>{renderError(new Error(`KaTeX error rendering: ${formula}`))}</>;
  }

  return (
    <span
      className={`inline-math font-math align-baseline ${className}`}
      dangerouslySetInnerHTML={{ __html: html || '' }}
    />
  );
};

/**
 * Block (display mode) mathematical equation rendered with KaTeX.
 * Centered, horizontally scrollable on mobile, with dark mode contrast.
 */
export const BlockMath: React.FC<MathProps> = ({
  math,
  children,
  className = '',
  errorColor = '#cc0000',
  renderError,
}) => {
  const formula = math ?? children ?? '';

  const html = useMemo(() => {
    if (!formula.trim()) return '';
    try {
      return katex.renderToString(formula, {
        displayMode: true,
        throwOnError: true,
      });
    } catch (error) {
      if (renderError && error instanceof Error) {
        return null;
      }
      try {
        return katex.renderToString(formula, {
          displayMode: true,
          throwOnError: false,
          errorColor,
        });
      } catch {
        return `<div class="text-rose-500 font-mono text-xs text-center">${formula}</div>`;
      }
    }
  }, [formula, errorColor, renderError]);

  if (html === null && renderError) {
    return <>{renderError(new Error(`KaTeX error rendering: ${formula}`))}</>;
  }

  return (
    <div
      className={`block-math overflow-x-auto py-2 my-1 text-center font-math scrollbar-thin text-slate-900 dark:text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: html || '' }}
    />
  );
};

/**
 * Parses a string containing mixed text and LaTeX delimiters:
 * - `$$...$$` for block equations
 * - `$...$` for inline equations
 */
export const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const parts = useMemo(() => {
    if (!text) return [];

    // Split on $$...$$ first, then $...$
    const result: { type: 'text' | 'inline' | 'block'; content: string; id: number }[] = [];
    let counter = 0;

    // Regex matching either $$...$$ or $...$
    const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = mathRegex.exec(text)) !== null) {
      const matchStart = match.index;
      const matchedString = match[0];

      if (matchStart > lastIndex) {
        result.push({
          type: 'text',
          content: text.slice(lastIndex, matchStart),
          id: counter++,
        });
      }

      if (matchedString.startsWith('$$') && matchedString.endsWith('$$')) {
        result.push({
          type: 'block',
          content: matchedString.slice(2, -2).trim(),
          id: counter++,
        });
      } else if (matchedString.startsWith('$') && matchedString.endsWith('$')) {
        result.push({
          type: 'inline',
          content: matchedString.slice(1, -1).trim(),
          id: counter++,
        });
      }

      lastIndex = matchStart + matchedString.length;
    }

    if (lastIndex < text.length) {
      result.push({
        type: 'text',
        content: text.slice(lastIndex),
        id: counter++,
      });
    }

    return result;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((p) => {
        if (p.type === 'block') {
          return <BlockMath key={p.id} math={p.content} />;
        }
        if (p.type === 'inline') {
          return <InlineMath key={p.id} math={p.content} />;
        }
        return <React.Fragment key={p.id}>{p.content}</React.Fragment>;
      })}
    </span>
  );
};

export default {
  InlineMath,
  BlockMath,
  MathText,
};
