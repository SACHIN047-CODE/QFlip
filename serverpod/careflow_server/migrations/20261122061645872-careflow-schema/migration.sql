BEGIN;

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_appointments" (
    "id" bigserial PRIMARY KEY,
    "appointmentNumber" text NOT NULL,
    "patientId" bigint NOT NULL,
    "doctorId" bigint,
    "departmentId" bigint NOT NULL,
    "appointmentDate" timestamp without time zone NOT NULL,
    "timeSlot" text NOT NULL,
    "status" text NOT NULL DEFAULT 'scheduled'::text,
    "reason" text,
    "symptoms" text,
    "notes" text,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_consultations" (
    "id" bigserial PRIMARY KEY,
    "consultationId" text NOT NULL,
    "patientId" bigint NOT NULL,
    "doctorId" bigint NOT NULL,
    "departmentId" bigint NOT NULL,
    "queueId" bigint,
    "chiefComplaints" text NOT NULL,
    "clinicalObservations" text,
    "diagnosis" text NOT NULL,
    "bp" text,
    "pulse" text,
    "temperature" text,
    "spO2" text,
    "weight" text,
    "clinicalNotes" text,
    "followUpDate" timestamp without time zone,
    "status" text NOT NULL DEFAULT 'completed'::text,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_departments" (
    "id" bigserial PRIMARY KEY,
    "name" text NOT NULL,
    "code" text NOT NULL,
    "description" text,
    "floor" text NOT NULL DEFAULT 'Ground Floor'::text,
    "roomNumbers" json,
    "averageWaitTimeMinutes" bigint NOT NULL DEFAULT 20,
    "maxDailyCapacity" bigint NOT NULL DEFAULT 250,
    "isActive" boolean NOT NULL DEFAULT true,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

-- Indexes
CREATE UNIQUE INDEX "department_code_idx" ON "careflow_departments" USING btree ("code");

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_doctors" (
    "id" bigserial PRIMARY KEY,
    "doctorId" text NOT NULL,
    "userId" bigint NOT NULL,
    "departmentId" bigint NOT NULL,
    "specialization" text NOT NULL,
    "qualification" text NOT NULL DEFAULT 'MBBS, MD'::text,
    "roomNumber" text NOT NULL DEFAULT 'Room 101'::text,
    "opdShiftStart" text NOT NULL DEFAULT '09:00 AM'::text,
    "opdShiftEnd" text NOT NULL DEFAULT '02:00 PM'::text,
    "isAvailable" boolean NOT NULL DEFAULT true,
    "maxDailyPatients" bigint NOT NULL DEFAULT 50,
    "consultationFee" double precision NOT NULL DEFAULT 0.0,
    "averageConsultationTimeMinutes" bigint NOT NULL DEFAULT 10,
    "bufferCapacityLimit" bigint NOT NULL DEFAULT 5,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

-- Indexes
CREATE UNIQUE INDEX "doctor_doctor_id_idx" ON "careflow_doctors" USING btree ("doctorId");

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_feedback" (
    "id" bigserial PRIMARY KEY,
    "patientId" bigint,
    "departmentId" bigint,
    "doctorId" bigint,
    "rating" bigint NOT NULL,
    "category" text NOT NULL DEFAULT 'overall'::text,
    "comments" text,
    "ticketId" text NOT NULL,
    "status" text NOT NULL DEFAULT 'open'::text,
    "resolutionNote" text,
    "isAnonymous" boolean NOT NULL DEFAULT false,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_hospital_resources" (
    "id" bigserial PRIMARY KEY,
    "resourceType" text NOT NULL,
    "resourceName" text NOT NULL,
    "identifier" text NOT NULL,
    "ward" text NOT NULL DEFAULT 'General Ward A'::text,
    "status" text NOT NULL DEFAULT 'available'::text,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_lab_tests" (
    "id" bigserial PRIMARY KEY,
    "testRequestId" text NOT NULL,
    "consultationId" bigint,
    "patientId" bigint NOT NULL,
    "doctorId" bigint NOT NULL,
    "testCategory" text NOT NULL DEFAULT 'Hematology'::text,
    "testName" text NOT NULL,
    "priority" text NOT NULL DEFAULT 'routine'::text,
    "status" text NOT NULL DEFAULT 'requested'::text,
    "sampleCollectedAt" timestamp without time zone,
    "resultSummary" text,
    "reportUrl" text,
    "completedAt" timestamp without time zone,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_notifications" (
    "id" bigserial PRIMARY KEY,
    "recipientUserId" bigint NOT NULL,
    "title" text NOT NULL,
    "message" text NOT NULL,
    "type" text NOT NULL DEFAULT 'queue_update'::text,
    "isRead" boolean NOT NULL DEFAULT false,
    "tokenNumber" text,
    "department" text,
    "urgency" text,
    "createdAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_patients" (
    "id" bigserial PRIMARY KEY,
    "patientId" text NOT NULL,
    "userId" bigint NOT NULL,
    "age" bigint,
    "gender" text NOT NULL DEFAULT 'Male'::text,
    "bloodGroup" text NOT NULL DEFAULT 'Unknown'::text,
    "abhaId" text,
    "emergencyContactName" text,
    "emergencyContactPhone" text,
    "address" text,
    "registrationDate" timestamp without time zone,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

-- Indexes
CREATE UNIQUE INDEX "patient_patient_id_idx" ON "careflow_patients" USING btree ("patientId");

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_pharmacy_orders" (
    "id" bigserial PRIMARY KEY,
    "orderNumber" text NOT NULL,
    "prescriptionId" bigint NOT NULL,
    "patientId" bigint NOT NULL,
    "totalAmount" double precision NOT NULL DEFAULT 0.0,
    "paymentStatus" text NOT NULL DEFAULT 'exempt_gov'::text,
    "status" text NOT NULL DEFAULT 'received'::text,
    "dispensedAt" timestamp without time zone,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_prescription_items" (
    "id" bigserial PRIMARY KEY,
    "prescriptionId" bigint NOT NULL,
    "medicineName" text NOT NULL,
    "dosage" text NOT NULL,
    "quantity" bigint,
    "consumptionTiming" text NOT NULL DEFAULT 'After breakfast'::text,
    "frequency" text NOT NULL DEFAULT 'Twice daily'::text,
    "duration" text NOT NULL DEFAULT '5 days'::text,
    "instructions" text,
    "isDispensed" boolean NOT NULL DEFAULT false
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_prescriptions" (
    "id" bigserial PRIMARY KEY,
    "prescriptionNumber" text NOT NULL,
    "consultationId" bigint NOT NULL,
    "patientId" bigint NOT NULL,
    "doctorId" bigint NOT NULL,
    "dietaryAdvice" text,
    "status" text NOT NULL DEFAULT 'pending_pharmacy'::text,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_queue" (
    "id" bigserial PRIMARY KEY,
    "tokenNumber" text NOT NULL,
    "sequenceNumber" bigint NOT NULL,
    "patientId" bigint NOT NULL,
    "doctorId" bigint,
    "departmentId" bigint NOT NULL,
    "status" text NOT NULL DEFAULT 'waiting'::text,
    "triageLevel" text NOT NULL DEFAULT 'green'::text,
    "priorityScore" bigint NOT NULL DEFAULT 10,
    "symptoms" text,
    "estimatedWaitTimeMinutes" bigint NOT NULL DEFAULT 15,
    "checkInTime" timestamp without time zone,
    "callTime" timestamp without time zone,
    "consultationStartTime" timestamp without time zone,
    "completionTime" timestamp without time zone,
    "delayReason" text,
    "isBuffer" boolean NOT NULL DEFAULT false,
    "entryType" text NOT NULL DEFAULT 'standard'::text,
    "skippedAt" timestamp without time zone,
    "rejoinedAt" timestamp without time zone,
    "reentryPenaltyApplied" boolean NOT NULL DEFAULT false,
    "reentryPenaltyPositions" bigint NOT NULL DEFAULT 3,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

-- Indexes
CREATE INDEX "queue_token_number_idx" ON "careflow_queue" USING btree ("tokenNumber");

--
-- ACTION CREATE TABLE
--
CREATE TABLE "careflow_users" (
    "id" bigserial PRIMARY KEY,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "phone" text NOT NULL,
    "passwordHash" text,
    "role" text NOT NULL,
    "isActive" boolean NOT NULL DEFAULT true,
    "isVerified" boolean NOT NULL DEFAULT true,
    "lastLogin" timestamp without time zone,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);

-- Indexes
CREATE UNIQUE INDEX "user_email_idx" ON "careflow_users" USING btree ("email");

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_appointments"
    ADD CONSTRAINT "careflow_appointments_fk_0"
    FOREIGN KEY("patientId")
    REFERENCES "careflow_patients"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_appointments"
    ADD CONSTRAINT "careflow_appointments_fk_1"
    FOREIGN KEY("doctorId")
    REFERENCES "careflow_doctors"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_appointments"
    ADD CONSTRAINT "careflow_appointments_fk_2"
    FOREIGN KEY("departmentId")
    REFERENCES "careflow_departments"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_consultations"
    ADD CONSTRAINT "careflow_consultations_fk_0"
    FOREIGN KEY("patientId")
    REFERENCES "careflow_patients"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_consultations"
    ADD CONSTRAINT "careflow_consultations_fk_1"
    FOREIGN KEY("doctorId")
    REFERENCES "careflow_doctors"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_consultations"
    ADD CONSTRAINT "careflow_consultations_fk_2"
    FOREIGN KEY("departmentId")
    REFERENCES "careflow_departments"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_consultations"
    ADD CONSTRAINT "careflow_consultations_fk_3"
    FOREIGN KEY("queueId")
    REFERENCES "careflow_queue"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_doctors"
    ADD CONSTRAINT "careflow_doctors_fk_0"
    FOREIGN KEY("userId")
    REFERENCES "careflow_users"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_doctors"
    ADD CONSTRAINT "careflow_doctors_fk_1"
    FOREIGN KEY("departmentId")
    REFERENCES "careflow_departments"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_feedback"
    ADD CONSTRAINT "careflow_feedback_fk_0"
    FOREIGN KEY("patientId")
    REFERENCES "careflow_patients"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_feedback"
    ADD CONSTRAINT "careflow_feedback_fk_1"
    FOREIGN KEY("departmentId")
    REFERENCES "careflow_departments"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_feedback"
    ADD CONSTRAINT "careflow_feedback_fk_2"
    FOREIGN KEY("doctorId")
    REFERENCES "careflow_doctors"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_lab_tests"
    ADD CONSTRAINT "careflow_lab_tests_fk_0"
    FOREIGN KEY("consultationId")
    REFERENCES "careflow_consultations"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_lab_tests"
    ADD CONSTRAINT "careflow_lab_tests_fk_1"
    FOREIGN KEY("patientId")
    REFERENCES "careflow_patients"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_lab_tests"
    ADD CONSTRAINT "careflow_lab_tests_fk_2"
    FOREIGN KEY("doctorId")
    REFERENCES "careflow_doctors"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_notifications"
    ADD CONSTRAINT "careflow_notifications_fk_0"
    FOREIGN KEY("recipientUserId")
    REFERENCES "careflow_users"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_patients"
    ADD CONSTRAINT "careflow_patients_fk_0"
    FOREIGN KEY("userId")
    REFERENCES "careflow_users"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_pharmacy_orders"
    ADD CONSTRAINT "careflow_pharmacy_orders_fk_0"
    FOREIGN KEY("prescriptionId")
    REFERENCES "careflow_prescriptions"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_pharmacy_orders"
    ADD CONSTRAINT "careflow_pharmacy_orders_fk_1"
    FOREIGN KEY("patientId")
    REFERENCES "careflow_patients"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_prescription_items"
    ADD CONSTRAINT "careflow_prescription_items_fk_0"
    FOREIGN KEY("prescriptionId")
    REFERENCES "careflow_prescriptions"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_prescriptions"
    ADD CONSTRAINT "careflow_prescriptions_fk_0"
    FOREIGN KEY("consultationId")
    REFERENCES "careflow_consultations"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_prescriptions"
    ADD CONSTRAINT "careflow_prescriptions_fk_1"
    FOREIGN KEY("patientId")
    REFERENCES "careflow_patients"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_prescriptions"
    ADD CONSTRAINT "careflow_prescriptions_fk_2"
    FOREIGN KEY("doctorId")
    REFERENCES "careflow_doctors"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

--
-- ACTION CREATE FOREIGN KEY
--
ALTER TABLE ONLY "careflow_queue"
    ADD CONSTRAINT "careflow_queue_fk_0"
    FOREIGN KEY("patientId")
    REFERENCES "careflow_patients"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_queue"
    ADD CONSTRAINT "careflow_queue_fk_1"
    FOREIGN KEY("doctorId")
    REFERENCES "careflow_doctors"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
ALTER TABLE ONLY "careflow_queue"
    ADD CONSTRAINT "careflow_queue_fk_2"
    FOREIGN KEY("departmentId")
    REFERENCES "careflow_departments"("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;


--
-- MIGRATION VERSION FOR careflow
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('careflow', '20261122061645872-careflow-schema', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20261122061645872-careflow-schema', "timestamp" = now();

--
-- MIGRATION VERSION FOR serverpod
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('serverpod', '20260824182259319', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20260824182259319', "timestamp" = now();

--
-- MIGRATION VERSION FOR serverpod_auth_idp
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('serverpod_auth_idp', '20261015164015382', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20261015164015382', "timestamp" = now();

--
-- MIGRATION VERSION FOR serverpod_auth_core
--
INSERT INTO "serverpod_migrations" ("module", "version", "timestamp")
    VALUES ('serverpod_auth_core', '20260924105232991', now())
    ON CONFLICT ("module")
    DO UPDATE SET "version" = '20260924105232991', "timestamp" = now();


COMMIT;
