export type GameCategory = 'All' | 'Battle Royale' | 'Action' | 'FPS' | 'RPG' | 'Strategy' | 'Gift Cards';

export interface GamePackage {
  id: string;
  gameId: string;
  name: string;
  amount: string; // e.g. "100 + 10 Diamonds"
  price: number; // in INR
  originalPrice?: number;
  bonus?: string;
  tag?: string; // e.g. "Popular", "Best Value", "Hot"
  isInstant: boolean;
}

export interface PlayerFieldConfig {
  id: string;
  label: string;
  placeholder: string;
  helperText?: string;
  required: boolean;
  type?: 'text' | 'number' | 'select';
  options?: string[];
}

export interface Game {
  id: string;
  slug: string;
  name: string;
  category: GameCategory;
  currencyName: string; // "Diamonds", "UC", "Gems", "CP", "VP"
  minPrice: number;
  image: string;
  bannerImage: string;
  isHot?: boolean;
  isPopular?: boolean;
  description: string;
  playerFields: PlayerFieldConfig[];
  idHelperImageGuide?: string;
  publisher: string;
  deliveryTime: string;
  packages: GamePackage[];
}

export type OrderStatus = 
  | 'Pending'
  | 'Payment Pending'
  | 'Paid'
  | 'Processing'
  | 'Completed'
  | 'Failed'
  | 'Cancelled'
  | 'Refunded';

export type PaymentMethodType = 
  | 'UPI'
  | 'PhonePe'
  | 'GPay'
  | 'Paytm'
  | 'FamPay'
  | 'PayPal'
  | 'Card'
  | 'NetBanking'
  | 'Wallet';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  gameId: string;
  gameName: string;
  packageId: string;
  packageName: string;
  packageAmount: string;
  playerInfo: Record<string, string>;
  quantity: number;
  subtotal: number;
  discount: number;
  walletUsed: number;
  finalAmount: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Unpaid' | 'Paid' | 'Failed' | 'Refunded';
  orderStatus: OrderStatus;
  transactionId?: string;
  topupReference?: string;
  createdAt: string;
  updatedAt: string;
  deliveryNotes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  description: string;
  isActive: boolean;
  usedCount: number;
  usageLimit: number;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  referenceId?: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  walletBalance: number;
  isAdmin: boolean;
  joinedDate: string;
  avatarUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'wallet' | 'system';
  isRead: boolean;
  date: string;
  link?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  orderId?: string;
  category: 'Top-Up Issue' | 'Payment Failed' | 'Wallet' | 'Account' | 'Other';
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  replies: {
    id: string;
    sender: 'user' | 'support';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  gameName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}
