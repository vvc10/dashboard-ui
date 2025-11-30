'use client';

import React, { useState } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';

const transactions = [
    { id: '1', name: 'Adobe After Effect', date: 'Sat, 20 Apr 2025', category: 'Subscription', amount: 80.00 },
    { id: '2', name: 'McDonald\'s', date: 'Fri, 19 Apr 2025', category: 'Food', amount: 32.00 },
    { id: '3', name: 'Levi\'s', date: 'Tue, 12 Apr 2025', category: 'Shopping', amount: 50.00 },
    { id: '4', name: 'Adobe After Effect', date: 'Sat, 10 Apr 2025', category: 'Subscription', amount: 80.00 },
];

export const TransactionHistory: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <div className="bg-zinc-700/2 p-2 sm:p-3 border border-zinc-700/10 rounded-[20px] flex flex-col h-full">
             <div className="p-2 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-gray-50 rounded-md text-gray-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                     </div>
                     <h3 className="font-semibold text-sm sm:text-base text-gray-900">Transaction History</h3>
                </div>
                
                <button className="flex items-center gap-2 px-2 sm:px-3 py-1.5 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50">
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
                                    <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center cursor-pointer"></div>
                                </th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium">Name</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium hidden sm:table-cell">Date</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium hidden md:table-cell">Category</th>
                                <th className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs sm:text-sm">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                                        <div 
                                            onClick={() => toggleSelect(tx.id)}
                                            className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center transition-colors ${selected.includes(tx.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}
                                        >
                                            {selected.includes(tx.id) && <Check size={10} strokeWidth={4} />}
                                        </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900">{tx.name}</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden sm:table-cell">{tx.date}</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden md:table-cell">{tx.category}</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-gray-900 saira-bold">${tx.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

