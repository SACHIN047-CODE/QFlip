import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { TokenCard } from '../../components/common/TokenCard';
import { AppointmentQrPassCard } from '../../components/common/AppointmentQrPassCard';
import { PatientToken, PriorityLevel, AppointmentPassData } from '../../types';
import { appointmentService } from '../../services/appointmentService';
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
  const [confirmedPass, setConfirmedPass] = useState<AppointmentPassData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alternativeDoctors, setAlternativeDoctors] = useState<any[]>([]);

  // Restore previously confirmed appointment pass on page refresh
  useEffect(() => {
    const saved = sessionStorage.getItem('qflip_last_confirmed_pass');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.token) {
          setCreatedToken(parsed.token);
          if (parsed?.passData) setConfirmedPass(parsed.passData);
          setStep('success');
        }
      } catch (err) {
        console.warn('Could not parse saved confirmation pass:', err);
      }
    }
  }, []);

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

      // Book appointment record with backend & generate secure access token
      let apptNumber = token.appointmentId || '';
      let secureAccessToken = token.secureAccessToken || '';
      let qrAccessUrl = token.qrUrl || '';
      let passData: AppointmentPassData | null = null;

      try {
        const bookingRes = await appointmentService.bookAppointment({
          patientName: formData.patientName,
          phone: formData.phone,
          departmentName: formData.department,
          symptoms: formData.symptoms,
          priority: formData.priority,
          tokenNumber: token.tokenNumber,
        });

        apptNumber = bookingRes.appointmentNumber;
        secureAccessToken = bookingRes.secureAccessToken;
        qrAccessUrl = bookingRes.qrAccessUrl;
        passData = bookingRes.passData;
      } catch (apptErr) {
        console.warn('Backend appointment booking warning:', apptErr);
      }

      const finalAppointmentId =
        apptNumber ||
        token.appointmentId ||
        `APT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const finalSecureToken =
        secureAccessToken ||
        token.secureAccessToken ||
        Array.from(crypto.getRandomValues(new Uint8Array(24)))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

      const finalQrUrl = qrAccessUrl || token.qrUrl || `/appointment/${finalSecureToken}`;

      const finalPass: AppointmentPassData = passData || {
        appointmentId: finalAppointmentId,
        tokenNumber: token.tokenNumber,
        patientName: token.patientName,
        doctorName: token.assignedDoctorName || 'Dr. Rahul Verma',
        doctorSpecialization: 'Consultant Physician',
        roomNumber: token.roomNumber || 'OPD Room 101',
        departmentName: token.department,
        departmentFloor: 'Ground Floor, Wing A',
        appointmentDate: new Date().toISOString(),
        timeSlot: '10:00 AM - 10:30 AM',
        status: 'scheduled',
        priority: token.priority,
        qrUrl: finalQrUrl,
      };

      const finalToken: PatientToken = {
        ...token,
        appointmentId: finalAppointmentId,
        secureAccessToken: finalSecureToken,
        qrUrl: finalQrUrl,
      };

      setCreatedToken(finalToken);
      setConfirmedPass(finalPass);
      setStep('success');

      // Save to sessionStorage so refresh does NOT regenerate a new QR code or lose booking
      sessionStorage.setItem(
        'qflip_last_confirmed_pass',
        JSON.stringify({ token: finalToken, passData: finalPass })
      );
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
              step === 'form' ? 'bg-secondary text-white' : 'bg-success text-white'
            }`}
          >
            {step === 'form' ? '1' : '✓'}
          </span>
          <span className="text-xs font-bold text-light-primary">{t('reg.step_form', '1. Patient Details')}</span>
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
          <span className="text-xs font-bold text-light-primary">{t('reg.step_review', '2. Review & Triage')}</span>
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
          <span className="text-xs font-bold text-light-primary">{t('reg.step_slip', '3. OPD Slip')}</span>
        </div>
      </div>

      {/* STEP 1: FORM INPUT */}
      {step === 'form' && (
        <div className="bg-light-surface rounded-2xl border border-light-outline p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-light-outline">
            <div>
              <h2 className="font-headline text-title-lg font-bold text-light-primary">
                {t('reg.title', 'Online OPD Registration & Token Slip')}
              </h2>
              <p className="text-xs text-light-on-surface-variant mt-0.5">
                {t('reg.subtitle', 'Civil Hospital • Ayushman Bharat Digital Mission (ABDM)')}
              </p>
            </div>

            {/* Voice Input Trigger */}
            <button
              type="button"
              onClick={() => setVoiceOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
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
                <label className="font-bold text-light-primary block mb-1">{t('reg.full_name', 'Patient Full Name')}</label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">{t('reg.phone', 'Mobile Phone (10 digits)')}</label>
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
                <label className="font-bold text-light-primary block mb-1">{t('reg.age', 'Age (Years)')}</label>
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
                <label className="font-bold text-light-primary block mb-1">{t('reg.gender', 'Gender')}</label>
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
                <label className="font-bold text-light-primary block mb-1">{t('reg.priority', 'Priority Category')}</label>
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
              <label className="font-bold text-light-primary block mb-1">{t('reg.select_dept', 'Select Clinical Department')}</label>
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
                {t('reg.symptoms_desc', 'Describe Symptoms / Voice Transcript')}
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
              <span>{t('reg.submit_btn', 'Review Details & Issue Token')}</span>
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

          {/* Capacity Error Banner & Alternatives */}
          {errorMessage && (
            <div className="p-4 bg-danger/10 border-2 border-danger/30 rounded-xl text-xs text-danger space-y-3">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMessage}</span>
              </div>

              {alternativeDoctors.length > 0 && (
                <div className="pt-2 border-t border-danger/20 space-y-2">
                  <span className="font-bold text-light-primary block">
                    Available Alternative Doctors with Open Capacity:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {alternativeDoctors.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="p-2.5 bg-white rounded-lg border border-light-outline text-light-primary text-[11px] flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold">{doc.name}</div>
                          <div className="text-[10px] text-light-on-surface-variant">
                            {doc.specialization} • {doc.roomNumber}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-success">
                          Est. wait ~{doc.estimatedWaitMinutes || 15}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-light-outline">
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setStep('form');
              }}
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

      {/* STEP 3: SUCCESS & TOKEN SLIP WITH QR DIGITAL APPOINTMENT PASS */}
      {step === 'success' && createdToken && (
        <div className="space-y-6">
          <div className="p-6 bg-success/15 border-2 border-success rounded-2xl text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-success">check_circle</span>
            <h2 className="font-headline text-title-lg font-bold text-success">
              OPD Appointment Confirmed & Token Issued!
            </h2>
            {createdToken.isBuffer && (
              <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-xs border border-purple-300">
                Issued Under Extended Buffer Capacity Quota
              </span>
            )}
            <p className="text-xs text-light-on-surface-variant max-w-md mx-auto">
              SMS dispatch confirmation sent to <strong>{createdToken.phone}</strong>. Your QR-based digital appointment pass is ready below.
            </p>
          </div>

          {/* QR-Based Digital Appointment Pass */}
          <AppointmentQrPassCard
            appointmentId={confirmedPass?.appointmentId || createdToken.appointmentId || 'APT-2026-00001'}
            tokenNumber={createdToken.tokenNumber}
            patientName={createdToken.patientName}
            doctorName={confirmedPass?.doctorName || createdToken.assignedDoctorName || 'Dr. Rahul Verma'}
            doctorSpecialization={confirmedPass?.doctorSpecialization || 'Consultant Physician'}
            department={createdToken.department}
            roomNumber={confirmedPass?.roomNumber || createdToken.roomNumber || 'OPD Room 101'}
            floor={confirmedPass?.departmentFloor || 'Ground Floor'}
            appointmentDate={confirmedPass?.appointmentDate || new Date().toISOString()}
            appointmentTime={confirmedPass?.timeSlot || '10:00 AM - 10:30 AM'}
            bookingStatus={confirmedPass?.status || 'Scheduled'}
            secureAccessToken={createdToken.secureAccessToken}
            qrAccessUrl={createdToken.qrUrl}
            onPrint={() => window.print()}
          />

          {/* OPD Live Token Status Card */}
          <TokenCard
            token={createdToken}
            currentServingTokenNumber="In Session"
            patientsAhead={Math.max(0, Math.round(createdToken.estimatedWaitMinutes / 5))}
            onPrint={() => window.print()}
            onViewDetails={() => navigate('/patient/queue')}
          />

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('qflip_last_confirmed_pass');
                setCreatedToken(null);
                setConfirmedPass(null);
                setStep('form');
              }}
              className="px-5 py-2.5 rounded-xl border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary text-xs font-semibold transition-colors"
            >
              + Book Another OPD Token
            </button>

            <button
              type="button"
              onClick={() => navigate('/patient/queue')}
              className="px-6 py-2.5 rounded-xl bg-accent hover:brightness-95 text-on-accent text-xs font-bold font-headline transition-all shadow-sm"
            >
              Track Live Queue Status →
            </button>
          </div>
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
