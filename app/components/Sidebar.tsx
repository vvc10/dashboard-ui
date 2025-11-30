'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wallet, CreditCard, PieChart, BarChart2, Banknote, TrendingUp, 
  HelpCircle, Settings, Search, Home, List, ChevronUp, ChevronDown, PanelLeft, Sparkles,
  Sparkle
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, isMobileOpen = false, onMobileClose }) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(true);
  const [isOthersOpen, setIsOthersOpen] = useState(true);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      <div className={`
        ${isCollapsed ? 'w-20' : 'w-64'} 
        h-screen bg-white flex flex-col fixed left-0 top-0 z-40 font-sans transition-all duration-300
        lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Header */}
      <div className={`${isCollapsed ? 'px-4 flex-col' : 'px-6'} py-6 flex items-center ${isCollapsed ? 'justify-center gap-3' : 'justify-between'} flex-shrink-0`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
              {/* Custom Acme Star Logo */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                  <path d="M12 2L14.2 8.6L21 12L14.2 15.4L12 22L9.8 15.4L3 12L9.8 8.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-lg text-gray-900 tracking-tight">Acme Inc.</span>
          </div>
        )}
        {isCollapsed && (
          <>
            <div className="flex items-center justify-center w-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                  <path d="M12 2L14.2 8.6L21 12L14.2 15.4L12 22L9.8 15.4L3 12L9.8 8.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onToggle) {
                  onToggle();
                }
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 w-full cursor-pointer relative z-50"
              aria-label="Expand sidebar"
              title="Expand sidebar"
              type="button"
            >
                <PanelLeft size={20} strokeWidth={2} />
            </button>
          </>
        )}
        {!isCollapsed && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Always call onToggle - it handles both mobile and desktop
              onToggle();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Collapse sidebar"
            type="button"
          >
              <PanelLeft size={20} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-6 mb-8 flex-shrink-0">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      )}

      {/* Menu Groups - Scrollable */}
      <div className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} space-y-8 overflow-y-auto overflow-x-hidden hide-scrollbar`}>
        {/* Main Menu */}
        <div>
          {!isCollapsed && (
            <button
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
              className="w-full px-3 text-xs font-semibold text-gray-500 mb-2 flex justify-between items-center cursor-pointer group uppercase tracking-wider hover:text-gray-700 transition-colors"
            >
              <span>Main Menu</span>
              <ChevronUp 
                size={14} 
                className={`text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isMainMenuOpen ? '' : 'rotate-180'}`} 
              />
            </button>
          )}
          {(!isCollapsed && isMainMenuOpen) && (
            <ul className="space-y-1">
              <li>
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-gray-900 font-semibold relative z-10">
                  <Home size={20} strokeWidth={2} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <Wallet size={20} strokeWidth={2} />
                  <span>Wallet</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <CreditCard size={20} strokeWidth={2} />
                  <span>Cards</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <div className="flex items-center gap-3">
                      <List size={20} strokeWidth={2} />
                      <span>Transactions</span>
                  </div>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">6</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <PieChart size={20} strokeWidth={2} />
                  <span>Budget</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <BarChart2 size={20} strokeWidth={2} />
                  <span>Goals</span>
                </Link>
              </li>
            </ul>
          )}
          {isCollapsed && (
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center justify-center p-3 rounded-xl bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-gray-900 hover:bg-gray-50 transition-colors" title="Dashboard">
                  <Home size={20} strokeWidth={2} />
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Wallet">
                  <Wallet size={20} strokeWidth={2} />
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Cards">
                  <CreditCard size={20} strokeWidth={2} />
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all relative" title="Transactions">
                  <List size={20} strokeWidth={2} />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 min-w-[14px] h-[14px] flex items-center justify-center rounded-full">6</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Budget">
                  <PieChart size={20} strokeWidth={2} />
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Goals">
                  <BarChart2 size={20} strokeWidth={2} />
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Analytics */}
        <div>
          {!isCollapsed && (
            <button
              onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
              className="w-full px-3 text-xs font-semibold text-gray-500 mb-2 flex justify-between items-center cursor-pointer group uppercase tracking-wider hover:text-gray-700 transition-colors"
            >
              <span>Analytics</span>
              <ChevronUp 
                size={14} 
                className={`text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isAnalyticsOpen ? '' : 'rotate-180'}`} 
              />
            </button>
          )}
          {(!isCollapsed && isAnalyticsOpen) && (
            <ul className="space-y-1">
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <div className="relative">
                      <PieChart size={20} strokeWidth={2} className="rotate-90" />
                  </div>
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <div className="flex items-center gap-3">
                      <Banknote size={20} strokeWidth={2} />
                      <span>Cash Flow</span>
                  </div>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">2</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <TrendingUp size={20} strokeWidth={2} />
                  <span>Investments</span>
                </Link>
              </li>
            </ul>
          )}
          {isCollapsed && (
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Analytics">
                  <PieChart size={20} strokeWidth={2} className="rotate-90" />
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all relative" title="Cash Flow">
                  <Banknote size={20} strokeWidth={2} />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1 min-w-[14px] h-[14px] flex items-center justify-center rounded-full">2</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Investments">
                  <TrendingUp size={20} strokeWidth={2} />
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Others */}
        <div>
          {!isCollapsed && (
            <button
              onClick={() => setIsOthersOpen(!isOthersOpen)}
              className="w-full px-3 text-xs font-semibold text-gray-500 mb-2 flex justify-between items-center cursor-pointer group uppercase tracking-wider hover:text-gray-700 transition-colors"
            >
              <span>Others</span>
              <ChevronUp 
                size={14} 
                className={`text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isOthersOpen ? '' : 'rotate-180'}`} 
              />
            </button>
          )}
          {(!isCollapsed && isOthersOpen) && (
            <ul className="space-y-1">
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <HelpCircle size={20} strokeWidth={2} />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-all">
                  <Settings size={20} strokeWidth={2} />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          )}
          {isCollapsed && (
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Help Center">
                  <HelpCircle size={20} strokeWidth={2} />
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center justify-center p-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" title="Settings">
                  <Settings size={20} strokeWidth={2} />
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Upgrade Banner - Fixed to Bottom */}
      {!isCollapsed && (
        <div className="p-4 flex-shrink-0 border-t border-gray-100">
          <div className="bg-white rounded-[20px] p-3 text-gray-900 relative overflow-hidden group cursor-pointer border border-zinc-700/5">
              {/* Dotted pattern gradient in top-right */}
              <div 
                className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl"
              >
                <div 
                  className="absolute top-0 right-0 w-56 h-56"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #D1D5DB 1.5px, transparent 1.5px)',
                    backgroundSize: '10px 10px',
                    maskImage: 'radial-gradient(ellipse 180% 180% at top right, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.1) 80%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 180% 180% at top right, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.1) 80%, transparent 100%)',
                  }}
                ></div>
              </div>
              
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mb-4 border border-gray-600 relative z-10">
                   <Sparkle size={18} className="text-white fill-white stroke-white" />
              </div>
              
              <h4 className="font-semibold text-base mb-1 text-gray-900 relative z-10">Upgrade Now</h4>
              <p className="text-xs text-gray-500 mb-4 font-medium relative z-10">You have 100 credits left</p>
              
              <button className="w-full py-2.5 bg-white border border-zinc-700/2 text-gray-900 text-xs font-bold rounded-[10px] hover:bg-gray-50 transition-colors relative z-10">
                  Get more credits
              </button>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="p-2 flex-shrink-0 border-t border-gray-100">
          <div className="bg-white rounded-xl p-3 text-gray-900 relative overflow-hidden shadow-lg group cursor-pointer flex items-center justify-center border border-gray-200" title="Upgrade Now">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                  <Sparkle size={16} className="text-white fill-white stroke-white" />
              </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

