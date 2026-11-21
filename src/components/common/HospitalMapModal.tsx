import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  hospitalMapService, 
  HospitalMapConfig, 
  HospitalMapLocation, 
  HospitalMapFloor 
} from '../../services/hospitalMapService';

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
  const { role } = useAuth();
  const { t } = useLanguage();

  const [config, setConfig] = useState<HospitalMapConfig>(hospitalMapService.getMapConfig());
  const [activeFloorId, setActiveFloorId] = useState<string>('ground');
  const [selectedPin, setSelectedPin] = useState<string>(destinationDepartment);
  
  // Administrator Configuration Mode State
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingHospitalName, setEditingHospitalName] = useState('');
  const [editingSubtitle, setEditingSubtitle] = useState('');
  const [editingLocation, setEditingLocation] = useState<HospitalMapLocation | null>(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newFloorName, setNewFloorName] = useState('');

  // Reload config whenever updated
  useEffect(() => {
    const loadConfig = () => {
      const current = hospitalMapService.getMapConfig();
      setConfig(current);
      setEditingHospitalName(current.hospitalName);
      setEditingSubtitle(current.subtitle);
      if (current.floors.length > 0 && !current.floors.some(f => f.id === activeFloorId)) {
        setActiveFloorId(current.floors[0].id);
      }
    };

    loadConfig();
    window.addEventListener('careflow_map_updated', loadConfig);
    return () => window.removeEventListener('careflow_map_updated', loadConfig);
  }, [isOpen]);

  useEffect(() => {
    if (destinationDepartment) {
      setSelectedPin(destinationDepartment);
      // Try to find the floor where this department is located
      const loc = config.locations.find(
        (l) => l.name.toLowerCase().includes(destinationDepartment.toLowerCase()) ||
               destinationDepartment.toLowerCase().includes(l.name.toLowerCase())
      );
      if (loc) {
        setActiveFloorId(loc.floorId);
      }
    }
  }, [destinationDepartment, config]);

  const currentFloorLocations = config.locations.filter((loc) => loc.floorId === activeFloorId);
  const activeFloorObj = config.floors.find((f) => f.id === activeFloorId) || config.floors[0];

  const handleSaveConfig = () => {
    const updated: HospitalMapConfig = {
      ...config,
      hospitalName: editingHospitalName.trim() || config.hospitalName,
      subtitle: editingSubtitle.trim() || config.subtitle,
    };
    hospitalMapService.saveMapConfig(updated);
    setConfig(updated);
    setIsEditMode(false);
    setEditingLocation(null);
    setIsAddingLocation(false);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset hospital map layout to default? Any custom departments will be restored.')) {
      const reset = hospitalMapService.resetMapConfig();
      setConfig(reset);
      setEditingHospitalName(reset.hospitalName);
      setEditingSubtitle(reset.subtitle);
      setActiveFloorId(reset.floors[0]?.id || 'ground');
      setIsEditMode(false);
      setEditingLocation(null);
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    if (editingLocation) {
      // Update coordinates of currently edited location
      setEditingLocation({
        ...editingLocation,
        xPercent: Math.max(5, Math.min(95, x)),
        yPercent: Math.max(5, Math.min(95, y)),
      });
    } else {
      // Prepare new location at this point
      const newLoc: HospitalMapLocation = {
        id: `loc-${Date.now()}`,
        name: 'New Clinical Department',
        code: 'NEW-01',
        floorId: activeFloorId,
        room: 'Room 101',
        xPercent: Math.max(5, Math.min(95, x)),
        yPercent: Math.max(5, Math.min(95, y)),
        category: 'opd',
        color: hospitalMapService.getCategoryColor('opd'),
      };
      setEditingLocation(newLoc);
      setIsAddingLocation(true);
    }
  };

  const handleSaveLocation = () => {
    if (!editingLocation) return;
    let updatedLocations = [...config.locations];
    const index = updatedLocations.findIndex((l) => l.id === editingLocation.id);
    if (index >= 0) {
      updatedLocations[index] = {
        ...editingLocation,
        color: hospitalMapService.getCategoryColor(editingLocation.category),
      };
    } else {
      updatedLocations.push({
        ...editingLocation,
        color: hospitalMapService.getCategoryColor(editingLocation.category),
      });
    }

    const updatedConfig = { ...config, locations: updatedLocations };
    setConfig(updatedConfig);
    hospitalMapService.saveMapConfig(updatedConfig);
    setEditingLocation(null);
    setIsAddingLocation(false);
  };

  const handleDeleteLocation = (id: string) => {
    const updatedLocations = config.locations.filter((l) => l.id !== id);
    const updatedConfig = { ...config, locations: updatedLocations };
    setConfig(updatedConfig);
    hospitalMapService.saveMapConfig(updatedConfig);
    if (editingLocation?.id === id) {
      setEditingLocation(null);
    }
  };

  const handleAddFloor = () => {
    if (!newFloorName.trim()) return;
    const floorId = `floor-${Date.now()}`;
    const newFloor: HospitalMapFloor = {
      id: floorId,
      name: newFloorName.trim(),
      label: newFloorName.trim(),
      description: 'Configured Clinical Block',
    };
    const updatedFloors = [...config.floors, newFloor];
    const updatedConfig = { ...config, floors: updatedFloors };
    setConfig(updatedConfig);
    hospitalMapService.saveMapConfig(updatedConfig);
    setActiveFloorId(floorId);
    setNewFloorName('');
  };

  const handleDeleteFloor = (floorId: string) => {
    if (config.floors.length <= 1) {
      alert('Hospital must retain at least one configured floor.');
      return;
    }
    const updatedFloors = config.floors.filter((f) => f.id !== floorId);
    const updatedLocations = config.locations.filter((l) => l.floorId !== floorId);
    const updatedConfig = { ...config, floors: updatedFloors, locations: updatedLocations };
    setConfig(updatedConfig);
    hospitalMapService.saveMapConfig(updatedConfig);
    setActiveFloorId(updatedFloors[0].id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${config.hospitalName} — ${t('map.title', 'Interactive Smart Navigation')}`}
      subtitle={config.subtitle}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Administrator Layout Configuration Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-light-surface-variant/70 rounded-xl border border-light-outline text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-base">domain</span>
            <span className="font-headline font-bold text-light-primary">
              {config.hospitalName}
            </span>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-white text-light-on-surface-variant border border-light-outline">
              Configurable Hospital Layout
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="px-3 py-1.5 rounded-lg bg-success text-white font-bold flex items-center gap-1 shadow-sm hover:bg-success/90 transition-colors"
                >
                  <span className="material-symbols-outlined text-xs">save</span>
                  <span>{t('map.save_layout', 'Save Layout')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-light-outline text-light-primary font-semibold hover:bg-light-surface-variant transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-2.5 py-1.5 rounded-lg border border-danger/30 text-danger text-[11px] font-semibold hover:bg-danger/10 transition-colors"
                >
                  {t('map.reset_layout', 'Reset Defaults')}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(true);
                  setEditingHospitalName(config.hospitalName);
                  setEditingSubtitle(config.subtitle);
                }}
                className="px-3 py-1.5 rounded-lg border border-secondary/40 bg-secondary/10 hover:bg-secondary/20 text-secondary font-bold flex items-center gap-1 transition-colors"
                title="Customize hospital name, floors, departments, and rooms"
              >
                <span className="material-symbols-outlined text-xs">tune</span>
                <span>{t('map.edit_layout', 'Edit Map Layout (Admin)')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Admin Editing Fields (When Edit Mode is Active) */}
        {isEditMode && (
          <div className="p-4 bg-light-surface rounded-xl border-2 border-secondary/30 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-light-primary block mb-1">Hospital / Medical Center Name</label>
                <input
                  type="text"
                  value={editingHospitalName}
                  onChange={(e) => setEditingHospitalName(e.target.value)}
                  placeholder="e.g. AIIMS Delhi / Civil Hospital"
                  className="w-full px-3 py-1.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-light-primary block mb-1">Wayfinding Subtitle</label>
                <input
                  type="text"
                  value={editingSubtitle}
                  onChange={(e) => setEditingSubtitle(e.target.value)}
                  placeholder="e.g. Indoor Navigation & Clinical Wayfinding"
                  className="w-full px-3 py-1.5 rounded-lg border border-light-outline bg-light-surface text-light-primary"
                />
              </div>
            </div>

            {/* Floor Management */}
            <div className="pt-2 border-t border-light-outline flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-light-primary">Add Floor:</span>
                <input
                  type="text"
                  value={newFloorName}
                  onChange={(e) => setNewFloorName(e.target.value)}
                  placeholder="e.g. 3rd Floor (Surgery & Burn)"
                  className="px-3 py-1 rounded-lg border border-light-outline bg-light-surface text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddFloor}
                  className="px-2.5 py-1 bg-secondary text-white rounded-lg font-bold hover:bg-secondary/90"
                >
                  Add Floor
                </button>
              </div>

              <div className="text-[11px] text-light-on-surface-variant">
                Tip: Click anywhere on the map grid below to place or move a room pin.
              </div>
            </div>
          </div>
        )}

        {/* Floor Selection & Target Department */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-light-outline">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-light-on-surface-variant">
              {t('map.select_floor', 'Select Floor:')}
            </span>
            <div className="inline-flex flex-wrap rounded-lg border border-light-outline p-1 bg-light-surface-variant text-xs gap-1">
              {config.floors.map((floor) => (
                <div key={floor.id} className="inline-flex items-center">
                  <button
                    onClick={() => setActiveFloorId(floor.id)}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      activeFloorId === floor.id
                        ? 'bg-white shadow text-light-primary'
                        : 'text-light-on-surface-variant hover:text-light-primary'
                    }`}
                  >
                    {floor.name}
                  </button>
                  {isEditMode && config.floors.length > 1 && (
                    <button
                      onClick={() => handleDeleteFloor(floor.id)}
                      className="px-1 text-danger hover:text-danger/80"
                      title="Delete Floor"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs font-semibold text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">navigation</span>
            <span>
              {t('map.target', 'Target:')} <strong>{destinationDepartment}</strong>
            </span>
          </div>
        </div>

        {/* Interactive Hospital Blueprint Visualization */}
        <div
          onClick={handleMapClick}
          className={`relative w-full h-84 bg-slate-900 rounded-2xl border-2 ${
            isEditMode ? 'border-dashed border-secondary cursor-crosshair' : 'border-slate-700'
          } p-6 flex flex-col justify-between overflow-hidden shadow-inner select-none`}
        >
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
                {activeFloorObj?.name || 'FLOOR LEVEL'} • {config.hospitalName}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              {activeFloorObj?.description || 'Main OPD Corridors & Examination Rooms'}
            </div>
          </div>

          {/* Interactive Pins on Map */}
          <div className="relative flex-grow my-4">
            {currentFloorLocations.map((loc) => {
              const isSelected = selectedPin.toLowerCase().includes(loc.name.toLowerCase()) ||
                                 loc.name.toLowerCase().includes(selectedPin.toLowerCase()) ||
                                 selectedPin.toLowerCase().includes(loc.code.toLowerCase());

              return (
                <button
                  key={loc.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPin(loc.name);
                    if (isEditMode) {
                      setEditingLocation(loc);
                      setIsAddingLocation(false);
                    }
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border border-white/30 shadow-lg text-xs font-bold transition-all hover:scale-110 flex items-center gap-1.5 ${
                    loc.color || 'bg-slate-700 text-white'
                  } ${isSelected ? 'ring-4 ring-accent scale-110 shadow-accent/50' : ''}`}
                  style={{
                    left: `${loc.xPercent}%`,
                    top: `${loc.yPercent}%`,
                  }}
                  title={`${loc.name} (${loc.room})`}
                >
                  <span className="material-symbols-outlined text-sm">pin_drop</span>
                  <span>{loc.code}</span>
                </button>
              );
            })}
          </div>

          {/* Legend and Selected Department Bar */}
          <div className="z-10 bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between text-xs text-white gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-accent text-base">directions_walk</span>
              <span>
                Selected: <strong className="text-accent">{selectedPin}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-300 flex-wrap">
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
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-accent"></span> OPD Rooms
              </span>
            </div>
          </div>
        </div>

        {/* Location Pin Editor Drawer (When Edit Mode is active and a pin is clicked or placed) */}
        {isEditMode && editingLocation && (
          <div className="p-4 bg-light-surface rounded-xl border-2 border-secondary/40 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-light-outline pb-2">
              <span className="font-bold text-light-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-sm">edit_location</span>
                <span>{isAddingLocation ? 'Add New Department Pin' : `Edit Department: ${editingLocation.name}`}</span>
              </span>
              <span className="text-[11px] text-light-on-surface-variant font-code">
                Coordinates: {editingLocation.xPercent}% X, {editingLocation.yPercent}% Y
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-semibold block mb-1">Department / Location Name</label>
                <input
                  type="text"
                  value={editingLocation.name}
                  onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-light-outline bg-white font-bold"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Pin Code (e.g. OPD-12)</label>
                <input
                  type="text"
                  value={editingLocation.code}
                  onChange={(e) => setEditingLocation({ ...editingLocation, code: e.target.value.toUpperCase() })}
                  className="w-full px-2.5 py-1.5 rounded border border-light-outline bg-white font-code uppercase"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Room / Counter Number</label>
                <input
                  type="text"
                  value={editingLocation.room}
                  onChange={(e) => setEditingLocation({ ...editingLocation, room: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-light-outline bg-white"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Category / Wing</label>
                <select
                  value={editingLocation.category}
                  onChange={(e) => setEditingLocation({ ...editingLocation, category: e.target.value as any })}
                  className="w-full px-2.5 py-1.5 rounded border border-light-outline bg-white font-semibold"
                >
                  <option value="opd">OPD Consultation</option>
                  <option value="emergency">Emergency / Trauma</option>
                  <option value="registration">Registration Counter</option>
                  <option value="pharmacy">Pharmacy / Chemist</option>
                  <option value="laboratory">Laboratory / Diagnostics</option>
                  <option value="icu">ICU / Critical Care</option>
                  <option value="other">Other Facility</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleDeleteLocation(editingLocation.id)}
                className="px-3 py-1 bg-danger/10 text-danger border border-danger/30 rounded font-semibold hover:bg-danger/20"
              >
                Delete This Pin
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLocation(null)}
                  className="px-3 py-1 bg-white border border-light-outline rounded font-semibold text-light-primary hover:bg-light-surface-variant"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveLocation}
                  className="px-4 py-1 bg-secondary text-white rounded font-bold hover:bg-secondary/90 shadow-sm"
                >
                  Save Pin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step-by-Step Wayfinding Route */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline">
            <div className="flex items-center gap-2 text-xs font-bold text-light-primary mb-2">
              <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[10px]">1</span>
              <span>Enter Main OPD Porch</span>
            </div>
            <p className="text-[11px] text-light-on-surface-variant">
              Pass through ABHA verification scanner. Turn towards the Central Waiting Hall.
            </p>
          </div>

          <div className="p-4 bg-light-surface-variant rounded-xl border border-light-outline">
            <div className="flex items-center gap-2 text-xs font-bold text-light-primary mb-2">
              <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[10px]">2</span>
              <span>Take Escalator / Lift B to Assigned Floor</span>
            </div>
            <p className="text-[11px] text-light-on-surface-variant">
              Lift B is reserved for senior citizens, wheelchairs, and stretchers.
            </p>
          </div>

          <div className="p-4 bg-accent/15 rounded-xl border-2 border-accent">
            <div className="flex items-center gap-2 text-xs font-bold text-light-primary mb-2">
              <span className="w-5 h-5 rounded-full bg-accent text-on-accent flex items-center justify-center text-[10px] font-bold">3</span>
              <span>Arrive at {selectedPin}</span>
            </div>
            <p className="text-[11px] text-light-on-surface-variant">
              Digital Token display screens are mounted directly above the consultation door.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end pt-3 border-t border-light-outline">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-light-primary text-white hover:bg-light-primary/90 transition-colors"
          >
            Close Navigation Map
          </button>
        </div>
      </div>
    </Modal>
  );
};
