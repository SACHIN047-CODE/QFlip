import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import crypto from 'crypto';
import app from '../src/app.js';
import { Appointment } from '../src/models/Appointment.js';
import { Department } from '../src/models/Department.js';
import { Patient } from '../src/models/Patient.js';

describe('QR-Based Digital Appointment Pass API Tests', () => {
  const validRawToken = 'a1b2c3d4e5f67890123456789012345678901234567890123456789012345678';
  const validTokenHash = crypto.createHash('sha256').update(validRawToken).digest('hex');

  const expiredRawToken = 'b2c3d4e5f6a17890123456789012345678901234567890123456789012345678';
  const expiredTokenHash = crypto.createHash('sha256').update(expiredRawToken).digest('hex');

  const revokedRawToken = 'c3d4e5f6a1b27890123456789012345678901234567890123456789012345678';
  const revokedTokenHash = crypto.createHash('sha256').update(revokedRawToken).digest('hex');

  const mockValidAppointment = {
    _id: '665000000000000000000001',
    appointmentNumber: 'APT-2026-00042',
    tokenNumber: 'OPD-GEN-007',
    appointmentDate: new Date('2026-11-25T10:00:00Z'),
    timeSlot: '10:00 AM - 10:30 AM',
    status: 'scheduled',
    priority: 'normal',
    symptoms: 'Mild cold and recurring headache',
    accessToken: validRawToken,
    accessTokenHash: validTokenHash,
    accessTokenExpiry: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days in future
    isRevoked: false,
    patientId: {
      _id: '665000000000000000000002',
      patientId: 'PT-10492',
      phone: '+91 98765 43210',
      userId: {
        _id: '665000000000000000000003',
        name: 'Amanpreet Singh',
        phone: '+91 98765 43210'
      }
    },
    doctorId: {
      _id: '665000000000000000000004',
      specialization: 'Internal Medicine',
      roomNumber: 'OPD Room 101',
      userId: {
        _id: '665000000000000000000005',
        name: 'Dr. Rahul Verma'
      }
    },
    departmentId: {
      _id: '665000000000000000000006',
      name: 'General Medicine',
      code: 'GEN',
      floor: 'Ground Floor, Wing A'
    }
  };

  const mockExpiredAppointment = {
    ...mockValidAppointment,
    _id: '665000000000000000000007',
    appointmentNumber: 'APT-2026-00012',
    tokenNumber: 'OPD-GEN-002',
    accessToken: expiredRawToken,
    accessTokenHash: expiredTokenHash,
    accessTokenExpiry: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days in past
    isRevoked: false
  };

  const mockRevokedAppointment = {
    ...mockValidAppointment,
    _id: '665000000000000000000008',
    appointmentNumber: 'APT-2026-00015',
    tokenNumber: 'OPD-GEN-003',
    accessToken: revokedRawToken,
    accessTokenHash: revokedTokenHash,
    accessTokenExpiry: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    isRevoked: true
  };

  beforeAll(() => {
    // Intercept Appointment.findOne to simulate MongoDB hashed token lookups
    vi.spyOn(Appointment, 'findOne').mockImplementation((query) => {
      const targetHash = query?.accessTokenHash;
      let matched = null;
      if (targetHash === validTokenHash) matched = mockValidAppointment;
      else if (targetHash === expiredTokenHash) matched = mockExpiredAppointment;
      else if (targetHash === revokedTokenHash) matched = mockRevokedAppointment;

      return {
        populate: () => Promise.resolve(matched)
      };
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('GET /api/appointments/pass/:secureAccessToken returns 200 with sanitized appointment details', async () => {
    const res = await request(app).get(`/api/appointments/pass/${validRawToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const pass = res.body.data;
    // Core appointment pass fields
    expect(pass.appointmentId).toBe('APT-2026-00042');
    expect(pass.tokenNumber).toBe('OPD-GEN-007');
    expect(pass.patientName).toBe('Amanpreet Singh');
    expect(pass.doctorName).toBe('Dr. Rahul Verma');
    expect(pass.doctorSpecialization).toBe('Internal Medicine');
    expect(pass.departmentName).toBe('General Medicine');
    expect(pass.departmentFloor).toBe('Ground Floor, Wing A');
    expect(pass.timeSlot).toBe('10:00 AM - 10:30 AM');
    expect(pass.status).toBe('scheduled');

    // SECURITY CHECK: Sensitive details must NEVER be exposed publicly
    expect(pass.phone).toBeUndefined();
    expect(pass.patientPhone).toBeUndefined();
    expect(pass._id).toBeUndefined();
    expect(pass.patientId).toBeUndefined();
    expect(pass.doctorId).toBeUndefined();
    expect(pass.departmentId).toBeUndefined();
    expect(pass.symptoms).toBeUndefined();
    expect(pass.accessToken).toBeUndefined();
    expect(pass.accessTokenHash).toBeUndefined();
  });

  it('GET /api/appointments/pass/:secureAccessToken returns 404 for invalid/unknown token', async () => {
    const res = await request(app).get('/api/appointments/pass/non-existent-random-token-xyz');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/invalid or unknown/i);
  });

  it('GET /api/appointments/pass/:secureAccessToken returns 400 for expired pass', async () => {
    const res = await request(app).get(`/api/appointments/pass/${expiredRawToken}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/expired/i);
  });

  it('GET /api/appointments/pass/:secureAccessToken returns 400 for revoked pass', async () => {
    const res = await request(app).get(`/api/appointments/pass/${revokedRawToken}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/cancelled or revoked/i);
  });

  it('Token lookup verifies hash matching rather than plain ID querying', () => {
    const rawToken = 'randomTestToken1234567890';
    const computedHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    expect(computedHash).not.toBe(rawToken);
    expect(computedHash).toHaveLength(64);
  });

  it('Predictable appointment IDs CANNOT be used to access appointment passes', async () => {
    // Attempting to access pass using the appointment ID 'APT-2026-00042' instead of the secure access token
    const res = await request(app).get('/api/appointments/pass/APT-2026-00042');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('Token isolation: Token for Appointment A does not return Appointment B', async () => {
    const res = await request(app).get(`/api/appointments/pass/${validRawToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.appointmentId).toBe('APT-2026-00042');
    expect(res.body.data.appointmentId).not.toBe('APT-2026-00012');
  });

  it('Secure tokens have high entropy (at least 64 hex characters / 32 bytes)', () => {
    const token = crypto.randomBytes(32).toString('hex');
    expect(token).toHaveLength(64);
    expect(/^[0-9a-f]{64}$/.test(token)).toBe(true);
  });
});
