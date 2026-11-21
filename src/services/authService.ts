import { apiClient, delay, USE_MOCK } from './api';
import { User, UserRole } from '../types';

export const MOCK_USERS: Record<UserRole, User> = {
  patient: {
    id: 'PT-10088',
    name: 'Manpreet Singh',
    email: 'patient@qflip.gov.in',
    role: 'patient',
    phone: '9812401824',
    abhaId: '91-8274-1049-9812',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  },
  doctor: {
    id: 'doc-rajesh',
    name: 'Dr. Rajesh Sharma, MD',
    email: 'doctor@qflip.gov.in',
    role: 'doctor',
    department: 'General Medicine',
    roomNumber: 'OPD Room 12',
    phone: '9811002233',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'
  },
  staff: {
    id: 'REG-8812',
    name: 'Anita Devi',
    email: 'staff@qflip.gov.in',
    role: 'staff',
    department: 'Central Registration Counter #02',
    phone: '9811554433',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
  },
  admin: {
    id: 'ADM-001',
    name: 'Chief Medical Superintendent',
    email: 'admin@qflip.gov.in',
    role: 'admin',
    department: 'Hospital Administration Command',
    phone: '9811998877',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  lab: {
    id: 'LAB-502',
    name: 'Manoj Varma',
    email: 'lab@qflip.gov.in',
    role: 'lab',
    department: 'Central Clinical Pathology & Imaging',
    phone: '9811332211',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=120&q=80'
  },
  pharmacy: {
    id: 'PHARM-301',
    name: 'Rakesh Verma, B.Pharm',
    email: 'pharmacy@qflip.gov.in',
    role: 'pharmacy',
    department: 'OPD Main Chemist & Jan Aushadhi Counter',
    phone: '9811776655',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'
  }
};

export const authService = {
  async login(email: string, role?: UserRole): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      await delay(400);
      const targetRole = role || (email.includes('doctor') ? 'doctor' : 
                          email.includes('admin') ? 'admin' : 
                          email.includes('staff') ? 'staff' : 
                          email.includes('lab') ? 'lab' : 
                          email.includes('pharm') ? 'pharmacy' : 'patient');
      const user = MOCK_USERS[targetRole];
      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      localStorage.setItem('qflip_auth_token', token);
      localStorage.setItem('qflip_user', JSON.stringify(user));
      return { user, token };
    }
    return apiClient.post('/auth/login', { email, role });
  },

  async register(data: { name: string; phone: string; abhaId?: string; role: UserRole; email: string }): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      await delay(500);
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
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    if (USE_MOCK) {
      await delay(400);
      return { success: true, message: `Password reset instructions sent to ${email}` };
    }
    return apiClient.post('/auth/forgot-password', { email });
  }
};

