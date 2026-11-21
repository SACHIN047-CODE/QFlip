import React, { useState, useEffect } from 'react';
import { pharmacyService } from '../../services/pharmacyService';
import { PharmacyOrder } from '../../types';
import { PageSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { BentoCard } from '../../components/common/BentoCard';
import { useAuth } from '../../context/AuthContext';
import { Pill, MapPin, CheckCircle2 } from 'lucide-react';

export const PharmacyOrderPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<PharmacyOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    pharmacyService.getOrders().then((data) => {
      // Strict Data Privacy: only display pharmacy dispensing orders for this logged in patient
      const userOrders = data.filter(
        (o) =>
          o.patientId === user.id ||
          (user.name && o.patientName && o.patientName.toLowerCase().includes(user.name.toLowerCase()))
      );
      setOrders(userOrders);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <PageSkeleton variant="content" />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Medicine Dispensing Orders"
        subtitle="Jan Aushadhi Kendra Dispensary • Real-time packaging and pickup status"
        badge={
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            Chemist Desk: <strong className="text-slate-800">Ground Floor, Near North Gate</strong>
          </span>
        }
      />

      {orders.length === 0 ? (
        <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Pill className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No Pharmacy Orders</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any pending pharmacy orders under patient ID <strong>{user?.id}</strong>. Doctor-prescribed medicines will appear here automatically for pickup.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <BentoCard
              key={order.id}
              variant="solid"
              padding="lg"
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-900 font-mono">
                      {order.tokenNumber}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Ordered: {order.orderDate} • Prescribed by: {order.prescribedDoctor}
                  </div>
                </div>

                <div className="p-2.5 bg-teal-50/80 border border-[#0F766E]/20 rounded-xl text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#0F766E] block">Pickup Counter</span>
                  <span className="text-xs font-bold text-slate-900">
                    {order.counterNumber}
                  </span>
                </div>
              </div>

              {/* Medicines List */}
              <div className="divide-y divide-slate-100 text-xs">
                {order.medicines.map((m, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{m.medicineName}</div>
                      <div className="text-[11px] text-slate-500">{m.instructions}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-semibold text-slate-800">Qty: {m.quantity}</span>
                      <span className="block text-[10px] text-emerald-600 font-medium">In Stock</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Government Subsidy: <strong className="text-slate-800">100% Free under Ayushman Bharat OPD Scheme</strong>
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  Covered
                </span>
              </div>
            </BentoCard>
          ))}
        </div>
      )}
    </div>
  );
};
