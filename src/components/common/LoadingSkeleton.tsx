import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-3 animate-pulse p-4 glass-surface rounded-2xl border border-slate-200/80">
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
          <div className="h-3 bg-slate-100 rounded w-1/2"></div>
          <div className="h-3 bg-slate-100 rounded w-1/6"></div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse p-5 glass-surface rounded-2xl border border-slate-200/80 space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-3 bg-slate-200 rounded w-24"></div>
        <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
      </div>
      <div className="h-7 bg-slate-200 rounded w-16"></div>
      <div className="h-2.5 bg-slate-100 rounded w-32"></div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 6 }) => (
  <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden animate-pulse">
    <div className="h-11 bg-slate-100 border-b border-slate-200" />
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 px-4 py-4">
          <div className="h-3 bg-slate-200 rounded" />
          <div className="h-3 bg-slate-100 rounded" />
          <div className="h-3 bg-slate-100 rounded" />
          <div className="h-3 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  </div>
);

export const PageSkeleton: React.FC<{ variant?: 'dashboard' | 'form' | 'content' }> = ({
  variant = 'dashboard',
}) => {
  if (variant === 'form') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
        <div className="h-20 bg-white rounded-2xl border border-slate-200/80" />
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-5">
          <div className="h-5 w-1/3 bg-slate-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-11 bg-slate-100 rounded-xl" />
            ))}
          </div>
          <div className="h-24 bg-slate-100 rounded-xl" />
          <div className="h-10 w-32 bg-slate-200 rounded-lg" />
        </div>
      </div>
    );
  }

  if (variant === 'content') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
        <div className="h-14 bg-white rounded-2xl border border-slate-200/80" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
            <div className="h-4 w-1/4 bg-slate-200 rounded" />
            <div className="h-3 w-full bg-slate-100 rounded" />
            <div className="h-3 w-5/6 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading page">
      <div className="h-16 bg-white/80 rounded-2xl border border-slate-200/80" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 h-72 glass-surface rounded-2xl" />
        <div className="lg:col-span-4 h-72 glass-surface rounded-2xl" />
      </div>
    </div>
  );
};

