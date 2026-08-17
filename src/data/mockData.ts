import { Game, Coupon, Review, User, Order } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'mobile-legends',
    slug: 'mobile-legends',
    name: 'Mobile Legends',
    category: 'Action',
    currencyName: 'Diamonds',
    minPrice: 11,
    isHot: true,
    isPopular: true,
    description: 'Fast and secure Mobile Legends Bang Bang (MLBB) Diamonds instant top-up with bonus points.',
    publisher: 'Moonton',
    deliveryTime: 'Instant (1-3 Mins)',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'user_id',
        label: 'User ID',
        placeholder: 'e.g. 12345678',
        helperText: 'Find in your in-game profile avatar section.',
        required: true,
        type: 'text'
      },
      {
        id: 'zone_id',
        label: 'Zone ID',
        placeholder: 'e.g. 1234',
        helperText: 'The 4-5 digit number in parentheses next to User ID.',
        required: true,
        type: 'text'
      }
    ],
    packages: [
      { id: 'ml-11', gameId: 'mobile-legends', name: '11 Diamonds', amount: '11 Diamonds', price: 11, originalPrice: 15, isInstant: true, tag: 'Hot' },
      { id: 'ml-50', gameId: 'mobile-legends', name: '50 + 5 Bonus Diamonds', amount: '55 Diamonds', price: 49, originalPrice: 60, isInstant: true, tag: 'Popular', bonus: '+5 Bonus' },
      { id: 'ml-100', gameId: 'mobile-legends', name: '100 + 10 Bonus Diamonds', amount: '110 Diamonds', price: 95, originalPrice: 120, isInstant: true, bonus: '+10 Bonus' },
      { id: 'ml-250', gameId: 'mobile-legends', name: '250 + 25 Bonus Diamonds', amount: '275 Diamonds', price: 235, originalPrice: 280, isInstant: true, tag: 'Best Value', bonus: '+25 Bonus' },
      { id: 'ml-500', gameId: 'mobile-legends', name: '500 + 65 Bonus Diamonds', amount: '565 Diamonds', price: 469, originalPrice: 560, isInstant: true, bonus: '+65 Bonus' },
      { id: 'ml-weekly', gameId: 'mobile-legends', name: 'Weekly Diamond Pass', amount: 'Pass (210 Diamonds)', price: 159, originalPrice: 199, isInstant: true, tag: 'Hot' },
      { id: 'ml-1000', gameId: 'mobile-legends', name: '1000 + 155 Bonus Diamonds', amount: '1155 Diamonds', price: 920, originalPrice: 1100, isInstant: true, bonus: '+155 Bonus' }
    ]
  },
  {
    id: 'free-fire-max',
    slug: 'free-fire-max',
    name: 'Free Fire MAX',
    category: 'Battle Royale',
    currencyName: 'Diamonds',
    minPrice: 11,
    isHot: true,
    isPopular: true,
    description: 'Instant top-up for Garena Free Fire MAX Diamonds. Enter Player UID for instant crediting.',
    publisher: 'Garena',
    deliveryTime: 'Instant (30 Secs)',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'player_id',
        label: 'Player UID',
        placeholder: 'e.g. 1982736450',
        helperText: 'Your 8-10 digit numerical UID found in basic profile info.',
        required: true,
        type: 'text'
      }
    ],
    packages: [
      { id: 'ff-11', gameId: 'free-fire-max', name: '15 Diamonds (Starter)', amount: '15 Diamonds', price: 11, originalPrice: 15, isInstant: true, tag: 'Hot' },
      { id: 'ff-100', gameId: 'free-fire-max', name: '100 + 10 Diamonds', amount: '110 Diamonds', price: 79, originalPrice: 90, isInstant: true, tag: 'Popular', bonus: '+10 Bonus' },
      { id: 'ff-310', gameId: 'free-fire-max', name: '310 + 31 Diamonds', amount: '341 Diamonds', price: 239, originalPrice: 270, isInstant: true, bonus: '+31 Bonus' },
      { id: 'ff-520', gameId: 'free-fire-max', name: '520 + 52 Diamonds', amount: '572 Diamonds', price: 399, originalPrice: 450, isInstant: true, tag: 'Best Value', bonus: '+52 Bonus' },
      { id: 'ff-1060', gameId: 'free-fire-max', name: '1060 + 106 Diamonds', amount: '1166 Diamonds', price: 799, originalPrice: 900, isInstant: true, bonus: '+106 Bonus' },
      { id: 'ff-weekly', gameId: 'free-fire-max', name: 'Weekly Membership', amount: '450 Diamonds Value', price: 159, originalPrice: 190, isInstant: true, tag: 'Hot' },
      { id: 'ff-monthly', gameId: 'free-fire-max', name: 'Monthly Membership', amount: '2600 Diamonds Value', price: 799, originalPrice: 950, isInstant: true }
    ]
  },
  {
    id: 'bgmi',
    slug: 'bgmi',
    name: 'BGMI',
    category: 'Battle Royale',
    currencyName: 'UC',
    minPrice: 19,
    isHot: false,
    isPopular: true,
    description: 'Battlegrounds Mobile India Unknown Cash (UC) instant delivery for Royale Pass and crates.',
    publisher: 'Krafton',
    deliveryTime: 'Instant (1-2 Mins)',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'character_id',
        label: 'Character ID (UID)',
        placeholder: 'e.g. 5123456789',
        helperText: 'Found on your main lobby profile page below your username.',
        required: true,
        type: 'text'
      }
    ],
    packages: [
      { id: 'bgmi-19', gameId: 'bgmi', name: '18 UC (Trial Pack)', amount: '18 UC', price: 19, originalPrice: 25, isInstant: true },
      { id: 'bgmi-60', gameId: 'bgmi', name: '60 UC', amount: '60 UC', price: 75, originalPrice: 89, isInstant: true },
      { id: 'bgmi-300', gameId: 'bgmi', name: '300 + 25 Bonus UC', amount: '325 UC', price: 380, originalPrice: 420, isInstant: true, tag: 'Popular', bonus: '+25 UC' },
      { id: 'bgmi-600', gameId: 'bgmi', name: '600 + 60 Bonus UC (Royale Pass)', amount: '660 UC', price: 750, originalPrice: 850, isInstant: true, tag: 'Best Value', bonus: '+60 UC' },
      { id: 'bgmi-1500', gameId: 'bgmi', name: '1500 + 300 Bonus UC', amount: '1800 UC', price: 1899, originalPrice: 2100, isInstant: true, bonus: '+300 UC' },
      { id: 'bgmi-3000', gameId: 'bgmi', name: '3000 + 850 Bonus UC', amount: '3850 UC', price: 3799, originalPrice: 4200, isInstant: true, bonus: '+850 UC' }
    ]
  },
  {
    id: 'clash-of-clans',
    slug: 'clash-of-clans',
    name: 'Clash of Clans',
    category: 'Strategy',
    currencyName: 'Gems',
    minPrice: 19,
    isHot: false,
    isPopular: true,
    description: 'Instant Gems and Gold Pass for Clash of Clans through Supercell Player Tag.',
    publisher: 'Supercell',
    deliveryTime: 'Instant (1-3 Mins)',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'player_tag',
        label: 'Player Tag (#)',
        placeholder: 'e.g. #9PY89L0C',
        helperText: 'Found on your village profile under your player name.',
        required: true,
        type: 'text'
      }
    ],
    packages: [
      { id: 'coc-19', gameId: 'clash-of-clans', name: '20 Gems Pocket Pack', amount: '20 Gems', price: 19, originalPrice: 29, isInstant: true },
      { id: 'coc-80', gameId: 'clash-of-clans', name: '80 Gems (Pile of Gems)', amount: '80 Gems', price: 89, originalPrice: 99, isInstant: true },
      { id: 'coc-500', gameId: 'clash-of-clans', name: '500 Gems (Pouch of Gems)', amount: '500 Gems', price: 449, originalPrice: 499, isInstant: true, tag: 'Popular' },
      { id: 'coc-goldpass', gameId: 'clash-of-clans', name: 'Season Gold Pass', amount: 'Full Season Pass', price: 599, originalPrice: 699, isInstant: true, tag: 'Hot' },
      { id: 'coc-1200', gameId: 'clash-of-clans', name: '1200 Gems (Sack of Gems)', amount: '1200 Gems', price: 899, originalPrice: 999, isInstant: true, tag: 'Best Value' },
      { id: 'coc-2500', gameId: 'clash-of-clans', name: '2500 Gems (Box of Gems)', amount: '2500 Gems', price: 1799, originalPrice: 1999, isInstant: true }
    ]
  },
  {
    id: 'clash-royale',
    slug: 'clash-royale',
    name: 'Clash Royale',
    category: 'Strategy',
    currencyName: 'Gems',
    minPrice: 19,
    isHot: false,
    isPopular: true,
    description: 'Clash Royale Gems, Gold and Diamond Pass top-up directly to your Supercell account.',
    publisher: 'Supercell',
    deliveryTime: 'Instant (1-3 Mins)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'player_tag',
        label: 'Player Tag (#)',
        placeholder: 'e.g. #2C9V8LL',
        helperText: 'Found on your Battle Deck profile beneath your avatar.',
        required: true,
        type: 'text'
      }
    ],
    packages: [
      { id: 'cr-19', gameId: 'clash-royale', name: '20 Gems (Starter)', amount: '20 Gems', price: 19, originalPrice: 25, isInstant: true },
      { id: 'cr-80', gameId: 'clash-royale', name: '80 Gems', amount: '80 Gems', price: 89, originalPrice: 99, isInstant: true },
      { id: 'cr-500', gameId: 'clash-royale', name: '500 Gems', amount: '500 Gems', price: 449, originalPrice: 499, isInstant: true, tag: 'Popular' },
      { id: 'cr-gold-pass', gameId: 'clash-royale', name: 'Gold Pass Royale', amount: 'Season Pass', price: 499, originalPrice: 599, isInstant: true },
      { id: 'cr-diamond-pass', gameId: 'clash-royale', name: 'Diamond Pass Royale', amount: 'Full Tier Pass', price: 999, originalPrice: 1199, isInstant: true, tag: 'Hot' }
    ]
  },
  {
    id: 'call-of-duty-mobile',
    slug: 'call-of-duty-mobile',
    name: 'Call of Duty Mobile',
    category: 'FPS',
    currencyName: 'CP',
    minPrice: 40,
    isHot: false,
    isPopular: true,
    description: 'Fast CP top-ups for Call of Duty: Mobile. Unlock Battle Pass, Mythic and Legendary draws.',
    publisher: 'Activision',
    deliveryTime: 'Instant (1-2 Mins)',
    image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'player_uid',
        label: 'Player UID',
        placeholder: 'e.g. 6748920192837465',
        helperText: 'Open Profile -> Second tab (Basic) -> Copy numeric UID.',
        required: true,
        type: 'text'
      }
    ],
    packages: [
      { id: 'codm-40', gameId: 'call-of-duty-mobile', name: '30 + 3 CP (Starter Pack)', amount: '33 CP', price: 40, originalPrice: 49, isInstant: true },
      { id: 'codm-80', gameId: 'call-of-duty-mobile', name: '80 + 8 Bonus CP', amount: '88 CP', price: 79, originalPrice: 99, isInstant: true },
      { id: 'codm-420', gameId: 'call-of-duty-mobile', name: '400 + 20 Bonus CP (Battle Pass)', amount: '420 CP', price: 389, originalPrice: 450, isInstant: true, tag: 'Popular', bonus: '+20 CP' },
      { id: 'codm-880', gameId: 'call-of-duty-mobile', name: '800 + 80 Bonus CP', amount: '880 CP', price: 779, originalPrice: 899, isInstant: true, tag: 'Best Value', bonus: '+80 CP' },
      { id: 'codm-2400', gameId: 'call-of-duty-mobile', name: '2000 + 400 Bonus CP', amount: '2400 CP', price: 1899, originalPrice: 2200, isInstant: true, bonus: '+400 CP' },
      { id: 'codm-5000', gameId: 'call-of-duty-mobile', name: '4000 + 1000 Bonus CP', amount: '5000 CP', price: 3799, originalPrice: 4400, isInstant: true, bonus: '+1000 CP' }
    ]
  },
  {
    id: 'genshin-impact',
    slug: 'genshin-impact',
    name: 'Genshin Impact',
    category: 'RPG',
    currencyName: 'Genesis Crystals',
    minPrice: 89,
    isHot: false,
    isPopular: false,
    description: 'Genesis Crystals and Blessing of the Welkin Moon via UID and Server selection.',
    publisher: 'HoYoverse',
    deliveryTime: 'Instant (1-3 Mins)',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'uid',
        label: 'Genshin UID',
        placeholder: 'e.g. 812345678',
        helperText: 'Bottom-right corner of your screen during gameplay.',
        required: true,
        type: 'text'
      },
      {
        id: 'server',
        label: 'Select Server',
        placeholder: 'Choose your server',
        required: true,
        type: 'select',
        options: ['Asia', 'America', 'Europe', 'TW, HK, MO']
      }
    ],
    packages: [
      { id: 'gi-welkin', gameId: 'genshin-impact', name: 'Blessing of the Welkin Moon', amount: '300 Crystals + 2700 Primogems', price: 449, originalPrice: 499, isInstant: true, tag: 'Hot' },
      { id: 'gi-60', gameId: 'genshin-impact', name: '60 Genesis Crystals', amount: '60 Crystals', price: 89, originalPrice: 99, isInstant: true },
      { id: 'gi-330', gameId: 'genshin-impact', name: '300 + 30 Bonus Genesis Crystals', amount: '330 Crystals', price: 449, originalPrice: 499, isInstant: true },
      { id: 'gi-1090', gameId: 'genshin-impact', name: '980 + 110 Bonus Genesis Crystals', amount: '1090 Crystals', price: 1399, originalPrice: 1599, isInstant: true, tag: 'Best Value' }
    ]
  },
  {
    id: 'google-play-gift-card',
    slug: 'google-play-gift-card',
    name: 'Google Play Gift Card',
    category: 'Gift Cards',
    currencyName: 'INR Balance',
    minPrice: 50,
    isHot: true,
    isPopular: false,
    description: 'Instant redeemable Google Play digital codes for India region accounts.',
    publisher: 'Google',
    deliveryTime: 'Instant Digital Code',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
    playerFields: [
      {
        id: 'email',
        label: 'Delivery Email Address',
        placeholder: 'your.email@example.com',
        helperText: 'The redeem code will be sent immediately to this email & order dashboard.',
        required: true,
        type: 'text'
      }
    ],
    packages: [
      { id: 'gp-50', gameId: 'google-play-gift-card', name: '₹50 Google Play Code', amount: '₹50 Balance', price: 50, isInstant: true },
      { id: 'gp-100', gameId: 'google-play-gift-card', name: '₹100 Google Play Code', amount: '₹100 Balance', price: 100, isInstant: true, tag: 'Popular' },
      { id: 'gp-250', gameId: 'google-play-gift-card', name: '₹250 Google Play Code', amount: '₹250 Balance', price: 250, isInstant: true },
      { id: 'gp-500', gameId: 'google-play-gift-card', name: '₹500 Google Play Code', amount: '₹500 Balance', price: 500, isInstant: true, tag: 'Best Value' }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'GG10',
    discountType: 'percentage',
    discountValue: 10,
    minOrder: 50,
    maxDiscount: 50,
    expiryDate: '2026-12-31',
    description: '10% OFF on all top-ups up to ₹50 discount.',
    isActive: true,
    usedCount: 1420,
    usageLimit: 5000
  },
  {
    id: 'c2',
    code: 'WELCOME50',
    discountType: 'fixed',
    discountValue: 50,
    minOrder: 300,
    expiryDate: '2026-12-31',
    description: 'Flat ₹50 OFF on orders above ₹300 for all gamers.',
    isActive: true,
    usedCount: 890,
    usageLimit: 3000
  },
  {
    id: 'c3',
    code: 'FLASH20',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: 150,
    maxDiscount: 100,
    expiryDate: '2026-12-31',
    description: 'Flash Sale Special: 20% OFF (Max ₹100 discount).',
    isActive: true,
    usedCount: 2340,
    usageLimit: 10000
  },
  {
    id: 'c4',
    code: 'STARTER5',
    discountType: 'fixed',
    discountValue: 5,
    minOrder: 11,
    expiryDate: '2026-12-31',
    description: 'Flat ₹5 discount on any starter recharge.',
    isActive: true,
    usedCount: 4200,
    usageLimit: 10000
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Aarav Sharma',
    gameName: 'Free Fire MAX',
    rating: 5,
    comment: 'Got my 1060 Diamonds within 30 seconds after PhonePe payment! Super clean UI and trusted service. Best topup site in India.',
    date: '2 hours ago',
    isVerified: true
  },
  {
    id: 'r2',
    userName: 'Rahul Verma',
    gameName: 'BGMI',
    rating: 5,
    comment: 'Bought the 660 UC Royale Pass pack. UC was credited immediately in game without any issues. Coupon FLASH20 gave me great discount too!',
    date: 'Yesterday',
    isVerified: true
  },
  {
    id: 'r3',
    userName: 'Karthik Raja',
    gameName: 'Mobile Legends',
    rating: 5,
    comment: 'Weekly Diamond pass activated instantly. Great prices compared to in-app store and instant WhatsApp/Live support.',
    date: '2 days ago',
    isVerified: true
  },
  {
    id: 'r4',
    userName: 'Priya Patel',
    gameName: 'Clash of Clans',
    rating: 5,
    comment: 'Season Gold pass unlocked smoothly. Highly recommended for all Indian gamers!',
    date: '3 days ago',
    isVerified: true
  }
];

export const INITIAL_DEMO_USER: User = {
  id: 'usr_gg_demo',
  name: 'Gamer Pro',
  email: 'gamer@ggstore.in',
  phone: '+91 98765 43210',
  walletBalance: 150,
  isAdmin: false,
  joinedDate: '2025-01-15'
};

export const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ORD-882910',
    userId: 'usr_gg_demo',
    userName: 'Gamer Pro',
    userEmail: 'gamer@ggstore.in',
    gameId: 'free-fire-max',
    gameName: 'Free Fire MAX',
    packageId: 'ff-100',
    packageName: '100 + 10 Diamonds',
    packageAmount: '110 Diamonds',
    playerInfo: { player_id: '1982736450' },
    quantity: 1,
    subtotal: 79,
    discount: 5,
    walletUsed: 0,
    finalAmount: 74,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    transactionId: 'TXN-UPI-99281744',
    topupReference: 'GAR-TOP-110294',
    createdAt: '2025-05-10 14:32',
    updatedAt: '2025-05-10 14:33',
    deliveryNotes: '110 Diamonds successfully credited to UID 1982736450.'
  },
  {
    id: 'ORD-771928',
    userId: 'usr_gg_demo',
    userName: 'Gamer Pro',
    userEmail: 'gamer@ggstore.in',
    gameId: 'bgmi',
    gameName: 'BGMI',
    packageId: 'bgmi-600',
    packageName: '600 + 60 Bonus UC (Royale Pass)',
    packageAmount: '660 UC',
    playerInfo: { character_id: '5123456789' },
    quantity: 1,
    subtotal: 750,
    discount: 50,
    walletUsed: 50,
    finalAmount: 650,
    paymentMethod: 'GPay',
    paymentStatus: 'Paid',
    orderStatus: 'Completed',
    transactionId: 'TXN-GPAY-772819',
    topupReference: 'KRAF-BGMI-9921',
    createdAt: '2025-05-08 19:10',
    updatedAt: '2025-05-08 19:11',
    deliveryNotes: '660 UC credited instantly to Character ID 5123456789.'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How fast is the game top-up delivered?',
    a: 'Top-ups are processed automatically and delivered within 30 seconds to 3 minutes directly into your game account after successful payment verification.'
  },
  {
    q: 'Is it safe to recharge my game account on GG-store?',
    a: 'Yes, 100% safe! We only require your public Game ID / Character UID (never your password or login credentials). All payments are secured via standard bank-grade 256-bit encryption.'
  },
  {
    q: 'Which payment methods are accepted?',
    a: 'We accept all major Indian payment options: UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards (Visa, MasterCard, RuPay), Net Banking, and GG-store Wallet balance.'
  },
  {
    q: 'What should I do if my top-up is delayed or I entered the wrong ID?',
    a: 'If you face any issues, our 24/7 dedicated customer support team is available via the Support ticket system or live chat. Have your Order ID ready for rapid resolution.'
  },
  {
    q: 'How does the GG-store Wallet & Cashback work?',
    a: 'You can top up your GG-store Wallet anytime for instant 1-click recharges and receive extra cashback bonuses on promotional events. Wallet credits can be applied during checkout for extra discounts.'
  }
];
