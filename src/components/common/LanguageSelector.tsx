import React from 'react';
import { useLanguage, SupportedLanguage } from '../../context/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'pill' | 'dropdown' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'pill',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  const options: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  ];

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 text-[11px] font-semibold ${className}`}>
        {options.map((opt) => (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            className={`px-2 py-0.5 rounded-md transition-all ${
              language === opt.code
                ? 'bg-[#0F766E] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {opt.native}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold ${className}`}>
      <span className="material-symbols-outlined text-sm text-[#0F766E] ml-1 mr-0.5">translate</span>
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLanguage(opt.code)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            language === opt.code
              ? 'bg-[#0F766E] text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
          }`}
          title={`Switch language to ${opt.label}`}
        >
          {opt.native}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;

