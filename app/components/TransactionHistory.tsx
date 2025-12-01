'use client';

import React, { useState } from 'react';
import { Calendar, Check, Eye, EyeOff } from 'lucide-react';
import { TRANSACTIONS } from '@/app/data/constants';
import { formatCurrency } from '@/app/utils/helpers';

// Icon components for different services
const PayPalIcon = () => (
  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
    <span className="text-white text-[10px] font-bold">PP</span>
  </div>
);

const YouTubeIcon = () => (
  <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </div>
);

const AdobeIcon = () => (
  <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
    <span className="text-white text-[8px] font-bold">A</span>
  </div>
);

const getTransactionIcon = (icon?: string) => {
  switch (icon) {
    case 'paypal':
      return <PayPalIcon />;
    case 'youtube':
      return <YouTubeIcon />;
    case 'adobe':
      return <AdobeIcon />;
    default:
      return <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
        <span className="text-gray-600 text-[10px] font-bold">?</span>
      </div>;
  }
};

export const TransactionHistory: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [hiddenAmounts, setHiddenAmounts] = useState<Set<string>>(new Set());

    const toggleSelect = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selected.length === TRANSACTIONS.length) {
            setSelected([]);
        } else {
            setSelected(TRANSACTIONS.map(tx => tx.id));
        }
    };

    const isAllSelected = selected.length === TRANSACTIONS.length && TRANSACTIONS.length > 0;

    const toggleAmountVisibility = (id: string) => {
        setHiddenAmounts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="bg-zinc-700/2 p-2 sm:p-3 border border-zinc-700/10 rounded-[25px] flex flex-col h-full">
             <div className="pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-gray-50 rounded-md text-gray-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                     </div>
                     <h3 className="font-semibold text-sm sm:text-base text-gray-900">Transaction History</h3>
                </div>
                
                <button className="flex items-center rounded-[10px] gap-2 px-2 sm:px-3 py-1.5 border border-gray-200  text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="hidden sm:inline">Nov 12 2025 - Dec 12 2025</span>
                    <span className="sm:hidden">Date</span>
                </button>
            </div>

            <div className="flex-1 overflow-auto border border-zinc-700/10 rounded-[20px] p-1 sm:p-2">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-zinc-700/10 text-xs text-gray-400 tracking-wider">
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium w-12">
                                    <div 
                                        onClick={toggleSelectAll}
                                        className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                                            isAllSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'
                                        }`}
                                    >
                                        {isAllSelected && <Check size={10} strokeWidth={4} />}
                                    </div>
                                </th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium">Name</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium hidden sm:table-cell">Date</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium hidden md:table-cell">Category</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs sm:text-sm">
                            {TRANSACTIONS.map((tx) => (
                                <tr key={tx.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <div 
                                            onClick={() => toggleSelect(tx.id)}
                                            className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-colors ${selected.includes(tx.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}
                                        >
                                            {selected.includes(tx.id) && <Check size={10} strokeWidth={4} />}
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <div className="flex items-center gap-2">
                                            {getTransactionIcon(tx.icon)}
                                            <span className="font-medium text-gray-900">{tx.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden sm:table-cell">{tx.date}</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                                        <span className="inline-flex font-medium items-center  border border-zinc-700/10 rounded-[10px] px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="font-medium text-gray-900 saira-bold">
                                                {hiddenAmounts.has(tx.id) ? '••••' : formatCurrency(tx.amount)}
                                            </span>
                                            <button
                                                onClick={() => toggleAmountVisibility(tx.id)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                                aria-label={hiddenAmounts.has(tx.id) ? 'Show amount' : 'Hide amount'}
                                            >
                                                {hiddenAmounts.has(tx.id) ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

