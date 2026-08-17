import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Package, 
  Bell, 
  Tag, 
  LifeBuoy, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { User, Order, NotificationItem, SupportTicket, Coupon } from '../types';
import { INITIAL_COUPONS } from '../data/mockData';

interface AccountDashboardProps {
  user: User;
  orders: Order[];
  notifications: NotificationItem[];
  supportTickets: SupportTicket[];
  onOpenCreateTicket: () => void;
  onMarkNotificationRead: (id: string) => void;
  onSelectGameTopUp?: (gameId: string) => void;
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({
  user,
  orders = [],
  notifications = [],
  supportTickets = [],
  onOpenCreateTicket,
  onMarkNotificationRead,
  onSelectGameTopUp
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'coupons' | 'notifications' | 'support' | 'profile'>('orders');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 2xl:py-16 min-h-screen text-white">
      
      {/* Account Header Card */}
      <div className="bg-gradient-to-r from-[#111622] via-[#151C2C] to-[#1A2234] border border-[#242E42] rounded-3xl 2xl:rounded-4xl p-6 sm:p-8 2xl:p-10 shadow-xl mb-8 2xl:mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500 text-black font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{user.name}</h1>
              {user.isAdmin && (
                <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400">{user.email}</p>
            <p className="text-[11px] text-slate-500 mt-1">Gamer Member • Instant QR Top-Ups Enabled</p>
          </div>
        </div>

        {/* Quick Order Stats in Header */}
        <div className="bg-[#0B0E14]/80 border border-[#242E42] rounded-2xl p-4 sm:p-5 flex items-center gap-6 w-full md:w-auto">
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Purchases</span>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">{orders.length}</p>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <span className="text-xs text-slate-400 font-medium">Account Status</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-4 h-4" /> Verified Gamer
            </p>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#242E42] mb-8">
        {[
          { id: 'orders', label: 'My Orders & Invoices', icon: Package, count: orders.length },
          { id: 'coupons', label: 'Coupons & Rewards', icon: Tag },
          { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications.filter(n => !n.isRead).length },
          { id: 'support', label: 'Support Tickets', icon: LifeBuoy, count: supportTickets.length },
          { id: 'profile', label: 'Profile Settings', icon: UserIcon }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-[#111622] hover:bg-[#182030] text-slate-300 border border-[#242E42]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-black text-amber-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Purchase History & Instant Invoices</h2>
            <span className="text-xs text-slate-400">{orders.length} transactions total</span>
          </div>

          {orders.length === 0 ? (
            <div className="bg-[#111622] border border-[#242E42] rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">No top-up orders yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Browse our wide selection of mobile and PC games and recharge instantly with our secure developer QR code.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#111622] border border-[#242E42] hover:border-amber-500/30 rounded-2xl p-4 sm:p-5 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242E42] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                        {order.id}
                      </span>
                      <span className="text-xs text-slate-400">• {order.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        order.orderStatus === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : order.orderStatus === 'Processing'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {order.orderStatus === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {order.orderStatus}
                      </span>
                      <span className="text-xs font-black text-amber-400">
                        ₹{order.finalAmount}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Game & Package</span>
                      <p className="font-bold text-white mt-0.5">{order.gameName}</p>
                      <p className="text-amber-400 font-semibold text-[11px]">{order.packageName}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Player Credentials</span>
                      <p className="font-mono text-white mt-0.5">
                        {order.playerInfo ? Object.entries(order.playerInfo).map(([k, v]) => `${k}: ${v}`).join(' | ') : 'N/A'}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Payment Reference</span>
                      <p className="text-slate-300 font-mono text-[11px] mt-0.5 truncate">
                        {order.paymentMethod} • {order.transactionId || 'Instant QR Verified'}
                      </p>
                      {order.deliveryNotes && (
                        <p className="text-emerald-400 text-[10px] mt-0.5">{order.deliveryNotes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Coupons & Rewards */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Active Promo Coupons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {INITIAL_COUPONS.map((coupon) => (
              <div key={coupon.id} className="bg-[#111622] border border-[#242E42] rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg">
                    {coupon.code}
                  </span>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedCode === coupon.code ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-medium">{coupon.description}</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-[#242E42] flex justify-between">
                  <span>Min order: ₹{coupon.minOrder}</span>
                  <span>Expires: {coupon.expiryDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-lg font-bold text-white">Your Notifications</h2>
          <div className="bg-[#111622] border border-[#242E42] rounded-2xl divide-y divide-[#242E42]">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    {n.title}
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-slate-500">{n.date}</span>
                </div>
                {!n.isRead && (
                  <button
                    onClick={() => onMarkNotificationRead(n.id)}
                    className="text-[11px] text-amber-400 hover:underline font-semibold"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Support */}
      {activeTab === 'support' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Support Tickets</h2>
            <button
              onClick={onOpenCreateTicket}
              className="bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all"
            >
              + Open New Ticket
            </button>
          </div>

          {supportTickets.length === 0 ? (
            <div className="bg-[#111622] border border-[#242E42] rounded-2xl p-8 text-center text-xs text-slate-400">
              No active support tickets. Need help? Click "Open New Ticket" above.
            </div>
          ) : (
            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="bg-[#111622] border border-[#242E42] rounded-2xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{ticket.subject}</span>
                    <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{ticket.message}</p>
                  <div className="text-[10px] text-slate-500 flex justify-between pt-1">
                    <span>Category: {ticket.category}</span>
                    <span>Created: {ticket.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Profile */}
      {activeTab === 'profile' && (
        <div className="max-w-xl bg-[#111622] border border-[#242E42] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Profile Details</h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={user.email}
                disabled
                className="w-full bg-[#151C2C]/50 border border-[#242E42] rounded-xl px-3.5 py-2 text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                defaultValue={user.phone || '+91 '}
                className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2 text-white"
              />
            </div>
          </div>
          <button
            onClick={() => alert('Profile updated successfully!')}
            className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-5 py-2 rounded-xl text-xs transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}

    </div>
  );
};
