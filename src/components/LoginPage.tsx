import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ArrowRight, Lock, Mail, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const { login, navigate, loadSampleResume } = useApp();
  const [email, setEmail] = useState('nagasankar@example.edu.in');
  const [password, setPassword] = useState('••••••••••');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid academic or professional email address.');
      return;
    }
    setError(null);
    // Exact Step 2 rule: Successful login automatically opens Resume Upload page
    login(email);
  };

  const handleDemoSelect = (index: number) => {
    loadSampleResume(index);
    const sample = SAMPLE_RESUMES[index];
    login(sample.data.email, sample.data.name);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-md w-full space-y-8 bg-transparent backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl text-white">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-xs">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Sign In to CareerPath AI
          </h2>
          <p className="text-xs text-slate-300 mt-1.5">
            Step 2 of your guided career readiness journey
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1" htmlFor="login-email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu or email@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border border-white/20 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-transparent transition-all text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-200" htmlFor="login-password">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border border-white/20 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-transparent transition-all text-white placeholder-slate-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              id="login-submit-btn"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              id="login-create-account-btn"
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-200 hover:bg-white/10 border border-white/20 transition-colors bg-transparent"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Demo Fast-Track Profiles */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Select Demo Profile (1-Click Login):</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {SAMPLE_RESUMES.map((profile, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDemoSelect(idx)}
                id={`login-demo-btn-${idx}`}
                className="p-2.5 rounded-xl border border-white/15 bg-transparent hover:bg-white/10 hover:border-blue-400/40 transition-colors text-left"
              >
                <div className="text-[11px] font-bold text-white truncate">{profile.data.name}</div>
                <div className="text-[10px] text-blue-300 truncate">{profile.roleIntent}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          <span>Protected by CareerPath AI Academic Authentication</span>
        </div>
      </div>
    </div>
  );
};
