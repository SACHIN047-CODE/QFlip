import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'md',
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }[size];

  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div
        className={`${sizeClasses} border-secondary border-t-transparent rounded-full animate-spin`}
      ></div>
      {message && <p className="mt-3 text-xs font-semibold text-light-on-surface-variant">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-surface/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export const EmptyState: React.FC<{
  title: string;
  description?: string;
  icon?: string;
  action?: { label: string; onClick: () => void };
}> = ({ title, description, icon = 'inbox', action }) => (
  <div className="p-12 text-center bg-light-surface rounded-xl border border-light-outline shadow-card">
    <div className="w-14 h-14 mx-auto rounded-full bg-light-surface-variant flex items-center justify-center text-light-on-surface-variant mb-3">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <h4 className="font-headline text-title-md font-bold text-light-primary">{title}</h4>
    {description && <p className="text-xs text-light-on-surface-variant mt-1 max-w-sm mx-auto">{description}</p>}
    {action && (
      <button
        onClick={action.onClick}
        className="mt-4 px-4 py-2 bg-accent text-on-accent font-bold text-xs rounded-lg hover:brightness-95 transition-all"
      >
        {action.label}
      </button>
    )}
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({ title = 'Failed to load data', message = 'Please check your connection and try again.', onRetry }) => (
  <div className="p-8 text-center bg-danger/5 rounded-xl border border-danger/20">
    <span className="material-symbols-outlined text-3xl text-danger mb-2">error</span>
    <h4 className="font-headline text-sm font-bold text-danger">{title}</h4>
    <p className="text-xs text-light-on-surface-variant mt-1">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-3 px-3.5 py-1.5 bg-danger text-white text-xs font-semibold rounded-lg hover:bg-danger/90"
      >
        Retry
      </button>
    )}
  </div>
);

export const ChartContainer: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, badge, action, children, className = '' }) => (
  <div className={`bg-light-surface rounded-xl border border-light-outline p-5 shadow-card ${className}`}>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-light-outline/60">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-headline text-title-md font-bold text-light-primary">{title}</h3>
          {badge && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-light-on-surface-variant mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
    <div className="w-full">{children}</div>
  </div>
);
