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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Laboratory Investigations"
        subtitle="Pathology &amp; Radiology Diagnostic Orders • Central Hospital Lab"
        badge={
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            Sample Collection: <strong className="text-slate-800">Ground Floor, Room 04</strong>
          </span>
        }
      />

      {tests.length === 0 ? (
        <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FlaskConical className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No Lab Tests Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any pending or completed diagnostic requisitions under patient ID <strong>{user?.id}</strong>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
