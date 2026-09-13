import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, navigate } = useApp();
  const [fullName, setFullName] = useState('Nagasankar');
  const [email, setEmail] = useState('nagasankar@example.edu.in');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    register(fullName, email);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-md w-full space-y-8 bg-transparent backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl text-white">
        
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-xs">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Create Free Student Account
          </h2>
          <p className="text-xs text-slate-300 mt-1.5">
            Begin your personalized career readiness diagnostic
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1" htmlFor="reg-fullname">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="reg-fullname"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Nagasankar"
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border border-white/20 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-transparent transition-all text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1" htmlFor="reg-email">
              College or Personal Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border border-white/20 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-transparent transition-all text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1" htmlFor="reg-password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="reg-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-transparent border border-white/20 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-400 focus:bg-transparent transition-all text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              id="register-submit-btn"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Create Account & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="pt-3 text-center text-xs text-slate-400">
          <span>Already registered?</span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            id="register-login-link"
            className="font-bold text-blue-400 hover:text-blue-300 hover:underline ml-1"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
