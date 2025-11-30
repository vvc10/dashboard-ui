'use client';

import React, { useState, useEffect } from 'react';
import { Share, Download, MoreHorizontal, Menu } from 'lucide-react';
import { StatCard, CreditCardWidget, BudgetSavingWidget } from './Widgets';
import { MainChart } from './MainChart';
import { TransactionHistory } from './TransactionHistory';
import { Sidebar } from './Sidebar';

// Mock Data for StatCards - Uniform values to create the "bar code" progress effect
const statDataLength = 28;
const balanceData = Array.from({ length: statDataLength }, () => ({ value: 100 }));
const incomeData = Array.from({ length: statDataLength }, () => ({ value: 100 }));
const expenseData = Array.from({ length: statDataLength }, () => ({ value: 100 }));

export const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle}
        isMobileOpen={isMobileOpen}
        onMobileClose={handleMobileClose}
      />
      <main className={`
        flex-1 h-screen overflow-y-auto bg-gray-50 transition-all duration-300
        ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        ml-0
        px-4 sm:px-6 lg:px-8
      `}>
        {/* Header */}
        <header className="flex justify-between items-center mb-0 pr-2 sticky top-0 z-10 bg-gray-50/90 backdrop-blur-sm py-3 md:py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSidebarToggle}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-[16px] md:text-[18px] font-medium text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-[10px] text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              Export
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-[10px] text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              Share
            </button>
            <button className="p-2 bg-white border border-gray-200 text-gray-700 rounded-[10px] text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </header>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 pb-4">
          <div className="flex flex-col gap-2 w-full lg:w-[70%] border border-zinc-700/10 rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 lg:p-[20px] mb-4">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <StatCard
                title="Total Balance"
                value="$8,800"
                trend={3.1}
                trendLabel="vs last month"
                data={balanceData}
                color="#3B82F6"
                percentage={55}
              />
              <StatCard
                title="Income"
                value="$12,600"
                trend={2.1}
                trendLabel="vs last month"
                data={incomeData}
                color="#8B5CF6"
                percentage={60}
              />
              <StatCard
                title="Expense"
                value="$12,600"
                trend={-3.2}
                trendLabel="vs last month"
                data={expenseData}
                color="#F97316"
                percentage={75}
              />
            </div>

            {/* Middle Section: Chart + Card */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
                <MainChart />
              </div>
            </div>

            {/* Bottom Section: Transactions + Budget */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="min-h-[250px] sm:min-h-[300px]">
                <TransactionHistory />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[30%]">
            <div className="flex flex-col gap-4 lg:gap-6 mb-6">
              <CreditCardWidget />
              <BudgetSavingWidget />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

