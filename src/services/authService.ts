import { apiClient, delay, USE_MOCK } from './api';
import { User, UserRole } from '../types';

export const DEMO_ACCOUNTS: User[] = [
  // 3 REAL DOCTORS
  {
    id: 'doc-rajesh',
    name: 'Dr. Rajesh Sharma, MD',
    email: 'doctor@careflow.gov.in',
    role: 'doctor',
    department: 'General Medicine',
    roomNumber: 'Room 101',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'doc-priya',
    name: 'Dr. Priya Nair, MD, DM',
    email: 'dr.priya@careflow.gov.in',
    role: 'doctor',
    department: 'Cardiology',
    roomNumber: 'Room 201',
    phone: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1594824813587-578f24458f27?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'doc-vikram',
    name: 'Dr. Vikram Mehta, MS',
    email: 'dr.vikram@careflow.gov.in',
    role: 'doctor',
    department: 'Orthopedics',
    roomNumber: 'Room 108',
    phone: '+91 98765 43212',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80'
  },

  // 9 REAL PATIENTS
  {
    id: 'PT-10088',
    name: 'Aarav Patel',
    email: 'patient@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11221',
    abhaId: '91-8274-1049-9812',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10089',
    name: 'Kavita Singh',
    email: 'kavita.singh@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11222',
    abhaId: '91-5521-3901-4412',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10090',
    name: 'Rohan Verma',
    email: 'rohan.verma@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11223',
    abhaId: '91-6632-8819-7721',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10091',
    name: 'Sunita Mehra',
    email: 'sunita.mehra@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11224',
    abhaId: '91-7743-9920-8832',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10092',
    name: 'Vikas Dubey',
    email: 'vikas.dubey@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11225',
    abhaId: '91-1188-4455-6677',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10093',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11226',
    abhaId: '91-2299-5566-7788',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10094',
    name: 'Amitabh Sen',
    email: 'amitabh.sen@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11227',
    abhaId: '91-3311-6677-8899',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10095',
    name: 'Meena Kumari',
    email: 'meena.kumari@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11228',
    abhaId: '91-4422-7788-9900',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PT-10096',
    name: 'Harpreet Singh',
    email: 'harpreet.singh@careflow.gov.in',
    role: 'patient',
    phone: '+91 98201 11229',
    abhaId: '91-5533-8899-0011',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80'
  },

  // STAFF & ADMIN
  {
    id: 'ADM-001',
    name: 'Dr. Sunita Rao (CMS)',
    email: 'admin@careflow.gov.in',
    role: 'admin',
    department: 'Hospital Administration Command',
    phone: '+91 98100 11001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'REG-8812',
    name: 'Anita Devi',
    email: 'staff@careflow.gov.in',
    role: 'staff',
    department: 'Central Registration Counter #01',
    phone: '+91 98100 22002',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'LAB-502',
    name: 'Suresh Kumar',
    email: 'lab@careflow.gov.in',
    role: 'lab',
    department: 'Central Clinical Pathology & Imaging',
    phone: '+91 98100 33003',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'PHARM-301',
    name: 'Mohit Verma',
    email: 'pharmacy@careflow.gov.in',
    role: 'pharmacy',
    department: 'OPD Main Chemist & Jan Aushadhi Counter',
    phone: '+91 98100 44004',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'
  }
];

export const MOCK_USERS: Record<UserRole, User> = {
  patient: DEMO_ACCOUNTS.find(u => u.id === 'PT-10088')!,
  doctor: DEMO_ACCOUNTS.find(u => u.id === 'doc-rajesh')!,
  staff: DEMO_ACCOUNTS.find(u => u.id === 'REG-8812')!,
  admin: DEMO_ACCOUNTS.find(u => u.id === 'ADM-001')!,
  lab: DEMO_ACCOUNTS.find(u => u.id === 'LAB-502')!,
  pharmacy: DEMO_ACCOUNTS.find(u => u.id === 'PHARM-301')!
};

export const authService = {
  async login(email: string, role?: UserRole): Promise<{ user: User; token: string }> {
    if (USE_MOCK) {
      await delay(350);
      const normalizedEmail = email.toLowerCase().trim();

      // 1. Check if exact email matches any of the 16 demo accounts
      let matchedUser = DEMO_ACCOUNTS.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      // 2. Check alias or role fallback
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
      const token = `mock-jwt-token-${user.id}-${Date.now()}`;
      localStorage.setItem('qflip_auth_token', token);
      localStorage.setItem('qflip_user', JSON.stringify(user));
      return { user, token };
    }
    return apiClient.post('/auth/login', { email, role });
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
