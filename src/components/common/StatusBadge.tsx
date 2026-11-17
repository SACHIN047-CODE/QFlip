import React from 'react';
import { TokenStatus, PriorityLevel } from '../../types';

interface StatusBadgeProps {
  status?: TokenStatus | string;
  priority?: PriorityLevel;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, priority, className = '' }) => {
  if (priority) {
    switch (priority) {
      case 'Emergency':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-danger/15 text-danger border border-danger/30 animate-pulse ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-danger"></span>
            EMERGENCY
          </span>
        );
      case 'Senior':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-warning/15 text-on-warning border border-warning/30 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
            Senior Citizen
          </span>
        );
      case 'Pediatric':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary/15 text-secondary border border-secondary/30 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Pediatric Child
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-light-surface-variant text-light-on-surface-variant border border-light-outline ${className}`}>
            Standard OPD
          </span>
        );
    }
  }

  switch (status) {
    case 'IN_CONSULTATION':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary/15 text-secondary border border-secondary/30 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          In Consultation
        </span>
      );
    case 'WAITING':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-on-accent border border-accent/40 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          Waiting in Queue
        </span>
      );
    case 'COMPLETED':
    case 'DISPENSED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/15 text-success border border-success/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
          Completed
        </span>
      );
    case 'SKIPPED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-light-surface-variant text-light-on-surface-variant line-through ${className}`}>
          Skipped
        </span>
      );
    case 'PROCESSING':
    case 'DISPENSING':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-warning/20 text-on-warning border border-warning/40 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-warning animate-spin"></span>
          Processing
        </span>
      );
    case 'READY_FOR_PICKUP':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-success/20 text-success border border-success/40 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
          Ready for Pickup
        </span>
      );
    case 'CRITICAL':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-danger text-white animate-bounce ${className}`}>
          CRITICAL ALERT
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-surface-variant text-light-on-surface-variant border border-light-outline ${className}`}>
          {status || 'Unknown'}
        </span>
      );
  }
};
