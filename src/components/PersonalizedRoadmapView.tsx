import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Target, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  FolderKanban, 
  Award,
  Layers
} from 'lucide-react';
import { TimelineOption, DailyStudyOption } from '../types';

interface PersonalizedRoadmapViewProps {
  onContinueToDailyPlan?: () => void;
}

export const PersonalizedRoadmapView: React.FC<PersonalizedRoadmapViewProps> = ({ onContinueToDailyPlan }) => {
  const { 
    careerAnalysis, 
    selectedTimeline, 
    selectedDailyStudy, 
    updateRoadmapSettings, 
    setActiveDashboardTab,
    targetJob 
  } = useApp();

  const timelineOptions: TimelineOption[] = ['3 Months', '6 Months', '9 Months', '12 Months'];
  const dailyStudyOptions: DailyStudyOption[] = ['30 minutes', '1 hour', '2 hours', '3 hours', '4 hours'];

  if (!careerAnalysis) {
    return (
      <div className="p-8 text-center text-slate-500">
        Please complete the career analysis first.
      </div>
    );
  }

  const handleTimelineChange = (t: TimelineOption) => {
    updateRoadmapSettings(t, selectedDailyStudy);
  };

  const handleStudyChange = (s: DailyStudyOption) => {
    updateRoadmapSettings(selectedTimeline, s);
  };

  const handleContinue = () => {
    if (onContinueToDailyPlan) {
      onContinueToDailyPlan();
    } else {
      setActiveDashboardTab('daily-plan');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* STEP 7: Interactive Questionnaire Preference Cards */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
            STEP 7 — PERSONALIZED ROADMAP CONFIGURATION
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Tailor Your Learning Timeline & Daily Capacity
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Your curriculum, weekly topics, and daily tasks adapt dynamically based on your available study time and target deadline.
          </p>
        </div>

        {/* Question 1: Timeline */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <label className="block text-xs font-bold text-slate-200">
            How much time do you want to take to reach your goal?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timelineOptions.map((opt) => {
              const isSelected = selectedTimeline === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleTimelineChange(opt)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border text-center ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-500/40'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2: Daily Study Time */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <label className="block text-xs font-bold text-slate-200">
            How much time can you study every day?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {dailyStudyOptions.map((opt) => {
              const isSelected = selectedDailyStudy === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleStudyChange(opt)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-500/40'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP 8: Generated Roadmap Overview Banner */}
      <div className="bg-blue-600/80 backdrop-blur-xl border border-blue-400/40 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200">
          <Sparkles className="w-4 h-4 text-blue-300" />
          <span>STEP 8 — PERSONALIZED ROADMAP GENERATION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
          <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
            <span className="text-[10px] font-bold uppercase text-blue-200 block">TARGET:</span>
            <span className="text-base font-extrabold text-white">{careerAnalysis.targetJob}</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
            <span className="text-[10px] font-bold uppercase text-blue-200 block">TIMELINE:</span>
            <span className="text-base font-extrabold text-white">{selectedTimeline}</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
            <span className="text-[10px] font-bold uppercase text-blue-200 block">DAILY STUDY:</span>
            <span className="text-base font-extrabold text-white">{selectedDailyStudy}</span>
          </div>
        </div>
      </div>

      {/* Month-by-Month Roadmap Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            Month-by-Month Structured Curriculum
          </h3>
          <span className="text-xs font-semibold text-slate-300">
            {careerAnalysis.monthlyRoadmap.length} Sequential Modules
          </span>
        </div>

        <div className="space-y-5">
          {careerAnalysis.monthlyRoadmap.map((mod) => (
            <div
              key={mod.month}
              id={`roadmap-month-card-${mod.month}`}
              className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-white/15 shadow-xl space-y-4 hover:border-blue-400/40 transition-all text-white"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center font-extrabold text-sm shrink-0">
                    M{mod.month}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {mod.title}
                  </h4>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-slate-200 w-fit">
                  Month {mod.month} of {careerAnalysis.monthlyRoadmap.length}
                </span>
              </div>

              {/* Focus Topics */}
              <div>
                <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-2">
                  Key Focus Areas & Modules:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mod.focusTopics.map((topic, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-semibold">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Breakdown */}
              {mod.weeklyBreakdown && mod.weeklyBreakdown.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    Weekly Schedule Breakdown:
                  </span>
                  <div className="space-y-1 text-xs text-slate-300 pl-2 border-l-2 border-blue-400/40">
                    {mod.weeklyBreakdown.map((wb, wIdx) => (
                      <div key={wIdx} className="py-0.5">{wb}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Milestone & Projects */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Milestone:</strong> {mod.milestone}</span>
                </div>
                {mod.projects && mod.projects.length > 0 && (
                  <div className="flex items-center gap-2 text-blue-300 font-semibold">
                    <FolderKanban className="w-4 h-4 shrink-0" />
                    <span>Project: {mod.projects[0]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: "View Daily Learning Plan" -> Step 9 */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            id="roadmap-continue-to-daily-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
          >
            <span>Proceed to Step 9 — Daily Learning Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
