import React, { useState } from 'react';
import { LabTab } from '../../types';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MainNavigationProps {
  currentTab: LabTab;
  onSelectTab: (tab: LabTab) => void;
  onOpenSearch: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (tab: LabTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: LabTab; label: string }[] = [
    { id: 'overview', label: 'Home' },
    { id: 'investigations', label: 'Investigations' },
    { id: 'laboratories', label: 'Digital Lab' },
    { id: 'share-work', label: 'Submit' },
    { id: 'local-labs', label: 'Local Labs' },
    { id: 'team', label: 'Team' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Clean Brand Wordmark */}
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-[#0a192f] shrink-0">
              <img
                src="/assets/aistudio/unnamed_7f1902d3.jpg"
                alt="Math Lab Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display-bold text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400 transition-colors">
              MATH LAB
            </span>
          </button>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            {navItems.map((item) => {
              const isActive =
                currentTab === item.id ||
                (item.id === 'laboratories' &&
                  ['graphing', 'geometry', 'calculus', 'linear-algebra', 'probability', 'discrete'].includes(currentTab));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#0077c8] dark:text-sky-400 font-semibold bg-sky-50/80 dark:bg-sky-950/50'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Minimal Utility Controls (Search + Theme) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0077c8] dark:text-sky-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
