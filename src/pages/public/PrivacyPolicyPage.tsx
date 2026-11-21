import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy — QFlip (CAREFLOW) Hospital Operations Platform';
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-light-outline pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary/10 text-secondary text-xs font-semibold mb-3">
          <span className="material-symbols-outlined text-sm">security</span>
          <span>Data Protection &amp; Patient Privacy Standards</span>
        </div>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-light-on-surface-variant mt-2">
          Effective Date: January 1, {new Date().getFullYear()} • Version 2.4 (ABDM &amp; DPDP Compliant)
        </p>
      </div>

      {/* Overview Notice Box */}
      <div className="p-5 bg-secondary/5 rounded-2xl border border-secondary/20 flex items-start gap-4 text-xs text-light-primary leading-relaxed">
        <span className="material-symbols-outlined text-secondary text-2xl flex-shrink-0 mt-0.5">verified_user</span>
        <div>
          <strong className="font-bold block mb-1">Our Commitment to Patient Medical Privacy</strong>
          CAREFLOW (QFlip) is deployed in government, civil, and district hospitals to coordinate outpatient department (OPD) queues, clinical triage, digital prescriptions, and diagnostic workflows. Protecting your Personal Identifiable Information (PII) and Protected Health Information (PHI) is fundamental to our public health mission.
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-light-on-surface-variant leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary flex items-center gap-2">
            <span>1. Information We Collect</span>
          </h2>
          <p>
            When you register at an OPD desk, generate a token, or access patient services through QFlip, we collect only the necessary information to provide medical care:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Demographic Identifiers:</strong> Legal patient name, mobile phone number, age, gender, residential address, and emergency contact details.
            </li>
            <li>
              <strong>National Health Identifiers:</strong> Ayushman Bharat Health Account (ABHA ID / Address) provided voluntarily for digital health record synchronization under the Ayushman Bharat Digital Mission (ABDM).
            </li>
            <li>
              <strong>Clinical Triage Data:</strong> Reported symptoms, primary complaints, vital signs recorded during triage, and urgency level (Emergency, Urgent, Normal).
            </li>
            <li>
              <strong>Operational Queue Records:</strong> Department assigned, token number, sequence number, timestamps of check-in, call time, and consultation completion.
            </li>
            <li>
              <strong>Clinical Outcomes &amp; Orders:</strong> Doctor consultation summaries, diagnoses, digital prescriptions (e-Rx), laboratory investigation requisitions, and Jan Aushadhi pharmacy dispensing status.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary flex items-center gap-2">
            <span>2. Purpose and Use of Data Processing</span>
          </h2>
          <p>We process your health and queue data strictly for clinical and operational purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Accurately assigning patients to appropriate OPD specialties and doctor consultation desks.</li>
            <li>Calculating live queue position and estimated wait times to reduce waiting hall congestion.</li>
            <li>Transmitting real-time SMS notifications regarding token calls, doctor readiness, and lab report availability.</li>
            <li>Enabling doctors to review electronic health records and prescribe medications digitally.</li>
            <li>Directing diagnostic test requests to the hospital clinical laboratory and pharmacy orders to Jan Aushadhi counters.</li>
            <li>Investigating and resolving patient grievances and feedback submitted through our grievance redressal portal.</li>
            <li>Aggregating anonymized hospital flow metrics to assist hospital superintendents with staffing and surge planning.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary flex items-center gap-2">
            <span>3. Legal Basis and Regulatory Compliance</span>
          </h2>
          <p>
            CAREFLOW operates in full compliance with applicable healthcare data protection laws and Indian digital governance standards:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Digital Personal Data Protection Act (DPDP Act, 2023):</strong> Strict consent mechanisms, data minimization, and purpose limitation for processing personal health data.</li>
            <li><strong>National Health Authority (NHA) ABDM M2/M3 Standards:</strong> Secure consent-managed health information exchange using standardized FHIR (Fast Healthcare Interoperability Resources) data schemas.</li>
            <li><strong>Information Technology Act, 2000 &amp; SPDI Rules:</strong> Rigorous security practices for Sensitive Personal Data or Information.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary flex items-center gap-2">
            <span>4. Data Security &amp; Storage Architecture</span>
          </h2>
          <p>
            We implement defense-in-depth security controls to prevent unauthorized access, alteration, or disclosure:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Encryption in Transit:</strong> All communications between the browser, mobile clients, and backend APIs are secured with TLS 1.3 / HTTPS.</li>
            <li><strong>Role-Based Access Control (RBAC):</strong> Hospital staff can access only records relevant to their clinical role (Doctors, Triage Nurses, Pharmacists, Lab Technicians, Administrators).</li>
            <li><strong>Secure Authentication:</strong> JWT-based sessions, bcrypt password hashing with unique salts, and multi-factor authorization PINs for clinical actions.</li>
            <li><strong>Audit Logging:</strong> Every record access, status transition, and prescription update is permanently recorded in tamper-evident audit logs.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary flex items-center gap-2">
            <span>5. Third-Party Integrations &amp; AI Processing</span>
          </h2>
          <p>
            Certain features utilize dedicated integrations under strict data protection covenants:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Ayushman Bharat Digital Mission (ABDM):</strong> Allows federated ABHA verification. Medical data is never sold, leased, or commercialized.
            </li>
            <li>
              <strong>AI Triage Assistance (Google Gemini):</strong> Voice symptoms spoken in Hindi, Punjabi, or English are converted to text and evaluated to suggest matching OPD specialties. All AI triage calls use anonymized symptom descriptors stripped of direct patient names, phone numbers, or government IDs.
            </li>
            <li>
              <strong>Cloudinary (Diagnostic Imaging):</strong> Where enabled, lab diagnostic reports and imaging scans are stored in encrypted, access-restricted medical storage containers.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary flex items-center gap-2">
            <span>6. Your Rights Under DPDP Act</span>
          </h2>
          <p>As a patient or registered user, you retain the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access a summary of your personal health data and active queue tokens.</li>
            <li>Request correction or rectification of inaccurate contact or demographic details.</li>
            <li>Withdraw consent for optional communications, subject to statutory medical record retention rules.</li>
            <li>File an official grievance regarding data handling directly with the Hospital Grievance Officer.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 p-6 bg-light-surface-variant/70 rounded-2xl border border-light-outline">
          <h2 className="font-headline text-title-lg font-bold text-light-primary flex items-center gap-2">
            <span>7. Grievance Officer &amp; Contact Details</span>
          </h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or your healthcare data, please reach out to our designated Data Protection &amp; Patient Grievance Officer:
          </p>
          <div className="space-y-1 text-xs text-light-primary font-medium mt-3">
            <div><strong>Designation:</strong> Patient Grievance &amp; IT Security Officer</div>
            <div><strong>Institution:</strong> Civil Hospital Complex, OPD Main Wing</div>
            <div><strong>Location:</strong> Ambala, Haryana - 134003, India</div>
            <div>
              <strong>Toll-Free Helpline:</strong>{' '}
              <a href="tel:18001802026" className="text-secondary font-bold hover:underline">
                1800 180 2026
              </a>
            </div>
            <div>
              <strong>Hospital Desk:</strong>{' '}
              <a href="tel:01712550102" className="text-secondary font-bold hover:underline">
                0171-2550102
              </a>
            </div>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@qflip.gov.in" className="text-secondary font-bold hover:underline">
                privacy@qflip.gov.in
              </a>
              {' '}or{' '}
              <a href="mailto:grievance@ambalahospital.gov.in" className="text-secondary font-bold hover:underline">
                grievance@ambalahospital.gov.in
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation Back */}
      <div className="pt-6 border-t border-light-outline flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-light-surface-variant hover:bg-light-outline text-light-primary text-xs font-bold transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/terms"
          className="text-xs text-secondary font-bold hover:underline"
        >
          Read Terms and Conditions &rarr;
        </Link>
      </div>
    </div>
  );
};

