import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { TokenCard } from '../../components/common/TokenCard';
import { PatientToken, PriorityLevel } from '../../types';
import { firestoreService } from '../../services/firestoreService';

export const PatientRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { generateToken } = useQueue();
  const { t } = useLanguage();

  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [createdToken, setCreatedToken] = useState<PatientToken | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alternativeDoctors, setAlternativeDoctors] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    phone: user?.phone || '',
    age: (user as any)?.age || 35,
    gender: ((user as any)?.gender || 'Male') as 'Male' | 'Female' | 'Other',
    abhaId: user?.abhaId || '',
    department: 'General Medicine',
    priority: 'Normal' as PriorityLevel,
    symptoms: [] as string[],
    symptomSummary: '',
  });

  // Sync with logged-in user profile if it loads later
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        patientName: prev.patientName || user.name || '',
        phone: prev.phone || user.phone || '',
        abhaId: prev.abhaId || user.abhaId || '',
      }));
    }
  }, [user]);

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
    setErrorMessage(null);
    setAlternativeDoctors([]);
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
    } catch (err: any) {
      console.error(err);
      const msg = err.message || 'Failed to issue queue token.';
      setErrorMessage(msg);
      if (err.response?.data?.data?.alternativeDoctors) {
        setAlternativeDoctors(err.response.data.data.alternativeDoctors);
      }
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
              step === 'form' ? 'bg-[#0F766E] text-white shadow-xs' : 'bg-[#16A34A] text-white'
            }`}
          >
            {step === 'form' ? '1' : '✓'}
          </span>
          <span className="text-xs font-bold text-slate-900">{t('reg.step_form', '1. Patient Details')}</span>
        </div>
        <div className="w-12 h-0.5 bg-slate-200"></div>
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'review'
                ? 'bg-[#0F766E] text-white shadow-xs'
                : step === 'success'
                ? 'bg-[#16A34A] text-white'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {step === 'success' ? '✓' : '2'}
          </span>
          <span className="text-xs font-bold text-slate-900">{t('reg.step_review', '2. Review & Triage')}</span>
        </div>
        <div className="w-12 h-0.5 bg-slate-200"></div>
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'success'
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            3
          </span>
          <span className="text-xs font-bold text-slate-900">{t('reg.step_slip', '3. OPD Slip')}</span>
        </div>
      </div>

      {/* STEP 1: FORM INPUT */}
      {step === 'form' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {t('reg.title', 'Online OPD Registration & Token Slip')}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('reg.subtitle', 'Civil Hospital • Ayushman Bharat Digital Mission (ABDM)')}
              </p>
            </div>

            {/* Voice Input Trigger */}
            <button
              type="button"
              onClick={() => setVoiceOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-[#0F766E]/30 bg-[#E6F4F1] hover:bg-[#CCFBF1] text-[#0F766E] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>{t('reg.voice_btn', 'Voice Intake (बोलकर बताएं)')}</span>
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
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#0F766E]">credit_card</span>
                <div>
                  <span className="font-bold text-slate-900 block">ABHA / Aadhaar Auto-Fetch</span>
                  <span className="text-[11px] text-slate-500">
                    National Health ID linked to Ayushman Bharat
                  </span>
                </div>
              </div>
              <input
                type="text"
                value={formData.abhaId}
                onChange={(e) => setFormData({ ...formData, abhaId: e.target.value })}
                placeholder="91-XXXX-XXXX-XXXX"
                className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 font-mono text-xs text-slate-900 font-bold focus:border-[#0F766E]"
              />
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-900 block mb-1">{t('reg.full_name', 'Patient Full Name')}</label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">{t('reg.phone', 'Mobile Phone (10 digits)')}</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-mono focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-900 block mb-1">{t('reg.age', 'Age (Years)')}</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-mono focus:bg-white focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">{t('reg.gender', 'Gender')}</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-[#0F766E]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">{t('reg.priority', 'Priority Category')}</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-[#0F766E]"
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
              <label className="font-bold text-slate-900 block mb-1">{t('reg.select_dept', 'Select Clinical Department')}</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold focus:border-[#0F766E]"
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
              <label className="font-bold text-slate-900 block mb-2">
                {t('reg.symptoms_title', 'Chief Symptoms (Click to Select / Multiple)')}
              </label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((sym) => {
                  const selected = formData.symptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selected
                          ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
                          : 'bg-white/80 text-slate-700 border-slate-200 hover:border-[#0F766E] hover:bg-[#E6F4F1]/50'
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
              <label className="font-bold text-slate-900 block mb-1">
                {t('reg.symptoms_desc', 'Describe Symptoms / Voice Transcript')}
              </label>
              <textarea
                rows={3}
                value={formData.symptomSummary}
                onChange={(e) => setFormData({ ...formData, symptomSummary: e.target.value })}
                placeholder="Mention duration, severity, fever temperature, or any previous prescription..."
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]/20 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>{t('reg.submit_btn', 'Review Details & Issue Token')}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: REVIEW */}
      {step === 'review' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="font-headline text-lg font-bold text-slate-900">
              Verify Information Before OPD Token Generation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Please ensure mobile number is correct to receive live SMS notifications
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
                <span className="font-bold text-sm text-slate-900">{formData.patientName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Age / Gender</span>
                <span className="font-bold text-sm text-slate-900">
                  {formData.age} yrs • {formData.gender}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobile Number</span>
                <span className="font-bold text-sm font-mono tracking-tight text-slate-900">{formData.phone}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">ABHA ID</span>
                <span className="font-bold text-sm font-mono tracking-tight text-[#0F766E]">{formData.abhaId}</span>
              </div>
            </div>

            <div className="p-4 bg-[#E6F4F1] rounded-xl border border-[#0F766E]/30">
              <span className="text-[10px] uppercase font-bold text-[#0F766E] block mb-1">
                Clinical Department Allocated
              </span>
              <div className="font-headline text-lg font-bold text-slate-900">
                {formData.department}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Room Allocated: <strong>OPD Room 12, Block B</strong> • Head: Dr. Rajesh Sharma, MD
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Recorded Symptoms:</span>
              <div className="flex flex-wrap gap-1.5">
                {formData.symptoms.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20 text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {formData.symptomSummary && (
                <p className="mt-2 text-xs text-slate-500 italic">
                  "{formData.symptomSummary}"
                </p>
              )}
            </div>
          </div>

          {/* Capacity Error Banner & Alternatives */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-3">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-base text-red-600">error</span>
                <span>{errorMessage}</span>
              </div>

              {alternativeDoctors.length > 0 && (
                <div className="pt-2 border-t border-red-200/60 space-y-2">
                  <span className="font-bold text-slate-900 block">
                    Available Alternative Doctors with Open Capacity:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {alternativeDoctors.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-900 text-[11px] flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold">{doc.name}</div>
                          <div className="text-[10px] text-slate-500">
                            {doc.specialization} • {doc.roomNumber}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600">
                          Est. wait ~{doc.estimatedWaitMinutes || 15}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setStep('form');
              }}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
            >
              Back to Edit
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              {loading ? 'Issuing Token...' : 'Confirm & Generate Digital Token'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS & TOKEN SLIP */}
      {step === 'success' && createdToken && (
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
            <h2 className="font-headline text-lg font-bold text-emerald-800">
              OPD Token Successfully Issued!
            </h2>
            {createdToken.isBuffer && (
              <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[#7C3AED] font-bold text-xs border border-purple-200">
                Issued Under Extended Buffer Capacity Quota
              </span>
            )}
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              SMS dispatch confirmation sent to <strong className="font-mono text-slate-900">{createdToken.phone}</strong>. Please proceed to the waiting hall.
            </p>
          </div>

          <TokenCard
            token={createdToken}
            currentServingTokenNumber="In Session"
            patientsAhead={Math.max(0, Math.round(createdToken.estimatedWaitMinutes / 5))}
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
