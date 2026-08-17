import React from 'react';
import { Home, Gamepad2, Tag, LifeBuoy, User as UserIcon, Wallet } from 'lucide-react';
import { User, NotificationItem } from '../types';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser?: User | null;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  notifications?: NotificationItem[];
  cartCount?: number;
  unreadCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  currentUser = null,
  onOpenAuth,
  notifications = [],
  cartCount,
  unreadCount
}) => {
  const unreadNotifs = unreadCount !== undefined 
    ? unreadCount 
    : (notifications ? notifications.filter(n => !n.isRead).length : 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'offers', label: 'Offers', icon: Tag, badge: 'HOT' },
    { id: 'support', label: 'Support', icon: LifeBuoy },
    { 
      id: 'account', 
      label: currentUser ? 'Account' : 'Login', 
      icon: currentUser ? UserIcon : UserIcon,
      badge: currentUser && unreadNotifs > 0 ? `${unreadNotifs}` : undefined 
    }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'account' && !currentUser) {
      if (onOpenAuth) {
        onOpenAuth('login');
      } else {
        setActiveTab('account');
      }
      return;
    }
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0E14]/95 backdrop-blur-lg border-t border-[#1E293B] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'games' && activeTab === 'game_detail');
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400 font-bold bg-amber-400/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[8px] font-black px-1 py-0.2 rounded-full leading-tight shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[55px]">
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-amber-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
