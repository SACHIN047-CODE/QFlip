import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { firestoreService } from '../../services/firestoreService';
import { DataTable, Column } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { Modal } from '../../components/common/Modal';
import { BentoCard } from '../../components/common/BentoCard';

export const DoctorsManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successBanner, setSuccessBanner] = useState<{ name: string; email: string } | null>(null);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'Demo@12346',
    pin: '7788',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD',
    room: 'OPD-14',
    shift: '08:30 - 14:00',
  });

  useEffect(() => {
    async function loadDoctors() {
      try {
        const [defaultDoctors, firebaseDoctors] = await Promise.all([
          adminService.getDoctorsList(),
          firestoreService.getDoctors()
        ]);

        const mergedMap = new Map<string, any>();
        // Add default doctors
        (defaultDoctors || []).forEach((d: any) => {
          const key = (d.email || d.name).toLowerCase();
          mergedMap.set(key, { ...d, source: 'system' });
        });
        // Override or add Firebase stored doctors
        (firebaseDoctors || []).forEach((d: any) => {
          const key = (d.email || d.name).toLowerCase();
          mergedMap.set(key, { ...d, source: 'firebase' });
        });

        setDoctors(Array.from(mergedMap.values()));
      } catch (err) {
        console.warn('Fallback loading doctors:', err);
        adminService.getDoctorsList().then(setDoctors);
      }
    }
    loadDoctors();
  }, []);

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctor.name.trim()) return;

    const cleanName = newDoctor.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const doctorEmail = newDoctor.email.trim() || `${cleanName || 'dr' + Date.now()}@careflow.gov.in`;

    setSaving(true);
    try {
      // Save doctor directly to Firebase Cloud Firestore 'users' collection with role="doctor"
      await firestoreService.registerDoctor({
        name: newDoctor.name,
        email: doctorEmail,
        phone: newDoctor.phone.trim() || '+91 98765 43210',
        password: newDoctor.password.trim() || 'Demo@12346',
        pin: newDoctor.pin.trim() || '7788',
        specialty: newDoctor.specialty,
        qualification: newDoctor.qualification,
        room: newDoctor.room,
        shift: newDoctor.shift,
      });

      const docObj = {
        id: `doc-${Date.now()}`,
        name: newDoctor.name,
        email: doctorEmail,
        specialty: newDoctor.specialty,
        qualification: newDoctor.qualification,
        room: newDoctor.room,
        shift: newDoctor.shift,
        status: 'Active',
        load: '0 Patients',
        role: 'doctor',
        source: 'firebase',
      };

      setDoctors([docObj, ...doctors]);
      setSuccessBanner({ name: newDoctor.name, email: doctorEmail });
      setModalOpen(false);
      setNewDoctor({
        name: '',
        email: '',
        phone: '',
        password: 'Demo@12346',
        pin: '7788',
        specialty: 'General Medicine',
        qualification: 'MBBS, MD',
        room: 'OPD-14',
        shift: '08:30 - 14:00',
      });
      setTimeout(() => setSuccessBanner(null), 8000);
    } catch (err: any) {
      console.error('Failed to register doctor in Firebase:', err);
      alert(`Firebase Doctor Registration Error: ${err.message || 'Could not save to database'}`);
    } finally {
      setSaving(false);
    }
  };

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.room.toLowerCase().includes(search.toLowerCase()) ||
      (d.email && d.email.toLowerCase().includes(search.toLowerCase()))
  );

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Doctor Name',
      render: (row) => (
        <div>
          <div className="font-bold text-light-primary flex items-center gap-1.5 flex-wrap">
            <span>{row.name}</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
              role="doctor"
            </span>
            {row.source === 'firebase' && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Firebase
              </span>
            )}
          </div>
          <div className="text-[11px] text-light-on-surface-variant flex items-center gap-1.5 mt-0.5">
            <span className="font-medium text-slate-600">{row.qualification}</span>
            {row.email && (
              <span className="text-slate-400 font-mono text-[10px]">
                &bull; {row.email}
              </span>
            )}
          </div>
        </div>
      ),
    },
    { key: 'specialty', header: 'Specialty / Department' },
    { key: 'room', header: 'Assigned OPD Room' },
    { key: 'shift', header: 'Shift Timing' },
    {
      key: 'load',
      header: 'Patient Load',
      render: (row) => <span className="font-code font-bold text-secondary">{row.load || '0 Patients'}</span>,
    },
    {
      key: 'status',
      header: 'Duty Status',
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            row.status === 'Active' ? 'bg-success/15 text-success' : 'bg-warning/15 text-on-warning'
          }`}
        >
          {row.status || 'Active'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <button
          onClick={() => {
            const updated = doctors.map((d) =>
              d.id === row.id
                ? { ...d, status: d.status === 'Active' ? 'On Break' : 'Active' }
                : d
            );
            setDoctors(updated);
          }}
          className="px-2.5 py-1 text-xs font-semibold rounded border border-light-outline bg-white hover:bg-light-surface-variant"
        >
          Toggle Shift
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Clinical Roster Control &bull; Firebase Connected
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Doctor Directory &amp; Room Assignment
          </h1>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          <span>Add New Doctor</span>
        </button>
      </div>

      {successBanner && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between gap-3 animate-fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-teal-600 text-lg">check_circle</span>
            <div>
              <p className="font-bold">
                Doctor <span className="underline">{successBanner.name}</span> added to Firebase Database!
              </p>
              <p className="text-[11px] text-teal-700">
                Created in Firestore <code className="bg-teal-100 px-1 rounded">users/{successBanner.email}</code> with <code className="bg-teal-100 px-1 rounded">role="doctor"</code>. They can now log in using their email.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSuccessBanner(null)} 
            className="text-teal-600 hover:text-teal-800 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="glass-card p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search doctor name, department or room..." />
      </div>

      <BentoCard variant="solid" padding="none" className="overflow-hidden">
        <DataTable columns={columns} data={filtered} />
      </BentoCard>

      <Modal isOpen={modalOpen} onClose={() => !saving && setModalOpen(false)} title="Register &amp; Assign Doctor (Firebase)">
        <form onSubmit={handleAddDoctor} className="space-y-4 text-xs">
          <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0F766E] text-base mt-0.5">verified_user</span>
            <div>
              <span className="font-bold text-[#0F766E] block">Firebase Cloud Firestore Sync</span>
              <p className="text-[11px] text-slate-600">
                This doctor will be saved in Firebase Firestore <code className="font-bold text-teal-800">users</code> collection with <code className="font-bold text-teal-800 font-mono">role="doctor"</code> and will immediately be able to sign in.
              </p>
            </div>
          </div>

          <div>
            <label className="font-bold text-light-primary block mb-1">
              Doctor Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newDoctor.name}
              onChange={(e) => {
                const name = e.target.value;
                const clean = name.toLowerCase().replace(/[^a-z0-9]/g, '');
                setNewDoctor({ 
                  ...newDoctor, 
                  name,
                  email: newDoctor.email || (clean ? `${clean}@careflow.gov.in` : '')
                });
              }}
              placeholder="Dr. Aman Deep, MD"
              className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">
                Doctor Email (Used for Login) <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                placeholder="dr.amandeep@careflow.gov.in"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none font-mono text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">Contact Phone</label>
              <input
                type="tel"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">Password</label>
              <input
                type="text"
                required
                value={newDoctor.password}
                onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                placeholder="Demo@12346"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none font-mono text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">
                Doctor Security PIN (4-Digits) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={newDoctor.pin}
                onChange={(e) => setNewDoctor({ ...newDoctor, pin: e.target.value })}
                placeholder="7788"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none font-mono text-xs tracking-widest"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">Specialty / Department</label>
              <input
                type="text"
                required
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                placeholder="General Medicine / Pediatrics"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">Qualification</label>
              <input
                type="text"
                required
                value={newDoctor.qualification}
                onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
                placeholder="MBBS, MD (Med)"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">Assigned OPD Room</label>
              <input
                type="text"
                required
                value={newDoctor.room}
                onChange={(e) => setNewDoctor({ ...newDoctor, room: e.target.value })}
                placeholder="OPD-14"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">Shift Hours</label>
              <input
                type="text"
                required
                value={newDoctor.shift}
                onChange={(e) => setNewDoctor({ ...newDoctor, shift: e.target.value })}
                placeholder="08:30 - 14:00"
                className="w-full p-2.5 rounded-lg border border-light-outline focus:ring-1 focus:ring-teal-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-light-outline">
            <button
              type="button"
              disabled={saving}
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold rounded-lg flex items-center gap-2 shadow-xs disabled:opacity-60 transition-all"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Adding to Firebase...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  <span>Save Doctor (role="doctor")</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    adminService.getStaffList().then(setStaff);
  }, []);

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
          Operations Personnel
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Counter &amp; Triage Staff Management
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {staff.map((s) => (
          <BentoCard key={s.id} variant="solid" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#0F766E] font-mono">{s.id}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-[#16A34A] border border-green-200">
                {s.status}
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
              <div className="text-xs text-slate-500 font-medium">{s.role}</div>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Desk:</span>
                <strong className="text-slate-800">{s.desk}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duty Shift:</span>
                <strong className="text-slate-800 font-mono">{s.shift}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tokens Issued Today:</span>
                <strong className="text-[#0F766E] font-mono font-bold">{s.tokensIssued}</strong>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  );
};
