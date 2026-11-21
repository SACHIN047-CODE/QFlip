import React, { useState, useEffect, useRef } from 'react';
import { Modal } from './Modal';
import { aiService } from '../../services/aiService';
import { TriageResult } from '../../types';
import { 
  detectLanguage, 
  LanguageDetectionResult, 
  getSpokenTriageResponse,
  LANGUAGE_REGISTRY 
} from '../../utils/languageDetector';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (transcript: string, suggestedDepartment: string, symptoms: string[]) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState<LanguageDetectionResult>(LANGUAGE_REGISTRY['en-IN'] as LanguageDetectionResult);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
    }
  }, []);

  // Update language detection automatically whenever text changes
  useEffect(() => {
    const current = manualText || transcript;
    if (current.trim()) {
      const detected = detectLanguage(current);
      setDetectedLanguage(detected);
    }
  }, [manualText, transcript]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      stopListening();
      setTriageResult(null);
      setSpeechError(null);
    }
  }, [isOpen]);

  const startListening = () => {
    setSpeechError(null);
    setTriageResult(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
      setSpeechError('Speech recognition is not supported in this browser. Please type symptoms in the text box below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      // Use 'hi-IN' default as Indian speech engines handle mixed Indic and English speech effectively
      recognition.lang = 'hi-IN';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
        setManualText(current);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setSpeechError(`Microphone notice: ${event.error || 'Speech capture ended'}. You can retry or type directly.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err: any) {
      setIsListening(false);
      setSpeechError('Could not start microphone. Please check browser microphone permissions or type below.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
  };

  const handleClear = () => {
    stopListening();
    setTranscript('');
    setManualText('');
    setTriageResult(null);
    setSpeechError(null);
    setDetectedLanguage(LANGUAGE_REGISTRY['en-IN'] as LanguageDetectionResult);
  };

  const handleSimulateVoice = (samplePhrase: string) => {
    stopListening();
    setTranscript(samplePhrase);
    setManualText(samplePhrase);
    const detected = detectLanguage(samplePhrase);
    setDetectedLanguage(detected);
    setTriageResult(null);
  };

  const speakResponse = (text: string, langCode: string) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const analyzeSymptoms = async () => {
    const text = (manualText || transcript).trim();
    if (!text) return;

    setIsAnalyzing(true);
    setSpeechError(null);

    try {
      const result = await aiService.triageSymptoms(text, detectedLanguage.lang);
      setTriageResult(result);

      // Speak response in detected language
      const spokenText = getSpokenTriageResponse(result.department, detectedLanguage.code);
      speakResponse(spokenText, detectedLanguage.code);
    } catch (err: any) {
      setSpeechError('Triage evaluation encountered an error. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleProceed = () => {
    const text = manualText || transcript;
    const dept = triageResult ? triageResult.department : 'General Medicine';
    const symptoms: string[] = triageResult?.symptoms || ['Reported Spoken Symptoms'];

    onComplete(text, dept, symptoms);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('voice.title', 'Voice-Based Multi-Lingual Symptom Intake')}
      subtitle={t('voice.subtitle', 'Speak in English, Hindi, Punjabi, or Tamil to auto-triage to the right clinical department')}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Automatic Language Detection Status Banner */}
        <div className="flex items-center justify-between p-2.5 px-3.5 bg-light-surface-variant/70 rounded-xl border border-light-outline text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-base">translate</span>
            <span className="text-light-on-surface-variant font-medium">
              {t('voice.detected_lang', 'Detected Language')}:
            </span>
            <span className="font-bold text-light-primary px-2 py-0.5 rounded bg-white border border-light-outline shadow-sm">
              {detectedLanguage.nativeName} ({detectedLanguage.name})
            </span>
          </div>
          <span className="text-[11px] text-light-on-surface-variant hidden sm:inline">
            Automatic Multi-Lingual Detection Enabled
          </span>
        </div>

        {/* ONE Unified Voice Interaction Button */}
        <div className="p-6 bg-light-surface-variant/40 rounded-2xl border border-light-outline text-center flex flex-col items-center justify-center relative overflow-hidden">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isListening
                ? 'bg-danger text-white animate-pulse scale-110 shadow-danger/40 ring-4 ring-danger/30'
                : 'bg-accent text-on-accent hover:scale-105 shadow-md hover:brightness-95'
            }`}
            title={isListening ? 'Click to stop listening' : 'Click to start speaking'}
          >
            <span className="material-symbols-outlined text-3xl">
              {isListening ? 'mic' : 'mic_none'}
            </span>
          </button>
          
          <span className="font-headline text-xs font-bold text-light-primary mt-3">
            {isListening
              ? t('voice.listening', 'Listening... Speak clearly now')
              : t('voice.tap_to_speak', 'Tap Microphone to Speak')}
          </span>
          <span className="text-[11px] text-light-on-surface-variant mt-0.5">
            Auto-detects: English • हिन्दी (Hindi) • ਪੰਜਾਬੀ (Punjabi) • தமிழ் (Tamil)
          </span>

          {/* Quick Repeat / Clear Controls */}
          {(transcript || manualText) && (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={startListening}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white border border-light-outline text-light-primary hover:bg-light-surface-variant flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-xs">replay</span>
                <span>{t('voice.repeat', 'Speak Again')}</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white border border-light-outline text-danger hover:bg-danger/10 flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-xs">close</span>
                <span>{t('voice.clear', 'Clear')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Speech / Permission Error Alert with Fallback Notice */}
        {speechError && (
          <div className="p-3 bg-warning/15 border border-warning/40 rounded-xl text-xs text-on-warning flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-warning mt-0.5">info</span>
            <div className="flex-grow">
              <span>{speechError}</span>
            </div>
          </div>
        )}

        {/* Retained Predefined Patient Voice Prompts (Including Tamil) */}
        <div>
          <span className="text-[11px] uppercase font-bold text-light-on-surface-variant block mb-2">
            {t('voice.sample_prompts_title', 'Or Click a Sample Patient Voice Prompt:')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Hindi Prompt */}
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice('मुझे 3 दिन से तेज़ बुखार है और गले में दर्द हो रहा है।')
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-secondary block">Hindi OPD Sample (हिन्दी):</span>
              "{t('voice.sample_hindi', 'मुझे 3 दिन से तेज़ बुखार है और गले में दर्द हो रहा है।')}"
            </button>

            {/* English Emergency Cardiac Prompt */}
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice(
                  'Heavy chest congestion and sharp pain radiating to left shoulder since morning.'
                )
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-danger block">Emergency Cardiac Sample (English):</span>
              "{t('voice.sample_english', 'Heavy chest congestion and sharp pain radiating to left shoulder.')}"
            </button>

            {/* Punjabi Ortho Prompt */}
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice('ਮੇਰਾ ਗਿੱਟਾ ਮੁੜ ਗਿਆ ਸੀ ਤੇ ਚੱਲਣ ਵਿਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।')
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-secondary block">Punjabi Ortho Sample (ਪੰਜਾਬੀ):</span>
              "{t('voice.sample_punjabi', 'ਮੇਰਾ ਗਿੱਟਾ ਮੁੜ ਗਿਆ ਸੀ ਤੇ ਚੱਲਣ ਵਿਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।')}"
            </button>

            {/* Pediatric Sample */}
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice('Baby has high persistent fever and crying continuously.')
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-secondary block">Pediatric Sample:</span>
              "{t('voice.sample_pediatric', 'Baby has high persistent fever and crying continuously.')}"
            </button>

            {/* Tamil OPD Sample */}
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice('எனக்கு 3 நாட்களாக கடுமையான காய்ச்சல் மற்றும் தொண்டை வலி உள்ளது.')
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors sm:col-span-2"
            >
              <span className="text-[10px] font-bold text-secondary block">Tamil OPD Sample (தமிழ்):</span>
              "{t('voice.sample_tamil', 'எனக்கு 3 நாட்களாக கடுமையான காய்ச்சல் மற்றும் தொண்டை வலி உள்ளது.')}"
            </button>
          </div>
        </div>

        {/* Text Area (Recognized Speech & Manual Verification / Typing Fallback) */}
        <div>
          <label className="text-xs font-bold text-light-primary block mb-1.5">
            {t('voice.transcript_label', 'Spoken Transcript & Verification (Edit if needed):')}
          </label>
          <textarea
            rows={3}
            value={manualText}
            onChange={(e) => {
              setManualText(e.target.value);
              setTranscript(e.target.value);
            }}
            placeholder={t(
              'voice.transcript_placeholder',
              'Transcript will appear here as you speak, or type symptoms directly...'
            )}
            className="w-full p-3 text-xs rounded-lg border border-light-outline bg-light-surface text-light-primary font-body focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>

        {/* AI Triage Result Display */}
        {triageResult && (
          <div className="p-4 bg-light-surface rounded-xl border-2 border-secondary/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-headline text-xs font-bold text-light-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-sm">psychology</span>
                {t('voice.triage_result_title', 'AI Clinical Triage Recommendation')}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  triageResult.urgency === 'emergency'
                    ? 'bg-danger text-white'
                    : triageResult.urgency === 'urgent'
                    ? 'bg-amber-500 text-white'
                    : 'bg-success text-white'
                }`}
              >
                {triageResult.urgency}
              </span>
            </div>

            <div className="p-3 bg-light-surface-variant rounded-lg border border-light-outline flex items-center justify-between">
              <div>
                <span className="text-[11px] text-light-on-surface-variant block">
                  {t('voice.recommended_dept', 'Recommended OPD Department:')}
                </span>
                <span className="font-headline text-sm font-extrabold text-light-primary">
                  {triageResult.department} ({triageResult.departmentCode})
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakResponse(
                    getSpokenTriageResponse(triageResult.department, detectedLanguage.code),
                    detectedLanguage.code
                  )
                }
                className="px-2.5 py-1.5 rounded-lg border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold flex items-center gap-1"
                title="Listen to spoken triage result"
              >
                <span className="material-symbols-outlined text-sm">
                  {isPlayingAudio ? 'volume_up' : 'campaign'}
                </span>
                <span>{isPlayingAudio ? 'Speaking...' : 'Listen'}</span>
              </button>
            </div>

            <p className="text-xs text-light-on-surface-variant">
              {triageResult.summary}
            </p>

            <div className="text-[10px] text-light-on-surface-variant/80 italic border-t border-light-outline/60 pt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-amber-600">health_and_safety</span>
              <span>{triageResult.disclaimer}</span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-light-outline">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary"
          >
            {t('voice.cancel_btn', 'Cancel')}
          </button>

          <div className="flex items-center gap-2">
            {!triageResult ? (
              <button
                type="button"
                disabled={!manualText.trim() || isAnalyzing}
                onClick={analyzeSymptoms}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-accent text-on-accent hover:brightness-95 disabled:opacity-50 flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-sm">
                  {isAnalyzing ? 'hourglass_top' : 'psychology'}
                </span>
                <span>
                  {isAnalyzing
                    ? 'Evaluating Symptoms...'
                    : t('voice.analyze_btn', 'Analyze & Assign Department')}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleProceed}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-secondary text-white hover:bg-secondary/90 flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t('voice.proceed_btn', 'Proceed with this Department')}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
