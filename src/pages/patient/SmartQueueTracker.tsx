import React, { useState, useEffect } from 'react';
import { useQueue } from '../../context/QueueContext';
import { HospitalMapModal } from '../../components/common/HospitalMapModal';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { BentoCard } from '../../components/common/BentoCard';
import { PriorityIndicator } from '../../components/common/PriorityIndicator';
import { 
  RefreshCw, 
  Volume2, 
  MapPin, 
  Printer, 
  Clock, 
  UserCheck, 
  Users, 
  Radio 
} from 'lucide-react';

export const SmartQueueTracker: React.FC = () => {
  const { myToken, currentServingToken, tokens, refreshTokens } = useQueue();
  const [mapOpen, setMapOpen] = useState(false);
  const [audioAnnouncementPlaying, setAudioAnnouncementPlaying] = useState(false);

  // Auto-refresh queue every 10 seconds for real-time live feel
  useEffect(() => {
    const timer = setInterval(() => {
      refreshTokens();
    }, 10000);
    return () => clearInterval(timer);
  }, [refreshTokens]);

  const tokenNumber = myToken?.tokenNumber || 'OPD-104';
  const currentToken = currentServingToken?.tokenNumber || 'OPD-098';
  
  const myIndex = tokens.findIndex((t) => t.tokenNumber === tokenNumber);
  const servingIndex = tokens.findIndex((t) => t.tokenNumber === currentToken);
  const patientsAhead = myIndex >= 0 && servingIndex >= 0 ? Math.max(0, myIndex - servingIndex) : 6;
  const estimatedWait = myToken?.estimatedWaitMinutes ?? patientsAhead * 5;

  const playVoiceTokenAnnouncement = () => {
    setAudioAnnouncementPlaying(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Token number ${currentToken}. Please proceed to Room number 12. Token number ${currentToken}.`
      );
      utterance.rate = 0.9;
      utterance.onend = () => setAudioAnnouncementPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setAudioAnnouncementPlaying(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <PageHeader
        title="Smart Queue Live Tracker"
        subtitle="Real-time synchronized OPD queue telemetry and audio announcements"
        badge={
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Queue Sync
          </span>
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => refreshTokens()}
          >
            Refresh
          </Button>
        }
      />

      {/* Main Focus Live Queue Big Card (Glass Bento Card) */}
      <div className="glass-card p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Assigned Clinic</span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">General Medicine OPD • Room 12</h2>
          </div>
          <span className="text-xs font-bold text-[#0F766E] bg-[#E6F4F1] px-3 py-1 rounded-full border border-[#0F766E]/20">
            Priority OPD Flow
          </span>
        </div>

        {/* 4 Big Metrics Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-teal-50/70 rounded-2xl border border-[#0F766E]/20 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">
              Your Token
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#0F766E] font-mono tracking-tight tabular-nums">
              {tokenNumber}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">General Medicine</span>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">
              Now Serving
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
              {currentToken}
            </div>
            <span className="text-xs text-[#16A34A] font-semibold mt-1 block">In Doctor Room</span>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">
              Ahead of You
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#D97706] font-mono tracking-tight tabular-nums">
              {String(patientsAhead).padStart(2, '0')}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Patients in lounge</span>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">
              Estimated Wait
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
              {estimatedWait}m
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1 block">AI Recalculated</span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Queue Progress</span>
            <span className="text-[#0F766E] font-bold">~{Math.max(10, 100 - patientsAhead * 15)}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-[#0F766E] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.max(10, 100 - patientsAhead * 15)}%` }}
            ></div>
          </div>
        </div>

        {/* Live Audio Announcement Trigger */}
        <div className="p-4 bg-white/80 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center border border-teal-100">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Hospital PA Audio Announcement
              </div>
              <div className="text-[11px] text-slate-500">
                Listen to public address announcement synthesized for OPD lounge
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={<Volume2 className="w-3.5 h-3.5" />}
            disabled={audioAnnouncementPlaying}
            onClick={playVoiceTokenAnnouncement}
          >
            {audioAnnouncementPlaying ? 'Announcing...' : 'Play Announcement'}
          </Button>
        </div>

        {/* Location & Wayfinding Help */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-600 text-center sm:text-left flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#0F766E]" />
            <span>Assigned Room: <strong className="text-slate-900">Room 12, 1st Floor, OPD Block B</strong></span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={<MapPin className="w-3.5 h-3.5" />}
              onClick={() => setMapOpen(true)}
            >
              Hospital Map
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
              onClick={() => window.print()}
            >
              Print Token
            </Button>
          </div>
        </div>
      </div>

      {/* Patient Tokens Sequence List (Solid Bento Card) */}
      <BentoCard variant="solid" padding="md" className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0F766E]" />
          Live Waiting Order (Next in Line)
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {tokens
            .filter((t) => t.status === 'WAITING' || t.status === 'IN_CONSULTATION')
            .slice(0, 8)
            .map((t) => (
              <div
                key={t.id}
                className={`py-3 px-3 flex items-center justify-between rounded-xl transition-colors ${
                  t.tokenNumber === tokenNumber ? 'bg-teal-50 font-bold border border-teal-200' : 'hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {t.tokenNumber}
                  </span>
                  <div>
                    <span className="text-slate-900 font-medium">{t.patientName}</span>
                    <span className="text-[11px] text-slate-500 ml-2">
                      ({t.gender}, {t.age}y)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <PriorityIndicator priority={t.priority} />
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      t.status === 'IN_CONSULTATION'
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {t.status === 'IN_CONSULTATION' ? 'In Room' : `Est. ${t.estimatedWaitMinutes}m`}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </BentoCard>

      <HospitalMapModal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        destinationDepartment="OPD Room 12 (General Medicine)"
      />
    </div>
  );
};
