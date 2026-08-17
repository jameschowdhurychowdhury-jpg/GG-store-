import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  Clock, 
  Copy, 
  Check, 
  Zap, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  Lock,
  Smartphone,
  CheckCircle2,
  X
} from 'lucide-react';
import { Game, GamePackage, PaymentMethodType } from '../types';

export type ExtendedPaymentMethod = 'Paytm' | 'PayPal' | 'UPI' | 'GPay' | 'FamPay' | 'PhonePe';

interface DeveloperQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
  selectedPackage: GamePackage;
  playerInfo: Record<string, string>;
  finalAmount: number;
  initialMethod?: PaymentMethodType | ExtendedPaymentMethod;
  onConfirmSuccess: (paymentData: { method: string; transactionId: string; utr: string }) => void;
}

export const DeveloperQrModal: React.FC<DeveloperQrModalProps> = ({
  isOpen,
  onClose,
  game,
  selectedPackage,
  playerInfo,
  finalAmount,
  initialMethod = 'UPI',
  onConfirmSuccess
}) => {
  // Payment method selection
  const [selectedMethod, setSelectedMethod] = useState<ExtendedPaymentMethod>(
    (initialMethod === 'Paytm' || initialMethod === 'GPay' || initialMethod === 'PhonePe')
      ? initialMethod
      : 'UPI'
  );

  // 10-Minute countdown timer (600 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [copiedAmount, setCopiedAmount] = useState<boolean>(false);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [verificationProgress, setVerificationProgress] = useState<number>(0);
  const [sessionRef, setSessionRef] = useState<string>(() => `GG-DEV-${Math.floor(100000 + Math.random() * 900000)}`);

  // Payment Methods Available
  const paymentMethods: { id: ExtendedPaymentMethod; name: string; tag: string; vpa: string; color: string; iconLabel: string }[] = [
    { id: 'UPI', name: 'Instant UPI', tag: 'All Apps', vpa: 'ggstore.developer@upi', color: 'from-amber-500 to-orange-500', iconLabel: 'BHIM / UPI' },
    { id: 'Paytm', name: 'Paytm', tag: 'Wallet & UPI', vpa: 'paytm.ggstore@paytm', color: 'from-sky-500 to-blue-600', iconLabel: 'Paytm' },
    { id: 'GPay', name: 'Google Pay', tag: 'Instant GPay', vpa: 'ggstore.recharge@oksbi', color: 'from-blue-500 to-emerald-500', iconLabel: 'GPay' },
    { id: 'FamPay', name: 'FamPay', tag: 'Teen UPI', vpa: 'ggstore@fampay', color: 'from-yellow-400 to-amber-500', iconLabel: 'FamPay' },
    { id: 'PayPal', name: 'PayPal', tag: 'Global / Card', vpa: 'paypal.me/ggstoreindia', color: 'from-indigo-600 to-blue-500', iconLabel: 'PayPal' },
    { id: 'PhonePe', name: 'PhonePe', tag: 'UPI Direct', vpa: 'ggstore@ybl', color: 'from-purple-600 to-indigo-600', iconLabel: 'PhonePe' },
  ];

  const currentMethodConfig = paymentMethods.find(m => m.id === selectedMethod) || paymentMethods[0];

  // Timer Effect
  useEffect(() => {
    if (!isOpen) return;

    setSecondsRemaining(600);
    setIsExpired(false);
    setVerificationState('idle');
    setVerificationProgress(0);

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, sessionRef]);

  if (!isOpen) return null;

  // Format mm:ss
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timerPercentage = (secondsRemaining / 600) * 100;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(currentMethodConfig.vpa);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(finalAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleRegenerateQr = () => {
    setSessionRef(`GG-DEV-${Math.floor(100000 + Math.random() * 900000)}`);
    setSecondsRemaining(600);
    setIsExpired(false);
    setVerificationState('idle');
    setVerificationProgress(0);
  };

  const handleVerifyAndConfirm = () => {
    if (isExpired) return;

    setVerificationState('verifying');
    setVerificationProgress(15);

    // Realistic verification sequence
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 350);

    setTimeout(() => {
      clearInterval(interval);
      setVerificationProgress(100);
      setVerificationState('success');

      setTimeout(() => {
        const generatedTxnId = utrNumber.trim() 
          ? `TXN-${utrNumber.trim().toUpperCase()}` 
          : `TXN-${selectedMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;

        onConfirmSuccess({
          method: selectedMethod,
          transactionId: generatedTxnId,
          utr: utrNumber.trim() || `UTR${Math.floor(1000000000 + Math.random() * 9000000000)}`
        });
      }, 700);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0F1420] border border-amber-500/40 rounded-3xl max-w-xl w-full p-5 sm:p-7 text-white shadow-2xl relative overflow-hidden my-6">
        
        {/* Glow Ambient */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#242E42] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-black flex items-center justify-center font-black shadow-md shadow-amber-500/20">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">Developer Payment QR</h2>
                <span className="text-[10px] bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold px-2 py-0.5 rounded-full">
                  Instant Gateway
                </span>
              </div>
              <p className="text-xs text-slate-400">Scan & pay to complete game top-up directly</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 10-Minute Live Countdown Timer Banner */}
        <div className={`p-3.5 rounded-2xl border mb-5 transition-all ${
          isExpired 
            ? 'bg-red-500/15 border-red-500/40 text-red-300' 
            : secondsRemaining < 120
            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 animate-pulse'
            : 'bg-[#151C2C] border-[#242E42] text-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${isExpired ? 'text-red-400' : 'text-amber-400'}`} />
              <span className="text-xs font-bold">
                {isExpired ? 'QR Code Expired' : 'Payment QR Valid For:'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`font-mono text-base sm:text-lg font-black ${
                isExpired ? 'text-red-400' : secondsRemaining < 120 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {formattedTime}
              </span>
              <span className="text-[10px] text-slate-400">(10 Min Session)</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div 
              className={`h-full transition-all duration-1000 rounded-full ${
                isExpired ? 'bg-red-500 w-0' : secondsRemaining < 120 ? 'bg-amber-500' : 'bg-gradient-to-r from-amber-400 to-emerald-400'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>

        {/* Step 1: Select Payment App / Gateway */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span>Select Payment App:</span>
            <span className="text-[11px] text-amber-400">Zero Convenience Fee (₹0)</span>
          </label>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {paymentMethods.map((m) => {
              const isSelected = selectedMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMethod(m.id)}
                  className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                      : 'bg-[#151C2C] border-[#242E42] text-slate-400 hover:text-slate-200 hover:bg-[#1A2234]'
                  }`}
                >
                  <span className="text-xs font-black truncate max-w-full">{m.name}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                    isSelected ? 'bg-amber-400 text-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {m.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Breakdown Snapshot */}
        <div className="bg-[#151C2C] border border-[#242E42] rounded-2xl p-3.5 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <p className="text-[10px] text-slate-400">Game & Plan</p>
            <p className="font-bold text-white truncate">{game.name}</p>
            <p className="text-[11px] text-amber-400 font-semibold truncate">{selectedPackage.amount}</p>
          </div>

          <div>
            <p className="text-[10px] text-slate-400">Target Player ID</p>
            <p className="font-mono font-bold text-slate-200 truncate">
              {Object.values(playerInfo)[0] || 'Direct UID'}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-400">Reference Ref</p>
            <p className="font-mono text-[11px] font-bold text-slate-300 truncate">{sessionRef}</p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-400">Payable Amount</p>
            <p className="text-lg font-black text-amber-400">₹{finalAmount}</p>
          </div>
        </div>

        {/* QR Code Container (Interactive & Developer Styled) */}
        <div className="bg-[#111622] border border-[#242E42] rounded-2xl p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-5 relative">
          
          {/* QR Code Box */}
          <div className="relative group flex-shrink-0">
            {isExpired ? (
              <div className="w-44 h-44 rounded-2xl bg-slate-900 border-2 border-red-500/50 flex flex-col items-center justify-center p-4 text-center">
                <AlertCircle className="w-10 h-10 text-red-400 mb-2" />
                <p className="text-xs font-bold text-red-300">Session Expired</p>
                <button
                  onClick={handleRegenerateQr}
                  className="mt-2 text-[11px] bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                >
                  <RefreshCw className="w-3 h-3" /> Regenerate
                </button>
              </div>
            ) : (
              <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-amber-400/80 flex flex-col items-center justify-center relative">
                
                {/* Visual SVG QR Code Matrix */}
                <svg className="w-36 h-36" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="120" height="120" fill="white"/>
                  
                  {/* Top Left Corner Finder */}
                  <rect x="10" y="10" width="30" height="30" rx="4" fill="#0F1420" stroke="#F59E0B" strokeWidth="2"/>
                  <rect x="18" y="18" width="14" height="14" rx="2" fill="#F59E0B"/>
                  
                  {/* Top Right Corner Finder */}
                  <rect x="80" y="10" width="30" height="30" rx="4" fill="#0F1420" stroke="#F59E0B" strokeWidth="2"/>
                  <rect x="88" y="18" width="14" height="14" rx="2" fill="#F59E0B"/>
                  
                  {/* Bottom Left Corner Finder */}
                  <rect x="10" y="80" width="30" height="30" rx="4" fill="#0F1420" stroke="#F59E0B" strokeWidth="2"/>
                  <rect x="18" y="88" width="14" height="14" rx="2" fill="#F59E0B"/>
                  
                  {/* Data Modules (Developer pattern) */}
                  <rect x="46" y="14" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="58" y="14" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="68" y="14" width="6" height="6" rx="1" fill="#0F1420"/>
                  
                  <rect x="46" y="26" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="58" y="26" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="68" y="26" width="6" height="6" rx="1" fill="#0F1420"/>

                  <rect x="14" y="46" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="26" y="46" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="38" y="46" width="6" height="6" rx="1" fill="#0F1420"/>

                  {/* Center Emblem with Gateway Tag */}
                  <circle cx="60" cy="60" r="14" fill="#0B0E14" stroke="#F59E0B" strokeWidth="1.5"/>
                  <text x="60" y="63" fill="#F59E0B" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                    {selectedMethod}
                  </text>

                  <rect x="76" y="46" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="88" y="46" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="100" y="46" width="6" height="6" rx="1" fill="#0F1420"/>

                  <rect x="14" y="58" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="26" y="58" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="38" y="58" width="6" height="6" rx="1" fill="#F59E0B"/>

                  <rect x="76" y="58" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="88" y="58" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="100" y="58" width="6" height="6" rx="1" fill="#0F1420"/>

                  <rect x="46" y="76" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="58" y="76" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="68" y="76" width="6" height="6" rx="1" fill="#F59E0B"/>

                  <rect x="46" y="88" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="58" y="88" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="68" y="88" width="6" height="6" rx="1" fill="#0F1420"/>

                  <rect x="46" y="100" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="58" y="100" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="76" y="100" width="6" height="6" rx="1" fill="#0F1420"/>
                  <rect x="88" y="100" width="6" height="6" rx="1" fill="#F59E0B"/>
                  <rect x="100" y="100" width="6" height="6" rx="1" fill="#0F1420"/>
                </svg>

                <div className="mt-1 text-[10px] font-bold text-slate-800 text-center font-mono flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-Bit Encrypted QR</span>
                </div>
              </div>
            )}
          </div>

          {/* QR Payment Information Details */}
          <div className="flex-1 space-y-3 w-full">
            
            {/* Merchant VPA / UPI */}
            <div>
              <p className="text-[11px] text-slate-400 font-semibold mb-1">
                Merchant Gateway ID ({currentMethodConfig.name})
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#151C2C] border border-[#242E42] rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-400 truncate">
                  {currentMethodConfig.vpa}
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 border border-slate-700 transition-colors"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Quick Amount Copy */}
            <div>
              <p className="text-[11px] text-slate-400 font-semibold mb-1">Exact Amount</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#151C2C] border border-[#242E42] rounded-xl px-3 py-2 text-xs font-bold text-white flex justify-between items-center">
                  <span>Pay Exactly:</span>
                  <span className="text-amber-400 font-mono font-black text-sm">₹{finalAmount}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAmount}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 border border-slate-700 transition-colors"
                >
                  {copiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAmount ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-[11px] text-slate-400 space-y-1 bg-[#0B0E14] p-2.5 rounded-xl border border-[#242E42]/60">
              <p className="font-semibold text-slate-300">💡 3 Quick Steps:</p>
              <p>1. Open {selectedMethod} / any UPI app and scan the QR.</p>
              <p>2. Complete payment of ₹{finalAmount} within 10 minutes.</p>
              <p>3. Tap the verification button below for instant top-up.</p>
            </div>

          </div>
        </div>

        {/* Optional UTR / Reference Input */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
            Transaction UTR / Reference ID (Optional):
          </label>
          <input
            type="text"
            placeholder="e.g. 423589123891 or Paytm Txn ID"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value)}
            disabled={verificationState === 'verifying' || isExpired}
            className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
          />
        </div>

        {/* Verification Progress Bar if verifying */}
        {verificationState === 'verifying' && (
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
              <span>Verifying Developer Gateway Payment...</span>
              <span>{verificationProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${verificationProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 text-center">
              Checking transaction handshake with game API server...
            </p>
          </div>
        )}

        {/* Verification Success Notice */}
        {verificationState === 'success' && (
          <div className="mb-4 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-black text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Payment Verified Successfully!</span>
            </div>
            <p className="text-xs text-slate-300">Generating instant top-up order receipt...</p>
          </div>
        )}

        {/* Action Confirmation Button */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={verificationState === 'verifying'}
            className="px-4 py-3 bg-[#151C2C] hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs sm:text-sm border border-[#242E42] transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            id="verify-developer-qr-btn"
            onClick={handleVerifyAndConfirm}
            disabled={verificationState === 'verifying' || isExpired}
            className={`flex-1 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
              isExpired
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-black shadow-amber-500/20 active:scale-95'
            }`}
          >
            {verificationState === 'verifying' ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Verifying Gateway Response...</span>
              </>
            ) : isExpired ? (
              <span>Session Expired — Click Regenerate Above</span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-black" />
                <span>I Have Paid / Verify & Top Up</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Security Badges */}
        <div className="mt-4 pt-3 border-t border-[#242E42] flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Direct Developer Gateway
          </span>
          <span>Instant Credited within 30-120 Sec</span>
        </div>

      </div>
    </div>
  );
};
