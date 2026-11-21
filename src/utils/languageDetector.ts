/**
 * Extensible Multi-Lingual Speech & Text Language Detector for Indian Health Systems
 * Supports English, Hindi, Punjabi, and Tamil, with extensible architecture for all 22 official languages.
 */

export interface SupportedLanguageInfo {
  code: string;         // e.g. 'hi-IN'
  lang: string;         // ISO 639-1 code e.g. 'hi'
  name: string;         // 'Hindi'
  nativeName: string;   // 'हिन्दी'
  script: string;       // 'Devanagari'
}

export interface LanguageDetectionResult extends SupportedLanguageInfo {
  confidence: number;   // 0.0 to 1.0
  matchedBy: 'unicode_script' | 'vocabulary' | 'default';
}

export const LANGUAGE_REGISTRY: Record<string, SupportedLanguageInfo> = {
  'hi-IN': {
    code: 'hi-IN',
    lang: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
  },
  'pa-IN': {
    code: 'pa-IN',
    lang: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
  },
  'ta-IN': {
    code: 'ta-IN',
    lang: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
  },
  'en-IN': {
    code: 'en-IN',
    lang: 'en',
    name: 'English (India)',
    nativeName: 'English',
    script: 'Latin',
  },
  // Extensible slots for additional regional health clusters
  'bn-IN': {
    code: 'bn-IN',
    lang: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
  },
  'te-IN': {
    code: 'te-IN',
    lang: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
  },
  'gu-IN': {
    code: 'gu-IN',
    lang: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
  },
  'kn-IN': {
    code: 'kn-IN',
    lang: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
  },
  'ml-IN': {
    code: 'ml-IN',
    lang: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
  },
};

// Common clinical & spoken symptom vocabularies in Latin transliteration
const HINDI_TRANSLITERATED = [
  'mujhe', 'mera', 'meri', 'bukhar', 'tez', 'dard', 'gale', 'gala', 'khansi',
  'sir', 'sar', 'dhadkan', 'kamzor', 'kamzori', 'chhati', 'dil', 'pet', 'ulti',
  'chakkar', 'saans', 'takleef', 'hai', 'hain', 'ho', 'raha', 'rahi', 'rahe',
  'mein', 'aur', 'bohot', 'bahut', 'din', 'se', 'baccha', 'bache', 'haddi'
];

const PUNJABI_TRANSLITERATED = [
  'mera', 'meri', 'mere', 'gitta', 'mud', 'gaya', 'si', 'te', 'vich', 'bohot',
  'reha', 'rehi', 'rahe', 'goda', 'dukh', 'pind', 'saah', 'hunda', 'kanni',
  'darda', 'chalne', 'chalan', 'taap', 'khang', 'haddi', 'chhati', 'kamzori'
];

const TAMIL_TRANSLITERATED = [
  'enakku', 'yenakku', 'kaichal', 'vali', 'irukku', 'romba', 'marbu', 'thalai',
  'udambu', 'mudiyala', 'thondai', 'erichal', 'kashtam', 'naatkal', 'naala',
  'kann', 'kaal', 'kai', 'mootu', 'moochu', 'kulanthai', 'pillai', 'maruthuvar'
];

const ENGLISH_KEYWORDS = [
  'pain', 'chest', 'congestion', 'severe', 'mild', 'sharp', 'radiating', 'shoulder',
  'fever', 'cough', 'throat', 'headache', 'stomach', 'baby', 'child', 'infant',
  'crying', 'continuously', 'since', 'morning', 'difficulty', 'breathing', 'joint',
  'doctor', 'bleeding', 'fracture', 'blood', 'vomiting', 'dizziness'
];

/**
 * Automatically detects whether input speech/text is Hindi, Punjabi, Tamil, or English
 */
export function detectLanguage(text: string): LanguageDetectionResult {
  if (!text || !text.trim()) {
    return {
      ...LANGUAGE_REGISTRY['en-IN'],
      confidence: 1.0,
      matchedBy: 'default',
    };
  }

  const raw = text.trim();

  // 1. Unicode Script Detection
  // Gurmukhi script (Punjabi): \u0A00-\u0A7F
  if (/[\u0A00-\u0A7F]/.test(raw)) {
    return {
      ...LANGUAGE_REGISTRY['pa-IN'],
      confidence: 0.99,
      matchedBy: 'unicode_script',
    };
  }

  // Tamil script: \u0B80-\u0BFF
  if (/[\u0B80-\u0BFF]/.test(raw)) {
    return {
      ...LANGUAGE_REGISTRY['ta-IN'],
      confidence: 0.99,
      matchedBy: 'unicode_script',
    };
  }

  // Devanagari script (Hindi): \u0900-\u097F
  if (/[\u0900-\u097F]/.test(raw)) {
    return {
      ...LANGUAGE_REGISTRY['hi-IN'],
      confidence: 0.99,
      matchedBy: 'unicode_script',
    };
  }

  // Bengali script: \u0980-\u09FF
  if (/[\u0980-\u09FF]/.test(raw)) {
    return {
      ...LANGUAGE_REGISTRY['bn-IN'],
      confidence: 0.99,
      matchedBy: 'unicode_script',
    };
  }

  // Telugu script: \u0C00-\u0C7F
  if (/[\u0C00-\u0C7F]/.test(raw)) {
    return {
      ...LANGUAGE_REGISTRY['te-IN'],
      confidence: 0.99,
      matchedBy: 'unicode_script',
    };
  }

  // 2. Transliterated / Romanized Text Vocabulary Scoring
  const words = raw.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

  let hiScore = 0;
  let paScore = 0;
  let taScore = 0;
  let enScore = 0;

  for (const word of words) {
    if (HINDI_TRANSLITERATED.includes(word)) hiScore += 2;
    if (PUNJABI_TRANSLITERATED.includes(word)) paScore += 2;
    if (TAMIL_TRANSLITERATED.includes(word)) taScore += 2;
    if (ENGLISH_KEYWORDS.includes(word)) enScore += 1.5;
  }

  const maxScore = Math.max(hiScore, paScore, taScore, enScore);

  if (maxScore > 0) {
    if (taScore === maxScore && taScore > 1) {
      return {
        ...LANGUAGE_REGISTRY['ta-IN'],
        confidence: Math.min(0.95, 0.6 + taScore * 0.08),
        matchedBy: 'vocabulary',
      };
    }
    if (paScore === maxScore && paScore > 1) {
      return {
        ...LANGUAGE_REGISTRY['pa-IN'],
        confidence: Math.min(0.95, 0.6 + paScore * 0.08),
        matchedBy: 'vocabulary',
      };
    }
    if (hiScore === maxScore && hiScore > 1) {
      return {
        ...LANGUAGE_REGISTRY['hi-IN'],
        confidence: Math.min(0.95, 0.6 + hiScore * 0.08),
        matchedBy: 'vocabulary',
      };
    }
    if (enScore === maxScore) {
      return {
        ...LANGUAGE_REGISTRY['en-IN'],
        confidence: Math.min(0.95, 0.6 + enScore * 0.08),
        matchedBy: 'vocabulary',
      };
    }
  }

  // Default to English (India)
  return {
    ...LANGUAGE_REGISTRY['en-IN'],
    confidence: 0.8,
    matchedBy: 'default',
  };
}

/**
 * Spoken response generator in the patient's detected language
 */
export function getSpokenTriageResponse(department: string, langCode: string): string {
  switch (langCode) {
    case 'hi-IN':
    case 'hi':
      return `आपके लक्षणों के आधार पर, आपको ${department} ओपीडी में भेजा गया है।`;
    case 'pa-IN':
    case 'pa':
      return `ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ 'ਤੇ, ਤੁਹਾਨੂੰ ${department} ਓਪੀਡੀ ਵਿੱਚ ਭੇਜਿਆ ਗਿਆ ਹੈ।`;
    case 'ta-IN':
    case 'ta':
      return `உங்கள் அறிகுறிகளின் அடிப்படையில், நீங்கள் ${department} பிரிவுக்கு பரிந்துரைக்கப்படுகிறீர்கள்.`;
    case 'en-IN':
    case 'en':
    default:
      return `Based on your reported symptoms, you have been routed to the ${department} OPD.`;
  }
}
