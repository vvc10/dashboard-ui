import React from 'react';

export interface StatData {
    name: string;
    value: number;
}

export interface Transaction {
    id: string;
    name: string;
    date: string;
    category: string;
    amount: number;
    icon?: string;
}

export interface MenuItem {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    badge?: number;
    subItems?: MenuItem[];
}