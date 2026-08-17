import React from 'react';
import { CheckCircle2, Zap, Package, ArrowRight, Download, Share2 } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewOrders
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111622] border border-amber-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Success Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Top-Up Successful!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Your diamonds/currency have been dispatched and credited to your game account.
          </p>
        </div>

        {/* Receipt Details Box */}
        <div className="my-6 bg-[#151C2C] border border-[#242E42] rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#242E42]">
            <span className="text-slate-400">Order ID:</span>
            <span className="font-mono font-bold text-amber-400">{order.id}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Game:</span>
            <span className="font-bold text-white">{order.gameName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Package:</span>
            <span className="font-bold text-amber-300">{order.packageName}</span>
          </div>

          {/* Player Info fields */}
          {Object.entries(order.playerInfo).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-slate-400 capitalize">{key.replace('_', ' ')}:</span>
              <span className="font-mono font-bold text-white">{val}</span>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Amount Paid:</span>
            <span className="font-black text-white text-sm">₹{order.finalAmount}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#242E42]">
            <span className="text-slate-400">Status:</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3 fill-emerald-400" /> Completed
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onViewOrders}
            className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow"
          >
            <Package className="w-4 h-4" /> View My Orders
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-[#1A2234] hover:bg-slate-800 text-slate-200 font-bold py-3 rounded-xl text-xs sm:text-sm border border-slate-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
