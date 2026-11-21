import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'hi';

interface LanguageContextType {
  language: SupportedLanguage;
  toggleLanguage: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = 'careflow_language';

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Top Bar & Navigation
    'emergency.title': 'Emergency Helplines',
    'emergency.112': '112 (National Emergency)',
    'emergency.108': '108 (Ambulance)',
    'emergency.102': '102 (Maternal & Child)',
    'nav.patient_services': 'Patient Services',
    'nav.hospital_command': 'Hospital Command',
    'nav.ai_digital_twin': 'AI & Digital Twin',
    'nav.feedback': 'Patient Grievance',
    'nav.voice_opd': 'Voice OPD',
    'nav.voice_opd_sub': 'Voice OPD (बोलकर पर्ची बनाएं)',
    'nav.hospital_map': 'Hospital Map',
    'nav.login': 'Sign In',
    'nav.register': 'Register',
    'nav.logout': 'Sign Out',
    'nav.switch_lang': 'हिन्दी',

    // Branding
    'branding.title': 'QFlip',
    'branding.sub': 'Health Logistics',

    // Voice Modal
    'voice.title': 'Voice-Based Multi-Lingual Symptom Intake',
    'voice.subtitle': 'Speak in English, Hindi, Punjabi, or Tamil to auto-triage to the right clinical department',
    'voice.listening': 'Listening... Speak clearly now',
    'voice.tap_to_speak': 'Tap Microphone to Speak',
    'voice.detected_lang': 'Detected Language',
    'voice.repeat': 'Speak Again',
    'voice.clear': 'Clear & Retry',
    'voice.transcript_label': 'Spoken Transcript & Verification (Edit if needed):',
    'voice.transcript_placeholder': 'Transcript will appear here as you speak, or type symptoms directly...',
    'voice.sample_prompts_title': 'Or Click a Sample Patient Voice Prompt:',
    'voice.analyze_btn': 'Analyze & Assign Department',
    'voice.cancel_btn': 'Cancel',
    'voice.triage_result_title': 'AI Clinical Triage Recommendation',
    'voice.recommended_dept': 'Recommended OPD Department:',
    'voice.urgency': 'Urgency Level:',
    'voice.proceed_btn': 'Proceed with this Department',
    'voice.disclaimer': 'AI operational triage assistance only. Does not replace registered doctor clinical judgment.',
    'voice.sample_hindi': 'मुझे 3 दिन से तेज़ बुखार है और गले में दर्द हो रहा है।',
    'voice.sample_english': 'Heavy chest congestion and sharp pain radiating to left shoulder.',
    'voice.sample_punjabi': 'ਮੇਰਾ ਗਿੱਟਾ ਮੁੜ ਗਿਆ ਸੀ ਤੇ ਚੱਲਣ ਵਿਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।',
    'voice.sample_pediatric': 'Baby has high persistent fever and crying continuously.',
    'voice.sample_tamil': 'எனக்கு 3 நாட்களாக கடுமையான காய்ச்சல் மற்றும் தொண்டை வலி உள்ளது.',

    // Hospital Map
    'map.title': 'Hospital Indoor Navigation & Wayfinding',
    'map.select_floor': 'Select Floor:',
    'map.ground_floor': 'Ground Floor (Triage, Reg, Lab, Pharmacy)',
    'map.first_floor': '1st Floor (General OPDs, Ortho, Peds)',
    'map.second_floor': '2nd Floor (Cardio, ICU, Admin)',
    'map.target': 'Target Department:',
    'map.edit_layout': 'Edit Map Layout',
    'map.save_layout': 'Save Layout',
    'map.reset_layout': 'Reset to Default',

    // Registration Page
    'reg.title': 'Online OPD Registration & Token Slip',
    'reg.subtitle': 'Civil Hospital • Ayushman Bharat Digital Mission (ABDM)',
    'reg.step_form': '1. Patient Details',
    'reg.step_review': '2. Review & Triage',
    'reg.step_slip': '3. OPD Slip',
    'reg.full_name': 'Patient Full Name',
    'reg.phone': 'Mobile Phone (10 digits)',
    'reg.age': 'Age (Years)',
    'reg.gender': 'Gender',
    'reg.priority': 'Priority Category',
    'reg.select_dept': 'Select Clinical Department',
    'reg.symptoms_title': 'Chief Symptoms (Click to Select / Multiple)',
    'reg.symptoms_desc': 'Describe Symptoms / Voice Transcript',
    'reg.submit_btn': 'Review Details & Issue Token',
    'reg.voice_btn': 'Voice Intake (बोलकर बताएं)',

    // Smart Queue Tracker
    'queue.title': 'Live OPD Token & Queue Status',
    'queue.token_number': 'Your Token Number',
    'queue.currently_serving': 'Currently Serving',
    'queue.estimated_wait': 'Estimated Wait Time',
    'queue.mins': 'mins',
    'queue.dept_room': 'Consultation Room',
    'queue.doctor_on_duty': 'Doctor on Duty',
    'queue.view_map': 'View Indoor Hospital Map',

    // Landing Page
    'landing.badge': 'Civil Hospital OPD & Patient-Flow Management System',
    'landing.hero_title': 'Smart Outpatient Queue & Real-Time Hospital Flow',
    'landing.hero_sub': 'Digitizing registrations, AI symptom triage, dynamic OPD queues, lab diagnostics, and pharmacy fulfillment across government hospital clusters.',
    'landing.book_opd': 'Book OPD Token',
    'landing.track_token': 'Track Live Queue',
    'landing.try_voice': 'Try Voice OPD',
    'landing.voice_banner_title': 'Voice OPD Booking (बोलकर पर्ची बनाएं)',
    'landing.voice_banner_sub': 'Speak in English, Hindi, Punjabi, or Tamil for instant clinical routing.',
  },
  hi: {
    // Top Bar & Navigation
    'emergency.title': 'आपातकालीन हेल्पलाइन',
    'emergency.112': '112 (राष्ट्रीय आपातकालीन सेवा)',
    'emergency.108': '108 (एम्बुलेंस आपात सेवा)',
    'emergency.102': '102 (मातृ एवं शिशु एम्बुलेंस)',
    'nav.patient_services': 'मरीज़ सेवाएं',
    'nav.hospital_command': 'अस्पताल कमांड',
    'nav.ai_digital_twin': 'एआई एवं डिजिटल ट्विन',
    'nav.feedback': 'मरीज़ शिकायत एवं सुझाव',
    'nav.voice_opd': 'वॉयस ओपीडी',
    'nav.voice_opd_sub': 'वॉयस ओपीडी (बोलकर पर्ची बनाएं)',
    'nav.hospital_map': 'अस्पताल का नक्शा',
    'nav.login': 'लॉग इन',
    'nav.register': 'पंजीकरण',
    'nav.logout': 'लॉग आउट',
    'nav.switch_lang': 'English',

    // Branding
    'branding.title': 'QFlip',
    'branding.sub': 'Health Logistics',

    // Voice Modal
    'voice.title': 'आवाज़ आधारित बहुभाषी लक्षण पहचान एवं ओपीडी पर्ची',
    'voice.subtitle': 'सही ओपीडी विभाग में भेजने के लिए हिन्दी, अंग्रेजी, पंजाबी या तमिल में बोलें',
    'voice.listening': 'सुन रहे हैं... कृपया स्पष्ट आवाज़ में बोलें',
    'voice.tap_to_speak': 'बोलने के लिए माइक पर क्लिक करें',
    'voice.detected_lang': 'पहचानी गई भाषा',
    'voice.repeat': 'पुनः बोलें',
    'voice.clear': 'हटाएं व पुनः प्रयास करें',
    'voice.transcript_label': 'बोले गए लक्षण एवं सत्यापन (यदि आवश्यक हो तो सुधारें):',
    'voice.transcript_placeholder': 'आपके बोलते ही लक्षण यहाँ दिखाई देंगे, या आप सीधे टाइप भी कर सकते हैं...',
    'voice.sample_prompts_title': 'या नीचे दिए गए मरीज़ आवाज़ उदाहरण पर क्लिक करें:',
    'voice.analyze_btn': 'लक्षण जांचें और विभाग निर्धारित करें',
    'voice.cancel_btn': 'रद्द करें',
    'voice.triage_result_title': 'एआई क्लिनिकल ट्राइएज सिफारिश',
    'voice.recommended_dept': 'अनुशंसित ओपीडी विभाग:',
    'voice.urgency': 'आपातकालीन स्तर:',
    'voice.proceed_btn': 'इस विभाग के साथ आगे बढ़ें',
    'voice.disclaimer': 'यह केवल एआई प्रशासनिक सहायता है। यह डॉक्टर के चिकित्सकीय निर्णय का स्थान नहीं लेता है।',
    'voice.sample_hindi': 'मुझे 3 दिन से तेज़ बुखार है और गले में दर्द हो रहा है।',
    'voice.sample_english': 'Heavy chest congestion and sharp pain radiating to left shoulder.',
    'voice.sample_punjabi': 'ਮੇਰਾ ਗਿੱਟਾ ਮੁੜ ਗਿਆ ਸੀ ਤੇ ਚੱਲਣ ਵਿਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।',
    'voice.sample_pediatric': 'Baby has high persistent fever and crying continuously.',
    'voice.sample_tamil': 'எனக்கு 3 நாட்களாக கடுமையான காய்ச்சல் மற்றும் தொண்டை வலி உள்ளது.',

    // Hospital Map
    'map.title': 'अस्पताल आंतरिक दिशा-निर्देश एवं नक्शा',
    'map.select_floor': 'मंज़िल चुनें:',
    'map.ground_floor': 'भूतल (ट्राइएज, पंजीकरण, लैब, दवाखाना)',
    'map.first_floor': 'प्रथम तल (सामान्य ओपीडी, हड्डी रोग, शिशु रोग)',
    'map.second_floor': 'द्वितीय तल (हृदय रोग, आईसीयू, प्रशासन)',
    'map.target': 'गंतव्य विभाग:',
    'map.edit_layout': 'नक्शा संपादित करें',
    'map.save_layout': 'नक्शा सहेजें',
    'map.reset_layout': 'डिफ़ॉल्ट पर रीसेट करें',

    // Registration Page
    'reg.title': 'ऑनलाइन ओपीडी पंजीकरण एवं टोकन पर्ची',
    'reg.subtitle': 'नागरिक अस्पताल • आयुष्मान भारत डिजिटल मिशन (ABDM)',
    'reg.step_form': '1. मरीज़ का विवरण',
    'reg.step_review': '2. जांच एवं पुष्टि',
    'reg.step_slip': '3. ओपीडी पर्ची',
    'reg.full_name': 'मरीज़ का पूरा नाम',
    'reg.phone': 'मोबाइल नंबर (10 अंक)',
    'reg.age': 'उम्र (वर्ष)',
    'reg.gender': 'लिंग',
    'reg.priority': 'प्राथमिकता श्रेणी',
    'reg.select_dept': 'चिकित्सा विभाग चुनें',
    'reg.symptoms_title': 'मुख्य लक्षण (चुनने के लिए क्लिक करें)',
    'reg.symptoms_desc': 'लक्षणों का विवरण / आवाज़ प्रतिलेख',
    'reg.submit_btn': 'विवरण जांचें और टोकन बनाएं',
    'reg.voice_btn': 'बोलकर विवरण भरें (वॉयस इनटेक)',

    // Smart Queue Tracker
    'queue.title': 'लाइव ओपीडी टोकन एवं कतार स्थिति',
    'queue.token_number': 'आपका टोकन नंबर',
    'queue.currently_serving': 'वर्तमान में सेवारत टोकन',
    'queue.estimated_wait': 'अनुमानित प्रतीक्षा समय',
    'queue.mins': 'मिनट',
    'queue.dept_room': 'परामर्श कक्ष',
    'queue.doctor_on_duty': 'ड्यूटी पर डॉक्टर',
    'queue.view_map': 'अस्पताल का आंतरिक नक्शा देखें',

    // Landing Page
    'landing.badge': 'नागरिक अस्पताल ओपीडी एवं मरीज़ प्रवाह प्रबंधन प्रणाली',
    'landing.hero_title': 'स्मार्ट ओपीडी कतार एवं लाइव अस्पताल संचालन',
    'landing.hero_sub': 'सरकारी अस्पतालों में पंजीकरण, एआई लक्षण ट्राइएज, डायनेमिक कतार, लैब परीक्षण और दवा वितरण का संपूर्ण डिजिटलीकरण।',
    'landing.book_opd': 'ओपीडी टोकन बनाएं',
    'landing.track_token': 'लाइव कतार देखें',
    'landing.try_voice': 'वॉयस ओपीडी आज़माएँ',
    'landing.voice_banner_title': 'वॉयस ओपीडी बुकिंग (बोलकर पर्ची बनाएं)',
    'landing.voice_banner_sub': 'हिन्दी, अंग्रेजी, पंजाबी या तमिल में बोलकर तुरंत सही विभाग में पर्ची बनाएं।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'hi' ? 'hi' : 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English dict if missing in Hindi
    if (translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
