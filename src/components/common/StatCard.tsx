import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: string; // Material symbol or Lucide name
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  variant?: 'default' | 'accent' | 'secondary' | 'danger' | 'success';
  className?: string;
  actionText?: string;
  onAction?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  trend,
  variant = 'default',
  className = '',
  actionText,
  onAction
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return 'border-accent/40 bg-accent/5';
      case 'secondary':
        return 'border-secondary/30 bg-secondary/5';
      case 'danger':
        return 'border-danger/30 bg-danger/5';
      case 'success':
        return 'border-success/30 bg-success/5';
      default:
        return 'border-light-outline bg-light-surface';
    }
  };

  return (
    <div className={`p-5 rounded-xl border shadow-card transition-all hover:shadow-md ${getVariantStyles()} ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-light-on-surface-variant block mb-1">
            {label}
          </span>
          <div className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary tracking-tight font-code">
            {value}
          </div>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-light-surface-variant border border-light-outline flex items-center justify-center text-light-primary">
            <span className="material-symbols-outlined text-xl text-secondary">{icon}</span>
          </div>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-3 pt-3 border-t border-light-outline/60 flex items-center justify-between text-xs">
          {trend ? (
            <div className="flex items-center gap-1.5 font-medium">
              <span className={`inline-flex items-center font-bold font-code ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
                {trend.value}
              </span>
              <span className="text-light-on-surface-variant">{trend.label || 'vs last hour'}</span>
            </div>
          ) : (
            <span className="text-light-on-surface-variant">{subtext}</span>
          )}

          {actionText && (
            <button
              onClick={onAction}
              className="text-secondary hover:underline font-semibold font-label flex items-center gap-0.5"
            >
              {actionText}
              <span className="material-symbols-outlined text-xs">chevron_right</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
