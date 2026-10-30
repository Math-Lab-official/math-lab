import React, { useState } from 'react';
import { MATH_CHALLENGES } from '../data/challenges';
import { Award, CheckCircle2, XCircle, Lightbulb, ChevronRight, Flame } from 'lucide-react';

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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#b86822]" />
            <h2 className="font-serif-editorial text-2xl font-bold text-[#182029]">
              Daily Math Challenge
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-1">
            Sharpen your mathematical reasoning with daily problem solving across calculus, algebra, geometry, and discrete math.
          </p>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-2 bg-[#faf7f2] px-4 py-2.5 rounded-xl border border-[#ded5c5] text-[#b86822] shadow-xs">
          <Flame className="w-5 h-5 text-[#b86822] animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#667085] leading-none">
              Daily Streak
            </div>
            <div className="text-base font-bold font-mono text-[#182029] leading-none mt-1">
              {streak} Days Active
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-white border border-[#ded5c5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#faf7f2] text-[#2d5868] border border-[#ded5c5]">
              {challenge.category}
            </span>
            <span className="text-xs text-[#667085]">
              Problem {selectedChallengeIndex + 1} of {MATH_CHALLENGES.length}
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#faf7f2] text-[#b86822] border border-[#ded5c5]">
            {challenge.difficulty}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif-editorial text-xl font-bold text-[#182029]">
            {challenge.title}
          </h3>
          <p className="text-[#344054] text-sm md:text-base leading-relaxed">
            {challenge.question}
          </p>

          {challenge.latex && (
            <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#ded5c5] text-center font-serif-editorial text-lg text-[#2d5868]">
              {challenge.latex}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {challenge.options.map((opt, idx) => {
            let stateClass = 'bg-[#faf7f2] border-[#ded5c5] hover:border-[#2d5868] text-[#182029]';
            if (selectedOption === idx) {
              stateClass = 'bg-[#254553]/10 border-[#254553] text-[#182029] font-medium';
            }
            if (isSubmitted) {
              if (idx === challenge.correctAnswer) {
                stateClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
              } else if (selectedOption === idx) {
                stateClass = 'bg-rose-50 border-rose-400 text-rose-900';
              } else {
                stateClass = 'bg-[#faf7f2] border-[#ded5c5] text-[#98a2b3] opacity-60';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${stateClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white border border-[#ded5c5] flex items-center justify-center text-xs font-mono text-[#475467]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-mono">{opt}</span>
                </div>

                {isSubmitted && idx === challenge.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
                {isSubmitted && selectedOption === idx && idx !== challenge.correctAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#eee7db]">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-[#b86822] hover:underline transition"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Need a hint?'}
          </button>

          <div className="flex gap-2 w-full sm:w-auto">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#254553] hover:bg-[#1a333e] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
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
