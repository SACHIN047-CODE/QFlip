/**
 * CareFlow Gemini AI Voice Triage & Single-Prompt Booking Engine
 * Connects directly to Google Gemini 3.8 Flash via API Key
 * Grounded in CAREFLOW (QFlip) — AI Agent Knowledge Base PDF
 */

import { CAREFLOW_PDF_KNOWLEDGE_TEXT, PDF_FAQ_ITEMS } from './careflowPdfKnowledge';

export interface GeminiTriageResult {
  isEmergency: boolean;
  emergencyAdvice?: string;
  isFaqQuery: boolean;
  faqAnswer?: string;
  faqSource?: string;
  isBookingRequest: boolean;
  department: 'General Medicine' | 'Cardiology' | 'Orthopedics' | 'Pediatrics';
  doctor: string;
  room: string;
  extractedPatientName?: string;
  extractedPhone?: string;
  extractedAge?: number;
  extractedGender?: 'Male' | 'Female' | 'Other';
  symptoms: string[];
  priority: 'Normal' | 'Senior' | 'Emergency' | 'Pediatric';
  canAutoBook: boolean;
  explanation: string;
  spokenResponse: string;
}

const HOSPITAL_DOCTORS = [
  { department: 'General Medicine', doctor: 'Dr. Rahul Verma', room: 'OPD Room 101' },
  { department: 'Cardiology', doctor: 'Dr. Priya Singh', room: 'Room 201' },
  { department: 'Orthopedics', doctor: 'Dr. Karan Malhotra', room: 'Room 108' },
  { department: 'Pediatrics', doctor: 'Dr. Simran Kaur', room: 'Room 301' }
] as const;

export class GeminiTriageService {
  private static getApiKey(): string {
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  /**
   * Evaluates patient voice or chat prompt in a single turn using Gemini and RAG PDF Knowledge
   */
  public static async analyzeSinglePrompt(
    userPrompt: string,
    profileContext?: {
      name?: string;
      phone?: string;
      age?: number;
      gender?: 'Male' | 'Female' | 'Other';
      abhaId?: string;
    }
  ): Promise<GeminiTriageResult> {
    const apiKey = this.getApiKey();

    const systemInstruction = `You are CareFlow AI, the patient-facing hospital assistant for CAREFLOW (QFlip).
You MUST base your responses on the official CAREFLOW (QFlip) — AI Agent Knowledge Base PDF document provided below.

=== START OF OFFICIAL RAG KNOWLEDGE BASE PDF ===
${CAREFLOW_PDF_KNOWLEDGE_TEXT}
=== END OF OFFICIAL RAG KNOWLEDGE BASE PDF ===

Hospital OPD Doctors & Rooms:
1. General Medicine: Dr. Rahul Verma, OPD Room 101 (Ground Floor)
2. Cardiology: Dr. Priya Singh, Room 201 (Floor 1)
3. Orthopedics: Dr. Karan Malhotra, Room 108 (Ground Floor)
4. Pediatrics: Dr. Simran Kaur, Room 301 (Floor 2)

Patient Profile Context:
- Name in profile: "${profileContext?.name || ''}"
- Phone in profile: "${profileContext?.phone || ''}"
- Age in profile: ${profileContext?.age || 35}
- Gender in profile: "${profileContext?.gender || 'Male'}"

Instructions:
1. Check Emergencies (Section 1 of PDF):
   If the user describes chest pain, difficulty breathing, severe bleeding, unconsciousness, stroke signs, severe trauma:
   Set "isEmergency": true, do NOT book an appointment, and direct immediately to Emergency (Casualty Room 10) or call 108.
2. FAQ Questions from the PDF (Section 11, 4, 7, etc.):
   If the user asks an informational question (e.g. "Can I book without logging in?", "How do I get a token?", "Where does Dr. X sit?", "What if doctor is late?", "Is my data private?", "What are triage levels?"):
   Set "isFaqQuery": true, and provide the exact answer and section citation from the PDF in "faqAnswer" and "faqSource".
3. Symptom-to-Department Triage & Single-Prompt Booking (Section 6 & 9 of PDF):
   - Heart/chest discomfort (non-emergency) -> Cardiology (Dr. Priya Singh, Room 201)
   - Bone/joint/muscle pain -> Orthopedics (Dr. Karan Malhotra, Room 108)
   - Fever, cough, infection, general illness -> General Medicine (Dr. Rahul Verma, Room 101)
   - Child health -> Pediatrics (Dr. Simran Kaur, Room 301)
   - Add disclaimer: "A doctor will make the final assessment."
   - Extract patient name and phone number if spoken in prompt. If not in prompt, use profile context.
   - If either prompt or profile gives name & phone, set "canAutoBook": true.
4. Spoken Response:
   Provide a concise, friendly spoken response (1-2 sentences).

Respond ONLY with valid JSON matching this schema:
{
  "isEmergency": false,
  "emergencyAdvice": "",
  "isFaqQuery": false,
  "faqAnswer": "",
  "faqSource": "CAREFLOW AI Knowledge Base PDF Section 11",
  "isBookingRequest": true,
  "department": "General Medicine",
  "doctor": "Dr. Rahul Verma",
  "room": "OPD Room 101",
  "extractedPatientName": "",
  "extractedPhone": "",
  "extractedAge": 35,
  "extractedGender": "Male",
  "symptoms": ["fever", "cough"],
  "priority": "Normal",
  "canAutoBook": true,
  "explanation": "Symptoms match routine General Medicine consultation. A doctor will make the final assessment.",
  "spokenResponse": "I have routed your symptoms to Dr. Rahul Verma in General Medicine, Room 101, and booked your OPD token."
}`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${systemInstruction}\n\nUser Voice/Text Prompt: "${userPrompt}"`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // Normalize doctor and room
        const matchedDoc =
          HOSPITAL_DOCTORS.find(
            (d) => d.department.toLowerCase() === (parsed.department || '').toLowerCase()
          ) || HOSPITAL_DOCTORS[0];

        const patientName =
          parsed.extractedPatientName?.trim() ||
          profileContext?.name?.trim() ||
          '';
        const phone =
          parsed.extractedPhone?.trim() ||
          profileContext?.phone?.trim() ||
          '';

        return {
          isEmergency: Boolean(parsed.isEmergency),
          emergencyAdvice: parsed.emergencyAdvice || '',
          isFaqQuery: Boolean(parsed.isFaqQuery),
          faqAnswer: parsed.faqAnswer || '',
          faqSource: parsed.faqSource || 'CAREFLOW AI Agent Knowledge Base PDF',
          isBookingRequest: parsed.isBookingRequest !== false,
          department: matchedDoc.department,
          doctor: matchedDoc.doctor,
          room: matchedDoc.room,
          extractedPatientName: patientName,
          extractedPhone: phone,
          extractedAge: Number(parsed.extractedAge) || profileContext?.age || 35,
          extractedGender: parsed.extractedGender || profileContext?.gender || 'Male',
          symptoms:
            Array.isArray(parsed.symptoms) && parsed.symptoms.length > 0
              ? parsed.symptoms
              : [userPrompt],
          priority: (parsed.priority || 'Normal') as GeminiTriageResult['priority'],
          canAutoBook: Boolean(patientName && phone),
          explanation:
            parsed.explanation ||
            `Consultation with ${matchedDoc.doctor}. A doctor will make the final assessment.`,
          spokenResponse:
            parsed.spokenResponse ||
            `I have selected ${matchedDoc.doctor} in ${matchedDoc.department} (${matchedDoc.room}) for your symptoms.`
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed or timed out. Falling back to intelligent rule engine:', err);
    }

    // Fallback Rule Engine with PDF Knowledge if API is unreachable
    return this.fallbackRuleTriage(userPrompt, profileContext);
  }

  /**
   * Rule-based fallback grounded in PDF Knowledge
   */
  private static fallbackRuleTriage(
    prompt: string,
    profileContext?: {
      name?: string;
      phone?: string;
      age?: number;
      gender?: 'Male' | 'Female' | 'Other';
    }
  ): GeminiTriageResult {
    const lower = prompt.toLowerCase();

    // 1. Check emergency
    const emergencyWords = ['chest pain', 'heart attack', 'unconscious', 'severe bleeding', 'choking', 'stroke'];
    const isEmergency = emergencyWords.some((w) => lower.includes(w));
    if (isEmergency) {
      return {
        isEmergency: true,
        emergencyAdvice: 'Please proceed immediately to Civil Hospital Emergency Ward (Room 10) or call 108.',
        isFaqQuery: false,
        isBookingRequest: false,
        department: 'General Medicine',
        doctor: 'Dr. Rahul Verma',
        room: 'OPD Room 101',
        symptoms: [prompt],
        priority: 'Emergency',
        canAutoBook: false,
        explanation: 'Acute emergency symptoms detected.',
        spokenResponse: 'Emergency detected. Please rush immediately to Emergency Room 10 or dial 108.'
      };
    }

    // 2. Check PDF FAQ items
    for (const faq of PDF_FAQ_ITEMS) {
      if (faq.keywords.some((kw) => lower.includes(kw))) {
        return {
          isEmergency: false,
          isFaqQuery: true,
          faqAnswer: faq.answer,
          faqSource: `CAREFLOW AI Agent Knowledge Base PDF (${faq.section})`,
          isBookingRequest: false,
          department: 'General Medicine',
          doctor: 'Dr. Rahul Verma',
          room: 'OPD Room 101',
          symptoms: [],
          priority: 'Normal',
          canAutoBook: false,
          explanation: faq.answer,
          spokenResponse: faq.answer
        };
      }
    }

    // 3. Department matching
    let matched: (typeof HOSPITAL_DOCTORS)[number] = HOSPITAL_DOCTORS[0];
    let priority: GeminiTriageResult['priority'] = 'Normal';

    if (lower.includes('cardio') || lower.includes('heart') || lower.includes('palpitation') || lower.includes('bp')) {
      matched = HOSPITAL_DOCTORS[1];
    } else if (
      lower.includes('ortho') ||
      lower.includes('bone') ||
      lower.includes('knee') ||
      lower.includes('fracture') ||
      lower.includes('joint') ||
      lower.includes('back pain')
    ) {
      matched = HOSPITAL_DOCTORS[2];
    } else if (lower.includes('child') || lower.includes('baby') || lower.includes('pediatric') || lower.includes('infant')) {
      matched = HOSPITAL_DOCTORS[3];
      priority = 'Pediatric';
    }

    const phoneMatch = prompt.match(/\b\d{10}\b/);
    const phone = phoneMatch ? phoneMatch[0] : (profileContext?.phone || '');
    const patientName = profileContext?.name || '';

    return {
      isEmergency: false,
      isFaqQuery: false,
      isBookingRequest: true,
      department: matched.department,
      doctor: matched.doctor,
      room: matched.room,
      extractedPatientName: patientName,
      extractedPhone: phone,
      extractedAge: profileContext?.age || 35,
      extractedGender: profileContext?.gender || 'Male',
      symptoms: [prompt],
      priority,
      canAutoBook: Boolean(patientName && phone),
      explanation: `Matched symptoms to ${matched.department} (${matched.doctor}). A doctor will make the final assessment.`,
      spokenResponse: `I have routed your appointment to ${matched.doctor} in ${matched.department}, ${matched.room}.`
    };
  }
}
