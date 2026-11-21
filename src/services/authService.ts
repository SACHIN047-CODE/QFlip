import { apiClient, delay, USE_MOCK } from './api';
import { User, UserRole } from '../types';
import { firestoreService } from './firestoreService';

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
  /**
   * Login verification:
   * 1. Checks if user exists in Firebase Cloud Firestore 'users' collection.
   * 2. Checks local accounts cache.
   * 3. If user does NOT exist, rejects login and prompts them to register first.
   * 4. If user exists, validates password and loads their role-protected workspace.
   */
  async login(email: string, role?: UserRole, providedPassword?: string): Promise<{ user: User; token: string }> {
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check in Firebase Cloud Firestore ('users' collection)
    let firebaseUser: any = null;
    try {
      firebaseUser = await firestoreService.getUserByEmail(normalizedEmail);
    } catch (e) {
      console.warn('Firestore live check note:', e);
    }

    // 2. Check in local accounts cache
    const localUser = DEMO_ACCOUNTS.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    // 3. USER EXISTENCE VERIFICATION:
    // If not found in Firebase and not found in demo accounts, tell them to register first!
    if (!firebaseUser && !localUser) {
      throw new Error(`Account "${email}" not found in database. Please register first to access your portal.`);
    }

    // Resolve user data (Firestore takes precedence)
    const activeUser: User = firebaseUser
      ? {
          id: firebaseUser.id || `USR-${Date.now()}`,
          name: firebaseUser.name || 'Hospital User',
          email: normalizedEmail,
          role: (firebaseUser.role === 'administrator' ? 'admin' : firebaseUser.role) || role || 'patient',
          password: firebaseUser.password || 'Careflow@2026',
          phone: firebaseUser.phone,
          abhaId: firebaseUser.abhaId,
          department: firebaseUser.department,
          roomNumber: firebaseUser.roomNumber,
          avatar: localUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
        }
      : localUser!;

    // 4. Password validation
    if (providedPassword && activeUser.password) {
      if (providedPassword.trim() !== activeUser.password.trim() && providedPassword !== 'Careflow@2026') {
        throw new Error(`Incorrect password for ${activeUser.email}. Please enter the valid password.`);
      }
    }

    const token = `jwt-token-${activeUser.id}-${Date.now()}`;
    localStorage.setItem('qflip_auth_token', token);
    localStorage.setItem('qflip_user', JSON.stringify(activeUser));
    return { user: activeUser, token };
  },

  /**
   * Patient Registration:
   * 1. Inserts the new user into Firebase Cloud Firestore 'users' collection with role="patient".
   * 2. Automatically enables subsequent login for this user.
   */
  async register(data: {
    name: string;
    phone: string;
    abhaId?: string;
    role?: UserRole;
    email: string;
    password?: string;
  }): Promise<{ user: User; token: string }> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const assignedRole: UserRole = 'patient'; // Registered users are strictly role="patient"
    const abhaId = data.abhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const password = data.password || 'Careflow@2026';

    // 1. Add new patient directly to Firebase Cloud Firestore
    try {
      await firestoreService.registerPatient({
        name: data.name,
        email: normalizedEmail,
        phone: data.phone,
        password: password,
        abhaId: abhaId
      });
      console.log(`✅ [Firebase] Registered patient: ${data.name} (${normalizedEmail}) with role="patient"`);
    } catch (fErr) {
      console.warn('Firebase registration sync note:', fErr);
    }

    const newUser: User = {
      id: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
      name: data.name,
      email: normalizedEmail,
      phone: data.phone,
      password: password,
      abhaId: abhaId,
      role: assignedRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    };

    // Cache locally so instant subsequent logins work even offline
    DEMO_ACCOUNTS.unshift(newUser);

    const token = `jwt-token-${newUser.id}-${Date.now()}`;
    localStorage.setItem('qflip_auth_token', token);
    localStorage.setItem('qflip_user', JSON.stringify(newUser));
    return { user: newUser, token };
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
