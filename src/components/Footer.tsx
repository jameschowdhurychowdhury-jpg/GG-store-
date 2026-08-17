import React, { useState } from 'react';
import { Send, Heart } from 'lucide-react';
import { GGBadgeLogo } from './GGBadgeLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAuth, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#080A0F] border-t border-[#1E293B] text-white pt-12 2xl:pt-16 pb-20 sm:pb-8">
      <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        
        {/* Main Columns matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#1E293B]">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <GGBadgeLogo size="md" />
              <span className="text-xl font-black text-white">
                GG<span className="text-amber-400">-store</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Top up your favorite games instantly and securely. Play more, worry less.
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-[#151C2C] hover:bg-amber-400 hover:text-black text-slate-300 flex items-center justify-center font-bold text-sm transition-all"
              >
                f
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-[#151C2C] hover:bg-amber-400 hover:text-black text-slate-300 flex items-center justify-center font-bold text-xs transition-all"
              >
                📷
              </a>
              <a
                href="#discord"
                aria-label="Discord"
                className="w-8 h-8 rounded-lg bg-[#151C2C] hover:bg-amber-400 hover:text-black text-slate-300 flex items-center justify-center font-bold text-xs transition-all"
              >
                💬
              </a>
              <a
                href="#telegram"
                aria-label="Telegram"
                className="w-8 h-8 rounded-lg bg-[#151C2C] hover:bg-amber-400 hover:text-black text-slate-300 flex items-center justify-center font-bold text-xs transition-all"
              >
                ✈️
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('games')} className="hover:text-amber-400 transition-colors">Games</button></li>
              <li><button onClick={() => onNavigate('topup')} className="hover:text-amber-400 transition-colors">Top Up</button></li>
              <li><button onClick={() => onNavigate('offers')} className="hover:text-amber-400 transition-colors">Offers</button></li>
              <li><button onClick={() => onNavigate('support')} className="hover:text-amber-400 transition-colors">Support</button></li>
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
              Account & Staff
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => onOpenAuth('login')} className="hover:text-amber-400 transition-colors">Login / Register</button></li>
              <li><button onClick={() => onNavigate('account')} className="hover:text-amber-400 transition-colors">My Orders</button></li>
              <li><button onClick={() => onNavigate('offers')} className="hover:text-amber-400 transition-colors">Coupons & Rewards</button></li>
              {onOpenAdmin && (
                <li>
                  <button 
                    onClick={onOpenAdmin} 
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    🔒 Admin Portal (Level-5)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('support')} className="hover:text-amber-400 transition-colors">Help Center</button></li>
              <li><button onClick={() => onNavigate('support')} className="hover:text-amber-400 transition-colors">Contact Us</button></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Terms & Conditions</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Refund Policy</span></li>
            </ul>
          </div>

          {/* Stay Updated / Newsletter matching screenshot */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Get the latest offers and updates straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-1 bg-[#151C2C] border border-[#242E42] rounded-xl p-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 px-2 py-1.5 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-amber-400 hover:bg-amber-300 text-black p-2 rounded-lg transition-colors flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <p className="text-[10px] text-emerald-400 font-medium animate-in fade-in">
                ✓ Subscribed! You will receive exclusive discounts.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2025 GG-store. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for Gamers
          </p>
        </div>

      </div>
    </footer>
  );
};
