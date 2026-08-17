import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  Wallet, 
  Package, 
  Bell, 
  ShieldCheck,
  Tag,
  HelpCircle,
  Gamepad2
} from 'lucide-react';
import { GGBadgeLogo } from './GGBadgeLogo';
import { User, NotificationItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  cartCount: number;
  onOpenCart: () => void;
  notifications: NotificationItem[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  currentUser,
  onOpenAuth,
  onLogout,
  cartCount = 0,
  onOpenCart,
  notifications = [],
  isDarkMode,
  toggleDarkMode,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadNotifs = (notifications || []).filter(n => !n.isRead).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'games', label: 'Games' },
    { id: 'topup', label: 'Top Up' },
    { id: 'offers', label: 'Offers' },
    { id: 'support', label: 'Support' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0E14]/95 backdrop-blur-md border-b border-[#1E293B] text-white">
      <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 2xl:h-24 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            id="brand-logo"
            onClick={() => { setActiveTab('home'); }} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <GGBadgeLogo size="md" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl 2xl:text-3xl font-black tracking-tight text-white flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                GG<span className="text-amber-400">-store</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-4">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id);
                  }}
                  className={`px-3.5 py-2 2xl:px-5 2xl:py-2.5 rounded-lg text-sm 2xl:text-base font-medium transition-all relative ${
                    isActive 
                      ? 'text-amber-400 font-semibold bg-amber-400/10' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md 2xl:max-w-xl mx-2 relative">
            <div className="relative">
              <input
                id="global-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search games or products..."
                className="w-full bg-[#151C2C] border border-[#242E42] text-sm 2xl:text-base text-slate-100 placeholder-slate-400 rounded-full pl-4 pr-10 py-2 sm:py-2.5 2xl:py-3 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
              <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Cart / Bag Icon */}
            <button
              id="cart-btn"
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B0E14]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notifications (If Logged In) */}
            {currentUser && (
              <div className="relative">
                <button
                  id="notifications-btn"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  aria-label="Notifications"
                  className="relative p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-full transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifs > 0 && (
                    <span className="absolute 1 top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                  )}
                  {unreadNotifs > 0 && (
                    <span className="absolute 1 top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#151C2C] border border-[#242E42] rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#242E42] flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-200">Notifications</span>
                      <span className="text-xs text-amber-400">{unreadNotifs} new</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-[#242E42]/50">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-xs text-slate-400">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.slice(0, 5).map((n) => (
                          <div key={n.id} className="px-4 py-2.5 hover:bg-slate-800/60 transition-colors">
                            <p className="text-xs font-medium text-slate-200">{n.title}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{n.message}</p>
                            <span className="text-[10px] text-slate-500">{n.date}</span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-4 pt-2 border-t border-[#242E42]">
                      <button
                        onClick={() => {
                          setActiveTab('account');
                          setNotifDropdownOpen(false);
                        }}
                        className="w-full text-center text-xs text-amber-400 hover:underline py-1"
                      >
                        View all in Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-full transition-colors hidden sm:flex"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Quick Admin Access Button (Only for authenticated admin) */}
            {currentUser?.isAdmin && onOpenAdmin && (
              <button
                id="admin-quick-btn"
                onClick={onOpenAdmin}
                title="Master Admin Console"
                className="hidden sm:flex items-center gap-1.5 bg-[#151C2C] hover:bg-amber-400/20 text-amber-400 border border-amber-500/40 hover:border-amber-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin</span>
              </button>
            )}

            {/* User Auth or Profile Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-[#1A2234] border border-amber-500/40 hover:border-amber-400 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[90px] truncate">{currentUser.name}</span>
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#151C2C] border border-[#242E42] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-[#242E42]">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    
                    <button
                      onClick={() => { setActiveTab('account'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4" /> Account Dashboard
                    </button>
                    
                    <button
                      onClick={() => { setActiveTab('account'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" /> My Orders
                    </button>

                    {currentUser.isAdmin && onOpenAdmin && (
                      <button
                        onClick={() => { onOpenAdmin(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-amber-400 hover:bg-slate-800 flex items-center gap-2 font-medium"
                      >
                        <ShieldCheck className="w-4 h-4" /> Admin Console
                      </button>
                    )}

                    <div className="border-t border-[#242E42] mt-1 pt-1">
                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="login-header-btn"
                  onClick={() => onOpenAuth('login')}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all shadow-md hover:shadow-amber-500/20 active:scale-95"
                >
                  Login
                </button>
                <button
                  id="register-header-btn"
                  onClick={() => onOpenAuth('register')}
                  className="hidden sm:inline-flex bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all border border-slate-700 hover:border-slate-600"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Mobile Menu"
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1420] border-b border-[#242E42] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activeTab === link.id
                    ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                    : 'text-slate-300 bg-slate-800/40 hover:bg-slate-800'
                }`}
              >
                {link.id === 'games' && <Gamepad2 className="w-4 h-4" />}
                {link.id === 'offers' && <Tag className="w-4 h-4" />}
                {link.id === 'support' && <HelpCircle className="w-4 h-4" />}
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#242E42] flex items-center justify-between">
            <span className="text-xs text-slate-400">Theme</span>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          {currentUser ? (
            <div className="pt-2 border-t border-[#242E42] space-y-2">
              <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                  <p className="text-xs text-slate-400">{currentUser.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                    {currentUser.isAdmin ? 'Admin' : 'Member'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveTab('account'); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 text-center"
                >
                  My Orders
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-xs font-semibold text-red-400 text-center"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-lg bg-amber-400 text-black text-sm font-bold text-center shadow"
              >
                Login
              </button>
              <button
                onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-semibold text-center border border-slate-700"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
