import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Bell, CheckCircle2, Clock, FlaskConical, Pill, Stethoscope } from 'lucide-react';

interface Notification {
  id: string;
  type: 'queue' | 'lab' | 'pharmacy' | 'appointment' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'queue',
    title: 'Queue Update',
    message: 'Token OPD-098 is in consultation. 6 patients ahead of your token OPD-104. Please take seat in 1st Floor Waiting Hall 2.',
    time: '10:02 AM',
    read: false,
  },
  {
    id: '2',
    type: 'queue',
    title: 'Token Booked',
    message: 'Token OPD-104 booked successfully for General Medicine (Room 12). Estimated wait: 25 mins.',
    time: '09:48 AM',
    read: true,
  },
  {
    id: '3',
    type: 'lab',
    title: 'Lab Report Ready',
    message: 'Your CBC with Platelets report is ready. Please download from the Lab Tests section.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    type: 'pharmacy',
    title: 'Medicine Ready for Pickup',
    message: 'Your prescription medicines are ready for pickup at Jan Aushadhi Counter #03.',
    time: 'Yesterday',
    read: true,
  },
];

const notificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'queue': return <Clock className="w-4 h-4 text-teal-700" />;
    case 'lab': return <FlaskConical className="w-4 h-4 text-purple-600" />;
    case 'pharmacy': return <Pill className="w-4 h-4 text-emerald-600" />;
    case 'appointment': return <Stethoscope className="w-4 h-4 text-blue-600" />;
    default: return <Bell className="w-4 h-4 text-slate-500" />;
  }
};

const notificationBg = (type: Notification['type']) => {
  switch (type) {
    case 'queue': return 'bg-teal-50';
    case 'lab': return 'bg-purple-50';
    case 'pharmacy': return 'bg-emerald-50';
    case 'appointment': return 'bg-blue-50';
    default: return 'bg-slate-50';
  }
};

export const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'} • ABDM Push Alerts`}
        badge={
          unreadCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              {unreadCount} new
            </span>
          ) : undefined
        }
        actions={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark all read
            </button>
          ) : undefined
        }
      />

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markRead(notif.id)}
            className={`glass-card p-4 transition-all cursor-pointer ${
              !notif.read
                ? 'border-[#0F766E]/40 shadow-sm bg-white/90'
                : 'border-slate-200/80 opacity-85'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl ${notificationBg(notif.type)} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {notificationIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#0F766E] inline-block animate-pulse"></span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No Notifications</h3>
          <p className="text-xs text-slate-500">You're all caught up. Queue updates and health alerts will appear here.</p>
        </div>
      )}
    </div>
  );
};

