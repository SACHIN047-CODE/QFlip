import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div
      className={`p-10 text-center rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl">
        {icon || <span className="material-symbols-outlined text-2xl">folder_open</span>}
      </div>
      <div className="max-w-sm space-y-1">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};

