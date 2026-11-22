/**
 * CareFlow OPD Knowledge Base & Grounded RAG Retriever Service
 * Grounded in Civil Hospital Ambala OPD Citizen Charter, Department Directory & Clinical Operations
 */

export interface KnowledgeDocument {
  id: string;
  category: 'timings' | 'departments' | 'preparation' | 'documents' | 'schemes' | 'general';
  title: string;
  content: string;
  source: string;
  keywords: string[];
}

export interface RagSearchResult {
  found: boolean;
  answer: string;
  source: string;
  category?: string;
  confidence: number;
  relatedQuestions: string[];
  suggestedAction?: 'book' | 'emergency' | 'helpdesk';
}

// Approved Grounded Knowledge Base
export const OPD_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: 'kb-timings-opd',
    category: 'timings',
    title: 'OPD Registration & Consultation Hours',
    content: 'General OPD registration counters operate Monday to Saturday from 8:00 AM to 1:00 PM. Clinical doctor consultations run from 9:00 AM to 2:00 PM. Special afternoon clinics (Diabetes, Geriatric, Ante-Natal Care) run from 2:00 PM to 4:00 PM. Emergency Trauma and Casualty services run 24x7 without interruption.',
    source: 'Civil Hospital Ambala OPD Citizen Charter 2026, Section 2.1',
    keywords: ['timings', 'time', 'hours', 'open', 'close', 'schedule', 'sunday', 'registration time', 'opd hours', 'when to visit']
  },
  {
    id: 'kb-dept-gen-med',
    category: 'departments',
    title: 'General Medicine Department & Doctors',
    content: 'General Medicine is located on the Ground Floor, Rooms 101, 102, and 103. Lead Consultant: Dr. Rahul Verma, MD. Manages fever, respiratory infections, hypertension, diabetes mellitus, infectious diseases, and routine health checkups.',
    source: 'Hospital Clinical Directory 2026, Ground Floor Block A',
    keywords: ['general medicine', 'medicine', 'dr rahul verma', 'fever', 'cough', 'cold', 'room 101', 'infection', 'diabetes']
  },
  {
    id: 'kb-dept-cardio',
    category: 'departments',
    title: 'Cardiology Department & Heart Clinic',
    content: 'Cardiology OPD is situated on the 1st Floor, Rooms 201 and 202. Lead Consultant: Dr. Priya Singh, DM Cardiology. Equipped with 12-lead ECG, 2D Echocardiography, and Holter monitoring. Regular clinics run Monday, Wednesday, and Friday 9:00 AM - 1:00 PM.',
    source: 'Hospital Clinical Directory 2026, 1st Floor Heart Wing',
    keywords: ['cardiology', 'heart', 'dr priya singh', 'bp', 'blood pressure', 'hypertension', 'ecg', 'room 201', 'chest discomfort']
  },
  {
    id: 'kb-dept-ortho',
    category: 'departments',
    title: 'Orthopedics & Joint Care',
    content: 'Orthopedics OPD is located on the Ground Floor, Rooms 108 and 109. Lead Surgeon: Dr. Karan Malhotra, MS Ortho. Specializes in fractures, osteoarthritis, spine care, joint replacement follow-ups, and plaster room services (Room 110).',
    source: 'Hospital Clinical Directory 2026, Ground Floor Trauma Wing',
    keywords: ['orthopedics', 'ortho', 'bone', 'joint', 'fracture', 'dr karan malhotra', 'knee pain', 'back pain', 'room 108']
  },
  {
    id: 'kb-dept-peds',
    category: 'departments',
    title: 'Pediatrics & Child Immunization Clinic',
    content: 'Pediatrics Department is on the 2nd Floor, Rooms 301 and 302. Lead Pediatrician: Dr. Simran Kaur, MD Pediatrics. Provides child wellness examinations, pediatric acute care, and National Immunization Schedule vaccines daily from 9:00 AM to 1:00 PM in Room 303.',
    source: 'Hospital Clinical Directory 2026, 2nd Floor Mother & Child Wing',
    keywords: ['pediatrics', 'peds', 'child', 'baby', 'dr simran kaur', 'vaccine', 'vaccination', 'immunization', 'room 301']
  },
  {
    id: 'kb-prep-fasting-tests',
    category: 'preparation',
    title: 'Fasting Guidelines for Pathology Lab Tests',
    content: 'Fasting Blood Sugar (FBS), Lipid Profile (Cholesterol/Triglycerides), and Liver Function Tests require 10 to 12 hours of overnight fasting. Only plain water is permitted. Routine Urine, Complete Blood Count (CBC), Kidney Function (KFT), and Thyroid (TSH) tests do not require strict fasting unless explicitly noted by your physician.',
    source: 'Central Pathology Laboratory Guidelines, Room 12 Ground Floor',
    keywords: ['fasting', 'empty stomach', 'blood test', 'sugar test', 'lipid profile', 'cholesterol', 'lab test preparation', 'water']
  },
  {
    id: 'kb-prep-ultrasound-xray',
    category: 'preparation',
    title: 'Radiology (Ultrasound & X-Ray) Preparation',
    content: 'Ultrasound Whole Abdomen or Pelvis requires a full urinary bladder: drink 1 litre of water 1 hour prior to scan without urinating. Upper abdomen ultrasound requires 4-6 hours fasting. Digital X-Rays require no fasting, but patients must remove all metal jewellery, zippers, or coins before scanning in Radiology Room 15.',
    source: 'Diagnostic Radiology Department SOP 2026',
    keywords: ['ultrasound', 'sonography', 'xray', 'x-ray', 'radiology', 'scan', 'preparation', 'full bladder']
  },
  {
    id: 'kb-docs-what-to-bring',
    category: 'documents',
    title: 'Required Documents for OPD Registration',
    content: 'Please bring: 1) Your 14-digit ABHA (Ayushman Bharat Health Account) ID card or QR code on your phone for instant express queue pass. 2) Government Photo ID (Aadhaar Card, Voter ID, or Driving License). 3) Previous OPD slips, prescription papers, and recent laboratory or radiology reports.',
    source: 'Patient Registration & ABHA Integration Manual 2026',
    keywords: ['documents', 'what to bring', 'abha', 'aadhaar', 'id proof', 'registration papers', 'old slip', 'records']
  },
  {
    id: 'kb-schemes-pmjay-jan-aushadhi',
    category: 'schemes',
    title: 'Ayushman Bharat (PM-JAY) & Jan Aushadhi Generic Pharmacy',
    content: 'Ayushman Bharat PM-JAY beneficiaries receive free consultations, diagnostic tests, and IPD coverage up to ₹5,00,000 per family per year at Helpdesk Counter #01. Pradhan Mantri Jan Aushadhi Generic Pharmacy is located at Counter #04 (Ground Floor Porch) offering quality generic medicines at 70% to 90% lower prices.',
    source: 'Hospital Welfare & Ayushman Kendra Office',
    keywords: ['ayushman', 'pmjay', 'free treatment', 'jan aushadhi', 'pharmacy', 'cheap medicines', 'generic', 'medicines counter']
  },
  {
    id: 'kb-human-helpdesk',
    category: 'general',
    title: 'Hospital Information & Patient Helpdesk',
    content: 'For direct assistance, lost slips, wheel-chair service, or grievance escalation, please visit Central Helpdesk Counter #01 at the Main Entrance Porch, or call our hospital helpline at 0171-2550100 (Ext. 101/102).',
    source: 'Civil Hospital Ambala Public Relations Desk',
    keywords: ['helpdesk', 'phone number', 'contact', 'customer care', 'wheelchair', 'lost slip', 'helpline', 'human agent', 'support']
  },
  // Grounded items from CAREFLOW (QFlip) — AI Agent Knowledge Base PDF
  {
    id: 'kb-pdf-faq-login',
    category: 'general',
    title: 'Can I book without logging in?',
    content: 'No. You must log in or register first before booking an appointment in CareFlow.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 11 (FAQ)',
    keywords: ['book without login', 'login required', 'register first', 'without account', 'guest booking']
  },
  {
    id: 'kb-pdf-faq-family',
    category: 'general',
    title: 'Can I book for a family member?',
    content: 'Only if they have their own patient profile; confirm their identity first. Registration staff can book for walk-in patients.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 11 (FAQ)',
    keywords: ['family', 'family member', 'book for someone else', 'book for child', 'book for relative', 'book for mother', 'book for father']
  },
  {
    id: 'kb-pdf-faq-token',
    category: 'general',
    title: 'How do I get a token?',
    content: 'A queue token is issued when you check in for your appointment or register as a walk-in at the hospital.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 11 (FAQ)',
    keywords: ['how do i get a token', 'token issue', 'walk in token', 'check in token', 'get token', 'token number']
  },
  {
    id: 'kb-pdf-faq-cancel',
    category: 'general',
    title: 'Can I cancel an appointment?',
    content: 'Yes, scheduled appointments can be cancelled. Completed appointments cannot be cancelled.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 11 (FAQ)',
    keywords: ['can i cancel', 'cancel appointment', 'cancellation', 'cancel booking']
  },
  {
    id: 'kb-pdf-faq-doctor-late',
    category: 'general',
    title: 'What if the doctor is late or absent?',
    content: 'Queue wait times update in real time; the registration desk can transfer you to another doctor in the department.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 11 (FAQ)',
    keywords: ['doctor late', 'doctor absent', 'doctor delayed', 'doctor not available', 'doctor not coming']
  },
  {
    id: 'kb-pdf-faq-pharmacy-lab',
    category: 'preparation',
    title: 'Where do I pick up medicines / get lab tests?',
    content: 'Pharmacy and laboratory are separate counters; prescriptions and lab requests created by the doctor appear in your account. Ask the registration desk for the exact location if the data does not list it.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 11 (FAQ)',
    keywords: ['pick up medicines', 'lab tests', 'pharmacy', 'laboratory', 'prescription', 'where to collect medicines']
  },
  {
    id: 'kb-pdf-faq-privacy',
    category: 'general',
    title: 'Is my data private and secure?',
    content: 'Yes. Access is role-based (RBAC) with JWT authentication and all medical records are strictly protected.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 11 (FAQ)',
    keywords: ['is my data private', 'data privacy', 'confidential', 'medical records protected', 'security', 'privacy']
  },
  {
    id: 'kb-pdf-queue-triage',
    category: 'general',
    title: 'Queue Ordering and Triage Levels',
    content: 'Queue ordering is by emergency priority first, then sequence. CareFlow uses three triage levels: Red (most urgent), Yellow (priority/moderate), and Green (routine). Real-time position and wait times update via Socket.IO.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 7 (Day-of-visit & Queue)',
    keywords: ['triage levels', 'red yellow green', 'triage color', 'queue ordering', 'priority', 'socket.io', 'wait time live']
  },
  {
    id: 'kb-pdf-doctor-location',
    category: 'departments',
    title: 'Where does a doctor sit? (Doctor Room and Floor Directory)',
    content: 'Dr. Rahul Verma (General Medicine) sits in Room 101, Ground Floor. Dr. Priya Singh (Cardiology) sits in Room 201, Floor 1. Dr. Karan Malhotra (Orthopedics) sits in Room 108, Ground Floor. Dr. Simran Kaur (Pediatrics) sits in Room 301, Floor 2. If room or floor is not listed, please consult the registration desk.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 4 (Where does Dr. X sit?)',
    keywords: ['where does doctor sit', 'which room is doctor', 'doctor location', 'doctor cabin', 'doctor floor', 'where to find doctor']
  },
  {
    id: 'kb-pdf-booking-rules',
    category: 'general',
    title: 'Appointment Booking Rules & Requirements',
    content: 'Required info: Patient, Department, Doctor, Date, Time slot, and Symptoms. Rules: Never book in the past, never double-book overlapping times, and do not exceed daily capacity. Booking status becomes scheduled.',
    source: 'CAREFLOW AI Knowledge Base PDF, Section 6 (How to book an appointment)',
    keywords: ['booking rules', 'how to book', 'required information', 'double booking', 'appointment rules']
  }
];

// Critical Red-Flag Emergency Symptoms
const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'stroke',
  'breathless',
  'cannot breathe',
  'severe breathing',
  'unconscious',
  'fainted',
  'heavy bleeding',
  'severe trauma',
  'seizure',
  'convulsion',
  'poisoning',
  'paralysis'
];

export const opdKnowledgeService = {
  /**
   * Check if query denotes a medical emergency
   */
  isEmergencyQuery(query: string): boolean {
    const q = query.toLowerCase();
    return EMERGENCY_KEYWORDS.some((kw) => q.includes(kw));
  },

  /**
   * Grounded RAG Search: Retrieves approved passages with citations
   */
  searchKnowledgeBase(query: string): RagSearchResult {
    const normalized = query.toLowerCase().trim();

    // 1. Safety Check: Emergency detection
    if (this.isEmergencyQuery(normalized)) {
      return {
        found: true,
        answer: 'EMERGENCY ALERT: Your message mentions acute critical symptoms. This virtual assistant is for routine OPD guidance only. Please do not wait for an OPD slot. Rush immediately to 24/7 Casualty & Emergency Trauma Wing (Ground Floor, Room 10) or dial National Ambulance Emergency at 108 immediately.',
        source: 'National Emergency Clinical Triage Protocol (Red Flag)',
        confidence: 1.0,
        suggestedAction: 'emergency',
        relatedQuestions: [
          'Where is the 24/7 Emergency Casualty?',
          'Call Emergency Ambulance 108',
          'Connect with Hospital Emergency Duty Officer'
        ]
      };
    }

    // 2. Score knowledge documents
    const queryWords = normalized.split(/\s+/).filter((w) => w.length > 2);
    let bestDoc: KnowledgeDocument | null = null;
    let maxScore = 0;

    for (const doc of OPD_KNOWLEDGE_BASE) {
      let score = 0;

      // Keyword matches (high weight)
      for (const kw of doc.keywords) {
        if (normalized.includes(kw)) {
          score += 4;
        }
      }

      // Title words match (medium weight)
      const titleLower = doc.title.toLowerCase();
      for (const word of queryWords) {
        if (titleLower.includes(word)) {
          score += 3;
        }
      }

      // Content words match (light weight)
      const contentLower = doc.content.toLowerCase();
      for (const word of queryWords) {
        if (contentLower.includes(word)) {
          score += 1;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestDoc = doc;
      }
    }

    // Threshold check (minimum score of 3 required for grounded citation)
    if (bestDoc && maxScore >= 3) {
      const related = OPD_KNOWLEDGE_BASE
        .filter((d) => d.id !== bestDoc!.id && (d.category === bestDoc!.category || Math.random() > 0.5))
        .slice(0, 3)
        .map((d) => d.title);

      return {
        found: true,
        answer: bestDoc.content,
        source: bestDoc.source,
        category: bestDoc.category,
        confidence: Math.min(1.0, maxScore / 10),
        relatedQuestions: related,
        suggestedAction: bestDoc.category === 'departments' ? 'book' : undefined
      };
    }

    // 3. Fallback when not covered in approved knowledge base
    return {
      found: false,
      answer: "I do not have a verified passage in the Civil Hospital Ambala OPD Charter for this specific inquiry. To ensure accurate hospital information, please speak with our Helpdesk Staff at Ground Floor Counter #01 or call 0171-2550100.",
      source: 'Civil Hospital Ambala Public Relations Desk',
      confidence: 0,
      suggestedAction: 'helpdesk',
      relatedQuestions: [
        'What are OPD registration timings?',
        'Which departments are available today?',
        'What documents should I bring for OPD registration?'
      ]
    };
  }
};
