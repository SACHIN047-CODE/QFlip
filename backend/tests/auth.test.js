import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { Department } from '../src/models/Department.js';
import { Doctor } from '../src/models/Doctor.js';
import { Queue } from '../src/models/Queue.js';

describe('CAREFLOW Auth API Integration Tests', () => {
  beforeAll(async () => {
    // Mock Department and related queries so tests run instantly without downloading 500MB binary
    vi.spyOn(Department, 'find').mockReturnValue(Promise.resolve([
      {
        _id: 'dept-1',
        name: 'General Medicine',
        code: 'GEN',
        averageWaitTimeMinutes: 15,
        toObject: () => ({ _id: 'dept-1', name: 'General Medicine', code: 'GEN' })
      }
    ]));
    vi.spyOn(Doctor, 'countDocuments').mockResolvedValue(2);
    vi.spyOn(Queue, 'countDocuments').mockResolvedValue(5);
  });

  afterAll(async () => {
    vi.restoreAllMocks();
  });

  it('Health Check Endpoint should return 200 ONLINE', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('ONLINE');
  });

  it('Public Department List Endpoint should be accessible', async () => {
    const res = await request(app).get('/api/departments');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('AI Triage Route evaluates symptoms correctly', async () => {
    const res = await request(app)
      .post('/api/ai/triage')
      .send({ symptoms: 'Severe chest pain radiating to left arm' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.department).toContain('Cardio');
    expect(res.body.data.disclaimer).toBeDefined();
  });
});
