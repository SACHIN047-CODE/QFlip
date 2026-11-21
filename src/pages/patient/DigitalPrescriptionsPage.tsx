import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const DigitalPrescriptionsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-light-outline">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Digital Pharmacy &amp; QR Dispensing
          </span>
          <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
            Digital Prescriptions
          </h1>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-light-primary text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          Print Official Prescription Slip
        </button>
      </div>

      {/* Main Active Digital Prescription Slip */}
      <div className="bg-light-surface rounded-2xl border-2 border-secondary/40 shadow-xl overflow-hidden">
        {/* Prescription Hospital Letterhead */}
        <div className="bg-gradient-to-r from-light-primary to-slate-800 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10">
              <path
                d="M4 18L10 6L18 28L24 14L30 22"
                stroke="#2585E8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <circle cx="30" cy="22" r="3.5" fill="#F2D500"></circle>
            </svg>
            <div>
              <div className="font-headline text-lg font-bold">Civil Hospital Ambala</div>
              <div className="text-xs text-slate-300">
                Department of General Medicine • OPD Room 12
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="font-code font-bold text-accent text-sm">Rx-2026-8812</div>
            <div className="text-slate-300">Date: Today, 10:15 AM</div>
          </div>
        </div>

        {/* Patient Details Row */}
        <div className="p-6 bg-light-surface-variant/40 border-b border-light-outline grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Patient Name</span>
            <span className="font-bold text-light-primary">{user?.name || 'Registered Patient'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Patient ID / Gender</span>
            <span className="font-bold text-light-primary">{user?.id || 'PT-10088'} • Active</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">ABHA ID</span>
            <span className="font-code font-bold text-secondary">{user?.abhaId || '91-8274-1049-9812'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Prescribing Doctor</span>
            <span className="font-bold text-light-primary">Dr. Rajesh Sharma, MD</span>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-headline text-2xl font-extrabold text-secondary font-code">Rx</span>
            <span className="text-xs font-semibold text-light-on-surface-variant">
              (Directly Synced to Jan Aushadhi Chemist Desk #3)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-light-surface-variant text-light-on-surface-variant uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Medicine &amp; Strength</th>
                  <th className="p-3">Dosage</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Instructions</th>
                  <th className="p-3">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-outline">
                <tr>
                  <td className="p-3 font-bold">1</td>
                  <td className="p-3 font-bold text-light-primary">Amoxicillin + Clavulanate 625mg</td>
                  <td className="p-3">1 Tablet</td>
                  <td className="p-3 font-semibold text-secondary">Twice daily</td>
                  <td className="p-3">5 Days</td>
                  <td className="p-3">After Food</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-success/15 text-success font-bold text-[10px]">
                      Available in Jan Aushadhi
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">2</td>
                  <td className="p-3 font-bold text-light-primary">Paracetamol 650mg Tab</td>
                  <td className="p-3">1 Tablet</td>
                  <td className="p-3 font-semibold text-secondary">Thrice daily (SOS)</td>
                  <td className="p-3">3 Days</td>
                  <td className="p-3">If fever &gt; 100°F</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-success/15 text-success font-bold text-[10px]">
                      Available in Jan Aushadhi
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">3</td>
                  <td className="p-3 font-bold text-light-primary">Pantoprazole 40mg Tab</td>
                  <td className="p-3">1 Tablet</td>
                  <td className="p-3 font-semibold text-secondary">Once daily</td>
                  <td className="p-3">5 Days</td>
                  <td className="p-3">30 mins before breakfast</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-success/15 text-success font-bold text-[10px]">
                      Available in Jan Aushadhi
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QR Barcode for Instant Counter Dispensing */}
          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white p-1 rounded-lg border border-light-outline flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-light-primary">qr_code_2</span>
              </div>
              <div>
                <div className="font-headline text-xs font-bold text-light-primary">
                  Scan at Jan Aushadhi Pharmacy Counter #03
                </div>
                <div className="text-[11px] text-light-on-surface-variant">
                  Pharmacist barcode scanner will verify medicine batch and package automatically.
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Prescription sent via WhatsApp & SMS to +91 9812401824')}
              className="px-4 py-2 bg-success text-white font-bold text-xs rounded-lg hover:bg-success/90 flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              Get WhatsApp Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
