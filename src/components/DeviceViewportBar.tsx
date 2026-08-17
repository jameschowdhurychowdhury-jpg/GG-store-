import React from 'react';
import { Smartphone, Tablet, Laptop, Tv, Maximize2, Sparkles, Check } from 'lucide-react';

export type ScreenMode = 'responsive' | 'phone' | 'tablet' | 'laptop' | 'tv';

interface DeviceViewportBarProps {
  currentMode: ScreenMode;
  onSelectMode: (mode: ScreenMode) => void;
  isTvMode: boolean;
  onToggleTvMode: () => void;
}

export const DeviceViewportBar: React.FC<DeviceViewportBarProps> = ({
  currentMode,
  onSelectMode,
  isTvMode,
  onToggleTvMode
}) => {
  const devices = [
    { id: 'responsive' as ScreenMode, label: 'Auto Scale', icon: Maximize2, desc: 'Adapts to your actual screen width' },
    { id: 'phone' as ScreenMode, label: 'Phone', icon: Smartphone, desc: 'Mobile Screen (390px)' },
    { id: 'tablet' as ScreenMode, label: 'Pad / Tablet', icon: Tablet, desc: 'iPad / Tablet Screen (768px)' },
    { id: 'laptop' as ScreenMode, label: 'Laptop', icon: Laptop, desc: 'Laptop Screen (1280px)' },
    { id: 'tv' as ScreenMode, label: 'TV / Panel', icon: Tv, desc: 'Smart TV & 4K Panels (1920px+)' }
  ];

  return (
    <div className="bg-[#080B10] border-b border-[#1E293B] text-slate-300 py-1.5 px-3 sm:px-6 relative z-40 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Multi-Screen Display:</span>
          </span>
          <span className="hidden sm:inline text-slate-400">
            Optimized for Phone, Pad, Laptop & TV/Panel screens
          </span>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
          {devices.map((dev) => {
            const Icon = dev.icon;
            const isSelected = currentMode === dev.id;
            return (
              <button
                key={dev.id}
                onClick={() => onSelectMode(dev.id)}
                title={dev.desc}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'bg-[#151C2C] hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{dev.label}</span>
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </button>
            );
          })}

          {/* TV Theater Mode Toggle */}
          <button
            onClick={onToggleTvMode}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
              isTvMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-[#151C2C] text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Enlarges typography and maximizes contrast for viewing on TV / Large Panel screens"
          >
            <Tv className="w-3 h-3 text-amber-400" />
            <span>TV UI Mode: {isTvMode ? 'ON' : 'OFF'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
