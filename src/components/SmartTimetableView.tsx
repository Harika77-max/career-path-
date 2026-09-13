import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Edit3, 
  RotateCw, 
  ArrowRight, 
  Plus, 
  Sparkles,
  Save,
  X
} from 'lucide-react';

interface SmartTimetableViewProps {
  onContinueToIgot?: () => void;
}

export const SmartTimetableView: React.FC<SmartTimetableViewProps> = ({ onContinueToIgot }) => {
  const { 
    weeklyTimetable, 
    toggleTimetableTask, 
    updateTimetableTask, 
    regenerateTimetable, 
    careerAnalysis, 
    selectedDailyStudy, 
    targetJob, 
    setActiveDashboardTab 
  } = useApp();

  // Edit task modal state
  const [editingTask, setEditingTask] = useState<{
    day: string;
    taskId: string;
    subject: string;
    duration: number;
    note?: string;
  } | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    updateTimetableTask(
      editingTask.day,
      editingTask.taskId,
      editingTask.subject,
      Number(editingTask.duration),
      editingTask.note
    );
    setEditingTask(null);
  };

  const handleContinue = () => {
    if (onContinueToIgot) {
      onContinueToIgot();
    } else {
      setActiveDashboardTab('igot-courses');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
            STEP 10 — WEEKLY STUDY SCHEDULE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Personalized Timetable
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Generated from your available daily study time ({selectedDailyStudy}), {targetJob?.title} skill gaps, and roadmap milestones.
          </p>
        </div>

        {/* 🔄 Regenerate Button */}
        <button
          type="button"
          onClick={regenerateTimetable}
          id="regenerate-timetable-btn"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15 shrink-0"
        >
          <RotateCw className="w-4 h-4 text-blue-400" />
          <span>🔄 Regenerate Timetable</span>
        </button>
      </div>

      {/* Days Grid (Monday to Sunday) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {weeklyTimetable.map((dayPlan) => {
          const totalDayMinutes = dayPlan.tasks.reduce((sum, t) => sum + t.durationMinutes, 0);
          const completedCount = dayPlan.tasks.filter(t => t.completed).length;

          return (
            <div
              key={dayPlan.day}
              id={`timetable-day-${dayPlan.day.toLowerCase()}`}
              className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/15 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-white/25 transition-all text-white"
            >
              <div>
                {/* Day Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <h3 className="font-extrabold text-white text-sm tracking-wide uppercase">
                      {dayPlan.day}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
                    {totalDayMinutes} min total
                  </span>
                </div>

                {/* Day Tasks */}
                <div className="space-y-2.5">
                  {dayPlan.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between gap-2 ${
                        task.completed
                          ? 'bg-emerald-500/15 border-emerald-500/30'
                          : 'bg-white/5 border-white/10 hover:border-blue-400/40'
                      }`}
                    >
                      {/* ✓ Mark Complete Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleTimetableTask(dayPlan.day, task.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          task.completed
                            ? 'bg-emerald-500 text-white'
                            : 'border border-white/30 bg-white/5 hover:border-blue-400'
                        }`}
                        title="Mark Complete"
                      >
                        {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      {/* Subject & Duration */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 font-bold text-white truncate">
                          <span className={task.completed ? 'line-through text-slate-400' : ''}>
                            {task.subject}
                          </span>
                          <span className="text-slate-400 font-normal">—</span>
                          <span className="text-blue-400 shrink-0 font-semibold">{task.durationMinutes} min</span>
                        </div>
                        {task.note && (
                          <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                            {task.note}
                          </span>
                        )}
                      </div>

                      {/* ✏ Edit Button */}
                      <button
                        type="button"
                        onClick={() => setEditingTask({
                          day: dayPlan.day,
                          taskId: task.id,
                          subject: task.subject,
                          duration: task.durationMinutes,
                          note: task.note,
                        })}
                        className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="Edit Session"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Progress Footer */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{completedCount} / {dayPlan.tasks.length} Completed</span>
                {completedCount === dayPlan.tasks.length && dayPlan.tasks.length > 0 && (
                  <span className="text-emerald-300 font-bold">✓ Day Done!</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action to Step 11 */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <span className="text-xs text-slate-300">
          Ready to discover verified government and industry courses?
        </span>
        <button
          type="button"
          onClick={handleContinue}
          id="timetable-continue-to-igot-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
        >
          <span>Proceed to Step 11 — iGOT Karmayogi Courses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ✏ Edit Task Modal Dialog */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-slate-900/95 backdrop-blur-2xl max-w-md w-full p-6 rounded-2xl border border-white/20 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-extrabold text-white">
                ✏ Edit Timetable Task ({editingTask.day})
              </h3>
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="edit-task-subject">
                  Subject / Topic Name
                </label>
                <input
                  id="edit-task-subject"
                  type="text"
                  required
                  value={editingTask.subject}
                  onChange={(e) => setEditingTask({ ...editingTask, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-xl text-sm font-semibold text-white focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="edit-task-duration">
                  Duration (Minutes)
                </label>
                <input
                  id="edit-task-duration"
                  type="number"
                  required
                  min="5"
                  max="300"
                  value={editingTask.duration}
                  onChange={(e) => setEditingTask({ ...editingTask, duration: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-xl text-sm font-semibold text-white focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="edit-task-note">
                  Topic Notes (Optional)
                </label>
                <input
                  id="edit-task-note"
                  type="text"
                  value={editingTask.note || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, note: e.target.value })}
                  placeholder="e.g. Focus on LeetCode Medium #102..."
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-xl text-xs text-white focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 placeholder-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
