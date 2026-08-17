import React from 'react';
import { ChevronRight, Flame, Gamepad2 } from 'lucide-react';
import { Game } from '../types';

interface PopularGamesProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onViewAllClick: () => void;
}

export const PopularGames: React.FC<PopularGamesProps> = ({
  games,
  onSelectGame,
  onViewAllClick
}) => {
  return (
    <section className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-14 2xl:py-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 2xl:mb-10">
        <div className="flex items-center gap-2.5 2xl:gap-4">
          <div className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-lg 2xl:rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400">
            <Gamepad2 className="w-5 h-5 2xl:w-7 2xl:h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-black text-white tracking-tight">
            Popular Games
          </h2>
        </div>

        <button
          id="popular-games-view-all-btn"
          onClick={onViewAllClick}
          className="text-xs sm:text-sm 2xl:text-base font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline group"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Games Cards Grid: 2 cols on mobile, 3 on pad/tablet, 6 on laptop, 6-8 on TV/panels */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 2xl:gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            id={`game-card-${game.id}`}
            onClick={() => onSelectGame(game)}
            className="group bg-[#111622] hover:bg-[#182030] border border-[#242E42] hover:border-amber-500/50 rounded-2xl 2xl:rounded-3xl p-2.5 sm:p-3 2xl:p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
          >
            <div>
              {/* Game Thumbnail */}
              <div className="relative aspect-square rounded-xl 2xl:rounded-2xl overflow-hidden mb-3 bg-slate-800 border border-slate-700/50">
                <img
                  src={game.image}
                  alt={game.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hot Badge */}
                {game.isHot && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] 2xl:text-xs font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                    <Flame className="w-2.5 h-2.5 fill-white" />
                    Hot
                  </div>
                )}
                
                {/* Instant tag */}
                <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs text-[9px] 2xl:text-[11px] font-semibold text-amber-300 px-1.5 py-0.5 rounded">
                  Instant
                </div>
              </div>

              {/* Game Name & Currency */}
              <h3 className="font-bold text-xs sm:text-sm 2xl:text-base text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                {game.name}
              </h3>
              <p className="text-[11px] 2xl:text-xs text-slate-400 font-medium mb-3">
                {game.currencyName}
              </p>
            </div>

            {/* Price Pill Button */}
            <div className="w-full bg-[#1A2234] group-hover:bg-amber-400 border border-[#242E42] group-hover:border-amber-400 py-1.5 2xl:py-2.5 px-2.5 2xl:px-3.5 rounded-lg 2xl:rounded-xl flex items-center justify-between text-[11px] sm:text-xs 2xl:text-sm font-bold text-slate-200 group-hover:text-black transition-all">
              <span>From ₹{game.minPrice}</span>
              <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 group-hover:translate-x-0.5 transition-transform text-slate-400 group-hover:text-black" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
