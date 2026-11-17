import React, { useState, useEffect } from 'react';
import { pharmacyService } from '../../services/pharmacyService';
import { PharmacyOrder } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchBar } from '../../components/common/SearchBar';

export const PharmacyDashboard: React.FC = () => {
  const [orders, setOrders] = useState<PharmacyOrder[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');

  const loadData = () => {
    pharmacyService.getOrders().then(setOrders);
    pharmacyService.getInventoryList().then(setInventory);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, status: PharmacyOrder['status']) => {
    await pharmacyService.updateOrderStatus(id, status);
    loadData();
  };

  const queuedCount = orders.filter((o) => o.status === 'QUEUED').length;
  const dispensingCount = orders.filter((o) => o.status === 'DISPENSING').length;
  const readyCount = orders.filter((o) => o.status === 'READY_FOR_PICKUP').length;

  const filteredOrders = orders.filter(
    (o) =>
      o.patientName.toLowerCase().includes(search.toLowerCase()) ||
      o.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.prescribedDoctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Pharmacy Status Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
            Total Prescriptions Today
          </span>
          <div className="font-headline text-2xl font-black text-light-primary font-code mt-1">
            {orders.length + 184}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">Jan Aushadhi Kendra</div>
        </div>

        <div className="bg-accent/15 p-4 rounded-xl border-2 border-accent shadow-card">
          <span className="text-xs font-semibold text-on-accent uppercase">
            Queued for Packaging
          </span>
          <div className="font-headline text-2xl font-black text-on-accent font-code mt-1">
            {queuedCount}
          </div>
          <div className="text-[11px] text-on-accent font-medium mt-1">Auto Barcode Stream</div>
        </div>

        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
            Currently Dispensing
          </span>
          <div className="font-headline text-2xl font-black text-amber-600 font-code mt-1">
            {dispensingCount}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">Counters 1, 2 &amp; 3</div>
        </div>

        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
            Ready at Counter
          </span>
          <div className="font-headline text-2xl font-black text-success font-code mt-1">
            {readyCount}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">SMS Alerts Sent</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-light-outline">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-light-primary text-white shadow-sm'
                : 'text-light-on-surface-variant hover:bg-light-surface-variant'
            }`}
          >
            Prescription Orders Stream
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inventory'
                ? 'bg-light-primary text-white shadow-sm'
                : 'text-light-on-surface-variant hover:bg-light-surface-variant'
            }`}
          >
            Medicine Inventory &amp; Racks
          </button>
        </div>

        <div className="w-64">
          <SearchBar value={search} onChange={setSearch} placeholder="Search patient, token, doctor..." />
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-headline font-code font-bold text-secondary text-base">
                    {order.tokenNumber}
                  </span>
                  <h3 className="font-headline text-base font-bold text-light-primary mt-0.5">
                    {order.patientName}
                  </h3>
                  <div className="text-xs text-light-on-surface-variant">
                    Prescribed by: <strong>{order.prescribedDoctor}</strong> ({order.orderDate})
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Medicines required */}
              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">
                  Prescription Items:
                </span>
                <div className="divide-y divide-light-outline">
                  {order.medicines.map((m, idx) => (
                    <div key={idx} className="py-1.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-light-primary">{m.medicineName}</span>
                        <div className="text-[10px] text-light-on-surface-variant">{m.instructions}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-code font-bold text-light-primary">Qty: {m.quantity}</span>
                        <span className="block text-[10px] text-success font-semibold">Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-light-outline text-xs">
                <span className="text-light-on-surface-variant font-medium">
                  Assigned Counter: <strong>{order.counterNumber}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {order.status === 'QUEUED' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'DISPENSING')}
                      className="px-3 py-1.5 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 shadow-sm"
                    >
                      Package Now
                    </button>
                  )}
                  {order.status === 'DISPENSING' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'READY_FOR_PICKUP')}
                      className="px-3 py-1.5 bg-accent text-on-accent font-bold rounded-lg hover:brightness-95 shadow-sm"
                    >
                      Call to Window
                    </button>
                  )}
                  {order.status === 'READY_FOR_PICKUP' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'DISPENSED')}
                      className="px-3 py-1.5 bg-success text-white font-bold rounded-lg hover:bg-success/90 shadow-sm"
                    >
                      Confirm Dispensed ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-light-surface rounded-2xl border border-light-outline shadow-card overflow-hidden">
          <div className="p-4 border-b border-light-outline bg-light-surface-variant/30 flex items-center justify-between">
            <h3 className="font-headline text-title-md font-bold text-light-primary">
              Jan Aushadhi Essential Drug Stock Status
            </h3>
            <span className="text-xs text-light-on-surface-variant">Central Store Automated Restock</span>
          </div>

          <table className="w-full text-left text-xs font-body">
            <thead className="bg-light-surface-variant text-light-on-surface-variant uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5">Medicine Name</th>
                <th className="p-3.5">Batch #</th>
                <th className="p-3.5">Rack Location</th>
                <th className="p-3.5">Current Stock</th>
                <th className="p-3.5">Min Threshold</th>
                <th className="p-3.5">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-outline">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-light-surface-variant/40">
                  <td className="p-3.5 font-bold text-light-primary">{item.name}</td>
                  <td className="p-3.5 font-code">{item.batch}</td>
                  <td className="p-3.5 font-semibold text-secondary">{item.location}</td>
                  <td className="p-3.5 font-code font-bold text-light-primary">{item.stock} Units</td>
                  <td className="p-3.5 font-code text-light-on-surface-variant">{item.minThreshold}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'CRITICAL'
                          ? 'bg-danger/15 text-danger border border-danger/30 animate-pulse'
                          : item.status === 'LOW_STOCK'
                          ? 'bg-warning/20 text-on-warning border border-warning/40'
                          : 'bg-success/15 text-success border border-success/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const OrdersManagement: React.FC = () => <PharmacyDashboard />;
export const MedicinesInventory: React.FC = () => <PharmacyDashboard />;
