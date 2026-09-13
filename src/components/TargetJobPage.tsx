import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Target, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Code, 
  BarChart3, 
  PieChart, 
  Layers, 
  Cloud, 
  Shield 
} from 'lucide-react';
import { TARGET_JOBS } from '../data/mockData';
import { TargetJobOption } from '../types';

export const TargetJobPage: React.FC = () => {
  const { targetJob, setTargetJob, startCareerAnalysis, navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const filteredJobs = TARGET_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.topSkills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectJob = (job: TargetJobOption) => {
    setTargetJob(job);
  };

  const handleAnalyze = () => {
    // Step 4 exact button: "Analyze My Career Gap" → triggers Step 5 processing
    startCareerAnalysis();
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Step Progression indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">
              4
            </span>
            <span className="font-bold text-white">STEP 4 — TARGET JOB</span>
          </div>
          <button
            onClick={() => navigate('/resume-upload')}
            className="text-slate-300 hover:text-white font-medium"
          >
            ← Back to Resume
          </button>
        </div>

        {/* EXACT Titles from spec */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            What is your target job?
          </h1>
          <p className="text-base text-slate-300">
            Choose the role you want to prepare for.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your dream job..."
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm font-medium shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-transparent focus:outline-hidden text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* 7 Target Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => {
            const isSelected = targetJob?.id === job.id;
            return (
              <div
                key={job.id}
                onClick={() => handleSelectJob(job)}
                id={`target-job-card-${job.id}`}
                className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative backdrop-blur-xl ${
                  isSelected
                    ? 'border-blue-400 bg-blue-600/25 ring-2 ring-blue-500/40 shadow-xl'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/25 hover:bg-slate-900/80 shadow-lg'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  }`}>
                    {getIcon(job.iconName)}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5">{job.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{job.description}</p>

                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] uppercase font-extrabold text-slate-400">Essential Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.topSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                            isSelected
                              ? 'bg-blue-500/30 text-white border border-blue-400/40 font-semibold'
                              : 'bg-white/10 text-slate-200'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{job.avgSalary}</span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                    {job.demand} Demand
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Confirmation Bar & Action Button */}
        {targetJob && (
          <div className="sticky bottom-6 bg-slate-900/80 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-300 block">Selected Target Role:</span>
                <span className="text-base font-extrabold text-white">
                  Your target: <strong className="text-blue-400">{targetJob.title}</strong>
                </span>
              </div>
            </div>

            {/* EXACT Button from spec: "Analyze My Career Gap" */}
            <button
              onClick={handleAnalyze}
              id="analyze-career-gap-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze My Career Gap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
