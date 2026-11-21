import React, { useState, useEffect } from 'react';
import { laboratoryService } from '../../services/laboratoryService';
import { LabTestRequest } from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';

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

  if (loading) return <LoadingSpinner message="Fetching your private diagnostic lab records..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-light-outline">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Pathology &amp; Radiology Stream
          </span>
          <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary">
            Laboratory Investigations
          </h1>
        </div>
        <div className="text-xs text-light-on-surface-variant">
          Sample Collection Counter: <strong>Ground Floor, Room 04</strong>
        </div>
      </div>

      {tests.length === 0 ? (
        <div className="p-12 bg-light-surface rounded-2xl border border-light-outline text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-light-on-surface-variant">biotech</span>
          <h3 className="font-headline text-title-md font-bold text-light-primary">No Lab Tests Found</h3>
          <p className="text-xs text-light-on-surface-variant max-w-sm mx-auto">
            You do not have any pending or completed diagnostic requisitions under patient ID <strong>{user?.id}</strong>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
          <div
            key={test.id}
            className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary block">
                  {test.category}
                </span>
                <h3 className="font-headline text-title-md font-bold text-light-primary mt-0.5">
                  {test.testName}
                </h3>
                <div className="text-xs text-light-on-surface-variant mt-1">
                  Ordered By: <strong>{test.orderedByDoctor}</strong> ({test.orderedAt})
                </div>
              </div>
              <StatusBadge status={test.status} />
            </div>

            {test.summaryFindings && (
              <div className="p-3 bg-light-surface-variant rounded-xl border border-light-outline text-xs">
                <span className="font-bold text-light-primary block mb-1">Summary Findings:</span>
                <p className="text-light-on-surface-variant">{test.summaryFindings}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-light-outline text-xs">
              <span className="text-light-on-surface-variant">
                Technician: <strong>{test.labTechnician || 'Assigned'}</strong>
              </span>

              {test.status === 'COMPLETED' ? (
                <button
                  onClick={() => alert(`Downloading verified digital PDF report for ${test.testName}`)}
                  className="px-3.5 py-1.5 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-xs">download</span>
                  Download PDF Report
                </button>
              ) : (
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Sample Under Processing
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};
