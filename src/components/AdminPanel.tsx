import React, { useState } from 'react';
import { ShieldCheck, Package, Gamepad2, Tag, Users, Settings, Plus, Check, RefreshCw, X } from 'lucide-react';
import { Game, Order, Coupon, User } from '../types';

interface AdminPanelProps {
  games: Game[];
  orders: Order[];
  coupons: Coupon[];
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  onAddCoupon: (coupon: Coupon) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  games,
  orders,
  coupons,
  onUpdateOrderStatus,
  onAddCoupon,
  onClose
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'games' | 'coupons' | 'settings'>('orders');
  
  // New coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newDiscountVal, setNewDiscountVal] = useState(15);
  const [newMinOrder, setNewMinOrder] = useState(100);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;

    onAddCoupon({
      id: `c_${Date.now()}`,
      code: newCouponCode.toUpperCase(),
      discountType: 'percentage',
      discountValue: Number(newDiscountVal),
      minOrder: Number(newMinOrder),
      expiryDate: '2026-12-31',
      description: `${newDiscountVal}% OFF on orders above ₹${newMinOrder}`,
      isActive: true,
      usedCount: 0,
      usageLimit: 1000
    });

    setNewCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0E14] overflow-y-auto text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-[#111622] border border-amber-500/40 rounded-3xl p-6 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">GG-store Admin Console</h1>
              <p className="text-xs text-slate-400">Manage orders, catalog, coupons, and system settings</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <X className="w-4 h-4" /> Exit Console
          </button>
        </div>

        {/* Admin Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'orders', label: 'All Orders', icon: Package, count: orders.length },
            { id: 'games', label: 'Games Catalog', icon: Gamepad2, count: games.length },
            { id: 'coupons', label: 'Promo Coupons', icon: Tag, count: coupons.length },
            { id: 'settings', label: 'System Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-[#111622] hover:bg-[#182030] text-slate-300 border border-[#242E42]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-black text-amber-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB: Orders Management */}
        {activeAdminTab === 'orders' && (
          <div className="bg-[#111622] border border-[#242E42] rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Live Customer Orders</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#242E42] text-slate-400">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Game & Package</th>
                    <th className="pb-3 font-semibold">Player Info</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242E42]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/40">
                      <td className="py-3 font-mono font-bold text-amber-400">{ord.id}</td>
                      <td className="py-3 text-slate-200">
                        {ord.userName}
                        <br />
                        <span className="text-[10px] text-slate-400">{ord.userEmail}</span>
                      </td>
                      <td className="py-3">
                        <span className="font-bold text-white">{ord.gameName}</span>
                        <br />
                        <span className="text-[10px] text-slate-400">{ord.packageName}</span>
                      </td>
                      <td className="py-3 font-mono text-slate-300">
                        {Object.entries(ord.playerInfo).map(([k, v]) => (
                          <div key={k}>{k}: {v}</div>
                        ))}
                      </td>
                      <td className="py-3 font-black text-amber-400">₹{ord.finalAmount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.orderStatus === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                          className="bg-[#151C2C] border border-[#242E42] rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="Completed">Completed</option>
                          <option value="Processing">Processing</option>
                          <option value="Payment Pending">Payment Pending</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: Games Catalog */}
        {activeAdminTab === 'games' && (
          <div className="bg-[#111622] border border-[#242E42] rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Active Games & Denominations</h2>
              <span className="text-xs text-slate-400">{games.length} games configured</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((g) => (
                <div key={g.id} className="bg-[#151C2C] border border-[#242E42] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={g.image} alt={g.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{g.name}</h4>
                      <p className="text-xs text-slate-400">{g.packages.length} Packages • Min ₹{g.minPrice}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{g.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Coupons */}
        {activeAdminTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-[#111622] border border-[#242E42] rounded-3xl p-6 space-y-4">
              <h2 className="text-base font-bold text-white">Create New Coupon</h2>
              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SUMMER25"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newDiscountVal}
                    onChange={(e) => setNewDiscountVal(Number(e.target.value))}
                    className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Min Order Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-2.5 rounded-xl text-xs"
                >
                  Save Coupon
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 bg-[#111622] border border-[#242E42] rounded-3xl p-6 space-y-3">
              <h2 className="text-base font-bold text-white">Existing Promo Codes</h2>
              <div className="divide-y divide-[#242E42]">
                {coupons.map((c) => (
                  <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-amber-400 text-sm">{c.code}</span>
                      <p className="text-slate-400 mt-0.5">{c.description}</p>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Settings */}
        {activeAdminTab === 'settings' && (
          <div className="bg-[#111622] border border-[#242E42] rounded-3xl p-6 space-y-4 max-w-xl text-xs">
            <h2 className="text-base font-bold text-white">Marketplace & Provider Config</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#151C2C] rounded-xl">
                <div>
                  <p className="font-bold text-white">Development Sandbox Mode</p>
                  <p className="text-slate-400 text-[11px]">Simulates instant payments and top-ups without debiting real bank accounts</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full">
                  Enabled
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#151C2C] rounded-xl">
                <div>
                  <p className="font-bold text-white">Auto In-Game Delivery</p>
                  <p className="text-slate-400 text-[11px]">Automatically dispatches game currency to player UID</p>
                </div>
                <span className="bg-amber-500/20 text-amber-400 font-bold px-2.5 py-1 rounded-full">
                  Active (30s)
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
