import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Code, 
  HelpCircle,
  Award
} from 'lucide-react';

interface DailyLearningPlanViewProps {
  onContinueToTimetable?: () => void;
}

export const DailyLearningPlanView: React.FC<DailyLearningPlanViewProps> = ({ onContinueToTimetable }) => {
  const { 
    careerAnalysis, 
    selectedDailyStudy, 
    dailyTasks, 
    toggleDailyTask, 
    setActiveDashboardTab,
    targetJob 
  } = useApp();

  const [activeTimerTask, setActiveTimerTask] = useState<string | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showActiveSessionModal, setShowActiveSessionModal] = useState<boolean>(false);

  // Calculate completed percentage
  const totalTasks = dailyTasks.length;
  const completedTasks = dailyTasks.filter(t => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Total time
  const totalMinutes = dailyTasks.reduce((acc, t) => acc + t.durationMinutes, 0);
  const formattedTotalHours = `${Math.floor(totalMinutes / 60)} Hours ${totalMinutes % 60 > 0 ? `${totalMinutes % 60} Mins` : ''}`.trim();

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const handleStartTodayPlan = () => {
    const firstIncomplete = dailyTasks.find(t => !t.completed) || dailyTasks[0];
    if (firstIncomplete) {
      setActiveTimerTask(firstIncomplete.title);
      setSecondsRemaining(firstIncomplete.durationMinutes * 60);
      setIsTimerRunning(true);
      setShowActiveSessionModal(true);
    }
  };

  const handleTaskTimerClick = (task: typeof dailyTasks[0]) => {
    setActiveTimerTask(task.title);
    setSecondsRemaining(task.durationMinutes * 60);
    setIsTimerRunning(true);
    setShowActiveSessionModal(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    if (onContinueToTimetable) {
      onContinueToTimetable();
    } else {
      setActiveDashboardTab('timetable');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
            STEP 9 — DAILY EXECUTION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your Daily Learning Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Personalized task schedule calibrated to your target role and daily study capacity.
          </p>
        </div>

        {/* Stats Summary Widget */}
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Daily Study Time:</span>
            <span className="text-sm font-extrabold text-white">{selectedDailyStudy}</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Total:</span>
            <span className="text-sm font-extrabold text-white">{formattedTotalHours}</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Completed:</span>
            <span className="text-sm font-extrabold text-blue-400">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Daily Tasks List */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white">Today's Tasks</h2>
            <p className="text-xs text-slate-300">Check off items as you study or use the integrated focus timer.</p>
          </div>

          <button
            type="button"
            onClick={handleStartTodayPlan}
            id="start-today-plan-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Today's Plan</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-300">
            <span>Daily Completion Status</span>
            <span>{completedTasks} of {totalTasks} Tasks Done ({completionPercentage}%)</span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Task Rows */}
        <div className="space-y-3">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              id={`daily-task-row-${task.id}`}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                task.completed
                  ? 'bg-emerald-500/15 border-emerald-500/30'
                  : 'bg-white/5 border-white/10 hover:border-blue-400/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleDailyTask(task.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-white/30 hover:border-blue-400 bg-white/5'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div>
                  <span className={`text-sm font-bold block ${task.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                    {task.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {task.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-200 bg-white/10 px-3 py-1 rounded-md border border-white/10">
                  {task.durationMinutes} min
                </span>

                <button
                  type="button"
                  onClick={() => handleTaskTimerClick(task)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 text-blue-300 border border-white/15 transition-colors"
                  title="Open Focus Timer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button to Next Step */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            Next: View and manage your 7-day personalized weekly schedule.
          </span>
          <button
            type="button"
            onClick={handleContinue}
            id="daily-continue-to-timetable-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
          >
            <span>Proceed to Step 10 — Smart Timetable</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Focus Timer Modal Dialog */}
      {showActiveSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-slate-900/90 backdrop-blur-2xl max-w-md w-full p-8 rounded-2xl border border-white/20 shadow-2xl text-center space-y-6 text-white">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                Active Study Session
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {activeTimerTask}
              </h3>
            </div>

            {/* Big Digital Countdown */}
            <div className="py-6 px-8 bg-white/5 rounded-2xl border border-white/10 font-mono text-5xl font-extrabold text-blue-400 tracking-wider">
              {formatTimer(secondsRemaining)}
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 flex items-center gap-2"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isTimerRunning ? 'Pause Session' : 'Resume Session'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSecondsRemaining(45 * 60)}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowActiveSessionModal(false)}
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              Minimize & Close Dialog
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
