import React, { useState, useEffect } from 'react';
import { laboratoryService } from '../../services/laboratoryService';
import { LabTestRequest } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SearchBar } from '../../components/common/SearchBar';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { BentoCard } from '../../components/common/BentoCard';
import { FlaskConical, Clock, CheckCircle2, AlertTriangle, FileEdit, Upload } from 'lucide-react';
import { PageSkeleton } from '../../components/common/LoadingSkeleton';

export const LabDashboard: React.FC = () => {
  const [tests, setTests] = useState<LabTestRequest[]>([]);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedTest, setSelectedTest] = useState<LabTestRequest | null>(null);
  const [findingsInput, setFindingsInput] = useState('');
  const [statusInput, setStatusInput] = useState<LabTestRequest['status']>('COMPLETED');
  const [loading, setLoading] = useState(true);

  const loadTests = () => {
    setLoading(true);
    laboratoryService.getTestRequests().then((data) => {
      setTests(data);
      setLoading(false);
    });
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

  if (loading) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laboratory &amp; Diagnostics Workspace"
        subtitle="Pathology, Hematology &amp; Imaging Requisitions • Central Diagnostic Lab"
      />

      {/* Top Bento Ribbon (Glass Stat Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#0F766E]">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {tests.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Pathology & Radiology</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Collection
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2 font-mono tabular-nums">
            {pendingCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Room 04 Phlebotomy</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              In Analyzer
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2 font-mono tabular-nums">
            {processingCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Hematology & Bio</div>
        </div>

        <div className="glass-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Reports Completed
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2 font-mono tabular-nums">
            {completedCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">Synced to Doctor OPD</div>
        </div>
      </div>

      {/* Filter and Search Bar (Glass Surface) */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar value={search} onChange={setSearch} placeholder="Search patient, test or token..." />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 rounded-xl border border-slate-200/90 bg-white/90 font-medium text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
            >
              <option value="ALL">All Categories</option>
              <option value="Hematology">Hematology</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 rounded-xl border border-slate-200/90 bg-white/90 font-medium text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
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

      {/* Tests Bento Grid (Solid Cards for clinical clarity) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((test) => (
          <BentoCard
            key={test.id}
            variant="solid"
            padding="md"
            className="space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono font-bold text-[#0F766E] text-sm">{test.tokenNumber}</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {test.testName}
                </h3>
                <div className="text-xs text-slate-500">
                  Patient: <strong className="text-slate-800">{test.patientName}</strong> ({test.gender}, {test.age}y) • ID: {test.patientId}
                </div>
              </div>
              <StatusBadge status={test.status} />
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Ordered By:</span>
                <strong className="text-slate-800">{test.orderedByDoctor}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ordered At:</span>
                <strong className="text-slate-800 font-mono">{test.orderedAt}</strong>
              </div>
              {test.summaryFindings && (
                <div className="pt-1 text-slate-800 border-t border-slate-200 mt-1">
                  <strong>Findings:</strong> {test.summaryFindings}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Category: <strong className="text-slate-700">{test.category}</strong></span>
              <Button
                variant="primary"
                size="sm"
                icon={<FileEdit className="w-3.5 h-3.5" />}
                onClick={() => {
                  setSelectedTest(test);
                  setStatusInput(test.status);
                  setFindingsInput(test.summaryFindings || '');
                }}
              >
                Update Results
              </Button>
            </div>
          </BentoCard>
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
              <label className="font-semibold text-slate-800 block mb-1">Investigation Status</label>
              <select
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
              >
                <option value="PENDING">Sample Pending</option>
                <option value="PROCESSING">Under Processing in Analyzer</option>
                <option value="COMPLETED">Completed (Release Report)</option>
                <option value="CRITICAL">CRITICAL RESULT (Doctor Alert)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Clinical Diagnostic Findings / Lab Values
              </label>
              <textarea
                rows={3}
                required
                value={findingsInput}
                onChange={(e) => setFindingsInput(e.target.value)}
                placeholder="Enter quantitative values (e.g. Hemoglobin 12.8 g/dL, Platelets 2.4 Lakhs, etc.)..."
                className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 text-xs"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700 font-medium">Attach Digital Machine PDF:</span>
              <button
                type="button"
                onClick={() => alert('Diagnostic analyzer waveform attached')}
                className="px-3 py-1 bg-white border border-slate-200 rounded font-semibold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                Browse
              </button>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setSelectedTest(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
              >
                Sign &amp; Publish Findings
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export const TestRequests: React.FC = () => <LabDashboard />;
export const LabResults: React.FC = () => <LabDashboard />;
