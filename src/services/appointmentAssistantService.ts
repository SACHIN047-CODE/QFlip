/**
 * CareFlow Voice & Chat OPD Appointment Assistant Service
 * Guided customer-support conversational state machine connecting RAG knowledge and live appointment system
 */

import { queueService } from './queueService';
import { opdKnowledgeService, RagSearchResult } from './opdKnowledgeService';
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
  assignedDoctorName: 'Dr. Rahul Verma, MD',
  roomNumber: 'Room 101',
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
  { name: 'General Medicine', doctor: 'Dr. Rahul Verma', room: 'Room 101', waitMins: 18 },
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
      text: `Hello! I am your CareFlow OPD Assistant for Civil Hospital Ambala. You can speak or type to me anytime.\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      step: 'AWAIT_INTENT',
      quickReplies: [
        '📅 Book an Appointment',
        '🔄 Check / Reschedule Token',
        '⏰ Hospital Timings & Fasting Rules',
        '🏥 Speak with Helpdesk Staff'
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
   * Process a user turn (spoken or typed) and progress the state machine
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
    if (lower.includes('human') || lower.includes('agent') || lower.includes('staff') || lower.includes('helpdesk') || lower.includes('talk to someone')) {
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
        if (lower.includes('book') || lower.includes('appointment') || lower.includes('doctor') || lower.includes('consult')) {
          nextStep = 'BOOK_SELECT_DEPT';
          assistantReply =
            'Great, let\'s book your OPD appointment. Which clinical department or doctor would you like to visit?';
          quickReplies = [
            'General Medicine (Dr. Rahul Verma)',
            'Cardiology (Dr. Priya Singh)',
            'Orthopedics (Dr. Karan Malhotra)',
            'Pediatrics (Dr. Simran Kaur)'
          ];
        } else if (lower.includes('check') || lower.includes('reschedule') || lower.includes('cancel') || lower.includes('token') || lower.includes('status')) {
          nextStep = 'LOOKUP_EXISTING';
          assistantReply =
            'Please provide your Token Number (e.g. OPD-GEN-101) or registered mobile number to look up your booking.';
          quickReplies = ['OPD-GEN-101', 'OPD-GEN-102', '+91 98765 43101', 'Cancel'];
        } else {
          // RAG Question Handling
          ragResult = opdKnowledgeService.searchKnowledgeBase(input);
          nextStep = 'FAQ_ANSWER';
          assistantReply = ragResult.answer;
          quickReplies = ragResult.relatedQuestions.length > 0 ? ragResult.relatedQuestions : ['Book an Appointment', 'Hospital Timings', 'Helpdesk'];
        }
        break;
      }

      case 'BOOK_SELECT_DEPT': {
        // Detect Department
        let matched = DEPARTMENT_OPTIONS[0];
        if (lower.includes('cardio') || lower.includes('heart') || lower.includes('priya')) {
          matched = DEPARTMENT_OPTIONS[1];
        } else if (lower.includes('ortho') || lower.includes('bone') || lower.includes('joint') || lower.includes('karan')) {
          matched = DEPARTMENT_OPTIONS[2];
        } else if (lower.includes('ped') || lower.includes('child') || lower.includes('baby') || lower.includes('simran')) {
          matched = DEPARTMENT_OPTIONS[3];
        } else if (lower.includes('medicine') || lower.includes('fever') || lower.includes('rahul')) {
          matched = DEPARTMENT_OPTIONS[0];
        }

        nextDraft.department = matched.name;
        nextDraft.assignedDoctorName = matched.doctor;
        nextDraft.roomNumber = matched.room;

        nextStep = 'BOOK_SELECT_SLOT';
        assistantReply = `Understood: **${matched.name}** with **${matched.doctor}** (${matched.room}).\n\nWhat date or time slot suits you best?`;
        quickReplies = TIME_SLOTS;
        break;
      }

      case 'BOOK_SELECT_SLOT': {
        // Detect slot
        const chosenSlot = TIME_SLOTS.find((s) => lower.includes(s.toLowerCase().slice(0, 15))) || input;
        nextDraft.slot = chosenSlot;

        // If patient info already present (logged-in user)
        if (nextDraft.patientName && nextDraft.phone) {
          nextStep = 'BOOK_REVIEW_CONFIRMATION';
          assistantReply = `Thank you. I have retrieved your patient profile. Here is your appointment summary:\n\n• **Patient:** ${nextDraft.patientName} (${nextDraft.phone})\n• **Department:** ${nextDraft.department}\n• **Doctor:** ${nextDraft.assignedDoctorName} (${nextDraft.roomNumber})\n• **Slot:** ${nextDraft.slot}\n\nPlease review these details. Would you like me to confirm and reserve this slot?`;
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
        // Parse name and phone
        const phoneMatch = input.match(/\b\d{10}\b/);
        const phone = phoneMatch ? phoneMatch[0] : (nextDraft.phone || '9876543210');
        const cleanName = input.replace(/\b\d{10}\b/, '').replace(/[,\-]/g, '').trim() || (nextDraft.patientName || 'Manpreet Singh');

        nextDraft.patientName = cleanName;
        nextDraft.phone = phone;

        nextStep = 'BOOK_REVIEW_CONFIRMATION';
        assistantReply = `Thank you, ${cleanName}. Please review your appointment details:\n\n• **Patient:** ${cleanName} (${phone})\n• **Department:** ${nextDraft.department}\n• **Doctor:** ${nextDraft.assignedDoctorName} (${nextDraft.roomNumber})\n• **Slot:** ${nextDraft.slot}\n\nPlease review these details. Would you like me to confirm and reserve this slot?`;
        quickReplies = ['✅ Yes, Confirm & Book Appointment', '✏️ Change Department or Slot', '❌ Cancel Booking'];
        actionType = 'confirm_booking';
        break;
      }

      case 'BOOK_REVIEW_CONFIRMATION': {
        if (lower.includes('confirm') || lower.includes('yes') || lower.includes('book') || lower.includes('proceed')) {
          // Execute booking via queueService
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
            assistantReply = `🎉 **Appointment Confirmed!**\n\nYour appointment has been registered in the live hospital queue:\n• **Token Number:** ${token.tokenNumber}\n• **Doctor:** ${token.assignedDoctorName || nextDraft.assignedDoctorName}\n• **Room:** ${token.roomNumber || nextDraft.roomNumber}\n• **Estimated Wait Time:** ~${token.estimatedWaitMinutes} mins\n\nPlease arrive 15 minutes before your slot and show this Token # at OPD Room ${token.roomNumber || nextDraft.roomNumber}.`;
            quickReplies = ['Track My Token Live', 'Book Another Appointment', 'Ask a Question'];
            actionType = 'view_tracker';
          } catch (err: any) {
            assistantReply = `Sorry, we could not complete the booking: ${err.message || 'Capacity limit reached'}. Would you like to select an alternate doctor or try another time slot?`;
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
            'I couldn\'t find an active token matching that number or phone. Would you like to book a new appointment or ask our staff at Helpdesk Counter #01?';
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
          assistantReply = `Your appointment for **${state.activeToken?.tokenNumber || 'Token'}** has been successfully cancelled in the hospital system.`;
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
        // Query Grounded Knowledge Base
        ragResult = opdKnowledgeService.searchKnowledgeBase(input);
        assistantReply = ragResult.answer;
        quickReplies = ragResult.relatedQuestions.length > 0 ? ragResult.relatedQuestions : ['Book an Appointment', 'OPD Timings', 'Helpdesk'];
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
