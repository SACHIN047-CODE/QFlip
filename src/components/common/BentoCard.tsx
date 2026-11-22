import React from 'react';

export type BentoCardVariant = 'glass' | 'solid' | 'teal' | 'ai' | 'danger' | 'flat';
export type BentoPadding = 'none' | 'sm' | 'md' | 'lg';

export interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: BentoCardVariant;
  padding?: BentoPadding;
  colSpan?: string; // e.g. "col-span-12 md:col-span-6 lg:col-span-4"
  rowSpan?: string; // e.g. "row-span-1" or "row-span-2"
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  hover?: boolean;
  headerClassName?: string;
  as?: React.ElementType;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  variant = 'glass',
  padding = 'md',
  colSpan = 'col-span-12',
  rowSpan = '',
  title,
  subtitle,
  badge,
  action,
  hover = true,
  className = '',
  headerClassName = '',
  as: Component = 'div',
  ...props
}) => {
  const variantStyles: Record<BentoCardVariant, string> = {
    glass:
      'bg-white/76 backdrop-blur-md border border-white/85 shadow-[0_10px_32px_rgb(15,23,42,0.05)] text-slate-900',
    solid:
      'bg-white/88 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_20px_-2px_rgb(15,23,42,0.04)] text-slate-900',
    teal:
      'bg-[#E6F4F1]/85 backdrop-blur-md border border-[#0F766E]/25 shadow-[0_8px_30px_rgb(15,118,110,0.07)] text-slate-900',
    ai:
      'bg-purple-50/75 backdrop-blur-md border border-purple-200/80 shadow-[0_8px_30px_rgb(124,58,237,0.06)] text-slate-900',
    danger:
      'bg-red-50/75 backdrop-blur-md border border-red-200/80 shadow-[0_8px_30px_rgb(220,38,38,0.06)] text-slate-900',
    flat:
      'bg-slate-50/80 backdrop-blur-sm border border-slate-200/70 text-slate-900',
  };

  const paddingStyles: Record<BentoPadding, string> = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5 md:p-6',
    lg: 'p-6 sm:p-7 md:p-8',
  };

  const hoverStyle = hover
    ? 'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgb(15,23,42,0.08)] hover:border-slate-300/80'
    : 'transition-all duration-200';

  const hasHeader = Boolean(title || subtitle || badge || action);

  return (
    <Component
      className={`bento-card rounded-2xl min-w-0 ${colSpan} ${rowSpan} ${variantStyles[variant]} ${hoverStyle} ${className}`}
      {...props}
    >
      {hasHeader && (
        <div
          className={`flex items-start justify-between gap-3 border-b border-slate-100/80 pb-3 mb-4 ${
            padding === 'none' ? 'p-4 sm:p-5' : ''
          } ${headerClassName}`}
        >
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {typeof title === 'string' ? (
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight truncate">
                  {title}
                </h3>
              ) : (
                title
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 truncate">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
        </div>
      )}
      <div className={padding !== 'none' ? paddingStyles[padding] : ''}>
        {children}
      </div>
    </Component>
  );
};
