import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  size?: number;
  variant?: 'ghost' | 'outline';
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = 20,
  variant = 'ghost',
  className = '',
  ...props
}) => {
  const baseStyles = 'p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    ghost: 'text-gray-600 hover:bg-gray-100',
    outline: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <Icon size={size} />
    </button>
  );
};

