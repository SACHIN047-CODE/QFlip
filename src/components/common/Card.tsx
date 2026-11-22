import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'primary' | 'emergency' | 'ai';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'glass-surface border-slate-200/80',
    subtle: 'bg-slate-50/75 border-slate-200/80',
    primary: 'bg-[#E6F4F1]/70 border-[#0F766E]/30',
    emergency: 'bg-red-50/70 border-red-200',
    ai: 'bg-purple-50/70 border-purple-200',
  };

  return (
    <div
      className={`bento-card rounded-2xl border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-5 pb-3 border-b border-slate-200/70 flex items-center justify-between ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-4 bg-slate-50/60 rounded-b-2xl border-t border-slate-200/70 ${className}`}
    {...props}
  >
    {children}
  </div>
);

