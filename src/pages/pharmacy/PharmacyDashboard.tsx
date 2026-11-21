import React, { useState, useEffect } from 'react';
import { pharmacyService } from '../../services/pharmacyService';
import { PharmacyOrder } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchBar } from '../../components/common/SearchBar';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { BentoCard } from '../../components/common/BentoCard';
import { Pill, PackageCheck, AlertCircle, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageSkeleton } from '../../components/common/LoadingSkeleton';

export const PharmacyDashboard: React.FC = () => {
  const [orders, setOrders] = useState<PharmacyOrder[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    Promise.all([pharmacyService.getOrders(), pharmacyService.getInventoryList()]).then(([orders, inventory]) => {
      setOrders(orders);
      setInventory(inventory);
      setLoading(false);
    });
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

  if (loading) return <PageSkeleton />;

  const filteredOrders = orders.filter(
    (o) =>
      o.patientName.toLowerCase().includes(search.toLowerCase()) ||
      o.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.prescribedDoctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jan Aushadhi Pharmacy Counter"
        subtitle="E-Prescription Dispensing, Inventory Management &amp; Patient Fulfillment"
      />

      {/* Top Pharmacy Status Banner (Glass Stat Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Prescriptions Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {orders.length + 184}
          </div>
          <div className="text-xs text-slate-500 mt-1">Jan Aushadhi Kendra</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Queued for Packaging
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2 font-mono tabular-nums">
            {queuedCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Auto Barcode Stream</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Currently Dispensing
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2 font-mono tabular-nums">
            {dispensingCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Counters 1, 2 & 3</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Ready at Counter
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2 font-mono tabular-nums">
            {readyCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">SMS Alerts Sent</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Prescription Orders Stream
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'inventory'
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Medicine Inventory & Racks
          </button>
        </div>

        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search patient, token, doctor..." />
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <BentoCard
              key={order.id}
              variant="solid"
              padding="md"
              className="space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono font-bold text-[#0F766E] text-base">
                    {order.tokenNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {order.patientName}
                  </h3>
                  <div className="text-xs text-slate-500">
                    Prescribed by: <strong className="text-slate-700">{order.prescribedDoctor}</strong> ({order.orderDate})
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Medicines required */}
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Prescription Items:
                </span>
                <div className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-100">
                  {order.medicines.map((m, idx) => (
                    <div key={idx} className="p-2 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{m.medicineName}</span>
                        <div className="text-[10px] text-slate-500">{m.instructions}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-900">Qty: {m.quantity}</span>
                        <span className="block text-[10px] text-[#16A34A] font-semibold">Jan Aushadhi</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">
                  Counter: <strong className="text-slate-800">{order.counterNumber}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {order.status === 'QUEUED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-amber-700 border-amber-300 hover:bg-amber-50"
                      onClick={() => handleUpdateStatus(order.id, 'DISPENSING')}
                    >
                      Package Now
                    </Button>
                  )}
                  {order.status === 'DISPENSING' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, 'READY_FOR_PICKUP')}
                    >
                      Call to Window
                    </Button>
                  )}
                  {order.status === 'READY_FOR_PICKUP' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                      onClick={() => handleUpdateStatus(order.id, 'DISPENSED')}
                    >
                      Confirm Dispensed ✓
                    </Button>
                  )}
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      ) : (
        <BentoCard variant="solid" padding="none" className="overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Jan Aushadhi Essential Drug Stock Status
            </h3>
            <span className="text-xs text-slate-500">Central Store Automated Restock</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Medicine Name</th>
                <th className="p-3.5">Batch #</th>
                <th className="p-3.5">Rack Location</th>
                <th className="p-3.5">Current Stock</th>
                <th className="p-3.5">Min Threshold</th>
                <th className="p-3.5">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="p-3.5 font-bold text-slate-900">{item.name}</td>
                  <td className="p-3.5 font-mono text-slate-600">{item.batch}</td>
                  <td className="p-3.5 font-semibold text-[#0F766E]">{item.location}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">{item.stock} Units</td>
                  <td className="p-3.5 font-mono text-slate-500">{item.minThreshold}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'CRITICAL'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : item.status === 'LOW_STOCK'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </BentoCard>
      )}
    </div>
  );
};

export const OrdersManagement: React.FC = () => <PharmacyDashboard />;
export const MedicinesInventory: React.FC = () => <PharmacyDashboard />;
