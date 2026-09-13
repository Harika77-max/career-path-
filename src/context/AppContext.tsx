import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  AppRoute, 
  UserProfile, 
  ExtractedResumeData, 
  TargetJobOption, 
  TimelineOption, 
  DailyStudyOption, 
  CareerGapAnalysis, 
  DailyTask, 
  TimetableDaySchedule,
  DashboardTabType,
  JobMatchRecommendation,
  SkillGapItem
} from '../types';
import { 
  TARGET_JOBS, 
  SAMPLE_RESUMES, 
  generateFullCareerAnalysis,
  MATCHING_JOB_OPPORTUNITIES,
  MOCK_INTERVIEW_PREP_DATA
} from '../data/mockData';

export interface SkillProgressStat {
  skill: string;
  currentPercent: number;
  targetPercent: number;
  category: string;
  color: string;
}

export interface CourseProgressStat {
  id: string;
  courseName: string;
  provider: string;
  progressPercent: number;
  completedModules: number;
  totalModules: number;
  status: 'In Progress' | 'Completed' | 'Enrolled';
}

interface AppContextType {
  currentRoute: AppRoute;
  navigate: (route: AppRoute) => void;
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  
  // Step 3: Resume Data
  resumeData: ExtractedResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ExtractedResumeData>>;
  resumeUploaded: boolean;
  setResumeUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  loadSampleResume: (index: number) => void;

  // Step 4: Target Job
  targetJob: TargetJobOption | null;
  setTargetJob: React.Dispatch<React.SetStateAction<TargetJobOption | null>>;

  // Step 5-11: Full Connected Career Analysis
  careerAnalysis: CareerGapAnalysis | null;
  selectedTimeline: TimelineOption;
  selectedDailyStudy: DailyStudyOption;
  updateRoadmapSettings: (timeline: TimelineOption, dailyStudy: DailyStudyOption) => void;
  startCareerAnalysis: () => void;

  // Step 9: Daily Tasks state & controls
  dailyTasks: DailyTask[];
  toggleDailyTask: (taskId: string) => void;

  // Step 10: Timetable state & controls
  weeklyTimetable: TimetableDaySchedule[];
  toggleTimetableTask: (day: string, taskId: string) => void;
  updateTimetableTask: (day: string, taskId: string, newSubject: string, newDuration: number, note?: string) => void;
  regenerateTimetable: () => void;

  // Step 12 & 13: Learning & Progress state & dynamic calculation
  overallProgress: number; // e.g. 42% -> 45% -> 55%
  skillProgressList: SkillProgressStat[];
  courseProgressList: CourseProgressStat[];
  totalStudyHours: number;
  weeklyTargetHours: number;
  completedDailyTasksCount: number;
  totalDailyTasksCount: number;
  weeklyCompletedCount: number;
  totalWeeklyTasksCount: number;
  streakDays: number;
  showDailyCompletionAlert: boolean;
  dismissDailyCompletionAlert: () => void;
  advanceCourseProgress: (courseId: string) => void;
  logStudySession: (minutes: number, subject: string) => void;
  boostSkillLevel: (skillName: string, boostAmount?: number) => void;

  // Step 14: Job Readiness & Opportunities
  dynamicReadinessScore: number; // 58% -> 64% -> 72% -> 85% -> 95% -> 100%
  isJobReady: boolean; // true when >= 85%
  jobRecommendations: JobMatchRecommendation[];
  interviewQuestions: typeof MOCK_INTERVIEW_PREP_DATA;
  simulateCompleteMastery: () => void;
  triggerJobReadyCelebration: () => void;
  resetAllProgress: () => void;

  // Dashboard active view tab
  activeDashboardTab: DashboardTabType;
  setActiveDashboardTab: React.Dispatch<React.SetStateAction<DashboardTabType>>;

  // Auth methods
  login: (email: string, name?: string) => void;
  register: (fullName: string, email: string) => void;
  logout: () => void;
  resetToStart: () => void;
}

const defaultResume: ExtractedResumeData = SAMPLE_RESUMES[0].data;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');
  const [user, setUser] = useState<UserProfile | null>(() => ({
    id: 'usr_nagasankar',
    fullName: 'Nagasankar',
    email: 'nagasankar@example.edu.in',
    isRegistered: true,
  }));

  // Resume state
  const [resumeData, setResumeData] = useState<ExtractedResumeData>(defaultResume);
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(true);

  // Target Job state (Default to AI/ML Engineer as per spec)
  const [targetJob, setTargetJob] = useState<TargetJobOption | null>(TARGET_JOBS[0]);

  // Timeline & Study preferences
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineOption>('6 Months');
  const [selectedDailyStudy, setSelectedDailyStudy] = useState<DailyStudyOption>('2 hours');

  // Core Analysis Result
  const [careerAnalysis, setCareerAnalysis] = useState<CareerGapAnalysis | null>(() => {
    return generateFullCareerAnalysis(TARGET_JOBS[0], defaultResume, '6 Months', '2 hours');
  });

  // Daily Tasks state
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(() => {
    return careerAnalysis?.dailyTasks || [];
  });

  // Weekly Timetable state
  const [weeklyTimetable, setWeeklyTimetable] = useState<TimetableDaySchedule[]>(() => {
    return careerAnalysis?.weeklyTimetable || [];
  });

  // Active dashboard tab
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTabType>('skill-gap');

  // Step 12 & 13: Learning Progress specific state
  const [bonusOverallProgress, setBonusOverallProgress] = useState<number>(0);
  const [studyHoursLogged, setStudyHoursLogged] = useState<number>(18.5);
  const [streakDays, setStreakDays] = useState<number>(6);
  const [showDailyCompletionAlert, setShowDailyCompletionAlert] = useState<boolean>(false);
  
  // Custom course progress state
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, { percent: number; completed: number }>>({
    'igot-ml-101': { percent: 65, completed: 5 },
    'igot-py-mastery': { percent: 90, completed: 6 },
    'nptel-dsa': { percent: 40, completed: 5 },
    'aicte-deep-learning': { percent: 25, completed: 2 },
  });

  // Custom skill level bonuses added during practice
  const [skillBonusMap, setSkillBonusMap] = useState<Record<string, number>>({});

  const navigate = (route: AppRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      fullName: name || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
      email,
      isRegistered: true,
    };
    setUser(newUser);
    navigate('/resume-upload');
  };

  const register = (fullName: string, email: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      fullName,
      email,
      isRegistered: true,
    };
    setUser(newUser);
    setResumeData(prev => ({
      ...prev,
      name: fullName,
      email,
    }));
    navigate('/resume-upload');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const loadSampleResume = (index: number) => {
    const sample = SAMPLE_RESUMES[index % SAMPLE_RESUMES.length];
    if (sample) {
      setResumeData(sample.data);
      setResumeUploaded(true);
      setUser({
        id: 'usr_' + sample.data.name.toLowerCase(),
        fullName: sample.data.name,
        email: sample.data.email,
        isRegistered: true,
      });
    }
  };

  const startCareerAnalysis = () => {
    const job = targetJob || TARGET_JOBS[0];
    const analysis = generateFullCareerAnalysis(job, resumeData, selectedTimeline, selectedDailyStudy);
    setCareerAnalysis(analysis);
    setDailyTasks(analysis.dailyTasks);
    setWeeklyTimetable(analysis.weeklyTimetable);
    setBonusOverallProgress(0);
    setSkillBonusMap({});
    setShowDailyCompletionAlert(false);
    navigate('/analyzing');
  };

  const updateRoadmapSettings = (timeline: TimelineOption, dailyStudy: DailyStudyOption) => {
    setSelectedTimeline(timeline);
    setSelectedDailyStudy(dailyStudy);
    const job = targetJob || TARGET_JOBS[0];
    const updated = generateFullCareerAnalysis(job, resumeData, timeline, dailyStudy);
    setCareerAnalysis(updated);
    setDailyTasks(updated.dailyTasks);
    setWeeklyTimetable(updated.weeklyTimetable);
  };

  // Trigger celebratory confetti
  const triggerJobReadyCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#f59e0b', '#6366f1', '#ec4899'],
    });
  };

  // Step 13: Daily Task toggle with dynamic progress updates
  const toggleDailyTask = (taskId: string) => {
    setDailyTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      const completedCount = updated.filter(t => t.completed).length;
      const allCompleted = completedCount === updated.length && updated.length > 0;

      // Adjust overall progress and study logged
      if (allCompleted) {
        setShowDailyCompletionAlert(true);
        setBonusOverallProgress(prevBonus => Math.min(prevBonus + 3, 50));
        setStudyHoursLogged(prevHours => Math.round((prevHours + 1.5) * 10) / 10);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      }

      // Automatically boost relevant skill slightly
      const targetTask = prev.find(t => t.id === taskId);
      if (targetTask) {
        const titleLower = targetTask.title.toLowerCase();
        const relevantSkill = careerAnalysis?.skillGaps.find(s => titleLower.includes(s.skill.toLowerCase()));
        if (relevantSkill) {
          const delta = targetTask.completed ? -4 : 6;
          setSkillBonusMap(prevMap => ({
            ...prevMap,
            [relevantSkill.skill]: Math.max(0, (prevMap[relevantSkill.skill] || 0) + delta)
          }));
        }
      }

      return updated;
    });
  };

  const toggleTimetableTask = (day: string, taskId: string) => {
    setWeeklyTimetable(prev =>
      prev.map(d => {
        if (d.day === day) {
          return {
            ...d,
            tasks: d.tasks.map(t => {
              if (t.id === taskId) {
                const isNowDone = !t.completed;
                if (isNowDone) {
                  setBonusOverallProgress(b => Math.min(b + 1, 50));
                  setStudyHoursLogged(h => Math.round((h + 0.5) * 10) / 10);
                }
                return { ...t, completed: isNowDone };
              }
              return t;
            }),
          };
        }
        return d;
      })
    );
  };

  const updateTimetableTask = (day: string, taskId: string, newSubject: string, newDuration: number, note?: string) => {
    setWeeklyTimetable(prev =>
      prev.map(d => {
        if (d.day === day) {
          return {
            ...d,
            tasks: d.tasks.map(t => t.id === taskId ? { ...t, subject: newSubject, durationMinutes: newDuration, note: note || t.note } : t),
          };
        }
        return d;
      })
    );
  };

  const regenerateTimetable = () => {
    const job = targetJob || TARGET_JOBS[0];
    const updated = generateFullCareerAnalysis(job, resumeData, selectedTimeline, selectedDailyStudy);
    setWeeklyTimetable(updated.weeklyTimetable);
  };

  const advanceCourseProgress = (courseId: string) => {
    setCourseProgressMap(prev => {
      const current = prev[courseId] || { percent: 20, completed: 1 };
      const nextPercent = Math.min(100, current.percent + 20);
      const nextCompleted = Math.min(8, current.completed + 1);
      
      setBonusOverallProgress(b => Math.min(50, b + 2));
      setStudyHoursLogged(h => Math.round((h + 1.0) * 10) / 10);

      if (nextPercent === 100) {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      }

      return {
        ...prev,
        [courseId]: { percent: nextPercent, completed: nextCompleted }
      };
    });
  };

  const boostSkillLevel = (skillName: string, boostAmount: number = 8) => {
    setSkillBonusMap(prev => ({
      ...prev,
      [skillName]: (prev[skillName] || 0) + boostAmount
    }));
    setBonusOverallProgress(b => Math.min(50, b + 2));
    setStudyHoursLogged(h => Math.round((h + 0.75) * 10) / 10);
  };

  const logStudySession = (minutes: number, subject: string) => {
    const hours = Math.round((minutes / 60) * 10) / 10;
    setStudyHoursLogged(prev => Math.round((prev + hours) * 10) / 10);
    setBonusOverallProgress(b => Math.min(50, b + Math.max(1, Math.round(hours * 1.5))));
    boostSkillLevel(subject, 5);
  };

  // Simulate Complete Mastery (for SIH judge presentation & rapid testing)
  const simulateCompleteMastery = () => {
    setBonusOverallProgress(48);
    setStudyHoursLogged(64.5);
    setStreakDays(21);
    setDailyTasks(prev => prev.map(t => ({ ...t, completed: true })));
    setWeeklyTimetable(prev => prev.map(d => ({ ...d, tasks: d.tasks.map(t => ({ ...t, completed: true })) })));
    
    // Max out course progress
    const maxedCourses: Record<string, { percent: number; completed: number }> = {};
    (careerAnalysis?.recommendedIgotCourses || []).forEach(c => {
      maxedCourses[c.id] = { percent: 100, completed: c.modulesCount || 8 };
    });
    setCourseProgressMap(maxedCourses);

    // Max out all skill bonuses
    const maxedSkills: Record<string, number> = {};
    (careerAnalysis?.skillGaps || []).forEach(s => {
      maxedSkills[s.skill] = Math.max(0, s.requiredLevel - s.currentLevel + 5);
    });
    setSkillBonusMap(maxedSkills);

    triggerJobReadyCelebration();
  };

  const resetAllProgress = () => {
    setBonusOverallProgress(0);
    setStudyHoursLogged(18.5);
    setStreakDays(6);
    setSkillBonusMap({});
    setDailyTasks(careerAnalysis?.dailyTasks.map(t => ({ ...t, completed: false })) || []);
    setCourseProgressMap({
      'igot-ml-101': { percent: 65, completed: 5 },
      'igot-py-mastery': { percent: 90, completed: 6 },
      'nptel-dsa': { percent: 40, completed: 5 },
      'aicte-deep-learning': { percent: 25, completed: 2 },
    });
    setShowDailyCompletionAlert(false);
  };

  const dismissDailyCompletionAlert = () => {
    setShowDailyCompletionAlert(false);
  };

  const resetToStart = () => {
    navigate('/');
  };

  // Dynamic Skill Progress Calculation (Step 12 & Step 14)
  const skillProgressList: SkillProgressStat[] = (careerAnalysis?.skillGaps || []).map((s, idx) => {
    const bonus = skillBonusMap[s.skill] || 0;
    const computedLevel = Math.min(100, s.currentLevel + bonus);
    const colors = ['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    return {
      skill: s.skill,
      currentPercent: computedLevel,
      targetPercent: s.requiredLevel,
      category: s.category,
      color: colors[idx % colors.length],
    };
  });

  // Dynamic Course Progress Calculation
  const courseProgressList: CourseProgressStat[] = (careerAnalysis?.recommendedIgotCourses || []).map(c => {
    const custom = courseProgressMap[c.id] || { percent: 35, completed: 3 };
    return {
      id: c.id,
      courseName: c.courseName,
      provider: c.provider,
      progressPercent: custom.percent,
      completedModules: custom.completed,
      totalModules: c.modulesCount || 8,
      status: custom.percent >= 100 ? 'Completed' : custom.percent > 0 ? 'In Progress' : 'Enrolled',
    };
  });

  // Dynamic Task Counts
  const completedDailyTasksCount = dailyTasks.filter(t => t.completed).length;
  const totalDailyTasksCount = dailyTasks.length;

  const totalWeeklyTasks = weeklyTimetable.flatMap(d => d.tasks);
  const weeklyCompletedCount = totalWeeklyTasks.filter(t => t.completed).length;
  const totalWeeklyTasksCount = totalWeeklyTasks.length;

  // Step 12 & 13: Overall Learning Progress Calculation
  // Base is 42% (or calculated based on initial state), increased by completed tasks, courses & practice
  const taskCompletionBonus = totalDailyTasksCount > 0 ? Math.round((completedDailyTasksCount / totalDailyTasksCount) * 8) : 0;
  const weeklyBonus = totalWeeklyTasksCount > 0 ? Math.round((weeklyCompletedCount / totalWeeklyTasksCount) * 10) : 0;
  
  const baseOverall = 42;
  const overallProgress = Math.min(100, baseOverall + taskCompletionBonus + weeklyBonus + bonusOverallProgress);

  // Step 14: Dynamic Career Readiness Score Calculation
  // Progresses from 58% -> 64% -> 72% -> 85% -> 95% -> 100%
  const baseReadiness = careerAnalysis?.careerReadinessScore || 58;
  const skillsSum = skillProgressList.reduce((acc, s) => acc + s.currentPercent, 0);
  const targetSum = skillProgressList.reduce((acc, s) => acc + s.targetPercent, 0);
  const skillRatio = targetSum > 0 ? skillsSum / targetSum : 0.6;
  
  const dynamicReadinessScore = Math.min(
    100, 
    Math.round(baseReadiness * 0.4 + skillRatio * 50 + (overallProgress * 0.15))
  );

  const isJobReady = dynamicReadinessScore >= 85 || overallProgress >= 90;

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigate,
        user,
        setUser,
        resumeData,
        setResumeData,
        resumeUploaded,
        setResumeUploaded,
        loadSampleResume,
        targetJob,
        setTargetJob,
        careerAnalysis,
        selectedTimeline,
        selectedDailyStudy,
        updateRoadmapSettings,
        startCareerAnalysis,
        dailyTasks,
        toggleDailyTask,
        weeklyTimetable,
        toggleTimetableTask,
        updateTimetableTask,
        regenerateTimetable,
        
        // Progress & Readiness
        overallProgress,
        skillProgressList,
        courseProgressList,
        totalStudyHours: studyHoursLogged,
        weeklyTargetHours: selectedDailyStudy === '30 minutes' ? 3.5 : selectedDailyStudy === '1 hour' ? 7 : selectedDailyStudy === '3 hours' ? 21 : selectedDailyStudy === '4 hours' ? 28 : 14,
        completedDailyTasksCount,
        totalDailyTasksCount,
        weeklyCompletedCount,
        totalWeeklyTasksCount,
        streakDays,
        showDailyCompletionAlert,
        dismissDailyCompletionAlert,
        advanceCourseProgress,
        logStudySession,
        boostSkillLevel,
        dynamicReadinessScore,
        isJobReady,
        jobRecommendations: MATCHING_JOB_OPPORTUNITIES,
        interviewQuestions: MOCK_INTERVIEW_PREP_DATA,
        simulateCompleteMastery,
        triggerJobReadyCelebration,
        resetAllProgress,

        activeDashboardTab,
        setActiveDashboardTab,
        login,
        register,
        logout,
        resetToStart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

