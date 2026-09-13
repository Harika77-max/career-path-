import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Sparkles, 
  Target, 
  TrendingUp, 
  HelpCircle 
} from 'lucide-react';
import { SkillGapItem } from '../types';

interface SkillGapViewProps {
  onContinueToRoadmap?: () => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({ onContinueToRoadmap }) => {
  const { careerAnalysis, targetJob, resumeData, setActiveDashboardTab } = useApp();

  if (!careerAnalysis) {
    return (
      <div className="p-8 text-center text-slate-500">
        No analysis profile available. Please run the career analysis first.
      </div>
    );
  }

  const {
    careerReadinessScore,
    summaryMessage,
    skillGaps,
    strongSkills,
    skillsToImprove,
    criticalGaps,
  } = careerAnalysis;

  const handleCreateRoadmap = () => {
    if (onContinueToRoadmap) {
      onContinueToRoadmap();
    } else {
      setActiveDashboardTab('roadmap');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Readiness Banner */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-300">
            <Target className="w-3.5 h-3.5" />
            <span>Target Role: {careerAnalysis.targetJob}</span>
          </div>
          
          {/* EXACT Title from spec */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your Skill Gap Analysis
          </h1>

          {/* EXACT Dynamic Message */}
          <p className="text-sm text-slate-300 leading-relaxed">
            {summaryMessage}
          </p>
        </div>

        {/* Readiness Score Card */}
        <div className="w-full md:w-auto bg-white/5 p-5 rounded-2xl border border-white/10 text-center shrink-0 min-w-[200px]">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Your Career Readiness
          </span>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-extrabold text-blue-400">
              {careerReadinessScore}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 100%</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${careerReadinessScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Categories Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 🟢 Strong Skills */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-emerald-500/30 shadow-xl flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-extrabold text-emerald-300">
                  🟢 Strong Skills
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {strongSkills.length} Verified
              </span>
            </div>
            
            <p className="text-xs text-slate-300 mb-4">
              Skills meeting or exceeding the entry benchmark for {targetJob?.title}.
            </p>

            <div className="space-y-2.5">
              {strongSkills.map((sk, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between">
                  <span className="font-bold text-white">{sk.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-300 font-semibold">{sk.currentLevel}%</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              ))}
              {strongSkills.length === 0 && (
                <p className="text-xs text-slate-400 italic">No verified strong skills recorded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* 🟡 Skills to Improve */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-amber-500/30 shadow-xl flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <h3 className="text-sm font-extrabold text-amber-300">
                  🟡 Skills to Improve
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {skillsToImprove.length} In Progress
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Moderate gaps (15-35%) required for proficient workplace output.
            </p>

            <div className="space-y-2.5">
              {skillsToImprove.map((sk, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{sk.skill}</span>
                    <span className="text-amber-300 font-bold">Gap: -{sk.gap}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Current: {sk.currentLevel}%</span>
                    <span>Required: {sk.requiredLevel}%</span>
                  </div>
                </div>
              ))}
              {skillsToImprove.length === 0 && (
                <p className="text-xs text-slate-400 italic">No moderate gap skills.</p>
              )}
            </div>
          </div>
        </div>

        {/* 🔴 Critical Skill Gaps */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-rose-500/30 shadow-xl flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <h3 className="text-sm font-extrabold text-rose-300">
                  🔴 Critical Skill Gaps
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-400/30">
                {criticalGaps.length} Priority
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Major skill bottlenecks (&gt;35% gap) essential for technical screens.
            </p>

            <div className="space-y-2.5">
              {criticalGaps.map((sk, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{sk.skill}</span>
                    <span className="text-rose-300 font-extrabold">Gap: -{sk.gap}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Current: {sk.currentLevel}%</span>
                    <span>Required: {sk.requiredLevel}%</span>
                  </div>
                </div>
              ))}
              {criticalGaps.length === 0 && (
                <p className="text-xs text-slate-400 italic">No critical gaps identified.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Detailed Skill Comparison Table: CURRENT SKILL vs REQUIRED SKILL */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              CURRENT SKILL vs REQUIRED SKILL Breakdown
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Quantitative comparison calculated from {resumeData.name}'s resume vs. {targetJob?.title} hiring requirements.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {skillGaps.map((item, idx) => (
            <div
              key={idx}
              id={`skill-gap-row-${idx}`}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="sm:w-1/3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    item.statusCategory === 'Strong'
                      ? 'bg-emerald-400'
                      : item.statusCategory === 'Improve'
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`} />
                  <span className="font-bold text-sm text-white">{item.skill}</span>
                </div>
                <span className="text-[11px] text-slate-400 ml-4.5 block">{item.category}</span>
              </div>

              <div className="sm:w-1/2 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Current: <strong className="text-white">{item.currentLevel}%</strong></span>
                  <span>Required: <strong className="text-blue-300">{item.requiredLevel}%</strong></span>
                </div>
                
                {/* Visual Comparative Bar */}
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden relative">
                  <div
                    className="bg-blue-500/40 h-full rounded-full absolute top-0 left-0"
                    style={{ width: `${item.requiredLevel}%` }}
                    title={`Required: ${item.requiredLevel}%`}
                  />
                  <div
                    className={`h-full rounded-full absolute top-0 left-0 ${
                      item.statusCategory === 'Strong' ? 'bg-emerald-500' : item.statusCategory === 'Improve' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${item.currentLevel}%` }}
                    title={`Current: ${item.currentLevel}%`}
                  />
                </div>
              </div>

              <div className="sm:w-1/6 flex sm:justify-end items-center gap-2">
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${
                  item.priority === 'Critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : item.priority === 'High'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* EXACT Action Button: "Create My Personalized Roadmap" */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Proceed to Step 7 & 8 to generate custom curricula based on your available study time.
          </span>
          <button
            type="button"
            onClick={handleCreateRoadmap}
            id="create-personalized-roadmap-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create My Personalized Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
