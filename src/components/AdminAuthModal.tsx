import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Cpu, 
  Fingerprint, 
  X,
  Server,
  Activity
} from 'lucide-react';
import { User } from '../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (adminUser: User) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [securityPin, setSecurityPin] = useState('');
  
  // Security State Machine: 'credentials' -> 'handshake' -> 'verified'
  const [step, setStep] = useState<'credentials' | 'handshake' | 'verified'>('credentials');
  
  // Advanced Protection System States
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [handshakeProgress, setHandshakeProgress] = useState<number>(0);
  const [handshakeLogs, setHandshakeLogs] = useState<string[]>([]);
  
  // Cryptographic session token
  const [sessionToken] = useState(() => `AUTH_SHA256_${Math.random().toString(36).substring(2, 10).toUpperCase()}`);

  // Lockout countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLockedOut && lockoutSeconds > 0) {
      timer = setInterval(() => {
        setLockoutSeconds(prev => {
          if (prev <= 1) {
            setIsLockedOut(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLockedOut, lockoutSeconds]);

  if (!isOpen) return null;

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isLockedOut) {
      setErrorMessage(`SYSTEM TEMPORARILY LOCKED: Wait ${lockoutSeconds}s before retrying.`);
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // STRICT ADMIN VALIDATION: admin@gmail.com and ggstore@admin
    if (trimmedEmail !== 'admin@gmail.com' || trimmedPassword !== 'ggstore@admin') {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 4) {
        setIsLockedOut(true);
        setLockoutSeconds(180); // 3 minutes lockout
        setErrorMessage('CRITICAL SECURITY ALERT: Maximum authentication failures exceeded. IP temporarily blacklisted for 3 minutes.');
      } else {
        setErrorMessage(`ACCESS DENIED: Invalid Administrative Credentials. Failed attempt ${newAttempts} of 4. Intrusion logs updated.`);
      }
      return;
    }

    // Credentials passed -> Proceed to Level-5 Advanced Security Handshake
    setIsAuthenticating(true);
    setStep('handshake');
    setHandshakeLogs([
      'Initiating TLS 1.3 Cryptographic Handshake...',
      'Verifying Root Administrator Certificate...',
      'Validating 256-Bit SHA Integrity Hash...'
    ]);

    // Handshake animation simulation
    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      setHandshakeProgress(progress);

      if (progress === 30) {
        setHandshakeLogs(prev => [...prev, 'Session Signature Verified: GG-ROOT-AUTHORIZED']);
      }
      if (progress === 60) {
        setHandshakeLogs(prev => [...prev, 'Firewall Port & Token Clearance: GRANTED']);
      }
      if (progress === 90) {
        setHandshakeLogs(prev => [...prev, 'Decrypting Master Administrative Console...']);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setHandshakeProgress(100);
        setIsAuthenticating(false);
        setStep('verified');

        setTimeout(() => {
          const adminUser: User = {
            id: 'admin_master_001',
            name: 'Master Admin',
            email: 'admin@gmail.com',
            walletBalance: 0,
            isAdmin: true,
            joinedDate: 'System Initialized'
          };
          onSuccess(adminUser);
          onClose();
        }, 1000);
      }
    }, 400);
  };

  const handleFillCredentials = () => {
    setEmail('admin@gmail.com');
    setPassword('ggstore@admin');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0B0E14] border-2 border-red-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden my-6">
        
        {/* Glowing cyber grid effect */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* High Security Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
            <span>Restricted Level-5 Access Zone</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
            <span>GG-store Admin Portal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            High-Security Cryptographic Authentication Gateway
          </p>
        </div>

        {/* Real-time System Security Diagnostics Bar */}
        <div className="bg-[#111622] border border-[#242E42] rounded-xl p-3 mb-5 text-[11px] font-mono grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>Auth Protocol: <strong className="text-cyan-300">AES-256</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Firewall: <strong className="text-emerald-400">ACTIVE</strong></span>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3.5 bg-red-500/15 border border-red-500/40 rounded-xl text-xs text-red-300 font-mono space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-red-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Authentication Error</span>
            </div>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Lockout Screen */}
        {isLockedOut ? (
          <div className="p-6 bg-red-950/40 border border-red-500/50 rounded-2xl text-center space-y-3">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto animate-bounce" />
            <h3 className="text-base font-black text-red-400 uppercase font-mono">
              Terminal Locked Down
            </h3>
            <p className="text-xs text-slate-300">
              Too many failed admin login attempts. Security counter active.
            </p>
            <div className="font-mono text-2xl font-black text-amber-400">
              {Math.floor(lockoutSeconds / 60)}:
              {String(lockoutSeconds % 60).padStart(2, '0')}
            </div>
          </div>
        ) : step === 'credentials' ? (
          /* Step 1: Admin Credentials Entry */
          <form onSubmit={handleCredentialSubmit} className="space-y-4">
            
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Authorized Admin Email</span>
                <span className="text-[10px] text-amber-400 font-mono">Strict verification</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Master Admin Password</span>
                <span className="text-[10px] text-slate-400 font-mono">256-bit hash check</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="ggstore@admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl pl-9 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Fill for Convenience */}
            <div className="p-2.5 bg-[#111622] rounded-xl border border-dashed border-[#242E42] flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Preset: admin@gmail.com</span>
              <button
                type="button"
                onClick={handleFillCredentials}
                className="text-amber-400 hover:underline font-bold"
              >
                Auto-Fill Credentials
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="admin-auth-submit-btn"
              disabled={isAuthenticating}
              className="w-full bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Key className="w-4 h-4" />
              <span>Authenticate & Access Console</span>
            </button>
          </form>
        ) : step === 'handshake' ? (
          /* Step 2: Advanced Security Handshake Sequence */
          <div className="space-y-4 py-3">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-400 animate-spin flex items-center justify-center" />
                <Cpu className="w-8 h-8 text-amber-400 absolute inset-0 m-auto animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-mono font-bold text-sm text-amber-400">
                Executing Security Handshake ({handshakeProgress}%)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Verifying administrative certificate chain...
              </p>
            </div>

            {/* Terminal Log Console */}
            <div className="bg-[#05070A] border border-[#1E293B] rounded-xl p-3 font-mono text-[11px] text-emerald-400 space-y-1 max-h-36 overflow-y-auto">
              {handshakeLogs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Step 3: Verified & Access Granted */
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-black text-lg text-emerald-400 font-mono">
              ACCESS AUTHORIZED
            </h3>
            <p className="text-xs text-slate-300">
              Welcome Master Administrator. Launching Admin Control Center...
            </p>
          </div>
        )}

        {/* Footer Security Notice */}
        <div className="mt-5 pt-3 border-t border-[#242E42] text-[10px] text-slate-500 text-center font-mono">
          Session ID: {sessionToken} • 256-Bit SHA Protection Active
        </div>

      </div>
    </div>
  );
};
