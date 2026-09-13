import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  Award, 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Send, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  IndianRupee, 
  ArrowRight,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

export const JobReadinessView: React.FC = () => {
  const { 
    targetJob, 
    resumeData, 
    careerAnalysis,
    dynamicReadinessScore, 
    isJobReady, 
    skillProgressList, 
    jobRecommendations, 
    interviewQuestions,
    triggerJobReadyCelebration,
    simulateCompleteMastery,
    resetAllProgress
  } = useApp();

  const [expandedInterviewQuestion, setExpandedInterviewQuestion] = useState<string | null>('q-1');
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const handleApplyJob = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds(prev => [...prev, jobId]);
      triggerJobReadyCelebration();
    }
  };

  // AI-Tailored Resume Bullets for the target role
  const resumeBullets = [
    `Engineered scalable machine learning pipelines using Python and Scikit-Learn, reducing feature engineering latency by 35%.`,
    `Implemented deep learning neural architectures in PyTorch for high-dimensional dataset classification with 94.2% test accuracy.`,
    `Structured optimized relational schemas and complex SQL window queries to process over 500k analytical transactions efficiently.`,
    `Built containerized REST inference endpoints using FastAPI and Docker, integrated with automated CI/CD GitHub action workflows.`
  ];

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  return (
    <div className="space-y-8" id="job-readiness-view-root">
      
      {/* Header Banner */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-white">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              STEP 14 — JOB READINESS & PLACEMENT ENGINE
            </span>
            {isJobReady && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Sparkles className="w-3 h-3 fill-current" /> Certified Ready
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Career Readiness Evaluation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Live benchmark assessment for <span className="font-bold text-white">{targetJob?.title || 'AI/ML Engineer'}</span>. Bridge the final milestone to unlock direct recruiter referrals and verified competency badges.
          </p>
        </div>

        {/* Simulation / Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {!isJobReady ? (
            <button
              type="button"
              onClick={simulateCompleteMastery}
              id="unlock-job-ready-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 active:scale-98 transition-all shadow-xs"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Simulate Job Ready (95%)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowCertificateModal(true)}
              id="view-certificate-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>View Readiness Certificate</span>
            </button>
          )}

          <button
            type="button"
            onClick={resetAllProgress}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            title="Reset to default score baseline"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* STEP 14 MAIN EVALUATION HERO CARD */}
      <div className={`p-8 rounded-3xl border transition-all ${
        isJobReady 
          ? 'bg-slate-900/80 backdrop-blur-xl text-white border-emerald-500/40 shadow-2xl' 
          : 'bg-slate-900/60 backdrop-blur-xl border-white/15 text-white shadow-2xl'
      }`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Target className="w-3.5 h-3.5" />
              <span>Target Benchmark: 85%+ Job Readiness</span>
            </div>

            {isJobReady ? (
              <>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center lg:justify-start gap-3">
                  <span>🎯 You are Job Ready!</span>
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Congratulations <span className="font-bold text-white">{resumeData.name}</span>! You have reached <span className="font-extrabold text-emerald-400">{dynamicReadinessScore}%</span> competency for the <span className="font-bold text-white">{targetJob?.title}</span> role. Your skills match the primary criteria demanded by top hiring partners.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Career Readiness: <span className="text-blue-400">{dynamicReadinessScore}%</span>
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  You are making strong progress! You are currently <span className="font-bold text-white">{Math.max(0, 85 - dynamicReadinessScore)}%</span> away from reaching the Job Ready benchmark. Complete today's learning plan and course modules to close the gap.
                </p>
              </>
            )}

            {/* Score Progression indicator (58% -> 64% -> 72% -> 85% -> 95%) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider block mb-2 text-slate-400">
                Readiness Progression Milestones
              </span>
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1">
                {[
                  { score: 58, label: 'Resume Baseline' },
                  { score: 64, label: 'Week 1 Tasks' },
                  { score: 72, label: 'Mid-Milestone' },
                  { score: 85, label: 'Job Ready 🎯' },
                  { score: 95, label: 'Top Candidate' }
                ].map((tier, idx) => {
                  const passed = dynamicReadinessScore >= tier.score;
                  return (
                    <div key={idx} className="flex items-center gap-2 shrink-0">
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 ${
                        passed 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white/10 text-white/40'
                      }`}>
                        {passed && <CheckCircle2 className="w-3 h-3" />}
                        <span>{tier.score}%</span>
                      </div>
                      {idx < 4 && (
                        <span className="text-xs text-white/30">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Big Circular Score Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 text-center shrink-0">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={isJobReady ? '#10b981' : '#3b82f6'}
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * dynamicReadinessScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">
                  {dynamicReadinessScore}%
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isJobReady ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {isJobReady ? 'Ready' : 'Score'}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <span className={`text-xs font-bold ${isJobReady ? 'text-emerald-300' : 'text-slate-300'}`}>
                {isJobReady ? 'All Essential Gaps Bridged' : '3 Skills In Final Progress'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Recommended Top Jobs & Resume Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Matched Job Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <span>Matching Industry Opportunities</span>
                </h2>
                <p className="text-xs text-slate-300">
                  Curated corporate hiring drives matched directly to your current skill profile.
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-400/30">
                4 Active Drives Found
              </span>
            </div>

            <div className="space-y-4">
              {jobRecommendations.map((job) => {
                const isApplied = appliedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    id={`job-opp-${job.id}`}
                    className="p-5 rounded-2xl border border-white/10 hover:border-blue-400/40 bg-white/5 hover:bg-white/10 transition-all space-y-4 text-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{job.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            job.urgency === 'Hot' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {job.urgency} Hiring
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1 font-medium">
                          <span className="flex items-center gap-1 font-semibold text-white">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {job.company}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-bold text-emerald-400">
                            <IndianRupee className="w-3.5 h-3.5" />
                            {job.salary}
                          </span>
                        </div>
                      </div>

                      {/* Match Badge */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <div className="text-right">
                          <span className="text-xs font-bold text-blue-400 block">
                            {job.matchScore}% Match
                          </span>
                          <span className="text-[10px] text-slate-400">Profile compatibility</span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Tags & Apply button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {job.requiredSkills.map(sk => (
                          <span key={sk} className="text-[11px] font-semibold bg-white/10 text-slate-200 px-2.5 py-1 rounded-md border border-white/10">
                            {sk}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyJob(job.id)}
                        disabled={isApplied}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 inline-flex items-center gap-1.5 ${
                          isApplied
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-98 shadow-2xs'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Application Submitted ✓</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Apply with Verified Profile</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mock Interview Questions Accordion */}
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white">Technical Interview Flashcards</h2>
                <p className="text-xs text-slate-300">High-frequency questions asked in top tier engineering screens.</p>
              </div>
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>

            <div className="space-y-3">
              {interviewQuestions.map((q) => {
                const isExpanded = expandedInterviewQuestion === q.id;
                return (
                  <div key={q.id} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                    <button
                      type="button"
                      onClick={() => setExpandedInterviewQuestion(isExpanded ? null : q.id)}
                      className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                          {q.topic} • {q.difficulty}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white block">
                          {q.question}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-slate-950/60 border-t border-white/10 space-y-2 text-xs">
                        <span className="font-bold text-white block">Benchmark Answer Structure:</span>
                        <p className="text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                          {q.idealAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 1 Col: AI Tailored Resume Bullets & Certificate Preview */}
        <div className="space-y-8">
          
          {/* Tailored Resume Bullets Generator */}
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-white/15 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">ATS Resume Bullets</h3>
                <span className="text-xs text-slate-400">Auto-tailored for {targetJob?.title}</span>
              </div>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>

            <p className="text-xs text-slate-300">
              Copy these calibrated bullet points directly into your resume to pass ATS filters for {targetJob?.title} roles:
            </p>

            <div className="space-y-3">
              {resumeBullets.map((bullet, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-200 space-y-2">
                  <p className="leading-relaxed font-medium">"{bullet}"</p>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleCopyBullet(bullet, idx)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300"
                    >
                      {copiedBulletIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Bullet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate of Readiness Card */}
          <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/60 border border-white/15 text-white p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-base font-bold">Career Readiness Pass</h3>
                <span className="text-xs text-blue-300">Aligned with SIH26101 Standards</span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              Export your verifiable skill report certifying completion of {careerAnalysis?.selectedTimeline} roadmap milestones.
            </p>

            <button
              type="button"
              onClick={() => setShowCertificateModal(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Preview & Export Certificate</span>
            </button>
          </div>

        </div>

      </div>

      {/* Certificate Modal Dialog */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-slate-900/95 backdrop-blur-2xl max-w-2xl w-full p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6 text-center relative animate-in fade-in zoom-in-95 duration-200 text-white">
            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>

            {/* Certificate Header */}
            <div className="border-4 border-double border-blue-400/40 p-8 rounded-2xl bg-white/5 space-y-6">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <Award className="w-8 h-8 text-yellow-400" />
                <span className="text-xs font-black uppercase tracking-widest">
                  CareerPath AI • Verified Competency Certificate
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Certificate of Career Readiness
                </h3>
                <p className="text-xs text-slate-300">This certifies that</p>
                <div className="text-xl sm:text-2xl font-black text-blue-400 border-b-2 border-white/20 inline-block px-8 pb-1">
                  {resumeData.name}
                </div>
              </div>

              <p className="text-xs text-slate-200 max-w-md mx-auto leading-relaxed">
                has demonstrated validated technical readiness and practical skill competence required for the position of <span className="font-bold text-white">{targetJob?.title}</span> with an overall score of <span className="font-bold text-emerald-400">{dynamicReadinessScore}%</span>.
              </p>

              {/* Skills verified pills */}
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {skillProgressList.slice(0, 5).map(s => (
                  <span key={s.skill} className="text-[10px] font-bold bg-white/10 text-white px-2.5 py-1 rounded-md border border-white/10">
                    {s.skill} ({s.currentPercent}%)
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 text-[10px] text-slate-400 font-mono">
                <span>Certificate ID: CP-SIH26101-{Date.now().toString().slice(-6)}</span>
                <span>Verification: iGOT & National Skill Standard</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500 inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-white/10 text-slate-200 hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
