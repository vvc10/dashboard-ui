'use client';

import React from 'react';
import {
    MoreHorizontal, Plus, ArrowUpRight, MoveUpRight, MoveDownLeft, ArrowDownLeft, CreditCard,
    Send, Wifi, User, Wallet, Sun,
    Loader
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { CREDIT_CARD_DATA, BUDGET_DATA } from '@/app/data/constants';

// --- Stat Card ---
interface StatCardProps {
    title: string;
    value: string;
    trend: number;
    trendLabel: string;
    data: { value: number }[];
    color: string;
    percentage?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendLabel, data, color, percentage = 100 }) => {
    const isPositive = trend > 0;
    const TrendIcon = isPositive ? MoveUpRight : MoveDownLeft;
    const trendColorClass = isPositive ? 'text-emerald-500' : 'text-red-500';

    // Determine icon based on title
    let Icon: ({ size }: { size: number }) => React.JSX.Element = WalletIcon;
    if (title === "Income") Icon = ({ size }: { size: number }) => <MoveDownLeft size={size} />;
    if (title === "Expense") Icon = ({ size }: { size: number }) => <MoveUpRight size={size} />;

    // Calculate how many bars should be colored based on percentage
    const activeCount = Math.floor(data.length * (percentage / 100));

    return (
        <div className="bg-zinc-700/2 p-2 sm:p-3 border border-zinc-700/10 rounded-[20px] flex flex-col justify-between h-full">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex gap-2 sm:gap-3 items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-gray-500">
                        <Icon size={14} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">{title}</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 border border-zinc-700/10 rounded-[20px] p-3 sm:p-4">
                <div className="mb-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2 saira-bold">{value}</h2>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className={`font-bold ${trendColorClass} flex items-center`}>
                            {isPositive ? '+' : ''}{trend}%
                        </span>
                        <span className="text-gray-400 font-medium text-[10px] sm:text-xs">{trendLabel}</span>
                    </div>
                </div>

                <div className="h-10 sm:h-12 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar dataKey="value" radius={[2, 2, 2, 2]} barSize={4}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index < activeCount ? color : '#F3F4F6'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// --- Credit Card Widget ---
export const CreditCardWidget: React.FC = () => {
    return (
        <div className="bg-white p-3 sm:p-4 border border-zinc-700/10 rounded-[20px] sm:rounded-[30px] h-fit flex flex-col">
            <div className="flex justify-between items-center mb-2 p-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-gray-400"><WalletIcon size={18} /></span>
                    Available Cards
                </h3>
                <button className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                    <Plus size={16} /> Add Card
                </button>
            </div>
            <div className="border border-zinc-700/10 rounded-[30px] p-4">
                {/* Visual Card - Metallic Silver Look */}
                <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden mb-8 shadow-xl group transition-transform hover:scale-[1.02] duration-300">
                    {/* Metallic Background Base */}
                    <div className="absolute inset-0 bg-[#d1d5db]"></div>

                    {/* Radial Concentric Texture (Vinyl effect) */}
                    <div className="absolute inset-0 opacity-50" style={{
                        background: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, rgba(0,0,0,0.05) 3px, transparent 4px)'
                    }}></div>

                    {/* Conic Gradient for Anisotropic Shine (The "X" reflection) */}
                    <div className="absolute inset-0 mix-blend-overlay opacity-80" style={{
                        background: 'conic-gradient(from 45deg at 50% 50%, #9ca3af 0deg, #f3f4f6 70deg, #9ca3af 140deg, #f3f4f6 210deg, #9ca3af 280deg, #f3f4f6 320deg, #9ca3af 360deg)'
                    }}></div>

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/30"></div>

                    {/* Card Content */}
                    <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                        {/* Top Row */}
                        <div className="flex justify-between items-start">
                            {/* Chip & Contactless */}
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md border border-yellow-500/30 flex items-center justify-center relative overflow-hidden shadow-inner">
                                    <div className="absolute inset-0 border-[0.5px] border-black/10 rounded-md"></div>
                                    <div className="w-full h-[1px] bg-black/10 absolute top-1/3"></div>
                                    <div className="w-full h-[1px] bg-black/10 absolute bottom-1/3"></div>
                                    <div className="h-full w-[1px] bg-black/10 absolute left-1/3"></div>
                                    <div className="h-full w-[1px] bg-black/10 absolute right-1/3"></div>
                                    <div className="w-3 h-2 border border-black/10 rounded-sm"></div>
                                </div>
                                <Wifi size={24} className="rotate-90 text-gray-600/80" strokeWidth={2} />
                            </div>

                            {/* Visa Logo */}
                            <div className="text-right">
                                <div className="text-2xl font-black italic text-gray-800 tracking-wider leading-none">VISA</div>
                                <div className="text-[8px] font-semibold text-gray-600 uppercase tracking-widest mt-0.5">Signature Business</div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex justify-end mt-auto">
                            {/* Mastercard Circles */}
                            <div className="relative flex items-center">
                                <div className="w-10 h-10 rounded-full border-[1.5px] border-white/80 z-10"></div>
                                <div className="w-10 h-10 rounded-full border-[1.5px] border-white/80 -ml-6 z-0"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List Details */}
                <div className="space-y-5 mb-8 flex-1">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3 text-gray-500 font-medium">
                            <Loader />
                            Connected Card
                        </div>
                        <span className="font-bold saira-bold text-gray-900">{CREDIT_CARD_DATA.accounts} Accounts</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3 text-gray-500 font-medium">
                            <Loader />
                            Total Balance
                        </div>
                        <span className="font-bold saira-bold text-gray-900">{CREDIT_CARD_DATA.totalBalance}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3 text-gray-500 font-medium">
                            <Loader />
                            Total Saving
                        </div>
                        <span className="font-bold saira-bold text-gray-900">{CREDIT_CARD_DATA.totalSaving}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 gap-4 mt-auto">
                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                        <ArrowDownLeft size={18} /> Request
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1C1C1E] text-white text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm">
                        <ArrowUpRight size={18} /> Send
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Budget Saving Widget ---
const CustomBudgetBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    const index = payload?.index ?? 0;
    
    // Determine color based on bar index
    let fillColor = '';
    if (index < 30) {
        // First 30 bars: vibrant blue
        fillColor = '#3B82F6';
    } else if (index < 40) {
        // Next 10 bars (30-39): cyan/teal blue
        fillColor = '#06B6D4';
    } else if (index < 45) {
        // Next 5 bars (40-44): green with gradient
        fillColor = `url(#greenGradient-${index})`;
    } else {
        // Last 5 bars (45-49): gray with gradient
        fillColor = `url(#grayGradient-${index})`;
    }
    
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fillColor}
            rx={2}
        />
    );
};

export const BudgetSavingWidget: React.FC = () => {
    // 50 bars total
    const data = Array.from({ length: 50 }).map((_, index) => ({ value: 100, index }));

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-gray-400"><PieChartIcon size={18} /></span>
                    Budget saving
                </h3>
                <button className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                    <Plus size={16} /> New
                </button>
            </div>
            <div className="flex flex-col gap-4 border border-zinc-700/10 rounded-[20px] p-4">

                <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Total Saving</p>
                    <div className="flex flex-row justify-between items-end gap-2 sm:gap-3">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight saira-bold">{BUDGET_DATA.totalSaving}</h2>
                        <div className="text-right mb-1.5 flex flex-col items-end">
                            <span className="text-[22px] font-bold saira-bold px-1.5 py-0.5 rounded-full mb-0.5">+{BUDGET_DATA.trend}%</span>
                            <p className="text-[12px] text-gray-400 font-medium whitespace-nowrap">{BUDGET_DATA.trendLabel}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-[60px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <defs>
                                {/* Green gradients for bars 40-44 */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <linearGradient key={`green-${i}`} id={`greenGradient-${40 + i}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
                                    </linearGradient>
                                ))}
                                {/* Gray gradients for bars 45-49 */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <linearGradient key={`gray-${i}`} id={`grayGradient-${45 + i}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.5" />
                                     </linearGradient>
                                ))}
                            </defs>
                            <Bar dataKey="value" shape={<CustomBudgetBar />} radius={[2, 2, 2, 2]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

// Internal icons 
const WalletIcon = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>;
const PieChartIcon = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>;
const ArrowDownIcon = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>;
const ArrowUpIcon = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></svg>;
const SunIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41-1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>;

