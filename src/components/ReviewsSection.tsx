import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onOpenReviewModal?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onOpenReviewModal }) => {
  return (
    <section className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-12 2xl:py-16 border-t border-[#1E293B]">
      <div className="flex items-center justify-between mb-6 sm:mb-8 2xl:mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              What Our Gamers Say
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Over 50,000+ happy Indian gamers trust GG-store for instant recharges
          </p>
        </div>

        {onOpenReviewModal && (
          <button
            onClick={onOpenReviewModal}
            className="text-xs sm:text-sm font-bold bg-[#1A2234] hover:bg-amber-400 hover:text-black text-amber-400 border border-amber-500/30 px-3.5 py-2 rounded-xl transition-all"
          >
            Write a Review
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#111622] border border-[#242E42] rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-amber-500/30 transition-colors"
          >
            <div>
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                    }`}
                  />
                ))}
                <span className="text-[11px] font-bold text-amber-400 ml-1.5">{rev.gameName}</span>
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-sm text-slate-300 italic mb-4 leading-relaxed line-clamp-3">
                "{rev.comment}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between pt-3 border-t border-[#242E42]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                  {rev.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {rev.userName}
                    {rev.isVerified && <CheckCircle className="w-3 h-3 text-emerald-400 inline" />}
                  </h4>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
