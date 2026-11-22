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

export const FULL_PAGE_TRANSLATIONS_HI: Record<string, string> = {
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
  "Emergency Helplines": "आपातकालीन हेल्पलाइन",

  // Dashboard & Layout Titles
  "Operations Management": "अस्पताल संचालन प्रबंधन",
  "Civil Hospital Ambala • Integrated Clinical Health Stream": "सिविल अस्पताल अंबाला • एकीकृत क्लिनिकल हेल्थ स्ट्रीम",
  "Patient View": "मरीज़ दृश्य",
  "Voice Triage": "वॉयस ट्राइएज",
  "Logout": "लॉग आउट"
};

export const FULL_PAGE_TRANSLATIONS_PA: Record<string, string> = {
  // Navigation & Headers
  "Doctor OPD Consultation Desk": "ਡਾਕਟਰ ਓਪੀਡੀ ਸਲਾਹ ਡੈਸਕ",
  "Doctor Directory & Room Assignment": "ਡਾਕਟਰ ਡਾਇਰੈਕਟਰੀ ਅਤੇ ਕਮਰਾ ਵੰਡ",
  "Clinical Roster Control": "ਕਲੀਨਿਕਲ ਰੋਸਟਰ ਕੰਟਰੋਲ",
  "Clinical Roster Control • Firebase Connected": "ਕਲੀਨਿਕਲ ਰੋਸਟਰ ਕੰਟਰੋਲ • ਫਾਇਰਬੇਸ ਜੁੜਿਆ",
  "Hospital Operations Command Admin": "ਹਸਪਤਾਲ ਸੰਚਾਲਨ ਕਮਾਂਡ ਐਡਮਿਨ",
  "Counter & Triage Staff Management": "ਕਾਊਂਟਰ ਅਤੇ ਟ੍ਰਾਈਏਜ ਸਟਾਫ ਪ੍ਰਬੰਧਨ",
  "Operations Personnel": "ਹਸਪਤਾਲ ਸੰਚਾਲਨ ਸਟਾਫ",
  "Front Desk Registration & Triage": "ਫਰੰਟ ਡੈਸਕ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਟ੍ਰਾਈਏਜ",
  "Clinical Diagnostics & Laboratory": "ਕਲੀਨਿਕਲ ਟੈਸਟ ਅਤੇ ਲੈਬਾਰਟਰੀ",
  "Jan Aushadhi Pharmacy Counter": "ਜਨ ਔਸ਼ਧੀ ਦਵਾਈ ਘਰ / ਕੈਮਿਸਟ",
  "Hospital Operations Command": "ਹਸਪਤਾਲ ਸੰਚਾਲਨ ਕਮਾਂਡ",
  "AI & Digital Twin Simulation": "ਏਆਈ ਅਤੇ ਡਿਜੀਟਲ ਟਵਿਨ ਸਿਮੂਲੇਸ਼ਨ",
  "Digital Prescriptions": "ਡਿਜੀਟਲ ਦਵਾਈ ਪਰਚੀਆਂ",
  "Laboratory Investigations": "ਲੈਬਾਰਟਰੀ ਜਾਂਚ ਆਰਡਰ",
  "Medicine Dispensing Orders": "ਦਵਾਈ ਵੰਡ ਆਰਡਰ",
  "Patient Medical History": "ਮਰੀਜ਼ ਦਾ ਡਾਕਟਰੀ ਇਤਿਹਾਸ",
  "Smart Outpatient Queue": "ਸਮਾਰਟ ਓਪੀਡੀ ਕਤਾਰ",
  "Live Hospital Operations": "ਲਾਈਵ ਹਸਪਤਾਲ ਕਾਰਜ",
  "Live Clinical OPD Consultation Desk": "ਲਾਈਵ ਕਲੀਨਿਕਲ ਓਪੀਡੀ ਸਲਾਹ ਡੈਸਕ",
  "Smart Outpatient Queue & Real-Time Hospital Flow": "ਸਮਾਰਟ ਓਪੀਡੀ ਕਤਾਰ ਅਤੇ ਲਾਈਵ ਹਸਪਤਾਲ ਪ੍ਰਵਾਹ",
  "Hospital SSO & Portal Authentication": "ਹਸਪਤਾਲ ਪੋਰਟਲ ਲਾਗ ਇਨ ਅਤੇ ਪ੍ਰਮਾਣਿਕਤਾ",
  "Select Your Role:": "ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ:",

  // Sidebar Links
  "Overview Dashboard": "ਸੰਖੇਪ ਡੈਸ਼ਬੋਰਡ",
  "Consultation Desk": "ਸਲਾਹ ਡੈਸਕ",
  "Patient Queue": "ਮਰੀਜ਼ਾਂ ਦੀ ਕਤਾਰ",
  "Counter & Triage": "ਕਾਊਂਟਰ ਅਤੇ ਟ੍ਰਾਈਏਜ",
  "Token Desk": "ਟੋਕਨ ਡੈਸਕ",
  "Diagnostic Orders": "ਜਾਂਚ ਆਰਡਰ",
  "Test Results": "ਜਾਂਚ ਨਤੀਜੇ",
  "Dispensary Queue": "ਦਵਾਈ ਵੰਡ ਕਤਾਰ",
  "Medicine Inventory": "ਦਵਾਈ ਸਟਾਕ ਸੂਚੀ",
  "Doctor Roster": "ਡਾਕਟਰ ਰੋਸਟਰ",
  "Staff Roster": "ਸਟਾਫ ਰੋਸਟਰ",
  "Departments": "ਵਿਭਾਗ",
  "Resource Allocations": "ਸਰੋਤ ਵੰਡ",
  "Complaints & Grievances": "ਸ਼ਿਕਾਇਤਾਂ ਅਤੇ ਨਿਵਾਰਨ",
  "Operations Command": "ਹਸਪਤਾਲ ਸੰਚਾਲਨ ਕਮਾਂਡ",
  "Firebase Manager": "ਫਾਇਰਬੇਸ ਮੈਨੇਜਰ",
  "AI & Digital Twin": "ਏਆਈ ਅਤੇ ਡਿਜੀਟਲ ਟਵਿਨ",
  "Medical History": "ਡਾਕਟਰੀ ਇਤਿਹਾਸ",
  "Lab Tests": "ਲੈਬ ਟੈਸਟ",
  "Pharmacy": "ਦਵਾਈ ਘਰ / ਫਾਰਮੇਸੀ",
  "Notifications": "ਸੂਚਨਾਵਾਂ",
  "Live Queue": "ਲਾਈਵ ਕਤਾਰ",
  "Live Token Tracker": "ਲਾਈਵ ਟੋਕਨ ਟਰੈਕਰ",
  "Book / OPD Slip": "ਓਪੀਡੀ ਪਰਚੀ ਬਣਾਓ",
  "Pharmacy Orders": "ਦਵਾਈ ਆਰਡਰ",
  "Appointments": "ਮੁਲਾਕਾਤਾਂ (ਅਪਾਇੰਟਮੈਂਟ)",
  "Patient Services": "ਮਰੀਜ਼ ਸੇਵਾਵਾਂ",
  "Hospital Command": "ਹਸਪਤਾਲ ਕਮਾਂਡ",

  // Action Buttons
  "Add New Doctor": "ਨਵਾਂ ਡਾਕਟਰ ਸ਼ਾਮਲ ਕਰੋ",
  "Call Next Patient": "ਅਗਲਾ ਮਰੀਜ਼ ਬੁਲਾਓ",
  "Call Next": "ਅਗਲਾ ਮਰੀਜ਼ ਬੁਲਾਓ",
  "Complete Consultation": "ਸਲਾਹ-ਮਸ਼ਵਰਾ ਪੂਰਾ ਕਰੋ",
  "Skip Patient": "ਮਰੀਜ਼ ਛੱਡੋ",
  "Save Doctor": "ਡਾਕਟਰ ਸੇਵ ਕਰੋ",
  "Save Doctor (role=\"doctor\")": "ਡਾਕਟਰ ਸੇਵ ਕਰੋ (role=\"doctor\")",
  "Toggle Shift": "ਸ਼ਿਫਟ ਬਦਲੋ",
  "Review Details & Issue Token": "ਵੇਰਵੇ ਦੇਖੋ ਅਤੇ ਟੋਕਨ ਜਾਰੀ ਕਰੋ",
  "Print Official Prescription Slip": "ਸਰਕਾਰੀ ਪਰਚੀ ਪ੍ਰਿੰਟ ਕਰੋ",
  "Get WhatsApp Copy": "ਵ੍ਹੱਟਸਐਪ ਕਾਪੀ ਪ੍ਰਾਪਤ ਕਰੋ",
  "Sign In": "ਲਾਗ ਇਨ ਕਰੋ",
  "Sign Out": "ਲਾਗ ਆਊਟ",
  "Register": "ਰਜਿਸਟਰੇਸ਼ਨ",
  "Search": "ਖੋਜੋ",
  "Cancel": "ਰੱਦ ਕਰੋ",
  "Confirm": "ਪੁਸ਼ਟੀ ਕਰੋ",
  "Dismiss": "ਹਟਾਓ",
  "Book OPD Token": "ਓਪੀਡੀ ਟੋਕਨ ਬੁੱਕ ਕਰੋ",
  "Track Live Queue": "ਲਾਈਵ ਕਤਾਰ ਦੇਖੋ",
  "Try Voice OPD": "ਆਵਾਜ਼ ਰਾਹੀਂ ਪਰਚੀ ਅਜ਼ਮਾਓ",
  "Register Patient": "ਮਰੀਜ਼ ਰਜਿਸਟਰ ਕਰੋ",
  "Clear & Retry": "ਸਾਫ਼ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
  "Speak Again": "ਦੁਬਾਰਾ ਬੋਲੋ",
  "Analyze & Assign Department": "ਜਾਂਚੋ ਅਤੇ ਵਿਭਾਗ ਤੈਅ ਕਰੋ",
  "Proceed with this Department": "ਇਸ ਵਿਭਾਗ ਨਾਲ ਅੱਗੇ ਵਧੋ",
  "Register & Assign Doctor (Firebase)": "ਡਾਕਟਰ ਰਜਿਸਟਰ ਅਤੇ ਵੰਡ (ਫਾਇਰਬੇਸ)",
  "Adding to Firebase...": "ਫਾਇਰਬੇਸ ਵਿੱਚ ਜੋੜਿਆ ਜਾ ਰਿਹਾ ਹੈ...",

  // Table & Form Headers
  "Doctor Name": "ਡਾਕਟਰ ਦਾ ਨਾਂ",
  "Doctor Full Name": "ਡਾਕਟਰ ਦਾ ਪੂਰਾ ਨਾਂ",
  "Doctor Email (Used for Login)": "ਡਾਕਟਰ ਈਮੇਲ (ਲਾਗਇਨ ਲਈ)",
  "Doctor Email": "ਡਾਕਟਰ ਈਮੇਲ",
  "Contact Phone": "ਸੰਪਰਕ ਫ਼ੋਨ",
  "Specialty / Department": "ਮਾਹਰਤਾ / ਵਿਭਾਗ",
  "Specialty": "ਮਾਹਰਤਾ",
  "Qualification": "ਯੋਗਤਾ",
  "Assigned OPD Room": "ਅਲਾਟ ਕੀਤਾ ਓਪੀਡੀ ਕਮਰਾ",
  "OPD Room": "ਓਪੀਡੀ ਕਮਰਾ",
  "Shift Timing": "ਸ਼ਿਫਟ ਦਾ ਸਮਾਂ",
  "Shift Hours": "ਸ਼ਿਫਟ ਦਾ ਸਮਾਂ",
  "Patient Load": "ਮਰੀਜ਼ਾਂ ਦਾ ਭਾਰ",
  "Duty Status": "ਡਿਊਟੀ ਸਥਿਤੀ",
  "Actions": "ਕਾਰਵਾਈਆਂ",
  "Token Number": "ਟੋਕਨ ਨੰਬਰ",
  "Token #": "ਟੋਕਨ #",
  "Patient Details": "ਮਰੀਜ਼ ਦੇ ਵੇਰਵੇ",
  "Symptoms": "ਲੱਛਣ",
  "Priority": "ਤਰਜੀਹ",
  "Queue Status": "ਕਤਾਰ ਦੀ ਸਥਿਤੀ",
  "Estimated Wait Time": "ਅੰਦਾਜ਼ਨ ਉਡੀਕ ਸਮਾਂ",
  "Estimated Wait": "ਅੰਦਾਜ਼ਨ ਉਡੀਕ",
  "Currently Serving": "ਇਸ ਵੇਲੇ ਸੇਵਾ ਅਧੀਨ",
  "Chief Complaints": "ਮੁੱਖ ਸਮੱਸਿਆਵਾਂ / ਲੱਛਣ",
  "Clinical Findings": "ਡਾਕਟਰੀ ਜਾਂਚ ਦੇ ਨਤੀਜੇ",
  "Diagnosis": "ਰੋਗ ਦੀ ਪਛਾਣ (ਨਿਦਾਨ)",
  "Advice & Follow-up": "ਡਾਕਟਰੀ ਸਲਾਹ ਅਤੇ ਫਾਲੋ-ਅੱਪ",
  "Advice": "ਸਲਾਹ",
  "Prescriptions": "ਦਵਾਈ ਪਰਚੀ",
  "Prescribed Medicines": "ਤਜਵੀਜ਼ ਕੀਤੀਆਂ ਦਵਾਈਆਂ",
  "Medicine & Strength": "ਦਵਾਈ ਅਤੇ ਖੁਰਾਕ",
  "Medicine Name": "ਦਵਾਈ ਦਾ ਨਾਂ",
  "Dosage": "ਖੁਰਾਕ",
  "Quantity": "ਮਾਤਰਾ",
  "Consumption Timing": "ਦਵਾਈ ਲੈਣ ਦਾ ਸਮਾਂ",
  "Stock Status": "ਸਟਾਕ ਸਥਿਤੀ",
  "Available in Jan Aushadhi": "ਜਨ ਔਸ਼ਧੀ ਵਿੱਚ ਉਪਲਬਧ",
  "Instructions": "ਖ਼ਾਸ ਹਦਾਇਤਾਂ",
  "Frequency": "ਵਾਰ-ਵਾਰਤਾ",
  "Duration": "ਮਿਆਦ",
  "Total Today": "ਅੱਜ ਕੁੱਲ",
  "Pending Collection": "ਸੈਂਪਲ ਇਕੱਠਾ ਕਰਨਾ ਬਾਕੀ",
  "In Analyzer": "ਮਸ਼ੀਨ ਵਿੱਚ ਜਾਂਚ ਅਧੀਨ",
  "Reports Completed": "ਰਿਪੋਰਟਾਂ ਤਿਆਰ",
  "Total Prescriptions Today": "ਅੱਜ ਕੁੱਲ ਦਵਾਈ ਪਰਚੀਆਂ",
  "Queued for Packaging": "ਪੈਕਿੰਗ ਲਈ ਕਤਾਰ ਵਿੱਚ",
  "Currently Dispensing": "ਦਵਾਈਆਂ ਦਿੱਤੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ",
  "Ready at Counter": "ਕਾਊਂਟਰ ਉੱਤੇ ਤਿਆਰ",
  "Assigned Desk": "ਅਲਾਟ ਕੀਤਾ ਕਾਊਂਟਰ",
  "Tokens Issued Today": "ਅੱਜ ਜਾਰੀ ਕੀਤੇ ਟੋਕਨ",
  "Duty Shift": "ਡਿਊਟੀ ਸ਼ਿਫਟ",
  "Password": "ਪਾਸਵਰਡ",
  "Doctor Security Clearance PIN": "ਡਾਕਟਰ ਸੁਰੱਖਿਆ ਪਿੰਨ (Security PIN)",
  "Doctor Security PIN (4-Digits)": "ਡਾਕਟਰ ਸੁਰੱਖਿਆ ਪਿੰਨ (4 ਅੰਕ)",
  "Email Address / Username": "ਈਮੇਲ ਪਤਾ / ਯੂਜ਼ਰਨੇਮ",

  // Statuses & Priorities
  "Active": "ਸਰਗਰਮ",
  "On Break": "ਬਰੇਕ 'ਤੇ",
  "In Session": "ਸੈਸ਼ਨ ਚਾਲੂ",
  "Online": "ਆਨਲਾਈਨ",
  "Offline": "ਆਫ਼ਲਾਈਨ",
  "WAITING": "ਉਡੀਕ ਵਿੱਚ",
  "IN_CONSULTATION": "ਸਲਾਹ ਜਾਰੀ",
  "COMPLETED": "ਮੁਕੰਮਲ",
  "SKIPPED": "ਛੱਡਿਆ ਗਿਆ",
  "PENDING": "ਬਕਾਇਆ",
  "PROCESSING": "ਪ੍ਰਕਿਰਿਆ ਅਧੀਨ",
  "QUEUED": "ਕਤਾਰ ਵਿੱਚ",
  "READY_FOR_PICKUP": "ਲੈਣ ਲਈ ਤਿਆਰ",
  "DISPENSING": "ਵੰਡਿਆ ਜਾ ਰਿਹਾ ਹੈ",
  "Normal": "ਆਮ",
  "Senior": "ਬਜ਼ੁਰਗ ਨਾਗਰਿਕ",
  "Emergency": "ਐਮਰਜੈਂਸੀ",
  "Pediatric": "ਬਾਲ ਰੋਗ",
  "Critical": "ਗੰਭੀਰ",
  "Elevated": "ਵਧੀ ਹੋਈ ਭੀੜ",
  "Optimal": "ਸਧਾਰਨ",
  "Overload": "ਬਹੁਤ ਜ਼ਿਆਦਾ ਭੀੜ",

  // Departments
  "General Medicine": "ਜਨਰਲ ਮੈਡੀਸਿਨ (ਆਮ ਰੋਗ)",
  "Cardiology": "ਦਿਲ ਦੇ ਰੋਗਾਂ ਦਾ ਵਿਭਾਗ",
  "Orthopedics": "ਹੱਡੀਆਂ ਦੇ ਰੋਗਾਂ ਦਾ ਵਿਭਾਗ",
  "Pediatrics": "ਬੱਚਿਆਂ ਦੇ ਰੋਗਾਂ ਦਾ ਵਿਭਾਗ",
  "Obstetrics & Gynecology": "ਜੱਚਾ-ਬੱਚਾ ਤੇ ਇਸਤਰੀ ਰੋਗ",
  "ENT & Head Neck": "ਕੰਨ, ਨੱਕ ਅਤੇ ਗਲਾ",
  "Emergency Trauma Care": "ਐਮਰਜੈਂਸੀ ਟਰਾਮਾ ਕੇਅਰ",

  // Common UI words
  "Admin": "ਪ੍ਰਬੰਧਕ (ਐਡਮਿਨ)",
  "Doctor": "ਡਾਕਟਰ",
  "Patient": "ਮਰੀਜ਼",
  "Staff": "ਸਟਾਫ",
  "Lab": "ਲੈਬ",
  "Chemist": "ਕੈਮਿਸਟ",
  "Welcome,": "ਜੀ ਆਇਆਂ ਨੂੰ,",
  "Active OPD Token": "ਚਾਲੂ ਓਪੀਡੀ ਟੋਕਨ",
  "Hospital Map": "ਹਸਪਤਾਲ ਦਾ ਨਕਸ਼ਾ",
  "Voice OPD": "ਆਵਾਜ਼ ਰਾਹੀਂ ਓਪੀਡੀ",
  "Patient Full Name": "ਮਰੀਜ਼ ਦਾ ਪੂਰਾ ਨਾਂ",
  "Mobile Phone (10 digits)": "ਮੋਬਾਈਲ ਫ਼ੋਨ (10 ਅੰਕ)",
  "Age (Years)": "ਉਮਰ (ਸਾਲ)",
  "Gender": "ਲਿੰਗ",
  "Male": "ਪੁਰਸ਼",
  "Female": "ਮਹਿਲਾ",
  "Other": "ਹੋਰ",
  "After breakfast": "ਨਾਸ਼ਤੇ ਤੋਂ ਬਾਅਦ",
  "Before breakfast": "ਨਾਸ਼ਤੇ ਤੋਂ ਪਹਿਲਾਂ",
  "After lunch": "ਦੁਪਹਿਰ ਦੇ ਖਾਣੇ ਤੋਂ ਬਾਅਦ",
  "Before dinner": "ਰਾਤ ਦੇ ਖਾਣੇ ਤੋਂ ਪਹਿਲਾਂ",
  "After dinner": "ਰਾਤ ਦੇ ਖਾਣੇ ਤੋਂ ਬਾਅਦ",
  "At bedtime": "ਸੌਣ ਵੇਲੇ",
  "Once daily": "ਦਿਨ ਵਿੱਚ 1 ਵਾਰ",
  "Twice daily": "ਦਿਨ ਵਿੱਚ 2 ਵਾਰ",
  "Thrice daily": "ਦਿਨ ਵਿੱਚ 3 ਵਾਰ",
  "5 Days": "5 ਦਿਨ",
  "3 Days": "3 ਦਿਨ",
  "1 Tablet": "1 ਗੋਲੀ",
  "Emergency Helplines": "ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ",

  // Dashboard & Layout Titles
  "Operations Management": "ਹਸਪਤਾਲ ਸੰਚਾਲਨ ਪ੍ਰਬੰਧਨ",
  "Civil Hospital Ambala • Integrated Clinical Health Stream": "ਸਿਵਲ ਹਸਪਤਾਲ ਅੰਬਾਲਾ • ਏਕੀਕ੍ਰਿਤ ਕਲੀਨਿਕਲ ਹੈਲਥ ਸਟ੍ਰੀਮ",
  "Patient View": "ਮਰੀਜ਼ ਦ੍ਰਿਸ਼",
  "Voice Triage": "ਆਵਾਜ਼ ਰਾਹੀਂ ਜਾਂਚ",
  "Logout": "ਲਾਗ ਆਊਟ"
};

// Aliased export for backwards compatibility
export const FULL_PAGE_TRANSLATIONS = FULL_PAGE_TRANSLATIONS_HI;

// Auto-generate universal reverse dictionary for (Hindi | Punjabi) -> English restoration
const REVERSE_TRANSLATIONS: Record<string, string> = {};
for (const [enKey, hiVal] of Object.entries(FULL_PAGE_TRANSLATIONS_HI)) {
  if (hiVal && typeof hiVal === 'string') {
    REVERSE_TRANSLATIONS[hiVal.trim()] = enKey.trim();
  }
}
for (const [enKey, paVal] of Object.entries(FULL_PAGE_TRANSLATIONS_PA)) {
  if (paVal && typeof paVal === 'string') {
    REVERSE_TRANSLATIONS[paVal.trim()] = enKey.trim();
  }
}

/**
 * Universal text translation function:
 * Converts any string (whether currently English, Hindi, or Punjabi) into the desired target language.
 */
export const translateText = (text: string, targetLang: SupportedLanguage): string => {
  if (!text) return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  // Resolve root English key
  const enKey = REVERSE_TRANSLATIONS[trimmed] || (FULL_PAGE_TRANSLATIONS_HI[trimmed] ? trimmed : (FULL_PAGE_TRANSLATIONS_PA[trimmed] ? trimmed : null));

  if (targetLang === 'en') {
    if (enKey) {
      return text.replace(trimmed, enKey);
    }
    return text;
  }

  const dict = targetLang === 'hi' ? FULL_PAGE_TRANSLATIONS_HI : FULL_PAGE_TRANSLATIONS_PA;

  if (enKey && dict[enKey]) {
    return text.replace(trimmed, dict[enKey]);
  }
  if (dict[trimmed]) {
    return text.replace(trimmed, dict[trimmed]);
  }

  return text;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved === 'hi' || saved === 'pa' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;

    if (typeof window === 'undefined' || !document.body) return;

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

        const newText = translateText(text, language);
        if (newText !== text) {
          textNode.nodeValue = newText;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();
        if (['script', 'style', 'code', 'pre', 'svg', 'noscript'].includes(tag)) return;

        // Translate placeholders
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          if (el.placeholder && el.placeholder.trim()) {
            const newPh = translateText(el.placeholder, language);
            if (newPh !== el.placeholder) {
              el.placeholder = newPh;
            }
          }
        }

        // Recurse into children
        node.childNodes.forEach(translateNode);
      }
    };

    // 1. Initial complete DOM tree scan & instant translation
    translateNode(document.body);

    // 2. Continuous reactive observer for dynamic components/modals/updates
    observer = new MutationObserver((mutations) => {
      for (const mut of mutations) {
        if (mut.type === 'childList') {
          mut.addedNodes.forEach(translateNode);
        } else if (mut.type === 'characterData') {
          const textNode = mut.target as Text;
          const text = textNode.nodeValue;
          if (text && text.trim()) {
            const newText = translateText(text, language);
            if (newText !== text) {
              textNode.nodeValue = newText;
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

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
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
