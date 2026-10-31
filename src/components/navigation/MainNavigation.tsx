import React, { useState, useEffect } from 'react';
import { LabTab } from '../../types';
import { 
  Menu, 
  X, 
  Sparkles, 
  Calendar, 
  Send, 
  Building2, 
  Users, 
  Clock, 
  BookOpen, 
  ArrowRight,
  Sun,
  Moon,
  Award,
  Activity
} from 'lucide-react';
import { STAFF_APPLICATION_URL } from '../../data/teamData';
import { useTheme } from '../../context/ThemeContext';
import { getStudentProgress, getOverallProgressStats } from '../../utils/studentProgress';

interface MainNavigationProps {
  currentTab: LabTab;
  onSelectTab: (tab: LabTab) => void;
  onOpenProgress?: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenProgress,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [stats, setStats] = useState(() => getOverallProgressStats(getStudentProgress()));

  useEffect(() => {
    const handleUpdate = () => {
      setStats(getOverallProgressStats(getStudentProgress()));
    };
    window.addEventListener('math_lab_progress_updated', handleUpdate);
    return () => window.removeEventListener('math_lab_progress_updated', handleUpdate);
  }, []);

  const handleNavClick = (tab: LabTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'overview' as LabTab, label: 'Home' },
    { id: 'investigations' as LabTab, label: 'National Investigations', icon: Calendar },
    { id: 'laboratories' as LabTab, label: 'Interactive Labs', icon: Activity },
    { id: 'share-work' as LabTab, label: 'Share Your Work', icon: Send },
    { id: 'local-labs' as LabTab, label: 'Local Labs', icon: Building2 },
    { id: 'team' as LabTab, label: 'Meet the Team', icon: Users },
    { id: 'about' as LabTab, label: 'About', icon: BookOpen },
    { id: 'events' as LabTab, label: 'Events', badge: 'Soon' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3 text-left group transition-transform duration-150 transform hover:scale-[1.01]"
          >
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 bg-[#0a192f] shrink-0">
              <img
                src="/assets/aistudio/unnamed_7f1902d3.jpg"
                alt="Math Lab Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/30 rounded-2xl pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-display-bold text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors leading-none">
                MATH LAB
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
                Collaborative Mathematical Inquiry
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-semibold text-slate-700 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = currentTab === item.id || (item.id === 'laboratories' && ['graphing', 'geometry', 'calculus', 'linear-algebra', 'probability', 'discrete'].includes(currentTab));
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-[#0077c8] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 font-bold'
                      : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                      · {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Progress Button */}
            {onOpenProgress && (
              <button
                onClick={onOpenProgress}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-2 transition shadow-2xs"
                title="Open Student Research Portfolio & Progress"
              >
                <Award className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                <span className="hidden xl:inline">Portfolio</span>
                <span className="font-mono text-xs text-[#0077c8] dark:text-sky-400 font-bold">
                  {stats.overallPercentage}%
                </span>
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition shadow-2xs"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Explore Button */}
            <button
              onClick={() => handleNavClick('investigations')}
              className="px-4 py-2 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Explore Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-200" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenProgress && (
              <button
                onClick={onOpenProgress}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                title="Progress"
              >
                <Award className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              title="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-150">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0077c8] dark:text-sky-400 font-extrabold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-4 h-4 opacity-70" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {onOpenProgress && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProgress();
                }}
                className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0077c8] dark:text-sky-400" />
                  <span>Student Research Portfolio</span>
                </div>
                <span className="font-mono text-xs text-[#0077c8] dark:text-sky-400 font-bold">
                  {stats.overallPercentage}%
                </span>
              </button>
            )}

            <a
              href={STAFF_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition"
            >
              <span>Apply for Staff Committees</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
