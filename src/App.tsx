import React, { useState } from 'react';
import { LabTab } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { MainNavigation } from './components/navigation/MainNavigation';
import { SearchAndUtilityModals } from './components/navigation/SearchAndUtilityModals';
import { HomePage } from './components/landing/HomePage';
import { NationalInvestigationsPage } from './components/investigations/NationalInvestigationsPage';
import { ShareYourWorkPage } from './components/submission/ShareYourWorkPage';
import { StartLocalLabPage } from './components/locallabs/StartLocalLabPage';
import { MeetTheTeamPage } from './components/team/MeetTheTeamPage';
import { AboutMathLabPage } from './components/about/AboutMathLabPage';
import { LaboratoriesHub } from './components/labs/LaboratoriesHub';
import { LabContainer } from './components/labs/LabContainer';
import { GraphingLab } from './components/labs/GraphingLab';
import { GeometryLab } from './components/labs/GeometryLab';
import { CalculusLab } from './components/labs/CalculusLab';
import { LinearAlgebraLab } from './components/labs/LinearAlgebraLab';
import { ProbabilityLab } from './components/labs/ProbabilityLab';
import { DiscreteMathLab } from './components/labs/DiscreteMathLab';
import { StudentLearningHub } from './components/education/StudentLearningHub';
import { FormulaReference } from './components/FormulaReference';
import { DailyChallenge } from './components/DailyChallenge';
import { LabNotebook } from './components/LabNotebook';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<LabTab>('overview');
  const [utilityModal, setUtilityModal] = useState<'search' | 'support' | 'newsletter' | null>(null);

  const isFullBleedPage = [
    'overview',
    'investigations',
    'laboratories',
    'local-labs',
    'team',
    'about',
    'share-work',
  ].includes(currentTab);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-[#0077c8]/20 selection:text-slate-900 dark:selection:text-white transition-colors">
      {/* Unified Clean Navigation Header */}
      <MainNavigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSearch={() => setUtilityModal('search')}
        isTransparentHero={isFullBleedPage}
      />

      {/* Main Content Router */}
      {isFullBleedPage ? (
        <main className="flex-1 w-full">
          {currentTab === 'overview' && (
            <HomePage onSelectTab={setCurrentTab} />
          )}
          {currentTab === 'investigations' && (
            <NationalInvestigationsPage
              onNavigate={(tab) => setCurrentTab(tab)}
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
          {currentTab === 'laboratories' && (
            <LaboratoriesHub onSelectLab={setCurrentTab} />
          )}
        </main>
      ) : (
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {currentTab === 'graphing' && (
          <LabContainer
            labId="graphing"
            title="Function & Graphing Studio"
            category="Continuous Analysis"
            onBack={() => setCurrentTab('laboratories')}
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
      )}

      {/* Single Unified Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Utility Modals (Search, Contact) */}
      <SearchAndUtilityModals
        activeModal={utilityModal}
        onClose={() => setUtilityModal(null)}
        onSelectTab={setCurrentTab}
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
