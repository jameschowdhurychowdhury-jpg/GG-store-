import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  Check, 
  Tag, 
  HelpCircle, 
  Sparkles,
  Flame,
  Clock,
  QrCode
} from 'lucide-react';
import { Game, GamePackage, PaymentMethodType, User, Coupon, Order } from '../types';
import { INITIAL_COUPONS } from '../data/mockData';
import { DeveloperQrModal, ExtendedPaymentMethod } from './DeveloperQrModal';

interface GameDetailPageProps {
  game: Game;
  onBack: () => void;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onCreateOrder: (orderData: Partial<Order>) => void;
}

export const GameDetailPage: React.FC<GameDetailPageProps> = ({
  game,
  onBack,
  currentUser,
  onOpenAuth,
  onCreateOrder
}) => {
  // Step 1: Player info form
  const [playerInfo, setPlayerInfo] = useState<Record<string, string>>({});
  const [showIdGuide, setShowIdGuide] = useState(false);

  // Step 2: Selected package
  const [selectedPackage, setSelectedPackage] = useState<GamePackage>(game.packages[0] || null);

  // Step 3: Payment method
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodType>('UPI');

  // Step 4: Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  // Developer QR modal state
  const [showQrModal, setShowQrModal] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Calculate pricing
  const subtotal = selectedPackage ? selectedPackage.price : 0;
  
  let discountAmount = 0;
  if (appliedCoupon && selectedPackage) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const finalAmount = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');
    
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const found = INITIAL_COUPONS.find(c => c.code === code && c.isActive);
    if (!found) {
      setCouponError('Invalid or expired promo code.');
      return;
    }

    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order amount for ${code} is ₹${found.minOrder}.`);
      return;
    }

    setAppliedCoupon(found);
    setCouponCode(found.code);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleFieldChange = (fieldId: string, val: string) => {
    setPlayerInfo(prev => ({ ...prev, [fieldId]: val }));
    setValidationError('');
  };

  const handleStartCheckout = () => {
    setValidationError('');

    // Validate player fields
    for (const f of game.playerFields) {
      if (f.required && (!playerInfo[f.id] || playerInfo[f.id].trim() === '')) {
        setValidationError(`Please enter your valid ${f.label}`);
        return;
      }
    }

    if (!selectedPackage) {
      setValidationError('Please select a top-up package.');
      return;
    }

    setShowQrModal(true);
  };

  const handleQrPaymentSuccess = (paymentData: { method: string; transactionId: string; utr: string }) => {
    setShowQrModal(false);

    const newOrder: Partial<Order> = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser ? currentUser.id : 'guest_gamer',
      userName: currentUser ? currentUser.name : 'Valued Gamer',
      userEmail: currentUser ? currentUser.email : (playerInfo['email'] || 'customer@ggstore.in'),
      gameId: game.id,
      gameName: game.name,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      packageAmount: selectedPackage.amount,
      playerInfo: playerInfo,
      quantity: 1,
      subtotal: subtotal,
      discount: discountAmount,
      walletUsed: 0,
      finalAmount: finalAmount,
      paymentMethod: (paymentData.method as PaymentMethodType) || selectedPayment,
      paymentStatus: 'Paid',
      orderStatus: 'Completed',
      transactionId: paymentData.transactionId,
      topupReference: `GG-TOP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      deliveryNotes: `${selectedPackage.amount} successfully credited to your game ID (Ref: ${paymentData.utr}).`
    };

    onCreateOrder(newOrder);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-20">
      
      {/* Top Banner & Game Header */}
      <div className="relative bg-gradient-to-b from-[#151C2C] to-[#0B0E14] border-b border-[#1E293B] pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-amber-400 mb-6 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Games
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Game Avatar Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-800 border-2 border-amber-500/40 shadow-xl flex-shrink-0">
              <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
            </div>

            {/* Game Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{game.name}</h1>
                {game.isHot && (
                  <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-white" /> Hot
                  </span>
                )}
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {game.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {game.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" /> {game.deliveryTime}
                </span>
                <span>Publisher: <strong className="text-slate-200">{game.publisher}</strong></span>
                <span>Currency: <strong className="text-amber-400">{game.currencyName}</strong></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Form & Checkout Columns */}
      <div className="max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 2xl:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 2xl:gap-12">
          
          {/* Left Columns: Steps 1, 2, 3, 4 */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STEP 1: Enter Player ID */}
            <div className="bg-[#111622] border border-[#242E42] rounded-2xl 2xl:rounded-3xl p-5 sm:p-6 2xl:p-8 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 2xl:w-8 2xl:h-8 rounded-lg bg-amber-500 text-black font-black text-xs 2xl:text-sm flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-base sm:text-lg 2xl:text-xl font-bold text-white">
                    Enter Game Account Info
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowIdGuide(!showIdGuide)}
                  className="text-xs 2xl:text-sm text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" /> How to find ID?
                </button>
              </div>

              {/* ID Guide info banner */}
              {showIdGuide && (
                <div className="mb-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm text-amber-200">
                  <p className="font-bold mb-1">📌 Finding your ID in {game.name}:</p>
                  <p>1. Open the game and tap your avatar/profile in the lobby.</p>
                  <p>2. Look for numeric User ID (or Character UID) and Zone ID.</p>
                  <p>3. Tap the copy icon next to your ID and paste it below.</p>
                </div>
              )}

              {/* Dynamic Player Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.playerFields.map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label className="text-xs 2xl:text-sm font-semibold text-slate-300 flex items-center justify-between">
                      <span>{field.label} {field.required && <span className="text-red-400">*</span>}</span>
                    </label>
                    
                    {field.type === 'select' ? (
                      <select
                        value={playerInfo[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-sm 2xl:text-base text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="">Select Server</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={playerInfo[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className="w-full bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2.5 text-sm 2xl:text-base text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                      />
                    )}

                    {field.helperText && (
                      <p className="text-[11px] 2xl:text-xs text-slate-400">{field.helperText}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 2: Select Recharge Package */}
            <div className="bg-[#111622] border border-[#242E42] rounded-2xl 2xl:rounded-3xl p-5 sm:p-6 2xl:p-8 shadow-md">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 2xl:w-8 2xl:h-8 rounded-lg bg-amber-500 text-black font-black text-xs 2xl:text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-base sm:text-lg 2xl:text-xl font-bold text-white">
                  Select {game.currencyName} Package
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-3 2xl:gap-4">
                {game.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`relative p-3.5 2xl:p-4 rounded-xl 2xl:rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/50'
                          : 'bg-[#151C2C] border-[#242E42] hover:border-slate-600 hover:bg-[#1A2234]'
                      }`}
                    >
                      {/* Package Tag Badge */}
                      {pkg.tag && (
                        <div className="absolute -top-2.5 right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[9px] 2xl:text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow">
                          {pkg.tag}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm 2xl:text-base font-bold text-white">
                            {pkg.amount}
                          </span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {pkg.bonus && (
                          <span className="inline-block text-[10px] 2xl:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-2">
                            {pkg.bonus}
                          </span>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#242E42] flex items-baseline justify-between">
                        <span className="text-sm sm:text-base 2xl:text-lg font-black text-amber-400">
                          ₹{pkg.price}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-[11px] 2xl:text-xs text-slate-500 line-through">
                            ₹{pkg.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Select Payment Method */}
            <div className="bg-[#111622] border border-[#242E42] rounded-2xl p-5 sm:p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-black font-black text-xs flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Select Payment Gateway / App
                  </h3>
                </div>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" /> 10-Min Developer QR
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'UPI' as PaymentMethodType, name: 'Instant UPI', sub: 'All UPI Apps (BHIM, Cred)', badge: 'Fastest' },
                  { id: 'Paytm' as PaymentMethodType, name: 'Paytm', sub: 'Paytm UPI & Wallet', badge: 'Instant QR' },
                  { id: 'GPay' as PaymentMethodType, name: 'Google Pay', sub: 'Instant GPay UPI', badge: 'Popular' },
                  { id: 'FamPay' as PaymentMethodType, name: 'FamPay', sub: 'Teen Gamer UPI & QR', badge: 'Zero Fee' },
                  { id: 'PayPal' as PaymentMethodType, name: 'PayPal', sub: 'PayPal & Cards (Global)', badge: 'Verified' },
                  { id: 'PhonePe' as PaymentMethodType, name: 'PhonePe', sub: 'PhonePe Direct UPI', badge: 'Direct' }
                ].map((pm) => {
                  const isSelected = selectedPayment === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setSelectedPayment(pm.id)}
                      className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/40 shadow-sm'
                          : 'bg-[#151C2C] border-[#242E42] hover:border-slate-600 hover:bg-[#1A2234]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{pm.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400">{pm.sub}</p>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mt-2 inline-block">
                        {pm.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Apply Coupon */}
            <div className="bg-[#111622] border border-[#242E42] rounded-2xl p-5 sm:p-6 shadow-md">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-black font-black text-xs flex items-center justify-center">
                  4
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Have a Promo Code?
                </h3>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-emerald-400">
                        Coupon Applied: {appliedCoupon.code}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Saved ₹{discountAmount} on this recharge!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-400 hover:text-red-300 font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. GG10, FLASH20)"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError('');
                      }}
                      className="flex-1 bg-[#151C2C] border border-[#242E42] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-xs text-red-400 font-medium">{couponError}</p>
                  )}

                  {/* Quick coupon suggestions */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-400">Suggested:</span>
                    {INITIAL_COUPONS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleApplyCoupon(c.code)}
                        className="text-[11px] bg-slate-800 hover:bg-amber-500/20 text-amber-300 border border-slate-700 hover:border-amber-400/40 px-2.5 py-1 rounded-lg font-mono font-bold transition-colors"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Instant Action Sticky Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-[#111622] border border-[#242E42] rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
              
              <div className="border-b border-[#242E42] pb-4">
                <h3 className="text-base sm:text-lg font-black text-white mb-1">
                  Order Summary
                </h3>
                <p className="text-xs text-slate-400">Review your top-up details</p>
              </div>

              {/* Item Info */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Game:</span>
                  <strong className="text-white">{game.name}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Recharge Pack:</span>
                  <strong className="text-amber-400">{selectedPackage?.name}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Selected App:</span>
                  <span className="text-white font-bold">{selectedPayment}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Delivery Method:</span>
                  <span className="text-emerald-400 font-semibold">Direct UID Top-Up</span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-[#242E42] pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Package Price:</span>
                  <span>₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Coupon Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="border-t border-[#242E42] pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Final Amount:</span>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{finalAmount}
                  </span>
                </div>
              </div>

              {/* Validation error if any */}
              {validationError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium">
                  {validationError}
                </div>
              )}

              {/* Instant Checkout Button -> Opens Developer QR */}
              <button
                id="checkout-pay-btn"
                type="button"
                onClick={handleStartCheckout}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold py-3.5 rounded-xl text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Purchase & Pay via QR
              </button>

              {/* Trust Badges */}
              <div className="pt-2 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Developer Direct QR Gateway (Valid for 10 Min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Automatic instant delivery within 30-180 seconds</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Developer Dynamic QR Code Modal (10-Minute Timer + Multi-payment Apps) */}
      <DeveloperQrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        game={game}
        selectedPackage={selectedPackage}
        playerInfo={playerInfo}
        finalAmount={finalAmount}
        initialMethod={selectedPayment as ExtendedPaymentMethod}
        onConfirmSuccess={handleQrPaymentSuccess}
      />

      {/* Mobile Sticky Quick Checkout Bar (Visible only on mobile screens when browsing) */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-[#0B0E14]/95 backdrop-blur-md border-t border-[#1E293B] p-3 px-4 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <p className="text-[10px] text-slate-400">Total Payable</p>
            <p className="text-xl font-black text-amber-400">₹{finalAmount}</p>
            {selectedPackage && (
              <p className="text-[10px] text-slate-300 truncate max-w-[140px]">
                {selectedPackage.amount}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleStartCheckout}
            className="flex-1 max-w-[200px] bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black py-2.5 px-4 rounded-xl text-sm shadow-md shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span>Pay via QR</span>
          </button>
        </div>
      </div>

    </div>
  );
};
