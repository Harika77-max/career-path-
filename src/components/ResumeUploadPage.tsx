import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Edit3, 
  Plus, 
  X, 
  Check, 
  FileCheck,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/mockData';

export const ResumeUploadPage: React.FC = () => {
  const { resumeData, setResumeData, navigate, resumeUploaded, setResumeUploaded, loadSampleResume } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newLangInput, setNewLangInput] = useState('');
  const [newProjectInput, setNewProjectInput] = useState('');
  const [newCertInput, setNewCertInput] = useState('');

  // Handle fake or real file upload
  const handleFile = (file: File) => {
    setIsProcessing(true);
    setTimeout(() => {
      // If file contains name or keywords, customize
      const fileName = file.name;
      setResumeData(prev => ({
        ...prev,
        fileName,
      }));
      setResumeUploaded(true);
      setIsProcessing(false);
    }, 900);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleManualEnter = () => {
    setResumeUploaded(true);
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    if (!resumeData.skills.includes(newSkillInput.trim())) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkillInput.trim()] }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  const handleAddLang = () => {
    if (!newLangInput.trim()) return;
    if (!resumeData.programmingLanguages.includes(newLangInput.trim())) {
      setResumeData(prev => ({ ...prev, programmingLanguages: [...prev.programmingLanguages, newLangInput.trim()] }));
    }
    setNewLangInput('');
  };

  const handleRemoveLang = (langToRemove: string) => {
    setResumeData(prev => ({ ...prev, programmingLanguages: prev.programmingLanguages.filter(l => l !== langToRemove) }));
  };

  const handleAddProject = () => {
    if (!newProjectInput.trim()) return;
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, newProjectInput.trim()] }));
    setNewProjectInput('');
  };

  const handleRemoveProject = (index: number) => {
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const handleAddCert = () => {
    if (!newCertInput.trim()) return;
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, newCertInput.trim()] }));
    setNewCertInput('');
  };

  const handleRemoveCert = (index: number) => {
    setResumeData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
  };

  const handleContinue = () => {
    // Step 3 exact rule: Button "Continue" → Target Job page.
    navigate('/target-job');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Step Progression indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">
              3
            </span>
            <span className="font-bold text-white">STEP 3 — RESUME UPLOAD</span>
          </div>
          <span className="text-slate-400 font-medium">Next: Target Job Selection →</span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-base text-slate-300">
            Your resume helps us understand your current skills and experience.
          </p>
        </div>

        {/* Upload Box Area */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl space-y-6 text-white">
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-blue-400 bg-blue-500/20 scale-[1.01]'
                : 'border-white/20 hover:border-blue-400 hover:bg-white/5'
            }`}
          >
            {isProcessing ? (
              <div className="py-6 space-y-3 flex flex-col items-center justify-center">
                <RefreshCw className="w-10 h-10 text-blue-400 animate-spin" />
                <p className="font-bold text-white text-sm">Extracting competencies and technical background...</p>
                <p className="text-xs text-slate-300">Neural parser reading skills, education, and projects...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 mx-auto shadow-xs">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">
                    Drag & Drop Resume
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Supported: <strong className="text-white">PDF, DOCX</strong> (Up to 10 MB)
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    id="resume-upload-button"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-xs"
                  >
                    Upload Resume
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleManualEnter();
                    }}
                    id="resume-manual-entry-button"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    Enter Details Manually
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preset Sample Resume Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-300 bg-transparent p-3.5 rounded-xl border border-white/15">
            <span className="font-semibold text-slate-200">Or quickly populate with a sample student profile:</span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_RESUMES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => loadSampleResume(idx)}
                  className="px-2.5 py-1 rounded bg-transparent hover:bg-white/10 text-blue-300 border border-white/15 font-semibold transition-colors"
                >
                  {sample.data.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* After Resume Upload: Extracted & Editable Fields */}
        {resumeUploaded && (
          <div className="bg-transparent backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 text-white">
            
            {/* EXACT Status Requirement */}
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-sm">✓ Resume uploaded successfully</span>
                <span className="text-xs text-emerald-200 block mt-0.5">
                  Extracted information from <strong className="font-semibold">{resumeData.fileName || 'Resume_Profile.pdf'}</strong>. Review or edit any details below:
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Name */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1" htmlFor="extracted-name">
                  Full Name
                </label>
                <input
                  id="extracted-name"
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => setResumeData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-xl text-sm font-semibold text-white focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              {/* 2. Education */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1" htmlFor="extracted-education">
                  Education & Degree
                </label>
                <input
                  id="extracted-education"
                  type="text"
                  value={resumeData.education}
                  onChange={(e) => setResumeData(prev => ({ ...prev, education: e.target.value }))}
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-xl text-sm font-semibold text-white focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>

            {/* 7. Programming Languages */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Programming Languages
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {resumeData.programmingLanguages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-transparent border border-blue-400/40 text-xs font-semibold text-blue-200"
                  >
                    <span>{lang}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLang(lang)}
                      className="hover:text-rose-400 focus:outline-hidden"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLangInput}
                  onChange={(e) => setNewLangInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLang())}
                  placeholder="Add programming language (e.g. Python, Java, C++)..."
                  className="flex-1 px-3 py-1.5 bg-transparent border border-white/20 rounded-lg text-xs text-white placeholder-slate-400 focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="button"
                  onClick={handleAddLang}
                  className="px-3 py-1.5 rounded-lg bg-transparent hover:bg-white/10 border border-white/20 text-white text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* 3. Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Technical & Core Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-transparent border border-blue-400/40 text-xs font-semibold text-blue-200"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-400 focus:outline-hidden"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Add skill (e.g. Data Structures, SQL, Linear Algebra)..."
                  className="flex-1 px-3 py-1.5 bg-transparent border border-white/20 rounded-lg text-xs text-white placeholder-slate-400 focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-lg bg-transparent hover:bg-white/10 border border-white/20 text-white text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* 4. Projects */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Extracted Projects
              </label>
              <div className="space-y-2 mb-2">
                {resumeData.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-transparent border border-white/15 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-semibold text-white">{proj}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(idx)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProjectInput}
                  onChange={(e) => setNewProjectInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddProject())}
                  placeholder="Add academic or personal project title..."
                  className="flex-1 px-3 py-1.5 bg-transparent border border-white/20 rounded-lg text-xs text-white placeholder-slate-400 focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-3 py-1.5 rounded-lg bg-transparent hover:bg-white/10 border border-white/20 text-white text-xs font-bold"
                >
                  Add Project
                </button>
              </div>
            </div>

            {/* 5. Certifications & 6. Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certifications */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Certifications & Credentials
                </label>
                <div className="space-y-2 mb-2">
                  {resumeData.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-transparent border border-white/15 text-xs"
                    >
                      <span className="font-semibold text-white truncate">{cert}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(idx)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCertInput}
                    onChange={(e) => setNewCertInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCert())}
                    placeholder="Add certification (e.g. NPTEL, Coursera)..."
                    className="flex-1 px-3 py-1.5 bg-transparent border border-white/20 rounded-lg text-xs text-white placeholder-slate-400 focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                  />
                  <button
                    type="button"
                    onClick={handleAddCert}
                    className="px-3 py-1.5 rounded-lg bg-transparent hover:bg-white/10 border border-white/20 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5" htmlFor="extracted-experience">
                  Work / Internship Experience
                </label>
                <textarea
                  id="extracted-experience"
                  rows={3}
                  value={resumeData.experience}
                  onChange={(e) => setResumeData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g. Summer Web Dev Intern at TechCorp Solutions (2 months)..."
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-xl text-xs font-semibold text-white focus:bg-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>

            {/* EXACT Action Button: "Continue" → Target Job page */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={handleContinue}
                id="resume-continue-btn"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
