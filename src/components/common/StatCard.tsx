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
      case 'secondary':
        return 'border-[#0F766E]/20 bg-white hover:border-[#0F766E]/40';
      case 'danger':
        return 'border-red-200 bg-red-50/30 hover:border-red-300';
      case 'success':
        return 'border-green-200 bg-green-50/30 hover:border-green-300';
      default:
        return 'border-slate-200 bg-white hover:border-slate-300';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'accent':
      case 'secondary':
        return 'bg-[#E6F4F1] text-[#0F766E]';
      case 'danger':
        return 'bg-red-50 text-[#DC2626]';
      case 'success':
        return 'bg-green-50 text-[#16A34A]';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className={`bento-card glass-surface p-4 sm:p-5 rounded-2xl border transition-all ${getVariantStyles()} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 block">
            {label}
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
            {value}
          </div>
        </div>
        {icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor()}`}>
            <span className="material-symbols-outlined text-lg">{icon}</span>
          </div>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend ? (
            <div className="flex items-center gap-1.5 font-medium">
              <span className={`inline-flex items-center font-bold ${trend.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                {trend.value}
              </span>
              <span className="text-slate-500">{trend.label || 'vs last hour'}</span>
            </div>
          ) : (
            <span className="text-slate-500 truncate">{subtext}</span>
          )}

          {actionText && (
            <button
              type="button"
              onClick={onAction}
              className="text-[#0F766E] hover:underline font-semibold flex items-center gap-0.5 ml-2 flex-shrink-0"
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
