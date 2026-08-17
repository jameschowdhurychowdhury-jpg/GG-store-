import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { TrustHighlights } from './components/TrustHighlights';
import { PopularGames } from './components/PopularGames';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PaymentMethods } from './components/PaymentMethods';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GameDetailPage } from './components/GameDetailPage';
import { GamesListPage } from './components/GamesListPage';
import { OffersPage } from './components/OffersPage';
import { SupportPage } from './components/SupportPage';
import { AccountDashboard } from './components/AccountDashboard';
import { AuthModal } from './components/AuthModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuthModal } from './components/AdminAuthModal';
import { DeviceViewportBar, ScreenMode } from './components/DeviceViewportBar';
import { MobileBottomNav } from './components/MobileBottomNav';

import { 
  INITIAL_GAMES, 
  INITIAL_COUPONS, 
  INITIAL_REVIEWS, 
  INITIAL_DEMO_USER, 
  INITIAL_DEMO_ORDERS 
} from './data/mockData';
import { Game, User, Order, Coupon, Review, NotificationItem, SupportTicket, WalletTransaction } from './types';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [screenMode, setScreenMode] = useState<ScreenMode>('responsive');
  const [isTvMode, setIsTvMode] = useState<boolean>(false);

  // App Data State
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);

  // User Wallet & Transactions
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([
    {
      id: 'tx_1',
      userId: 'usr_gg_demo',
      type: 'credit',
      amount: 150,
      description: 'Welcome Bonus Credited',
      date: '2025-05-01 10:00'
    },
    {
      id: 'tx_2',
      userId: 'usr_gg_demo',
      type: 'debit',
      amount: 50,
      description: 'Used on BGMI Royale Pass (ORD-771928)',
      date: '2025-05-08 19:10'
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Top-Up Credited!',
      message: 'Your order ORD-882910 of 110 Diamonds is completed.',
      type: 'order',
      isRead: false,
      date: '2 hours ago'
    },
    {
      id: 'n2',
      title: 'Flash Sale Live!',
      message: 'Use code FLASH20 for flat 20% discount today.',
      type: 'promo',
      isRead: false,
      date: '5 hours ago'
    }
  ]);

  // Support Tickets
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-1029',
      userId: 'usr_gg_demo',
      userName: 'Gamer Pro',
      orderId: 'ORD-882910',
      category: 'Top-Up Issue',
      subject: 'Diamond delivery speed query',
      message: 'Just checking if Free Fire Diamonds are instant.',
      status: 'Resolved',
      createdAt: '2025-05-10 14:40',
      replies: [
        {
          id: 'rep_1',
          sender: 'support',
          senderName: 'GG-store Support Agent',
          message: 'Yes! Free Fire MAX top-ups are automatic and take under 30 seconds.',
          timestamp: '2025-05-10 14:42'
        }
      ]
    }
  ]);

  // Modals
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });
  const [newCompletedOrder, setNewCompletedOrder] = useState<Order | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);

  const handleOpenAdmin = () => {
    if (currentUser && currentUser.isAdmin) {
      setShowAdminPanel(true);
    } else {
      setShowAdminAuthModal(true);
    }
  };

  // Dark / Light Mode Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Navigation handlers
  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setActiveTab('game_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateOrder = (orderData: Partial<Order>) => {
    const fullOrder = orderData as Order;
    setOrders((prev) => [fullOrder, ...prev]);
    setNewCompletedOrder(fullOrder);

    // If wallet was used, deduct it
    if (fullOrder.walletUsed > 0 && currentUser) {
      setCurrentUser((prev) =>
        prev ? { ...prev, walletBalance: prev.walletBalance - fullOrder.walletUsed } : null
      );
      setWalletTransactions((prev) => [
        {
          id: `tx_${Date.now()}`,
          userId: fullOrder.userId,
          type: 'debit',
          amount: fullOrder.walletUsed,
          description: `Used on ${fullOrder.gameName} (${fullOrder.id})`,
          date: new Date().toLocaleString()
        },
        ...prev
      ]);
    }

    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Top-Up Order Successful!',
        message: `${fullOrder.packageName} for ${fullOrder.gameName} credited to your ID.`,
        type: 'order',
        isRead: false,
        date: 'Just now'
      },
      ...prev
    ]);
  };

  const handleAddMoneyToWallet = (amount: number) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, walletBalance: prev.walletBalance + amount } : null));
    setWalletTransactions((prev) => [
      {
        id: `tx_${Date.now()}`,
        userId: currentUser.id,
        type: 'credit',
        amount: amount,
        description: 'Wallet Top-Up via UPI',
        date: new Date().toLocaleString()
      },
      ...prev
    ]);
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Wallet Balance Added',
        message: `₹${amount} has been added to your GG Wallet successfully.`,
        type: 'wallet',
        isRead: false,
        date: 'Just now'
      },
      ...prev
    ]);
  };

  const handleCreateTicket = (ticketData: Partial<SupportTicket>) => {
    setSupportTickets((prev) => [ticketData as SupportTicket, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  const handleAddCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  return (
    <div className={`min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-black ${isTvMode ? 'tv-mode' : ''}`}>
      
      {/* Device Viewport Bar for testing & comfortable viewing across Phone, Pad, Laptop, TV */}
      <DeviceViewportBar
        currentMode={screenMode}
        onSelectMode={(mode) => {
          setScreenMode(mode);
          if (mode === 'tv') {
            setIsTvMode(true);
          } else {
            setIsTvMode(false);
          }
        }}
        isTvMode={isTvMode}
        onToggleTvMode={() => setIsTvMode(!isTvMode)}
      />

      {/* Screen Frame Wrapper for simulated devices, or full width if responsive/native */}
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${
        screenMode === 'phone' 
          ? 'max-w-[420px] mx-auto my-4 rounded-[36px] border-4 border-slate-700 shadow-2xl overflow-hidden min-h-[840px] bg-[#0B0E14]' 
          : screenMode === 'tablet' 
          ? 'max-w-[820px] mx-auto my-4 rounded-[28px] border-4 border-slate-700 shadow-2xl overflow-hidden min-h-[900px] bg-[#0B0E14]'
          : screenMode === 'laptop'
          ? 'max-w-[1280px] mx-auto my-2 rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden min-h-screen bg-[#0B0E14]'
          : 'w-full'
      }`}>

        {/* Top Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setSelectedGame(null);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentUser={currentUser}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          onLogout={() => setCurrentUser(null)}
          cartCount={orders.length}
          onOpenCart={() => {
            setActiveTab('account');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          notifications={notifications}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Main Content Area */}
        <main className="flex-1 pb-16 lg:pb-0">
          
          {/* VIEW 1: HOME (Exact match to reference screenshot) */}
          {activeTab === 'home' && (
            <div>
              {/* Hero Banner with Golden GG Emblem */}
              <HeroBanner
                onTopUpClick={() => {
                  // Scroll to popular games or open first game
                  const elem = document.getElementById('game-card-free-fire-max');
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    handleSelectGame(games[1]);
                  }
                }}
                onViewGamesClick={() => {
                  setActiveTab('games');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 4 Trust Highlights (Instant Delivery, 100% Secure, Best Prices, 24/7 Support) */}
              <TrustHighlights />

              {/* Popular Games (6 Cards: Mobile Legends, Free Fire MAX, BGMI, Clash of Clans, Clash Royale, Call of Duty Mobile) */}
              <PopularGames
                games={games.slice(0, 6)}
                onSelectGame={handleSelectGame}
                onViewAllClick={() => {
                  setActiveTab('games');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Why Choose GG-store? + Flash Sale Countdown 02:45:18 */}
              <WhyChooseUs
                onFlashSaleClick={() => {
                  setActiveTab('offers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Trusted Payment Methods (UPI, PhonePe, GPay, Paytm, VISA, MasterCard, RuPay) */}
              <PaymentMethods />

              {/* What Our Gamers Say */}
              <ReviewsSection reviews={reviews} />

              {/* Frequently Asked Questions */}
              <FaqSection />
            </div>
          )}

          {/* VIEW 2: GAME DETAIL & RECHARGE CHECKOUT */}
          {activeTab === 'game_detail' && selectedGame && (
            <GameDetailPage
              game={selectedGame}
              onBack={() => {
                setSelectedGame(null);
                setActiveTab('home');
              }}
              currentUser={currentUser}
              onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
              onCreateOrder={handleCreateOrder}
            />
          )}

          {/* VIEW 3: ALL GAMES & TOP-UPS */}
          {(activeTab === 'games' || activeTab === 'topup') && (
            <GamesListPage
              games={games}
              onSelectGame={handleSelectGame}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

          {/* VIEW 4: OFFERS & REWARDS */}
          {activeTab === 'offers' && (
            <OffersPage games={games} onSelectGame={handleSelectGame} />
          )}

          {/* VIEW 5: SUPPORT TICKETS & HELP */}
          {activeTab === 'support' && (
            <SupportPage
              currentUser={currentUser}
              supportTickets={supportTickets}
              onCreateTicket={handleCreateTicket}
              onOpenAuth={() => setAuthModal({ isOpen: true, mode: 'login' })}
            />
          )}

          {/* VIEW 6: ACCOUNT DASHBOARD */}
          {activeTab === 'account' && (
            currentUser ? (
              <AccountDashboard
                user={currentUser}
                orders={orders}
                notifications={notifications}
                supportTickets={supportTickets}
                onOpenCreateTicket={() => setActiveTab('support')}
                onMarkNotificationRead={handleMarkNotificationRead}
                onSelectGameTopUp={(gameId) => {
                  const g = games.find((x) => x.id === gameId);
                  if (g) handleSelectGame(g);
                }}
              />
            ) : (
              <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
                <h2 className="text-2xl font-black text-white">Sign In Required</h2>
                <p className="text-xs text-slate-400">
                  Please log in to view your orders, invoices, and notifications.
                </p>
                <button
                  onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                  className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold px-6 py-2.5 rounded-xl text-sm shadow transition-all"
                >
                  Login to Dashboard
                </button>
              </div>
            )
          )}

        </main>

        {/* Footer (with exact quick links, account, support, stay updated newsletter & social links) */}
        <Footer
          onNavigate={(tab) => {
            setSelectedGame(null);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Mobile Bottom Navigation Bar (Phone & Tablet screen experience) */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setSelectedGame(null);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentUser={currentUser}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          notifications={notifications}
          cartCount={orders.length}
        />

      </div>

      {/* Auth Modal */}
      {authModal.isOpen && (
        <AuthModal
          mode={authModal.mode}
          onClose={() => setAuthModal({ ...authModal, isOpen: false })}
          onSuccess={(user) => {
            setCurrentUser(user);
            setAuthModal({ ...authModal, isOpen: false });
          }}
          onSwitchMode={(mode) => setAuthModal({ isOpen: true, mode })}
        />
      )}

      {/* Admin Authentication & Level 5 Handshake Modal */}
      <AdminAuthModal
        isOpen={showAdminAuthModal}
        onClose={() => setShowAdminAuthModal(false)}
        onSuccess={(adminUser) => {
          setCurrentUser(adminUser);
          setShowAdminAuthModal(false);
          setShowAdminPanel(true);
        }}
      />

      {/* Order Success Modal */}
      {newCompletedOrder && (
        <OrderSuccessModal
          order={newCompletedOrder}
          onClose={() => setNewCompletedOrder(null)}
          onViewOrders={() => {
            setNewCompletedOrder(null);
            setActiveTab('account');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Admin Panel Console */}
      {showAdminPanel && (
        <AdminPanel
          games={games}
          orders={orders}
          coupons={coupons}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onAddCoupon={handleAddCoupon}
          onClose={() => setShowAdminPanel(false)}
        />
      )}

    </div>
  );
}
