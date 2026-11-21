import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext';
import { useLanguage } from '../../context/LanguageContext';

export const SmartQueueTracker: React.FC = () => {
  const { myToken, currentServingToken, tokens, refreshTokens } = useQueue();
  const { t } = useLanguage();
  const [audioAnnouncementPlaying, setAudioAnnouncementPlaying] = useState(false);

  // Auto-refresh queue every 10 seconds for real-time live feel
  useEffect(() => {
    const timer = setInterval(() => {
      refreshTokens();
    }, 10000);
    return () => clearInterval(timer);
  }, [refreshTokens]);

  // Clean empty state if no active token
  if (!myToken) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="pb-3 border-b border-light-outline">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            AI Synchronized Telemetry
          </span>
          <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary mt-0.5">
            Smart Queue Tracker
          </h1>
        </div>

        <div className="p-12 bg-light-surface rounded-3xl border border-light-outline text-center space-y-4 shadow-card">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">local_activity</span>
          </div>
          <h3 className="font-headline text-xl font-bold text-light-primary">
            No active patient records available.
          </h3>
          <p className="text-xs text-light-on-surface-variant max-w-md mx-auto">
            You do not currently have an active OPD consultation token. Book an OPD slip online to view your real-time position in the doctor's queue.
          </p>
          <div className="pt-2">
            <Link
              to="/patient/registration"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary/90 transition-colors shadow-sm"
            >
              <span>Book OPD Slip Now</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tokenNumber = myToken.tokenNumber;
  const currentToken = currentServingToken ? currentServingToken.tokenNumber : 'None';

  // Calculate actual waiting order
  const waitingTokens = tokens.filter((t) => t.status === 'WAITING');
  const myIndexInWaiting = waitingTokens.findIndex((t) => t.id === myToken.id);
  const patientsAhead = myIndexInWaiting >= 0 ? myIndexInWaiting : 0;
  const estimatedWait = myToken.estimatedWaitMinutes ?? patientsAhead * 5;

  const isSkipped = myToken.status === 'SKIPPED' || myToken.status === 'SKIPPED_AWAITING_RECEPTION';
  const isRejoined = myToken.reentryPenaltyApplied && myToken.status === 'WAITING';

  const playVoiceTokenAnnouncement = () => {
    if (!currentServingToken) return;
    setAudioAnnouncementPlaying(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Token number ${currentToken}. Please proceed to ${myToken.roomNumber || 'Room 12'}. Token number ${currentToken}.`
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

      {/* Skipped Alert Banner */}
      {isSkipped && (
        <div className="bg-amber-500 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl animate-pulse">warning</span>
            </div>
            <div>
              <div className="font-headline text-base font-bold">
                Skipped – Awaiting Reception Check-in
              </div>
              <div className="text-xs text-amber-100 mt-0.5">
                Waiting for physical verification. Your token was skipped. Please visit reception and scan your token to rejoin the queue.
              </div>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-white/20 text-xs font-bold font-code self-start sm:self-center whitespace-nowrap">
            Reception Check-in Required
          </span>
        </div>
      )}

      {/* Rejoined Banner */}
      {isRejoined && (
        <div className="bg-blue-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">check_circle</span>
            <div className="text-xs">
              <span className="font-bold">Rejoined Main Queue</span>
              <span className="text-blue-100 ml-2">
                Physical presence verified at reception. Three-position re-entry penalty applied.
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-white/20 font-code font-bold text-xs whitespace-nowrap">
            Updated Position: #{patientsAhead + 1}
          </span>
        </div>
      )}

      {/* Main Focus Live Queue Big Card */}
      <div className="bg-light-surface rounded-3xl border-2 border-accent/80 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Angled background subtle badge */}
        <div className="absolute top-0 right-0 bg-accent text-on-accent px-6 py-1.5 rounded-bl-2xl font-headline text-xs font-bold uppercase tracking-wider">
          {myToken.isBuffer ? 'Buffer Capacity Token' : 'OPD Priority Queue'}
        </div>

        {/* 4 Big Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-center">
          <div className="p-4 bg-light-surface-variant/60 rounded-2xl border border-light-outline">
            <span className="text-xs text-light-on-surface-variant font-bold uppercase block mb-1">
              {t('queue.token_number', 'Your Token')}
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-secondary font-code">
              {tokenNumber}
            </div>
            <span className="text-[11px] text-light-on-surface-variant mt-1 block">
              {myToken.department}
            </span>
          </div>

          <div className="p-4 bg-light-surface-variant/60 rounded-2xl border border-light-outline">
            <span className="text-xs text-light-on-surface-variant font-bold uppercase block mb-1">
              {t('queue.currently_serving', 'Current Token')}
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-light-primary font-code">
              {currentToken}
            </div>
            <span className="text-[11px] text-success font-semibold mt-1 block">
              {currentServingToken ? 'In Doctor Room' : 'Awaiting Next Call'}
            </span>
          </div>

          <div className="p-4 bg-light-surface-variant/60 rounded-2xl border border-light-outline">
            <span className="text-xs text-light-on-surface-variant font-bold uppercase block mb-1">
              Patients Ahead
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-amber-600 font-code">
              {isSkipped ? '--' : String(patientsAhead).padStart(2, '0')}
            </div>
            <span className="text-[11px] text-light-on-surface-variant mt-1 block">
              {isSkipped ? 'Awaiting Check-in' : 'In Waiting Hall'}
            </span>
          </div>

          <div className="p-4 bg-accent/20 rounded-2xl border-2 border-accent/50">
            <span className="text-xs text-on-accent font-bold uppercase block mb-1">
              {t('queue.estimated_wait', 'Estimated Waiting')}
            </span>
            <div className="font-headline text-3xl sm:text-4xl font-black text-on-accent font-code">
              {isSkipped ? '--' : `${estimatedWait} ${t('queue.mins', 'mins')}`}
            </div>
            <span className="text-[11px] text-on-accent/80 font-medium mt-1 block">
              {isSkipped ? 'Paused' : 'AI Recalculated'}
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        {!isSkipped && (
          <div className="space-y-3 pt-4 border-t border-light-outline">
            <div className="flex justify-between text-xs font-semibold text-light-on-surface-variant">
              <span>Queue Progress ({myToken.department})</span>
              <span className="text-secondary font-bold">
                ~{Math.max(10, Math.min(100, 100 - patientsAhead * 15))}% Completed
              </span>
            </div>
            <div className="w-full h-3 bg-light-surface-variant rounded-full overflow-hidden p-0.5 border border-light-outline">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(10, Math.min(100, 100 - patientsAhead * 15))}%` }}
              ></div>
            </div>
          </div>
        )}

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
            disabled={audioAnnouncementPlaying || !currentServingToken}
            className="px-4 py-2 bg-secondary text-white font-headline text-xs font-bold rounded-lg hover:bg-secondary/90 flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
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
            Assigned Room:{' '}
            <strong className="text-light-primary font-headline">
              {myToken.roomNumber || 'Room 12, 1st Floor, OPD Block B'}
            </strong>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
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

      {/* Patient Tokens Sequence List (Genuine records only) */}
      <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
        <h3 className="font-headline text-title-md font-bold text-light-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">format_list_numbered</span>
          Live Waiting Order (Next in Line)
        </h3>

        {waitingTokens.length === 0 ? (
          <div className="p-6 text-center text-xs text-light-on-surface-variant">
            No active patient records available in queue.
          </div>
        ) : (
          <div className="divide-y divide-light-outline-variant text-xs">
            {waitingTokens.slice(0, 8).map((t, idx) => (
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
                    {t.isBuffer && (
                      <span className="ml-2 px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 text-[10px] font-bold">
                        Buffer
                      </span>
                    )}
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
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-light-surface-variant text-light-on-surface-variant">
                    Position #{idx + 1} • Est. {t.estimatedWaitMinutes}m
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartQueueTracker;
