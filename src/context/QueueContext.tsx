import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PatientToken, PriorityLevel, TokenStatus } from '../types';
import { queueService } from '../services/queueService';
import { useAuth } from './AuthContext';

interface QueueContextType {
  tokens: PatientToken[];
  loading: boolean;
  departmentFilter: string;
  setDepartmentFilter: (dept: string) => void;
  myToken: PatientToken | null; // e.g. OPD-104 for patient Manpreet Singh
  currentServingToken: PatientToken | null;
  refreshTokens: () => Promise<void>;
  callNext: (department?: string) => Promise<PatientToken | null>;
  skip: (tokenId: string) => Promise<void>;
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

  const skip = async (tokenId: string) => {
    await queueService.skipToken(tokenId);
    await refreshTokens();
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
  }) => {
    const created = await queueService.createToken(payload);
    await refreshTokens();
    return created;
  };

  // Find current token being served
  const currentServingToken = tokens.find(t => t.status === 'IN_CONSULTATION') || null;

  // Find only logged-in user's private token (never fall back to other patients' tokens)
  const myToken = user
    ? tokens.find(
        (t) =>
          t.patientId === user.id ||
          (user.phone && t.phone === user.phone) ||
          (user.name && t.patientName.toLowerCase().includes(user.name.toLowerCase()))
      ) || null
    : null;

  return (
    <QueueContext.Provider
      value={{
        tokens,
        loading,
        departmentFilter,
        setDepartmentFilter,
        myToken,
        currentServingToken,
        refreshTokens,
        callNext,
        skip,
        updateStatus,
        generateToken,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
