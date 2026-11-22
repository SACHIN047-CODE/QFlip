import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Printer,
  Download,
  ArrowLeft,
  Hospital,
  Activity,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { appointmentService } from '../../services/appointmentService';
import { AppointmentPassData } from '../../types';

export const PublicAppointmentPassPage: React.FC = () => {
  const { secureAccessToken } = useParams<{ secureAccessToken: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [passData, setPassData] = useState<AppointmentPassData | null>(null);
  const [errorType, setErrorType] = useState<'expired' | 'revoked' | 'invalid' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchPassDetails = async () => {
    if (!secureAccessToken) {
      setErrorType('invalid');
      setErrorMessage('No appointment access token provided.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorType(null);
      setErrorMessage('');

      const data = await appointmentService.getPublicAppointmentPass(secureAccessToken);
      setPassData(data);
    } catch (err: any) {
      const msg = err.message || '';
      console.warn('Failed to load digital appointment pass:', msg);

      if (/expired/i.test(msg)) {
        setErrorType('expired');
        setErrorMessage(msg || 'This digital appointment pass has expired.');
      } else if (/revoked|cancelled/i.test(msg)) {
        setErrorType('revoked');
        setErrorMessage(msg || 'This digital appointment pass has been cancelled or revoked.');
      } else {
        setErrorType('invalid');
        setErrorMessage(msg || 'Invalid or unknown appointment pass link.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassDetails();
  }, [secureAccessToken]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSummary = () => {
    if (!passData) return;
    const content = `
=====================================================
          QFLIP DIGITAL APPOINTMENT PASS
       Civil Hospital Ambala • Ayushman Bharat
=====================================================
Appointment ID : ${passData.appointmentId}
Token Number   : ${passData.tokenNumber}
Booking Status : ${passData.status.toUpperCase()}
Patient Name   : ${passData.patientName}
Department     : ${passData.departmentName} (${passData.departmentCode || 'OPD'})
Doctor         : ${passData.doctorName} (${passData.doctorSpecialization || 'Physician'})
Location       : ${passData.roomNumber || 'OPD Room 101'}, ${passData.departmentFloor || 'Ground Floor'}
Date           : ${new Date(passData.appointmentDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time Slot      : ${passData.timeSlot}
Verified Pass  : ${window.location.href}
=====================================================
Please arrive 15 minutes before your consultation.
Present this digital pass at the OPD desk.
=====================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QFlip-Pass-${passData.appointmentId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="font-headline font-bold text-slate-800 text-base">
              Verifying Digital Appointment Pass
            </h3>
            <p className="text-xs text-slate-500">
              Retrieving secure booking records from Civil Hospital OPD database...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error States (Invalid, Expired, Revoked)
  if (errorType || !passData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md text-center space-y-6">
          {/* Header Branding */}
          <div className="flex items-center justify-center gap-2 text-teal-800">
            <Hospital className="w-6 h-6 text-teal-700" />
            <span className="font-headline font-black text-lg tracking-tight">QFlip CareFlow</span>
          </div>

          {/* Error Illustration & Badge */}
          {errorType === 'expired' && (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="font-headline text-xl font-bold text-slate-900">
                Appointment Pass Expired
              </h2>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
                {errorMessage || 'This digital appointment pass has expired. Appointment validity period has concluded.'}
              </div>
              <p className="text-xs text-slate-500">
                If you need a new consultation, please register for a fresh OPD token or speak with our hospital helpdesk.
              </p>
            </div>
          )}

          {errorType === 'revoked' && (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
                <XCircle className="w-8 h-8" />
              </div>
              <h2 className="font-headline text-xl font-bold text-slate-900">
                Appointment Pass Revoked
              </h2>
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
                {errorMessage || 'This digital appointment pass has been cancelled or revoked by the hospital system.'}
              </div>
              <p className="text-xs text-slate-500">
                This pass is no longer active. Please contact hospital support or re-book through the patient portal.
              </p>
            </div>
          )}

          {errorType === 'invalid' && (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto border border-slate-200">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="font-headline text-xl font-bold text-slate-900">
                Invalid Appointment Link
              </h2>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium">
                {errorMessage || 'No matching appointment could be found for this QR code.'}
              </div>
              <p className="text-xs text-slate-500">
                Please make sure you scanned the genuine QR code printed on your official OPD appointment slip.
              </p>
            </div>
          )}

          {/* Quick Action Navigation */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={fetchPassDetails}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Verification</span>
            </button>

            <Link
              to="/patient/registration"
              className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-headline font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Book New OPD Appointment</span>
            </Link>

            <Link
              to="/"
              className="inline-block text-xs font-semibold text-slate-500 hover:text-slate-800 pt-1"
            >
              Return to QFlip Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Success State: Verified Digital Appointment Pass
  const formattedDate = passData.appointmentDate
    ? new Date(passData.appointmentDate).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Scheduled Date';

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Top Back / Branding Navigation Bar */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Hospital Portal</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600">Live Hospital Record</span>
          </div>
        </div>

        {/* Main Digital Pass Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-950 text-white p-6 sm:p-7 relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-700/60 border border-teal-500/30 flex items-center justify-center">
                    <Hospital className="w-5 h-5 text-teal-200" />
                  </div>
                  <h1 className="font-headline font-black text-xl tracking-tight text-white">
                    QFlip Digital Health
                  </h1>
                </div>
                <p className="text-xs text-teal-200 font-medium">
                  Civil Hospital Ambala • Ayushman Bharat Digital Mission (ABDM)
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-[11px] font-semibold text-teal-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                  <span>Cryptographically Verified Pass</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex sm:flex-col items-end justify-between gap-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {passData.status}
                </span>
                <span className="text-[10px] text-teal-300 font-mono">
                  Pass Active
                </span>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Pass Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Primary Hero: Token Number + Appointment ID */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold block">
                  Allocated Token Number
                </span>
                <div className="text-5xl sm:text-6xl font-black text-teal-700 tracking-tight font-mono">
                  {passData.tokenNumber}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-600 font-medium pt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-700" />
                  <span>{passData.roomNumber || 'OPD Room 101'}</span>
                  <span>•</span>
                  <span>{passData.departmentFloor || 'Ground Floor'}</span>
                </div>
              </div>

              {/* QR Verification Emblem */}
              <div className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                <QRCodeCanvas
                  value={window.location.href}
                  size={110}
                  level="H"
                  includeMargin={false}
                />
                <span className="font-mono text-[9px] text-slate-400 font-bold tracking-wider mt-1.5 uppercase">
                  Verified Scan
                </span>
              </div>
            </div>

            {/* Core Appointment Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Appointment ID */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Appointment ID
                </span>
                <div className="font-mono font-black text-slate-900 text-sm tracking-wide">
                  {passData.appointmentId}
                </div>
              </div>

              {/* Patient Name */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Patient Full Name
                </span>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <User className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{passData.patientName}</span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Consulting Doctor
                </span>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Stethoscope className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{passData.doctorName}</span>
                </div>
                {passData.doctorSpecialization && (
                  <span className="text-[11px] text-slate-500 block pl-6">
                    {passData.doctorSpecialization}
                  </span>
                )}
              </div>

              {/* Clinical Department */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Clinical Department
                </span>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Building2 className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{passData.departmentName}</span>
                </div>
                {passData.departmentCode && (
                  <span className="text-[11px] text-teal-700 font-mono font-bold block pl-6">
                    Dept Code: {passData.departmentCode}
                  </span>
                )}
              </div>

              {/* Date */}
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-800 block">
                  Appointment Date
                </span>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Calendar className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Time Slot */}
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-800 block">
                  Appointment Time Slot
                </span>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="font-mono">{passData.timeSlot}</span>
                </div>
              </div>
            </div>

            {/* Patient Instructions Banner */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Activity className="w-4 h-4 text-teal-700" />
                <span>Patient Arrival Guidelines:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px]">
                <li>Please report to <strong>{passData.roomNumber || 'OPD Room 101'}</strong> 15 minutes before your time slot ({passData.timeSlot}).</li>
                <li>Present this digital pass on your phone screen when your token number is announced.</li>
                <li>Physical registration counters can be bypassed with this verified digital pass.</li>
              </ul>
            </div>

            {/* Print and Download Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadSummary}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-teal-700" />
                  <span>Download Pass</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-headline font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Pass</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                Civil Hospital Digital System
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
