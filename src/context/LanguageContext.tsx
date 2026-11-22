import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'hi' | 'pa';

interface LanguageContextType {
  language: SupportedLanguage;
  toggleLanguage: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = 'careflow_language';

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Navigation & Common
    'nav.home': 'Home',
    'nav.patient_services': 'Patient Services',
    'nav.hospital_command': 'Hospital Command',
    'nav.feedback': 'Feedback & Grievance',
    'nav.dashboard': 'Dashboard',
    'nav.queue': 'Smart Queue Tracker',
    'nav.book_opd': 'Book OPD',
    'nav.prescriptions': 'Prescriptions',
    'nav.lab_tests': 'Lab Tests',
    'nav.pharmacy': 'Pharmacy',
    'nav.medical_history': 'Medical Records',
    'nav.login': 'Portal Login',
    'nav.register': 'Register',
    'nav.logout': 'Sign Out',
    'nav.voice_opd': 'Voice OPD',
    'nav.voice_opd_sub': 'Voice OPD (बोलकर पर्ची बनाएं)',
    'nav.hospital_map': 'Hospital Map',
    'nav.emergency_helpline': 'Emergency Helplines',
    'nav.toll_free': 'Toll Free',

    // Patient Banner
    'patient.welcome': 'Welcome',
    'patient.patient_id': 'Patient ID',
    'patient.abha_id': 'ABHA ID',
    'patient.active_token': 'Active OPD Token',
    'patient.est_wait': 'Estimated Wait',
    'patient.view_queue': 'View Live Queue',

    // Landing Page Hero
    'landing.badge': 'Indian Civil & District Hospitals • Zero Queue Architecture',
    'landing.hero_title_1': 'Smarter Clinical Operations.',
    'landing.hero_title_2': 'Zero OPD Congestion.',
    'landing.hero_sub': 'CAREFLOW synchronizes patient registration, real-time OPD queuing, diagnostic laboratories, and Jan Aushadhi pharmacies into an intelligent, zero-friction clinical flow.',
    'landing.get_started': 'Get Started / Book Token',
    'landing.open_portal': 'Open Patient Portal',
    'landing.voice_kiosk_title': 'बोलकर पर्ची बनाएं (Voice OPD Kiosk)',
    'landing.voice_kiosk_sub': 'Hindi, Punjabi & English instant AI symptom triage',
    'landing.try_voice': 'Try Voice OPD',
    'landing.live_telemetry': 'Live Telemetry',
    'landing.hospital_ops': 'Civil Hospital Operations',
    'landing.serving_now': 'Serving Now',
    'landing.wait_time_today': 'Wait Time Today',
    'landing.active_in_queue': 'Active in Queue',
    'landing.ai_flow_health': 'AI Flow Health',
    'landing.active_consult_stream': 'Active Consultation Stream',
    'landing.view_public_tracker': 'View Public Live Tracker',

    // Stats
    'stats.patients_reg': 'Patients Registered',
    'stats.patients_sub': 'Across 18 participating government civil hospital clusters.',
    'stats.avg_wait': 'Average Wait Time',
    'stats.avg_wait_sub': 'Reduced from historical 145 min manual OPD physical queues.',
    'stats.connected_depts': 'Connected Departments',
    'stats.connected_depts_sub': 'General Medicine, Paediatrics, Ortho, Pathology, & Pharmacy.',
    'stats.sync_appointments': 'Appointments Synchronized',
    'stats.sync_sub': 'Zero lost tokens with automated SMS and multi-lingual voice alerts.',

    // Patient Journey
    'journey.badge': 'End-to-End Orchestration',
    'journey.title': 'The Intelligent Patient Journey',
    'journey.sub': 'Every step is connected digitally to eliminate physical counter crowds, confusion, and lost paperwork.',
    'journey.step1_title': 'Scan & AI Department Triage',
    'journey.step1_desc': 'Fast ABHA QR check-in or voice symptom triage in Hindi, Punjabi, or English to assign the correct OPD.',
    'journey.step2_title': 'Live Queue & Doctor Consultation',
    'journey.step2_desc': 'Dynamic token tracking on patient phone. Clinicians access digital records with one-click call next.',
    'journey.step3_title': 'Diagnostics & Jan Aushadhi',
    'journey.step3_desc': 'Lab investigations and medication orders automatically sync to pharmacy counters before the patient arrives.',
    'journey.step4_title': 'Digital Prescription & Feedback',
    'journey.step4_desc': 'Immediate SMS delivery of the digital prescription and automated satisfaction rating to the command desk.',

    // Solutions
    'solutions.badge': 'Enterprise Healthcare OS',
    'solutions.title': 'Modular Clinical Flow Architecture',
    'solutions.sub': 'A cohesive Bento-organized system connecting patients, clinicians, laboratories, pharmacists, and medical superintendents.',
    'solutions.card1_title': 'Patient Portal & Live Queue Tracker',
    'solutions.card1_sub': 'Patients monitor real-time queue position, accurate remaining wait time, doctor consultation state, and digitized prescriptions directly on their mobile browser without downloading an app.',
    'solutions.card2_title': 'Voice OPD Kiosk',
    'solutions.card2_sub': 'Patients speak their symptoms in Hindi, Punjabi, or English. The NLP engine translates chief complaints into ICD-11 categories and directs them to the exact clinic.',
    'solutions.card3_title': 'Doctor Live Consultation Desk',
    'solutions.card3_sub': 'High-speed clinician interface with Call Next, Skip, Complete, emergency triage jumps, and integrated lab order dispatch.',
    'solutions.card4_title': 'Jan Aushadhi & Lab Sync',
    'solutions.card4_sub': 'Real-time pharmacy inventory tracking and sample barcoding. Pharmacists pre-package prescriptions before patients exit the doctor’s office.',
    'solutions.card5_title': 'AI Digital Twin & Surge Forecast',
    'solutions.card5_sub': 'Predictive crowd surge forecasting and doctor workload simulations. Detects queue anomalies before congestion forms.',

    // Wayfinding
    'map.badge': 'Indoor Smart Compass',
    'map.banner_title': 'Never Get Lost in a Multi-Wing Government Hospital',
    'map.banner_desc': 'Color-coded navigation pins connect registration counters directly to OPD rooms, diagnostic laboratories, and Jan Aushadhi pharmacies. Scan QR markers outside any corridor to open real-time directions on your phone.',
    'map.open_btn': 'Open Hospital Interactive Map',
    'map.grievance_btn': 'Report a Queue Grievance',
    'map.abha_title': 'Ayushman ABHA Scan & Share',
    'map.abha_desc': '10-second instant token generation without waiting in registration counter lines',

    // Queue Tracker
    'queue.title': 'Smart Live OPD Queue Tracker',
    'queue.subtitle': 'Civil Hospital Ambala • Real-Time OPD Patient-Flow',
    'queue.your_token': 'Your Token',
    'queue.serving': 'Now Serving',
    'queue.est_wait_time': 'Estimated Wait',
    'queue.ahead': 'Patients Ahead',
    'queue.doctor_room': 'Consultation Room',
    'queue.audio_alert': 'Audio Chime Alerts Active',
    'queue.refresh': 'Refresh Queue',

    // Auth & Forms
    'auth.login_title': 'Hospital SSO & Portal Authentication',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.signin_btn': 'Sign In',
    'auth.register_title': 'Patient Portal Registration',
    'auth.fullname': 'Full Legal Name',
    'auth.mobile': 'Mobile Number',
    'auth.abha_number': 'ABHA Number / Health ID',
    'auth.create_account': 'Create Patient Account',
    'auth.have_account': 'Already registered? Sign In',

    // Footer
    'footer.mission': 'Empowering public healthcare delivery across Indian Civil, District, and Sub-divisional hospitals. Engineered for zero-queue congestion, synchronized OPD workflows, and explainable AI crowd prediction.',
    'footer.patient_portals': 'Patient Portals',
    'footer.hospital_command': 'Hospital Command',
    'footer.emergency_support': 'Emergency & Support',
    'footer.copyright': 'CAREFLOW (QFlip) Technologies. Designed for Government Health Clusters & Civil Hospitals.',
  },

  hi: {
    // Navigation & Common
    'nav.home': 'होम',
    'nav.patient_services': 'मरीज़ सेवाएं',
    'nav.hospital_command': 'अस्पताल कमांड',
    'nav.feedback': 'शिकायत एवं सुझाव',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.queue': 'स्मार्ट कतार ट्रैकर',
    'nav.book_opd': 'ओपीडी पर्ची बनाएं',
    'nav.prescriptions': 'दवा की पर्ची (Rx)',
    'nav.lab_tests': 'लैब टेस्ट रिपोर्ट',
    'nav.pharmacy': 'दवाखाना',
    'nav.medical_history': 'स्वास्थ्य रिकॉर्ड',
    'nav.login': 'लॉग इन',
    'nav.register': 'पंजीकरण',
    'nav.logout': 'लॉग आउट',
    'nav.voice_opd': 'बोलकर पर्ची बनाएं',
    'nav.voice_opd_sub': 'वॉयस ओपीडी (बोलकर पर्ची बनाएं)',
    'nav.hospital_map': 'अस्पताल का नक्शा',
    'nav.emergency_helpline': 'आपातकालीन हेल्पलाइन',
    'nav.toll_free': 'टोल फ्री',

    // Patient Banner
    'patient.welcome': 'स्वागत है',
    'patient.patient_id': 'मरीज़ आईडी',
    'patient.abha_id': 'आभा आईडी',
    'patient.active_token': 'सक्रिय ओपीडी टोकन',
    'patient.est_wait': 'अनुमानित प्रतीक्षा',
    'patient.view_queue': 'लाइव कतार देखें',

    // Landing Page Hero
    'landing.badge': 'भारतीय नागरिक एवं ज़िला अस्पताल • शून्य कतार प्रणाली',
    'landing.hero_title_1': 'बेहतर अस्पताल संचालन।',
    'landing.hero_title_2': 'शून्य ओपीडी भीड़ व प्रतीक्षा।',
    'landing.hero_sub': 'केयरफ्लो मरीज़ पंजीकरण, लाइव ओपीडी कतार, पैथोलॉजी लैब और जन औषधि केंद्र को एक सहज डिजिटल व्यवस्था में जोड़ता है।',
    'landing.get_started': 'शुरू करें / टोकन बनाएं',
    'landing.open_portal': 'मरीज़ पोर्टल खोलें',
    'landing.voice_kiosk_title': 'बोलकर पर्ची बनाएं (वॉयस ओपीडी कियोस्क)',
    'landing.voice_kiosk_sub': 'हिन्दी, पंजाबी और अंग्रेजी में बोलकर तुरंत सही विभाग में पर्ची बनाएं',
    'landing.try_voice': 'वॉयस ओपीडी आज़माएं',
    'landing.live_telemetry': 'लाइव संचालन स्थिति',
    'landing.hospital_ops': 'नागरिक अस्पताल संचालन',
    'landing.serving_now': 'वर्तमान में सेवारत',
    'landing.wait_time_today': 'आज का प्रतीक्षा समय',
    'landing.active_in_queue': 'कतार में मरीज़',
    'landing.ai_flow_health': 'प्रवाह स्वास्थ्य दर',
    'landing.active_consult_stream': 'सक्रिय परामर्श प्रवाह',
    'landing.view_public_tracker': 'लाइव कतार स्थिति देखें',

    // Stats
    'stats.patients_reg': 'पंजीकृत मरीज़',
    'stats.patients_sub': '18 भाग लेने वाले सरकारी ज़िला अस्पतालों में।',
    'stats.avg_wait': 'औसत प्रतीक्षा समय',
    'stats.avg_wait_sub': 'पारंपरिक 145 मिनट की भौतिक कतार से घटकर केवल 14 मिनट।',
    'stats.connected_depts': 'जुड़े हुए विभाग',
    'stats.connected_depts_sub': 'सामान्य चिकित्सा, बाल रोग, हड्डी रोग, पैथोलॉजी और जन औषधि।',
    'stats.sync_appointments': 'सफल परामर्श',
    'stats.sync_sub': 'स्वचालित एसएमएस और बहुभाषी कॉल अलर्ट के साथ 100% टोकन सुरक्षा।',

    // Patient Journey
    'journey.badge': 'डिजिटल स्वास्थ्य यात्रा',
    'journey.title': 'आसान व पारदर्शी मरीज़ यात्रा',
    'journey.sub': 'काउंटेरों पर भीड़, कागज़ी झंझट और भ्रम को पूरी तरह समाप्त करने के लिए प्रत्येक चरण डिजिटल रूप से जुड़ा है।',
    'journey.step1_title': 'स्कैन एवं विभाग निर्धारण',
    'journey.step1_desc': 'आभा क्यूआर कोड या हिन्दी/अंग्रेजी में बोलकर सही ओपीडी विभाग में तुरंत प्रवेश।',
    'journey.step2_title': 'लाइव कतार व डॉक्टर परामर्श',
    'journey.step2_desc': 'मोबाइल पर रियल-टाइम टोकन ट्रैकिंग। डॉक्टर डिजिटल ईएचआर के साथ एक-क्लिक में कॉल करते हैं।',
    'journey.step3_title': 'जांच लैब एवं जन औषधि',
    'journey.step3_desc': 'मरीज़ के पहुंचने से पहले ही जांच पर्ची और दवाइयां दवाखाने में तैयार हो जाती हैं।',
    'journey.step4_title': 'डिजिटल पर्चा एवं सुझाव',
    'journey.step4_desc': 'मोबाइल पर तत्काल डिजिटल पर्चे की प्राप्ति और अस्पताल सेवा पर नागरिक रेटिंग।',

    // Solutions
    'solutions.badge': 'अस्पताल ऑपरेटिंग सिस्टम',
    'solutions.title': 'एकीकृत क्लिनिकल मॉड्यूल',
    'solutions.sub': 'मरीज़ों, डॉक्टरों, लैब तकनीशियनों, फार्मासिस्टों और अस्पताल अधीक्षकों को जोड़ने वाली एकीकृत प्रणाली।',
    'solutions.card1_title': 'मरीज़ पोर्टल एवं लाइव टोकन ट्रैकर',
    'solutions.card1_sub': 'मरीज़ बिना कोई ऐप डाउनलोड किए अपने फ़ोन पर लाइव कतार स्थिति, प्रतीक्षित मिनट और डॉक्टर की उपलब्धता देख सकते हैं।',
    'solutions.card2_title': 'वॉयस ओपीडी कियोस्क',
    'solutions.card2_sub': 'मरीज़ अपनी भाषा में लक्षण बोलते हैं। एआई इंजन मुख्य समस्या को समझकर सही क्लिनिक आवंटित करता है।',
    'solutions.card3_title': 'डॉक्टर लाइव परामर्श डेस्क',
    'solutions.card3_sub': 'कॉल नेक्स्ट, स्किप, डिजिटल पर्चा और सीधे लैब जांच भेजने की तेज़ डॉक्टर प्रणाली।',
    'solutions.card4_title': 'जन औषधि केंद्र एवं लैब सिंक',
    'solutions.card4_sub': 'रियल-टाइम दवा स्टॉक और बारकोडिंग। मरीज़ के काउंटर पहुंचने से पहले दवाइयों की प्री-पैकिंग।',
    'solutions.card5_title': 'एआई भीड़ पूर्वानुमान एवं डिजिटल ट्विन',
    'solutions.card5_sub': 'अस्पताल में भीड़ का समय से पहले पूर्वानुमान और डॉक्टर ड्यूटी का उचित संतुलन।',

    // Wayfinding
    'map.badge': 'आंतरिक स्मार्ट दिशा-सूचक',
    'map.banner_title': 'बड़े सरकारी अस्पताल में अब कभी रास्ता न भटकें',
    'map.banner_desc': 'रंग-बिरंगे नेविगेशन पिन पंजीकरण काउंटर से ओपीडी कमरों, लैब और दवाखानों का सीधा रास्ता दिखाते हैं। कॉरिडोर में लगे क्यूआर कोड को स्कैन करें।',
    'map.open_btn': 'अस्पताल का इंटरैक्टिव नक्शा खोलें',
    'map.grievance_btn': 'कतार समस्या की शिकायत दर्ज करें',
    'map.abha_title': 'आयुष्मान आभा स्कैन एवं शेयर',
    'map.abha_desc': 'पंजीकरण काउंटर की लाइन में खड़े हुए बिना 10 सेकंड में तुरंत टोकन बनाएं',

    // Queue Tracker
    'queue.title': 'स्मार्ट लाइव ओपीडी कतार ट्रैकर',
    'queue.subtitle': 'नागरिक अस्पताल • रियल-टाइम ओपीडी मरीज़ प्रवाह',
    'queue.your_token': 'आपका टोकन',
    'queue.serving': 'वर्तमान टोकन',
    'queue.est_wait_time': 'अनुमानित प्रतीक्षा',
    'queue.ahead': 'आपसे आगे मरीज़',
    'queue.doctor_room': 'परामर्श कक्ष',
    'queue.audio_alert': 'ध्वनि घंटी चेतावनी सक्रिय',
    'queue.refresh': 'कतार रीफ्रेश करें',

    // Auth & Forms
    'auth.login_title': 'अस्पताल एसएसओ एवं पोर्टल लॉगिन',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.signin_btn': 'साइन इन करें',
    'auth.register_title': 'मरीज़ पोर्टल पंजीकरण',
    'auth.fullname': 'मरीज़ का पूरा नाम',
    'auth.mobile': 'मोबाइल नंबर (10 अंक)',
    'auth.abha_number': 'आभा नंबर / राष्ट्रीय स्वास्थ्य आईडी',
    'auth.create_account': 'नया मरीज़ खाता बनाएं',
    'auth.have_account': 'पहले से पंजीकृत हैं? साइन इन करें',

    // Footer
    'footer.mission': 'भारतीय नागरिक, ज़िला और उप-मंडल अस्पतालों में सरकारी स्वास्थ्य सेवा का सशक्तिकरण। शून्य कतार भीड़ और पारदर्शी ओपीडी प्रवाह के लिए निर्मित।',
    'footer.patient_portals': 'मरीज़ पोर्टल',
    'footer.hospital_command': 'अस्पताल कमांड',
    'footer.emergency_support': 'आपातकालीन सहायता',
    'footer.copyright': 'केयरफ्लो (क्यू-फ्लिप) टेक्नोलॉजीज। सरकारी स्वास्थ्य केंद्रों एवं नागरिक अस्पतालों के लिए विशेष रूप से निर्मित।',
  },

  pa: {
    // Navigation & Common
    'nav.home': 'ਮੁੱਖ ਪੰਨਾ',
    'nav.patient_services': 'ਮਰੀਜ਼ ਸੇਵਾਵਾਂ',
    'nav.hospital_command': 'ਹਸਪਤਾਲ ਕਮਾਂਡ',
    'nav.feedback': 'ਸ਼ਿਕਾਇਤ ਤੇ ਸੁਝਾਅ',
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.queue': 'ਲਾਈਵ ਕਤਾਰ ਟਰੈਕਰ',
    'nav.book_opd': 'ਓਪੀਡੀ ਪਰਚੀ ਬਣਾਓ',
    'nav.prescriptions': 'ਦਵਾਈ ਪਰਚੀਆਂ (Rx)',
    'nav.lab_tests': 'ਲੈਬ ਰਿਪੋਰਟਾਂ',
    'nav.pharmacy': 'ਦਵਾਈ ਘਰ',
    'nav.medical_history': 'ਸਿਹਤ ਰਿਕਾਰਡ',
    'nav.login': 'ਲਾਗ ਇਨ',
    'nav.register': 'ਰਜਿਸਟਰੇਸ਼ਨ',
    'nav.logout': 'ਲਾਗ ਆਊਟ',
    'nav.voice_opd': 'ਬੋਲ ਕੇ ਪਰਚੀ ਬਣਾਓ',
    'nav.voice_opd_sub': 'ਆਵਾਜ਼ ਰਾਹੀਂ ਓਪੀਡੀ (ਬੋਲ ਕੇ ਪਰਚੀ ਬਣਾਓ)',
    'nav.hospital_map': 'ਹਸਪਤਾਲ ਦਾ ਨਕਸ਼ਾ',
    'nav.emergency_helpline': 'ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ',
    'nav.toll_free': 'ਟੋਲ ਫ੍ਰੀ',

    // Patient Banner
    'patient.welcome': 'ਜੀ ਆਇਆਂ ਨੂੰ',
    'patient.patient_id': 'ਮਰੀਜ਼ ਆਈਡੀ',
    'patient.abha_id': 'ਆਭਾ ਆਈਡੀ',
    'patient.active_token': 'ਚਾਲੂ ਓਪੀਡੀ ਟੋਕਨ',
    'patient.est_wait': 'ਅੰਦਾਜ਼ਨ ਉਡੀਕ',
    'patient.view_queue': 'ਲਾਈਵ ਕਤਾਰ ਵੇਖੋ',

    // Landing Page Hero
    'landing.badge': 'ਸਿਵਲ ਤੇ ਜ਼ਿਲ੍ਹਾ ਹਸਪਤਾਲ • ਜ਼ੀਰੋ ਕਤਾਰ ਪ੍ਰਣਾਲੀ',
    'landing.hero_title_1': 'ਬਿਹਤਰ ਹਸਪਤਾਲ ਪ੍ਰਬੰਧ।',
    'landing.hero_title_2': 'ਬਿਨਾਂ ਲਾਈਨਾਂ ਓਪੀਡੀ ਸੇਵਾ।',
    'landing.hero_sub': 'ਕੇਅਰਫਲੋਅ ਮਰੀਜ਼ ਰਜਿਸਟ੍ਰੇਸ਼ਨ, ਲਾਈਵ ਓਪੀਡੀ ਕਤਾਰ, ਲੈਬ ਟੈਸਟਾਂ ਅਤੇ ਦਵਾਈਆਂ ਨੂੰ ਇੱਕ ਡਿਜੀਟਲ ਪ੍ਰਣਾਲੀ ਨਾਲ ਜੋੜਦਾ ਹੈ।',
    'landing.get_started': 'ਸ਼ੁਰੂ ਕਰੋ / ਟੋਕਨ ਲਵੋ',
    'landing.open_portal': 'ਮਰੀਜ਼ ਪੋਰਟਲ ਖੋਲ੍ਹੋ',
    'landing.voice_kiosk_title': 'ਬੋਲ ਕੇ ਪਰਚੀ ਬਣਾਓ (ਵੌਇਸ ਕਿਓਸਕ)',
    'landing.voice_kiosk_sub': 'ਪੰਜਾਬੀ, ਹਿੰਦੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਬੋਲ ਕੇ ਸਹੀ ਕਮਰੇ ਦੀ ਪਰਚੀ ਲਵੋ',
    'landing.try_voice': 'ਆਵਾਜ਼ ਰਾਹੀਂ ਪਰਚੀ ਅਜ਼ਮਾਓ',
    'landing.live_telemetry': 'ਲਾਈਵ ਸਥਿਤੀ',
    'landing.hospital_ops': 'ਸਿਵਲ ਹਸਪਤਾਲ ਕਾਰਜ',
    'landing.serving_now': 'ਇਸ ਵੇਲੇ ਸੇਵਾ ਅਧੀਨ',
    'landing.wait_time_today': 'ਅੱਜ ਦਾ ਉਡੀਕ ਸਮਾਂ',
    'landing.active_in_queue': 'ਕਤਾਰ ਵਿੱਚ ਮਰੀਜ਼',
    'landing.ai_flow_health': 'ਸਿਸਟਮ ਪ੍ਰਵਾਹ ਦਰ',
    'landing.active_consult_stream': 'ਡਾਕਟਰ ਸਲਾਹ ਲਾਈਵ',
    'landing.view_public_tracker': 'ਲਾਈਵ ਕਤਾਰ ਦੇਖੋ',

    // Stats
    'stats.patients_reg': 'ਰਜਿਸਟਰਡ ਮਰੀਜ਼',
    'stats.patients_sub': '18 ਸਰਕਾਰੀ ਜ਼ਿਲ੍ਹਾ ਹਸਪਤਾਲਾਂ ਵਿੱਚ।',
    'stats.avg_wait': 'ਔਸਤ ਉਡੀਕ ਸਮਾਂ',
    'stats.avg_wait_sub': 'ਪੁਰਾਣੇ 145 ਮਿੰਟ ਤੋਂ ਘਟ ਕੇ ਸਿਰਫ਼ 14 ਮਿੰਟ।',
    'stats.connected_depts': 'ਜੁੜੇ ਵਿਭਾਗ',
    'stats.connected_depts_sub': 'ਜਨਰਲ ਮੈਡੀਸਿਨ, ਬੱਚਿਆਂ ਦੇ ਰੋਗ, ਹੱਡੀਆਂ ਦੇ ਰੋਗ ਤੇ ਦਵਾਈ ਘਰ।',
    'stats.sync_appointments': 'ਸਫਲ ਮਰੀਜ਼ ਸੇਵਾ',
    'stats.sync_sub': 'ਆਟੋਮੈਟਿਕ ਐਸਐਮਐਸ ਤੇ ਆਵਾਜ਼ ਅਲਰਟ ਨਾਲ ਪੂਰੀ ਸੁਰੱਖਿਆ।',

    // Patient Journey
    'journey.badge': 'ਡਿਜੀਟਲ ਮਰੀਜ਼ ਯਾਤਰਾ',
    'journey.title': 'ਸੌਖੀ ਤੇ ਪਾਰਦਰਸ਼ੀ ਮਰੀਜ਼ ਯਾਤਰਾ',
    'journey.sub': 'ਕਾਊਂਟਰਾਂ ਦੀਆਂ ਲੰਬੀਆਂ ਲਾਈਨਾਂ ਤੇ ਭੀੜ ਨੂੰ ਖ਼ਤਮ ਕਰਨ ਲਈ ਹਰ ਕਦਮ ਆਨਲਾਈਨ ਹੈ।',
    'journey.step1_title': 'ਸਕੈਨ ਤੇ ਵਿਭਾਗ ਚੋਣ',
    'journey.step1_desc': 'ਆਭਾ ਕਿਊਆਰ ਸਕੈਨ ਜਾਂ ਪੰਜਾਬੀ ਵਿੱਚ ਬੋਲ ਕੇ ਤੁਰੰਤ ਵਿਭਾਗ ਦੀ ਚੋਣ।',
    'journey.step2_title': 'ਲਾਈਵ ਕਤਾਰ ਤੇ ਡਾਕਟਰੀ ਜਾਂਚ',
    'journey.step2_desc': 'ਫੋਨ ਉੱਤੇ ਆਪਣਾ ਨੰਬਰ ਦੇਖੋ। ਡਾਕਟਰ ਇੱਕ ਕਲਿੱਕ ਨਾਲ ਅਗਲਾ ਨੰਬਰ ਬੁਲਾਉਂਦੇ ਹਨ।',
    'journey.step3_title': 'ਲੈਬ ਟੈਸਟ ਤੇ ਜਨ ਔਸ਼ਧੀ',
    'journey.step3_desc': 'ਮਰੀਜ਼ ਦੇ ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਟੈਸਟ ਪਰਚੀ ਅਤੇ ਦਵਾਈਆਂ ਤਿਆਰ ਹੋ ਜਾਂਦੀਆਂ ਹਨ।',
    'journey.step4_title': 'ਡਿਜੀਟਲ ਪਰਚੀ ਤੇ ਫੀਡਬੈਕ',
    'journey.step4_desc': 'ਫੋਨ ਉੱਤੇ ਡਿਜੀਟਲ ਪਰਚੀ ਮਿਲਦੀ ਹੈ ਅਤੇ ਹਸਪਤਾਲ ਸੇਵਾ ਬਾਰੇ ਫੀਡਬੈਕ ਦਰਜ ਹੁੰਦੀ ਹੈ।',

    // Solutions
    'solutions.badge': 'ਹਸਪਤਾਲ ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ',
    'solutions.title': 'ਮਾਡਿਊਲਰ ਕਲੀਨਿਕਲ ਪ੍ਰਣਾਲੀ',
    'solutions.sub': 'ਮਰੀਜ਼ਾਂ, ਡਾਕਟਰਾਂ, ਲੈਬਾਂ ਤੇ ਫਾਰਮੇਸੀਆਂ ਨੂੰ ਜੋੜਨ ਵਾਲਾ ਇੱਕੋ ਇੱਕ ਮੰਚ।',
    'solutions.card1_title': 'ਮਰੀਜ਼ ਪੋਰਟਲ ਤੇ ਲਾਈਵ ਕਤਾਰ ਟਰੈਕਰ',
    'solutions.card1_sub': 'ਬਿਨਾਂ ਕੋਈ ਐਪ ਡਾਊਨਲੋਡ ਕੀਤੇ ਮੋਬਾਈਲ ਬ੍ਰਾਊਜ਼ਰ ਉੱਤੇ ਆਪਣਾ ਟੋਕਨ ਨੰਬਰ ਅਤੇ ਉਡੀਕ ਸਮਾਂ ਦੇਖੋ।',
    'solutions.card2_title': 'ਵੌਇਸ ਓਪੀਡੀ ਕਿਓਸਕ',
    'solutions.card2_sub': 'ਮਰੀਜ਼ ਪੰਜਾਬੀ ਜਾਂ ਹਿੰਦੀ ਵਿੱਚ ਬੋਲਦੇ ਹਨ, ਸਿਸਟਮ ਬਿਮਾਰੀ ਸਮਝ ਕੇ ਸਹੀ ਕਲੀਨਿਕ ਭੇਜਦਾ ਹੈ।',
    'solutions.card3_title': 'ਡਾਕਟਰ ਲਾਈਵ ਕੰਸਲਟੇਸ਼ਨ ਡੈਸਕ',
    'solutions.card3_sub': 'ਅਗਲਾ ਮਰੀਜ਼ ਬੁਲਾਓ, ਡਿਜੀਟਲ ਪਰਚੀ ਬਣਾਓ ਅਤੇ ਸਿੱਧੇ ਲੈਬ ਟੈਸਟ ਆਰਡਰ ਕਰੋ।',
    'solutions.card4_title': 'ਜਨ ਔਸ਼ਧੀ ਤੇ ਲੈਬ ਸਿੰਕ',
    'solutions.card4_sub': 'ਦਵਾਈਆਂ ਦਾ ਲਾਈਵ ਸਟਾਕ ਅਤੇ ਮਰੀਜ਼ ਦੇ ਕਾਊਂਟਰ ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਦਵਾਈਆਂ ਦੀ ਪੈਕਿੰਗ।',
    'solutions.card5_title': 'ਏਆਈ ਭੀੜ ਅਨੁਮਾਨ ਤੇ ਡਿਜੀਟਲ ਟਵਿਨ',
    'solutions.card5_sub': 'ਹਸਪਤਾਲ ਵਿੱਚ ਭੀੜ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਚੇਤਾਵਨੀ ਅਤੇ ਡਾਕਟਰਾਂ ਦੀ ਸਹੀ ਵੰਡ।',

    // Wayfinding
    'map.badge': 'ਅੰਦਰੂਨੀ ਸਮਾਰਟ ਦਿਸ਼ਾ ਸੂਚਕ',
    'map.banner_title': 'ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਵਿੱਚ ਹੁਣ ਕਦੇ ਰਾਹ ਨਾ ਭੁੱਲੋ',
    'map.banner_desc': 'ਰੰਗਦਾਰ ਨਕਸ਼ਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤੋਂ ਓਪੀਡੀ ਕਮਰਿਆਂ, ਲੈਬਾਂ ਤੇ ਦਵਾਈ ਘਰ ਦਾ ਸਿੱਧਾ ਰਸਤਾ ਦੱਸਦਾ ਹੈ।',
    'map.open_btn': 'ਹਸਪਤਾਲ ਦਾ ਨਕਸ਼ਾ ਖੋਲ੍ਹੋ',
    'map.grievance_btn': 'ਕਤਾਰ ਦੀ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    'map.abha_title': 'ਆਯੁਸ਼ਮਾਨ ਆਭਾ ਸਕੈਨ ਤੇ ਸ਼ੇਅਰ',
    'map.abha_desc': 'ਬਿਨਾਂ ਲਾਈਨ ਵਿੱਚ ਖੜ੍ਹੇ 10 ਸਕਿੰਟਾਂ ਵਿੱਚ ਆਪਣਾ ਓਪੀਡੀ ਟੋਕਨ ਬਣਾਓ',

    // Queue Tracker
    'queue.title': 'ਲਾਈਵ ਓਪੀਡੀ ਕਤਾਰ ਟਰੈਕਰ',
    'queue.subtitle': 'ਸਿਵਲ ਹਸਪਤਾਲ • ਲਾਈਵ ਮਰੀਜ਼ ਸਥਿਤੀ',
    'queue.your_token': 'ਤੁਹਾਡਾ ਟੋਕਨ',
    'queue.serving': 'ਚੱਲ ਰਿਹਾ ਟੋਕਨ',
    'queue.est_wait_time': 'ਅੰਦਾਜ਼ਨ ਉਡੀਕ',
    'queue.ahead': 'ਅੱਗੇ ਮਰੀਜ਼',
    'queue.doctor_room': 'ਕਮਰਾ ਨੰਬਰ',
    'queue.audio_alert': 'ਘੰਟੀ ਚੇਤਾਵਨੀ ਚਾਲੂ ਹੈ',
    'queue.refresh': 'ਕਤਾਰ ਤਾਜ਼ਾ ਕਰੋ',

    // Auth & Forms
    'auth.login_title': 'ਹਸਪਤਾਲ ਲਾਗ ਇਨ ਪੋਰਟਲ',
    'auth.email': 'ਈਮੇਲ ਪਤਾ',
    'auth.password': 'ਪਾਸਵਰਡ',
    'auth.signin_btn': 'ਸਾਈਨ ਇਨ ਕਰੋ',
    'auth.register_title': 'ਮਰੀਜ਼ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    'auth.fullname': 'ਮਰੀਜ਼ ਦਾ ਪੂਰਾ ਨਾਂ',
    'auth.mobile': 'ਮੋਬਾਈਲ ਨੰਬਰ',
    'auth.abha_number': 'ਆਭਾ ਨੰਬਰ / ਸਿਹਤ ਆਈਡੀ',
    'auth.create_account': 'ਖਾਤਾ ਬਣਾਓ',
    'auth.have_account': 'ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ? ਸਾਈਨ ਇਨ ਕਰੋ',

    // Footer
    'footer.mission': 'ਭਾਰਤੀ ਸਿਵਲ ਤੇ ਜ਼ਿਲ੍ਹਾ ਹਸਪਤਾਲਾਂ ਵਿੱਚ ਸਿਹਤ ਸੇਵਾਵਾਂ ਨੂੰ ਮਜ਼ਬੂਤ ਬਣਾਉਣਾ। ਜ਼ੀਰੋ ਕਤਾਰ ਭੀੜ ਲਈ ਸਮਰਪਿਤ।',
    'footer.patient_portals': 'ਮਰੀਜ਼ ਪੋਰਟਲ',
    'footer.hospital_command': 'ਹਸਪਤਾਲ ਕਮਾਂਡ',
    'footer.emergency_support': 'ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ',
    'footer.copyright': 'ਕੇਅਰਫਲੋਅ (ਕਿਊ-ਫਲਿੱਪ) ਟੈਕਨਾਲੋਜੀਜ਼। ਸਰਕਾਰੀ ਹਸਪਤਾਲਾਂ ਲਈ ਸਮਰਪਿਤ।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    return saved === 'hi' || saved === 'pa' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => {
      if (prev === 'en') return 'hi';
      if (prev === 'hi') return 'pa';
      return 'en';
    });
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English dict
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
