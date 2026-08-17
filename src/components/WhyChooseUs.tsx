import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Headphones, 
  Smile, 
  Sparkles, 
  Clock,
  Gift
} from 'lucide-react';

interface WhyChooseUsProps {
  onFlashSaleClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onFlashSaleClick }) => {
  // Live Countdown state for Flash Sale (02:45:18)
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 59, seconds: 59 }; // loop reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2 = (num: number) => num.toString().padStart(2, '0');

  const features = [
    {
      icon: ShieldCheck,
      title: 'Trusted & Secure',
      desc: 'Your safety is our priority. We use top-level security.'
    },
    {
      icon: Zap,
      title: 'Instant Top Up',
      desc: 'Lightning fast delivery. No waiting, just gaming.'
    },
    {
      icon: Award,
      title: 'Best Prices',
      desc: 'We offer the most affordable game top-ups.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      desc: 'Need help? Our support team is always here.'
    },
    {
      icon: Smile,
      title: 'Happy Gamers',
      desc: 'Thousands of gamers trust and love us.'
    }
  ];

  return (
    <section className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-14 2xl:py-20">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-black text-white tracking-tight mb-6 sm:mb-8 2xl:mb-10">
        Why Choose GG-store?
      </h2>

      {/* Grid: 5 Feature Cards + 1 Limited Time Offer Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 2xl:gap-8">
        
        {/* Left Side: 5 Feature Cards */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 2xl:gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#111622] border border-[#242E42] rounded-2xl 2xl:rounded-3xl p-4 sm:p-5 2xl:p-6 flex flex-col justify-between hover:border-amber-500/40 hover:bg-[#151C2C] transition-all group"
              >
                <div className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-xl 2xl:rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 2xl:w-7 2xl:h-7" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm 2xl:text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs 2xl:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Quick Bonus Perks Card */}
          <div className="bg-[#111622] border border-[#242E42] rounded-2xl 2xl:rounded-3xl p-4 sm:p-5 2xl:p-6 flex flex-col justify-between hover:border-amber-500/40 hover:bg-[#151C2C] transition-all group">
            <div className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-xl 2xl:rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <Gift className="w-5 h-5 2xl:w-7 2xl:h-7" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm 2xl:text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                Wallet Cashback
              </h3>
              <p className="text-[11px] sm:text-xs 2xl:text-sm text-slate-400 leading-relaxed">
                Earn instant bonus wallet credits on every recharge.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Limited Time Offer Gold Card matching screenshot */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#F59E0B] via-[#EAB308] to-[#D97706] rounded-2xl 2xl:rounded-3xl p-5 sm:p-6 2xl:p-8 text-black relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[260px]">
          
          {/* Subtle Background Lighting */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/15 text-slate-950 font-bold text-xs 2xl:text-sm mb-3 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-950" />
              <span>Limited Time Offer</span>
            </div>

            {/* Countdown Display matching screenshot: 02 : 45 : 18 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-black/90 text-amber-400 font-mono text-xl sm:text-2xl 2xl:text-3xl font-black px-2.5 2xl:px-4 py-1.5 2xl:py-2.5 rounded-lg 2xl:rounded-xl shadow-inner">
                {format2(timeLeft.hours)}
              </div>
              <span className="text-black font-black text-xl 2xl:text-2xl">:</span>
              <div className="bg-black/90 text-amber-400 font-mono text-xl sm:text-2xl 2xl:text-3xl font-black px-2.5 2xl:px-4 py-1.5 2xl:py-2.5 rounded-lg 2xl:rounded-xl shadow-inner">
                {format2(timeLeft.minutes)}
              </div>
              <span className="text-black font-black text-xl 2xl:text-2xl">:</span>
              <div className="bg-black/90 text-amber-400 font-mono text-xl sm:text-2xl 2xl:text-3xl font-black px-2.5 2xl:px-4 py-1.5 2xl:py-2.5 rounded-lg 2xl:rounded-xl shadow-inner">
                {format2(timeLeft.seconds)}
              </div>
            </div>

            {/* Label indicators below numbers */}
            <div className="flex gap-7 2xl:gap-10 text-[10px] 2xl:text-xs font-bold text-black/70 mb-3 pl-1">
              <span>Hrs</span>
              <span>Mins</span>
              <span>Secs</span>
            </div>

            {/* Headline */}
            <p className="font-extrabold text-sm sm:text-base 2xl:text-lg text-slate-950 max-w-[210px] 2xl:max-w-xs leading-snug mb-4">
              Get up to 10% Bonus on selected top-ups!
            </p>
          </div>

          {/* CTA Button & Gift Box SVG Graphic */}
          <div className="flex items-center justify-between mt-2">
            <button
              id="flash-sale-topup-btn"
              onClick={onFlashSaleClick}
              className="bg-black hover:bg-slate-900 text-amber-400 font-extrabold text-xs sm:text-sm 2xl:text-base px-5 2xl:px-7 py-2.5 2xl:py-3.5 rounded-xl 2xl:rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 z-10"
            >
              Top Up Now
            </button>

            {/* 3D Treasure / Diamond Chest Graphic */}
            <div className="relative -mb-2 -mr-2 w-24 h-24 sm:w-28 sm:h-28 2xl:w-36 2xl:h-36 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                <defs>
                  <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="30%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#CA8A04" />
                  </linearGradient>
                  <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#67E8F9" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                </defs>

                {/* Gift Box Base */}
                <polygon points="20,50 50,65 80,50 50,35" fill="url(#boxGrad)" stroke="#854D0E" strokeWidth="1.5" />
                <polygon points="20,50 50,65 50,90 20,75" fill="#CA8A04" stroke="#854D0E" strokeWidth="1.5" />
                <polygon points="50,65 80,50 80,75 50,90" fill="#A16207" stroke="#854D0E" strokeWidth="1.5" />

                {/* Glowing Diamonds popping out */}
                <polygon points="50,20 62,32 50,44 38,32" fill="url(#gemGrad)" stroke="#FFF" strokeWidth="1.2" />
                <polygon points="32,28 40,36 32,44 24,36" fill="url(#gemGrad)" stroke="#FFF" strokeWidth="0.8" />
                <polygon points="68,26 76,34 68,42 60,34" fill="url(#gemGrad)" stroke="#FFF" strokeWidth="0.8" />
                <circle cx="50" cy="12" r="2" fill="#FFF" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
