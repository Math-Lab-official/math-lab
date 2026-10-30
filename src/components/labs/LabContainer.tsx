import React, { useState, useEffect } from 'react';
import { LabTab } from '../../types';
import { ArrowLeft, CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';
import { getStudentProgress, setLabProgressStatus } from '../../utils/studentProgress';

interface LabContainerProps {
  labId: LabTab;
  title: string;
  category: string;
  onBack: () => void;
  onOpenProgress?: () => void;
  children: React.ReactNode;
}

export const LabContainer: React.FC<LabContainerProps> = ({
  labId,
  title,
  category,
  onBack,
  onOpenProgress,
  children,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    const p = getStudentProgress();
    return p.labs[labId]?.status === 'completed';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const p = getStudentProgress();
      setIsCompleted(p.labs[labId]?.status === 'completed');
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, [labId]);

  const handleToggleComplete = () => {
    const nextStatus = isCompleted ? 'in_progress' : 'completed';
    setLabProgressStatus(labId, nextStatus);
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="space-y-6 py-4 animate-in fade-in">
      {/* Top Navigation & Status Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5 text-xs font-bold"
            title="Return to Laboratories Overview"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">All Laboratories</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#0077c8] dark:text-sky-400">
                {category}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Interactive Studio</span>
            </div>
            <h2 className="font-display-bold text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onOpenProgress && (
            <button
              onClick={onOpenProgress}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-[#0077c8] dark:text-sky-400" />
              <span>Notebook</span>
            </button>
          )}

          <button
            onClick={handleToggleComplete}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 shadow-xs ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                : 'bg-[#0077c8] hover:bg-[#005fa3] text-white border-transparent'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-white'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Lab Component Workspace */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors">
        {children}
      </div>
    </div>
  );
};
