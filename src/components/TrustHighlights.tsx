import React from 'react';
import { Zap, ShieldCheck, Tag, Headphones } from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Zap,
      title: 'Instant Delivery',
      subtitle: 'Fast & Automatic Top Up',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      icon: ShieldCheck,
      title: '100% Secure',
      subtitle: 'Secure Payments',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      icon: Tag,
      title: 'Best Prices',
      subtitle: 'Affordable Top Ups',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: "We're Here For You",
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    }
  ];

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 -mt-6 sm:-mt-8 2xl:-mt-10 relative z-20">
      <div className="bg-[#111622] border border-[#242E42] rounded-2xl 2xl:rounded-3xl shadow-xl p-4 sm:p-6 2xl:p-8 backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#242E42]/60">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className={`flex items-center gap-3 sm:gap-4 2xl:gap-5 ${idx > 0 ? 'pt-3 sm:pt-0 sm:pl-6 2xl:pl-8' : ''}`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 rounded-xl 2xl:rounded-2xl ${item.bgColor} flex items-center justify-center flex-shrink-0 border border-amber-500/20`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 2xl:w-8 2xl:h-8 ${item.color}`} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm 2xl:text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs 2xl:text-sm text-slate-400 font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
