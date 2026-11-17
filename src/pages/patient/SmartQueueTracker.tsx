import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext';
import { HospitalMapModal } from '../../components/common/HospitalMapModal';

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
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Top Breadcrumb & Live Refresh Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-light-outline">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            AI Synchronized Telemetry
          </span>
          <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary mt-0.5">
            Smart Queue Tracker
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/15 text-success text-xs font-bold font-code">
            <span className="w-2 h-2 rounded-full bg-success animate-ping"></span> Live Queue Sync
          </span>
          <button
            onClick={() => refreshTokens()}
            className="p-2 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary text-xs font-semibold flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Main Focus Live Queue Big Card */}
      <div className="bg-light-surface rounded-3xl border-2 border-accent/80 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Angled background subtle badge */}
        <div className="absolute top-0 right-0 bg-accent text-on-accent px-6 py-1.5 rounded-bl-2xl font-headline text-xs font-bold uppercase tracking-wider">
          OPD Priority Queue
        </div>

        {/* 4 Big Metrics required by spec */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-center">
          <div className="p-4 bg-light-surface-variant/60 rounded-2xl border border-light-outline">
            <span className="text-xs text-light-on-surface-variant font-bold uppercase block mb-1">
              Your Token
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-secondary font-code">
              {tokenNumber}
            </div>
            <span className="text-[11px] text-light-on-surface-variant mt-1 block">General Medicine</span>
          </div>

          <div className="p-4 bg-light-surface-variant/60 rounded-2xl border border-light-outline">
            <span className="text-xs text-light-on-surface-variant font-bold uppercase block mb-1">
              Current Token
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-light-primary font-code">
              {currentToken}
            </div>
            <span className="text-[11px] text-success font-semibold mt-1 block">In Doctor Room</span>
          </div>

          <div className="p-4 bg-light-surface-variant/60 rounded-2xl border border-light-outline">
            <span className="text-xs text-light-on-surface-variant font-bold uppercase block mb-1">
              Patients Ahead
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-amber-600 font-code">
              {String(patientsAhead).padStart(2, '0')}
            </div>
            <span className="text-[11px] text-light-on-surface-variant mt-1 block">In Waiting Hall</span>
          </div>

          <div className="p-4 bg-accent/20 rounded-2xl border-2 border-accent/50">
            <span className="text-xs text-on-accent font-bold uppercase block mb-1">
              Estimated Waiting
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-on-accent font-code">
              {estimatedWait} mins
            </div>
            <span className="text-[11px] text-on-accent/80 font-medium mt-1 block">AI Recalculated</span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-3 pt-4 border-t border-light-outline">
          <div className="flex justify-between text-xs font-semibold text-light-on-surface-variant">
            <span>Queue Progress (OPD Hall 2)</span>
            <span className="text-secondary font-bold">~{Math.max(10, 100 - patientsAhead * 15)}% Completed</span>
          </div>
          <div className="w-full h-3 bg-light-surface-variant rounded-full overflow-hidden p-0.5 border border-light-outline">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.max(10, 100 - patientsAhead * 15)}%` }}
            ></div>
          </div>
        </div>

        {/* Live Audio Announcement Trigger */}
        <div className="p-4 bg-light-surface-variant rounded-2xl border border-light-outline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">volume_up</span>
            </div>
            <div>
              <div className="font-headline text-xs font-bold text-light-primary">
                Audio Token Call Synthesizer
              </div>
              <div className="text-[11px] text-light-on-surface-variant">
                Listen to public address announcement as broadcast in OPD waiting lounge
              </div>
            </div>
          </div>

          <button
            onClick={playVoiceTokenAnnouncement}
            disabled={audioAnnouncementPlaying}
            className="px-4 py-2 bg-secondary text-white font-headline text-xs font-bold rounded-lg hover:bg-secondary/90 flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-sm">
              {audioAnnouncementPlaying ? 'equalizer' : 'play_arrow'}
            </span>
            <span>{audioAnnouncementPlaying ? 'Announcing...' : 'Play OPD Announcement'}</span>
          </button>
        </div>

        {/* Location & Wayfinding Help */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-light-outline">
          <div className="text-xs text-light-on-surface-variant text-center sm:text-left">
            Assigned Room: <strong className="text-light-primary font-headline">Room 12, 1st Floor, OPD Block B</strong>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setMapOpen(true)}
              className="flex-1 sm:flex-initial px-4 py-2 bg-light-surface border-2 border-light-primary text-light-primary text-xs font-bold rounded-lg hover:bg-light-primary hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">map</span>
              <span>Find Room On Map</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial px-4 py-2 bg-light-surface-variant text-light-primary text-xs font-bold rounded-lg hover:bg-light-outline transition-colors flex items-center justify-center gap-1.5 border border-light-outline"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print Slip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patient Tokens Sequence List */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
        <h3 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">format_list_numbered</span>
          Live Waiting Order (Next in Line)
        </h3>

        <div className="divide-y divide-light-outline-variant text-xs">
          {tokens
            .filter((t) => t.status === 'WAITING' || t.status === 'IN_CONSULTATION')
            .slice(0, 8)
            .map((t) => (
              <div
                key={t.id}
                className={`py-3 px-2 flex items-center justify-between rounded-lg transition-colors ${
                  t.tokenNumber === tokenNumber ? 'bg-accent/15 font-bold border-l-4 border-accent' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-headline font-code text-sm font-bold text-light-primary">
                    {t.tokenNumber}
                  </span>
                  <div>
                    <span className="text-light-primary font-medium">{t.patientName}</span>
                    <span className="text-[11px] text-light-on-surface-variant ml-2">
                      ({t.gender}, {t.age}y)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {t.priority === 'Emergency' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-danger/15 text-danger animate-pulse">
                      EMERGENCY
                    </span>
                  )}
                  {t.priority === 'Senior' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      SENIOR
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      t.status === 'IN_CONSULTATION'
                        ? 'bg-secondary text-white'
                        : 'bg-light-surface-variant text-light-on-surface-variant'
                    }`}
                  >
                    {t.status === 'IN_CONSULTATION' ? 'In Consultation' : `Est. ${t.estimatedWaitMinutes}m`}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <HospitalMapModal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        destinationDepartment="OPD Room 12 (General Medicine)"
      />
    </div>
  );
};
