import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Target, 
  BarChart2, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles,
  Calendar,
  Clock,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';
import { TARGET_JOBS } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { navigate, loadSampleResume } = useApp();

  const handleStart = () => {
    // Exact spec: When user clicks Get Started or Login → Open Login page
    navigate('/login');
  };

  const stepsOverview = [
    { num: '01', title: 'Upload Resume', desc: 'Parse known skills, languages & projects from PDF/DOCX.' },
    { num: '02', title: 'Target Role', desc: 'Select AI/ML, Full Stack, Data Science, or 5+ target paths.' },
    { num: '03', title: 'AI Gap Analysis', desc: 'Benchmark current vs. required proficiency with precision scores.' },
    { num: '04', title: 'Personalized Roadmap', desc: 'Custom 3 to 12 month month-by-month curricula tailored to your study hours.' },
    { num: '05', title: 'Daily Plan & Timetable', desc: 'Actionable daily tasks and editable weekly smart schedules.' },
    { num: '06', title: 'iGOT Courses', desc: 'Government-aligned NSQF competency modules for verified readiness.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-20 lg:pt-24 lg:pb-32 bg-transparent border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-300 mb-6 shadow-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>CareerPath AI • Precision Competency Engine</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-300 font-medium">SIH26101 Aligned</span>
          </div>

          {/* EXACT Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Build the Skills Your <span className="text-blue-400">Dream Job Requires</span>
          </h1>

          {/* EXACT Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Upload your resume, choose your target job, discover your skill gaps, and follow a personalized learning roadmap to become job-ready.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <button
              onClick={handleStart}
              id="landing-hero-get-started-btn"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleStart}
              id="landing-hero-login-btn"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all shadow-xs"
            >
              <span>Login</span>
            </button>
          </div>

          {/* Quick Demo Shortcut */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
            <span>Quick Start with Demo Data:</span>
            <button
              onClick={() => {
                loadSampleResume(0);
                navigate('/resume-upload');
              }}
              id="landing-quick-demo-btn"
              className="font-bold text-blue-400 hover:text-blue-300 hover:underline"
            >
              Nagasankar (AI/ML Aspirant) →
            </button>
          </div>
        </div>
      </section>

      {/* 6-Step Visual Journey */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-xs font-bold text-blue-400 tracking-wider uppercase">Connected Journey</h2>
            <p className="text-3xl font-extrabold text-white">
              How CareerPath AI Guides You Step-by-Step
            </p>
            <p className="text-sm text-slate-300">
              An end-to-end framework from diagnostic resume extraction to job placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stepsOverview.map((st, idx) => (
              <div 
                key={idx}
                id={`journey-card-${idx}`}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      STEP {st.num}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">0{idx + 1}/06</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleStart}
              id="journey-cta-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-xs"
            >
              <span>Begin With Step 1 (Login)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Target Careers Showcase */}
      <section className="py-20 bg-transparent border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-xs font-bold text-blue-400 tracking-wider uppercase">Supported Target Roles</h2>
            <p className="text-3xl font-extrabold text-white">
              Industry Standard Job Competencies
            </p>
            <p className="text-sm text-slate-300">
              Calibrated against hiring benchmarks and government NSQF frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TARGET_JOBS.slice(0, 4).map((job, idx) => (
              <div 
                key={idx}
                id={`target-role-preview-${idx}`}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 font-bold mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{job.title}</h3>
                  <p className="text-xs text-slate-300 mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="space-y-1 mb-4">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Key Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {job.topSkills.slice(0, 3).map((sk, sIdx) => (
                        <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/15">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{job.avgSalary}</span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">{job.demand} Demand</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* iGOT Karmayogi Demo Integration Banner */}
      <section className="py-16 bg-transparent border-t border-white/10 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>iGOT Karmayogi & NSQF Aligned</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Seamless National Competency Alignment
          </h2>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Mapped with the Government of India's FRAC (Framework for Roles, Activities, and Competencies) to deliver certified, verifiable public sector and industry skill development modules.
          </p>

          <div className="pt-2">
            <button
              onClick={handleStart}
              id="landing-igot-cta-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-xs border border-blue-400/30"
            >
              <span>Get Started with CareerPath AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
