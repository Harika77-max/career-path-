import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ResumeUploadPage } from './components/ResumeUploadPage';
import { TargetJobPage } from './components/TargetJobPage';
import { AiAnalysisScreen } from './components/AiAnalysisScreen';
import { MainDashboard } from './components/MainDashboard';
import KineticGridDemo from './components/ui/demo';

import Background3D from './components/ui/Background3D';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderRoute = () => {
    switch (currentRoute) {
      case '/':
        return <LandingPage />;
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/resume-upload':
        return <ResumeUploadPage />;
      case '/target-job':
        return <TargetJobPage />;
      case '/analyzing':
        return <AiAnalysisScreen />;
      case '/dashboard':
        return <MainDashboard />;
      case '/demo':
        return <KineticGridDemo />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <Background3D 
      className="min-h-screen text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] antialiased"
      contentClassName="flex flex-col min-h-screen"
    >
      <Navbar />
      <main className="flex-1">
        {renderRoute()}
      </main>
      <Footer />
    </Background3D>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
