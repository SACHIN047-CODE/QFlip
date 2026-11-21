import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { Printer, QrCode, Send, FileText, CheckCircle2 } from 'lucide-react';

export const DigitalPrescriptionsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Digital Prescriptions"
        subtitle="ABDM-compliant digital Rx with instant Jan Aushadhi pharmacy dispensing"
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<Printer className="w-3.5 h-3.5" />}
            onClick={() => window.print()}
          >
            Print Prescription Slip
          </Button>
        }
      />

      {/* Main Active Digital Prescription Slip (Solid Bento Card) */}
      <div className="bento-card-solid rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Prescription Hospital Letterhead */}
        <div className="bg-[#0F766E] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 flex items-center justify-center text-white border border-teal-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold">Civil Hospital Ambala</div>
              <div className="text-xs text-teal-100">
                Department of General Medicine • OPD Room 12
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <div className="font-mono font-bold text-teal-200 text-sm">Rx-2026-8812</div>
            <div className="text-teal-100">Date: Today, 10:15 AM</div>
          </div>
        </div>

        {/* Patient Details Row */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">Patient Name</span>
            <span className="font-bold text-slate-900">{user?.name || 'Registered Patient'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">Patient ID / Status</span>
            <span className="font-bold text-slate-900">{user?.id || 'PT-10088'} • Active</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">ABHA ID</span>
            <span className="font-mono font-bold text-teal-700">{user?.abhaId || '91-8274-1049-9812'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">Prescribing Doctor</span>
            <span className="font-bold text-slate-900">Dr. Rajesh Sharma, MD</span>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-teal-700 font-mono">Rx</span>
            <span className="text-xs font-medium text-slate-500">
              (Directly Synced to Jan Aushadhi Chemist Desk #3)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Medicine &amp; Strength</th>
                  <th className="p-3">Dosage</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Instructions</th>
                  <th className="p-3">Formulary Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-900">1</td>
                  <td className="p-3 font-bold text-slate-900">Amoxicillin + Clavulanate 625mg</td>
                  <td className="p-3 text-slate-700">1 Tablet</td>
                  <td className="p-3 font-semibold text-teal-700">Twice daily</td>
                  <td className="p-3 text-slate-700">5 Days</td>
                  <td className="p-3 text-slate-700">After Food</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                      Jan Aushadhi Ready
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">2</td>
                  <td className="p-3 font-bold text-slate-900">Paracetamol 650mg Tab</td>
                  <td className="p-3 text-slate-700">1 Tablet</td>
                  <td className="p-3 font-semibold text-teal-700">Thrice daily (SOS)</td>
                  <td className="p-3 text-slate-700">3 Days</td>
                  <td className="p-3 text-slate-700">If fever &gt; 100°F</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                      Jan Aushadhi Ready
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">3</td>
                  <td className="p-3 font-bold text-slate-900">Pantoprazole 40mg Tab</td>
                  <td className="p-3 text-slate-700">1 Tablet</td>
                  <td className="p-3 font-semibold text-teal-700">Once daily</td>
                  <td className="p-3 text-slate-700">5 Days</td>
                  <td className="p-3 text-slate-700">30 mins before food</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                      Jan Aushadhi Ready
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QR Barcode for Instant Counter Dispensing (Glass Surface) */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs">
                <QrCode className="w-9 h-9 text-[#0F766E]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Scan at Jan Aushadhi Pharmacy Counter #03
                </div>
                <div className="text-[11px] text-slate-500">
                  Pharmacist barcode scanner will verify batch and dispense automatically.
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
              onClick={() => alert('Prescription sent via WhatsApp & SMS to +91 9812401824')}
            >
              Get WhatsApp Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
