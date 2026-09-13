import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Sparkles, 
  User as UserIcon, 
  LogOut, 
  ArrowRight,
  FileText,
  Target,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, user, logout } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-[#161618]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              id="navbar-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-500 transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-white">
                    CareerPath <span className="text-blue-400">AI</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-blue-300 border border-white/15">
                    SIH26101
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block font-medium">Precision Competency & Learning Engine</p>
              </div>
            </button>
          </div>

          {/* Quick Steps Shortcut in Nav (if user has active session) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-300">
            <button
              onClick={() => navigate('/')}
              id="nav-home"
              className={`px-3 py-1.5 rounded-lg transition-colors ${currentRoute === '/' ? 'text-blue-400 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/resume-upload')}
              id="nav-resume"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${currentRoute === '/resume-upload' ? 'text-blue-400 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'}`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Step 3: Resume</span>
            </button>
            <button
              onClick={() => navigate('/target-job')}
              id="nav-target"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${currentRoute === '/target-job' ? 'text-blue-400 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'}`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Step 4: Target Job</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              id="nav-dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${currentRoute === '/dashboard' ? 'text-blue-400 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'}`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard & Analysis</span>
            </button>
            <button
              onClick={() => navigate('/demo')}
              id="nav-kinetic-grid-demo"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${currentRoute === '/demo' ? 'text-blue-400 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Kinetic Grid</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigate('/dashboard')}
                  id="nav-user-profile-btn"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1.5 border border-white/10"
                >
                  <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="max-w-[120px] truncate">{user.fullName || 'Nagasankar'}</span>
                </button>
                <button
                  onClick={logout}
                  id="nav-logout-btn"
                  title="Logout"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  id="nav-login-btn"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors border border-white/20"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/login')}
                  id="nav-get-started-btn"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-xs"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
