// Central data constants

export const STAT_DATA_LENGTH = 28;

export const STAT_CARDS = [
  {
    id: 'balance',
    title: 'Total Balance',
    value: '$8,800',
    trend: 3.1,
    trendLabel: 'vs last month',
    color: '#3B82F6',
    percentage: 55,
  },
  {
    id: 'income',
    title: 'Income',
    value: '$12,600',
    trend: 2.1,
    trendLabel: 'vs last month',
    color: '#8B5CF6',
    percentage: 60,
  },
  {
    id: 'expense',
    title: 'Expense',
    value: '$12,600',
    trend: -3.2,
    trendLabel: 'vs last month',
    color: '#F97316',
    percentage: 75,
  },
];

export const CHART_DATA = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 16000 },
  { name: 'Mar', value: 19000 },
  { name: 'Apr', value: 17000 },
  { name: 'May', value: 24000 },
  { name: 'Jun', value: 28712, active: true },
  { name: 'Jul', value: 21000 },
  { name: 'Aug', value: 23000 },
  { name: 'Sep', value: 25000 },
  { name: 'Oct', value: 28000 },
  { name: 'Nov', value: 22000 },
  { name: 'Dec', value: 18000 },
];

export const TRANSACTIONS = [
  { id: '1', name: 'Paypal Withdraw', date: 'Oct 12, 2025', category: 'Withdraw', amount: 1450.00, icon: 'paypal' },
  { id: '2', name: 'Youtube Premium', date: 'Oct 12, 2025', category: 'Subscription', amount: 12.00, icon: 'youtube' },
  { id: '3', name: 'Adobe After Effect', date: 'Sat, 20 Apr 2025', category: 'Subscription', amount: 80.00, icon: 'adobe' },
  { id: '4', name: 'McDonald\'s', date: 'Fri, 19 Apr 2025', category: 'Food', amount: 32.00, icon: 'mcdonalds' },
  { id: '5', name: 'Levi\'s', date: 'Tue, 12 Apr 2025', category: 'Shopping', amount: 50.00, icon: 'levis' },
];

export const CHART_PERIODS = ['Yearly', 'Monthly', 'Weekly', 'Daily'] as const;

export const CREDIT_CARD_DATA = {
  totalBalance: '$227,200',
  totalSaving: '$35,610',
  accounts: 8,
};

export const BUDGET_DATA = {
  totalSaving: '$35,610',
  trend: 12.3,
  trendLabel: 'from last month',
};

export const SAVING_CATEGORIES = [
  { id: '1', name: 'Investment', amount: 14800.00, icon: 'text-[#3b82f6]' },
  { id: '2', name: 'Holiday', amount: 8450.00, icon: 'text-[#06b6d4]' },
  { id: '3', name: 'New Home', amount: 7200.00, icon: 'text-[#39c597]' },
];

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;

