import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs px-3.5 py-2 gap-2',
    lg: 'text-sm px-4 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#0F766E] hover:bg-[#115E59] text-white focus:ring-[#0F766E] shadow-sm',
    secondary:
      'bg-[#E6F4F1] hover:bg-[#CCFBF1] text-[#0F766E] focus:ring-[#0F766E]',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 focus:ring-slate-300 shadow-sm',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-200',
    danger:
      'bg-[#DC2626] hover:bg-red-700 text-white focus:ring-red-500 shadow-sm',
    ai:
      'bg-[#7C3AED] hover:bg-purple-700 text-white focus:ring-purple-500 shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
      ) : icon ? (
        <span className="flex-shrink-0 flex items-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

