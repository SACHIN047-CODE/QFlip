import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import connectDB, { disconnectDB } from '../src/config/db.js';

describe('CAREFLOW Support Ticket & Firebase Integration Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  let createdTicketId = null;

  it('Patient should be able to submit a support ticket and receive unique ticket ID', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({
        patientName: 'Test Patient',
        phone: '9812345678',
        category: 'Long Wait Time',
        subject: 'Excessive Wait in OPD Room 12',
        description: 'Waited over 50 minutes after token was called.',
        rating: 2
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.ticketId).toMatch(/^TCK-\d{4}$/);
    expect(res.body.data.status).toBe('OPEN');
    expect(res.body.data.subject).toBe('Excessive Wait in OPD Room 12');

    createdTicketId = res.body.data.ticketId;
  });

  it('Patient tracking should return ticket details and strip internal notes', async () => {
    const res = await request(app).get(`/api/tickets/track/${createdTicketId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.ticketId).toBe(createdTicketId);
    expect(res.body.data.status).toBe('OPEN');
    // Ensure sensitive internal notes are never exposed to patient
    expect(res.body.data.internalNotes).toBeUndefined();
  });

  it('Tracking invalid ticket ID should return 404', async () => {
    const res = await request(app).get('/api/tickets/track/TCK-0000000-INVALID');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('No support ticket found');
  });
});
