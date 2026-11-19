import React, { useState, useEffect } from 'react';
import { LabTab } from '../../types';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MainNavigationProps {
  currentTab: LabTab;
  onSelectTab: (tab: LabTab) => void;
  onOpenSearch: () => void;
  isTransparentHero?: boolean;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  isTransparentHero = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (tab: LabTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: LabTab; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'investigations', label: 'Investigations' },
    { id: 'laboratories', label: 'Digital Lab' },
    { id: 'local-labs', label: 'Local Labs' },
    { id: 'team', label: 'Team' },
  ];

  const transparent = isTransparentHero && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`${
        isTransparentHero ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
      } z-40 transition-all duration-300 ${
        transparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0"
          >
            <div
              className={`w-9 h-9 rounded-full overflow-hidden border shrink-0 transition-colors ${
                transparent ? 'border-white/40 bg-[#0a192f]' : 'border-slate-200 dark:border-slate-700 bg-[#0a192f]'
              }`}
            >
              <img
                src="/assets/aistudio/unnamed_7f1902d3.jpg"
                alt="Math Lab Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-display-bold text-xl font-bold tracking-tight transition-colors ${
                transparent
                  ? 'text-white'
                  : 'text-slate-900 dark:text-white group-hover:text-[#0077c8] dark:group-hover:text-sky-400'
              }`}
            >
              Math Lab
            </span>
          </button>

          {/* Right-aligned Nav Links + Outlined Pill CTA */}
          <div className="hidden md:flex items-center gap-6">
            <nav
              className={`flex items-center gap-6 text-sm font-medium transition-colors ${
                transparent ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {navItems.map((item) => {
                const isActive =
                  currentTab === item.id ||
                  (item.id === 'laboratories' &&
                    ['graphing', 'geometry', 'calculus', 'linear-algebra', 'probability', 'discrete'].includes(currentTab));
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`transition-colors whitespace-nowrap shrink-0 ${
                      transparent
                        ? isActive
                          ? 'text-white font-semibold'
                          : 'hover:text-white'
                        : isActive
                        ? 'text-[#0077c8] dark:text-sky-400 font-semibold'
                        : 'hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenSearch}
                className={`p-2 rounded-full transition-colors ${
                  transparent
                    ? 'text-white/85 hover:text-white hover:bg-white/15'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Search"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  transparent
                    ? 'text-white/85 hover:text-white hover:bg-white/15'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => handleNavClick('share-work')}
                className={`ml-1 px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  transparent
                    ? 'border border-white/85 text-white hover:bg-white hover:text-[#102c57]'
                    : 'border border-[#0077c8] text-[#0077c8] dark:border-sky-400 dark:text-sky-400 hover:bg-[#0077c8] hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950'
                }`}
              >
                Submit Work
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-full ${transparent ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${transparent ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition ${
                transparent
                  ? 'text-white hover:bg-white/15'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
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
          <button
            onClick={() => handleNavClick('share-work')}
            className="w-full mt-2 px-4 py-2.5 rounded-full bg-[#0077c8] text-white text-sm font-semibold text-center"
          >
            Submit Work
          </button>
        </div>
      )}
    </header>
  );
};
