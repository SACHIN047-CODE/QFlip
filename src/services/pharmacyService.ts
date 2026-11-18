import { apiClient, delay, USE_MOCK } from './api';
import { PharmacyOrder } from '../types';
import { INITIAL_PHARMACY_ORDERS } from './mockData';

const PHARM_STORAGE_KEY = 'qflip_pharmacy_orders';

const getStoredOrders = (): PharmacyOrder[] => {
  const data = localStorage.getItem(PHARM_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(PHARM_STORAGE_KEY, JSON.stringify(INITIAL_PHARMACY_ORDERS));
    return INITIAL_PHARMACY_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PHARMACY_ORDERS;
  }
};

const saveOrders = (items: PharmacyOrder[]) => {
  localStorage.setItem(PHARM_STORAGE_KEY, JSON.stringify(items));
};

export const pharmacyService = {
  async getOrders(status?: string): Promise<PharmacyOrder[]> {
    if (USE_MOCK) {
      await delay(200);
      let orders = getStoredOrders();
      if (status && status !== 'ALL') {
        orders = orders.filter(o => o.status === status);
      }
      return orders;
    }
    return apiClient.get('/pharmacy/orders', { params: { status } });
  },

  async updateOrderStatus(id: string, status: PharmacyOrder['status']): Promise<PharmacyOrder> {
    if (USE_MOCK) {
      await delay(250);
      const orders = getStoredOrders();
      const updated = orders.map(o => (o.id === id ? { ...o, status } : o));
      saveOrders(updated);
      const found = updated.find(o => o.id === id);
      if (!found) throw new Error('Order not found');
      return found;
    }
    return apiClient.patch(`/pharmacy/orders/${id}/status`, { status });
  },

  async getInventoryList(): Promise<any[]> {
    if (USE_MOCK) {
      await delay(200);
      return [
        { id: 'med-1', name: 'Paracetamol 650mg Tab', batch: 'PCM-441', stock: 4850, minThreshold: 1000, status: 'IN_STOCK', location: 'Rack A-01' },
        { id: 'med-2', name: 'Amoxicillin + Clavulanate 625mg', batch: 'AMX-901', stock: 820, minThreshold: 500, status: 'IN_STOCK', location: 'Rack B-04' },
        { id: 'med-3', name: 'Pantoprazole 40mg Tab', batch: 'PAN-104', stock: 2400, minThreshold: 800, status: 'IN_STOCK', location: 'Rack A-03' },
        { id: 'med-4', name: 'Azithromycin 500mg Tab', batch: 'AZM-202', stock: 310, minThreshold: 400, status: 'LOW_STOCK', location: 'Rack C-02' },
        { id: 'med-5', name: 'Metformin 500mg SR Tab', batch: 'MET-550', stock: 3900, minThreshold: 1200, status: 'IN_STOCK', location: 'Rack D-01' },
        { id: 'med-6', name: 'Amlodipine 5mg Tab', batch: 'AML-2026', stock: 1850, minThreshold: 600, status: 'IN_STOCK', location: 'Rack D-03' },
        { id: 'med-7', name: 'Salbutamol Inhaler 100mcg', batch: 'SLB-108', stock: 45, minThreshold: 100, status: 'CRITICAL', location: 'Rack E-01' },
      ];
    }
    return apiClient.get('/pharmacy/inventory');
  }
};
