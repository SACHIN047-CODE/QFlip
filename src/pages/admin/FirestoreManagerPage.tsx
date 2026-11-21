import React, { useState, useEffect } from 'react';
import { firestoreService } from '../../services/firestoreService';
import { DEMO_ACCOUNTS } from '../../services/authService';

interface PatientFirestoreRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup?: string;
  abhaId?: string;
  department?: string;
  status?: string;
  priority?: string;
  symptoms?: string[];
  createdAt?: any;
  updatedAt?: any;
}

export const FirestoreManagerPage: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<'patients' | 'queue_tokens'>('patients');
  const [records, setRecords] = useState<PatientFirestoreRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Form State
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 30,
    gender: 'Male',
    bloodGroup: 'B+',
    abhaId: '',
    department: 'General Medicine',
    status: 'WAITING',
    priority: 'Normal',
    symptoms: 'Mild fever, fatigue'
  });

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await firestoreService.getRecords<PatientFirestoreRecord>(activeCollection);
      setRecords(data);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(
        err.message || 'Failed to fetch records from Firestore. Please ensure Cloud Firestore is enabled in Firebase Console.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [activeCollection]);

  const handleOpenCreate = () => {
    setCurrentId(null);
    setFormData({
      name: '',
      email: '',
      phone: '+91 ',
      age: 32,
      gender: 'Male',
      bloodGroup: 'O+',
      abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      department: 'General Medicine',
      status: 'WAITING',
      priority: 'Normal',
      symptoms: 'Routine checkup'
    });
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (record: PatientFirestoreRecord) => {
    setCurrentId(record.id);
    setFormData({
      name: record.name || '',
      email: record.email || '',
      phone: record.phone || '',
      age: record.age || 30,
      gender: record.gender || 'Male',
      bloodGroup: record.bloodGroup || 'O+',
      abhaId: record.abhaId || '',
      department: record.department || 'General Medicine',
      status: record.status || 'WAITING',
      priority: record.priority || 'Normal',
      symptoms: Array.isArray(record.symptoms) ? record.symptoms.join(', ') : (record.symptoms || '')
    });
    setIsEditOpen(true);
  };

  // 1. CREATE: addDoc() & collection()
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        abhaId: formData.abhaId.trim(),
        department: formData.department,
        status: formData.status,
        priority: formData.priority,
        symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(Boolean)
      };

      const newDocId = await firestoreService.addRecord(activeCollection, payload);
      setSuccessMsg(`Document successfully stored in Firestore with ID: ${newDocId}`);
      setIsCreateOpen(false);
      await fetchRecords();
    } catch (err: any) {
      setError(err.message || 'Error inserting document into Firestore');
    } finally {
      setSubmitting(false);
    }
  };

  // 2. UPDATE: updateDoc() & doc()
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentId) return;
    setSubmitting(true);
    setError(null);
    try {
      const updates = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        abhaId: formData.abhaId.trim(),
        department: formData.department,
        status: formData.status,
        priority: formData.priority,
        symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(Boolean)
      };

      await firestoreService.updateRecord(activeCollection, currentId, updates);
      setSuccessMsg(`Document "${currentId}" successfully updated in Firestore!`);
      setIsEditOpen(false);
      await fetchRecords();
    } catch (err: any) {
      setError(err.message || 'Error updating document in Firestore');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. DELETE: deleteDoc() & doc()
  const handleDelete = async (docId: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete document for "${name}" (${docId}) from Firestore?`)) {
      return;
    }
    try {
      await firestoreService.deleteRecord(activeCollection, docId);
      setSuccessMsg(`Document "${docId}" deleted successfully.`);
      setRecords(prev => prev.filter(r => r.id !== docId));
    } catch (err: any) {
      setError(err.message || 'Error deleting document');
    }
  };

  // 4. BATCH SEED: Store Real Demo Accounts into Firestore
  const handleSeedDemoAccounts = async () => {
    setSeeding(true);
    setError(null);
    try {
      let count = 0;
      for (const account of DEMO_ACCOUNTS) {
        await firestoreService.addRecord('patients', {
          name: account.name,
          email: account.email,
          phone: account.phone || '+91 98000 00000',
          role: account.role,
          department: account.department || 'General Medicine',
          roomNumber: account.roomNumber || null,
          abhaId: account.abhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
          status: account.role === 'patient' ? 'WAITING' : 'ACTIVE',
          priority: 'Normal',
          symptoms: ['Routine Hospital Record']
        });
        count++;
      }
      setSuccessMsg(`Successfully inserted ${count} real demo accounts into Firestore "patients" collection!`);
      await fetchRecords();
    } catch (err: any) {
      setError(err.message || 'Failed to seed accounts to Firestore.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-secondary/15 via-light-surface to-light-surface-variant p-6 rounded-2xl border border-light-outline shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 bg-secondary text-white rounded-lg material-symbols-outlined text-lg">
              database
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">
              Firebase Cloud Firestore
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Connected
            </span>
          </div>
          <h1 className="text-2xl font-bold font-headline text-light-primary">
            Cloud Firestore Database Operations (CRUD)
          </h1>
          <p className="text-xs text-light-on-surface-variant mt-0.5 font-body">
            Create, retrieve, update, and delete patient records &amp; queue tokens in Google Cloud Firestore
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSeedDemoAccounts}
            disabled={seeding}
            className="px-3.5 py-2 text-xs font-bold rounded-xl border border-secondary/40 text-secondary bg-white hover:bg-secondary/10 shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">cloud_sync</span>
            {seeding ? 'Seeding to Firebase...' : 'Seed 16 Demo Accounts'}
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-secondary text-white hover:brightness-110 shadow-md transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Add Record (addDoc)
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center justify-between gap-2 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
            <span className="font-medium">{successMsg}</span>
          </div>
          <button type="button" onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-800 space-y-2 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-rose-900">
            <span className="material-symbols-outlined text-rose-600 text-base">warning</span>
            <span>Firestore Notice:</span>
          </div>
          <p className="font-mono text-[11px]">{error}</p>
          {error.includes('PERMISSION_DENIED') && (
            <div className="pt-2 border-t border-rose-200 text-[11px] text-rose-900">
              👉 <strong>Action Required in Firebase Console:</strong> Visit{' '}
              <a
                href="https://console.firebase.google.com/project/careflow-hospital-bfad0/firestore"
                target="_blank"
                rel="noreferrer"
                className="underline font-bold text-secondary"
              >
                Firebase Console &rarr; Build &rarr; Firestore Database
              </a>{' '}
              and click <strong>Create Database</strong> in Test or Production mode.
            </div>
          )}
        </div>
      )}

      {/* Collection Switcher & Stats */}
      <div className="flex items-center justify-between border-b border-light-outline pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCollection('patients')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCollection === 'patients'
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-light-surface-variant text-light-on-surface-variant hover:text-light-primary'
            }`}
          >
            <span className="material-symbols-outlined text-sm">personal_injury</span>
            Collection: "patients" ({activeCollection === 'patients' ? records.length : '...'})
          </button>
          <button
            type="button"
            onClick={() => setActiveCollection('queue_tokens')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCollection === 'queue_tokens'
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-light-surface-variant text-light-on-surface-variant hover:text-light-primary'
            }`}
          >
            <span className="material-symbols-outlined text-sm">confirmation_number</span>
            Collection: "queue_tokens" ({activeCollection === 'queue_tokens' ? records.length : '...'})
          </button>
        </div>

        <button
          type="button"
          onClick={fetchRecords}
          disabled={loading}
          className="px-3 py-1.5 text-xs text-light-on-surface-variant hover:text-light-primary border border-light-outline rounded-lg flex items-center gap-1.5 bg-white shadow-xs"
        >
          <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>refresh</span>
          Refresh (getDocs)
        </button>
      </div>

      {/* READ: Document Table */}
      <div className="bg-light-surface rounded-2xl border border-light-outline shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center space-y-3">
            <span className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin inline-block"></span>
            <p className="text-xs text-light-on-surface-variant font-medium">
              Fetching records from Firestore using getDocs()...
            </p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-light-surface-variant text-light-on-surface-variant flex items-center justify-center mx-auto material-symbols-outlined text-2xl">
              folder_open
            </div>
            <h3 className="font-bold text-sm text-light-primary">No documents found in "{activeCollection}"</h3>
            <p className="text-xs text-light-on-surface-variant max-w-sm mx-auto">
              Get started by clicking <strong>Add Record</strong> or <strong>Seed 16 Demo Accounts</strong> to insert live data into Firestore!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-light-surface-variant/70 border-b border-light-outline text-light-on-surface-variant font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Firestore Doc ID</th>
                  <th className="py-3 px-4">Patient / User</th>
                  <th className="py-3 px-4">Department &amp; Status</th>
                  <th className="py-3 px-4">Phone / ABHA</th>
                  <th className="py-3 px-4">Symptoms / Notes</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-outline">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-light-surface-variant/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-[10px] text-light-on-surface-variant">
                      <span className="bg-light-surface-variant px-1.5 py-0.5 rounded border border-light-outline select-all">
                        {r.id.slice(0, 10)}...
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-light-primary">{r.name}</div>
                      <div className="text-[11px] text-light-on-surface-variant font-mono">{r.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-light-primary">{r.department || 'General Medicine'}</div>
                      <span
                        className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                          r.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'IN_CONSULTATION'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {r.status || 'WAITING'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-light-primary font-mono">{r.phone}</div>
                      <div className="text-[10px] text-light-on-surface-variant font-mono">
                        {r.abhaId || `Age: ${r.age} • ${r.gender}`}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-light-on-surface-variant max-w-xs truncate">
                      {Array.isArray(r.symptoms) ? r.symptoms.join(', ') : (r.symptoms || 'None')}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(r)}
                        className="px-2.5 py-1 text-[11px] font-bold text-secondary bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-colors inline-flex items-center gap-1"
                        title="Edit Record (updateDoc)"
                      >
                        <span className="material-symbols-outlined text-xs">edit</span>
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id, r.name)}
                        className="px-2 py-1 text-[11px] font-bold text-danger bg-danger/10 hover:bg-danger/20 rounded-lg transition-colors inline-flex items-center gap-1"
                        title="Delete Record (deleteDoc)"
                      >
                        <span className="material-symbols-outlined text-xs">delete</span>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE MODAL (addDoc) */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-light-surface w-full max-w-lg rounded-2xl border border-light-outline p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-light-outline pb-3">
              <h3 className="font-bold text-base text-light-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">add_box</span>
                Insert New Record (Firestore addDoc)
              </h3>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-light-on-surface-variant hover:text-light-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-light-primary block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-light-primary block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-light-primary block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-light-primary block mb-1">Age</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-light-primary block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-light-primary block mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  >
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-light-primary block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  >
                    <option value="WAITING">WAITING</option>
                    <option value="IN_CONSULTATION">IN_CONSULTATION</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Symptoms (comma separated)</label>
                <input
                  type="text"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  placeholder="e.g. Chest heaviness, fever"
                  className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                />
              </div>

              <div className="pt-3 border-t border-light-outline flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 font-bold text-light-on-surface-variant hover:text-light-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 font-bold bg-secondary text-white rounded-lg hover:brightness-105 shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Inserting Document...' : 'Store in Firestore (addDoc)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL (updateDoc) */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-light-surface w-full max-w-lg rounded-2xl border border-light-outline p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-light-outline pb-3">
              <h3 className="font-bold text-base text-light-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">edit_note</span>
                Update Document (updateDoc)
              </h3>
              <button type="button" onClick={() => setIsEditOpen(false)} className="text-light-on-surface-variant hover:text-light-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div className="p-2 bg-light-surface-variant rounded-lg font-mono text-[10px] text-light-on-surface-variant">
                Document Path: <strong>{activeCollection}/{currentId}</strong>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-light-primary block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-light-primary block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-light-primary block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  >
                    <option value="WAITING">WAITING</option>
                    <option value="IN_CONSULTATION">IN_CONSULTATION</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-light-primary block mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                  >
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Symptoms / Clinical Notes</label>
                <input
                  type="text"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-3 py-2 border border-light-outline rounded-lg bg-light-surface text-light-primary"
                />
              </div>

              <div className="pt-3 border-t border-light-outline flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 font-bold text-light-on-surface-variant hover:text-light-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 font-bold bg-secondary text-white rounded-lg hover:brightness-105 shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Update Record (updateDoc)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirestoreManagerPage;
