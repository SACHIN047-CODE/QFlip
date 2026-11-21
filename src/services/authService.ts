import { apiClient, delay, USE_MOCK } from './api';
import { User, UserRole } from '../types';

export const DEMO_ACCOUNTS: User[] = [
  // ============================================================================
  // 10 OFFICIAL FIREBASE ACCOUNTS (Primary Real Data)
  // ============================================================================
  {
    id: 'USR-ADMIN-01',
    name: 'Sachin Sharma',
    email: 'sachin@example.com',
    password: 'Demo@12345',
    role: 'admin',
    department: 'Hospital Administration Command',
    phone: '+91 98100 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-DOC-01',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    password: 'Demo@12346',
    role: 'doctor',
    department: 'General Medicine',
    roomNumber: 'OPD Room 101',
    phone: '+91 98100 12346',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-PAT-01',
    name: 'Amit Kumar',
    email: 'amit@example.com',
    password: 'Demo@12347',
    role: 'patient',
    phone: '+91 98100 12347',
    abhaId: '91-1001-2002-3001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-DOC-02',
    name: 'Priya Singh',
    email: 'priya@example.com',
    password: 'Demo@12348',
    role: 'doctor',
    department: 'Cardiology',
    roomNumber: 'Room 201',
    phone: '+91 98100 12348',
    avatar: 'https://images.unsplash.com/photo-1594824813587-578f24458f27?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-PAT-02',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    password: 'Demo@12349',
    role: 'patient',
    phone: '+91 98100 12349',
    abhaId: '91-1002-2003-3002',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-PAT-03',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    password: 'Demo@12350',
    role: 'patient',
    phone: '+91 98100 12350',
    abhaId: '91-1003-2004-3003',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-DOC-03',
    name: 'Dr. Karan Malhotra',
    email: 'karan@example.com',
    password: 'Demo@12351',
    role: 'doctor',
    department: 'Orthopedics',
    roomNumber: 'Room 108',
    phone: '+91 98100 12351',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-PAT-04',
    name: 'Anjali Sharma',
    email: 'anjali@example.com',
    password: 'Demo@12352',
    role: 'patient',
    phone: '+91 98100 12352',
    abhaId: '91-1004-2005-3004',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-ADMIN-02',
    name: 'Rohan Kapoor',
    email: 'rohan@example.com',
    password: 'Demo@12353',
    role: 'admin',
    department: 'Hospital Administration & IT',
    phone: '+91 98100 12353',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'USR-DOC-04',
    name: 'Dr. Simran Kaur',
    email: 'simran@example.com',
    password: 'Demo@12354',
    role: 'doctor',
    department: 'Pediatrics',
    roomNumber: 'Room 301',
    phone: '+91 98100 12354',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=120&q=80'
  },

  // ============================================================================
  // OPERATIONAL HOSPITAL STAFF ACCOUNTS
  // ============================================================================
  {
    id: 'REG-8812',
    name: 'Anita Devi (Staff Desk)',
    email: 'staff@careflow.gov.in',
    password: 'Careflow@2026',
    role: 'staff',
    department: 'Central Registration Counter #01',
    phone: '+91 98100 22002',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'LAB-502',
    name: 'Suresh Kumar (Lab Tech)',
    email: 'lab@careflow.gov.in',
    password: 'Careflow@2026',
    role: 'lab',
    department: 'Central Clinical Pathology & Imaging',
    phone: '+91 98100 33003',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PHARM-301',
    name: 'Mohit Verma (Chemist)',
    email: 'pharmacy@careflow.gov.in',
    password: 'Careflow@2026',
    role: 'pharmacy',
    department: 'OPD Main Chemist & Jan Aushadhi Counter',
    phone: '+91 98100 44004',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'
  }
];

export const MOCK_USERS: Record<UserRole, User> = {
  patient: DEMO_ACCOUNTS.find(u => u.id === 'USR-PAT-01')!,
  doctor: DEMO_ACCOUNTS.find(u => u.id === 'USR-DOC-01')!,
  staff: DEMO_ACCOUNTS.find(u => u.id === 'REG-8812')!,
  admin: DEMO_ACCOUNTS.find(u => u.id === 'USR-ADMIN-01')!,
  lab: DEMO_ACCOUNTS.find(u => u.id === 'LAB-502')!,
  pharmacy: DEMO_ACCOUNTS.find(u => u.id === 'PHARM-301')!
};

export const authService = {
  async login(email: string, role?: UserRole, providedPassword?: string): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      await delay(350);
      const normalizedEmail = email.toLowerCase().trim();

      // 1. Check if exact email matches any demo account
      let matchedUser = DEMO_ACCOUNTS.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      // 2. Fallback check by role keyword in email
      if (!matchedUser) {
        if (normalizedEmail.includes('doctor')) {
          matchedUser = DEMO_ACCOUNTS.find(u => u.role === 'doctor');
        } else if (normalizedEmail.includes('admin')) {
          matchedUser = DEMO_ACCOUNTS.find(u => u.role === 'admin');
        } else if (normalizedEmail.includes('staff')) {
          matchedUser = DEMO_ACCOUNTS.find(u => u.role === 'staff');
        } else if (normalizedEmail.includes('lab')) {
          matchedUser = DEMO_ACCOUNTS.find(u => u.role === 'lab');
        } else if (normalizedEmail.includes('pharm')) {
          matchedUser = DEMO_ACCOUNTS.find(u => u.role === 'pharmacy');
        } else {
          matchedUser = DEMO_ACCOUNTS.find(u => u.role === 'patient');
        }
      }

      const user = matchedUser || MOCK_USERS[role || 'patient'];

      // Password validation check: if provided, verify matching password
      if (providedPassword && user.password) {
        if (providedPassword.trim() !== user.password.trim() && providedPassword !== 'Careflow@2026') {
          throw new Error(`Invalid password for ${user.email}. Expected: ${user.password}`);
        }
      }

      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      localStorage.setItem('qflip_auth_token', token);
      localStorage.setItem('qflip_user', JSON.stringify(user));
      return { user, token };
    }
    return apiClient.post('/auth/login', { email, role, password: providedPassword });
  },

  async register(data: { name: string; phone: string; abhaId?: string; role: UserRole; email: string }): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      await delay(400);
      const user: User = {
        id: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        abhaId: data.abhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        role: data.role || 'patient'
      };
      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      localStorage.setItem('qflip_auth_token', token);
      localStorage.setItem('qflip_user', JSON.stringify(user));
      return { user, token };
    }
    return apiClient.post('/auth/register', data);
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('qflip_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  switchRole(role: UserRole): User {
    const user = MOCK_USERS[role];
    localStorage.setItem('qflip_user', JSON.stringify(user));
    localStorage.setItem('qflip_auth_token', `mock-jwt-token-${user.id}-${Date.now()}`);
    return user;
  },

  logout(): void {
    localStorage.removeItem('qflip_auth_token');
    localStorage.removeItem('qflip_user');
    sessionStorage.removeItem('qflip_doctor_verified');
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    if (USE_MOCK) {
      await delay(300);
      return { success: true, message: `Password reset instructions sent to ${email}` };
    }
    return apiClient.post('/auth/forgot-password', { email });
  }
};
