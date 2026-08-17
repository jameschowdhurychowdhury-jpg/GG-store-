import React from 'react';

export const PaymentMethods: React.FC = () => {
  return (
    <section className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 2xl:py-14">
      <h2 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-white tracking-tight mb-4">
        Trusted Payment Methods
      </h2>

      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-between gap-4 md:gap-8 overflow-x-auto">
        
        {/* UPI Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-black text-slate-800 text-sm tracking-wider">UPI</span>
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
        </div>

        {/* PhonePe Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="w-6 h-6 rounded-full bg-[#5f259f] text-white text-xs font-black flex items-center justify-center">
            पे
          </div>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">PhonePe</span>
        </div>

        {/* G Pay Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-bold text-[#4285F4] text-sm">G</span>
          <span className="font-bold text-slate-700 text-xs sm:text-sm">Pay</span>
        </div>

        {/* Paytm Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-black text-[#002E6E] text-xs sm:text-sm">pay</span>
          <span className="font-black text-[#00BAF2] text-xs sm:text-sm">tm</span>
        </div>

        {/* VISA */}
        <div className="flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-black italic text-[#1A1F71] text-base tracking-wider">VISA</span>
        </div>

        {/* Mastercard */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex -space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
            <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-80" />
          </div>
          <span className="text-[11px] font-bold text-slate-800 ml-1">mastercard</span>
        </div>

        {/* RuPay */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-black text-slate-900 text-xs sm:text-sm">RuPay</span>
          <span className="text-orange-500 font-bold text-xs">❯❯</span>
        </div>

      </div>
    </section>
  );
};
