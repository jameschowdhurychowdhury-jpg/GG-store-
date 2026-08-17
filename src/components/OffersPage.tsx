import React, { useState } from 'react';
import { Sparkles, Tag, Gift, Copy, Check, Zap, Flame, Clock } from 'lucide-react';
import { INITIAL_COUPONS } from '../data/mockData';
import { Game } from '../types';

interface OffersPageProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ games, onSelectGame }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [claimedDailyBonus, setClaimedDailyBonus] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaim = () => {
    setClaimedDailyBonus(true);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 2xl:py-16 min-h-screen text-white">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 2xl:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Exclusive Promotions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          Deals, Coupons & Gamer Bonuses
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Save on every recharge with official promo codes, flash discounts, and daily rewards.
        </p>
      </div>

      {/* Daily Reward Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-black shadow-xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-black text-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Gift className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-black">Daily Gamer Check-In Bonus</h3>
            <p className="text-xs sm:text-sm font-semibold text-black/80">
              Claim ₹10 instant wallet credit bonus every 24 hours.
            </p>
          </div>
        </div>

        <button
          onClick={handleClaim}
          disabled={claimedDailyBonus}
          className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all ${
            claimedDailyBonus
              ? 'bg-emerald-800 text-white cursor-default'
              : 'bg-black hover:bg-slate-900 text-amber-400 active:scale-95'
          }`}
        >
          {claimedDailyBonus ? '✓ Claimed ₹10 Bonus' : 'Claim Daily ₹10 Bonus'}
        </button>
      </div>

      {/* Promo Coupons Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-400" />
          Available Promo Codes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_COUPONS.map((c) => (
            <div
              key={c.id}
              className="bg-[#111622] border border-[#242E42] hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg">
                    {c.code}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-[#242E42] flex items-center justify-between text-xs">
                <span className="text-slate-400">Min order: ₹{c.minOrder}</span>
                <button
                  onClick={() => handleCopy(c.code)}
                  className="bg-[#1A2234] hover:bg-amber-400 hover:text-black text-amber-400 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors"
                >
                  {copiedCode === c.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Deals on Games */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          Hot Deals & Season Passes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.slice(0, 3).map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game)}
              className="bg-[#111622] border border-[#242E42] hover:border-amber-500/40 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-[#151C2C] transition-all group"
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-700 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1">
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                  {game.name}
                </h4>
                <p className="text-xs text-slate-400">{game.currencyName} Top-Ups</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-amber-400">From ₹{game.minPrice}</span>
                  <span className="text-[10px] bg-red-500/10 text-red-400 font-bold px-1.5 py-0.5 rounded">
                    Extra 10% Bonus
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
