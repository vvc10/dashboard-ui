import React from 'react';

export interface StatData {
  name: string;
  value: number;
  active?: boolean;
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  category: string;
  amount: number;
  icon?: string;
}

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  trend: number;
  trendLabel: string;
  color: string;
  percentage: number;
}

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: number;
  subItems?: MenuItem[];
}

export type ChartPeriod = 'Yearly' | 'Monthly' | 'Weekly' | 'Daily';
