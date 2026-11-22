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

export const FULL_PAGE_TRANSLATIONS: Record<string, string> = {
  // Navigation & Headers
  "Doctor OPD Consultation Desk": "डॉक्टर ओपीडी परामर्श डेस्क",
  "Doctor Directory & Room Assignment": "डॉक्टर निर्देशिका एवं कमरा आवंटन",
  "Clinical Roster Control": "क्लिनिकल रोस्टर नियंत्रण",
  "Clinical Roster Control • Firebase Connected": "क्लिनिकल रोस्टर नियंत्रण • फायरबेस कनेक्टेड",
  "Hospital Operations Command Admin": "अस्पताल संचालन कमान प्रशासन",
  "Counter & Triage Staff Management": "काउंटर एवं ट्राइएज स्टाफ प्रबंधन",
  "Operations Personnel": "अस्पताल संचालन स्टाफ",
  "Front Desk Registration & Triage": "पंजीकरण एवं ट्राइएज काउंटर",
  "Clinical Diagnostics & Laboratory": "क्लिनिकल डायग्नोस्टिक्स एवं लैब",
  "Jan Aushadhi Pharmacy Counter": "जन औषधि दवाखाना / केमिस्ट",
  "Hospital Operations Command": "अस्पताल संचालन कमान",
  "AI & Digital Twin Simulation": "एआई एवं डिजिटल ट्विन सिमुलेशन",
  "Digital Prescriptions": "डिजिटल दवा पर्चियां",
  "Laboratory Investigations": "प्रयोगशाला जांच आदेश",
  "Medicine Dispensing Orders": "दवा वितरण आदेश",
  "Patient Medical History": "मरीज़ का चिकित्सा इतिहास",
  "Smart Outpatient Queue": "स्मार्ट ओपीडी कतार",
  "Live Hospital Operations": "लाइव अस्पताल संचालन",
  "Live Clinical OPD Consultation Desk": "लाइव क्लिनिकल ओपीडी परामर्श डेस्क",
  "Smart Outpatient Queue & Real-Time Hospital Flow": "स्मार्ट ओपीडी कतार एवं लाइव अस्पताल संचालन",
  "Hospital SSO & Portal Authentication": "अस्पताल पोर्टल लॉगिन एवं प्रमाणीकरण",
  "Select Your Role:": "अपनी भूमिका चुनें:",

  // Sidebar Links
  "Overview Dashboard": "अवलोकन डैशबोर्ड",
  "Consultation Desk": "परामर्श डेस्क",
  "Patient Queue": "मरीज़ों की कतार",
  "Counter & Triage": "काउंटर एवं ट्राइएज",
  "Token Desk": "टोकन डेस्क",
  "Diagnostic Orders": "जांच आदेश",
  "Test Results": "जांच परिणाम",
  "Dispensary Queue": "दवा वितरण कतार",
  "Medicine Inventory": "दवा स्टॉक सूची",
  "Doctor Roster": "डॉक्टर रोस्टर",
  "Staff Roster": "स्टाफ रोस्टर",
  "Departments": "विभाग",
  "Resource Allocations": "संसाधन आवंटन",
  "Complaints & Grievances": "शिकायतें एवं निवारण",
  "Operations Command": "अस्पताल संचालन कमान",
  "Firebase Manager": "फायरबेस प्रबंधक",
  "AI & Digital Twin": "एआई एवं डिजिटल ट्विन",
  "Medical History": "चिकित्सा इतिहास",
  "Lab Tests": "लैब परीक्षण",
  "Pharmacy": "दवाखाना / केमिस्ट",
  "Notifications": "सूचनाएं",
  "Live Queue": "लाइव कतार",
  "Live Token Tracker": "लाइव टोकन ट्रैकर",
  "Book / OPD Slip": "ओपीडी पर्ची बनाएं",
  "Pharmacy Orders": "दवा वितरण आदेश",
  "Appointments": "अपॉइंटमेंट्स",
  "Patient Services": "मरीज़ सेवाएं",
  "Hospital Command": "अस्पताल कमान",

  // Action Buttons
  "Add New Doctor": "नया डॉक्टर जोड़ें",
  "Call Next Patient": "अगला मरीज़ बुलाएं",
  "Call Next": "अगला मरीज़ बुलाएं",
  "Complete Consultation": "परामर्श पूरा करें",
  "Skip Patient": "मरीज़ छोड़ें",
  "Save Doctor": "डॉक्टर सहेजें",
  "Save Doctor (role=\"doctor\")": "डॉक्टर सहेजें (role=\"doctor\")",
  "Toggle Shift": "शिफ्ट बदलें",
  "Review Details & Issue Token": "विवरण जांचें और टोकन बनाएं",
  "Print Official Prescription Slip": "आधिकारिक पर्ची प्रिंट करें",
  "Get WhatsApp Copy": "व्हाट्सएप कॉपी प्राप्त करें",
  "Sign In": "लॉग इन",
  "Sign Out": "लॉग आउट",
  "Register": "पंजीकरण",
  "Search": "खोजें",
  "Cancel": "रद्द करें",
  "Confirm": "पुष्टि करें",
  "Dismiss": "हटाएं",
  "Book OPD Token": "ओपीडी टोकन बुक करें",
  "Track Live Queue": "लाइव कतार देखें",
  "Try Voice OPD": "वॉयस ओपीडी आज़माएं",
  "Register Patient": "मरीज़ का पंजीकरण करें",
  "Clear & Retry": "हटाएं व पुनः प्रयास करें",
  "Speak Again": "पुनः बोलें",
  "Analyze & Assign Department": "जांचें और विभाग तय करें",
  "Proceed with this Department": "इस विभाग के साथ आगे बढ़ें",
  "Register & Assign Doctor (Firebase)": "डॉक्टर पंजीकरण एवं आवंटन (फायरबेस)",
  "Adding to Firebase...": "फायरबेस में सहेजा जा रहा है...",

  // Table & Form Headers
  "Doctor Name": "डॉक्टर का नाम",
  "Doctor Full Name": "डॉक्टर का पूरा नाम",
  "Doctor Email (Used for Login)": "डॉक्टर की ईमेल (लॉगिन हेतु)",
  "Doctor Email": "डॉक्टर की ईमेल",
  "Contact Phone": "संपर्क फोन",
  "Specialty / Department": "विशेषज्ञता / विभाग",
  "Specialty": "विशेषज्ञता",
  "Qualification": "योग्यता",
  "Assigned OPD Room": "आवंटित ओपीडी कमरा",
  "OPD Room": "ओपीडी कमरा",
  "Shift Timing": "शिफ्ट का समय",
  "Shift Hours": "शिफ्ट का समय",
  "Patient Load": "मरीज़ों का लोड",
  "Duty Status": "ड्यूटी की स्थिति",
  "Actions": "कार्य",
  "Token Number": "टोकन नंबर",
  "Token #": "टोकन #",
  "Patient Details": "मरीज़ का विवरण",
  "Symptoms": "लक्षण",
  "Priority": "प्राथमिकता",
  "Queue Status": "कतार की स्थिति",
  "Estimated Wait Time": "अनुमानित प्रतीक्षा समय",
  "Estimated Wait": "अनुमानित प्रतीक्षा",
  "Currently Serving": "वर्तमान में सेवारत",
  "Chief Complaints": "मुख्य समस्याएं / लक्षण",
  "Clinical Findings": "क्लिनिकल जांच निष्कर्ष",
  "Diagnosis": "निदान (रोग का नाम)",
  "Advice & Follow-up": "चिकित्सक सलाह व फॉलो-अप",
  "Advice": "सलाह",
  "Prescriptions": "दवा पर्ची",
  "Prescribed Medicines": "निर्धारित दवाइयां",
  "Medicine & Strength": "दवा एवं खुराक",
  "Medicine Name": "दवा का नाम",
  "Dosage": "खुराक",
  "Quantity": "मात्रा",
  "Consumption Timing": "दवा लेने का समय",
  "Stock Status": "स्टॉक स्थिति",
  "Available in Jan Aushadhi": "जन औषधि में उपलब्ध",
  "Instructions": "विशेष निर्देश",
  "Frequency": "आवृत्ति",
  "Duration": "अवधि",
  "Total Today": "आज कुल",
  "Pending Collection": "नमूना संग्रह लंबित",
  "In Analyzer": "मशीन में जांच जारी",
  "Reports Completed": "रिपोर्ट्स तैयार",
  "Total Prescriptions Today": "आज कुल दवा पर्चियां",
  "Queued for Packaging": "पैकिंग हेतु कतारबद्ध",
  "Currently Dispensing": "वितरित की जा रही हैं",
  "Ready at Counter": "काउंटर पर तैयार",
  "Assigned Desk": "आवंटित काउंटर",
  "Tokens Issued Today": "आज जारी टोकन",
  "Duty Shift": "ड्यूटी शिफ्ट",
  "Password": "पासवर्ड",
  "Doctor Security Clearance PIN": "डॉक्टर सुरक्षा पिन (Clearance PIN)",
  "Doctor Security PIN (4-Digits)": "डॉक्टर सुरक्षा पिन (4 अंक)",
  "Email Address / Username": "ईमेल पता / उपयोगकर्ता नाम",

  // Statuses & Priorities
  "Active": "सक्रिय",
  "On Break": "विश्राम पर",
  "In Session": "सत्र चालू",
  "Online": "ऑनलाइन",
  "Offline": "ऑफलाइन",
  "WAITING": "प्रतीक्षारत",
  "IN_CONSULTATION": "परामर्श जारी",
  "COMPLETED": "संपन्न",
  "SKIPPED": "छोड़ा गया",
  "PENDING": "लंबित",
  "PROCESSING": "प्रक्रिया में",
  "QUEUED": "कतारबद्ध",
  "READY_FOR_PICKUP": "वितरण हेतु तैयार",
  "DISPENSING": "वितरित किया जा रहा है",
  "Normal": "सामान्य",
  "Senior": "वरिष्ठ नागरिक",
  "Emergency": "आपातकालीन",
  "Pediatric": "बाल रोग",
  "Critical": "गंभीर",
  "Elevated": "अधिक भीड़",
  "Optimal": "सामान्य",
  "Overload": "अत्यधिक भीड़",

  // Departments
  "General Medicine": "सामान्य चिकित्सा",
  "Cardiology": "हृदय रोग विभाग",
  "Orthopedics": "हड्डी रोग विभाग",
  "Pediatrics": "बाल रोग विभाग",
  "Obstetrics & Gynecology": "प्रसूति एवं स्त्री रोग",
  "ENT & Head Neck": "कान, नाक, गला",
  "Emergency Trauma Care": "आपातकालीन ट्रौमा केयर",

  // Common UI words
  "Admin": "प्रशासक",
  "Doctor": "डॉक्टर",
  "Patient": "मरीज़",
  "Staff": "स्टाफ",
  "Lab": "लैब",
  "Chemist": "केमिस्ट",
  "Welcome,": "स्वागत है,",
  "Active OPD Token": "सक्रिय ओपीडी टोकन",
  "Hospital Map": "अस्पताल का नक्शा",
  "Voice OPD": "वॉयस ओपीडी",
  "Patient Full Name": "मरीज़ का पूरा नाम",
  "Mobile Phone (10 digits)": "मोबाइल फोन (10 अंक)",
  "Age (Years)": "उम्र (वर्ष)",
  "Gender": "लिंग",
  "Male": "पुरुष",
  "Female": "महिला",
  "Other": "अन्य",
  "After breakfast": "नाश्ते के बाद",
  "Before breakfast": "नाश्ते से पहले",
  "After lunch": "दोपहर के खाने के बाद",
  "Before dinner": "रात के खाने से पहले",
  "After dinner": "रात के खाने के बाद",
  "At bedtime": "सोते समय",
  "Once daily": "दिन में 1 बार",
  "Twice daily": "दिन में 2 बार",
  "Thrice daily": "दिन में 3 बार",
  "5 Days": "5 दिन",
  "3 Days": "3 दिन",
  "1 Tablet": "1 गोली",
  "Emergency Helplines": "आपातकालीन हेल्पलाइन"
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

    if (typeof window === 'undefined' || !document.body) return;

    // Full-page DOM Translation Engine:
    // Transforms the entire page text into Hindi when 'hi' is active,
    // and seamlessly restores original English text when 'en' is active.
    let observer: MutationObserver | null = null;

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node as Text;
        const text = textNode.nodeValue;
        if (!text || !text.trim()) return;

        // Skip script, style, code, pre, svg tags
        const parent = textNode.parentElement;
        if (parent) {
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'code', 'pre', 'svg', 'noscript'].includes(tag)) return;
        }

        // Store original English text if not already stored
        if ((textNode as any).__cf_orig === undefined) {
          (textNode as any).__cf_orig = text;
        }

        const trimmed = text.trim();
        if (FULL_PAGE_TRANSLATIONS[trimmed]) {
          textNode.nodeValue = text.replace(trimmed, FULL_PAGE_TRANSLATIONS[trimmed]);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();
        if (['script', 'style', 'code', 'pre', 'svg', 'noscript'].includes(tag)) return;

        // Translate placeholders
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          if (el.placeholder && el.placeholder.trim()) {
            if ((el as any).__cf_orig_placeholder === undefined) {
              (el as any).__cf_orig_placeholder = el.placeholder;
            }
            const pTrim = el.placeholder.trim();
            if (FULL_PAGE_TRANSLATIONS[pTrim]) {
              el.placeholder = FULL_PAGE_TRANSLATIONS[pTrim];
            }
          }
        }

        // Recurse into children
        node.childNodes.forEach(translateNode);
      }
    };

    const restoreNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node as Text;
        if ((textNode as any).__cf_orig !== undefined) {
          textNode.nodeValue = (textNode as any).__cf_orig;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if ((el as any).__cf_orig_placeholder !== undefined) {
          (el as HTMLInputElement).placeholder = (el as any).__cf_orig_placeholder;
        }
        node.childNodes.forEach(restoreNode);
      }
    };

    if (language === 'hi') {
      // 1. Initial full DOM tree scan
      translateNode(document.body);

      // 2. Continuous reactive observer for dynamic components/modals/updates
      observer = new MutationObserver((mutations) => {
        for (const mut of mutations) {
          if (mut.type === 'childList') {
            mut.addedNodes.forEach(translateNode);
          } else if (mut.type === 'characterData') {
            const textNode = mut.target as Text;
            const text = textNode.nodeValue;
            if (text && text.trim() && (textNode as any).__cf_orig === undefined) {
              (textNode as any).__cf_orig = text;
              const trimmed = text.trim();
              if (FULL_PAGE_TRANSLATIONS[trimmed]) {
                textNode.nodeValue = text.replace(trimmed, FULL_PAGE_TRANSLATIONS[trimmed]);
              }
            }
          }
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    } else {
      // Restore entire page to original English
      restoreNode(document.body);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
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
