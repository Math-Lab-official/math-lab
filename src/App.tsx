import React, { useState } from 'react';
import { LabTab } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { TopUtilityBar } from './components/navigation/TopUtilityBar';
import { MainNavigation } from './components/navigation/MainNavigation';
import { SearchAndUtilityModals } from './components/navigation/SearchAndUtilityModals';
import { HomePage } from './components/landing/HomePage';
import { NationalInvestigationsPage } from './components/investigations/NationalInvestigationsPage';
import { ShareYourWorkPage } from './components/submission/ShareYourWorkPage';
import { StartLocalLabPage } from './components/locallabs/StartLocalLabPage';
import { MeetTheTeamPage } from './components/team/MeetTheTeamPage';
import { AboutMathLabPage } from './components/about/AboutMathLabPage';
import { UpcomingEventsPage } from './components/events/UpcomingEventsPage';
import { LaboratoriesHub } from './components/labs/LaboratoriesHub';
import { LabContainer } from './components/labs/LabContainer';
import { GraphingLab } from './components/labs/GraphingLab';
import { GeometryLab } from './components/labs/GeometryLab';
import { CalculusLab } from './components/labs/CalculusLab';
import { LinearAlgebraLab } from './components/labs/LinearAlgebraLab';
import { ProbabilityLab } from './components/labs/ProbabilityLab';
import { DiscreteMathLab } from './components/labs/DiscreteMathLab';
import { DigitalLabsComingSoonPage } from './components/labs/DigitalLabsComingSoonPage';
import { StudentProgressModal } from './components/progress/StudentProgressModal';
import { StudentLearningHub } from './components/education/StudentLearningHub';
import { FormulaReference } from './components/FormulaReference';
import { DailyChallenge } from './components/DailyChallenge';
import { LabNotebook } from './components/LabNotebook';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<LabTab>('overview');
  const [utilityModal, setUtilityModal] = useState<'search' | 'support' | 'newsletter' | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#faf7f2] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-[#0077c8]/20 selection:text-slate-900 dark:selection:text-white transition-colors">
      {/* 1. Top Utility Bar with Real Links, Dark Mode Toggle, and Progress Tracker */}
      <TopUtilityBar
        onOpenSearch={() => setUtilityModal('search')}
        onOpenContact={() => setUtilityModal('support')}
        onOpenProgress={() => setIsProgressModalOpen(true)}
      />

      {/* 2. Main Navigation Header */}
      <MainNavigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenProgress={() => setIsProgressModalOpen(true)}
      />

      {/* 3. Main Content Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'overview' && (
          <HomePage onSelectTab={setCurrentTab} />
        )}
        {currentTab === 'investigations' && (
          <NationalInvestigationsPage
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          />
        )}
        {currentTab === 'share-work' && (
          <ShareYourWorkPage onNavigateHome={() => setCurrentTab('overview')} />
        )}
        {currentTab === 'local-labs' && (
          <StartLocalLabPage />
        )}
        {currentTab === 'team' && (
          <MeetTheTeamPage />
        )}
        {currentTab === 'about' && (
          <AboutMathLabPage onNavigate={(tab) => setCurrentTab(tab)} />
        )}
        {currentTab === 'events' && (
          <UpcomingEventsPage onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {/* Interactive Mathematics Laboratories Suite */}
        {currentTab === 'laboratories' && (
          <LaboratoriesHub
            onSelectLab={setCurrentTab}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          />
        )}
        {currentTab === 'graphing' && (
          <LabContainer
            labId="graphing"
            title="Function & Graphing Studio"
            category="Continuous Analysis"
            onBack={() => setCurrentTab('laboratories')}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          >
            <GraphingLab />
          </LabContainer>
        )}
        {currentTab === 'geometry' && (
          <LabContainer
            labId="geometry"
            title="Geometry & Unit Circle Studio"
            category="Trigonometry & Invariants"
            onBack={() => setCurrentTab('laboratories')}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          >
            <GeometryLab />
          </LabContainer>
        )}
        {currentTab === 'calculus' && (
          <LabContainer
            labId="calculus"
            title="Calculus & Riemann Sandbox"
            category="Integration & Series"
            onBack={() => setCurrentTab('laboratories')}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          >
            <CalculusLab />
          </LabContainer>
        )}
        {currentTab === 'linear-algebra' && (
          <LabContainer
            labId="linear-algebra"
            title="Linear Algebra Grid Studio"
            category="Matrix Transformations"
            onBack={() => setCurrentTab('laboratories')}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          >
            <LinearAlgebraLab />
          </LabContainer>
        )}
        {currentTab === 'probability' && (
          <LabContainer
            labId="probability"
            title="Statistics & Probability Lab"
            category="Distributions & Monte Carlo"
            onBack={() => setCurrentTab('laboratories')}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          >
            <ProbabilityLab />
          </LabContainer>
        )}
        {currentTab === 'discrete' && (
          <LabContainer
            labId="discrete"
            title="Number Theory & Discrete Math"
            category="Primes & Modular Rings"
            onBack={() => setCurrentTab('laboratories')}
            onOpenProgress={() => setIsProgressModalOpen(true)}
          >
            <DiscreteMathLab />
          </LabContainer>
        )}

        {/* Dedicated Student & Research Exploration Pathways */}
        {currentTab === 'education' && (
          <StudentLearningHub onNavigateToLab={(tab) => setCurrentTab(tab)} user={null} />
        )}
        {currentTab === 'formulas' && (
          <FormulaReference onNavigateToLab={(tab) => setCurrentTab(tab)} />
        )}
        {currentTab === 'challenges' && (
          <DailyChallenge />
        )}
        {currentTab === 'notebook' && (
          <LabNotebook />
        )}
      </main>

      {/* 4. Single Unified Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* 5. Utility Modals (Search, Contact) */}
      <SearchAndUtilityModals
        activeModal={utilityModal}
        onClose={() => setUtilityModal(null)}
        onSelectTab={setCurrentTab}
      />

      {/* 6. Student Research Portfolio & Progress Modal */}
      <StudentProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
