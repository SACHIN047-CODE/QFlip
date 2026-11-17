import { apiClient, delay, USE_MOCK } from './api';
import { LabTestRequest } from '../types';
import { INITIAL_LAB_REQUESTS } from './mockData';

const LAB_STORAGE_KEY = 'careflow_lab_requests';

const getStoredLabRequests = (): LabTestRequest[] => {
  const data = localStorage.getItem(LAB_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(INITIAL_LAB_REQUESTS));
    return INITIAL_LAB_REQUESTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_LAB_REQUESTS;
  }
};

const saveLabRequests = (items: LabTestRequest[]) => {
  localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(items));
};

export const laboratoryService = {
  async getTestRequests(status?: string, category?: string): Promise<LabTestRequest[]> {
    if (USE_MOCK) {
      await delay(200);
      let items = getStoredLabRequests();
      if (status && status !== 'ALL') {
        items = items.filter(i => i.status === status);
      }
      if (category && category !== 'ALL') {
        items = items.filter(i => i.category === category);
      }
      return items;
    }
    return apiClient.get('/lab/tests', { params: { status, category } });
  },

  async updateTestStatus(
    id: string, 
    status: LabTestRequest['status'], 
    summaryFindings?: string, 
    resultReportUrl?: string
  ): Promise<LabTestRequest> {
    if (USE_MOCK) {
      await delay(300);
      const items = getStoredLabRequests();
      const updated = items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status,
            summaryFindings: summaryFindings || item.summaryFindings,
            resultReportUrl: resultReportUrl || (status === 'COMPLETED' ? `#report-verified-${item.id}` : item.resultReportUrl),
            labTechnician: 'Tech. Manoj Varma'
          };
        }
        return item;
      });
      saveLabRequests(updated);
      const res = updated.find(i => i.id === id);
      if (!res) throw new Error('Lab test not found');
      return res;
    }
    return apiClient.patch(`/lab/tests/${id}/status`, { status, summaryFindings, resultReportUrl });
  },

  async createLabRequest(request: Omit<LabTestRequest, 'id' | 'orderedAt' | 'status'>): Promise<LabTestRequest> {
    if (USE_MOCK) {
      await delay(300);
      const items = getStoredLabRequests();
      const newItem: LabTestRequest = {
        ...request,
        id: `lab-${Date.now()}`,
        orderedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'PENDING'
      };
      saveLabRequests([newItem, ...items]);
      return newItem;
    }
    return apiClient.post('/lab/tests', request);
  }
};
