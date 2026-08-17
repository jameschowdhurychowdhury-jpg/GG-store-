import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { GGBadgeLogo } from './GGBadgeLogo';
import { User as UserType } from '../types';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: UserType) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  onClose,
  onSuccess,
  onSwitchMode
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'register' && !name) {
      setError('Please enter your full name.');
      return;
    }

    // Standard Authentication
    const authenticatedUser: UserType = {
      id: `usr_${Date.now()}`,
      name: mode === 'register' ? name : (email.split('@')[0] || 'Valued Gamer'),
      email: email,
      walletBalance: 0,
      isAdmin: email.toLowerCase() === 'admin@gmail.com',
      joinedDate: 'August 2026'
    };

    onSuccess(authenticatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111622] border border-[#242E42] rounded-3xl max-w-md w-full p-6 sm:p-8 text-white shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm"
        >
          ✕
        </button>

        {/* Header with Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <GGBadgeLogo size="md" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {mode === 'login' ? 'Welcome Back to GG-store' : 'Create Gamer Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Log in to track orders, download invoices, and unlock discounts'
              : 'Join thousands of gamers for instant top-ups and exclusive offers'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all mt-2"
          >
            {mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="text-center text-xs text-slate-400 mt-6 pt-4 border-t border-[#242E42]">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => onSwitchMode('register')}
                className="text-amber-400 font-bold hover:underline"
              >
                Register Now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => onSwitchMode('login')}
                className="text-amber-400 font-bold hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
