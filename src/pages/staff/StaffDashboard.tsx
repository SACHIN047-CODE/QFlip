import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { PatientToken, PriorityLevel } from '../../types';

export const StaffDashboard: React.FC = () => {
  const { tokens, generateToken } = useQueue();

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: 30,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    abhaId: '',
    department: 'General Medicine',
    priority: 'Normal' as PriorityLevel,
    symptoms: [] as string[],
    symptomSummary: '',
  });

  const [lastIssuedToken, setLastIssuedToken] = useState<PatientToken | null>(() => tokens[tokens.length - 1] || null);

  const departments = [
    'General Medicine',
    'Orthopedics',
    'Pediatrics',
    'Cardiology',
    'Obstetrics & Gynecology',
    'ENT & Head Neck',
    'Emergency Trauma Care',
  ];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = tokens.find(
      (t) =>
        t.phone.includes(searchQuery) ||
        t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.abhaId?.includes(searchQuery)
    );
    if (match) {
      setFormData({
        patientName: match.patientName,
        phone: match.phone,
        age: match.age,
        gender: match.gender,
        abhaId: match.abhaId || '91-8274-1049-3321',
        department: match.department,
        priority: match.priority,
        symptoms: match.symptoms,
        symptomSummary: match.symptoms.join(', '),
      });
    } else {
      alert(`No record found for "${searchQuery}". Ready for new walk-in registration.`);
    }
  };

  const handleIssueToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newToken = await generateToken({
        patientName: formData.patientName,
        phone: formData.phone,
        age: Number(formData.age),
        gender: formData.gender,
        abhaId: formData.abhaId,
        department: formData.department,
        priority: isEmergency ? 'Emergency' : formData.priority,
        symptoms: formData.symptoms,
      });
      setLastIssuedToken(newToken);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const recentTokens = tokens.slice(-6).reverse();

  return (
    <div className="space-y-6">
      {/* Top Counter Header Ribbon (Matching Stitch Counter Staff Desk) */}
      <div className="bg-light-surface rounded-2xl border border-light-outline px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="font-headline text-title-md font-bold text-light-primary">
            Registration Counter #02 • OPD Main Hall
          </span>
          <span className="px-2.5 py-0.5 rounded bg-success/15 text-success font-code text-xs font-bold">
            Counter Open
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-2 bg-light-surface-variant px-3 py-1.5 rounded-lg border border-light-outline">
            <span className="material-symbols-outlined text-sm text-secondary">timer</span>
            <span>
              Avg Token Issue Time: <strong className="font-code text-light-primary">14.2 sec</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 pl-3 border-l border-light-outline">
            <span className="font-semibold text-light-primary">Staff: Anita Devi</span>
            <span className="font-code text-light-on-surface-variant">(ID: REG-8812)</span>
          </div>
        </div>
      </div>

      {/* Main Split Counter Screen: Left Rapid Form (7 cols), Right Live Issue Slip & Recent Queue (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Rapid Patient Registration & Triage Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* ABHA & Quick Search Bar */}
          <div className="bg-light-surface rounded-2xl border-2 border-secondary/30 p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <label className="font-headline text-label-lg font-bold text-light-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">search</span>
                Search Existing Patient or Scan ABHA / Aadhaar QR
              </label>
              <span className="text-xs text-secondary font-semibold cursor-pointer flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">qr_code_scanner</span> USB Scanner Ready
              </span>
            </div>

            <form onSubmit={handleQuickSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ABHA Address (e.g. 91-8274-1049), Mobile (10 Digits) or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow text-xs rounded-lg border border-light-outline p-3 bg-light-surface-variant font-code focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-light-primary text-white font-headline text-xs font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-sm">person_search</span>
                Find
              </button>
            </form>
          </div>

          {/* Rapid Registration Form */}
          <form
            onSubmit={handleIssueToken}
            className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-light-outline">
              <h3 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">app_registration</span>
                Patient Demographics &amp; Triage Desk
              </h3>

              {/* Emergency Marking Toggle */}
              <label className="inline-flex items-center gap-2 cursor-pointer bg-danger/10 px-3 py-1 rounded-lg border border-danger/30">
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="rounded text-danger focus:ring-danger w-4 h-4"
                />
                <span className="font-bold text-danger text-xs uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">emergency</span>
                  Mark as Emergency
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-light-primary block mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-code focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-light-primary block mb-1">Age</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-code focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Priority</label>
                <select
                  value={isEmergency ? 'Emergency' : formData.priority}
                  disabled={isEmergency}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                >
                  <option value="Normal">Standard OPD</option>
                  <option value="Senior">Senior (60+)</option>
                  <option value="Pediatric">Pediatric</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-light-primary block mb-1">Assigned OPD Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-headline font-bold focus:bg-white"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Registration Verification Button */}
            <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-xl border border-secondary/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">mic</span>
                <span className="text-light-primary font-medium">
                  Voice Registration Verification (Hindi / Punjabi / English)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVoiceOpen(true)}
                className="px-3 py-1.5 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 text-xs shadow-sm"
              >
                Launch Voice Triage
              </button>
            </div>

            <div>
              <label className="font-bold text-light-primary block mb-1">Reported Symptoms &amp; Notes</label>
              <input
                type="text"
                value={formData.symptomSummary}
                onChange={(e) => setFormData({ ...formData, symptomSummary: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent hover:brightness-95 text-on-accent font-headline font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>{loading ? 'Issuing Token...' : 'Issue & Print Digital OPD Token Slip'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Live Issue Slip & Recent Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Last Generated OPD Slip Preview */}
          {lastIssuedToken && (
            <div className="bg-light-surface rounded-2xl border-2 border-accent/80 p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-light-outline">
                <span className="text-xs font-bold uppercase tracking-wider text-on-accent bg-accent px-2 py-0.5 rounded">
                  Last Generated OPD Slip
                </span>
                <span className="font-code text-xs text-light-on-surface-variant">
                  {lastIssuedToken.registeredAt}
                </span>
              </div>

              <div className="text-center py-2">
                <span className="text-xs text-light-on-surface-variant font-bold uppercase block">Token Number</span>
                <span className="font-headline text-5xl font-black text-secondary font-code">
                  {lastIssuedToken.tokenNumber}
                </span>
                <div className="font-headline text-sm font-bold text-light-primary mt-1">
                  {lastIssuedToken.patientName}
                </div>
                <div className="text-xs text-light-on-surface-variant mt-0.5">
                  {lastIssuedToken.department} • {lastIssuedToken.roomNumber || 'Room 12'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-2.5 bg-light-surface-variant rounded-xl border border-light-outline">
                  <span className="text-[10px] text-light-on-surface-variant uppercase block">Est. Wait Time</span>
                  <span className="font-headline font-bold text-light-primary">
                    {lastIssuedToken.estimatedWaitMinutes} mins
                  </span>
                </div>
                <div className="p-2.5 bg-light-surface-variant rounded-xl border border-light-outline">
                  <span className="text-[10px] text-light-on-surface-variant uppercase block">Counter Number</span>
                  <span className="font-headline font-bold text-light-primary">Counter #02</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 bg-light-primary text-white font-bold text-xs rounded-xl hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print Physical Thermal Receipt</span>
              </button>
            </div>
          )}

          {/* Recent Tokens Issued Stream */}
          <div className="bg-light-surface rounded-2xl border border-light-outline p-5 shadow-card space-y-4">
            <h4 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">history</span>
              Recently Issued Tokens at Counter #02
            </h4>

            <div className="divide-y divide-light-outline-variant text-xs">
              {recentTokens.map((t) => (
                <div key={t.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-headline font-code font-bold text-secondary text-sm">
                      {t.tokenNumber}
                    </span>
                    <div>
                      <div className="font-bold text-light-primary">{t.patientName}</div>
                      <div className="text-[10px] text-light-on-surface-variant">{t.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-code text-xs text-light-primary font-bold">{t.registeredAt}</span>
                    <span className="block text-[10px] text-success">Printed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <VoiceInputModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onComplete={(transcript, dept, symptoms) => {
          setFormData((prev) => ({
            ...prev,
            symptomSummary: transcript,
            department: dept,
            symptoms: Array.from(new Set([...prev.symptoms, ...symptoms])),
          }));
        }}
      />
    </div>
  );
};
