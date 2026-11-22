import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const DigitalPrescriptionsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Digital Pharmacy &amp; QR Dispensing
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Digital Prescriptions
          </h1>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-[#0F766E] text-white font-bold text-xs rounded-xl hover:bg-[#115E59] transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          Print Official Prescription Slip
        </button>
      </div>

      {/* Main Active Digital Prescription Slip */}
      <div className="bento-card-solid rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Prescription Hospital Letterhead */}
        <div className="bg-gradient-to-r from-[#0F766E] to-[#115E59] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-2xl text-white">local_hospital</span>
            </div>
            <div>
              <div className="font-headline text-lg font-bold">Civil Hospital Ambala</div>
              <div className="text-xs text-teal-100">
                Department of General Medicine • OPD Room 12
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="font-mono font-bold text-amber-300 text-sm tracking-tight">Rx-2026-8812</div>
            <div className="text-teal-100 text-[11px]">Date: Today, 10:15 AM</div>
          </div>
        </div>

        {/* Patient Details Row */}
        <div className="p-6 bg-slate-50/80 border-b border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
            <span className="font-bold text-slate-900">{user?.name || 'Registered Patient'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient ID / Gender</span>
            <span className="font-bold text-slate-900">{user?.id || 'PT-Registered'} • Active</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">ABHA ID</span>
            <span className="font-mono font-bold text-[#0F766E]">{user?.abhaId || 'Linked via NHM'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Prescribing Doctor</span>
            <span className="font-bold text-slate-900">Dr. Rajesh Sharma, MD</span>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-extrabold text-[#0F766E]">Rx</span>
            <span className="text-xs font-semibold text-slate-500">
              (Generic Medicines Directly Synced to Jan Aushadhi Chemist Desk #3)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Medicine &amp; Strength</th>
                  <th className="p-3">Dosage</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Consumption Timing</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Instructions</th>
                  <th className="p-3">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-400">1</td>
                  <td className="p-3 font-bold text-slate-900">Amoxicillin + Clavulanate 625mg</td>
                  <td className="p-3 text-slate-600">1 Tablet</td>
                  <td className="p-3 font-mono font-bold text-slate-900">10</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20">
                      After breakfast
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-[#0F766E]">Twice daily</td>
                  <td className="p-3 text-slate-600">5 Days</td>
                  <td className="p-3 text-slate-600">After Food with warm water</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                      Available in Jan Aushadhi
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-400">2</td>
                  <td className="p-3 font-bold text-slate-900">Paracetamol 650mg Tab</td>
                  <td className="p-3 text-slate-600">1 Tablet</td>
                  <td className="p-3 font-mono font-bold text-slate-900">6</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20">
                      After dinner
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-[#0F766E]">Once daily</td>
                  <td className="p-3 text-slate-600">3 Days</td>
                  <td className="p-3 text-slate-600">If fever &gt; 100°F (SOS)</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                      Available in Jan Aushadhi
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-400">3</td>
                  <td className="p-3 font-bold text-slate-900">Pantoprazole 40mg Tab</td>
                  <td className="p-3 text-slate-600">1 Tablet</td>
                  <td className="p-3 font-mono font-bold text-slate-900">5</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F4F1] text-[#0F766E] border border-[#0F766E]/20">
                      Before breakfast
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-[#0F766E]">Once daily</td>
                  <td className="p-3 text-slate-600">5 Days</td>
                  <td className="p-3 text-slate-600">30 mins before morning breakfast</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                      Available in Jan Aushadhi
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QR Barcode for Instant Counter Dispensing */}
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white p-1 rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-4xl text-slate-800">qr_code_2</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Scan at Jan Aushadhi Pharmacy Counter #03
                </div>
                <div className="text-[11px] text-slate-500">
                  Pharmacist barcode scanner will verify medicine batch and package automatically.
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Prescription sent via WhatsApp & SMS to +91 9812401824')}
              className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs transition-colors"
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
