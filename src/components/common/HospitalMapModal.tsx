import React, { useState } from 'react';
import { Modal } from './Modal';

interface HospitalMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationDepartment?: string;
}

export const HospitalMapModal: React.FC<HospitalMapModalProps> = ({
  isOpen,
  onClose,
  destinationDepartment = 'OPD Room 12 (General Medicine)',
}) => {
  const [activeFloor, setActiveFloor] = useState<'ground' | 'first' | 'second'>('ground');
  const [selectedPin, setSelectedPin] = useState<string>(destinationDepartment);

  const locations = [
    { id: 'p-1', name: 'Emergency Trauma Care', floor: 'ground', code: 'EMERGENCY', coords: 'x: 15%, y: 25%', color: 'bg-danger text-white' },
    { id: 'p-2', name: 'Central Registration Counters (1 - 4)', floor: 'ground', code: 'REG', coords: 'x: 50%, y: 15%', color: 'bg-secondary text-white' },
    { id: 'p-3', name: 'Jan Aushadhi OPD Pharmacy', floor: 'ground', code: 'PHARM', coords: 'x: 82%, y: 35%', color: 'bg-success text-white' },
    { id: 'p-4', name: 'Clinical Pathology & Imaging Lab', floor: 'ground', code: 'LAB', coords: 'x: 80%, y: 75%', color: 'bg-purple-600 text-white' },
    { id: 'p-5', name: 'OPD Room 12 (General Medicine)', floor: 'first', code: 'OPD-12', coords: 'x: 35%, y: 40%', color: 'bg-accent text-on-accent' },
    { id: 'p-6', name: 'Pediatrics & Immunization Wing', floor: 'first', code: 'PEDS', coords: 'x: 65%, y: 30%', color: 'bg-sky-500 text-white' },
    { id: 'p-7', name: 'Orthopedics & Plaster Room', floor: 'first', code: 'ORTHO', coords: 'x: 65%, y: 70%', color: 'bg-amber-600 text-white' },
    { id: 'p-8', name: 'Cardiology & ECG Suite', floor: 'second', code: 'CARDIO', coords: 'x: 40%, y: 45%', color: 'bg-rose-600 text-white' },
    { id: 'p-9', name: 'ICU Critical Care Block B', floor: 'second', code: 'ICU', coords: 'x: 75%, y: 55%', color: 'bg-red-700 text-white' },
  ];

  const currentFloorLocations = locations.filter((loc) => loc.floor === activeFloor);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Civil Hospital Ambala — Interactive Smart Navigation"
      subtitle="Follow digital arrows, locate clinical rooms, and scan QR markers across wings"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Floor Selection & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-light-outline">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-light-on-surface-variant">Select Floor:</span>
            <div className="inline-flex rounded-lg border border-light-outline p-1 bg-light-surface-variant text-xs">
              <button
                onClick={() => setActiveFloor('ground')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  activeFloor === 'ground' ? 'bg-white shadow text-light-primary' : 'text-light-on-surface-variant'
                }`}
              >
                Ground Floor (Triage, Reg, Lab, Pharmacy)
              </button>
              <button
                onClick={() => setActiveFloor('first')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  activeFloor === 'first' ? 'bg-white shadow text-light-primary' : 'text-light-on-surface-variant'
                }`}
              >
                1st Floor (General OPDs, Ortho, Peds)
              </button>
              <button
                onClick={() => setActiveFloor('second')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  activeFloor === 'second' ? 'bg-white shadow text-light-primary' : 'text-light-on-surface-variant'
                }`}
              >
                2nd Floor (Cardio, ICU, Admin)
              </button>
            </div>
          </div>

          <div className="text-xs font-semibold text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">navigation</span>
            <span>Target: <strong>{destinationDepartment}</strong></span>
          </div>
        </div>

        {/* Interactive Hospital Blueprint Visualization */}
        <div className="relative w-full h-80 bg-slate-900 rounded-2xl border-2 border-slate-700 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Blueprint Grid Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          ></div>

          {/* Floor Plan Header Tag */}
          <div className="z-10 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="font-bold font-headline uppercase tracking-wider">
                Block A &amp; B • {activeFloor.toUpperCase()} LEVEL
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Main Entrance &amp; Escalators at South Wing</div>
          </div>

          {/* Interactive Pins on Map */}
          <div className="relative flex-grow my-4">
            {currentFloorLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedPin(loc.name)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border border-white/30 shadow-lg text-xs font-bold transition-all hover:scale-110 flex items-center gap-1.5 ${
                  loc.color
                } ${selectedPin === loc.name ? 'ring-4 ring-accent scale-110' : ''}`}
                style={{
                  left: loc.coords.split(',')[0].replace('x: ', ''),
                  top: loc.coords.split(',')[1].replace(' y: ', ''),
                }}
              >
                <span className="material-symbols-outlined text-sm">pin_drop</span>
                <span>{loc.code}</span>
              </button>
            ))}
          </div>

          {/* Legend and Navigation Route Guidance */}
          <div className="z-10 bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between text-xs text-white gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-accent text-base">directions_walk</span>
              <span>
                Selected: <strong className="text-accent">{selectedPin}</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-secondary"></span> Registration
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-danger"></span> Emergency
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-success"></span> Pharmacy
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-purple-600"></span> Laboratory
              </span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Wayfinding Route */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline">
            <div className="flex items-center gap-2 text-xs font-bold text-light-primary mb-2">
              <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[10px]">1</span>
              <span>Enter Main OPD Porch</span>
            </div>
            <p className="text-[11px] text-light-on-surface-variant">
              Pass through ABHA verification scanner. Turn right towards Central Waiting Hall.
            </p>
          </div>

          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline">
            <div className="flex items-center gap-2 text-xs font-bold text-light-primary mb-2">
              <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[10px]">2</span>
              <span>Take Escalator / Lift B to 1st Floor</span>
            </div>
            <p className="text-[11px] text-light-on-surface-variant">
              Lift B is reserved for senior citizens, wheelchairs, and stretchers.
            </p>
          </div>

          <div className="p-4 bg-accent/15 rounded-xl border-2 border-accent">
            <div className="flex items-center gap-2 text-xs font-bold text-light-primary mb-2">
              <span className="w-5 h-5 rounded-full bg-accent text-on-accent flex items-center justify-center text-[10px] font-bold">3</span>
              <span>Arrive at OPD Room 12</span>
            </div>
            <p className="text-[11px] text-light-on-surface-variant">
              Digital Token display screen is directly above the consultation door.
            </p>
          </div>
        </div>

        {/* QR Code for Mobile Navigation */}
        <div className="p-4 bg-light-surface rounded-xl border border-light-outline flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-light-surface-variant rounded-lg border border-light-outline flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-secondary">qr_code_2</span>
            </div>
            <div>
              <div className="font-headline text-xs font-bold text-light-primary">
                Scan QR with Patient Phone Camera
              </div>
              <div className="text-[11px] text-light-on-surface-variant">
                Live indoor navigation compass and voice directions will open directly in browser
              </div>
            </div>
          </div>
          <button
            onClick={() => alert('Wayfinding QR downloaded & link sent via SMS to patient registered mobile number!')}
            className="px-4 py-2 bg-light-primary text-white text-xs font-bold rounded-lg hover:bg-light-primary/90 transition-colors shadow-sm"
          >
            Send SMS Compass Link
          </button>
        </div>
      </div>
    </Modal>
  );
};
