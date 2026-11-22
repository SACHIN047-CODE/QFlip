import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  QrCode,
  Download,
  Printer,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  CheckCircle2,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Button } from './Button';

export interface AppointmentQrPassCardProps {
  appointmentId: string;
  tokenNumber: string;
  patientName: string;
  doctorName: string;
  doctorSpecialization?: string;
  department: string;
  roomNumber?: string;
  floor?: string;
  appointmentDate: string;
  appointmentTime: string;
  bookingStatus: string;
  secureAccessToken?: string;
  qrAccessUrl?: string;
  onPrint?: () => void;
  className?: string;
}

export const AppointmentQrPassCard: React.FC<AppointmentQrPassCardProps> = ({
  appointmentId,
  tokenNumber,
  patientName,
  doctorName,
  doctorSpecialization = 'OPD Consultant',
  department,
  roomNumber = 'Room 101',
  floor = 'Ground Floor',
  appointmentDate,
  appointmentTime,
  bookingStatus = 'scheduled',
  secureAccessToken = '',
  qrAccessUrl,
  onPrint,
  className = '',
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  // Build the full public URL that will open on phone camera scan
  const publicPassUrl = qrAccessUrl
    ? (qrAccessUrl.startsWith('http') ? qrAccessUrl : `${window.location.origin}${qrAccessUrl}`)
    : `${window.location.origin}/appointment/${secureAccessToken || appointmentId}`;

  // Download standalone QR Code image as PNG
  const handleDownloadQr = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `QFlip-QR-${appointmentId || tokenNumber}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Download complete appointment pass as readable text receipt
  const handleDownloadPass = () => {
    const passText = `
=====================================================
          QFLIP DIGITAL APPOINTMENT PASS
       Civil Hospital Ambala • Ayushman Bharat
=====================================================
Appointment ID : ${appointmentId}
Token Number   : ${tokenNumber}
Booking Status : ${bookingStatus.toUpperCase()}
Patient Name   : ${patientName}
Department     : ${department}
Doctor         : ${doctorName} (${doctorSpecialization})
Location       : ${roomNumber}, ${floor}
Date           : ${new Date(appointmentDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time Slot      : ${appointmentTime}
Digital QR URL : ${publicPassUrl}
=====================================================
Scan the QR code anytime with your phone camera
to open and verify your live appointment pass.
=====================================================
    `.trim();

    const blob = new Blob([passText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QFlip-Appointment-Pass-${appointmentId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Today';

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all print:border-none print:shadow-none ${className}`}
    >
      {/* Top Hospital Branding Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <ShieldCheck className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span>QFlip Digital Appointment Pass</span>
              <span className="text-[10px] uppercase font-bold bg-teal-600/60 px-2 py-0.5 rounded-full border border-teal-400/30 text-teal-100">
                Verified
              </span>
            </h3>
            <p className="text-[11px] text-teal-200">
              Civil Hospital Ambala • Ayushman Bharat Digital Mission (ABDM)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {bookingStatus}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Main Pass Grid: QR Code Left/Center + Key Pass Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-100">
          {/* QR Code Presentation Box */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-5 bg-gradient-to-b from-slate-50 to-teal-50/30 rounded-2xl border border-teal-100/80 text-center shadow-inner">
            <div
              ref={qrRef}
              className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center transition-transform hover:scale-105"
            >
              <QRCodeCanvas
                value={publicPassUrl}
                size={168}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: '/favicon.ico',
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>

            <div className="mt-3 space-y-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded-full">
                <QrCode className="w-3.5 h-3.5 text-teal-700" />
                Scannable Phone Pass
              </span>
              <p className="text-[11px] text-slate-500 max-w-xs font-medium">
                Scan this QR code anytime to view your appointment details.
              </p>
            </div>
          </div>

          {/* Primary Appointment Identifiers */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                  Allocated Token Number
                </span>
                <div className="text-4xl sm:text-5xl font-black text-teal-700 tracking-tight font-mono mt-0.5">
                  {tokenNumber}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Appointment ID
                </span>
                <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg font-mono text-sm font-bold text-slate-800 mt-0.5">
                  {appointmentId}
                </span>
              </div>
            </div>

            {/* Department & Doctor Banner */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Building2 className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="font-headline font-bold text-sm text-slate-900">{department}</span>
                <span className="text-slate-400">•</span>
                <span className="text-teal-700 font-medium">{roomNumber}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{floor}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Stethoscope className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="font-bold text-slate-900">{doctorName}</span>
                {doctorSpecialization && (
                  <span className="text-slate-500">({doctorSpecialization})</span>
                )}
              </div>
            </div>

            {/* Date & Time Slot Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 block">
                    Appointment Date
                  </span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {formattedDate}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 block">
                    Time Slot
                  </span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {appointmentTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details & Status Metadata Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
              Patient Full Name
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <User className="w-4 h-4 text-teal-700" />
              <span>{patientName}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
              Booking Status
            </span>
            <span className="font-bold text-emerald-700 uppercase tracking-wide">
              {bookingStatus}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
              Arrival Instructions
            </span>
            <span className="text-slate-600 font-medium">
              Report 15 mins prior to {roomNumber}
            </span>
          </div>
        </div>

        {/* Action Buttons: Download QR, Download Pass, Print Pass */}
        <div className="flex flex-wrap items-center gap-3 pt-2 print:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadQr}
            icon={<Download className="w-4 h-4 text-teal-700" />}
            className="flex-1 sm:flex-initial justify-center"
          >
            Download QR Code
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPass}
            icon={<FileText className="w-4 h-4 text-teal-700" />}
            className="flex-1 sm:flex-initial justify-center"
          >
            Download Appointment Pass
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            icon={<Printer className="w-4 h-4" />}
            className="flex-1 sm:flex-initial justify-center"
          >
            Print Appointment Pass
          </Button>
        </div>
      </div>
    </div>
  );
};
