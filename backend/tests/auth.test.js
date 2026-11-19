import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import connectDB, { disconnectDB } from '../src/config/db.js';

describe('CAREFLOW Auth API Integration Tests', () => {
  beforeAll(async () => {
    // In test environment, connect to DB
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
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
