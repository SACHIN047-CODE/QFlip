import React, { useState } from 'react';
import { patientService } from '../../services/patientService';
import { ComplaintFeedback } from '../../types';

export const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(4);
  const [category, setCategory] = useState<ComplaintFeedback['category']>('Long Wait Time');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [ticketQuery, setTicketQuery] = useState('');
  const [trackedResult, setTrackedResult] = useState<ComplaintFeedback | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<ComplaintFeedback | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await patientService.submitFeedback({
        category,
        rating,
        message,
        patientName,
        phone,
      });
      setSubmittedTicket(res);
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;
    const stored = localStorage.getItem('qflip_complaints');
    const list: ComplaintFeedback[] = stored ? JSON.parse(stored) : [];
    const found = list.find(
      (c) => c.ticketId.toLowerCase() === ticketQuery.trim().toLowerCase()
    );
    setTrackedResult(
      found || {
        id: 'mock',
        ticketId: ticketQuery.toUpperCase(),
        patientName: 'Patient Inquirer',
        phone: '981240XXXX',
        category: 'Long Wait Time',
        rating: 3,
        message: 'Under review by Civil Hospital Grievance Cell',
        status: 'INVESTIGATING',
        submittedAt: 'Today, 10:15 AM',
        resolutionNote: 'Assigned to Medical Officer on duty for verification',
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-10">
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
              Submit Grievance or Compliment
            </h2>
          </div>

          {submittedTicket ? (
            <div className="p-6 bg-success/10 border border-success/30 rounded-2xl text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-success">check_circle</span>
              <h3 className="font-headline text-title-md font-bold text-success">
                Grievance Registered Successfully
              </h3>
              <p className="text-xs text-light-on-surface-variant">
                Your ticket tracking number is:{' '}
                <strong className="font-code text-sm text-light-primary block mt-1">
                  {submittedTicket.ticketId}
                </strong>
              </p>
              <p className="text-[11px] text-light-on-surface-variant">
                An SMS confirmation has been dispatched. Our grievance officer will review within 2 business hours.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-2 px-4 py-2 bg-light-primary text-white text-xs font-bold rounded-lg"
              >
                Submit Another Feedback
              </button>
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
                {loading ? 'Submitting...' : 'Submit Official Grievance'}
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
                className="px-4 py-2.5 bg-light-primary text-white text-xs font-bold rounded-lg hover:bg-slate-800"
              >
                Track
              </button>
            </form>

            {trackedResult && (
              <div className="mt-4 p-4 rounded-xl border border-light-outline bg-light-surface-variant/40 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-light-outline">
                  <span className="font-code font-bold text-light-primary">{trackedResult.ticketId}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary/15 text-secondary">
                    {trackedResult.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Category</span>
                  <div className="font-semibold text-light-primary">{trackedResult.category}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-light-on-surface-variant block">Submitted</span>
                  <div className="text-light-on-surface-variant">{trackedResult.submittedAt}</div>
                </div>
                {trackedResult.resolutionNote && (
                  <div className="p-3 bg-white rounded-lg border border-light-outline">
                    <span className="text-[10px] uppercase font-bold text-success block">Official Hospital Note:</span>
                    <p className="text-[11px] text-light-primary mt-1">{trackedResult.resolutionNote}</p>
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
