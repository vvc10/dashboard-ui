'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { MoreHorizontal, ChevronsLeftRight } from 'lucide-react';
import { CHART_DATA, CHART_PERIODS } from '@/app/data/constants';
import { formatNumber } from '@/app/utils/helpers';

const CustomTooltip = ({ active, payload, label, coordinate }: any) => {
  if (active && payload && payload.length) {
    // Get the bar's top position (y coordinate is at the top of the bar)
    const barTopY = coordinate?.y || 0;
    
    return (
      <div 
        className="bg-gray-900 text-white text-xs py-1 px-3 rounded-lg shadow-xl absolute pointer-events-none z-50"
        style={{
          left: `${coordinate?.x || 0}px`,
          top: `${barTopY - 45}px`,
          transform: 'translateX(-50%)',
        }}
      >
        <p className="font-semibold saira-bold">${formatNumber(payload[0].value)}</p>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
      </div>
    );
  }
  return null;
};

const CustomBar = (props: any) => {
  const { fill, x, y, width, height, payload } = props;
  
  if (payload.active) {
    // For active bar (June), use gradient with white faded center
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="url(#activeBarGradient)"
        rx={8}
      />
    );
  }
  
  // For inactive bars, use gradient with zinc-700/10
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="url(#inactiveBarGradient)"
      rx={8}
    />
  );
};

export const MainChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<typeof CHART_PERIODS[number]>('Yearly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-zinc-700/2 p-2 sm:p-3 border border-zinc-700/10 rounded-[25px] flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="p-1.5 bg-gray-50 rounded-md text-gray-500">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
             </div>
             <h3 className="font-semibold text-sm sm:text-base text-gray-900">Usage Category</h3>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-1 sm:gap-2 mt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 saira-bold">$15,200</h2>
            <span className="text-xs sm:text-sm text-gray-500">total transactions</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="relative" ref={dropdownRef}>
             <button 
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="flex items-center gap-2 px-2 sm:px-3 py-1.5 border border-gray-200 rounded-[10px] text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
             >
               <span className="hidden sm:inline">{selectedPeriod}</span>
               <span className="sm:hidden">{selectedPeriod.slice(0, 3)}</span>
               <ChevronsLeftRight className={`rotate-90 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={14} />
             </button>
             {isDropdownOpen && (
               <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-[10px] shadow-lg z-50">
                 {CHART_PERIODS.map((period) => (
                   <button
                     key={period}
                     onClick={() => {
                       setSelectedPeriod(period);
                       setIsDropdownOpen(false);
                     }}
                     className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                       selectedPeriod === period ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-600'
                     }`}
                   >
                     {period}
                   </button>
                 ))}
               </div>
             )}
           </div>
           <button className="flex items-center gap-2 px-1.5 py-1.5 border border-gray-200 rounded-[10px] text-sm font-medium text-gray-600 hover:bg-gray-50">
             <MoreHorizontal size={20} />
           </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={CHART_DATA}
            margin={{
              top: 20,
              right: 0,
              left: -20,
              bottom: 0,
            }}
            barSize={48}
          >
            <defs>
              <linearGradient id="activeBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                <stop offset="10%" stopColor="#3B82F6" stopOpacity="0.5" />
                <stop offset="15%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="inactiveBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3F3F46" stopOpacity="0.02" />
                <stop offset="10%" stopColor="#3F3F46" stopOpacity="0.05" />
                <stop offset="15%" stopColor="#3F3F46" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#3F3F46" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{fill: 'transparent'}}
              allowEscapeViewBox={{ x: true, y: true }}
            />
            <Bar dataKey="value" shape={<CustomBar />} radius={[8, 8, 8, 8]}>
              {CHART_DATA.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={entry.active ? '#3B82F6' : '#F3F4F6'} 
                    className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

