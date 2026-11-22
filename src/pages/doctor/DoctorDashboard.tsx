import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { useAuth } from '../../context/AuthContext';
import { doctorService } from '../../services/doctorService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityIndicator } from '../../components/common/PriorityIndicator';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { BentoCard } from '../../components/common/BentoCard';
import { PrescriptionMedicine } from '../../types';
import {
  Stethoscope,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Users,
  Clock,
  ShieldCheck,
  Pill,
  FlaskConical,
  FileText,
  SkipForward,
  RotateCcw,
  UserPlus
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { tokens, currentServingToken, callNext, skip, updateStatus, addDemoPatients, resetDemoQueue } = useQueue();

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
    await callNext('General Medicine');
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
    await callNext('General Medicine');
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
      {/* Top OPD Desk Clinical Header */}
      <div className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center border border-[#0F766E]/20 shadow-xs">
            <Stethoscope className="w-5 h-5 text-[#0F766E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Clinical OPD Consultation Desk • Room 12
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                In Session
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {waitingTokens.length} patients in waiting lounge • Priority &amp; emergency triage active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addDemoPatients}
            className="px-3.5 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            title="Populate 6 realistic waiting OPD patients"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Demo Patients</span>
          </button>
          <button
            onClick={resetDemoQueue}
            className="px-3 py-2 border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            title="Reset queue to original demo list"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Top OPD Stats Ribbon (Glass Bento Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {tokens.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Assigned to {user?.roomNumber || 'Room 12'}
          </div>
        </div>

        <div className="glass-card p-4 sm:p-5 border-[#0F766E]/20 bg-[#E6F4F1]/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider">
              Waiting in Queue
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#0F766E]/15 flex items-center justify-center text-[#0F766E]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0F766E] mt-2 font-mono tabular-nums">
            {waitingTokens.length}
          </div>
          <div className="text-xs text-[#0F766E]/80 font-medium mt-1">
            Avg wait: ~18 mins
          </div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Consulted Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2 font-mono tabular-nums">
            {completedTokens.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Rate: 6.5 mins / patient
          </div>
        </div>

        <div className="glass-card p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Doctor Duty Status
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <button
              onClick={() => setDutyStatus('IN_SESSION')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all ${
                dutyStatus === 'IN_SESSION' ? 'bg-[#16A34A] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setDutyStatus('ON_BREAK')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all ${
                dutyStatus === 'ON_BREAK' ? 'bg-[#D97706] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Break
            </button>
            <button
              onClick={() => setDutyStatus('UNAVAILABLE')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all ${
                dutyStatus === 'UNAVAILABLE' ? 'bg-[#DC2626] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Away
            </button>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Bento Grid (12 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Patient In Room, AI Assist & Waiting Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Current Patient In Room (Glass Surface) */}
          <div className="glass-card border-[#0F766E]/30 p-6 space-y-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
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
                    <span className="text-4xl font-black text-[#0F766E] font-mono tracking-tight tabular-nums">
                      {currentServingToken.tokenNumber}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {currentServingToken.patientName}
                    </h3>
                    <div className="text-xs text-slate-500 font-mono">
                      ID: {currentServingToken.patientId} • {currentServingToken.gender}, {currentServingToken.age} yrs
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">
                      Registration
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      {currentServingToken.registeredAt}
                    </span>
                    <span className="block text-[11px] text-[#0F766E] font-semibold mt-1">
                      ABHA: {currentServingToken.abhaId || 'Linked'}
                    </span>
                  </div>
                </div>

                {/* Vitals Ribbon */}
                <div className="grid grid-cols-4 gap-2 bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-slate-200 text-center text-xs shadow-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">BP</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentServingToken.vitals?.bp || '134/86'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Pulse</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentServingToken.vitals?.pulse || 78} bpm
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">SpO2</span>
                    <span className="font-mono font-bold text-[#16A34A]">
                      {currentServingToken.vitals?.spo2 || 98}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Temp</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentServingToken.vitals?.temp || 99.4} °F
                    </span>
                  </div>
                </div>

                {/* Reported Symptoms */}
                <div>
                  <span className="text-xs font-bold text-slate-900 block mb-1.5">
                    Chief Symptoms Reported at Triage:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentServingToken.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#E6F4F1] text-[#0F766E] text-xs font-semibold border border-[#0F766E]/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Big Queue Control Buttons */}
                <div className="space-y-2 pt-3 border-t border-slate-200/80">
                  <button
                    onClick={() => setCompleteDialogOpen(true)}
                    className="w-full py-3 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Consultation &amp; Sign Rx</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCallNext}
                      className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      <span>Call Next Token</span>
                    </button>

                    <button
                      onClick={() => setSkipDialogOpen(true)}
                      className="py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">fast_forward</span>
                      <span>Skip Patient</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <span className="material-symbols-outlined text-4xl text-slate-300">person_outline</span>
                <p className="text-xs text-slate-500">No patient currently in room.</p>
                <button
                  onClick={handleCallNext}
                  className="px-6 py-2.5 bg-[#0F766E] text-white font-bold text-xs rounded-xl hover:bg-[#115E59] shadow-sm transition-all"
                >
                  Call Next Waiting Patient
                </button>
              </div>
            )}
          </div>

          {/* Card 2: AI Clinical Decision Assistance (Purple Glass Bento Card) */}
          <div className="bg-purple-50/70 backdrop-blur-md border border-purple-200/80 rounded-2xl p-5 space-y-3.5 shadow-[0_8px_30px_rgb(124,58,237,0.06)]">
            <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#7C3AED] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                  AI Clinical Assistant
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7C3AED] border border-purple-200">
                Assistive Only
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="bg-white/80 p-3 rounded-xl border border-purple-100 space-y-1">
                <div className="flex items-center justify-between text-slate-800 font-semibold">
                  <span>Differential Suggestion:</span>
                  <span className="text-[#7C3AED] font-bold font-mono">88% Match</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Acute Bronchitis (J20.9). Consider secondary check for bilateral rhonchi; rule out viral URI.
                </p>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-purple-100 space-y-1">
                <div className="flex items-center justify-between text-slate-800 font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Interaction Safety:
                  </span>
                  <span className="text-emerald-700 font-bold font-mono">Clean</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Zero adverse drug-drug interactions detected between prescribed items.
                </p>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-purple-100 space-y-1">
                <div className="flex items-center justify-between text-slate-800 font-semibold">
                  <span className="flex items-center gap-1.5 text-[#0F766E]">
                    <Pill className="w-3.5 h-3.5 text-[#0F766E]" />
                    Formulary Check:
                  </span>
                  <span className="text-[#0F766E] font-bold font-mono">142 Strips</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Amoxicillin + Clavulanate available in hospital Jan Aushadhi pharmacy.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic pt-1">
              * AI suggestions are non-diagnostic assistive alerts and must be verified by the consulting doctor.
            </p>
          </div>

          {/* Card 3: Waiting Queue Stream (Glass Bento Card) */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F766E]" />
                Next in Waiting Queue
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0F766E] text-white text-xs font-bold font-mono">
                {waitingTokens.length} waiting
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto text-xs">
              {waitingTokens.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No patients waiting in queue.
                </div>
              ) : (
                waitingTokens.map((t) => (
                  <div key={t.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50/60 px-1 rounded-lg transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {t.tokenNumber}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">{t.patientName}</div>
                        <div className="text-[10px] text-slate-500">{t.symptoms[0] || 'OPD Consultation'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityIndicator priority={t.priority} />
                      <button
                        onClick={() => updateStatus(t.id, 'IN_CONSULTATION')}
                        className="px-2.5 py-1 bg-white hover:bg-[#0F766E] hover:text-white rounded-lg text-xs font-bold border border-slate-200 transition-colors shadow-xs"
                      >
                        Call
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Consultation Form, Digital Prescriptions & Lab Investigations (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Header Tabs */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('consultation')}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'consultation'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Clinical Notes &amp; Rx
              </button>
              <button
                onClick={() => setActiveTab('vitals')}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'vitals'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Lab Investigations
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'history'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Past EHR History
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">ABDM M2/M3 Synced</span>
          </div>

          {activeTab === 'consultation' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Chief Complaints</label>
                <input
                  type="text"
                  value={chiefComplaints}
                  onChange={(e) => setChiefComplaints(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Clinical Findings &amp; Examination</label>
                <textarea
                  rows={2}
                  value={clinicalFindings}
                  onChange={(e) => setClinicalFindings(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Diagnosis (ICD-10)</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F766E] font-bold focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              {/* Digital Prescriptions Section (Generic Medicine Direct Entry) */}
              <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-[#0F766E]" />
                    Prescription Medicines (Generic Entry • Synced to Pharmacy)
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">Jan Aushadhi Formulary</span>
                </div>

                {/* List of Medicines Added to this Prescription */}
                {prescriptions.length === 0 ? (
                  <div className="p-4 bg-white rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
                    No medicines added yet. Use the form below to enter generic medicines directly.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {prescriptions.map((rx, idx) => (
                      <div
                        key={rx.id}
                        className={`p-3 bg-white rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          editingIndex === idx
                            ? 'border-[#0F766E] ring-2 ring-[#0F766E]/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs">{rx.name}</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-700 border border-slate-200">
                              {rx.dosage}
                            </span>
                            {rx.quantity && (
                              <span className="text-[11px] text-slate-500">
                                (Qty: {rx.quantity})
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E] font-semibold">
                              <Clock className="w-3 h-3" />
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
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#0F766E] hover:text-white text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1"
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
                            className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-semibold border border-red-200 transition-colors flex items-center gap-1"
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
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#0F766E] text-sm">
                        {editingIndex !== null ? 'edit_note' : 'add_circle'}
                      </span>
                      {editingIndex !== null ? 'Edit Medicine Entry' : 'Add Generic Medicine Directly'}
                    </span>
                    {editingIndex !== null && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-xs text-slate-500 hover:text-slate-900 underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Medicine Name (Generic) *
                      </label>
                      <input
                        type="text"
                        value={medName}
                        onChange={(e) => setMedName(e.target.value)}
                        placeholder="e.g. Paracetamol, Azithromycin, Metformin..."
                        className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Dosage / Strength *
                      </label>
                      <input
                        type="text"
                        value={medDosage}
                        onChange={(e) => setMedDosage(e.target.value)}
                        placeholder="e.g. 500 mg, 625 mg, 1 Tab"
                        className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={medQuantity}
                        onChange={(e) => setMedQuantity(e.target.value ? parseInt(e.target.value, 10) : '')}
                        placeholder="e.g. 10"
                        className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:border-[#0F766E]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Consumption Timing *
                      </label>
                      <select
                        value={medTiming}
                        onChange={(e) => setMedTiming(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:border-[#0F766E]"
                      >
                        {timingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Frequency *
                      </label>
                      <select
                        value={medFrequency}
                        onChange={(e) => setMedFrequency(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:border-[#0F766E]"
                      >
                        {frequencyOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        value={medDuration}
                        onChange={(e) => setMedDuration(e.target.value)}
                        placeholder="e.g. 5 days, 1 month"
                        className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:border-[#0F766E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Additional Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={medInstructions}
                      onChange={(e) => setMedInstructions(e.target.value)}
                      placeholder="e.g. Take with warm water, avoid milk, only if fever > 100°F..."
                      className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:border-[#0F766E]"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleAddOrUpdateMedicine}
                      disabled={!medName.trim()}
                      className="px-5 py-2 bg-[#0F766E] text-white font-bold text-xs rounded-lg hover:bg-[#115E59] transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                <label className="font-bold text-slate-900 block mb-1">Doctor Advice &amp; Diet Plan</label>
                <textarea
                  rows={2}
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-900">Order Diagnostic &amp; Imaging Investigations:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                          ? 'border-[#0F766E] bg-[#E6F4F1] text-[#0F766E]'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
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
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Viral Upper Respiratory Infection</span>
                  <span className="font-mono text-slate-500">15 Oct 2026</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Treated with Azithromycin + Levocetirizine. Complete symptom resolution reported.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Pre-hypertensive Follow-up</span>
                  <span className="font-mono text-slate-500">02 Jun 2026</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
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
