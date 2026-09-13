import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Info, 
  Layers, 
  X,
  Users,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { IgotCourseItem } from '../types';

interface IgotCoursesViewProps {
  onContinueToProgress?: () => void;
}

export const IgotCoursesView: React.FC<IgotCoursesViewProps> = ({ onContinueToProgress }) => {
  const { careerAnalysis, targetJob, resumeData, setActiveDashboardTab } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<IgotCourseItem | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);


  if (!careerAnalysis) {
    return (
      <div className="p-8 text-center text-slate-500">
        Please complete the career analysis first.
      </div>
    );
  }

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
            STEP 11 — NATIONAL COMPETENCY ALIGNMENT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Recommended iGOT Karmayogi Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Learning resources and certified modules mapped directly to your {careerAnalysis.targetJob} skill gaps.
          </p>
        </div>

        <div className="bg-blue-500/20 px-4 py-2.5 rounded-xl border border-blue-400/30 text-xs text-blue-300 font-bold flex items-center gap-2 shrink-0">
          <GraduationCap className="w-4 h-4" />
          <span>NSQF & FRAC Framework</span>
        </div>
      </div>

      {/* EXACT Specification Banner: "iGOT Demo Integration" */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 space-y-2 backdrop-blur-md">
        <div className="flex items-center gap-2 font-extrabold text-sm text-amber-300">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>iGOT Demo Integration</span>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed">
          This prototype demonstrates competency-based course recommendations using structured demonstration data aligned with the Government of India's <strong>iGOT Karmayogi, NPTEL, and NSQF</strong> frameworks. The service layer is architected with standard REST API client stubs so official live iGOT APIs can be seamlessly connected in production.
        </p>
      </div>

      {/* Skill Gap Mapping Summary */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-white/15 shadow-2xl space-y-3 text-white">
        <h3 className="text-sm font-bold text-white">
          Targeted Skill Gaps for {resumeData.name}:
        </h3>
        <div className="flex flex-wrap gap-2">
          {careerAnalysis.skillGaps.map((gap, idx) => (
            <span
              key={idx}
              className={`text-xs px-3 py-1 rounded-lg font-semibold border ${
                gap.statusCategory === 'Critical'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : gap.statusCategory === 'Improve'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {gap.skill} (Gap: {gap.gap}%)
            </span>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerAnalysis.recommendedIgotCourses.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course.id);

          return (
            <div
              key={course.id}
              id={`igot-course-card-${course.id}`}
              className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/15 p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-blue-400/40 transition-all text-white"
            >
              <div className="space-y-3">
                {/* Provider Badge & NSQF */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {course.provider}
                  </span>
                  <span className="font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/10">
                    {course.nsqfLevel}
                  </span>
                </div>

                {/* Course Name */}
                <h3 className="text-base font-extrabold text-white leading-snug">
                  {course.courseName}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Metadata: Skill, Difficulty, Duration, Provider */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Target Skill:</span>
                    <span className="font-bold text-blue-400">{course.skill}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Difficulty:</span>
                    <span className="font-semibold text-slate-200">{course.difficulty}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Duration:</span>
                    <span className="font-semibold text-slate-200">{course.duration}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Learners:</span>
                    <span className="font-semibold text-slate-200">{course.enrolledLearners.toLocaleString()} Active</span>
                  </div>
                </div>
              </div>

              {/* Action Button: "View Course" */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                {isEnrolled ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enrolled (In Progress)</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">
                    {course.modulesCount} Learning Modules
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedCourse(course)}
                  id={`view-course-btn-${course.id}`}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs flex items-center gap-1.5 ml-auto"
                >
                  <span>View Course</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button: Proceed to Step 12 Learning Progress */}
      <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
            NEXT STAGE
          </span>
          <h3 className="text-base font-bold text-white">
            Track Real-Time Progress & Complete Daily Plan
          </h3>
          <p className="text-xs text-slate-300">
            Monitor overall skill development and view your career readiness score evolution.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onContinueToProgress) {
              onContinueToProgress();
            }
          }}
          id="igot-continue-to-progress-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs shrink-0"
        >
          <span>Proceed to Step 12 — Learning Progress</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course Detail Modal Dialog */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-slate-900/95 backdrop-blur-2xl max-w-xl w-full p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  {selectedCourse.provider} • {selectedCourse.nsqfLevel}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {selectedCourse.courseName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div>
                <h4 className="font-bold text-white mb-1">Course Description:</h4>
                <p className="text-slate-300 leading-relaxed">{selectedCourse.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 text-xs">
                <div>
                  <span className="font-bold text-slate-400 block">Skill Domain:</span>
                  <span className="font-bold text-blue-400">{selectedCourse.skill}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block">Difficulty:</span>
                  <span className="font-semibold text-white">{selectedCourse.difficulty}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block">Total Hours:</span>
                  <span className="font-semibold text-white">{selectedCourse.duration}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block">Curriculum:</span>
                  <span className="font-semibold text-white">{selectedCourse.modulesCount} Modules</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Sample Curriculum Modules:</h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <strong className="text-white">Module 1:</strong> Foundations & Theoretical Principles of {selectedCourse.skill}
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <strong className="text-white">Module 2:</strong> Hands-on Lab Environment & Applied Problem Sets
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <strong className="text-white">Module 3:</strong> Production Case Studies & Government Governance Implementations
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <strong className="text-white">Module 4:</strong> Final Competency Assessment & Digital Certificate Issuance
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Verifiable on Academic Bank of Credits (ABC)
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleEnroll(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enroll in Course</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
