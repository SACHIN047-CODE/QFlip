import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { useAuth } from '../../context/AuthContext';
import { doctorService } from '../../services/doctorService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { PrescriptionMedicine } from '../../types';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { tokens, currentServingToken, callNext, skip, updateStatus } = useQueue();

  const [activeTab, setActiveTab] = useState<'consultation' | 'vitals' | 'history'>('consultation');
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [dutyStatus, setDutyStatus] = useState<'IN_SESSION' | 'ON_BREAK' | 'UNAVAILABLE'>('IN_SESSION');

  // Consultation form state
  const [chiefComplaints, setChiefComplaints] = useState('Chest Congestion, Mild Fever for 3 days, Dry Cough');
  const [clinicalFindings, setClinicalFindings] = useState('Bilateral mild rhonchi present in chest, Temp 99.4 F, BP 134/86.');
  const [diagnosis, setDiagnosis] = useState('Acute Bronchitis (J20.9)');
  const [advice, setAdvice] = useState('Drink warm water, avoid dust exposure, complete full antibiotic course.');
  const [prescriptions, setPrescriptions] = useState<PrescriptionMedicine[]>([
    {
      id: 'rx-1',
      name: 'Amoxicillin + Clavulanate',
      dosage: '625 mg',
      quantity: 10,
      consumptionTiming: 'After breakfast',
      frequency: 'Twice daily',
      duration: '5 days',
      instructions: 'Take after meals with plenty of water',
    },
    {
      id: 'rx-2',
      name: 'Paracetamol',
      dosage: '650 mg',
      quantity: 6,
      consumptionTiming: 'After dinner',
      frequency: 'Once daily',
      duration: '3 days',
      instructions: 'SOS if fever > 100°F',
    },
    {
      id: 'rx-3',
      name: 'Pantoprazole',
      dosage: '40 mg',
      quantity: 5,
      consumptionTiming: 'Before breakfast',
      frequency: 'Once daily',
      duration: '5 days',
      instructions: '30 mins before morning breakfast',
    },
  ]);
  const [labTests, setLabTests] = useState<string[]>(['Complete Blood Count (CBC) with Platelets']);

  // Generic Medicine Form State (Replaces old Add Rx template workflow)
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('500 mg');
  const [medQuantity, setMedQuantity] = useState<number | ''>(10);
  const [medTiming, setMedTiming] = useState('After breakfast');
  const [medFrequency, setMedFrequency] = useState('Twice daily');
  const [medDuration, setMedDuration] = useState('5 days');
  const [medInstructions, setMedInstructions] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const timingOptions = [
    'Before breakfast',
    'After breakfast',
    'Before lunch',
    'After lunch',
    'Before dinner',
    'After dinner',
    'At bedtime',
    'As required',
  ];

  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Thrice daily',
    'Four times daily',
    'SOS / As needed',
  ];

  const waitingTokens = tokens.filter((t) => t.status === 'WAITING');
  const completedTokens = tokens.filter((t) => t.status === 'COMPLETED');

  const handleCallNext = async () => {
    await callNext(user?.department || 'All');
  };

  const handleCompleteConsultation = async () => {
    if (!currentServingToken) return;
    await doctorService.saveConsultation({
      tokenId: currentServingToken.id,
      patientId: currentServingToken.patientId,
      patientName: currentServingToken.patientName,
      chiefComplaints,
      clinicalFindings,
      diagnosis,
      prescriptions,
      labTestsOrdered: labTests,
      advice,
    });
    await updateStatus(currentServingToken.id, 'COMPLETED');
    // Auto call next
    await callNext(user?.department || 'All');
  };

  const handleSkip = async () => {
    if (!currentServingToken) return;
    await skip(currentServingToken.id, 'Patient skipped during consultation call');
  };

  const handleAddOrUpdateMedicine = () => {
    if (!medName.trim()) return;

    const item: PrescriptionMedicine = {
      id: editingIndex !== null ? prescriptions[editingIndex].id : `rx-${Date.now()}`,
      name: medName.trim(),
      dosage: medDosage.trim() || '500 mg',
      quantity: medQuantity ? Number(medQuantity) : undefined,
      consumptionTiming: medTiming,
      frequency: medFrequency,
      duration: medDuration.trim() || '5 days',
      instructions: medInstructions.trim() || undefined,
    };

    if (editingIndex !== null) {
      setPrescriptions((prev) => prev.map((rx, idx) => (idx === editingIndex ? item : rx)));
      setEditingIndex(null);
    } else {
      setPrescriptions((prev) => [...prev, item]);
    }

    // Reset form fields
    setMedName('');
    setMedDosage('500 mg');
    setMedQuantity(10);
    setMedTiming('After breakfast');
    setMedFrequency('Twice daily');
    setMedDuration('5 days');
    setMedInstructions('');
  };

  const handleEditMedicine = (idx: number) => {
    const rx = prescriptions[idx];
    setMedName(rx.name);
    setMedDosage(rx.dosage);
    setMedQuantity(rx.quantity ?? 10);
    setMedTiming(rx.consumptionTiming || 'After breakfast');
    setMedFrequency(rx.frequency || 'Twice daily');
    setMedDuration(rx.duration || '5 days');
    setMedInstructions(rx.instructions || '');
    setEditingIndex(idx);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setMedName('');
    setMedDosage('500 mg');
    setMedQuantity(10);
    setMedTiming('After breakfast');
    setMedFrequency('Twice daily');
    setMedDuration('5 days');
    setMedInstructions('');
  };

  const toggleLabTest = (test: string) => {
    setLabTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
  };

  return (
    <div className="space-y-6">
      {/* Live OPD Consultation Desk Status Header */}
      <div className="bg-light-surface border border-light-outline rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-xl">stethoscope</span>
          </div>
          <div>
            <div className="font-headline text-sm font-bold text-light-primary">
              Live Clinical OPD Consultation Desk • {user?.name || 'Dr. Rahul Verma'} ({user?.roomNumber || 'Room 101'})
            </div>
            <div className="text-[11px] text-light-on-surface-variant">
              Department: <strong>{user?.department || 'General Medicine'}</strong> &bull; {waitingTokens.length} patients currently waiting in queue &bull; Priority triage sorting active
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/15 text-success text-xs font-bold font-code">
            <span className="w-2 h-2 rounded-full bg-success animate-ping"></span> Live Desk Active
          </span>
        </div>
      </div>

      {/* Top OPD Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
              Total Today
            </span>
            <span className="material-symbols-outlined text-secondary text-lg">groups</span>
          </div>
          <div className="font-headline text-2xl font-black text-light-primary font-code mt-1">
            {tokens.length}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">
            Assigned to {user?.roomNumber || 'OPD-12'}
          </div>
        </div>

        <div className="bg-accent/15 p-4 rounded-xl border-2 border-accent shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-accent uppercase">
              Waiting in Queue
            </span>
            <span className="material-symbols-outlined text-on-accent text-lg">format_list_numbered</span>
          </div>
          <div className="font-headline text-2xl font-black text-on-accent font-code mt-1">
            {waitingTokens.length}
          </div>
          <div className="text-[11px] text-on-accent font-medium mt-1">
            Avg wait: 18 mins
          </div>
        </div>

        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
              Consulted Today
            </span>
            <span className="material-symbols-outlined text-success text-lg">task_alt</span>
          </div>
          <div className="font-headline text-2xl font-black text-success font-code mt-1">
            {completedTokens.length}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">
            Rate: 6.5 mins / patient
          </div>
        </div>

        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
              Doctor Duty Status
            </span>
            <span className="w-2 h-2 rounded-full bg-success"></span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <button
              onClick={() => setDutyStatus('IN_SESSION')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                dutyStatus === 'IN_SESSION' ? 'bg-success text-white' : 'bg-light-surface-variant text-light-on-surface-variant'
              }`}
            >
              In Session
            </button>
            <button
              onClick={() => setDutyStatus('ON_BREAK')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                dutyStatus === 'ON_BREAK' ? 'bg-warning text-white' : 'bg-light-surface-variant text-light-on-surface-variant'
              }`}
            >
              Break
            </button>
            <button
              onClick={() => setDutyStatus('UNAVAILABLE')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                dutyStatus === 'UNAVAILABLE' ? 'bg-danger text-white' : 'bg-light-surface-variant text-light-on-surface-variant'
              }`}
            >
              Unavailable
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Interface (Stitch Doctor Consultation Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Current Active Patient & Queue Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Patient Card */}
          <div className="bg-light-surface rounded-2xl border-2 border-secondary/40 shadow-lg p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Current Patient In Room
              </span>
              {currentServingToken && (
                <StatusBadge status="IN_CONSULTATION" priority={currentServingToken.priority} />
              )}
            </div>

            {currentServingToken ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-headline text-4xl font-black text-secondary font-code">
                      {currentServingToken.tokenNumber}
                    </span>
                    <h3 className="font-headline text-lg font-bold text-light-primary mt-1">
                      {currentServingToken.patientName}
                    </h3>
                    <div className="text-xs text-light-on-surface-variant font-code">
                      ID: {currentServingToken.patientId} • {currentServingToken.gender}, {currentServingToken.age} yrs
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-light-on-surface-variant block uppercase font-bold">
                      Registration
                    </span>
                    <span className="font-code font-bold text-light-primary text-xs">
                      {currentServingToken.registeredAt}
                    </span>
                    <span className="block text-[11px] text-secondary font-semibold mt-1">
                      ABHA: {currentServingToken.abhaId || 'Linked'}
                    </span>
                  </div>
                </div>

                {/* Vitals Ribbon */}
                <div className="grid grid-cols-4 gap-2 bg-light-surface-variant p-3 rounded-xl border border-light-outline text-center text-xs">
                  <div>
                    <span className="text-[10px] text-light-on-surface-variant uppercase block">BP</span>
                    <span className="font-code font-bold text-light-primary">
                      {currentServingToken.vitals?.bp || '134/86'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-light-on-surface-variant uppercase block">Pulse</span>
                    <span className="font-code font-bold text-light-primary">
                      {currentServingToken.vitals?.pulse || 78} bpm
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-light-on-surface-variant uppercase block">SpO2</span>
                    <span className="font-code font-bold text-success">
                      {currentServingToken.vitals?.spo2 || 98}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-light-on-surface-variant uppercase block">Temp</span>
                    <span className="font-code font-bold text-light-primary">
                      {currentServingToken.vitals?.temp || 99.4} °F
                    </span>
                  </div>
                </div>

                {/* Reported Symptoms */}
                <div>
                  <span className="text-xs font-bold text-light-primary block mb-1.5">
                    Chief Symptoms Reported at Registration:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentServingToken.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-secondary/10 text-secondary text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Big Queue Control Buttons */}
                <div className="space-y-2 pt-3 border-t border-light-outline">
                  <button
                    onClick={() => setCompleteDialogOpen(true)}
                    className="w-full py-3 bg-accent hover:brightness-95 text-on-accent font-headline font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Complete Consultation &amp; Sign Rx</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCallNext}
                      className="py-2.5 bg-secondary hover:bg-secondary/90 text-white font-headline font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">skip_next</span>
                      <span>Call Next Token</span>
                    </button>

                    <button
                      onClick={() => setSkipDialogOpen(true)}
                      className="py-2.5 bg-light-surface-variant hover:bg-light-outline text-light-primary font-headline font-bold text-xs rounded-xl border border-light-outline transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">fast_forward</span>
                      <span>Skip Patient</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <span className="material-symbols-outlined text-4xl text-light-outline">person_outline</span>
                <p className="text-xs text-light-on-surface-variant">No patient currently in room.</p>
                <button
                  onClick={handleCallNext}
                  className="px-6 py-2.5 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary/90"
                >
                  Call Next Waiting Patient
                </button>
              </div>
            )}
          </div>

          {/* Waiting Queue Stream */}
          <div className="bg-light-surface rounded-2xl border border-light-outline p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <h4 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">format_list_numbered</span>
                Next in Waiting Queue
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-accent text-on-accent text-xs font-bold font-code">
                {waitingTokens.length}
              </span>
            </div>

            <div className="divide-y divide-light-outline-variant max-h-72 overflow-y-auto text-xs">
              {waitingTokens.map((t) => (
                <div key={t.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-headline font-code font-bold text-light-primary text-sm">
                      {t.tokenNumber}
                    </span>
                    <div>
                      <div className="font-bold text-light-primary">{t.patientName}</div>
                      <div className="text-[10px] text-light-on-surface-variant">{t.symptoms[0]}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {t.priority === 'Emergency' && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-danger/15 text-danger animate-pulse">
                        EMERGENCY
                      </span>
                    )}
                    <button
                      onClick={() => updateStatus(t.id, 'IN_CONSULTATION')}
                      className="px-2.5 py-1 bg-light-surface-variant hover:bg-secondary hover:text-white rounded text-[11px] font-bold border border-light-outline"
                    >
                      Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Consultation Form, Digital Prescriptions & Lab Investigations (7 cols) */}
        <div className="lg:col-span-7 bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-6">
          {/* Header Tabs */}
          <div className="flex items-center justify-between pb-4 border-b border-light-outline">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('consultation')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'consultation'
                    ? 'bg-light-primary text-white'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant'
                }`}
              >
                Clinical Notes &amp; Rx
              </button>
              <button
                onClick={() => setActiveTab('vitals')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'vitals'
                    ? 'bg-light-primary text-white'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant'
                }`}
              >
                Lab Investigations
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'history'
                    ? 'bg-light-primary text-white'
                    : 'text-light-on-surface-variant hover:bg-light-surface-variant'
                }`}
              >
                Past EHR History
              </button>
            </div>
            <span className="text-[11px] text-light-on-surface-variant">Auto-saved to ABDM</span>
          </div>

          {activeTab === 'consultation' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-light-primary block mb-1">Chief Complaints</label>
                <input
                  type="text"
                  value={chiefComplaints}
                  onChange={(e) => setChiefComplaints(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Clinical Findings &amp; Examination</label>
                <textarea
                  rows={2}
                  value={clinicalFindings}
                  onChange={(e) => setClinicalFindings(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Diagnosis (ICD-10)</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-bold focus:bg-white text-secondary"
                />
              </div>

              {/* Digital Prescriptions Section (Generic Medicine Direct Entry) */}
              <div className="p-5 bg-light-surface-variant/40 rounded-2xl border border-light-outline space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-headline text-xs font-bold text-light-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-sm">prescriptions</span>
                    Prescription Medicines (Generic Entry • Synced to Pharmacy)
                  </label>
                  <span className="text-[10px] text-light-on-surface-variant font-medium">Jan Aushadhi Formulary</span>
                </div>

                {/* List of Medicines Added to this Prescription */}
                {prescriptions.length === 0 ? (
                  <div className="p-4 bg-white rounded-xl border border-dashed border-light-outline text-center text-xs text-light-on-surface-variant">
                    No medicines added yet. Use the form below to enter generic medicines directly.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {prescriptions.map((rx, idx) => (
                      <div
                        key={rx.id}
                        className={`p-3 bg-white rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          editingIndex === idx
                            ? 'border-secondary ring-2 ring-secondary/20 shadow-sm'
                            : 'border-light-outline hover:border-light-primary/30'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-light-primary text-xs">{rx.name}</span>
                            <span className="px-2 py-0.5 rounded bg-light-surface-variant text-[11px] font-semibold text-light-primary border border-light-outline">
                              {rx.dosage}
                            </span>
                            {rx.quantity && (
                              <span className="text-[11px] text-light-on-surface-variant">
                                (Qty: {rx.quantity})
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-light-on-surface-variant">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-semibold">
                              <span className="material-symbols-outlined text-xs">schedule</span>
                              {rx.consumptionTiming}
                            </span>
                            <span>• {rx.frequency}</span>
                            <span>• {rx.duration}</span>
                            {rx.instructions && <span>• Note: {rx.instructions}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleEditMedicine(idx)}
                            className="px-2 py-1 rounded bg-light-surface-variant hover:bg-secondary hover:text-white text-light-primary text-xs font-semibold border border-light-outline transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-xs">edit</span>
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPrescriptions(prescriptions.filter((_, i) => i !== idx));
                              if (editingIndex === idx) handleCancelEdit();
                            }}
                            className="px-2 py-1 rounded bg-danger/10 hover:bg-danger text-danger hover:text-white text-xs font-semibold border border-danger/30 transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-xs">delete</span>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Generic Medicine Direct Entry Form */}
                <div className="p-4 bg-white rounded-xl border border-light-outline space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-light-outline">
                    <span className="text-xs font-bold text-light-primary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        {editingIndex !== null ? 'edit_note' : 'add_circle'}
                      </span>
                      {editingIndex !== null ? 'Edit Medicine Entry' : 'Add Generic Medicine Directly'}
                    </span>
                    {editingIndex !== null && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-xs text-light-on-surface-variant hover:text-light-primary underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-light-primary block mb-1">
                        Medicine Name (Generic) *
                      </label>
                      <input
                        type="text"
                        value={medName}
                        onChange={(e) => setMedName(e.target.value)}
                        placeholder="e.g. Paracetamol, Azithromycin, Metformin..."
                        className="w-full p-2 rounded-lg border border-light-outline text-xs text-light-primary focus:border-secondary focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-light-primary block mb-1">
                        Dosage / Strength *
                      </label>
                      <input
                        type="text"
                        value={medDosage}
                        onChange={(e) => setMedDosage(e.target.value)}
                        placeholder="e.g. 500 mg, 625 mg, 1 Tab"
                        className="w-full p-2 rounded-lg border border-light-outline text-xs text-light-primary focus:border-secondary focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-light-primary block mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={medQuantity}
                        onChange={(e) => setMedQuantity(e.target.value ? parseInt(e.target.value, 10) : '')}
                        placeholder="e.g. 10"
                        className="w-full p-2 rounded-lg border border-light-outline text-xs text-light-primary focus:border-secondary"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-light-primary block mb-1">
                        Consumption Timing *
                      </label>
                      <select
                        value={medTiming}
                        onChange={(e) => setMedTiming(e.target.value)}
                        className="w-full p-2 rounded-lg border border-light-outline bg-white text-xs text-light-primary focus:border-secondary"
                      >
                        {timingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-light-primary block mb-1">
                        Frequency *
                      </label>
                      <select
                        value={medFrequency}
                        onChange={(e) => setMedFrequency(e.target.value)}
                        className="w-full p-2 rounded-lg border border-light-outline bg-white text-xs text-light-primary focus:border-secondary"
                      >
                        {frequencyOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-light-primary block mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        value={medDuration}
                        onChange={(e) => setMedDuration(e.target.value)}
                        placeholder="e.g. 5 days, 1 month"
                        className="w-full p-2 rounded-lg border border-light-outline text-xs text-light-primary focus:border-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-light-primary block mb-1">
                      Additional Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={medInstructions}
                      onChange={(e) => setMedInstructions(e.target.value)}
                      placeholder="e.g. Take with warm water, avoid milk, only if fever > 100°F..."
                      className="w-full p-2 rounded-lg border border-light-outline text-xs text-light-primary focus:border-secondary"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleAddOrUpdateMedicine}
                      disabled={!medName.trim()}
                      className="px-5 py-2 bg-secondary text-white font-bold text-xs rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {editingIndex !== null ? 'check' : 'add'}
                      </span>
                      <span>{editingIndex !== null ? 'Save Changes' : 'Add Medicine to Prescription'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Doctor Advice &amp; Diet Plan</label>
                <textarea
                  rows={2}
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-light-primary">Order Diagnostic &amp; Imaging Investigations:</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Complete Blood Count (CBC) with Platelets',
                  'Serum Creatinine & Blood Urea',
                  'Liver Function Test (LFT)',
                  'Digital Chest X-Ray PA View',
                  'Lipid Profile (Fasting)',
                  'Urine Routine & Microscopic',
                  'Blood Sugar (Fasting & PP)',
                  'ECG 12 Lead',
                ].map((test) => {
                  const selected = labTests.includes(test);
                  return (
                    <button
                      key={test}
                      type="button"
                      onClick={() => toggleLabTest(test)}
                      className={`p-3 rounded-xl border text-left font-semibold transition-all flex items-center justify-between ${
                        selected
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : 'border-light-outline bg-light-surface text-light-primary hover:bg-light-surface-variant'
                      }`}
                    >
                      <span>{test}</span>
                      <span className="material-symbols-outlined text-sm">
                        {selected ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline">
                <div className="flex justify-between font-bold text-light-primary">
                  <span>Viral Upper Respiratory Infection</span>
                  <span className="font-code">15 Oct 2026</span>
                </div>
                <p className="text-[11px] text-light-on-surface-variant mt-1">
                  Treated with Azithromycin + Levocetirizine. Complete symptom resolution reported.
                </p>
              </div>
              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline">
                <div className="flex justify-between font-bold text-light-primary">
                  <span>Pre-hypertensive Follow-up</span>
                  <span className="font-code">02 Jun 2026</span>
                </div>
                <p className="text-[11px] text-light-on-surface-variant mt-1">
                  Telmisartan 20mg started. Advised low sodium diet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={completeDialogOpen}
        onClose={() => setCompleteDialogOpen(false)}
        onConfirm={handleCompleteConsultation}
        title="Complete Consultation"
        message={`Sign and finalize prescription for token ${currentServingToken?.tokenNumber || ''} (${currentServingToken?.patientName || ''})? This will sync to Jan Aushadhi Pharmacy and notify the next patient.`}
        confirmLabel="Sign & Call Next"
      />

      <ConfirmationDialog
        isOpen={skipDialogOpen}
        onClose={() => setSkipDialogOpen(false)}
        onConfirm={handleSkip}
        title="Skip Patient"
        message={`Mark token ${currentServingToken?.tokenNumber || ''} (${currentServingToken?.patientName || ''}) as skipped? The patient will be moved into the separate Skipped Patients Queue awaiting reception check-in. They must physically visit reception and scan their token to rejoin with a 3-place penalty.`}
        confirmLabel="Confirm Skip"
        isDestructive={true}
      />
    </div>
  );
};
