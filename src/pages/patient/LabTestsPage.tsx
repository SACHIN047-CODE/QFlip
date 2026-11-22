import React, { useState, useEffect } from 'react';
import { laboratoryService } from '../../services/laboratoryService';
import { LabTestRequest } from '../../types';
import { PageSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { BentoCard } from '../../components/common/BentoCard';
import { useAuth } from '../../context/AuthContext';
import { FlaskConical, Download, MapPin } from 'lucide-react';

export const LabTestsPage: React.FC = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<LabTestRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    laboratoryService.getTestRequests().then((data) => {
      // Strict Data Privacy: only display laboratory tests ordered for this logged-in patient
      const userTests = data.filter(
        (t) =>
          t.patientId === user.id ||
          (user.name && t.patientName && t.patientName.toLowerCase().includes(user.name.toLowerCase()))
      );
      setTests(userTests);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <PageSkeleton variant="content" />;

  const completedCount = tests.filter((t) => t.status === 'COMPLETED').length;
  const pendingCount = tests.filter((t) => t.status === 'PENDING' || t.status === 'PROCESSING').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header Card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            Diagnostic Pathology &amp; Radiology
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Laboratory Investigations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Central Diagnostic Lab • Direct digital report sync with your doctor consultation desk
          </p>
        </div>
        <span className="text-xs text-slate-600 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
          Phlebotomy Desk: <strong className="text-slate-900">Ground Floor, Room 04</strong>
        </span>
      </div>

      {/* 4 Stat Bento Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Tests</span>
            <span className="material-symbols-outlined text-lg text-[#0F766E]">biotech</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#0F766E] mt-1 tabular-nums">
            {tests.length}
          </div>
          <span className="text-[11px] text-slate-500">Ordered Requisitions</span>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Under Analysis</span>
            <span className="material-symbols-outlined text-lg text-amber-600">hourglass_top</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            {pendingCount}
          </div>
          <span className="text-[11px] text-slate-500">Specimens in Processing</span>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Verified Reports</span>
            <span className="material-symbols-outlined text-lg text-emerald-600">task_alt</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
            {completedCount}
          </div>
          <span className="text-[11px] text-slate-500">Ready for Download</span>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Diagnostic Lab</span>
            <span className="material-symbols-outlined text-lg text-blue-600">verified</span>
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1 tabular-nums">NABL ISO</div>
          <span className="text-[11px] text-slate-500">Certified Hospital Lab</span>
        </div>
      </div>

      {tests.length === 0 ? (
        <div className="p-12 glass-card text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0F766E] flex items-center justify-center mx-auto border border-teal-100">
            <FlaskConical className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No Lab Tests Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any pending or completed diagnostic requisitions under patient ID <strong>{user?.id}</strong>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tests.map((test) => (
            <BentoCard
              key={test.id}
              variant="solid"
              padding="md"
              className="space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#0F766E] block">
                    {test.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {test.testName}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    Ordered By: <strong className="text-slate-700">{test.orderedByDoctor}</strong> ({test.orderedAt})
                  </div>
                </div>
                <StatusBadge status={test.status} />
              </div>

              {test.summaryFindings && (
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-900 block mb-1">Summary Findings:</span>
                  <p className="text-slate-700">{test.summaryFindings}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500">
                  Technician: <strong className="text-slate-700">{test.labTechnician || 'Assigned'}</strong>
                </span>

                {test.status === 'COMPLETED' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Download className="w-3.5 h-3.5" />}
                    onClick={() => alert(`Downloading verified digital PDF report for ${test.testName}`)}
                  >
                    Download PDF
                  </Button>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    Sample Under Processing
                  </span>
                )}
              </div>
            </BentoCard>
          ))}
        </div>
      )}
    </div>
  );
};
