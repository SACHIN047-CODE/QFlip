import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataTable, Column } from '../../components/common/DataTable';
import { SearchBar } from '../../components/common/SearchBar';
import { Modal } from '../../components/common/Modal';
import { BentoCard } from '../../components/common/BentoCard';

export const DoctorsManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD',
    room: 'OPD-14',
    shift: '08:30 - 14:00',
  });

  useEffect(() => {
    adminService.getDoctorsList().then(setDoctors);
  }, []);

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctor.name.trim()) return;
    const doc = {
      id: `doc-${Date.now()}`,
      ...newDoctor,
      status: 'Active',
      load: '0 Patients',
    };
    setDoctors([doc, ...doctors]);
    setModalOpen(false);
    setNewDoctor({
      name: '',
      specialty: 'General Medicine',
      qualification: 'MBBS, MD',
      room: 'OPD-14',
      shift: '08:30 - 14:00',
    });
  };

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()) ||
      d.room.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Doctor Name',
      render: (row) => (
        <div>
          <div className="font-bold text-light-primary">{row.name}</div>
          <div className="text-[10px] text-light-on-surface-variant">{row.qualification}</div>
        </div>
      ),
    },
    { key: 'specialty', header: 'Specialty / Department' },
    { key: 'room', header: 'Assigned OPD Room' },
    { key: 'shift', header: 'Shift Timing' },
    {
      key: 'load',
      header: 'Patient Load',
      render: (row) => <span className="font-code font-bold text-secondary">{row.load}</span>,
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
          {row.status}
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
            Clinical Roster Control
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

      <div className="glass-card p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search doctor name, department or room..." />
      </div>

      <BentoCard variant="solid" padding="none" className="overflow-hidden">
        <DataTable columns={columns} data={filtered} />
      </BentoCard>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register &amp; Assign Doctor">
        <form onSubmit={handleAddDoctor} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-light-primary block mb-1">Doctor Full Name</label>
            <input
              type="text"
              required
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              placeholder="Dr. Aman Deep, MD"
              className="w-full p-2.5 rounded-lg border border-light-outline"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">Specialty</label>
              <input
                type="text"
                required
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-light-outline"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">Qualification</label>
              <input
                type="text"
                required
                value={newDoctor.qualification}
                onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-light-outline"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-light-primary block mb-1">OPD Room</label>
              <input
                type="text"
                required
                value={newDoctor.room}
                onChange={(e) => setNewDoctor({ ...newDoctor, room: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-light-outline"
              />
            </div>
            <div>
              <label className="font-bold text-light-primary block mb-1">Shift Hours</label>
              <input
                type="text"
                required
                value={newDoctor.shift}
                onChange={(e) => setNewDoctor({ ...newDoctor, shift: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-light-outline"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-light-outline">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-accent text-on-accent font-bold rounded-lg"
            >
              Save Doctor
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
