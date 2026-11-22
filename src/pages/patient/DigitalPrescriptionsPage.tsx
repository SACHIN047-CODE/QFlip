import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const DigitalPrescriptionsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header Card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Digital Pharmacy &amp; QR Dispensing
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Digital Prescriptions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Civil Hospital Ambala • Verified Electronic Health Record (EHR) & Jan Aushadhi Dispensing
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-[#0F766E] text-white font-bold text-xs rounded-xl hover:bg-[#115E59] transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          Print Official Prescription Slip
        </button>
      </div>

      {/* 3 Stat Bento Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Active Medicines</span>
            <span className="material-symbols-outlined text-lg text-[#0F766E]">medication</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#0F766E] mt-1 tabular-nums">3 Prescribed</div>
          <span className="text-[11px] text-slate-500">Antibiotic, Analgesic & Antacid</span>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Jan Aushadhi Status</span>
            <span className="material-symbols-outlined text-lg text-emerald-600">verified</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">100% In Stock</div>
          <span className="text-[11px] text-slate-500">Ready at Chemist Desk #3</span>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Government Subsidy</span>
            <span className="material-symbols-outlined text-lg text-blue-600">health_and_safety</span>
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1 tabular-nums">100% Free</div>
          <span className="text-[11px] text-slate-500">Covered under Ayushman Bharat</span>
        </div>
      </div>

      {/* 12-Column Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Active Digital Prescription Slip (8 cols) */}
        <div className="lg:col-span-8 bento-card-solid rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
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
                    <th className="p-3">Timing</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-400">1</td>
                    <td className="p-3 font-bold text-slate-900">Amoxicillin + Clavulanate 625mg</td>
                    <td className="p-3 text-slate-600">1 Tab</td>
                    <td className="p-3 font-mono font-bold text-slate-900">10</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4F1] text-[#0F766E]">
                        After breakfast
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-[#0F766E]">Twice daily (5d)</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        In Stock
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-400">2</td>
                    <td className="p-3 font-bold text-slate-900">Paracetamol 650mg Tab</td>
                    <td className="p-3 text-slate-600">1 Tab</td>
                    <td className="p-3 font-mono font-bold text-slate-900">6</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4F1] text-[#0F766E]">
                        After dinner
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-[#0F766E]">Once daily SOS</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        In Stock
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-400">3</td>
                    <td className="p-3 font-bold text-slate-900">Pantoprazole 40mg Tab</td>
                    <td className="p-3 text-slate-600">1 Tab</td>
                    <td className="p-3 font-mono font-bold text-slate-900">5</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4F1] text-[#0F766E]">
                        Empty stomach
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-[#0F766E]">Once daily (5d)</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        In Stock
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: QR Dispensing Pass & Instructions (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* QR Barcode Bento Card */}
          <div className="glass-card p-5 space-y-4 text-center">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Instant Counter QR Pass
            </h3>
            <div className="w-28 h-28 mx-auto bg-white p-2 rounded-2xl border border-slate-200 flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-6xl text-slate-800">qr_code_2</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900">Jan Aushadhi Counter #03</div>
              <div className="text-[11px] text-slate-500">
                Scan this QR at the pharmacy pickup counter for instant package verification.
              </div>
            </div>
            <button
              onClick={() => alert('Prescription sent via WhatsApp & SMS to +91 9812401824')}
              className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              <span>Get WhatsApp Copy</span>
            </button>
          </div>

          {/* Pharmacy Guidance Card */}
          <div className="bento-card-teal rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F766E]">storefront</span>
              <h4 className="font-bold text-slate-900 text-xs">Pickup Location</h4>
            </div>
            <p className="text-xs text-slate-700">
              Jan Aushadhi Kendra, Ground Floor, near Hospital North Gate. Open 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
