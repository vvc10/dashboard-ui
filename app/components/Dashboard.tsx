'use client';

import React from 'react';
import { MoreHorizontal, Menu } from 'lucide-react';
import { StatCard, CreditCardWidget, BudgetSavingWidget } from './Widgets';
import { MainChart } from './MainChart';
import { TransactionHistory } from './TransactionHistory';
import { Sidebar } from './Sidebar';
import { useSidebar } from '@/app/contexts/SidebarContext';
import { STAT_CARDS, STAT_DATA_LENGTH } from '@/app/data/constants';
import { generateStatData } from '@/app/utils/helpers';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';

export const Dashboard: React.FC = () => {
  const { isCollapsed, isMobileOpen, toggleSidebar, closeMobile } = useSidebar();
  
  const statData = generateStatData(STAT_DATA_LENGTH);

  return (
    <>
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggle={toggleSidebar}
        isMobileOpen={isMobileOpen}
        onMobileClose={closeMobile}
      />
      <main className={`
        flex-1 h-screen overflow-y-auto bg-gray-50 transition-all duration-300
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        ml-0
        px-4 sm:px-6 lg:px-8
      `}>
        {/* Header */}
        <header className="flex justify-between items-center mb-0 pr-2 sticky top-0 z-10 bg-gray-50/90 backdrop-blur-sm py-3 md:py-4">
          <div className="flex items-center gap-3">
            <IconButton
              icon={Menu}
              onClick={toggleSidebar}
              className="lg:hidden"
              aria-label="Toggle menu"
            />
            <h1 className="text-[16px] md:text-[18px] font-medium text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="primary" size="sm" className="hidden sm:flex">
              Export
            </Button>
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              Share
            </Button>
            <IconButton
              icon={MoreHorizontal}
              variant="outline"
              aria-label="More options"
            />
          </div>
        </header>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 pb-4">
          <div className="flex flex-col gap-2 w-full lg:w-[70%] border border-zinc-700/10 rounded-[25px] sm:rounded-[30px] p-4 sm:p-6 lg:p-[20px] mb-4">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {STAT_CARDS.map((stat) => (
                <StatCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  trend={stat.trend}
                  trendLabel={stat.trendLabel}
                  data={statData}
                  color={stat.color}
                  percentage={stat.percentage}
                />
              ))}
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

