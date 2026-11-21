import React, { useState } from 'react';
import { patientService } from '../../services/patientService';
import { SupportTicket } from '../../types';

export const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(4);
  const [category, setCategory] = useState<SupportTicket['category']>('Long Wait Time');
  const [patientName, setPatientName] = useState('Manpreet Singh');
  const [phone, setPhone] = useState('9812401824');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [ticketQuery, setTicketQuery] = useState('');
  const [trackedResult, setTrackedResult] = useState<SupportTicket | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await patientService.submitTicket({
        subject: subject.trim() || `${category} Grievance`,
        description: message.trim(),
        category,
        rating,
        patientName,
        phone,
      });
      setSubmittedTicket(res);
      setMessage('');
      setSubject('');
    } catch (err) {
      console.error('Failed to submit ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;

    setIsTracking(true);
    setTrackError(null);
    setTrackedResult(null);

    try {
      const found = await patientService.getTicketByTrackingId(ticketQuery.trim());
      if (found) {
        setTrackedResult(found);
      } else {
        setTrackError(
          `No support ticket found with ID "${ticketQuery.trim().toUpperCase()}". Please verify the tracking number and try again, or file a new grievance.`
        );
      }
    } catch (err) {
      setTrackError('Error querying ticket status. Please check your connection and try again.');
    } finally {
      setIsTracking(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-warning/15 text-on-warning border border-warning/30">
            Open
          </span>
        );
      case 'IN_PROGRESS':
      case 'INVESTIGATING':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary/15 text-secondary border border-secondary/30">
            In Progress
          </span>
        );
      case 'AWAITING_USER':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
            Awaiting User Response
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-success/15 text-success border border-success/30">
            Resolved ✓
          </span>
        );
      case 'CLOSED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 border border-slate-300">
            Closed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-light-surface-variant text-light-primary">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Patient Voice &amp; Accountability
        </span>
        <h1 className="font-headline text-display-md-mobile sm:text-display-md font-extrabold text-light-primary mt-1">
          Hospital Feedback &amp; Grievance Redressal
        </h1>
        <p className="font-body text-xs sm:text-sm text-light-on-surface-variant mt-2 leading-relaxed">
          Ambala Civil Hospital is committed to transparent patient care under the National Health Mission. Share your
          experience or file an escalation for long delays.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Feedback / Complaint Submission (7 cols) */}
        <div className="lg:col-span-7 bg-light-surface rounded-2xl border border-light-outline p-6 sm:p-8 shadow-card space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-light-outline">
            <span className="material-symbols-outlined text-secondary">rate_review</span>
            <h2 className="font-headline text-title-lg font-bold text-light-primary">
              Submit Grievance or Support Ticket
            </h2>
          </div>

          {submittedTicket ? (
            <div className="p-6 bg-success/10 border border-success/30 rounded-2xl text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-success">check_circle</span>
              <h3 className="font-headline text-title-md font-bold text-success">
                Grievance Registered Successfully
              </h3>
              <p className="text-xs text-light-on-surface-variant">
                Your unique ticket tracking number is:{' '}
                <strong className="font-code text-sm text-light-primary block mt-1">
                  {submittedTicket.ticketId}
                </strong>
              </p>
              <div className="p-3 bg-white/70 rounded-xl border border-light-outline/60 text-left text-xs space-y-1">
                <div><span className="text-light-on-surface-variant">Subject:</span> <strong>{submittedTicket.subject}</strong></div>
                <div><span className="text-light-on-surface-variant">Status:</span> {getStatusBadge(submittedTicket.status)}</div>
                <div><span className="text-light-on-surface-variant">Category:</span> <span className="text-light-primary">{submittedTicket.category}</span></div>
              </div>
              <p className="text-[11px] text-light-on-surface-variant">
                Our hospital grievance officer will review this escalation. You can track status anytime on this portal using your ticket ID.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setTicketQuery(submittedTicket.ticketId);
                    setTrackedResult(submittedTicket);
                    setSubmittedTicket(null);
                  }}
                  className="px-4 py-2 bg-secondary text-white text-xs font-bold rounded-lg hover:bg-secondary/90 transition-all"
                >
                  Track This Ticket Now
                </button>
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="px-4 py-2 bg-light-primary text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all"
                >
                  Submit Another Feedback
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Star Rating */}
              <div>
                <label className="font-bold text-light-primary block mb-1">Overall Hospital Experience</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                      <span
                        className={`material-symbols-outlined ${
                          star <= rating ? 'text-accent fill-current' : 'text-light-outline'
                        }`}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-light-on-surface-variant ml-2">
                    {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="font-bold text-light-primary block mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-label focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
                >
                  <option value="Long Wait Time">Long Wait Time in OPD Queue</option>
                  <option value="Doctor Unavailability">Doctor Absent / Unavailability</option>
                  <option value="Cleanliness">Hygiene &amp; Cleanliness of Waiting Hall</option>
                  <option value="Staff Behavior">Counter Staff or Security Behavior</option>
                  <option value="Pharmacy Delay">Jan Aushadhi Medicine Dispensing Delay</option>
                  <option value="App Issue">Digital Token / App Display Glitch</option>
                  <option value="Other">Other Healthcare Query</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="font-bold text-light-primary block mb-1">Subject / Summary</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Delayed Consultation in OPD Room 12"
                  className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-light-primary block mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-light-primary block mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-light-outline bg-light-surface text-light-primary font-code focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-light-primary block mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please state what happened, including room number, token number, or counter if applicable..."
                  className="w-full p-3 rounded-lg border border-light-outline bg-light-surface text-light-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-accent hover:brightness-95 text-on-accent font-headline font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting to Grievance Desk...' : 'Submit Official Grievance'}
              </button>
            </form>
          )}
        </div>

        {/* Right: Ticket Tracking (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-light-surface rounded-2xl border border-light-outline p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-light-outline">
              <span className="material-symbols-outlined text-secondary">track_changes</span>
              <h3 className="font-headline text-title-md font-bold text-light-primary">
                Track Ticket Status
              </h3>
            </div>
            <p className="text-xs text-light-on-surface-variant">
              Enter your Grievance Tracking Number (e.g. <strong>TCK-9921</strong>) to check action taken by hospital
              administrators.
            </p>

            <form onSubmit={handleTrackTicket} className="flex gap-2">
              <input
                type="text"
                value={ticketQuery}
                onChange={(e) => setTicketQuery(e.target.value)}
                placeholder="TCK-9921"
                className="flex-grow p-2.5 text-xs rounded-lg border border-light-outline bg-light-surface-variant font-code focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={isTracking}
                className="px-4 py-2.5 bg-light-primary text-white text-xs font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50"
              >
                {isTracking ? 'Searching...' : 'Track'}
              </button>
            </form>

            {/* Error Message when Ticket Not Found */}
            {trackError && (
              <div className="p-3.5 bg-danger/10 border border-danger/30 rounded-xl text-danger text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-base">error</span>
                  Ticket Not Found
                </div>
                <p className="text-[11px] leading-relaxed">{trackError}</p>
              </div>
            )}

            {/* Tracked Result Card */}
            {trackedResult && (
              <div className="mt-4 p-4 rounded-xl border border-light-outline bg-light-surface-variant/40 space-y-3.5 text-xs">
                {/* Header: Ticket ID & Status */}
                <div className="flex items-center justify-between pb-2 border-b border-light-outline">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-light-on-surface-variant block">Ticket Tracking ID</span>
                    <span className="font-code font-bold text-light-primary text-sm">{trackedResult.ticketId}</span>
                  </div>
                  <div>
                    {getStatusBadge(trackedResult.status)}
                  </div>
                </div>

                {/* Subject & Category */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Subject</span>
                  <div className="font-bold text-light-primary text-xs">{trackedResult.subject}</div>
                  <div className="text-[11px] text-secondary font-medium mt-0.5">{trackedResult.category}</div>
                </div>

                {/* Submitter & Date */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Submitter</span>
                    <span className="text-light-primary">{trackedResult.patientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Date Submitted</span>
                    <span className="text-light-on-surface-variant">{trackedResult.submittedAt}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block mb-1">Issue Description</span>
                  <p className="text-[11px] text-light-on-surface bg-white p-2.5 rounded-lg border border-light-outline/70 leading-relaxed">
                    {trackedResult.description || trackedResult.message}
                  </p>
                </div>

                {/* Official Hospital Resolution Note (if present or resolved) */}
                {(trackedResult.resolutionMessage || trackedResult.resolutionNote) && (
                  <div className="p-3 bg-success/10 border border-success/30 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-success font-bold text-xs">
                      <span className="material-symbols-outlined text-sm">task_alt</span>
                      Official Resolution Action
                    </div>
                    <p className="text-[11px] text-light-primary leading-relaxed">
                      {trackedResult.resolutionMessage || trackedResult.resolutionNote}
                    </p>
                    {trackedResult.resolvedAt && (
                      <div className="text-[10px] text-light-on-surface-variant font-code">
                        Resolved on: {new Date(trackedResult.resolvedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}

                {/* Patient-Facing Admin Updates */}
                {trackedResult.adminUpdates && trackedResult.adminUpdates.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-light-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-secondary">campaign</span>
                      Hospital Action Updates ({trackedResult.adminUpdates.length})
                    </span>
                    <div className="space-y-1.5">
                      {trackedResult.adminUpdates.map((upd) => (
                        <div key={upd.id} className="p-2.5 bg-white rounded-lg border border-light-outline/70 text-[11px]">
                          <div className="flex items-center justify-between text-[10px] text-secondary font-bold mb-0.5">
                            <span>{upd.author}</span>
                            <span className="text-light-on-surface-variant font-normal font-code">{upd.timestamp}</span>
                          </div>
                          <p className="text-light-primary">{upd.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Progression History */}
                {trackedResult.statusHistory && trackedResult.statusHistory.length > 0 && (
                  <div className="pt-2 border-t border-light-outline/70 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">
                      Status Progression Timeline
                    </span>
                    <div className="space-y-1 text-[11px]">
                      {trackedResult.statusHistory.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[10px]">
                          <span className="material-symbols-outlined text-xs text-secondary mt-0.5">arrow_right</span>
                          <div className="flex-1">
                            <span className="font-bold text-light-primary">{step.status}</span>
                            <span className="text-light-on-surface-variant mx-1">•</span>
                            <span className="text-light-on-surface-variant font-code">{step.timestamp}</span>
                            <span className="text-light-on-surface-variant mx-1">by</span>
                            <span className="text-secondary font-medium">{step.changedBy}</span>
                            {step.note && <div className="text-[10px] text-light-on-surface italic mt-0.5">"{step.note}"</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-light-surface-variant/70 rounded-2xl border border-light-outline p-6 space-y-3 text-xs">
            <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-light-primary">
              Patient Grievance Cell
            </h4>
            <div className="flex items-center gap-2 text-light-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">phone</span>
              <span>Hospital Grievance Desk: <strong>0171-2550102</strong></span>
            </div>
            <div className="flex items-center gap-2 text-light-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">mail</span>
              <span>grievance@ambalahospital.gov.in</span>
            </div>
            <div className="flex items-center gap-2 text-light-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
              <span>Working Hours: 08:00 AM – 04:00 PM (Mon - Sat)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
