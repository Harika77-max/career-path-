import React from 'react';
import { useApp } from '../context/AppContext';
import { SkillGapView } from './SkillGapView';
import { PersonalizedRoadmapView } from './PersonalizedRoadmapView';
import { DailyLearningPlanView } from './DailyLearningPlanView';
import { SmartTimetableView } from './SmartTimetableView';
import { IgotCoursesView } from './IgotCoursesView';
import { LearningProgressView } from './LearningProgressView';
import { JobReadinessView } from './JobReadinessView';
import { 
  BarChart2, 
  Map, 
  Clock, 
  Calendar, 
  GraduationCap, 
  Target, 
  ArrowLeft, 
  RefreshCw, 
  FileText,
  User,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { DashboardTabType } from '../types';

export const MainDashboard: React.FC = () => {
  const { 
    activeDashboardTab, 
    setActiveDashboardTab, 
    careerAnalysis, 
    targetJob, 
    resumeData, 
    user, 
    navigate,
    overallProgress,
    dynamicReadinessScore,
    isJobReady
  } = useApp();

  const tabs: { id: DashboardTabType; label: string; step: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'skill-gap', label: 'Skill Gap Analysis', step: 'STEP 6', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Personalized Roadmap', step: 'STEPS 7-8', icon: <Map className="w-4 h-4" /> },
    { id: 'daily-plan', label: 'Daily Learning Plan', step: 'STEP 9', icon: <Clock className="w-4 h-4" /> },
    { id: 'timetable', label: 'Smart Timetable', step: 'STEP 10', icon: <Calendar className="w-4 h-4" /> },
    { id: 'igot-courses', label: 'iGOT Courses', step: 'STEP 11', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'learning-progress', label: 'Learning Progress', step: 'STEPS 12-13', icon: <TrendingUp className="w-4 h-4" />, badge: `${overallProgress}%` },
    { id: 'job-readiness', label: 'Job Readiness', step: 'STEP 14', icon: <Award className="w-4 h-4" />, badge: isJobReady ? '🎯 Ready' : `${dynamicReadinessScore}%` },
  ];

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Profile & Target Status Strip */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-white/15 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow-xs shrink-0">
              {resumeData.name ? resumeData.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  {resumeData.name || user?.fullName || 'Student'}
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold">
                  Target: {targetJob?.title || 'AI/ML Engineer'}
                </span>
                {isJobReady && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-400/30">
                    🎯 Job Ready
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {resumeData.education} • {resumeData.college || 'Academic Campus'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Readiness Badge */}
            <div className="bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold flex items-center gap-2">
              <span className="text-slate-400 uppercase text-[10px]">Readiness:</span>
              <span className="text-blue-400">{dynamicReadinessScore}%</span>
            </div>

            <button
              onClick={() => navigate('/target-job')}
              id="dashboard-change-target-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
            >
              <Target className="w-3.5 h-3.5 text-blue-400" />
              <span>Change Target Job</span>
            </button>

            <button
              onClick={() => navigate('/resume-upload')}
              id="dashboard-update-resume-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Update Resume</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Steps 6 through 14) */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-2 rounded-2xl border border-white/15 shadow-2xl overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeDashboardTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDashboardTab(tab.id)}
                  id={`dashboard-tab-${tab.id}`}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-blue-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-white text-blue-600' : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                    }`}>
                      {tab.badge}
                    </span>
                  )}

                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                  }`}>
                    {tab.step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tab Body View */}
        <div className="pt-2">
          {activeDashboardTab === 'skill-gap' && (
            <SkillGapView onContinueToRoadmap={() => setActiveDashboardTab('roadmap')} />
          )}

          {activeDashboardTab === 'roadmap' && (
            <PersonalizedRoadmapView onContinueToDailyPlan={() => setActiveDashboardTab('daily-plan')} />
          )}

          {activeDashboardTab === 'daily-plan' && (
            <DailyLearningPlanView onContinueToTimetable={() => setActiveDashboardTab('timetable')} />
          )}

          {activeDashboardTab === 'timetable' && (
            <SmartTimetableView onContinueToIgot={() => setActiveDashboardTab('igot-courses')} />
          )}

          {activeDashboardTab === 'igot-courses' && (
            <IgotCoursesView onContinueToProgress={() => setActiveDashboardTab('learning-progress')} />
          )}

          {activeDashboardTab === 'learning-progress' && (
            <LearningProgressView onContinueToJobReadiness={() => setActiveDashboardTab('job-readiness')} />
          )}

          {activeDashboardTab === 'job-readiness' && (
            <JobReadinessView />
          )}
        </div>

      </div>
    </div>
  );
};

