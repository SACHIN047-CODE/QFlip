import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const TermsAndConditionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms & Conditions — QFlip (CAREFLOW) Hospital Operations Platform';
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-light-outline pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary/10 text-secondary text-xs font-semibold mb-3">
          <span className="material-symbols-outlined text-sm">gavel</span>
          <span>Platform Use Terms &amp; Medical Service Rules</span>
        </div>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-xs sm:text-sm text-light-on-surface-variant mt-2">
          Effective Date: January 1, {new Date().getFullYear()} • Version 2.2 (Civil Hospital Operations)
        </p>
      </div>

      {/* Critical Medical Disclaimer Banner */}
      <div className="p-5 bg-danger/10 rounded-2xl border border-danger/30 flex items-start gap-4 text-xs text-light-primary leading-relaxed">
        <span className="material-symbols-outlined text-danger text-2xl flex-shrink-0 mt-0.5">warning</span>
        <div>
          <strong className="font-bold text-danger block mb-1">EMERGENCY MEDICAL DISCLAIMER</strong>
          QFlip (CAREFLOW) is an OPD queue management, digital token tracking, and administrative orchestration system. 
          It is <strong>NOT</strong> an emergency dispatch service. If you or someone in your vicinity is experiencing a life-threatening 
          emergency (such as severe chest pain, major trauma, stroke symptoms, or severe respiratory distress), immediately call{' '}
          <a href="tel:108" className="font-bold text-danger underline">108</a> or proceed directly to the Hospital Emergency Trauma Center.
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-light-on-surface-variant leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the CAREFLOW (QFlip) platform, including web dashboards, voice kiosks, patient token portals, and staff command systems, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, you should not utilize the digital booking services and may register via manual in-person counters at the hospital.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            2. Scope of Services
          </h2>
          <p>
            CAREFLOW provides digital workflow management designed for participating government, civil, and district hospitals:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Patient lookup, walk-in registration, and Ayushman Bharat ABHA linking.</li>
            <li>Multi-lingual voice symptom triage to suggest relevant clinical departments.</li>
            <li>Dynamic digital queue token generation with estimated waiting time calculations.</li>
            <li>Real-time token call updates via web sockets and SMS alerts.</li>
            <li>Clinician electronic consultation records, e-prescriptions, and laboratory diagnostic order routing.</li>
            <li>Jan Aushadhi pharmacy queue fulfillment and patient grievance tracking.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            3. Patient Responsibilities &amp; Token Protocol
          </h2>
          <p>Patients and attendants utilizing the platform agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate legal identity, contact phone number, and truthful medical symptoms.</li>
            <li>Report to the assigned OPD room promptly when their token number is called. If a patient is absent after three automated calls, the token will be marked as "Skipped" in accordance with hospital OPD protocols.</li>
            <li>Maintain queue discipline and adhere to staff instructions within hospital premises.</li>
            <li>Keep login credentials and private patient tokens confidential to protect medical privacy.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            4. Clinical Decision-Support &amp; AI Disclaimer
          </h2>
          <p>
            The artificial intelligence triage features (including multi-lingual voice intake and symptom categorization) are intended solely as clinical decision-support tools. They provide non-binding recommendations to guide queue placement and do <strong>NOT</strong> constitute professional medical diagnosis, treatment plans, or clinical guarantees. Ultimate clinical diagnosis, prescription issuance, and treatment decisions remain exclusively with the authorized attending physician.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            5. Estimated Wait Times &amp; Delays
          </h2>
          <p>
            Estimated wait times displayed on the Smart Queue Tracker are calculated dynamically based on real-time doctor throughput and historical OPD benchmarks. While we endeavor to ensure high accuracy, unexpected delays may occur due to emergency trauma cases requiring immediate clinician intervention, complicated surgical consultations, or unforeseen equipment maintenance. The hospital reserves the right to prioritize critical and emergency triage cases ahead of scheduled queue sequence numbers.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            6. Doctor &amp; Staff Authorized Use
          </h2>
          <p>
            Authorized medical officers, nursing staff, technicians, and administrators accessing internal command dashboards are bound by institutional codes of conduct, patient confidentiality guidelines, and role security protocols. Doctor authorization passkeys must never be shared or delegated to unauthorized persons.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            7. Intellectual Property &amp; Open Standards
          </h2>
          <p>
            All interface designs, algorithms, simulation models, and branding elements associated with QFlip (CAREFLOW) are protected by applicable intellectual property and copyright laws. Integration connectors follow open national healthcare interoperability standards published by the National Health Authority (NHA).
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            8. Limitation of Liability &amp; Governing Law
          </h2>
          <p>
            In no event shall QFlip Technologies, the participating Civil Hospital administration, or the Department of Health be held liable for indirect, incidental, or consequential damages resulting from technical interruptions, telecom SMS network delays, or incorrect patient-provided information.
          </p>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute or proceeding arising out of or related to platform usage shall be subject to the exclusive jurisdiction of the competent courts in the state of hospital operations.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 p-6 bg-light-surface-variant/70 rounded-2xl border border-light-outline">
          <h2 className="font-headline text-title-lg font-bold text-light-primary">
            9. Hospital Grievance &amp; Contact Inquiries
          </h2>
          <p>
            For questions regarding these Terms or to submit an operational inquiry, please contact the Hospital Superintendent Administration:
          </p>
          <div className="space-y-1 text-xs text-light-primary font-medium mt-3">
            <div><strong>Department:</strong> Hospital Superintendent &amp; Administrative Grievance Cell</div>
            <div><strong>Hospital:</strong> Civil Hospital Complex, OPD Administrative Wing, Ambala</div>
            <div>
              <strong>Helpline:</strong>{' '}
              <a href="tel:18001802026" className="text-secondary font-bold hover:underline">
                1800 180 2026
              </a>
              {' '}(Toll Free) •{' '}
              <a href="tel:01712550102" className="text-secondary font-bold hover:underline">
                0171-2550102
              </a>
            </div>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@qflip.gov.in" className="text-secondary font-bold hover:underline">
                support@qflip.gov.in
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
          to="/privacy"
          className="text-xs text-secondary font-bold hover:underline"
        >
          Read Privacy Policy &rarr;
        </Link>
      </div>
    </div>
  );
};

