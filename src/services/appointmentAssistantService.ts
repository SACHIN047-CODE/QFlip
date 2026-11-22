/**
 * CareFlow Voice & Chat OPD Appointment Assistant Service
 * Connects Google Gemini 3.8 Flash AI and RAG knowledge base to the live queue system
 * Supports Single-Prompt Instant Voice/Chat OPD Booking
 */

import { queueService } from './queueService';
import { opdKnowledgeService, RagSearchResult } from './opdKnowledgeService';
import { GeminiTriageService } from './geminiTriageService';
import { PatientToken, PriorityLevel } from '../types';

export type AssistantFlowStep =
  | 'WELCOME'
  | 'AWAIT_INTENT'
  | 'BOOK_SELECT_DEPT'
  | 'BOOK_SELECT_SLOT'
  | 'BOOK_COLLECT_PATIENT'
  | 'BOOK_AVAILABILITY_CHECK'
  | 'BOOK_REVIEW_CONFIRMATION'
  | 'BOOK_COMPLETED'
  | 'LOOKUP_EXISTING'
  | 'RESCHEDULE_SLOT'
  | 'CANCEL_CONFIRM'
  | 'FAQ_ANSWER'
  | 'EMERGENCY_ESCALATION'
  | 'HELPDESK_HANDOFF';

export interface BookingDraft {
  department: string;
  assignedDoctorName: string;
  roomNumber: string;
  slot: string;
  date: string;
  patientName: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  abhaId?: string;
  symptoms: string[];
  priority: PriorityLevel;
}

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user' | 'system';
  text: string;
  timestamp: string;
  step?: AssistantFlowStep;
  ragResult?: RagSearchResult;
  bookingDraft?: BookingDraft;
  createdToken?: PatientToken;
  quickReplies?: string[];
  actionType?: 'confirm_booking' | 'view_tracker' | 'call_108' | 'helpdesk';
}

export interface AssistantState {
  step: AssistantFlowStep;
  messages: ChatMessage[];
  bookingDraft: BookingDraft;
  activeToken?: PatientToken | null;
  isListening: boolean;
  isSpeaking: boolean;
  speechAudioEnabled: boolean;
}

export const INITIAL_BOOKING_DRAFT: BookingDraft = {
  department: 'General Medicine',
  assignedDoctorName: 'Dr. Rahul Verma',
  roomNumber: 'OPD Room 101',
  slot: 'Morning (09:00 AM - 11:30 AM)',
  date: 'Today',
  patientName: '',
  phone: '',
  age: 35,
  gender: 'Male',
  abhaId: '',
  symptoms: [],
  priority: 'Normal'
};

export const DEPARTMENT_OPTIONS = [
  { name: 'General Medicine', doctor: 'Dr. Rahul Verma', room: 'OPD Room 101', waitMins: 18 },
  { name: 'Cardiology', doctor: 'Dr. Priya Singh', room: 'Room 201', waitMins: 22 },
  { name: 'Orthopedics', doctor: 'Dr. Karan Malhotra', room: 'Room 108', waitMins: 28 },
  { name: 'Pediatrics', doctor: 'Dr. Simran Kaur', room: 'Room 301', waitMins: 14 }
];

export const TIME_SLOTS = [
  'Today Morning (09:00 AM - 11:30 AM)',
  'Today Afternoon (11:30 AM - 02:00 PM)',
  'Tomorrow Morning (09:00 AM - 11:30 AM)',
  'Tomorrow Afternoon (11:30 AM - 02:00 PM)'
];

export const appointmentAssistantService = {
  createInitialState(userName?: string, userPhone?: string, userAbha?: string): AssistantState {
    const draft: BookingDraft = {
      ...INITIAL_BOOKING_DRAFT,
      patientName: userName || '',
      phone: userPhone || '',
      abhaId: userAbha || ''
    };

    const initialMsg: ChatMessage = {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am your CareFlow AI OPD Assistant powered by Google Gemini.\n\n✨ **Single-Prompt OPD Booking Active:** Just describe your problem (e.g., *"I have severe fever and headache, please book an appointment"*) and I will match you with the right doctor and book your live OPD token instantly.\n\nYou can also ask me any questions about hospital policies, doctor availability, room locations, or queue tokens based on our official Knowledge Base.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      step: 'AWAIT_INTENT',
      quickReplies: [
        '🤒 High fever & body ache',
        '🫀 Chest discomfort or palpitations',
        '🦴 Severe knee / joint pain',
        '❓ Can I book without logging in?',
        '🎫 How do I get a token?',
        '⏰ Hospital Timings & Fasting Rules'
      ]
    };

    return {
      step: 'AWAIT_INTENT',
      messages: [initialMsg],
      bookingDraft: draft,
      activeToken: null,
      isListening: false,
      isSpeaking: false,
      speechAudioEnabled: true
    };
  },

  /**
   * Process a user turn (spoken or typed) and progress conversational state machine
   */
  async processTurn(
    rawInput: string,
    state: AssistantState
  ): Promise<{ nextState: AssistantState; assistantResponseText: string }> {
    const input = rawInput.trim();
    const lower = input.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp
    };

    const updatedMessages = [...state.messages, userMsg];
    let nextStep: AssistantFlowStep = state.step;
    let nextDraft: BookingDraft = { ...state.bookingDraft };
    let assistantReply = '';
    let quickReplies: string[] = [];
    let ragResult: RagSearchResult | undefined = undefined;
    let createdToken: PatientToken | undefined = undefined;
    let actionType: ChatMessage['actionType'] = undefined;

    // 2. Global Safety / Emergency Check
    if (opdKnowledgeService.isEmergencyQuery(lower)) {
      nextStep = 'EMERGENCY_ESCALATION';
      assistantReply =
        '🚨 EMERGENCY ALERT: Your message describes acute critical symptoms. This assistant cannot diagnose or provide clinical treatment. Please rush immediately to Civil Hospital 24/7 Trauma Emergency (Ground Floor, Room 10) or dial 108 for an ambulance.';
      actionType = 'call_108';
      quickReplies = ['Call 108 Ambulance', 'Locate Emergency Casualty', 'Connect to On-Call Doctor'];

      const assistMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: assistantReply,
        timestamp,
        step: nextStep,
        actionType,
        quickReplies
      };

      return {
        nextState: { ...state, step: nextStep, messages: [...updatedMessages, assistMsg] },
        assistantResponseText: assistantReply
      };
    }

    // 3. Human Handoff Intent
    if (
      lower.includes('human') ||
      lower.includes('agent') ||
      lower.includes('staff') ||
      lower.includes('helpdesk') ||
      lower.includes('talk to someone')
    ) {
      nextStep = 'HELPDESK_HANDOFF';
      assistantReply =
        'I am transferring you to hospital support staff. You can reach the central patient assistance desk at Ground Floor Porch Counter #01 or call 0171-2550100. Our staff is available Monday-Saturday 8:00 AM - 4:00 PM.';
      actionType = 'helpdesk';
      quickReplies = ['📅 Book an Appointment instead', '⏰ Check OPD Hours', 'Main Menu'];

      const assistMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: assistantReply,
        timestamp,
        step: nextStep,
        actionType,
        quickReplies
      };

      return {
        nextState: { ...state, step: nextStep, messages: [...updatedMessages, assistMsg] },
        assistantResponseText: assistantReply
      };
    }

    // 4. State Machine Progression
    switch (state.step) {
      case 'AWAIT_INTENT':
      case 'WELCOME': {
        // Token lookup or reschedule
        if (
          lower.includes('check') ||
          lower.includes('reschedule') ||
          lower.includes('cancel') ||
          (lower.includes('token') && !lower.includes('book') && !lower.includes('how do i get a token'))
        ) {
          nextStep = 'LOOKUP_EXISTING';
          assistantReply =
            'Please provide your Token Number (e.g. OPD-GEN-101) or registered mobile number to look up your booking.';
          quickReplies = ['OPD-GEN-101', 'OPD-GEN-102', '+91 98765 43101', 'Cancel'];
          break;
        }

        // Bare "book" without symptoms
        if (
          (lower === 'book' || lower === 'book appointment' || lower === '📅 book an appointment') &&
          !nextDraft.symptoms.length
        ) {
          assistantReply =
            'Please describe your symptoms or medical concern (by voice or text), and I will match the right doctor and book your OPD token in one step!';
          quickReplies = [
            '🤒 High fever & body ache',
            '🫀 Chest discomfort or palpitations',
            '🦴 Severe knee / joint pain',
            '👶 Child has fever and cough'
          ];
          break;
        }

        // ✨ SINGLE-PROMPT VOICE & CHAT OPD BOOKING & RAG POWERED BY GEMINI
        const triage = await GeminiTriageService.analyzeSinglePrompt(input, {
          name: nextDraft.patientName,
          phone: nextDraft.phone,
          age: nextDraft.age,
          gender: nextDraft.gender,
          abhaId: nextDraft.abhaId
        });

        // 1. If it's a PDF FAQ / Informational query
        if (triage.isFaqQuery && triage.faqAnswer) {
          nextStep = 'FAQ_ANSWER';
          assistantReply = triage.faqAnswer;
          ragResult = {
            found: true,
            answer: triage.faqAnswer,
            source: triage.faqSource || 'CAREFLOW AI Agent Knowledge Base PDF',
            confidence: 1.0,
            relatedQuestions: [
              'Can I book without logging in?',
              'How do I get a token?',
              'Where do I pick up medicines?',
              'Can I cancel an appointment?'
            ]
          };
          quickReplies = ['📅 Book an Appointment', '⏰ Hospital Timings', '🏥 Speak with Helpdesk'];
          break;
        }

        if (triage.isEmergency) {
          nextStep = 'EMERGENCY_ESCALATION';
          assistantReply = `🚨 **EMERGENCY ALERT**: ${
            triage.emergencyAdvice ||
            'Please rush immediately to Civil Hospital 24/7 Trauma Emergency (Ground Floor, Room 10) or dial 108 for an ambulance.'
          }`;
          actionType = 'call_108';
          quickReplies = ['Call 108 Ambulance', 'Locate Emergency Casualty'];
          break;
        }

        // Populate booking draft
        nextDraft.department = triage.department;
        nextDraft.assignedDoctorName = triage.doctor;
        nextDraft.roomNumber = triage.room;
        nextDraft.symptoms = triage.symptoms;
        nextDraft.priority = triage.priority;
        if (triage.extractedPatientName) nextDraft.patientName = triage.extractedPatientName;
        if (triage.extractedPhone) nextDraft.phone = triage.extractedPhone;
        if (triage.extractedAge) nextDraft.age = triage.extractedAge;
        if (triage.extractedGender) nextDraft.gender = triage.extractedGender;

        // If patient name & phone are known (from profile or prompt), BOOK IMMEDIATELY IN 1 TURN!
        if (nextDraft.patientName && nextDraft.phone) {
          try {
            const token = await queueService.createToken({
              patientName: nextDraft.patientName,
              phone: nextDraft.phone,
              age: nextDraft.age || 35,
              gender: nextDraft.gender || 'Male',
              abhaId: nextDraft.abhaId,
              department: nextDraft.department,
              symptoms: nextDraft.symptoms,
              priority: nextDraft.priority || 'Normal'
            });

            createdToken = token;
            nextStep = 'BOOK_COMPLETED';
            assistantReply = `🎉 **OPD Appointment Confirmed in 1 Prompt!**\n\n${triage.explanation}\n\n• **Token Number:** **${token.tokenNumber}**\n• **Doctor:** **${triage.doctor}** (${triage.room})\n• **Department:** ${triage.department}\n• **Patient:** ${nextDraft.patientName} (${nextDraft.phone})\n• **Estimated Wait:** ~${token.estimatedWaitMinutes} mins\n\nPlease arrive 15 minutes before your consultation and present this Token # at ${triage.room}.`;
            quickReplies = ['Track My Token Live', 'Book Another Appointment', 'Hospital Timings'];
            actionType = 'view_tracker';
          } catch (err: any) {
            assistantReply = `Sorry, could not complete instant booking: ${
              err.message || 'Capacity limit reached'
            }. Would you like to select an alternate department or slot?`;
            quickReplies = ['General Medicine', 'Cardiology', 'Orthopedics', 'Speak with Helpdesk'];
            nextStep = 'BOOK_SELECT_DEPT';
          }
        } else {
          // If guest patient without profile name/phone, collect details to complete
          nextStep = 'BOOK_COLLECT_PATIENT';
          assistantReply = `I have matched your symptoms to **${triage.doctor}** in **${triage.department}** (${triage.room}).\n\nPlease enter the **Patient's Full Name** and **10-digit Mobile Number** to confirm and issue your live OPD Token.`;
          quickReplies = ['Rohan Kumar, 9876543210', 'Sunita Devi, 9812345678'];
        }
        break;
      }

      case 'BOOK_SELECT_DEPT': {
        // Detect Department
        let matched = DEPARTMENT_OPTIONS[0];
        if (lower.includes('cardio') || lower.includes('heart') || lower.includes('priya')) {
          matched = DEPARTMENT_OPTIONS[1];
        } else if (
          lower.includes('ortho') ||
          lower.includes('bone') ||
          lower.includes('joint') ||
          lower.includes('karan')
        ) {
          matched = DEPARTMENT_OPTIONS[2];
        } else if (
          lower.includes('ped') ||
          lower.includes('child') ||
          lower.includes('baby') ||
          lower.includes('simran')
        ) {
          matched = DEPARTMENT_OPTIONS[3];
        } else if (lower.includes('medicine') || lower.includes('fever') || lower.includes('rahul')) {
          matched = DEPARTMENT_OPTIONS[0];
        }

        nextDraft.department = matched.name;
        nextDraft.assignedDoctorName = matched.doctor;
        nextDraft.roomNumber = matched.room;

        // If patient details exist, auto book immediately!
        if (nextDraft.patientName && nextDraft.phone) {
          try {
            const token = await queueService.createToken({
              patientName: nextDraft.patientName,
              phone: nextDraft.phone,
              age: nextDraft.age || 35,
              gender: nextDraft.gender || 'Male',
              abhaId: nextDraft.abhaId,
              department: nextDraft.department,
              symptoms: nextDraft.symptoms.length > 0 ? nextDraft.symptoms : ['Routine OPD consultation'],
              priority: nextDraft.priority || 'Normal'
            });

            createdToken = token;
            nextStep = 'BOOK_COMPLETED';
            assistantReply = `🎉 **Appointment Confirmed!**\n\n• **Token Number:** **${token.tokenNumber}**\n• **Doctor:** **${
              token.assignedDoctorName || nextDraft.assignedDoctorName
            }** (${token.roomNumber || nextDraft.roomNumber})\n• **Department:** ${
              token.department
            }\n• **Patient:** ${nextDraft.patientName} (${nextDraft.phone})\n• **Estimated Wait Time:** ~${
              token.estimatedWaitMinutes
            } mins`;
            quickReplies = ['Track My Token Live', 'Book Another Appointment', 'Ask a Question'];
            actionType = 'view_tracker';
            break;
          } catch (err: any) {
            // fallback
          }
        }

        nextStep = 'BOOK_COLLECT_PATIENT';
        assistantReply = `Understood: **${matched.name}** with **${matched.doctor}** (${matched.room}).\n\nPlease enter the Patient's Name and 10-digit Mobile Number to generate the token.`;
        quickReplies = ['Rohan Kumar, 9876543210', 'Sunita Devi, 9812345678'];
        break;
      }

      case 'BOOK_SELECT_SLOT': {
        const chosenSlot = TIME_SLOTS.find((s) => lower.includes(s.toLowerCase().slice(0, 15))) || input;
        nextDraft.slot = chosenSlot;

        if (nextDraft.patientName && nextDraft.phone) {
          nextStep = 'BOOK_REVIEW_CONFIRMATION';
          assistantReply = `Thank you. Here is your appointment summary:\n\n• **Patient:** ${nextDraft.patientName} (${nextDraft.phone})\n• **Department:** ${nextDraft.department}\n• **Doctor:** ${nextDraft.assignedDoctorName} (${nextDraft.roomNumber})\n• **Slot:** ${nextDraft.slot}\n\nWould you like me to confirm and reserve this slot?`;
          quickReplies = ['✅ Yes, Confirm & Book Appointment', '✏️ Change Department or Slot', '❌ Cancel Booking'];
          actionType = 'confirm_booking';
        } else {
          nextStep = 'BOOK_COLLECT_PATIENT';
          assistantReply =
            'Got it. Please enter the **Patient\'s Full Name** and **10-digit Mobile Number** for queue notifications.';
          quickReplies = ['Rohan Kumar, 9876543210', 'Sunita Devi, 9812345678'];
        }
        break;
      }

      case 'BOOK_COLLECT_PATIENT': {
        const phoneMatch = input.match(/\b\d{10}\b/);
        const phone = phoneMatch ? phoneMatch[0] : (nextDraft.phone || '9876543210');
        const cleanName =
          input.replace(/\b\d{10}\b/, '').replace(/[,\-]/g, '').trim() ||
          (nextDraft.patientName || 'Registered Patient');

        nextDraft.patientName = cleanName;
        nextDraft.phone = phone;

        // Instantly generate and book token!
        try {
          const token = await queueService.createToken({
            patientName: nextDraft.patientName,
            phone: nextDraft.phone,
            age: nextDraft.age || 35,
            gender: nextDraft.gender || 'Male',
            abhaId: nextDraft.abhaId,
            department: nextDraft.department || 'General Medicine',
            symptoms: nextDraft.symptoms.length > 0 ? nextDraft.symptoms : ['Routine OPD consultation'],
            priority: nextDraft.priority || 'Normal'
          });

          createdToken = token;
          nextStep = 'BOOK_COMPLETED';
          assistantReply = `🎉 **Appointment Confirmed!**\n\nYour appointment has been registered in the live hospital queue:\n• **Token Number:** **${token.tokenNumber}**\n• **Doctor:** **${
            token.assignedDoctorName || nextDraft.assignedDoctorName
          }** (${token.roomNumber || nextDraft.roomNumber})\n• **Department:** ${
            token.department
          }\n• **Patient:** ${nextDraft.patientName} (${nextDraft.phone})\n• **Estimated Wait Time:** ~${
            token.estimatedWaitMinutes
          } mins\n\nPlease arrive 15 minutes before your consultation and present this Token # at ${
            token.roomNumber || nextDraft.roomNumber
          }.`;
          quickReplies = ['Track My Token Live', 'Book Another Appointment', 'Ask a Question'];
          actionType = 'view_tracker';
        } catch (err: any) {
          assistantReply = `Sorry, booking failed: ${err.message || 'Capacity limit reached'}.`;
          quickReplies = ['Book Another Appointment', 'Speak with Helpdesk'];
          nextStep = 'AWAIT_INTENT';
        }
        break;
      }

      case 'BOOK_REVIEW_CONFIRMATION': {
        if (
          lower.includes('confirm') ||
          lower.includes('yes') ||
          lower.includes('book') ||
          lower.includes('proceed')
        ) {
          try {
            const token = await queueService.createToken({
              patientName: nextDraft.patientName || 'Walk-in Patient',
              phone: nextDraft.phone || '+91 98765 43100',
              age: nextDraft.age || 35,
              gender: nextDraft.gender || 'Male',
              abhaId: nextDraft.abhaId,
              department: nextDraft.department,
              symptoms: nextDraft.symptoms.length > 0 ? nextDraft.symptoms : ['Routine OPD consultation'],
              priority: nextDraft.priority || 'Normal'
            });

            createdToken = token;
            nextStep = 'BOOK_COMPLETED';
            assistantReply = `🎉 **Appointment Confirmed!**\n\nYour appointment has been registered in the live hospital queue:\n• **Token Number:** ${token.tokenNumber}\n• **Doctor:** ${
              token.assignedDoctorName || nextDraft.assignedDoctorName
            }\n• **Room:** ${token.roomNumber || nextDraft.roomNumber}\n• **Estimated Wait Time:** ~${
              token.estimatedWaitMinutes
            } mins\n\nPlease arrive 15 minutes before your slot and show this Token # at OPD Room ${
              token.roomNumber || nextDraft.roomNumber
            }.`;
            quickReplies = ['Track My Token Live', 'Book Another Appointment', 'Ask a Question'];
            actionType = 'view_tracker';
          } catch (err: any) {
            assistantReply = `Sorry, we could not complete the booking: ${
              err.message || 'Capacity limit reached'
            }. Would you like to select an alternate doctor or try another time slot?`;
            quickReplies = ['Select Another Time Slot', 'Choose Another Department', 'Speak with Helpdesk'];
            nextStep = 'BOOK_SELECT_SLOT';
          }
        } else if (lower.includes('change') || lower.includes('edit')) {
          nextStep = 'BOOK_SELECT_DEPT';
          assistantReply = 'Sure thing. Which department or doctor would you like to switch to?';
          quickReplies = DEPARTMENT_OPTIONS.map((d) => d.name);
        } else {
          nextStep = 'AWAIT_INTENT';
          assistantReply = 'Booking request cancelled. How else can I assist you today?';
          quickReplies = ['Book an Appointment', 'Hospital Timings & Rules', 'Helpdesk Staff'];
        }
        break;
      }

      case 'LOOKUP_EXISTING': {
        const tokens = await queueService.getTokens();
        const found = tokens.find(
          (t) =>
            t.tokenNumber.toLowerCase().includes(lower) ||
            t.phone.replace(/\D/g, '').includes(lower.replace(/\D/g, ''))
        );

        if (found) {
          nextStep = 'RESCHEDULE_SLOT';
          state.activeToken = found;
          assistantReply = `Found your booking!\n\n• **Token:** ${found.tokenNumber}\n• **Patient:** ${found.patientName}\n• **Doctor:** ${found.assignedDoctorName} (${found.roomNumber})\n• **Status:** ${found.status}\n\nWhat would you like to do?`;
          quickReplies = ['🔄 Reschedule Time Slot', '❌ Cancel Appointment', 'Track Live Queue'];
        } else {
          assistantReply =
            "I couldn't find an active token matching that number or phone. Would you like to book a new appointment or ask our staff at Helpdesk Counter #01?";
          quickReplies = ['📅 Book New Appointment', 'Try Another Token #', 'Hospital Helpdesk'];
          nextStep = 'AWAIT_INTENT';
        }
        break;
      }

      case 'RESCHEDULE_SLOT': {
        if (lower.includes('cancel')) {
          nextStep = 'CANCEL_CONFIRM';
          if (state.activeToken) {
            await queueService.updateTokenStatus(state.activeToken.id, 'CANCELLED');
          }
          assistantReply = `Your appointment for **${
            state.activeToken?.tokenNumber || 'Token'
          }** has been successfully cancelled in the hospital system.`;
          quickReplies = ['Book a New Appointment', 'OPD Timings', 'Main Menu'];
          nextStep = 'AWAIT_INTENT';
        } else {
          assistantReply = 'Please select a new preferred time slot for rescheduling:';
          quickReplies = TIME_SLOTS;
          nextStep = 'AWAIT_INTENT';
        }
        break;
      }

      case 'FAQ_ANSWER':
      default: {
        ragResult = opdKnowledgeService.searchKnowledgeBase(input);
        assistantReply = ragResult.answer;
        quickReplies =
          ragResult.relatedQuestions.length > 0
            ? ragResult.relatedQuestions
            : ['Book an Appointment', 'OPD Timings', 'Helpdesk'];
        nextStep = 'AWAIT_INTENT';
        break;
      }
    }

    const assistantMsg: ChatMessage = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      text: assistantReply,
      timestamp,
      step: nextStep,
      bookingDraft: nextDraft,
      ragResult,
      createdToken,
      quickReplies,
      actionType
    };

    const nextState: AssistantState = {
      ...state,
      step: nextStep,
      bookingDraft: nextDraft,
      messages: [...updatedMessages, assistantMsg]
    };

    return { nextState, assistantResponseText: assistantReply };
  }
};
