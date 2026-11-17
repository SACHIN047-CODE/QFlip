import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (transcript: string, suggestedDepartment: string, symptoms: string[]) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [language, setLanguage] = useState<'hi-IN' | 'en-IN' | 'pa-IN'>('en-IN');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [recognitionSupported, setRecognitionSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
        setManualText(current);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      (window as any)._activeRecognition = recognition;
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if ((window as any)._activeRecognition) {
      (window as any)._activeRecognition.stop();
    }
    setIsListening(false);
  };

  const handleSimulateVoice = (samplePhrase: string, lang: 'hi-IN' | 'en-IN' | 'pa-IN') => {
    setLanguage(lang);
    setTranscript(samplePhrase);
    setManualText(samplePhrase);
  };

  const analyzeSymptomsAndSubmit = () => {
    const text = (manualText || transcript).toLowerCase();

    // AI Triage rule matching
    let suggestedDept = 'General Medicine';
    const symptoms: string[] = [];

    if (text.includes('chest') || text.includes('heart') || text.includes('dil') || text.includes('dhadkan')) {
      suggestedDept = 'Cardiology';
      symptoms.push('Chest Discomfort', 'Heart Palpitations');
    } else if (text.includes('bone') || text.includes('fracture') || text.includes('joint') || text.includes('haddi') || text.includes('knee')) {
      suggestedDept = 'Orthopedics';
      symptoms.push('Joint / Bone Pain', 'Difficulty Walking');
    } else if (text.includes('child') || text.includes('baby') || text.includes('baccha') || text.includes('infant')) {
      suggestedDept = 'Pediatrics';
      symptoms.push('Pediatric Symptoms', 'Fever in Child');
    } else if (text.includes('ear') || text.includes('throat') || text.includes('nose') || text.includes('gala') || text.includes('kaan')) {
      suggestedDept = 'ENT & Head Neck';
      symptoms.push('Sore Throat / Ear Congestion');
    } else if (text.includes('pregnancy') || text.includes('delivery') || text.includes('period') || text.includes('mahila')) {
      suggestedDept = 'Obstetrics & Gynecology';
      symptoms.push('Maternal / Gynaecological Consultation');
    } else {
      if (text.includes('fever') || text.includes('bukhar')) symptoms.push('Fever');
      if (text.includes('cough') || text.includes('khansi')) symptoms.push('Persistent Cough');
      if (text.includes('headache') || text.includes('sir dard')) symptoms.push('Severe Headache');
      if (symptoms.length === 0) symptoms.push('General Malaise & Weakness');
    }

    onComplete(manualText || transcript, suggestedDept, symptoms);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Voice-Based Multi-Lingual Symptom Intake"
      subtitle="Speak in Hindi, Punjabi, or English to auto-triage to the right clinical department"
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Language Selection Tabs */}
        <div className="flex items-center gap-2 p-1 bg-light-surface-variant rounded-lg border border-light-outline text-xs">
          <button
            type="button"
            onClick={() => setLanguage('en-IN')}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${
              language === 'en-IN' ? 'bg-white shadow text-light-primary' : 'text-light-on-surface-variant'
            }`}
          >
            English (India)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi-IN')}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${
              language === 'hi-IN' ? 'bg-white shadow text-light-primary' : 'text-light-on-surface-variant'
            }`}
          >
            हिन्दी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('pa-IN')}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${
              language === 'pa-IN' ? 'bg-white shadow text-light-primary' : 'text-light-on-surface-variant'
            }`}
          >
            ਪੰਜਾਬੀ (Punjabi)
          </button>
        </div>

        {/* Microphone Action Area */}
        <div className="p-6 bg-light-surface-variant/50 rounded-2xl border border-light-outline text-center flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isListening
                ? 'bg-danger text-white animate-pulse scale-110 shadow-danger/40'
                : 'bg-accent text-on-accent hover:scale-105'
            }`}
          >
            <span className="material-symbols-outlined text-3xl">
              {isListening ? 'mic' : 'mic_none'}
            </span>
          </button>
          <span className="font-headline text-xs font-bold text-light-primary mt-3">
            {isListening ? 'Listening... Speak clearly now' : 'Tap Microphone to Speak'}
          </span>
          <span className="text-[11px] text-light-on-surface-variant mt-0.5">
            Supported languages: Hindi, Punjabi, English
          </span>
        </div>

        {/* Quick Demo Voice Prompts for instant testing */}
        <div>
          <span className="text-[11px] uppercase font-bold text-light-on-surface-variant block mb-2">
            Or Click a Sample Patient Voice Prompt:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice(
                  'Mujhe 3 din se tez bukhar hai aur gale mein dard ho raha hai.',
                  'hi-IN'
                )
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-secondary block">Hindi OPD Sample:</span>
              "मुझे 3 दिन से तेज़ बुखार है और गले में दर्द हो रहा है।"
            </button>
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice(
                  'Heavy chest congestion and sharp pain radiating to left shoulder since morning.',
                  'en-IN'
                )
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-danger block">Emergency Cardiac Sample:</span>
              "Heavy chest congestion and sharp pain radiating to left shoulder."
            </button>
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice(
                  'Mera gitta mud gaya si te chalne vich bohot dard ho reha hai.',
                  'pa-IN'
                )
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-secondary block">Punjabi Ortho Sample:</span>
              "ਮੇਰਾ ਗਿੱਟਾ ਮੁੜ ਗਿਆ ਸੀ ਤੇ ਚੱਲਣ ਵਿਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।"
            </button>
            <button
              type="button"
              onClick={() =>
                handleSimulateVoice(
                  'Baby has high persistent fever and crying continuously.',
                  'en-IN'
                )
              }
              className="text-left p-2.5 rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary transition-colors"
            >
              <span className="text-[10px] font-bold text-secondary block">Pediatric Sample:</span>
              "Baby has high persistent fever and crying continuously."
            </button>
          </div>
        </div>

        {/* Text Area (Live Transcription or Manual Text Fallback) */}
        <div>
          <label className="text-xs font-bold text-light-primary block mb-1.5">
            Voice Transcript &amp; Manual Verification Fallback:
          </label>
          <textarea
            rows={3}
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder="Transcript will appear here as you speak, or you can type symptoms directly..."
            className="w-full p-3 text-xs rounded-lg border border-light-outline bg-light-surface text-light-primary font-body focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-light-outline">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-light-outline bg-white hover:bg-light-surface-variant text-light-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!manualText.trim()}
            onClick={analyzeSymptomsAndSubmit}
            className="px-5 py-2.5 text-xs font-bold rounded-lg bg-accent text-on-accent hover:brightness-95 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            Analyze &amp; Assign Department
          </button>
        </div>
      </div>
    </Modal>
  );
};
