import React, { useState } from 'react';
import { MATH_CHALLENGES } from '../data/challenges';
import { Award, CheckCircle2, XCircle, Lightbulb, ChevronRight, Flame } from 'lucide-react';
import { BlockMath } from './common/MathView';

export const DailyChallenge: React.FC = () => {
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem('math_lab_streak') || '3');
  });

  const challenge = MATH_CHALLENGES[selectedChallengeIndex];
  const isCorrect = selectedOption === challenge.correctAnswer;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === challenge.correctAnswer) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('math_lab_streak', String(newStreak));
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setSelectedChallengeIndex((prev) => (prev + 1) % MATH_CHALLENGES.length);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto transition-colors">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0077c8] dark:text-sky-400" />
            <h2 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white">
              Daily Math Challenge
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Sharpen your mathematical reasoning with daily problem solving across calculus, algebra, geometry, and discrete math.
          </p>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none">
              Daily Streak
            </div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white leading-none mt-1">
              {streak} Days Active
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-[#0077c8] dark:text-sky-400">
              {challenge.category}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-slate-500 dark:text-slate-400">
              Problem {selectedChallengeIndex + 1} of {MATH_CHALLENGES.length}
            </span>
          </div>
          <span className="font-mono text-xs font-semibold text-amber-700 dark:text-amber-400">
            {challenge.difficulty} Difficulty
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif-editorial text-xl font-bold text-slate-900 dark:text-white">
            {challenge.title}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            {challenge.question}
          </p>

          {challenge.latex && (
            <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto text-center">
              <BlockMath math={challenge.latex} className="text-[#0077c8] dark:text-sky-300 text-base" />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {challenge.options.map((opt, idx) => {
            let stateClass = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-[#0077c8] dark:hover:border-sky-500 text-slate-800 dark:text-slate-100';
            if (selectedOption === idx) {
              stateClass = 'bg-[#0077c8]/10 dark:bg-sky-500/15 border-[#0077c8] dark:border-sky-400 text-[#0077c8] dark:text-sky-300 font-semibold';
            }
            if (isSubmitted) {
              if (idx === challenge.correctAnswer) {
                stateClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (selectedOption === idx) {
                stateClass = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200';
              } else {
                stateClass = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-50';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${stateClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-mono text-slate-600 dark:text-slate-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-mono">{opt}</span>
                </div>

                {isSubmitted && idx === challenge.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                )}
                {isSubmitted && selectedOption === idx && idx !== challenge.correctAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-[#0077c8] dark:text-sky-400 hover:underline transition"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Need a hint?'}
          </button>

          <div className="flex gap-2 w-full sm:w-auto">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
              >
                Next Challenge
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900">
            <span className="font-bold block mb-1">Hint:</span>
            {challenge.hint}
          </div>
        )}

        {isSubmitted && (
          <div
            className={`p-5 rounded-xl border ${
              isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-[#faf7f2] border-[#ded5c5]'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-900 text-sm">Correct! Excellent work.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="font-bold text-rose-900 text-sm">Not quite right.</span>
                </>
              )}
            </div>
            <p className="text-xs text-[#344054] leading-relaxed">{challenge.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
