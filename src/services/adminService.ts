import { apiClient, delay, USE_MOCK } from './api';
import { HospitalDepartment, HospitalResource, ComplaintFeedback } from '../types';
import { INITIAL_DEPARTMENTS, INITIAL_RESOURCES, INITIAL_COMPLAINTS } from './mockData';

export const adminService = {
  async getDepartments(): Promise<HospitalDepartment[]> {
    if (USE_MOCK) {
      await delay(200);
      return INITIAL_DEPARTMENTS;
    }
    return apiClient.get('/admin/departments');
  },

  async getResources(): Promise<HospitalResource[]> {
    if (USE_MOCK) {
      await delay(200);
      return INITIAL_RESOURCES;
    }
    return apiClient.get('/admin/resources');
  },

  async updateResource(id: string, updates: Partial<HospitalResource>): Promise<HospitalResource> {
    if (USE_MOCK) {
      await delay(200);
      const res = INITIAL_RESOURCES.find(r => r.id === id);
      if (!res) throw new Error('Resource not found');
      Object.assign(res, updates);
      return res;
    }
    return apiClient.patch(`/admin/resources/${id}`, updates);
  },

  async getComplaints(): Promise<ComplaintFeedback[]> {
    if (USE_MOCK) {
      await delay(200);
      const stored = localStorage.getItem('qflip_complaints');
      return stored ? JSON.parse(stored) : INITIAL_COMPLAINTS;
    }
    return apiClient.get('/admin/complaints');
  },

  async updateComplaintStatus(id: string, status: ComplaintFeedback['status'], resolutionNote?: string): Promise<void> {
    if (USE_MOCK) {
      await delay(250);
      const stored = localStorage.getItem('qflip_complaints');
      const list: ComplaintFeedback[] = stored ? JSON.parse(stored) : INITIAL_COMPLAINTS;
      const updated = list.map(c => c.id === id ? { ...c, status, resolutionNote: resolutionNote || c.resolutionNote } : c);
      localStorage.setItem('qflip_complaints', JSON.stringify(updated));
      return;
    }
    return apiClient.patch(`/admin/complaints/${id}`, { status, resolutionNote });
  },

  async getDoctorsList(): Promise<any[]> {
    if (USE_MOCK) {
      await delay(200);
      return [
        { id: 'doc-1', name: 'Dr. Rajesh Sharma', specialty: 'General Medicine', qualification: 'MBBS, MD', room: 'OPD-12', status: 'Active', shift: '08:30 - 14:00', load: '24 Patients' },
        { id: 'doc-2', name: 'Dr. Priya Patel', specialty: 'Pediatrics', qualification: 'MBBS, MD (Ped)', room: 'OPD-04', status: 'Active', shift: '09:00 - 15:00', load: '15 Patients' },
        { id: 'doc-3', name: 'Dr. Harpreet Singh', specialty: 'Orthopedics', qualification: 'MBBS, MS (Ortho)', room: 'OPD-08', status: 'Active', shift: '08:30 - 14:00', load: '19 Patients' },
        { id: 'doc-4', name: 'Dr. Arvind Kumar', specialty: 'Cardiology', qualification: 'MBBS, MD, DM', room: 'OPD-21', status: 'On Break', shift: '10:00 - 16:00', load: '11 Patients' },
        { id: 'doc-5', name: 'Dr. Sunita Verma', specialty: 'Obstetrics & Gynae', qualification: 'MBBS, MS (OBG)', room: 'OPD-19', status: 'Active', shift: '08:30 - 14:30', load: '31 Patients' },
        { id: 'doc-6', name: 'Dr. Vikramaditya Sen', specialty: 'Emergency Trauma', qualification: 'MBBS, MD (Emerg)', room: 'Trauma Bay', status: 'Active', shift: '08:00 - 20:00', load: '88 Treated' },
      ];
    }
    return apiClient.get('/admin/doctors');
  },

  async getStaffList(): Promise<any[]> {
    if (USE_MOCK) {
      await delay(200);
      return [
        { id: 'stf-1', name: 'Anita Devi', role: 'Registration Desk Officer', desk: 'Counter #02', shift: '08:00 - 16:00', tokensIssued: 142, status: 'Online' },
        { id: 'stf-2', name: 'Suman Lata', role: 'Registration Desk Officer', desk: 'Counter #01', shift: '08:00 - 16:00', tokensIssued: 118, status: 'Online' },
        { id: 'stf-3', name: 'Manoj Varma', role: 'Senior Lab Technologist', desk: 'Hematology Room B', shift: '08:30 - 16:30', tokensIssued: 64, status: 'Online' },
        { id: 'stf-4', name: 'Rakesh Verma', role: 'Chief Pharmacist', desk: 'Pharmacy Counter #01', shift: '08:30 - 17:00', tokensIssued: 195, status: 'Online' },
        { id: 'stf-5', name: 'Deepak Kumar', role: 'Patient Escort & Triage Helper', desk: 'Main Porch', shift: '07:30 - 15:30', tokensIssued: 0, status: 'Online' },
      ];
    }
    return apiClient.get('/admin/staff');
  }
};

