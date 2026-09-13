import { 
  TargetJobOption, 
  ExtractedResumeData, 
  CareerGapAnalysis, 
  TimelineOption, 
  DailyStudyOption, 
  MonthlyRoadmapModule, 
  DailyTask, 
  TimetableDaySchedule, 
  IgotCourseItem, 
  SkillGapItem 
} from '../types';

export const TARGET_JOBS: TargetJobOption[] = [
  {
    id: 'aiml-engineer',
    title: 'AI/ML Engineer',
    category: 'Tech & AI',
    description: 'Design and deploy machine learning models, neural networks, LLM pipelines, and automated intelligence systems.',
    demand: 'Very High',
    avgSalary: '₹14-26 LPA',
    iconName: 'Cpu',
    topSkills: ['Python', 'DSA', 'SQL', 'Statistics', 'Machine Learning', 'Deep Learning', 'Git/GitHub'],
    requiredSkillsMap: [
      { skill: 'Python', requiredLevel: 90, category: 'Core Programming' },
      { skill: 'DSA', requiredLevel: 80, category: 'Algorithms & Structures' },
      { skill: 'SQL', requiredLevel: 75, category: 'Databases & Querying' },
      { skill: 'Statistics', requiredLevel: 70, category: 'Mathematics & Modeling' },
      { skill: 'Machine Learning', requiredLevel: 80, category: 'Core AI' },
      { skill: 'Deep Learning', requiredLevel: 70, category: 'Advanced AI' },
      { skill: 'Git/GitHub', requiredLevel: 75, category: 'Version Control & DevOps' },
    ],
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Software Engineering',
    description: 'Build robust enterprise software, backend microservices, system architectures, and performant algorithms.',
    demand: 'Very High',
    avgSalary: '₹10-20 LPA',
    iconName: 'Code',
    topSkills: ['Data Structures & Algorithms', 'Java / C++', 'System Design', 'SQL Databases', 'Git & CI/CD', 'REST APIs'],
    requiredSkillsMap: [
      { skill: 'Data Structures & Algorithms', requiredLevel: 85, category: 'Algorithms' },
      { skill: 'Object Oriented Programming (Java/C++)', requiredLevel: 85, category: 'Core Systems' },
      { skill: 'SQL & Database Optimization', requiredLevel: 75, category: 'Databases' },
      { skill: 'System Design & Scalability', requiredLevel: 70, category: 'Architecture' },
      { skill: 'REST API & Microservices', requiredLevel: 80, category: 'Backend' },
      { skill: 'Git & Version Control', requiredLevel: 75, category: 'DevOps' },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Cloud',
    description: 'Extract statistical insights, perform exploratory predictive modeling, and build decision intelligence engines.',
    demand: 'High',
    avgSalary: '₹12-22 LPA',
    iconName: 'BarChart3',
    topSkills: ['Python (Pandas/NumPy)', 'Statistical Inference', 'Machine Learning (Scikit-Learn)', 'SQL & Data Warehousing', 'Data Visualization', 'A/B Testing'],
    requiredSkillsMap: [
      { skill: 'Python (Pandas/NumPy)', requiredLevel: 90, category: 'Data Analysis' },
      { skill: 'Statistical Inference & Probability', requiredLevel: 85, category: 'Mathematics' },
      { skill: 'Machine Learning (Scikit-Learn)', requiredLevel: 80, category: 'Predictive Modeling' },
      { skill: 'SQL & Data Warehousing', requiredLevel: 80, category: 'Databases' },
      { skill: 'Data Visualization & Storytelling', requiredLevel: 75, category: 'BI & Reporting' },
      { skill: 'A/B Testing & Experimentation', requiredLevel: 70, category: 'Statistics' },
    ],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Cloud',
    description: 'Transform raw data into business intelligence dashboards, performance metrics, and strategic executive reporting.',
    demand: 'High',
    avgSalary: '₹7-14 LPA',
    iconName: 'PieChart',
    topSkills: ['Advanced SQL', 'Power BI / Tableau', 'Excel & Statistical Modeling', 'Python (Data Wrangling)', 'Business Communication'],
    requiredSkillsMap: [
      { skill: 'Advanced SQL & Query Optimization', requiredLevel: 85, category: 'Databases' },
      { skill: 'Power BI / Tableau Dashboards', requiredLevel: 85, category: 'Visualization' },
      { skill: 'Excel & Statistical Modeling', requiredLevel: 80, category: 'Analytics' },
      { skill: 'Python (Data Wrangling)', requiredLevel: 70, category: 'Programming' },
      { skill: 'Business Metrics & KPI Analysis', requiredLevel: 75, category: 'Domain Knowledge' },
    ],
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Software Engineering',
    description: 'Architect and construct complete end-to-end web apps from responsive frontend user interfaces to backend cloud APIs.',
    demand: 'Very High',
    avgSalary: '₹10-18 LPA',
    iconName: 'Layers',
    topSkills: ['React / Next.js', 'Node.js / Express', 'TypeScript', 'PostgreSQL / MongoDB', 'REST & GraphQL APIs', 'Docker Basics'],
    requiredSkillsMap: [
      { skill: 'React / Next.js & Frontend State', requiredLevel: 85, category: 'Frontend' },
      { skill: 'Node.js / Express & Backend APIs', requiredLevel: 80, category: 'Backend' },
      { skill: 'TypeScript & Modern JavaScript', requiredLevel: 80, category: 'Programming' },
      { skill: 'PostgreSQL & Database Design', requiredLevel: 75, category: 'Databases' },
      { skill: 'Git, CI/CD & Deployment', requiredLevel: 75, category: 'DevOps' },
      { skill: 'Authentication & Security (JWT/OAuth)', requiredLevel: 70, category: 'Security' },
    ],
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Data & Cloud',
    description: 'Design, provision, and maintain reliable cloud infrastructure, container clusters, and automated CI/CD pipelines.',
    demand: 'Growing',
    avgSalary: '₹11-20 LPA',
    iconName: 'Cloud',
    topSkills: ['AWS / Azure / GCP Fundamentals', 'Docker & Kubernetes', 'Linux Shell & Bash', 'Terraform (IaC)', 'CI/CD Pipelines', 'Cloud Networking'],
    requiredSkillsMap: [
      { skill: 'AWS / Azure / GCP Architecture', requiredLevel: 85, category: 'Cloud Infrastructure' },
      { skill: 'Docker & Container Orchestration', requiredLevel: 80, category: 'DevOps' },
      { skill: 'Linux Administration & Shell Scripting', requiredLevel: 80, category: 'Systems' },
      { skill: 'Terraform & Infrastructure as Code', requiredLevel: 70, category: 'Automation' },
      { skill: 'CI/CD Pipeline Automation', requiredLevel: 75, category: 'Engineering' },
      { skill: 'Cloud Security & IAM Policies', requiredLevel: 70, category: 'Security' },
    ],
  },
  {
    id: 'cybersecurity-engineer',
    title: 'Cybersecurity Engineer',
    category: 'Security',
    description: 'Protect digital ecosystems, perform threat assessments, audit vulnerabilities, and ensure cryptographic compliance.',
    demand: 'Growing',
    avgSalary: '₹9-18 LPA',
    iconName: 'Shield',
    topSkills: ['Network Security & Protocols', 'Ethical Hacking & Penetration Testing', 'SIEM & SOC Operations', 'Cryptography & IAM', 'Linux Security', 'OWASP Security'],
    requiredSkillsMap: [
      { skill: 'Network Security & Protocol Analysis', requiredLevel: 85, category: 'Networking' },
      { skill: 'Ethical Hacking & Vulnerability Assessment', requiredLevel: 80, category: 'Security Auditing' },
      { skill: 'SIEM Tools & Incident Response', requiredLevel: 75, category: 'Operations' },
      { skill: 'Cryptography & Identity Management', requiredLevel: 75, category: 'Security Primitives' },
      { skill: 'Linux & Scripting (Python/Bash)', requiredLevel: 75, category: 'Systems' },
      { skill: 'OWASP Web Application Security', requiredLevel: 70, category: 'Application Security' },
    ],
  },
];

export const SAMPLE_RESUMES: { label: string; roleIntent: string; data: ExtractedResumeData }[] = [
  {
    label: 'Nagasankar (3rd Year CSE Student)',
    roleIntent: 'AI/ML Engineer',
    data: {
      name: 'Nagasankar',
      email: 'nagasankar@example.edu.in',
      phone: '+91 98765 43210',
      education: 'B.Tech in Computer Science and Engineering',
      college: 'Indian Institute of Technology / NIT Campus',
      skills: ['Python', 'Data Structures', 'SQL', 'Git', 'Basics of ML', 'HTML/CSS', 'Linear Algebra'],
      programmingLanguages: ['Python', 'C++', 'SQL', 'JavaScript'],
      projects: ['Automated Attendance System using OpenCV', 'Student Grade Portal in Django', 'Weather Prediction App'],
      certifications: ['NPTEL Python for Data Science', 'Coursera Machine Learning by Andrew Ng'],
      experience: 'Summer Web Development Intern at TechCorp Solutions (2 months)',
      fileName: 'Nagasankar_Resume.pdf',
    },
  },
  {
    label: 'Hidayatulla (Final Year Student)',
    roleIntent: 'Full Stack Developer',
    data: {
      name: 'Hidayatulla',
      email: 'hidayatulla@univ.edu',
      phone: '+91 91234 56789',
      education: 'B.Tech in Information Technology',
      college: 'Pune Institute of Computer Technology',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Git', 'HTML/Tailwind CSS', 'REST APIs'],
      programmingLanguages: ['JavaScript', 'TypeScript', 'Java', 'SQL'],
      projects: ['Realtime Collaborative Whiteboard', 'Campus Event Booking System with Stripe', 'Microservices API Gateway'],
      certifications: ['AWS Cloud Practitioner', 'HackerRank Problem Solving 5-Stars'],
      experience: 'Frontend Engineering Intern at StartUp Hub (3 months)',
      fileName: 'Hidayatulla_CV.docx',
    },
  },
  {
    label: 'Harika (Electronics to Data Career Switch)',
    roleIntent: 'Data Scientist',
    data: {
      name: 'Harika',
      email: 'harika@domain.com',
      phone: '+91 99887 76655',
      education: 'B.E. in Electronics & Communication',
      college: 'Anna University Campus',
      skills: ['Python', 'SQL', 'Excel', 'Statistics & Probability', 'Tableau', 'NumPy', 'Data Cleaning'],
      programmingLanguages: ['Python', 'SQL', 'C'],
      projects: ['E-Commerce Customer Churn Analysis', 'Retail Sales Forecasting in Power BI', 'Sensor Telemetry Data Logger'],
      certifications: ['Google Data Analytics Professional Certificate', 'SQL Intermediate Mastery'],
      experience: 'Associate Operations Analyst (6 months)',
      fileName: 'Harika_Analytics_Resume.pdf',
    },
  },
];

// Helper to calculate dynamic skill levels based on extracted resume
export function calculateSkillGaps(
  targetRole: TargetJobOption,
  resume: ExtractedResumeData
): {
  skillGaps: SkillGapItem[];
  careerReadinessScore: number;
  summaryMessage: string;
} {
  const resumeText = (
    resume.skills.join(' ') + ' ' +
    resume.programmingLanguages.join(' ') + ' ' +
    resume.projects.join(' ') + ' ' +
    resume.certifications.join(' ') + ' ' +
    resume.experience
  ).toLowerCase();

  const skillGaps: SkillGapItem[] = targetRole.requiredSkillsMap.map(req => {
    const sLower = req.skill.toLowerCase();
    
    // Baseline detection logic
    let currentLevel = 20; // Default baseline if not mentioned

    // Exact skill match
    if (resume.skills.some(sk => sk.toLowerCase().includes(sLower) || sLower.includes(sk.toLowerCase()))) {
      currentLevel += 35;
    }
    // Programming languages match
    if (resume.programmingLanguages.some(pl => pl.toLowerCase().includes(sLower) || sLower.includes(pl.toLowerCase()))) {
      currentLevel += 25;
    }
    // Projects match
    if (resume.projects.some(pr => pr.toLowerCase().includes(sLower))) {
      currentLevel += 15;
    }
    // Certifications match
    if (resume.certifications.some(cr => cr.toLowerCase().includes(sLower))) {
      currentLevel += 10;
    }

    // Specific domain calibration
    if (sLower.includes('python')) {
      if (resumeText.includes('python')) currentLevel = Math.max(currentLevel, 70);
    }
    if (sLower.includes('dsa') || sLower.includes('structures')) {
      if (resumeText.includes('structures') || resumeText.includes('dsa')) currentLevel = Math.max(currentLevel, 35);
      else currentLevel = 25;
    }
    if (sLower.includes('sql') || sLower.includes('database')) {
      if (resumeText.includes('sql')) currentLevel = Math.max(currentLevel, 45);
      else currentLevel = 20;
    }
    if (sLower.includes('statistics') || sLower.includes('probability')) {
      if (resumeText.includes('statistics') || resumeText.includes('algebra')) currentLevel = Math.max(currentLevel, 30);
      else currentLevel = 15;
    }
    if (sLower.includes('machine learning')) {
      if (resumeText.includes('machine learning') || resumeText.includes('ml')) currentLevel = Math.max(currentLevel, 20);
      else currentLevel = 10;
    }
    if (sLower.includes('deep learning')) {
      if (resumeText.includes('deep learning') || resumeText.includes('neural')) currentLevel = Math.max(currentLevel, 25);
      else currentLevel = 10;
    }
    if (sLower.includes('git')) {
      if (resumeText.includes('git')) currentLevel = Math.max(currentLevel, 40);
      else currentLevel = 20;
    }
    if (sLower.includes('react') || sLower.includes('frontend')) {
      if (resumeText.includes('react') || resumeText.includes('javascript')) currentLevel = Math.max(currentLevel, 65);
    }

    // Cap level at 95
    currentLevel = Math.min(95, Math.max(10, currentLevel));
    const gap = Math.max(0, req.requiredLevel - currentLevel);

    let priority: 'Critical' | 'High' | 'Medium' = 'Medium';
    let statusCategory: 'Strong' | 'Improve' | 'Critical' = 'Strong';

    if (gap > 35) {
      priority = 'Critical';
      statusCategory = 'Critical';
    } else if (gap >= 15) {
      priority = 'High';
      statusCategory = 'Improve';
    } else {
      priority = 'Medium';
      statusCategory = 'Strong';
    }

    return {
      skill: req.skill,
      currentLevel,
      requiredLevel: req.requiredLevel,
      gap,
      priority,
      category: req.category,
      statusCategory,
    };
  });

  // Calculate readiness score
  const totalRequired = skillGaps.reduce((acc, s) => acc + s.requiredLevel, 0);
  const totalCurrent = skillGaps.reduce((acc, s) => acc + Math.min(s.currentLevel, s.requiredLevel), 0);
  const careerReadinessScore = Math.round((totalCurrent / totalRequired) * 100);

  // Critical gaps list for message
  const criticalNames = skillGaps
    .filter(s => s.statusCategory === 'Critical')
    .map(s => s.skill)
    .slice(0, 3);

  let summaryMessage = `You have a solid base in fundamental engineering. To become fully job-ready as a ${targetRole.title}, focusing on bridging key competency gaps will accelerate your timeline.`;
  if (criticalNames.length > 0) {
    summaryMessage = `You have a strong foundation, but you need to improve ${criticalNames.join(', ')} to become job-ready.`;
  }

  return {
    skillGaps,
    careerReadinessScore,
    summaryMessage,
  };
}

// Generate Month-by-Month Personalized Roadmap based on Timeline, Daily Time & Job Role
export function generateMonthlyRoadmap(
  targetJob: TargetJobOption,
  timeline: TimelineOption,
  dailyStudy: DailyStudyOption,
  skillGaps: SkillGapItem[]
): MonthlyRoadmapModule[] {
  const monthsCount = timeline === '3 Months' ? 3 : timeline === '6 Months' ? 6 : timeline === '9 Months' ? 9 : 12;
  const isAiml = targetJob.id === 'aiml-engineer';
  const isFullstack = targetJob.id === 'fullstack-developer';
  const isData = targetJob.id === 'data-scientist' || targetJob.id === 'data-analyst';

  const roadmaps: Record<number, MonthlyRoadmapModule[]> = {
    6: isAiml
      ? [
          {
            month: 1,
            title: 'MONTH 1: Python + Mathematics',
            focusTopics: ['Python Advanced Data Structures & OOP', 'Vector & Matrix Operations in NumPy', 'Multivariable Calculus & Gradients', 'Algorithmic Problem Solving (LeetCode 30)'],
            weeklyBreakdown: [
              'Week 1: Python Generators, Iterators, and Memory Management',
              'Week 2: Linear Algebra (Matrices, Eigenvalues, Transformations)',
              'Week 3: Calculus for Optimization (Partial Derivatives, Gradient Descent)',
              'Week 4: Numerical Computing with NumPy & Vectorization'
            ],
            projects: ['Mathematical Vector Engine in Pure Python', 'Matrix Solver Utility'],
            milestone: 'Master Python functional programming and mathematical foundations of gradient descent.',
          },
          {
            month: 2,
            title: 'MONTH 2: DSA + SQL',
            focusTopics: ['Core Data Structures (Trees, Graphs, Heaps)', 'Dynamic Programming & Recursion', 'Complex SQL Joins, Window Functions, and Indexing', 'Database Schema Modeling'],
            weeklyBreakdown: [
              'Week 1: Balanced Binary Trees, BST & Trie Implementations',
              'Week 2: Graph Traversal (BFS, DFS, Dijkstra, Topological Sort)',
              'Week 3: Dynamic Programming Fundamentals & Memoization',
              'Week 4: Advanced SQL (CTE, Window Functions, Performance Profiling)'
            ],
            projects: ['Algorithmic Data Analyzer in C++/Python', 'Optimized SQL Reporting Pipeline'],
            milestone: 'Solve 50 Medium DSA problems and master database query indexing.',
          },
          {
            month: 3,
            title: 'MONTH 3: Statistics + Machine Learning',
            focusTopics: ['Probability Distributions & Hypothesis Testing', 'Supervised Learning (Regression & Classification)', 'Scikit-Learn Pipeline & Feature Engineering', 'Model Evaluation & Cross-Validation'],
            weeklyBreakdown: [
              'Week 1: Descriptive & Inferential Statistics, Central Limit Theorem',
              'Week 2: Linear/Logistic Regression, Decision Trees & Random Forests',
              'Week 3: SVM, KNN, K-Means Clustering, and PCA Dimensionality Reduction',
              'Week 4: Model Cross-Validation, ROC-AUC, Precision-Recall Calibration'
            ],
            projects: ['Predictive Housing Price & Customer Churn Machine Learning Models', 'Statistical A/B Testing Simulator'],
            milestone: 'Deploy 2 full-scale Scikit-Learn predictive pipelines with >85% accuracy.',
          },
          {
            month: 4,
            title: 'MONTH 4: Advanced Machine Learning',
            focusTopics: ['XGBoost & LightGBM Gradient Boosting', 'Hyperparameter Tuning (Optuna / GridSearchCV)', 'MLOps Fundamentals & Model Serialization', 'FastAPI Microservice Deployment'],
            weeklyBreakdown: [
              'Week 1: Ensemble Techniques (Bagging, Boosting, Stacking, XGBoost)',
              'Week 2: Feature Engineering & Imbalanced Data Handling (SMOTE)',
              'Week 3: Hyperparameter Optimization with Optuna & Bayesian Tuning',
              'Week 4: Packaging Models into REST API with FastAPI & Pydantic'
            ],
            projects: ['Production Loan Default Risk Classification API', 'Automated ML Pipeline with Docker'],
            milestone: 'Build and deploy a containerized ML inference REST API on cloud.',
          },
          {
            month: 5,
            title: 'MONTH 5: Deep Learning + Projects',
            focusTopics: ['PyTorch Tensors, Autograd & Custom Layers', 'Convolutional Neural Networks (CNNs) & Computer Vision', 'Recurrent Networks (RNN, LSTM) & Transformers Intro', 'Hugging Face LLM Fine-Tuning & RAG'],
            weeklyBreakdown: [
              'Week 1: PyTorch Training Loop, Loss Functions & Backpropagation',
              'Week 2: CNN Architectures (ResNet, EfficientNet) for Image Classification',
              'Week 3: Transformer Attention Mechanism & Hugging Face Transformers',
              'Week 4: Retrieval-Augmented Generation (RAG) with Vector DB (ChromaDB)'
            ],
            projects: ['End-to-End Multimodal Medical Image Diagnostics System', 'Custom RAG Knowledge Assistant using LangChain'],
            milestone: 'Publish a comprehensive Deep Learning portfolio project with live GitHub repo & demo.',
          },
          {
            month: 6,
            title: 'MONTH 6: Interview + DSA + Resume + Mock Interviews',
            focusTopics: ['System Design for Machine Learning Systems', 'Live Coding DSA Revision (Top 75 Blind/NeetCode)', 'Resume Tailoring & ATS Verification', 'Simulated Technical & Behavioral Mock Interviews'],
            weeklyBreakdown: [
              'Week 1: ML System Design (Recommendation Systems, Video Feed, Fraud Detection)',
              'Week 2: High-Frequency Coding Rounds (Strings, Arrays, Graphs, Trees)',
              'Week 3: Resume Review, Portfolio Hosting, and LinkedIn Optimization',
              'Week 4: 4x Full-Length AI/ML Mock Interviews & Offer Negotiation Prep'
            ],
            projects: ['Verified Capstone System Design Document', 'Live Interactive Portfolio Showcase'],
            milestone: 'Attain 90%+ pass rate in simulated technical mock interviews and launch job applications.',
          },
        ]
      : [
          {
            month: 1,
            title: `MONTH 1: Foundation & Core Primitives`,
            focusTopics: [`${targetJob.topSkills[0] || 'Core Syntax'} Fundamentals`, 'Algorithmic Problem Solving', 'Git Workflows & Clean Code'],
            weeklyBreakdown: ['Week 1: Core concepts and environment setup', 'Week 2: Object-oriented programming & memory models', 'Week 3: Data structures baseline', 'Week 4: Practice problem sets'],
            projects: ['Foundational Domain Utility Tool'],
            milestone: 'Complete core language mastery and build modular baseline utilities.',
          },
          {
            month: 2,
            title: `MONTH 2: Data Structures & Databases`,
            focusTopics: ['Intermediate DSA', 'SQL Queries & Normalization', 'API Design Principles'],
            weeklyBreakdown: ['Week 1: Stacks, Queues, Linked Lists', 'Week 2: Trees & Graphs', 'Week 3: Relational DB Queries', 'Week 4: Database Indexing & Optimization'],
            projects: ['Data-driven REST Application'],
            milestone: 'Build high-performance database schemas and query structures.',
          },
          {
            month: 3,
            title: `MONTH 3: Framework Specialization`,
            focusTopics: [`Mastering ${targetJob.topSkills[1] || 'Core Framework'}`, 'Architecture Patterns', 'Asynchronous Execution'],
            weeklyBreakdown: ['Week 1: Framework architecture', 'Week 2: State management & workflows', 'Week 3: Middleware & Security', 'Week 4: Integration testing'],
            projects: ['Production-ready Feature Module'],
            milestone: 'Ship a full functional component using target industry framework.',
          },
          {
            month: 4,
            title: `MONTH 4: Advanced Architecture & Cloud`,
            focusTopics: ['Microservices & Cloud Integration', 'Docker Containerization', 'Automated Testing (CI/CD)'],
            weeklyBreakdown: ['Week 1: Dockerizing services', 'Week 2: Cloud infrastructure setup', 'Week 3: CI/CD Pipeline automation', 'Week 4: Load testing & benchmarking'],
            projects: ['Cloud-deployed Microservice Architecture'],
            milestone: 'Deploy containerized multi-tier application with automated deployment.',
          },
          {
            month: 5,
            title: `MONTH 5: Capstone Project & Specialization`,
            focusTopics: ['Large-scale Capstone Project', 'Security & Best Practices', 'Performance Profiling'],
            weeklyBreakdown: ['Week 1: System architecture design', 'Week 2: Core feature implementation', 'Week 3: Performance optimization & caching', 'Week 4: Documentation & live demo'],
            projects: ['Enterprise Capstone Application with Live URL'],
            milestone: 'Complete end-to-end industry capstone with comprehensive documentation.',
          },
          {
            month: 6,
            title: `MONTH 6: Interview Prep & Placement Ready`,
            focusTopics: ['System Design & Scalability', 'High-Frequency Coding Rounds', 'Resume Optimization & Mock Interviews'],
            weeklyBreakdown: ['Week 1: System design interviews', 'Week 2: Core technical revision', 'Week 3: Behavioral STAR technique & ATS Resume', 'Week 4: Final Mock Interviews & Applications'],
            projects: ['Verified Portfolio & Credentials Showcase'],
            milestone: 'Clear mock technical screens with 85%+ readiness score and apply to top roles.',
          },
        ],
  };

  if (roadmaps[monthsCount]) {
    return roadmaps[monthsCount];
  }

  // Generate for 3, 9, 12 months dynamically
  const generated: MonthlyRoadmapModule[] = [];
  const baseSkills = targetJob.topSkills;

  for (let m = 1; m <= monthsCount; m++) {
    const skillIndex = (m - 1) % baseSkills.length;
    const isFinalMonth = m === monthsCount;
    const isFirstMonth = m === 1;

    let title = `MONTH ${m}: ${baseSkills[skillIndex]} Specialization`;
    let focus = [`In-depth mastery of ${baseSkills[skillIndex]}`, 'Hands-on practical implementation', 'Weekly problem sets & code reviews'];

    if (isFirstMonth) {
      title = `MONTH 1: Foundations & ${baseSkills[0]}`;
      focus = [`Core primitives of ${baseSkills[0]}`, 'Development Environment Setup', 'Algorithmic foundations'];
    } else if (isFinalMonth) {
      title = `MONTH ${m}: Interview Prep + Capstone + Resume`;
      focus = ['System Design & Architecture', 'Mock Technical Coding Rounds', 'Resume Tailoring & Placement Readiness'];
    }

    generated.push({
      month: m,
      title,
      focusTopics: focus,
      weeklyBreakdown: [
        `Week 1: Core concepts and theoretical foundations of ${baseSkills[skillIndex]}`,
        `Week 2: Hands-on implementation and problem sets`,
        `Week 3: Real-world integration and edge-case handling`,
        `Week 4: Project review and milestone evaluation`
      ],
      projects: [`Month ${m} Verified Milestone Project`],
      milestone: `Complete all practical labs for Month ${m} with active GitHub commits.`,
    });
  }

  return generated;
}

// Generate Daily Learning Plan based on Study Hours (e.g. 2 Hours -> Python 45m, DSA 30m, ML 30m, Quiz 15m)
export function generateDailyLearningPlan(
  targetJob: TargetJobOption,
  dailyStudy: DailyStudyOption,
  skillGaps: SkillGapItem[]
): DailyTask[] {
  if (dailyStudy === '30 minutes') {
    return [
      { id: 'dt-1', title: `${targetJob.topSkills[0] || 'Core Concept'} Theory`, durationMinutes: 15, category: 'Core Learning', completed: false },
      { id: 'dt-2', title: 'Hands-on Practice & Quiz', durationMinutes: 15, category: 'Evaluation', completed: false },
    ];
  }

  if (dailyStudy === '1 hour') {
    return [
      { id: 'dt-1', title: `${targetJob.topSkills[0] || 'Core Subject'} Video / Reading`, durationMinutes: 25, category: 'Core Learning', completed: false },
      { id: 'dt-2', title: `${targetJob.topSkills[1] || 'DSA / Logic'} Practice`, durationMinutes: 20, category: 'Practice', completed: false },
      { id: 'dt-3', title: 'Daily Diagnostic Quiz', durationMinutes: 15, category: 'Quiz', completed: false },
    ];
  }

  if (dailyStudy === '3 hours') {
    return [
      { id: 'dt-1', title: `${targetJob.topSkills[0] || 'Python'} Advanced Concepts`, durationMinutes: 60, category: 'Core Theory', completed: false },
      { id: 'dt-2', title: `${targetJob.topSkills[1] || 'DSA & Algorithms'} Coding (2 Problems)`, durationMinutes: 45, category: 'Algorithms', completed: false },
      { id: 'dt-3', title: `${targetJob.topSkills[4] || 'Machine Learning'} Hands-on Lab`, durationMinutes: 45, category: 'Lab & Projects', completed: false },
      { id: 'dt-4', title: 'Code Review & Knowledge Quiz', durationMinutes: 30, category: 'Assessment', completed: false },
    ];
  }

  if (dailyStudy === '4 hours') {
    return [
      { id: 'dt-1', title: `${targetJob.topSkills[0] || 'Python'} Core Deep Dive`, durationMinutes: 75, category: 'Core Theory', completed: false },
      { id: 'dt-2', title: `${targetJob.topSkills[1] || 'DSA'} Problem Solving (Medium/Hard)`, durationMinutes: 60, category: 'Algorithms', completed: false },
      { id: 'dt-3', title: `${targetJob.topSkills[4] || 'ML/Backend'} Framework Lab`, durationMinutes: 60, category: 'Lab', completed: false },
      { id: 'dt-4', title: 'System Design & Portfolio Project', durationMinutes: 30, category: 'Projects', completed: false },
      { id: 'dt-5', title: 'Daily Competency Quiz', durationMinutes: 15, category: 'Quiz', completed: false },
    ];
  }

  // Default: 2 Hours (as in prompt example)
  return [
    { id: 'dt-1', title: `${targetJob.topSkills[0] || 'Python'} — Core Concepts`, durationMinutes: 45, category: 'Programming', completed: false },
    { id: 'dt-2', title: `${targetJob.topSkills[1] || 'DSA'} — Algorithmic Practice`, durationMinutes: 30, category: 'DSA', completed: false },
    { id: 'dt-3', title: `${targetJob.topSkills[4] || 'Machine Learning'} — Lab / Modeling`, durationMinutes: 30, category: 'Applied Tech', completed: false },
    { id: 'dt-4', title: 'Daily Mastery Quiz', durationMinutes: 15, category: 'Quiz', completed: false },
  ];
}

// Generate Smart Weekly Timetable (Monday to Sunday)
export function generateWeeklyTimetable(
  targetJob: TargetJobOption,
  dailyStudy: DailyStudyOption,
  skillGaps: SkillGapItem[]
): TimetableDaySchedule[] {
  const isAiml = targetJob.id === 'aiml-engineer';
  
  if (isAiml) {
    return [
      {
        day: 'Monday',
        tasks: [
          { id: 'mon-1', subject: 'Python', durationMinutes: 45, completed: false, note: 'OOP & Decorators' },
          { id: 'mon-2', subject: 'DSA', durationMinutes: 30, completed: false, note: 'Binary Trees & Traversals' },
          { id: 'mon-3', subject: 'Practice', durationMinutes: 30, completed: false, note: 'LeetCode Medium Problem 102' },
          { id: 'mon-4', subject: 'Quiz', durationMinutes: 15, completed: false, note: 'Python & Algorithmic Complexity' },
        ],
      },
      {
        day: 'Tuesday',
        tasks: [
          { id: 'tue-1', subject: 'Machine Learning', durationMinutes: 60, completed: false, note: 'Logistic Regression & Decision Trees' },
          { id: 'tue-2', subject: 'SQL', durationMinutes: 30, completed: false, note: 'Complex Aggregations & Joins' },
          { id: 'tue-3', subject: 'Practice', durationMinutes: 30, completed: false, note: 'Scikit-Learn Pipeline building' },
        ],
      },
      {
        day: 'Wednesday',
        tasks: [
          { id: 'wed-1', subject: 'Statistics', durationMinutes: 45, completed: false, note: 'Hypothesis Testing & p-values' },
          { id: 'wed-2', subject: 'DSA', durationMinutes: 45, completed: false, note: 'Graph Algorithms (BFS/DFS)' },
          { id: 'wed-3', subject: 'Quiz', durationMinutes: 30, completed: false, note: 'Probability & Graph Theory' },
        ],
      },
      {
        day: 'Thursday',
        tasks: [
          { id: 'thu-1', subject: 'Deep Learning', durationMinutes: 50, completed: false, note: 'PyTorch Tensors & Custom Datasets' },
          { id: 'thu-2', subject: 'Git/GitHub', durationMinutes: 30, completed: false, note: 'Branching, PRs & Merge Conflicts' },
          { id: 'thu-3', subject: 'Practice', durationMinutes: 40, completed: false, note: 'PyTorch Linear Regression Lab' },
        ],
      },
      {
        day: 'Friday',
        tasks: [
          { id: 'fri-1', subject: 'Machine Learning', durationMinutes: 45, completed: false, note: 'Ensemble Learning & Random Forest' },
          { id: 'fri-2', subject: 'SQL & Data Prep', durationMinutes: 45, completed: false, note: 'Data Normalization & Cleaning' },
          { id: 'fri-3', subject: 'Weekly Review', durationMinutes: 30, completed: false, note: 'Recap of week milestones' },
        ],
      },
      {
        day: 'Saturday',
        tasks: [
          { id: 'sat-1', subject: 'Portfolio Project Lab', durationMinutes: 75, completed: false, note: 'End-to-end ML Prediction System' },
          { id: 'sat-2', subject: 'DSA Timed Contest', durationMinutes: 45, completed: false, note: '2 Timed Medium Problems' },
        ],
      },
      {
        day: 'Sunday',
        tasks: [
          { id: 'sun-1', subject: 'Mock Assessment & Quiz', durationMinutes: 45, completed: false, note: 'Full 25-Question Diagnostic' },
          { id: 'sun-2', subject: 'Week Planning & Notes', durationMinutes: 30, completed: false, note: 'Log progress & adjust schedule' },
        ],
      },
    ];
  }

  // Generic timetable for other target jobs
  const days: TimetableDaySchedule['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const skills = targetJob.topSkills;

  return days.map((day, idx) => ({
    day,
    tasks: [
      { id: `${day.toLowerCase()}-1`, subject: skills[idx % skills.length] || 'Core Subject', durationMinutes: 45, completed: false, note: 'Core Concept & Theory' },
      { id: `${day.toLowerCase()}-2`, subject: skills[(idx + 1) % skills.length] || 'DSA / Practice', durationMinutes: 35, completed: false, note: 'Practical Coding Exercises' },
      { id: `${day.toLowerCase()}-3`, subject: 'Hands-on Lab', durationMinutes: 25, completed: false, note: 'Mini-project implementation' },
      { id: `${day.toLowerCase()}-4`, subject: 'Quiz & Revision', durationMinutes: 15, completed: false, note: 'Quick 5-minute recap test' },
    ],
  }));
}

// Recommended iGOT Karmayogi Courses mapped to user skill gaps
export const IGOT_COURSES_CATALOG: IgotCourseItem[] = [
  {
    id: 'igot-ml-101',
    courseName: 'Machine Learning & Neural Architecture Foundations',
    skill: 'Machine Learning',
    difficulty: 'Intermediate',
    duration: '6 Weeks (24 Hours)',
    provider: 'iGOT Karmayogi',
    nsqfLevel: 'NSQF Level 6',
    description: 'Comprehensive government-certified curriculum on supervised algorithms, feature engineering, and predictive deployment.',
    modulesCount: 8,
    enrolledLearners: 14250,
  },
  {
    id: 'igot-ai-fund',
    courseName: 'AI Fundamentals & Ethical Governance',
    skill: 'AI Fundamentals',
    difficulty: 'Beginner',
    duration: '4 Weeks (16 Hours)',
    provider: 'iGOT Karmayogi',
    nsqfLevel: 'NSQF Level 5',
    description: 'Master core AI taxonomy, decision architectures, responsible AI practices, and societal implementations.',
    modulesCount: 6,
    enrolledLearners: 28900,
  },
  {
    id: 'igot-data-anal',
    courseName: 'Data Analytics & Public Sector Intelligence',
    skill: 'Data Analytics',
    difficulty: 'Intermediate',
    duration: '5 Weeks (20 Hours)',
    provider: 'iGOT Karmayogi',
    nsqfLevel: 'NSQF Level 6',
    description: 'Learn SQL querying, statistical data visualization, KPI dashboards, and data-driven governance frameworks.',
    modulesCount: 7,
    enrolledLearners: 19800,
  },
  {
    id: 'igot-py-mastery',
    courseName: 'Python for Scientific Computing & Data Analysis',
    skill: 'Python',
    difficulty: 'Beginner',
    duration: '4 Weeks (18 Hours)',
    provider: 'iGOT Karmayogi',
    nsqfLevel: 'NSQF Level 5',
    description: 'Hands-on training in Python 3.12, NumPy, Pandas, file parsing, and asynchronous backend scripting.',
    modulesCount: 6,
    enrolledLearners: 34100,
  },
  {
    id: 'nptel-dsa',
    courseName: 'Data Structures and Algorithmic Optimization in Practice',
    skill: 'DSA',
    difficulty: 'Advanced',
    duration: '8 Weeks (32 Hours)',
    provider: 'NPTEL',
    nsqfLevel: 'NSQF Level 7',
    description: 'Deep mathematical analysis of trees, graph traversals, dynamic programming, and competitive optimization.',
    modulesCount: 12,
    enrolledLearners: 42000,
  },
  {
    id: 'aicte-deep-learning',
    courseName: 'Deep Learning & Applied Computer Vision',
    skill: 'Deep Learning',
    difficulty: 'Advanced',
    duration: '6 Weeks (24 Hours)',
    provider: 'AICTE',
    nsqfLevel: 'NSQF Level 7',
    description: 'Convolutional neural networks, PyTorch model deployment, transfer learning, and real-world image diagnostics.',
    modulesCount: 8,
    enrolledLearners: 11200,
  },
  {
    id: 'cdac-cloud-devops',
    courseName: 'Cloud Native Systems & Container Orchestration',
    skill: 'Cloud / DevOps',
    difficulty: 'Intermediate',
    duration: '5 Weeks (20 Hours)',
    provider: 'CDAC',
    nsqfLevel: 'NSQF Level 6',
    description: 'Docker containerization, Kubernetes cluster management, CI/CD pipeline automation, and microservices.',
    modulesCount: 7,
    enrolledLearners: 16500,
  },
  {
    id: 'igot-cyber-sec',
    courseName: 'Information Security & Digital Resilience Best Practices',
    skill: 'Cybersecurity',
    difficulty: 'Intermediate',
    duration: '4 Weeks (16 Hours)',
    provider: 'iGOT Karmayogi',
    nsqfLevel: 'NSQF Level 6',
    description: 'Threat identification, network protocol defense, encryption primitives, and national cybersecurity standards.',
    modulesCount: 6,
    enrolledLearners: 21300,
  },
];

// Generate full connected CareerGapAnalysis state
export function generateFullCareerAnalysis(
  targetRole: TargetJobOption,
  resume: ExtractedResumeData,
  timeline: TimelineOption = '6 Months',
  dailyStudy: DailyStudyOption = '2 hours'
): CareerGapAnalysis {
  const { skillGaps, careerReadinessScore, summaryMessage } = calculateSkillGaps(targetRole, resume);

  const strongSkills = skillGaps.filter(s => s.statusCategory === 'Strong');
  const skillsToImprove = skillGaps.filter(s => s.statusCategory === 'Improve');
  const criticalGaps = skillGaps.filter(s => s.statusCategory === 'Critical');

  const monthlyRoadmap = generateMonthlyRoadmap(targetRole, timeline, dailyStudy, skillGaps);
  const dailyTasks = generateDailyLearningPlan(targetRole, dailyStudy, skillGaps);
  const weeklyTimetable = generateWeeklyTimetable(targetRole, dailyStudy, skillGaps);

  // Recommend iGOT courses based on critical & improvement skill gaps
  const gapSkillNames = skillGaps.filter(s => s.gap > 0).map(s => s.skill.toLowerCase());
  const recommendedIgotCourses = IGOT_COURSES_CATALOG.filter(course => {
    const cSkill = course.skill.toLowerCase();
    return gapSkillNames.some(gs => gs.includes(cSkill) || cSkill.includes(gs)) || course.provider === 'iGOT Karmayogi';
  });

  return {
    targetJob: targetRole.title,
    careerReadinessScore,
    summaryMessage,
    skillGaps,
    strongSkills,
    skillsToImprove,
    criticalGaps,
    selectedTimeline: timeline,
    selectedDailyStudy: dailyStudy,
    monthlyRoadmap,
    dailyTasks,
    weeklyTimetable,
    recommendedIgotCourses: recommendedIgotCourses.length > 0 ? recommendedIgotCourses : IGOT_COURSES_CATALOG.slice(0, 4),
  };
}

export const MATCHING_JOB_OPPORTUNITIES = [
  {
    id: 'job-1',
    title: 'Junior AI & ML Systems Engineer',
    company: 'Tata Consultancy Services (TCS Research)',
    location: 'Bengaluru / Hybrid',
    salary: '₹12.5 - 16 LPA',
    matchScore: 96,
    requiredSkills: ['Python', 'Machine Learning', 'DSA', 'SQL'],
    type: 'Full-time' as const,
    urgency: 'Hot' as const,
  },
  {
    id: 'job-2',
    title: 'Machine Learning Associate',
    company: 'Infosys Topaz AI Labs',
    location: 'Pune / Hyderabad',
    salary: '₹10 - 14.5 LPA',
    matchScore: 93,
    requiredSkills: ['Python', 'Scikit-Learn', 'Statistics', 'Git'],
    type: 'Full-time' as const,
    urgency: 'Immediate' as const,
  },
  {
    id: 'job-3',
    title: 'AI Data Solutions Engineer',
    company: 'Wipro AI Centre of Excellence',
    location: 'Bengaluru / Remote',
    salary: '₹11 - 15 LPA',
    matchScore: 89,
    requiredSkills: ['Python', 'SQL', 'FastAPI', 'DSA'],
    type: 'Full-time' as const,
    urgency: 'Active' as const,
  },
  {
    id: 'job-4',
    title: 'Applied Deep Learning & NLP Intern',
    company: 'Cognizant AI Innovations',
    location: 'Chennai / Hybrid',
    salary: '₹45,000 / mo + PPO',
    matchScore: 88,
    requiredSkills: ['PyTorch', 'Transformers', 'Python', 'Git/GitHub'],
    type: 'Internship' as const,
    urgency: 'Hot' as const,
  },
];

export const MOCK_INTERVIEW_PREP_DATA = [
  {
    id: 'q-1',
    topic: 'Machine Learning Fundamentals',
    question: 'How do you handle severe class imbalance in a classification model without causing overfitting?',
    idealAnswer: 'Techniques include SMOTE (Synthetic Minority Over-sampling), cost-sensitive loss weighting (e.g. class_weight="balanced"), threshold calibration using Precision-Recall curves instead of ROC-AUC, and ensemble methods with focal loss.',
    difficulty: 'Medium',
  },
  {
    id: 'q-2',
    topic: 'Data Structures & Algorithms',
    question: 'Explain the difference between Dijkstra’s algorithm and A* search. When would you prefer A*?',
    idealAnswer: 'Dijkstra expands uniformly in all directions based solely on shortest path g(n). A* utilizes an admissible heuristic h(n) estimating distance to goal f(n)=g(n)+h(n), guiding the search greedily toward the target for faster convergence.',
    difficulty: 'Medium-Hard',
  },
  {
    id: 'q-3',
    topic: 'Python Optimization',
    question: 'What happens under the hood when you use Python generators instead of lists for large data pipelines?',
    idealAnswer: 'Generators yield items lazily on-demand using the iterator protocol (__next__), maintaining internal frame execution state without allocating full array memory in RAM (O(1) auxiliary space vs O(N)).',
    difficulty: 'Medium',
  },
];

