import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { VoiceInputModal } from '../../components/common/VoiceInputModal';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { BentoCard } from '../../components/common/BentoCard';
import { PriorityIndicator } from '../../components/common/PriorityIndicator';
import { PatientToken, PriorityLevel } from '../../types';
import { 
  Search, 
  Printer, 
  Mic, 
  QrCode, 
  Clock, 
  AlertTriangle, 
  History,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const { tokens, generateToken } = useQueue();

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('9812401824');
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: 'Ramesh Chander Gupta',
    phone: '9812401824',
    age: 58,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    abhaId: '91-8274-1049-3321',
    department: 'General Medicine',
    priority: 'Normal' as PriorityLevel,
    symptoms: ['Chest Congestion', 'Mild Fever for 3 days', 'Dry Cough'],
    symptomSummary: 'Chronic chest heaviness with productive cough for 4 days.',
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
      {/* Top Header */}
      <PageHeader
        title="Registration Counter #02 • OPD Main Hall"
        subtitle="Staff: Anita Devi (ID: REG-8812) • Civil Hospital OPD"
        badge={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Counter Active
            </span>
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg text-xs text-slate-600 font-medium border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Avg Speed: <strong className="text-slate-900 font-mono">14.2 sec</strong></span>
            </div>
          </div>
        }
      />

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Rapid Registration & Triage Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* ABHA & Fast Search Card (Glass Surface) */}
          <BentoCard variant="glass" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#0F766E]" />
                Search Existing Patient or Scan ABHA / Aadhaar
              </label>
              <span className="text-xs text-[#0F766E] font-medium flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" /> USB Scanner Ready
              </span>
            </div>

            <form onSubmit={handleQuickSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ABHA Address (e.g. 91-8274-1049), Mobile (10 Digits) or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow text-xs rounded-xl border border-slate-200/90 p-2.5 bg-white/80 font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E]"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<UserCheck className="w-4 h-4" />}
              >
                Find
              </Button>
            </form>
          </BentoCard>

          {/* Registration Form (Solid Surface for crisp form contrast) */}
          <BentoCard variant="solid" padding="lg">
            <form
              onSubmit={handleIssueToken}
              className="space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                Patient Demographics &amp; Triage Form
              </h3>

              {/* Emergency Marking Toggle */}
              <label className="inline-flex items-center gap-2 cursor-pointer bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-600 w-4 h-4"
                />
                <span className="font-bold text-red-700 text-xs uppercase flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Mark as Emergency
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Mobile Phone (10 digits)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Age</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Priority</label>
                <select
                  value={isEmergency ? 'Emergency' : formData.priority}
                  disabled={isEmergency}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Normal">Standard OPD</option>
                  <option value="Senior">Senior (60+)</option>
                  <option value="Pediatric">Pediatric</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Assigned OPD Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Registration Verification Button */}
            <div className="flex items-center justify-between p-3 bg-teal-50/60 rounded-lg border border-teal-200">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-teal-700" />
                <span className="text-slate-800 font-medium text-xs">
                  Multilingual Voice Triage (Hindi / Punjabi / English)
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setVoiceOpen(true)}
              >
                Launch Voice
              </Button>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Reported Symptoms &amp; Notes</label>
              <input
                type="text"
                value={formData.symptomSummary}
                onChange={(e) => setFormData({ ...formData, symptomSummary: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full justify-center"
                  icon={<Printer className="w-4 h-4" />}
                >
                  {loading ? 'Issuing Token...' : 'Issue & Print Digital OPD Token Slip'}
                </Button>
              </div>
            </form>
          </BentoCard>
        </div>

        {/* RIGHT: Live Issue Slip & Recent Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Last Generated OPD Slip Preview (Teal Glass Bento Card) */}
          {lastIssuedToken && (
            <BentoCard variant="teal" padding="lg" className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#0F766E]/20">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-white/80 px-2.5 py-0.5 rounded-lg border border-[#0F766E]/20">
                  Last Issued OPD Slip
                </span>
                <span className="font-mono text-xs text-slate-600 font-semibold">
                  {lastIssuedToken.registeredAt}
                </span>
              </div>

              <div className="text-center py-2">
                <span className="text-xs text-slate-500 font-semibold uppercase block">Token Number</span>
                <div className="text-5xl font-black text-[#0F766E] font-mono tracking-tight my-1">
                  {lastIssuedToken.tokenNumber}
                </div>
                <div className="text-base font-bold text-slate-900">
                  {lastIssuedToken.patientName}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {lastIssuedToken.department} • {lastIssuedToken.roomNumber || 'Room 12'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-3 bg-white/85 rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-medium">Est. Wait</span>
                  <span className="font-bold text-slate-900 text-sm font-mono">
                    {lastIssuedToken.estimatedWaitMinutes} mins
                  </span>
                </div>
                <div className="p-3 bg-white/85 rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] text-slate-500 uppercase block font-medium">Counter</span>
                  <span className="font-bold text-slate-900 text-sm font-mono">Counter #02</span>
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full justify-center"
                icon={<Printer className="w-4 h-4" />}
                onClick={() => window.print()}
              >
                Print Thermal Slip
              </Button>
            </BentoCard>
          )}

          {/* Recent Tokens Issued Stream (Solid Bento Card) */}
          <BentoCard variant="solid" padding="md" className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-[#0F766E]" />
              Recent Tokens at Counter #02
            </h4>

            <div className="divide-y divide-slate-100 text-xs">
              {recentTokens.map((t) => (
                <div key={t.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50/50 px-1 rounded transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {t.tokenNumber}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900">{t.patientName}</div>
                      <div className="text-[11px] text-slate-500">{t.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-slate-700 font-semibold">{t.registeredAt}</span>
                    <span className="block text-[10px] text-[#16A34A] font-medium">Printed</span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
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
