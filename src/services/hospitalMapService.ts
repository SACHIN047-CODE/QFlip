/**
 * Hospital Map Configuration Service
 * Provides administrator-editable hospital layouts, floors, rooms, and department pins.
 */

export interface HospitalMapLocation {
  id: string;
  name: string;
  code: string;
  floorId: string;
  room: string;
  xPercent: number; // 5 to 95
  yPercent: number; // 5 to 95
  category: 'emergency' | 'registration' | 'pharmacy' | 'laboratory' | 'opd' | 'icu' | 'other';
  color?: string;
}

export interface HospitalMapFloor {
  id: string;
  name: string;
  label: string;
  description?: string;
}

export interface HospitalMapConfig {
  hospitalName: string;
  subtitle: string;
  floors: HospitalMapFloor[];
  locations: HospitalMapLocation[];
  wayfindingSteps: { step: number; title: string; description: string }[];
}

const STORAGE_KEY = 'careflow_hospital_map_config';

const CATEGORY_COLORS: Record<string, string> = {
  emergency: 'bg-danger text-white',
  registration: 'bg-secondary text-white',
  pharmacy: 'bg-success text-white',
  laboratory: 'bg-purple-600 text-white',
  opd: 'bg-accent text-on-accent',
  icu: 'bg-red-700 text-white',
  other: 'bg-slate-700 text-white',
};

export const DEFAULT_MAP_CONFIG: HospitalMapConfig = {
  hospitalName: 'District Civil Hospital',
  subtitle: 'Interactive Smart Navigation & Clinical Wayfinding',
  floors: [
    { id: 'ground', name: 'Ground Floor', label: 'Ground Floor (Triage, Reg, Lab, Pharmacy)', description: 'Main Entrance, Central Reception & Emergency Bay' },
    { id: 'first', name: '1st Floor', label: '1st Floor (General OPDs, Ortho, Peds)', description: 'Outpatient Specialty Consultations Wing' },
    { id: 'second', name: '2nd Floor', label: '2nd Floor (Cardio, ICU, Admin)', description: 'Critical Care, Diagnostics & Hospital Administration' },
  ],
  locations: [
    { id: 'loc-1', name: 'Emergency Trauma Care', floorId: 'ground', code: 'EMERGENCY', room: 'ER Bay 1-4', xPercent: 15, yPercent: 28, category: 'emergency', color: 'bg-danger text-white' },
    { id: 'loc-2', name: 'Central Registration Counters (1 - 4)', floorId: 'ground', code: 'REG', room: 'Counter 1-4', xPercent: 50, yPercent: 18, category: 'registration', color: 'bg-secondary text-white' },
    { id: 'loc-3', name: 'Jan Aushadhi OPD Pharmacy', floorId: 'ground', code: 'PHARM', room: 'Room G-04', xPercent: 82, yPercent: 35, category: 'pharmacy', color: 'bg-success text-white' },
    { id: 'loc-4', name: 'Clinical Pathology & Imaging Lab', floorId: 'ground', code: 'LAB', room: 'Room G-10', xPercent: 78, yPercent: 74, category: 'laboratory', color: 'bg-purple-600 text-white' },
    { id: 'loc-5', name: 'OPD Room 12 (General Medicine)', floorId: 'first', code: 'OPD-12', room: 'Room 12', xPercent: 35, yPercent: 42, category: 'opd', color: 'bg-accent text-on-accent' },
    { id: 'loc-6', name: 'Pediatrics & Immunization Wing', floorId: 'first', code: 'PEDS', room: 'Room 04', xPercent: 65, yPercent: 30, category: 'opd', color: 'bg-sky-500 text-white' },
    { id: 'loc-7', name: 'Orthopedics & Plaster Room', floorId: 'first', code: 'ORTHO', room: 'Room 08', xPercent: 65, yPercent: 70, category: 'opd', color: 'bg-amber-600 text-white' },
    { id: 'loc-8', name: 'Cardiology & ECG Suite', floorId: 'second', code: 'CARDIO', room: 'Room 201', xPercent: 40, yPercent: 45, category: 'opd', color: 'bg-rose-600 text-white' },
    { id: 'loc-9', name: 'ICU Critical Care Block B', floorId: 'second', code: 'ICU', room: 'ICU Bay', xPercent: 75, yPercent: 55, category: 'icu', color: 'bg-red-700 text-white' },
  ],
  wayfindingSteps: [
    { step: 1, title: 'Enter Main OPD Porch', description: 'Pass through ABHA verification scanner and head towards the central waiting corridor.' },
    { step: 2, title: 'Take Escalator or Lift B', description: 'Lift B is reserved for senior citizens, wheelchairs, and stretchers.' },
    { step: 3, title: 'Arrive at Department Door', description: 'Digital token display screens are mounted directly above the consultation room door.' },
  ],
};

export const hospitalMapService = {
  getMapConfig(): HospitalMapConfig {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MAP_CONFIG));
      return DEFAULT_MAP_CONFIG;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_MAP_CONFIG;
    }
  },

  saveMapConfig(config: HospitalMapConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('careflow_map_updated'));
  },

  resetMapConfig(): HospitalMapConfig {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MAP_CONFIG));
    window.dispatchEvent(new Event('careflow_map_updated'));
    return DEFAULT_MAP_CONFIG;
  },

  getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || 'bg-slate-700 text-white';
  },
};
