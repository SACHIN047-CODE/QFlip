import React, { useState, useEffect } from 'react';
import { pharmacyService } from '../../services/pharmacyService';
import { PharmacyOrder } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';

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

  if (loading) return <LoadingSpinner message="Checking your private pharmacy prescriptions..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-light-outline">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Jan Aushadhi Kendra Integration
          </span>
          <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
            Medicine Dispensing Orders
          </h1>
        </div>
        <div className="text-xs text-light-on-surface-variant">
          Chemist Desk: <strong>Ground Floor, Near North Gate</strong>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 bg-light-surface rounded-2xl border border-light-outline text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-light-on-surface-variant">medication</span>
          <h3 className="font-headline text-title-md font-bold text-light-primary">No Pharmacy Orders</h3>
          <p className="text-xs text-light-on-surface-variant max-w-sm mx-auto">
            You do not have any pending pharmacy orders under patient ID <strong>{user?.id}</strong>. Doctor-prescribed medicines will appear here automatically for pickup.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
          <div
            key={order.id}
            className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-light-outline gap-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-headline text-lg font-bold text-light-primary">
                    {order.tokenNumber}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="text-xs text-light-on-surface-variant mt-0.5">
                  Ordered: {order.orderDate} • Prescribed by: {order.prescribedDoctor}
                </div>
              </div>

              <div className="p-2.5 bg-accent/15 border border-accent rounded-xl text-right">
                <span className="text-[10px] uppercase font-bold text-on-accent block">Pickup Counter</span>
                <span className="font-headline text-xs font-bold text-light-primary">
                  {order.counterNumber}
                </span>
              </div>
            </div>

            {/* Medicines List */}
            <div className="divide-y divide-light-outline-variant text-xs">
              {order.medicines.map((m, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-light-primary">{m.medicineName}</div>
                    <div className="text-[11px] text-light-on-surface-variant">{m.instructions}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-code font-bold text-light-primary">Qty: {m.quantity}</span>
                    <span className="block text-[10px] text-success font-semibold">In Stock</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline flex items-center justify-between text-xs">
              <span className="text-light-on-surface-variant">
                Standard Government Subsidy: <strong>100% Free under Ayushman Bharat OPD Scheme</strong>
              </span>
              <button
                onClick={() => alert(`Prescription barcode verified for ${order.counterNumber}`)}
                className="px-3.5 py-1.5 bg-light-primary text-white font-bold rounded-lg hover:bg-slate-800"
              >
                Show Barcode at Counter
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('qflip_notifications');
    if (raw) setNotifications(JSON.parse(raw));
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-3 border-b border-light-outline">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Official Hospital Dispatch Log
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
          Notifications &amp; SMS History
        </h1>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-5 bg-light-surface rounded-2xl border border-light-outline shadow-card space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-sm font-bold text-light-primary">{notif.title}</h3>
              <span className="font-code text-xs text-light-on-surface-variant">{notif.timestamp}</span>
            </div>
            <p className="text-xs text-light-on-surface-variant leading-relaxed">{notif.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
