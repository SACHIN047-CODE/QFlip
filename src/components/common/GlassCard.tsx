import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  blur = 'md',
  border = true,
  hover = true,
  className = '',
  children,
  ...props
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  const borderClass = border ? 'border border-white/80' : '';
  const hoverClass = hover
    ? 'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgb(15,23,42,0.08)]'
    : '';

  return (
    <div
      className={`bg-white/72 ${blurClasses[blur]} ${borderClass} shadow-[0_8px_32px_0_rgba(15,23,42,0.06)] rounded-2xl ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

