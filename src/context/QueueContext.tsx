import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PatientToken, PriorityLevel, TokenStatus, DoctorCapacityInfo } from '../types';
import { queueService } from '../services/queueService';
import { useAuth } from './AuthContext';

interface QueueContextType {
  tokens: PatientToken[];
  skippedTokens: PatientToken[];
  loading: boolean;
  departmentFilter: string;
  setDepartmentFilter: (dept: string) => void;
  myToken: PatientToken | null;
  currentServingToken: PatientToken | null;
  refreshTokens: () => Promise<void>;
  callNext: (department?: string) => Promise<PatientToken | null>;
  skip: (tokenId: string, reason?: string) => Promise<void>;
  rejoin: (tokenNumberOrId: string, staffId?: string) => Promise<{ token: PatientToken; newPosition: number }>;
  checkCapacity: (doctorId?: string, department?: string) => Promise<DoctorCapacityInfo>;
  updateStatus: (tokenId: string, status: TokenStatus) => Promise<void>;
  generateToken: (payload: {
    patientName: string;
    phone: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    abhaId?: string;
    department: string;
    symptoms: string[];
    priority?: PriorityLevel;
    voiceNoteUrl?: string;
    doctorId?: string;
  }) => Promise<PatientToken>;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<PatientToken[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');

  const refreshTokens = useCallback(async () => {
    try {
      setLoading(true);
      const data = await queueService.getTokens(departmentFilter === 'All' ? undefined : departmentFilter);
      setTokens(data);
    } catch (err) {
      console.error('Failed to fetch queue tokens', err);
    } finally {
      setLoading(false);
    }
  }, [departmentFilter]);

  useEffect(() => {
    refreshTokens();
  }, [refreshTokens]);

  const callNext = async (dept = 'General Medicine') => {
    const next = await queueService.callNextToken(dept);
    await refreshTokens();
    return next;
  };

  const skip = async (tokenId: string, reason?: string) => {
    await queueService.skipToken(tokenId, reason);
    await refreshTokens();
  };

  const rejoin = async (tokenNumberOrId: string, staffId?: string) => {
    const res = await queueService.rejoinToken(tokenNumberOrId, staffId);
    await refreshTokens();
    return res;
  };

  const checkCapacity = async (doctorId?: string, department?: string) => {
    return queueService.checkDoctorCapacity(doctorId, department);
  };

  const updateStatus = async (tokenId: string, status: TokenStatus) => {
    await queueService.updateTokenStatus(tokenId, status);
    await refreshTokens();
  };

  const generateToken = async (payload: {
    patientName: string;
    phone: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    abhaId?: string;
    department: string;
    symptoms: string[];
    priority?: PriorityLevel;
    voiceNoteUrl?: string;
    doctorId?: string;
  }) => {
    const created = await queueService.createToken(payload);
    await refreshTokens();
    return created;
  };

  // Active serving token
  const currentServingToken = tokens.find((t) => t.status === 'IN_CONSULTATION') || null;

  // Separate skipped patients queue
  const skippedTokens = tokens.filter(
    (t) => t.status === 'SKIPPED' || t.status === 'SKIPPED_AWAITING_RECEPTION'
  );

  // Find private token of logged-in patient (checks active, skipped, or waiting)
  const myToken = user
    ? tokens.find(
        (t) =>
          (t.patientId === user.id ||
            (user.phone && t.phone === user.phone) ||
            (user.name && t.patientName.toLowerCase().includes(user.name.toLowerCase()))) &&
          t.status !== 'COMPLETED'
      ) || null
    : null;

  return (
    <QueueContext.Provider
      value={{
        tokens,
        skippedTokens,
        loading,
        departmentFilter,
        setDepartmentFilter,
        myToken,
        currentServingToken,
        refreshTokens,
        callNext,
        skip,
        rejoin,
        checkCapacity,
        updateStatus,
        generateToken,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
