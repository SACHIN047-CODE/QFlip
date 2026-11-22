import React, { useState } from 'react';
import { VoiceChatAssistantModal } from './VoiceChatAssistantModal';

export const VoiceChatAssistantFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-900/90 text-white text-[11px] font-bold rounded-full shadow-lg backdrop-blur-xs border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-y-1 group-hover:translate-y-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Voice & Chat OPD Assistant</span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-blue-700 hover:via-teal-700 hover:to-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
          title="Open Voice & Chat OPD Assistant"
        >
          {/* Animated Wave Rings */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
          </span>

          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xl">mic</span>
            <span className="font-headline font-bold text-xs tracking-wide">
              OPD Assistant
            </span>
          </div>
        </button>
      </div>

      {/* Assistant Modal */}
      <VoiceChatAssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
