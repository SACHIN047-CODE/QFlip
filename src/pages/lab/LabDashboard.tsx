import React, { useState, useEffect } from 'react';
import { laboratoryService } from '../../services/laboratoryService';
import { LabTestRequest } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchBar } from '../../components/common/SearchBar';
import { Modal } from '../../components/common/Modal';

export const LabDashboard: React.FC = () => {
  const [tests, setTests] = useState<LabTestRequest[]>([]);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedTest, setSelectedTest] = useState<LabTestRequest | null>(null);
  const [findingsInput, setFindingsInput] = useState('');
  const [statusInput, setStatusInput] = useState<LabTestRequest['status']>('COMPLETED');

  const loadTests = () => {
    laboratoryService.getTestRequests().then(setTests);
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;
    await laboratoryService.updateTestStatus(selectedTest.id, statusInput, findingsInput);
    setSelectedTest(null);
    loadTests();
  };

  const filtered = tests.filter((t) => {
    const matchesSearch =
      t.patientName.toLowerCase().includes(search.toLowerCase()) ||
      t.testName.toLowerCase().includes(search.toLowerCase()) ||
      t.tokenNumber.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || t.category === filterCategory;
    const matchesStat = filterStatus === 'ALL' || t.status === filterStatus;
    return matchesSearch && matchesCat && matchesStat;
  });

  const pendingCount = tests.filter((t) => t.status === 'PENDING').length;
  const processingCount = tests.filter((t) => t.status === 'PROCESSING').length;
  const completedCount = tests.filter((t) => t.status === 'COMPLETED').length;

  return (
    <div className="space-y-6">
      {/* Top Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
            Total Requests Today
          </span>
          <div className="font-headline text-2xl font-black text-light-primary font-code mt-1">
            {tests.length}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">Pathology &amp; Radiology</div>
        </div>

        <div className="bg-accent/15 p-4 rounded-xl border-2 border-accent shadow-card">
          <span className="text-xs font-semibold text-on-accent uppercase">
            Pending Collection
          </span>
          <div className="font-headline text-2xl font-black text-on-accent font-code mt-1">
            {pendingCount}
          </div>
          <div className="text-[11px] text-on-accent font-medium mt-1">In Queue Room 04</div>
        </div>

        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
            In Processing / Analyzer
          </span>
          <div className="font-headline text-2xl font-black text-amber-600 font-code mt-1">
            {processingCount}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">Hematology &amp; Bio</div>
        </div>

        <div className="bg-light-surface p-4 rounded-xl border border-light-outline shadow-card">
          <span className="text-xs font-semibold text-light-on-surface-variant uppercase">
            Reports Completed
          </span>
          <div className="font-headline text-2xl font-black text-success font-code mt-1">
            {completedCount}
          </div>
          <div className="text-[11px] text-light-on-surface-variant mt-1">Synced to Doctor OPD</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-light-surface p-4 rounded-2xl border border-light-outline shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar value={search} onChange={setSearch} placeholder="Search patient, test or token..." />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-light-on-surface-variant">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 rounded-lg border border-light-outline bg-white font-medium"
            >
              <option value="ALL">All Categories</option>
              <option value="Hematology">Hematology</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-light-on-surface-variant">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 rounded-lg border border-light-outline bg-white font-medium"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CRITICAL">Critical Alert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((test) => (
          <div
            key={test.id}
            className="bg-light-surface rounded-2xl border border-light-outline p-5 shadow-card space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-code font-bold text-secondary text-sm">{test.tokenNumber}</span>
                <h3 className="font-headline text-base font-bold text-light-primary mt-0.5">
                  {test.testName}
                </h3>
                <div className="text-xs text-light-on-surface-variant">
                  Patient: <strong>{test.patientName}</strong> ({test.gender}, {test.age}y) • ID: {test.patientId}
                </div>
              </div>
              <StatusBadge status={test.status} />
            </div>

            <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline text-xs space-y-1">
              <div className="flex justify-between">
                <span>Ordered By:</span>
                <strong className="text-light-primary">{test.orderedByDoctor}</strong>
              </div>
              <div className="flex justify-between">
                <span>Ordered At:</span>
                <strong className="text-light-primary font-code">{test.orderedAt}</strong>
              </div>
              {test.summaryFindings && (
                <div className="pt-1 text-light-primary">
                  <strong>Findings:</strong> {test.summaryFindings}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-light-outline text-xs">
              <span className="text-light-on-surface-variant">Category: <strong>{test.category}</strong></span>
              <button
                onClick={() => {
                  setSelectedTest(test);
                  setStatusInput(test.status);
                  setFindingsInput(test.summaryFindings || '');
                }}
                className="px-3.5 py-1.5 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 shadow-sm"
              >
                Update Report / Results
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Test Report Modal */}
      {selectedTest && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTest(null)}
          title={`Update Result: ${selectedTest.testName}`}
          subtitle={`Patient: ${selectedTest.patientName} (${selectedTest.tokenNumber})`}
        >
          <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-light-primary block mb-1">Investigation Status</label>
              <select
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface font-bold text-light-primary"
              >
                <option value="PENDING">Sample Pending</option>
                <option value="PROCESSING">Under Processing in Analyzer</option>
                <option value="COMPLETED">Completed (Release Report)</option>
                <option value="CRITICAL">CRITICAL RESULT (Doctor Alert)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-light-primary block mb-1">
                Clinical Diagnostic Findings / Lab Values
              </label>
              <textarea
                rows={3}
                required
                value={findingsInput}
                onChange={(e) => setFindingsInput(e.target.value)}
                placeholder="Enter quantitative values (e.g. Hemoglobin 12.8 g/dL, Platelets 2.4 Lakhs, etc.)..."
                className="w-full p-3 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
              />
            </div>

            <div className="p-3 bg-secondary/5 rounded-xl border border-secondary/20 flex items-center justify-between">
              <span className="text-light-primary font-medium">Attach Digital Machine PDF:</span>
              <button
                type="button"
                onClick={() => alert('Diagnostic analyzer waveform attached')}
                className="px-3 py-1 bg-white border border-light-outline rounded font-semibold text-xs"
              >
                Browse Files
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-light-outline">
              <button
                type="button"
                onClick={() => setSelectedTest(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-accent text-on-accent font-bold rounded-lg"
              >
                Sign &amp; Publish Findings
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export const TestRequests: React.FC = () => <LabDashboard />;
export const LabResults: React.FC = () => <LabDashboard />;
