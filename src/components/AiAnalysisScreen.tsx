import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Target, 
  BrainCircuit,
  FileSearch,
  Layers
} from 'lucide-react';

export const AiAnalysisScreen: React.FC = () => {
  const { navigate, targetJob, resumeData, setActiveDashboardTab } = useApp();

  // The EXACT 7 status steps specified in Step 5
  const analysisSteps = [
    'Reading resume',
    'Extracting skills',
    'Understanding experience',
    'Analyzing target job',
    'Identifying required skills',
    'Comparing your skills',
    'Calculating skill gaps',
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (currentStepIndex < analysisSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      setIsCompleted(true);
    }
  }, [currentStepIndex, analysisSteps.length]);

  const handleProceed = () => {
    setActiveDashboardTab('skill-gap');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-xl w-full bg-slate-900/60 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-white/15 shadow-2xl space-y-8 text-white">
        
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            {isCompleted ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-300" />
            ) : (
              <BrainCircuit className="w-8 h-8 animate-pulse" />
            )}
          </div>

          {/* EXACT Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Analyzing Your Career Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Targeting: <strong className="text-blue-400 font-bold">{targetJob?.title || 'AI/ML Engineer'}</strong> • Profile: <strong className="text-white">{resumeData.name}</strong>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-300">
            <span>Core AI Verification</span>
            <span>{Math.round((Math.min(currentStepIndex, analysisSteps.length) / analysisSteps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(Math.min(currentStepIndex, analysisSteps.length) / analysisSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* The 7 Status Items */}
        <div className="space-y-2.5 bg-white/5 p-5 rounded-2xl border border-white/10">
          {analysisSteps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex && !isCompleted;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all ${
                  isDone
                    ? 'text-emerald-300'
                    : isCurrent
                    ? 'text-blue-400 font-bold'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                )}
                <span>✓ {step}</span>
              </div>
            );
          })}
        </div>

        {/* Analysis Complete Banner & Action */}
        {isCompleted && (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center text-emerald-200 space-y-1">
              <span className="text-base font-extrabold block text-emerald-300">✓ Analysis Complete</span>
              <span className="text-xs text-emerald-200 block">
                Your personalized skill gaps, readiness score, and roadmap are ready.
              </span>
            </div>

            <button
              onClick={handleProceed}
              id="view-skill-gap-analysis-btn"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>View Skill Gap Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
