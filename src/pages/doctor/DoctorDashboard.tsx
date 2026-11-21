import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { useAuth } from '../../context/AuthContext';
import { doctorService } from '../../services/doctorService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityIndicator } from '../../components/common/PriorityIndicator';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { BentoCard } from '../../components/common/BentoCard';
import { GlassCard } from '../../components/common/GlassCard';
import { PrescriptionMedicine } from '../../types';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Stethoscope, 
  Sparkles, 
  Plus, 
  Trash2, 
  AlertCircle, 
  SkipForward, 
  PhoneCall,
  FileText,
  Activity,
  History
} from 'lucide-react';

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
    { id: 'rx-1', name: 'Amoxicillin + Clavulanate 625mg', dosage: '1 Tab', frequency: 'Twice daily', duration: '5 days', instructions: 'After Food' },
    { id: 'rx-2', name: 'Paracetamol 650mg Tab', dosage: '1 Tab', frequency: 'Thrice daily', duration: '3 days', instructions: 'After Food' },
    { id: 'rx-3', name: 'Pantoprazole 40mg Tab', dosage: '1 Tab', frequency: 'Once daily', duration: '5 days', instructions: 'Before Food' },
  ]);
  const [labTests, setLabTests] = useState<string[]>(['Complete Blood Count (CBC) with Platelets']);
  const [newRxName, setNewRxName] = useState('');

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
    await callNext('General Medicine');
  };

  const handleSkip = async () => {
    if (!currentServingToken) return;
    await skip(currentServingToken.id);
  };

  const addPrescriptionItem = () => {
    if (!newRxName.trim()) return;
    setPrescriptions((prev) => [
      ...prev,
      {
        id: `rx-${Date.now()}`,
        name: newRxName,
        dosage: '1 Tab',
        frequency: 'Twice daily',
        duration: '5 days',
        instructions: 'After Food',
      },
    ]);
    setNewRxName('');
  };

  const toggleLabTest = (test: string) => {
    setLabTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <PageHeader
        title={`Doctor Consultation Desk • ${user?.roomNumber || 'OPD-12'}`}
        subtitle={`Dr. ${user?.name || 'Practitioner'} • General Medicine`}
        badge={
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-lg text-xs">
            <span className="text-slate-500 font-medium px-2">Duty:</span>
            <button
              onClick={() => setDutyStatus('IN_SESSION')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                dutyStatus === 'IN_SESSION'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              In Session
            </button>
            <button
              onClick={() => setDutyStatus('ON_BREAK')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                dutyStatus === 'ON_BREAK'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Break
            </button>
            <button
              onClick={() => setDutyStatus('UNAVAILABLE')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                dutyStatus === 'UNAVAILABLE'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Unavailable
            </button>
          </div>
        }
        actions={
          <Button
            variant="primary"
            size="md"
            icon={<PhoneCall className="w-4 h-4" />}
            onClick={handleCallNext}
          >
            Call Next Patient
          </Button>
        }
      />

      {/* OPD Summary Metrics Ribbon (Glass Bento Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Patients</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">{tokens.length}</div>
          <div className="text-xs text-slate-500 mt-1">Assigned today</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Waiting Queue</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2 font-mono tabular-nums">{waitingTokens.length}</div>
          <div className="text-xs text-slate-500 mt-1">Avg wait ~18 mins</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Consulted Today</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2 font-mono tabular-nums">{completedTokens.length}</div>
          <div className="text-xs text-slate-500 mt-1">Avg 6.5 mins / patient</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Room</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono">{user?.roomNumber || 'OPD-12'}</div>
          <div className="text-xs text-slate-500 mt-1">ABDM Synced Desk</div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Patient & Queue Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Patient Card (Glass Container) */}
          <div className="glass-card p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E] animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  Current Patient in Room
                </span>
              </div>
              {currentServingToken && (
                <PriorityIndicator priority={currentServingToken.priority} />
              )}
            </div>

            {currentServingToken ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl font-black text-teal-700 font-mono tracking-tight">
                      {currentServingToken.tokenNumber}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {currentServingToken.patientName}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      ID: {currentServingToken.patientId} • {currentServingToken.gender}, {currentServingToken.age} yrs
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-400 font-medium block">Registered</span>
                    <span className="font-semibold text-slate-700">{currentServingToken.registeredAt}</span>
                    <span className="inline-block mt-1 text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      ABHA: {currentServingToken.abhaId || 'Linked'}
                    </span>
                  </div>
                </div>

                {/* Vitals Strip */}
                <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block uppercase">BP</span>
                    <span className="font-semibold text-slate-900 text-xs">
                      {currentServingToken.vitals?.bp || '134/86'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block uppercase">Pulse</span>
                    <span className="font-semibold text-slate-900 text-xs">
                      {currentServingToken.vitals?.pulse || 78} bpm
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block uppercase">SpO2</span>
                    <span className="font-semibold text-emerald-600 text-xs">
                      {currentServingToken.vitals?.spo2 || 98}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block uppercase">Temp</span>
                    <span className="font-semibold text-slate-900 text-xs">
                      {currentServingToken.vitals?.temp || 99.4} °F
                    </span>
                  </div>
                </div>

                {/* Reported Symptoms */}
                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Reported Symptoms:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentServingToken.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dedicated AI Clinical Assist Box (distinguished from verified records) */}
                <div className="p-3.5 bg-purple-50/70 rounded-lg border border-purple-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      AI Clinical Decision Support
                    </span>
                    <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                      Confidence 94%
                    </span>
                  </div>
                  <p className="text-xs text-purple-800 leading-relaxed">
                    Symptom constellation indicates likely <strong>Acute Bronchitis (J20.9)</strong>. Recommend confirming absence of focal crepitations. Paracetamol + Amoxicillin regimen suggested if purulent sputum persists.
                  </p>
                  <div className="text-[10px] text-purple-600 italic border-t border-purple-200/60 pt-1.5">
                    * AI-assisted clinical suggestion — verify clinically before prescribing.
                  </div>
                </div>

                {/* Queue Control Buttons */}
                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    icon={<CheckCircle2 className="w-4 h-4" />}
                    onClick={() => setCompleteDialogOpen(true)}
                  >
                    Complete Consultation &amp; Sign Rx
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="md"
                      className="justify-center"
                      icon={<PhoneCall className="w-4 h-4" />}
                      onClick={handleCallNext}
                    >
                      Call Next
                    </Button>

                    <Button
                      variant="ghost"
                      size="md"
                      className="justify-center text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200"
                      icon={<SkipForward className="w-4 h-4" />}
                      onClick={() => setSkipDialogOpen(true)}
                    >
                      Skip Patient
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-500 font-medium">No patient currently in consultation room.</p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCallNext}
                >
                  Call Next Waiting Patient
                </Button>
              </div>
            )}
          </div>

          {/* Waiting Queue Stream (Solid Bento Card for clinical legibility) */}
          <BentoCard variant="solid" padding="md" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F766E]" />
                Waiting Queue Stream
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F766E] text-xs font-bold font-mono border border-[#0F766E]/20">
                {waitingTokens.length} waiting
              </span>
            </div>

            {waitingTokens.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No patients waiting in queue.</p>
            ) : (
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto text-xs">
                {waitingTokens.map((t) => (
                  <div key={t.id} className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 px-1 rounded-lg transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {t.tokenNumber}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">{t.patientName}</div>
                        <div className="text-[11px] text-slate-500">{t.symptoms[0] || 'General Consultation'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityIndicator priority={t.priority} />
                      <button
                        onClick={() => updateStatus(t.id, 'IN_CONSULTATION')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#0F766E] hover:text-white rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                      >
                        Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </BentoCard>
        </div>

        {/* Right Column: Consultation Form, Digital Prescriptions & Lab Requisitions (7 cols) */}
        <BentoCard variant="solid" padding="md" colSpan="lg:col-span-7" className="space-y-6">
          {/* Header Tabs */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('consultation')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'consultation'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Clinical Notes &amp; Rx
              </button>
              <button
                onClick={() => setActiveTab('vitals')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'vitals'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Lab Requisitions
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                Past EHR History
              </button>
            </div>
            <span className="text-[11px] font-medium text-slate-400">ABDM Synced</span>
          </div>

          {activeTab === 'consultation' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Chief Complaints</label>
                <input
                  type="text"
                  value={chiefComplaints}
                  onChange={(e) => setChiefComplaints(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Clinical Findings &amp; Examination</label>
                <textarea
                  rows={2}
                  value={clinicalFindings}
                  onChange={(e) => setClinicalFindings(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Diagnosis (ICD-10)</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-teal-800 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-xs"
                />
              </div>

              {/* Digital Prescriptions Section */}
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-teal-700" />
                    Digital Prescriptions (Synced to Jan Aushadhi Counter #3)
                  </label>
                  <span className="text-[11px] text-teal-700 font-medium bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    Jan Aushadhi Formulary
                  </span>
                </div>

                <div className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 text-xs">
                  {prescriptions.map((rx, idx) => (
                    <div key={rx.id} className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{rx.name}</span>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {rx.dosage} • {rx.frequency} • {rx.instructions} ({rx.duration})
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrescriptions(prescriptions.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remove medicine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Medicine input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newRxName}
                    onChange={(e) => setNewRxName(e.target.value)}
                    placeholder="Add medicine (e.g. Azithromycin 500mg, Cetirizine 10mg)..."
                    className="flex-grow p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    icon={<Plus className="w-3.5 h-3.5" />}
                    onClick={addPrescriptionItem}
                  >
                    Add Rx
                  </Button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Doctor Advice &amp; Diet Plan</label>
                <textarea
                  rows={2}
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-900">Order Diagnostic &amp; Imaging Requisitions:</h4>
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
                      className={`p-3 rounded-lg border text-left font-medium transition-all flex items-center justify-between text-xs ${
                        selected
                          ? 'border-teal-700 bg-teal-50 text-teal-900 font-semibold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{test}</span>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                        selected ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'
                      }`}>
                        {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>Viral Upper Respiratory Infection</span>
                  <span className="font-mono text-slate-500">15 Oct 2026</span>
                </div>
                <p className="text-slate-600 mt-1">
                  Treated with Azithromycin + Levocetirizine. Complete symptom resolution reported.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>Pre-hypertensive Follow-up</span>
                  <span className="font-mono text-slate-500">02 Jun 2026</span>
                </div>
                <p className="text-slate-600 mt-1">
                  Telmisartan 20mg started. Advised low sodium diet.
                </p>
              </div>
            </div>
          )}
        </BentoCard>
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
        message={`Mark token ${currentServingToken?.tokenNumber || ''} as skipped? The token will be moved to the end of the priority queue.`}
        confirmLabel="Confirm Skip"
        isDestructive={true}
      />
    </div>
  );
};
