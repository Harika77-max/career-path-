export type AppRoute = 
  | '/'
  | '/login'
  | '/register'
  | '/resume-upload'
  | '/target-job'
  | '/analyzing'
  | '/dashboard'
  | '/demo';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  isRegistered: boolean;
  avatarUrl?: string;
}

export interface ExtractedResumeData {
  name: string;
  email: string;
  phone: string;
  education: string;
  college: string;
  skills: string[];
  programmingLanguages: string[];
  projects: string[];
  certifications: string[];
  experience: string;
  fileName?: string;
  rawText?: string;
}

export type TargetJobRole =
  | 'AI/ML Engineer'
  | 'Software Developer'
  | 'Data Scientist'
  | 'Data Analyst'
  | 'Full Stack Developer'
  | 'Cloud Engineer'
  | 'Cybersecurity Engineer';

export interface TargetJobOption {
  id: string;
  title: TargetJobRole;
  category: 'Tech & AI' | 'Software Engineering' | 'Data & Cloud' | 'Security';
  description: string;
  demand: 'Very High' | 'High' | 'Growing';
  avgSalary: string;
  iconName: string;
  topSkills: string[];
  requiredSkillsMap: { skill: string; requiredLevel: number; category: string }[];
}

export type TimelineOption = '3 Months' | '6 Months' | '9 Months' | '12 Months';
export type DailyStudyOption = '30 minutes' | '1 hour' | '2 hours' | '3 hours' | '4 hours';

export interface SkillGapItem {
  skill: string;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  gap: number; // requiredLevel - currentLevel (or 0 if higher)
  priority: 'Critical' | 'High' | 'Medium';
  category: string;
  statusCategory: 'Strong' | 'Improve' | 'Critical';
}

export interface MonthlyRoadmapModule {
  month: number;
  title: string;
  focusTopics: string[];
  weeklyBreakdown: string[];
  projects: string[];
  milestone: string;
}

export interface DailyTask {
  id: string;
  title: string;
  durationMinutes: number;
  category: string;
  completed: boolean;
}

export interface TimetableDaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  tasks: {
    id: string;
    subject: string;
    durationMinutes: number;
    completed: boolean;
    note?: string;
  }[];
}

export interface IgotCourseItem {
  id: string;
  courseName: string;
  skill: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  provider: 'iGOT Karmayogi' | 'NPTEL' | 'AICTE' | 'CDAC' | 'National Skills Hub';
  nsqfLevel: string;
  description: string;
  modulesCount: number;
  enrolledLearners: number;
  progressPercent?: number;
  completedModules?: number;
}

export interface CareerGapAnalysis {
  targetJob: TargetJobRole;
  careerReadinessScore: number;
  summaryMessage: string;
  skillGaps: SkillGapItem[];
  strongSkills: SkillGapItem[];
  skillsToImprove: SkillGapItem[];
  criticalGaps: SkillGapItem[];
  selectedTimeline: TimelineOption;
  selectedDailyStudy: DailyStudyOption;
  monthlyRoadmap: MonthlyRoadmapModule[];
  dailyTasks: DailyTask[];
  weeklyTimetable: TimetableDaySchedule[];
  recommendedIgotCourses: IgotCourseItem[];
}

export interface JobMatchRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  requiredSkills: string[];
  type: 'Full-time' | 'Internship' | 'Remote';
  urgency: 'Hot' | 'Immediate' | 'Active';
}

export type DashboardTabType = 
  | 'skill-gap' 
  | 'roadmap' 
  | 'daily-plan' 
  | 'timetable' 
  | 'igot-courses' 
  | 'learning-progress' 
  | 'job-readiness';

