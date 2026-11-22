import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  appointmentAssistantService,
  AssistantState,
  ChatMessage
} from '../../services/appointmentAssistantService';

interface VoiceChatAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceChatAssistantModal: React.FC<VoiceChatAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [state, setState] = useState<AssistantState>(() =>
    appointmentAssistantService.createInitialState(
      user?.name,
      user?.phone,
      user?.abhaId
    )
  );

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechInterim, setSpeechInterim] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, speechInterim, isProcessing]);

  // Sync profile if user state loads
  useEffect(() => {
    if (user && state.messages.length === 1) {
      setState(
        appointmentAssistantService.createInitialState(
          user.name,
          user.phone,
          user.abhaId
        )
      );
    }
  }, [user]);

  // Cleanup speech synthesis and recognition on unmount or close
  useEffect(() => {
    if (!isOpen) {
      stopListening();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen]);

  // Text-to-Speech Output
  const speakText = (text: string) => {
    if (audioMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop prior speech
      // Clean markdown tags for spoken audio
      const clean = text
        .replace(/\*\*/g, '')
        .replace(/#/g, '')
        .replace(/•/g, '')
        .replace(/\[Source:.*?\]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    } catch {
      // Audio speech ignored if blocked by autoplay policy
    }
  };

  // Web Speech API - Speech-to-Text Input
  const startListening = () => {
    setSpeechError(null);
    setSpeechInterim('');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        'Speech recognition is not supported in this browser. Please type your message below.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setSpeechInterim(interim);
        if (final) {
          setIsListening(false);
          setSpeechInterim('');
          handleSendMessage(final);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setSpeechError(
            `Voice notice: ${event.error || 'Speech unclear'}. Please try speaking again or type your message.`
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
      setSpeechError('Could not start microphone. Please check browser permissions.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setSpeechInterim('');
  };

  // Turn submission logic
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isProcessing) return;

    setInputText('');
    setSpeechInterim('');
    setIsProcessing(true);

    try {
      const { nextState, assistantResponseText } =
        await appointmentAssistantService.processTurn(textToSend, state);

      setState(nextState);
      speakText(assistantResponseText);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        text: `Something went wrong: ${err.message || 'Please try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setState((prev) => ({ ...prev, messages: [...prev.messages, errorMsg] }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetConversation = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    stopListening();
    setState(
      appointmentAssistantService.createInitialState(
        user?.name,
        user?.phone,
        user?.abhaId
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[92vh] max-h-[820px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <span className="material-symbols-outlined text-xl">support_agent</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base tracking-tight text-white">
                  CareFlow Voice & Chat Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-teal-300">smart_toy</span>
                  Gemini AI • 1-Prompt Booking
                </span>
              </div>
              <p className="text-[11px] text-slate-300 flex items-center gap-1">
                <span>Civil Hospital Ambala</span>
                <span>•</span>
                <span>Speak or type freely</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Voice Toggle */}
            <button
              type="button"
              onClick={() => {
                const nextMute = !audioMuted;
                setAudioMuted(nextMute);
                if (nextMute && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              className={`p-2 rounded-xl transition-colors ${
                audioMuted
                  ? 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
              }`}
              title={audioMuted ? 'Unmute voice readback' : 'Mute voice readback'}
            >
              <span className="material-symbols-outlined text-lg">
                {audioMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>

            {/* Reset Chat */}
            <button
              type="button"
              onClick={handleResetConversation}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Restart Conversation"
            >
              <span className="material-symbols-outlined text-lg">restart_alt</span>
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors ml-1"
              title="Close Assistant"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="px-4 py-1.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-[11px] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <span className="material-symbols-outlined text-xs text-amber-700 shrink-0">
              verified_user
            </span>
            <span className="truncate">
              Grounded in official OPD Citizen Charter. Administrative guidance only — not clinical diagnosis.
            </span>
          </div>
          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded border border-red-200 shrink-0">
            Emergency: 108
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/70">
          {state.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              } animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-xs text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : msg.sender === 'system'
                    ? 'bg-red-50 text-red-800 border border-red-200 text-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                {/* Message Body */}
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {/* Grounded RAG Citation Tag */}
                {msg.ragResult && msg.ragResult.found && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-teal-700 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">auto_stories</span>
                      {msg.ragResult.source}
                    </span>
                    <span className="px-1.5 py-0.2 bg-teal-50 text-teal-800 rounded text-[9px] font-bold border border-teal-200 shrink-0">
                      Charter Verified
                    </span>
                  </div>
                )}

                {/* Booking Review Confirmation Card */}
                {msg.actionType === 'confirm_booking' && msg.bookingDraft && (
                  <div className="mt-3 p-3 bg-teal-50/80 rounded-xl border border-teal-200/80 text-xs space-y-2 text-slate-800">
                    <div className="font-bold text-teal-900 flex items-center gap-1 text-xs uppercase tracking-wide">
                      <span className="material-symbols-outlined text-sm text-teal-700">fact_check</span>
                      Live Appointment Preview
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-white p-2.5 rounded-lg border border-teal-100">
                      <div>
                        <span className="text-slate-500 block">Department:</span>
                        <strong className="text-slate-800">{msg.bookingDraft.department}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Consultant Doctor:</span>
                        <strong className="text-slate-800">{msg.bookingDraft.assignedDoctorName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">OPD Room:</span>
                        <strong className="text-teal-700 font-mono font-bold">{msg.bookingDraft.roomNumber}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Reserved Slot:</span>
                        <strong className="text-slate-800">{msg.bookingDraft.slot}</strong>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-100">
                        <span className="text-slate-500">Patient: </span>
                        <strong>{msg.bookingDraft.patientName}</strong> ({msg.bookingDraft.phone})
                      </div>
                    </div>
                  </div>
                )}

                {/* Booking Success Card */}
                {msg.createdToken && (
                  <div className="mt-3 p-3.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white shadow-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
                        Official Hospital Queue Token
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-emerald-800">
                        Active Queue
                      </span>
                    </div>
                    <div className="text-2xl font-black font-mono tracking-tight">
                      {msg.createdToken.tokenNumber}
                    </div>
                    <div className="text-xs text-emerald-50 flex items-center justify-between pt-1 border-t border-emerald-400/40">
                      <span>Room: {msg.createdToken.roomNumber}</span>
                      <span>Est. Wait: ~{msg.createdToken.estimatedWaitMinutes} mins</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate('/patient/dashboard');
                      }}
                      className="w-full mt-1 py-2 bg-white text-emerald-900 rounded-lg font-bold text-xs hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Open in Live Smart Queue Tracker
                    </button>
                  </div>
                )}

                {/* Emergency Red Action */}
                {msg.actionType === 'call_108' && (
                  <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-red-900 text-xs">Need Immediate Help?</div>
                      <div className="text-[11px] text-red-700">Call Emergency Ambulance services</div>
                    </div>
                    <a
                      href="tel:108"
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg font-bold text-xs hover:bg-red-700 flex items-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">emergency</span>
                      Dial 108
                    </a>
                  </div>
                )}

                {/* Human Helpdesk Contact */}
                {msg.actionType === 'helpdesk' && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-blue-900 text-xs">Helpdesk Reception Desk #01</div>
                      <div className="text-[11px] text-blue-700">Civil Hospital Ambala Main Porch</div>
                    </div>
                    <a
                      href="tel:01712550100"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-xs hover:bg-blue-700 flex items-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">call</span>
                      0171-2550100
                    </a>
                  </div>
                )}

                {/* Timestamp */}
                <div
                  className={`text-[9px] mt-1.5 font-medium ${
                    msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* Quick-reply chip buttons */}
              {msg.quickReplies && msg.quickReplies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                  {msg.quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(reply)}
                      disabled={isProcessing}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all shadow-2xs disabled:opacity-50"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Interim speech recognition preview */}
          {isListening && speechInterim && (
            <div className="flex flex-col items-end animate-pulse">
              <div className="bg-blue-100/80 text-blue-900 border border-blue-200 rounded-2xl rounded-br-xs px-4 py-2 text-sm italic">
                "{speechInterim}..."
              </div>
            </div>
          )}

          {/* Processing spinner indicator */}
          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic px-2">
              <span className="w-3.5 h-3.5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></span>
              <span>Assistant is checking hospital records...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Speech Error Banner */}
        {speechError && (
          <div className="px-4 py-1.5 bg-red-50 text-red-700 text-xs border-t border-red-100 flex items-center justify-between">
            <span>{speechError}</span>
            <button
              type="button"
              onClick={() => setSpeechError(null)}
              className="text-red-500 hover:text-red-800 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Listening Active Bar */}
        {isListening && (
          <div className="px-4 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 border-t border-teal-200 flex items-center justify-between text-xs text-teal-900">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              <span className="font-semibold">Microphone active — Listening to your voice...</span>
            </div>
            <button
              type="button"
              onClick={stopListening}
              className="px-2 py-0.5 rounded bg-teal-600 text-white font-bold text-[11px] hover:bg-teal-700"
            >
              Done Speaking
            </button>
          </div>
        )}

        {/* Footer Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            {/* Mic Toggle Button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-red-500 text-white ring-4 ring-red-200 animate-pulse'
                  : 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
              }`}
              title={isListening ? 'Stop listening' : 'Start speaking'}
            >
              <span className="material-symbols-outlined text-xl">
                {isListening ? 'mic' : 'mic'}
              </span>
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? 'Listening... or type message here...'
                  : 'Type or speak: "Book appointment with Dr. Rahul", "OPD timings", "Fasting rules"...'
              }
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 bg-slate-100 rounded-2xl border border-slate-200 text-sm focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all disabled:opacity-40 disabled:hover:bg-blue-600 shadow-sm flex items-center justify-center"
              title="Send message"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-1.5 flex items-center justify-center gap-2">
            <span>Powered by CareFlow Clinical Triage & RAG Grounded Knowledge</span>
            <span>•</span>
            <span>Hindi & English Supported</span>
          </div>
        </div>
      </div>
    </div>
  );
};
