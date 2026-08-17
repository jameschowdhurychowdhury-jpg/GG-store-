import React, { useState } from 'react';
import { LifeBuoy, MessageSquare, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SupportTicket, User } from '../types';

interface SupportPageProps {
  currentUser: User | null;
  supportTickets: SupportTicket[];
  onCreateTicket: (ticket: Partial<SupportTicket>) => void;
  onOpenAuth: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({
  currentUser,
  supportTickets,
  onCreateTicket,
  onOpenAuth
}) => {
  const [category, setCategory] = useState<'Top-Up Issue' | 'Payment Failed' | 'Wallet' | 'Account' | 'Other'>('Top-Up Issue');
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    onCreateTicket({
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser ? currentUser.id : 'guest',
      userName: currentUser ? currentUser.name : 'Valued Gamer',
      orderId: orderId || undefined,
      category,
      subject,
      message,
      status: 'Open',
      createdAt: new Date().toLocaleString(),
      replies: [
        {
          id: 'rep_1',
          sender: 'support',
          senderName: 'GG-store Support Bot',
          message: 'Thank you for contacting GG-store. An agent is reviewing your query.',
          timestamp: 'Just now'
        }
      ]
    });

    setSubmitted(true);
    setSubject('');
    setMessage('');
    setOrderId('');
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 2xl:py-16 min-h-screen text-white">
      
      {/* Header */}
      <div className="text-center max-w-2xl 2xl:max-w-4xl mx-auto mb-10 2xl:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3">
          <LifeBuoy className="w-4 h-4" />
          <span>24/7 Gamer Support Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          How Can We Help You?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Our specialized gaming support team is active 24/7 to resolve any recharge or order issues.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Support Ticket Form */}
        <div className="lg:col-span-7 bg-[#111622] border border-[#242E42] rounded-3xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">Open a Support Ticket</h2>
          
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Ticket Submitted Successfully!</h3>
              <p className="text-xs text-slate-300">
                Our support team will review your order details and respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-amber-400 text-black font-bold text-xs px-5 py-2.5 rounded-xl mt-3"
              >
                Open Another Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Top-Up Issue">Game Top-Up Delivery Delay</option>
                  <option value="Payment Failed">Payment Debited but Pending</option>
                  <option value="Wallet">GG Wallet Balance Issue</option>
                  <option value="Account">Account / Login Query</option>
                  <option value="Other">General Question</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Order ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. ORD-882910"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of your query"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description / Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your issue with Player ID and transaction reference if available..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Support Request
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Live Hours */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#111622] border border-[#242E42] rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Direct Support Channels
            </h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-[#151C2C] rounded-xl border border-[#242E42]">
                <p className="font-bold text-white">Email Support:</p>
                <p className="text-amber-400 font-mono">support@ggstore.in</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Average response time: &lt; 15 mins</p>
              </div>

              <div className="p-3 bg-[#151C2C] rounded-xl border border-[#242E42]">
                <p className="font-bold text-white">Telegram / WhatsApp Live:</p>
                <p className="text-amber-400 font-mono">@GGstoreIndiaSupport</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Available 24 hours daily</p>
              </div>
            </div>
          </div>

          {/* User's recent tickets */}
          <div className="bg-[#111622] border border-[#242E42] rounded-3xl p-6">
            <h3 className="text-base font-bold text-white mb-3">Your Support Tickets</h3>
            {supportTickets.length === 0 ? (
              <p className="text-xs text-slate-500">No previous tickets opened.</p>
            ) : (
              <div className="space-y-2">
                {supportTickets.map((t) => (
                  <div key={t.id} className="p-3 bg-[#151C2C] rounded-xl border border-[#242E42] text-xs">
                    <div className="flex justify-between font-bold text-white">
                      <span>{t.subject}</span>
                      <span className="text-amber-400">{t.status}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{t.createdAt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
