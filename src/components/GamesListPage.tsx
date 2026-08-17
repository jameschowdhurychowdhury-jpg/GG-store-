import React, { useState } from 'react';
import { Game, GameCategory } from '../types';
import { Search, Flame, ChevronRight, Gamepad2, Sparkles, Filter } from 'lucide-react';

interface GamesListPageProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const GamesListPage: React.FC<GamesListPageProps> = ({
  games,
  onSelectGame,
  searchTerm,
  setSearchTerm
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('All');

  const categories: GameCategory[] = ['All', 'Battle Royale', 'Action', 'FPS', 'RPG', 'Strategy', 'Gift Cards'];

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.currencyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || game.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 2xl:py-16 min-h-screen text-white">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 2xl:mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs 2xl:text-sm font-semibold mb-2">
            <Gamepad2 className="w-4 h-4 2xl:w-5 2xl:h-5" />
            <span>Game Recharges</span>
          </div>
          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-white tracking-tight">
            All Supported Games & Gift Cards
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 2xl:w-96">
          <input
            type="text"
            placeholder="Search game name or currency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111622] border border-[#242E42] text-sm 2xl:text-base text-white placeholder-slate-400 rounded-xl pl-4 pr-10 py-2.5 2xl:py-3 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 2xl:gap-3 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl text-xs sm:text-sm 2xl:text-base font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-[#111622] hover:bg-[#182030] text-slate-300 border border-[#242E42]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="bg-[#111622] border border-[#242E42] rounded-3xl p-12 text-center space-y-3">
          <Gamepad2 className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Games Found</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            No results match "{searchTerm}". Try another game title or clear filters.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="bg-amber-400 text-black font-bold text-xs px-4 py-2 rounded-xl mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-6 gap-4 sm:gap-5 2xl:gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game)}
              className="group bg-[#111622] hover:bg-[#182030] border border-[#242E42] hover:border-amber-500/50 rounded-2xl 2xl:rounded-3xl p-3 2xl:p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-square rounded-xl 2xl:rounded-2xl overflow-hidden mb-3 bg-slate-800 border border-slate-700/50">
                  <img
                    src={game.image}
                    alt={game.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {game.isHot && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] 2xl:text-xs font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                      <Flame className="w-2.5 h-2.5 fill-white" /> Hot
                    </div>
                  )}
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs text-[9px] 2xl:text-[10px] font-semibold text-amber-300 px-1.5 py-0.5 rounded">
                    Instant
                  </div>
                </div>

                <h3 className="font-bold text-xs sm:text-sm 2xl:text-base text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                  {game.name}
                </h3>
                <p className="text-[11px] 2xl:text-xs text-slate-400 font-medium mb-3">
                  {game.currencyName}
                </p>
              </div>

              <div className="w-full bg-[#1A2234] group-hover:bg-amber-400 border border-[#242E42] group-hover:border-amber-400 py-1.5 2xl:py-2.5 px-2.5 2xl:px-3 rounded-lg 2xl:rounded-xl flex items-center justify-between text-[11px] sm:text-xs 2xl:text-sm font-bold text-slate-200 group-hover:text-black transition-all">
                <span>From ₹{game.minPrice}</span>
                <ChevronRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 group-hover:translate-x-0.5 transition-transform text-slate-400 group-hover:text-black" />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
