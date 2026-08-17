import React, { useState, useEffect } from 'react';
import { Zap, Gamepad2, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { GGBadgeLogo } from './GGBadgeLogo';

interface HeroBannerProps {
  onTopUpClick: () => void;
  onViewGamesClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onTopUpClick,
  onViewGamesClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: '#1 Trusted Top Up Platform',
      title1: 'Top Up Instantly.',
      title2: 'Play Limitlessly.',
      tagline: 'Safe • Fast • Affordable',
      desc: 'Instant top-ups for all your favorite games. Trusted by thousands of gamers across India.',
      cta1: 'Top Up Now',
      cta2: 'View All Games'
    },
    {
      badge: '⚡ Instant Auto Delivery',
      title1: 'Get Diamonds & UC',
      title2: 'In 30 Seconds.',
      tagline: 'Direct In-Game Crediting',
      desc: 'Official direct top-up via Character ID & UID without sharing login details.',
      cta1: 'Explore Top-Ups',
      cta2: 'Check Offers'
    },
    {
      badge: '🔥 Season Flash Sale',
      title1: 'Save Big on Royale Pass',
      title2: '& Diamond Passes.',
      tagline: 'Flat Discounts • Extra Cashback',
      desc: 'Use promo code GG10 or FLASH20 at checkout for instant discounts on all game packages.',
      cta1: 'Claim Discount',
      cta2: 'View All Games'
    }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B0E14] via-[#101726] to-[#0A0D14] border-b border-[#1E293B]">
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-16 md:py-20 2xl:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 2xl:gap-16 items-center">
          
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 text-left space-y-5 sm:space-y-6 2xl:space-y-8">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 2xl:px-5 2xl:py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm 2xl:text-base font-semibold backdrop-blur-sm shadow-sm animate-pulse-subtle">
              <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-400" />
              <span>{slide.badge}</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black text-white tracking-tight leading-[1.1]">
                {slide.title1}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                  {slide.title2}
                </span>
              </h1>
            </div>

            {/* Safe • Fast • Affordable Subtitle */}
            <p className="text-base sm:text-lg 2xl:text-2xl font-bold text-amber-400 tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 2xl:w-7 2xl:h-7 inline text-amber-400" />
              {slide.tagline}
            </p>

            {/* Supporting Description */}
            <p className="text-slate-300 text-sm sm:text-base 2xl:text-xl max-w-xl 2xl:max-w-3xl leading-relaxed">
              {slide.desc}
            </p>

            {/* Action Buttons Matching Screenshot */}
            <div className="flex flex-wrap items-center gap-3.5 2xl:gap-5 pt-2">
              <button
                id="hero-topup-now-btn"
                onClick={onTopUpClick}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold px-6 sm:px-7 2xl:px-9 py-3 2xl:py-4 rounded-xl 2xl:rounded-2xl text-sm sm:text-base 2xl:text-lg transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <Zap className="w-5 h-5 2xl:w-6 2xl:h-6 fill-black" />
                {slide.cta1}
              </button>

              <button
                id="hero-view-games-btn"
                onClick={onViewGamesClick}
                className="flex items-center gap-2 bg-[#151C2C] hover:bg-[#1C263C] text-white font-bold px-6 sm:px-7 2xl:px-9 py-3 2xl:py-4 rounded-xl 2xl:rounded-2xl text-sm sm:text-base 2xl:text-lg border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <Gamepad2 className="w-5 h-5 2xl:w-6 2xl:h-6 text-amber-400" />
                {slide.cta2}
              </button>
            </div>

          </div>

          {/* Right Hero Visual - Golden GG Crest Emblem */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <GGBadgeLogo size="hero" />
          </div>

        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#151C2C]/80 hover:bg-[#1E293B] text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-sm transition-all hidden sm:flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#151C2C]/80 hover:bg-[#1E293B] text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-sm transition-all hidden sm:flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Dot Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
