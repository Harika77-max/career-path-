import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Clock, 
  BookOpen, 
  Zap, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Play, 
  Plus, 
  Check, 
  RefreshCw, 
  GraduationCap,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from 'recharts';

interface LearningProgressViewProps {
  onContinueToJobReadiness?: () => void;
}

export const LearningProgressView: React.FC<LearningProgressViewProps> = ({ onContinueToJobReadiness }) => {
  const { 
    careerAnalysis,
    overallProgress,
    skillProgressList,
    courseProgressList,
    totalStudyHours,
    weeklyTargetHours,
    completedDailyTasksCount,
    totalDailyTasksCount,
    streakDays,
    dailyTasks,
    toggleDailyTask,
    weeklyTimetable,
    showDailyCompletionAlert,
    dismissDailyCompletionAlert,
    advanceCourseProgress,
    logStudySession,
    boostSkillLevel,
    dynamicReadinessScore,
    isJobReady,
    simulateCompleteMastery,
    resetAllProgress,
    setActiveDashboardTab,
    targetJob
  } = useApp();

  const [selectedSkillForPractice, setSelectedSkillForPractice] = useState<string | null>(null);
  const [practiceAnswerSelected, setPracticeAnswerSelected] = useState<number | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [showLogHoursModal, setShowLogHoursModal] = useState<boolean>(false);
  const [logMinutesInput, setLogMinutesInput] = useState<number>(45);
  const [logSubjectInput, setLogSubjectInput] = useState<string>(skillProgressList[0]?.skill || 'Python');

  // Weekly study data for recharts
  const weeklyChartData = [
    { day: 'Mon', hours: 2.2, target: 2.0, completedTasks: 4 },
    { day: 'Tue', hours: 2.5, target: 2.0, completedTasks: 3 },
    { day: 'Wed', hours: 1.8, target: 2.0, completedTasks: 3 },
    { day: 'Thu', hours: 2.0, target: 2.0, completedTasks: 3 },
    { day: 'Fri', hours: 2.3, target: 2.0, completedTasks: 3 },
    { day: 'Sat', hours: 3.5, target: 2.0, completedTasks: 2 },
    { day: 'Sun', hours: 1.5, target: 2.0, completedTasks: 2 },
  ];

  const handlePracticeSubmit = () => {
    if (practiceAnswerSelected !== null && selectedSkillForPractice) {
      setPracticeSubmitted(true);
      boostSkillLevel(selectedSkillForPractice, 8);
    }
  };

  const handleClosePractice = () => {
    setSelectedSkillForPractice(null);
    setPracticeAnswerSelected(null);
    setPracticeSubmitted(false);
  };

  const handleSaveStudyHours = (e: React.FormEvent) => {
    e.preventDefault();
    logStudySession(logMinutesInput, logSubjectInput);
    setShowLogHoursModal(false);
  };

  const handleNavigateNext = () => {
    if (onContinueToJobReadiness) {
      onContinueToJobReadiness();
    } else {
      setActiveDashboardTab('job-readiness');
    }
  };

  // Quick practice questions mapped to skills
  const practiceQuestions: Record<string, { q: string; options: string[]; correctIdx: number; explanation: string }> = {
    'Python': {
      q: 'Which built-in Python function or operator is used to iterate with index tracking efficiently without manual counters?',
      options: ['range(len(list))', 'enumerate()', 'zip_longest()', 'iter.next()'],
      correctIdx: 1,
      explanation: 'enumerate() yields a tuple containing a count and the values obtained from iterating over the sequence in O(1) auxiliary overhead.'
    },
    'DSA': {
      q: 'What is the average time complexity of searching in an optimized Balanced Binary Search Tree (AVL / Red-Black Tree)?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correctIdx: 1,
      explanation: 'Balanced BSTs maintain height invariant h <= c * log(N), guaranteeing O(log N) worst-case and average lookup time.'
    },
    'Machine Learning': {
      q: 'Which technique is most effective for preventing overfitting when training tree ensembles like XGBoost or Random Forests?',
      options: ['Increasing tree depth to infinity', 'Restricting max_depth & increasing min_child_weight', 'Disabling regularization (L1/L2)', 'Removing all cross-validation'],
      correctIdx: 1,
      explanation: 'Pruning maximum tree depth and enforcing minimum samples per leaf prevents the model from memorizing training dataset noise.'
    },
    'SQL': {
      q: 'Which SQL clause is used to calculate aggregate rankings without collapsing distinct rows in analytical reporting?',
      options: ['GROUP BY', 'WINDOW / OVER ()', 'HAVING COUNT()', 'WHERE EXISTS'],
      correctIdx: 1,
      explanation: 'Window functions (like DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)) perform calculations across row sets while retaining individual rows.'
    }
  };

  return (
    <div className="space-y-8" id="learning-progress-view-root">
      
      {/* Header Banner */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-white">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              STEP 12 & 13 — PROGRESS & COMPLETION
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Live Tracker
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Learning Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Real-time tracking of your skill mastery, daily task completions, iGOT course modules, and study consistency towards your target role as <span className="font-bold text-white">{targetJob?.title || 'AI/ML Engineer'}</span>.
          </p>
        </div>

        {/* Quick Actions / Simulation Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLogHoursModal(true)}
            id="log-study-hours-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/10 text-white hover:bg-white/20 active:scale-98 transition-all border border-white/15"
          >
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Log Study Hours</span>
          </button>

          <button
            type="button"
            onClick={simulateCompleteMastery}
            id="simulate-mastery-btn"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 active:scale-98 transition-all shadow-xs"
            title="Simulate all tasks & courses completed to see the Job Ready state instantly"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Simulate 100% Completion</span>
          </button>
        </div>
      </div>

      {/* STEP 13: Daily Completion Feedback Banner */}
      {showDailyCompletionAlert && (
        <div 
          id="daily-completion-alert-banner"
          className="bg-emerald-500/20 border-2 border-emerald-400/40 p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-md text-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                Daily Goal Achieved!
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Great job! You completed today's learning plan.
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Your Overall Progress increased to <span className="font-bold text-white">{overallProgress}%</span> and your Career Readiness Score updated to <span className="font-bold text-white">{dynamicReadinessScore}%</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={handleNavigateNext}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Readiness</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={dismissDailyCompletionAlert}
              className="p-2 text-emerald-300 hover:text-white text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Core Progress Metrics Grid (4 Key Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Overall Learning Progress */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Overall Learning
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">{overallProgress}%</span>
              <span className="text-xs font-bold text-emerald-400">
                {overallProgress > 42 ? `+${overallProgress - 42}% this week` : 'On track'}
              </span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mt-3">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <span className="text-[11px] text-slate-400">
            Target Milestone: Month 1 Competency
          </span>
        </div>

        {/* Metric 2: Career Readiness Score */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Career Readiness
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-indigo-400">{dynamicReadinessScore}%</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isJobReady ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {isJobReady ? '🎯 Job Ready' : 'In Training'}
              </span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mt-3">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${dynamicReadinessScore}%` }}
              />
            </div>
          </div>

          <span className="text-[11px] text-slate-400">
            {isJobReady ? 'Qualified for matching roles' : 'Threshold: 85% to qualify'}
          </span>
        </div>

        {/* Metric 3: Study Hours Logged */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Study Hours
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">{totalStudyHours}h</span>
              <span className="text-xs text-slate-400">/ {weeklyTargetHours}h target</span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mt-3">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalStudyHours / weeklyTargetHours) * 100)}%` }}
              />
            </div>
          </div>

          <span className="text-[11px] text-slate-400">
            Paced for {careerAnalysis?.selectedTimeline || '6 Months'} roadmap
          </span>
        </div>

        {/* Metric 4: Daily Tasks & Active Streak */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/15 shadow-xl flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Daily Tasks & Streak
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-300 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">
                {completedDailyTasksCount}/{totalDailyTasksCount}
              </span>
              <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
                <Flame className="w-3 h-3 fill-current" />
                {streakDays} Day Streak
              </span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mt-3">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalDailyTasksCount > 0 ? (completedDailyTasksCount / totalDailyTasksCount) * 100 : 0}%` }}
              />
            </div>
          </div>

          <span className="text-[11px] text-slate-400">
            {completedDailyTasksCount === totalDailyTasksCount ? 'All tasks complete for today!' : 'Complete remaining tasks to keep streak'}
          </span>
        </div>

      </div>

      {/* Main Content Layout: Left 2 cols (Skill Progress & Weekly Chart) + Right 1 col (Today's Tasks & Course Modules) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 spans): Skill Mastery & Weekly Chart */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Skill Progress Section (Step 12 Specification) */}
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white">Skill Progress Breakdown</h2>
                <p className="text-xs text-slate-300">
                  Real-time competence levels across required technical disciplines.
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                Click "Practice" to boost any skill
              </span>
            </div>

            <div className="space-y-4">
              {skillProgressList.map((skillItem) => {
                const isMastered = skillItem.currentPercent >= skillItem.targetPercent;
                return (
                  <div 
                    key={skillItem.skill}
                    id={`skill-progress-bar-${skillItem.skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="p-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 transition-all text-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{skillItem.skill}</span>
                        <span className="text-[10px] text-slate-400 font-medium hidden sm:inline-block">
                          ({skillItem.category})
                        </span>
                        {isMastered && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                            <Check className="w-2.5 h-2.5" /> Met Target
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-blue-400">
                          {skillItem.currentPercent}%
                        </span>
                        <span className="text-xs text-slate-400">
                          / {skillItem.targetPercent}% target
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSkillForPractice(skillItem.skill);
                            setPracticeAnswerSelected(null);
                            setPracticeSubmitted(false);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/10 text-blue-300 border border-white/15 hover:bg-blue-500/20 transition-colors shadow-2xs"
                        >
                          Practice
                        </button>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${skillItem.currentPercent}%`,
                          backgroundColor: isMastered ? '#10b981' : skillItem.color || '#3b82f6'
                        }}
                      />
                      {/* Target marker */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
                        style={{ left: `${skillItem.targetPercent}%` }}
                        title={`Target: ${skillItem.targetPercent}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Progress Chart (Visual Activity) */}
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white">Weekly Study Activity</h2>
                <p className="text-xs text-slate-300">
                  Hours logged per day compared against your daily study benchmark.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-blue-500" />
                  <span>Logged Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-white/20" />
                  <span>Daily Target</span>
                </div>
              </div>
            </div>

            {/* Recharts Bar Graph */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} unit="h" />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-950/90 backdrop-blur-xl text-white p-3 rounded-xl shadow-xl border border-white/15 text-xs space-y-1">
                            <span className="font-bold block text-slate-200">{data.day} Study Report</span>
                            <div>Hours Studied: <span className="font-bold text-blue-400">{data.hours} hrs</span></div>
                            <div>Target Hours: <span className="text-slate-400">{data.target} hrs</span></div>
                            <div>Tasks Completed: <span className="text-emerald-400">{data.completedTasks} tasks</span></div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                    {weeklyChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.hours >= entry.target ? '#3b82f6' : '#64748b'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column (1 span): Interactive Daily Tasks & iGOT Course Progress */}
        <div className="space-y-8">
          
          {/* Today's Learning Tasks Checkoff */}
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-white/15 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Today's Tasks</h3>
                <span className="text-xs text-slate-400">{completedDailyTasksCount} of {totalDailyTasksCount} done</span>
              </div>
              <span className="text-xs font-bold text-blue-400">
                {totalDailyTasksCount > 0 ? Math.round((completedDailyTasksCount / totalDailyTasksCount) * 100) : 0}%
              </span>
            </div>

            <div className="space-y-2.5">
              {dailyTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleDailyTask(task.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    task.completed 
                      ? 'bg-emerald-500/15 border-emerald-500/30' 
                      : 'bg-white/5 border-white/10 hover:border-blue-400/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        task.completed ? 'bg-emerald-500 text-white' : 'border border-white/30 bg-white/5'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-xs font-semibold ${task.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/10 shrink-0">
                    {task.durationMinutes}m
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-2">
              Checking off tasks automatically updates your overall progress and readiness.
            </p>
          </div>

          {/* Enrolled iGOT Course Modules Progress */}
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-white/15 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Enrolled Courses</h3>
                <span className="text-xs text-slate-400">Government certified tracks</span>
              </div>
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>

            <div className="space-y-3.5">
              {courseProgressList.slice(0, 3).map((course) => (
                <div key={course.id} className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-white line-clamp-1 block">
                        {course.courseName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {course.provider} • {course.completedModules}/{course.totalModules} Modules
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      course.progressPercent >= 100 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {course.progressPercent}%
                    </span>
                  </div>

                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => advanceCourseProgress(course.id)}
                      disabled={course.progressPercent >= 100}
                      className="text-[11px] font-bold text-blue-400 hover:text-blue-300 disabled:text-slate-500 inline-flex items-center gap-1"
                    >
                      <span>{course.progressPercent >= 100 ? 'Course Complete ✓' : 'Complete Next Module +20%'}</span>
                      {course.progressPercent < 100 && <ChevronRight className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Step Navigation Card */}
          <div className="bg-blue-600/80 backdrop-blur-xl border border-blue-400/40 text-white p-6 rounded-2xl shadow-xl space-y-4">
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block">
              STEP 14 — FINAL EVALUATION
            </span>
            <h3 className="text-lg font-bold">
              Check Career Readiness & Job Matches
            </h3>
            <p className="text-xs text-slate-200">
              Discover verified corporate hiring drives, ATS resume bullet generators, and mock technical interview questions.
            </p>
            <button
              type="button"
              onClick={handleNavigateNext}
              id="proceed-to-job-readiness-btn"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-xs"
            >
              <span>Proceed to Step 14 — Job Readiness</span>
              <ArrowRight className="w-4 h-4 text-[#1e3a8a]" />
            </button>
          </div>

        </div>

      </div>

      {/* Interactive Quick Practice Modal */}
      {selectedSkillForPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-slate-900/95 backdrop-blur-2xl max-w-lg w-full p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Mastery Diagnostic Quiz
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  {selectedSkillForPractice} Quick Challenge
                </h3>
              </div>
              <button 
                type="button" 
                onClick={handleClosePractice}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {practiceQuestions[selectedSkillForPractice] ? (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-slate-200">
                  {practiceQuestions[selectedSkillForPractice].q}
                </p>

                <div className="space-y-2">
                  {practiceQuestions[selectedSkillForPractice].options.map((option, idx) => {
                    const isSelected = practiceAnswerSelected === idx;
                    const isCorrect = idx === practiceQuestions[selectedSkillForPractice].correctIdx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => !practiceSubmitted && setPracticeAnswerSelected(idx)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                          practiceSubmitted
                            ? isCorrect
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                              : isSelected
                                ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                                : 'bg-white/5 border-white/10 text-slate-400 opacity-60'
                            : isSelected
                              ? 'bg-blue-500/20 border-blue-400 text-blue-300 font-bold'
                              : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                        }`}
                      >
                        <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {practiceSubmitted && (
                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300">
                    <span className="font-bold text-white block mb-1">Concept Explanation:</span>
                    {practiceQuestions[selectedSkillForPractice].explanation}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  {!practiceSubmitted ? (
                    <button
                      type="button"
                      onClick={handlePracticeSubmit}
                      disabled={practiceAnswerSelected === null}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleClosePractice}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                    >
                      Completed (+8% Skill Boost)
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Ready to test your practical knowledge in {selectedSkillForPractice}? Complete a quick 10-minute LeetCode or Project challenge to reinforce this topic.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      boostSkillLevel(selectedSkillForPractice, 8);
                      handleClosePractice();
                    }}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500"
                  >
                    Mark Diagnostic Complete (+8%)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Log Study Session Modal */}
      {showLogHoursModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <form onSubmit={handleSaveStudyHours} className="bg-slate-900/95 backdrop-blur-2xl max-w-md w-full p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Log Study Session</h3>
              <button 
                type="button" 
                onClick={() => setShowLogHoursModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Subject / Skill Focused On:
                </label>
                <select
                  value={logSubjectInput}
                  onChange={(e) => setLogSubjectInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/15 text-xs font-semibold text-white bg-slate-800"
                >
                  {skillProgressList.map(s => (
                    <option key={s.skill} value={s.skill} className="bg-slate-800 text-white">{s.skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Time Spent (Minutes):
                </label>
                <input
                  type="number"
                  min="15"
                  max="360"
                  step="15"
                  value={logMinutesInput}
                  onChange={(e) => setLogMinutesInput(parseInt(e.target.value) || 30)}
                  className="w-full p-3 rounded-xl border border-white/20 text-xs font-semibold text-white bg-transparent focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogHoursModal(false)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500"
              >
                Save & Update Progress
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
