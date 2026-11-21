import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { TokenCard } from '../../components/common/TokenCard';
import { PatientToken, PriorityLevel } from '../../types';
import { firestoreService } from '../../services/firestoreService';

export const PatientRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { generateToken } = useQueue();

  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [createdToken, setCreatedToken] = useState<PatientToken | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: 'Manpreet Singh',
    phone: '9812401824',
    age: 38,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    abhaId: '91-8274-1049-9812',
    department: 'General Medicine',
    priority: 'Normal' as PriorityLevel,
    symptoms: ['Sore Throat', 'Persistent Dry Cough'],
    symptomSummary: 'Mild throat congestion and fever for 3 days.',
  });

  // Check if routed with voice transcript from homepage or navbar
  useEffect(() => {
    if (location.state?.voiceTranscript) {
      setFormData((prev) => ({
        ...prev,
        symptomSummary: location.state.voiceTranscript,
        department: location.state.suggestedDepartment || prev.department,
        symptoms: location.state.symptoms || prev.symptoms,
      }));
    }
  }, [location.state]);

  const departments = [
    'General Medicine',
    'Orthopedics',
    'Pediatrics',
    'Cardiology',
    'Obstetrics & Gynecology',
    'ENT & Head Neck',
    'Emergency Trauma Care',
  ];

  const commonSymptoms = [
    'Fever / Chills',
    'Persistent Dry Cough',
    'Sore Throat',
    'Chest Pain / Heaviness',
    'Severe Headache / Migraine',
    'Knee / Joint Pain',
    'Abdominal Cramps',
    'Breathlessness',
    'Skin Rashes',
  ];

  const toggleSymptom = (sym: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(sym)
        ? prev.symptoms.filter((s) => s !== sym)
        : [...prev.symptoms, sym],
    }));
  };

  const handleVoiceComplete = (transcript: string, suggestedDept: string, parsedSymptoms: string[]) => {
    setFormData((prev) => ({
      ...prev,
      symptomSummary: transcript,
      department: suggestedDept,
      symptoms: Array.from(new Set([...prev.symptoms, ...parsedSymptoms])),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = await generateToken({
        patientName: formData.patientName,
        phone: formData.phone,
        age: Number(formData.age),
        gender: formData.gender,
        abhaId: formData.abhaId,
        department: formData.department,
        priority: formData.priority,
        symptoms: formData.symptoms,
      });
      setCreatedToken(token);
      setStep('success');

      // Sync record directly into Firebase Cloud Firestore
      try {
        await firestoreService.saveQueueToken({
          tokenNumber: token.tokenNumber,
          patientName: token.patientName,
          phone: token.phone,
          department: token.department,
          status: token.status,
          priority: token.priority,
          symptoms: token.symptoms,
        });
      } catch (fErr) {
        console.warn('Optional Firestore sync note:', fErr);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'form' ? 'bg-secondary text-white' : 'bg-success text-white'
            }`}
          >
            {step === 'form' ? '1' : '✓'}
          </span>
          <span className="text-xs font-bold text-light-primary">Patient Info</span>
        </div>
        <div className="w-12 h-0.5 bg-light-outline"></div>
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'review'
                ? 'bg-secondary text-white'
                : step === 'success'
                ? 'bg-success text-white'
                : 'bg-light-surface-variant text-light-on-surface-variant'
            }`}
          >
            {step === 'success' ? '✓' : '2'}
          </span>
          <span className="text-xs font-bold text-light-primary">Review &amp; Triage</span>
        </div>
        <div className="w-12 h-0.5 bg-light-outline"></div>
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'success'
                ? 'bg-accent text-on-accent'
                : 'bg-light-surface-variant text-light-on-surface-variant'
            }`}
          >
            3
          </span>
          <span className="text-xs font-bold text-light-primary">OPD Slip</span>
        </div>
      </div>

      {/* STEP 1: FORM INPUT */}
      {step === 'form' && (
        <div className="bg-light-surface rounded-2xl border border-light-outline p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-light-outline">
            <div>
              <h2 className="font-headline text-title-lg font-bold text-light-primary">
                Online OPD Registration &amp; Token Slip
              </h2>
              <p className="text-xs text-light-on-surface-variant mt-0.5">
                Civil Hospital Ambala • Ayushman Bharat Digital Mission (ABDM)
              </p>
            </div>

            {/* Voice Input Trigger */}
            <button
              type="button"
              onClick={() => setVoiceOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>Voice Intake (बोलकर बताएं)</span>
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep('review');
            }}
            className="space-y-5 text-xs"
          >
            {/* ABHA Autofill Banner */}
            <div className="p-4 bg-light-surface-variant/70 rounded-xl border border-light-outline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">credit_card</span>
                <div>
                  <span className="font-bold text-light-primary block">ABHA / Aadhaar Auto-Fetch</span>
                  <span className="text-[11px] text-light-on-surface-variant">
                    National Health ID linked to Ayushman Bharat
                  </span>
                </div>
              </div>
              <input
                type="text"
                value={formData.abhaId}
                onChange={(e) => setFormData({ ...formData, abhaId: e.target.value })}
                placeholder="91-XXXX-XXXX-XXXX"
                className="px-3 py-1.5 bg-white rounded-lg border border-light-outline font-code text-xs text-light-primary font-bold"
              />
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-light-primary block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Mobile Phone (10 digits)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-code focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-light-primary block mb-1">Age (Years)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-code focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Priority Category</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                >
                  <option value="Normal">Standard OPD</option>
                  <option value="Senior">Senior Citizen (60+)</option>
                  <option value="Emergency">Emergency / Acute</option>
                  <option value="Pediatric">Pediatric Child</option>
                </select>
              </div>
            </div>

            {/* Department Selection */}
            <div>
              <label className="font-bold text-light-primary block mb-1">Select Clinical Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-headline font-semibold focus:bg-white"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Symptoms Tags */}
            <div>
              <label className="font-bold text-light-primary block mb-2">
                Chief Symptoms (Click to Select / Multiple)
              </label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((sym) => {
                  const selected = formData.symptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selected
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-light-surface-variant text-light-on-surface-variant border-light-outline hover:border-secondary'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Notes / Text description */}
            <div>
              <label className="font-bold text-light-primary block mb-1">
                Describe Symptoms / Voice Transcript
              </label>
              <textarea
                rows={3}
                value={formData.symptomSummary}
                onChange={(e) => setFormData({ ...formData, symptomSummary: e.target.value })}
                placeholder="Mention duration, severity, fever temperature, or any previous prescription..."
                className="w-full p-3 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-accent hover:brightness-95 text-on-accent font-headline font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Review Details &amp; Issue Token</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: REVIEW */}
      {step === 'review' && (
        <div className="bg-light-surface rounded-2xl border border-light-outline p-6 sm:p-8 shadow-card space-y-6">
          <div className="pb-4 border-b border-light-outline">
            <h2 className="font-headline text-title-lg font-bold text-light-primary">
              Verify Information Before OPD Token Generation
            </h2>
            <p className="text-xs text-light-on-surface-variant mt-0.5">
              Please ensure mobile number is correct to receive live SMS notifications
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-4 bg-light-surface-variant rounded-xl border border-light-outline">
              <div>
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Patient Name</span>
                <span className="font-bold text-sm text-light-primary">{formData.patientName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Age / Gender</span>
                <span className="font-bold text-sm text-light-primary">
                  {formData.age} yrs • {formData.gender}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Mobile Number</span>
                <span className="font-bold text-sm font-code text-light-primary">{formData.phone}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">ABHA ID</span>
                <span className="font-bold text-sm font-code text-secondary">{formData.abhaId}</span>
              </div>
            </div>

            <div className="p-4 bg-accent/15 rounded-xl border-2 border-accent">
              <span className="text-[10px] uppercase font-bold text-on-accent block mb-1">
                Clinical Department Allocated
              </span>
              <div className="font-headline text-lg font-bold text-light-primary">
                {formData.department}
              </div>
              <div className="text-xs text-light-on-surface-variant mt-1">
                Room Allocated: <strong>OPD Room 12, Block B</strong> • Head: Dr. Rajesh Sharma, MD
              </div>
            </div>

            <div>
              <span className="font-bold text-light-primary block mb-1">Recorded Symptoms:</span>
              <div className="flex flex-wrap gap-1.5">
                {formData.symptoms.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded bg-secondary/10 text-secondary text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {formData.symptomSummary && (
                <p className="mt-2 text-xs text-light-on-surface-variant italic">
                  "{formData.symptomSummary}"
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-light-outline">
            <button
              type="button"
              onClick={() => setStep('form')}
              className="px-5 py-2.5 text-xs font-semibold rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary"
            >
              Back to Edit
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="px-7 py-3 bg-accent hover:brightness-95 text-on-accent font-headline font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              {loading ? 'Issuing Token...' : 'Confirm & Generate Digital Token'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS & TOKEN SLIP */}
      {step === 'success' && createdToken && (
        <div className="space-y-6">
          <div className="p-6 bg-success/15 border-2 border-success rounded-2xl text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-success">check_circle</span>
            <h2 className="font-headline text-title-lg font-bold text-success">
              OPD Token Successfully Issued!
            </h2>
            <p className="text-xs text-light-on-surface-variant max-w-md mx-auto">
              SMS dispatch confirmation sent to <strong>{createdToken.phone}</strong>. Please proceed to the waiting hall.
            </p>
          </div>

          <TokenCard
            token={createdToken}
            currentServingTokenNumber="OPD-098"
            patientsAhead={6}
            onPrint={() => window.print()}
            onViewDetails={() => navigate('/patient/queue')}
          />
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceInputModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onComplete={handleVoiceComplete}
      />
    </div>
  );
};
