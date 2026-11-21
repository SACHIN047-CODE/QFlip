import { describe, it, expect, vi } from 'vitest';
import dayjs from 'dayjs';
import { QueueService } from '../src/services/queueService.js';
import { QueueCapacityService } from '../src/services/queueCapacityService.js';
import { PredictionService } from '../src/services/predictionService.js';
import { DigitalTwinService } from '../src/services/digitalTwinService.js';
import * as notifService from '../src/services/notificationService.js';
import { Doctor } from '../src/models/Doctor.js';
import { Queue } from '../src/models/Queue.js';
import { Notification } from '../src/models/Notification.js';

describe('CAREFLOW Services & Domain Logic Tests', () => {
  it('QueueService calculateWaitTime returns realistic minimums', async () => {
    // If 0 patients ahead, minimum wait is 2 minutes
    const wait = await QueueService.calculateWaitTime(null, 0);
    expect(wait).toBeGreaterThanOrEqual(2);
  });

  it('PredictionService triages Hindi symptoms accurately', async () => {
    const hindiResult = await PredictionService.suggestDepartment('छाती में तेज दर्द और घबराहट');
    expect(hindiResult.department).toBe('Cardiology');
    expect(hindiResult.triageColor).toBe('yellow');
    expect(hindiResult.disclaimer).toBeDefined();
  });

  it('PredictionService triages Punjabi symptoms accurately', async () => {
    const punjabiResult = await PredictionService.suggestDepartment('ਮੇਰਾ ਗਿੱਟਾ ਮੁੜ ਗਿਆ ਸੀ ਤੇ ਚੱਲਣ ਵਿਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ');
    expect(punjabiResult.department).toBe('Orthopedics');
    expect(punjabiResult.disclaimer).toBeDefined();
  });

  it('PredictionService triages Tamil symptoms accurately', async () => {
    const tamilResult = await PredictionService.suggestDepartment('எனக்கு மார்பு வலி மற்றும் இதயம் படபடப்பாக உள்ளது');
    expect(tamilResult.department).toBe('Cardiology');
    expect(tamilResult.disclaimer).toBeDefined();
  });

  it('PredictionService predicts crowd surge for high volume days', () => {
    const surge = PredictionService.predictSurge({ dayOfWeek: 'Monday', expectedWeather: 'Clear' });
    expect(surge.projectedFootfall).toBeGreaterThan(400);
    expect(surge.recommendedDoctors).toBeGreaterThan(3);
    expect(Array.isArray(surge.recommendations)).toBe(true);
  });

  it('DigitalTwinService simulates scenario throughput and wait reduction', () => {
    const sim = DigitalTwinService.runSimulation({
      surgeScenario: 'normal',
      additionalDoctors: 2,
      additionalRegistrationCounters: 1
    });

    expect(sim.simulatedWaitReductionPercent).toBeGreaterThan(0);
    expect(sim.predictedThroughputPerHour).toBeGreaterThan(0);
  });

  describe('QueueCapacityService: Doctor-wise Capacity & Buffer Tests', () => {
    it('parseShiftTime accurately parses 12-hour AM/PM and 24-hour shift strings', () => {
      const today = new Date();
      const parsed1 = QueueCapacityService.parseShiftTime('02:00 PM', today);
      expect(parsed1.getHours()).toBe(14);
      expect(parsed1.getMinutes()).toBe(0);

      const parsed2 = QueueCapacityService.parseShiftTime('09:30 AM', today);
      expect(parsed2.getHours()).toBe(9);
      expect(parsed2.getMinutes()).toBe(30);

      const parsed3 = QueueCapacityService.parseShiftTime('16:45', today);
      expect(parsed3.getHours()).toBe(16);
      expect(parsed3.getMinutes()).toBe(45);
    });

    it('rejects registration when doctor is unavailable', async () => {
      vi.spyOn(Doctor, 'findById').mockReturnValue({
        populate: vi.fn().mockResolvedValue({
          _id: 'doc-unavailable',
          isAvailable: false,
          specialization: 'Cardiologist',
          departmentId: { _id: 'dept-1' },
          userId: { name: 'Dr. Test' }
        })
      });
      vi.spyOn(QueueCapacityService, 'findAlternativeDoctors').mockResolvedValue([]);

      const result = await QueueCapacityService.calculateDoctorCapacity('doc-unavailable');
      expect(result.canAccept).toBe(false);
      expect(result.isAvailable).toBe(false);
      expect(result.reason).toContain('unavailable');
    });

    it('rejects registration when doctor OPD session has closed for the day', async () => {
      const refTime = dayjs().hour(15).minute(0).second(0).toDate(); // 3:00 PM
      vi.spyOn(Doctor, 'findById').mockReturnValue({
        populate: vi.fn().mockResolvedValue({
          _id: 'doc-closed',
          isAvailable: true,
          opdShift: { start: '09:00 AM', end: '02:00 PM' },
          averageConsultationTimeMinutes: 10,
          bufferCapacityLimit: 5,
          departmentId: { _id: 'dept-1' },
          userId: { name: 'Dr. Closed' }
        })
      });
      vi.spyOn(QueueCapacityService, 'findAlternativeDoctors').mockResolvedValue([]);

      const result = await QueueCapacityService.calculateDoctorCapacity('doc-closed', refTime);
      expect(result.canAccept).toBe(false);
      expect(result.isClosed).toBe(true);
      expect(result.reason).toContain('closed');
    });

    it('accepts standard patient when queue fits within remaining OPD time', async () => {
      // 12:00 PM, OPD ends at 2:00 PM (120 mins remaining). 10 mins/consultation. 5 patients = 50 mins.
      const refTime = dayjs().hour(12).minute(0).second(0).millisecond(0).toDate();
      vi.spyOn(Doctor, 'findById').mockReturnValue({
        populate: vi.fn().mockResolvedValue({
          _id: 'doc-available',
          isAvailable: true,
          opdShift: { start: '09:00 AM', end: '02:00 PM' },
          averageConsultationTimeMinutes: 10,
          bufferCapacityLimit: 5,
          departmentId: { _id: 'dept-1' },
          userId: { name: 'Dr. Active' }
        })
      });
      vi.spyOn(Queue, 'countDocuments').mockResolvedValue(5); // 5 patients active

      const result = await QueueCapacityService.calculateDoctorCapacity('doc-available', refTime);
      expect(result.canAccept).toBe(true);
      expect(result.isBuffer).toBe(false);
      expect(result.remainingOpdMinutes).toBe(120);
      expect(result.estimatedCompletionMinutes).toBe(50);
    });

    it('routes patient to buffer when queue exceeds remaining OPD time but buffer is available', async () => {
      // 12:00 PM, OPD ends at 2:00 PM (120 mins remaining). 10 mins/consultation. 14 patients = 140 mins (exceeds 120 mins).
      // Buffer count = 2, buffer limit = 5 -> accepted as buffer
      const refTime = dayjs().hour(12).minute(0).second(0).toDate();
      vi.spyOn(Doctor, 'findById').mockReturnValue({
        populate: vi.fn().mockResolvedValue({
          _id: 'doc-buffer',
          isAvailable: true,
          opdShift: { start: '09:00 AM', end: '02:00 PM' },
          averageConsultationTimeMinutes: 10,
          bufferCapacityLimit: 5,
          departmentId: { _id: 'dept-1' },
          userId: { name: 'Dr. Buffer' }
        })
      });
      vi.spyOn(Queue, 'countDocuments')
        .mockResolvedValueOnce(14) // active workload
        .mockResolvedValueOnce(2); // current buffer patients

      const result = await QueueCapacityService.calculateDoctorCapacity('doc-buffer', refTime);
      expect(result.canAccept).toBe(true);
      expect(result.isBuffer).toBe(true);
      expect(result.remainingBufferCapacity).toBe(3);
      expect(result.reason).toContain('buffer');
    });

    it('rejects registration when standard capacity and buffer quota are both exhausted', async () => {
      // 12:00 PM, OPD ends at 2:00 PM. 15 patients active. Buffer count = 5 (limit 5).
      const refTime = dayjs().hour(12).minute(0).second(0).toDate();
      vi.spyOn(Doctor, 'findById').mockReturnValue({
        populate: vi.fn().mockResolvedValue({
          _id: 'doc-full',
          isAvailable: true,
          opdShift: { start: '09:00 AM', end: '02:00 PM' },
          averageConsultationTimeMinutes: 10,
          bufferCapacityLimit: 5,
          departmentId: { _id: 'dept-1' },
          userId: { name: 'Dr. Full' }
        })
      });
      vi.spyOn(Queue, 'countDocuments')
        .mockResolvedValueOnce(15) // active workload
        .mockResolvedValueOnce(5); // buffer count 5 >= 5 limit
      vi.spyOn(QueueCapacityService, 'findAlternativeDoctors').mockResolvedValue([
        { id: 'doc-alt', name: 'Dr. Alternative', specialization: 'Physician', roomNumber: 'Room 102' }
      ]);

      const result = await QueueCapacityService.calculateDoctorCapacity('doc-full', refTime);
      expect(result.canAccept).toBe(false);
      expect(result.isBuffer).toBe(false);
      expect(result.reason).toContain('maximum booking capacity');
      expect(result.alternativeDoctors.length).toBeGreaterThan(0);
    });
  });

  describe('QueueService: Skipping & Reception Re-entry with 3-Place Penalty', () => {
    it('prevents duplicate scans if patient is already active in main queue', async () => {
      const mockQueue = {
        _id: 'q-active',
        tokenNumber: 'GEN-010',
        status: 'waiting',
        priorityScore: 10,
        sequenceNumber: 20,
        departmentId: { _id: 'dept-1', code: 'GEN' }
      };
      vi.spyOn(Queue, 'findOne').mockReturnValue({
        populate: vi.fn().mockResolvedValue(mockQueue)
      });
      vi.spyOn(Queue, 'countDocuments').mockResolvedValue(1);

      await expect(
        QueueService.rejoinPatient({ tokenNumber: 'GEN-010', verifiedByStaffId: 'staff-1' })
      ).rejects.toThrow(/Duplicate scan/);
    });

    it('rejoins skipped patient to active queue applying three-place penalty', async () => {
      const mockSkippedQueue = {
        _id: 'q-skipped-1',
        tokenNumber: 'GEN-005',
        status: 'skipped',
        priorityScore: 10,
        sequenceNumber: 50,
        departmentId: { _id: 'dept-1', code: 'GEN' },
        patientId: { userId: { _id: '507f1f77bcf86cd799439011' } },
        statusHistory: [],
        save: vi.fn().mockResolvedValue(true)
      };

      // Mock 8 active waiting patients (all priority 10)
      const mockActiveWaiting = Array.from({ length: 8 }, (_, i) => ({
        _id: `q-active-${i + 1}`,
        tokenNumber: `GEN-00${i + 1}`,
        priorityScore: 10,
        sequenceNumber: (i + 1) * 10
      }));

      vi.spyOn(Queue, 'findOne').mockReturnValue({
        populate: vi.fn().mockResolvedValue(mockSkippedQueue)
      });
      vi.spyOn(Queue, 'find').mockReturnValue({
        sort: vi.fn().mockResolvedValue(mockActiveWaiting)
      });
      vi.spyOn(Queue, 'updateOne').mockResolvedValue({ modifiedCount: 1 });
      vi.spyOn(QueueService, 'calculateWaitTime').mockResolvedValue(25);
      vi.spyOn(QueueService, 'recalculateDepartmentWaitTimes').mockResolvedValue();
      vi.spyOn(Notification, 'create').mockResolvedValue({});
      vi.spyOn(notifService, 'sendNotification').mockResolvedValue(true);

      const result = await QueueService.rejoinPatient({
        tokenNumber: 'GEN-005',
        verifiedByStaffId: 'staff-1'
      });

      // Natural position was index 0 (position 1). With 3-place penalty: index 3 -> Position #4!
      expect(result.newPosition).toBe(4);
      expect(mockSkippedQueue.status).toBe('waiting');
      expect(mockSkippedQueue.reentryPenaltyApplied).toBe(true);
      expect(mockSkippedQueue.reentryPenaltyPositions).toBe(3);
      expect(mockSkippedQueue.tokenNumber).toBe('GEN-005'); // original token identity preserved!
      expect(mockSkippedQueue.statusHistory.length).toBeGreaterThan(0);
      expect(mockSkippedQueue.statusHistory[0].note).toContain('3-place penalty');
    });
  });
});
