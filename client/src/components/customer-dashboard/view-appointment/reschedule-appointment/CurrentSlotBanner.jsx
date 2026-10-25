import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

function CurrentSlotBanner() {
  return (
    <div className="current-slot-banner">
      <div className="warning-symbol-holder" aria-hidden="true">!</div>
      <div className="current-details-block">
        <div className="current-appointment-drop-in-care-with-mochi">
          Current Appointment: Drop-in Care with Mochi
        </div>
        <div className="scheduled-for-tuesday-october-6-2026-12-00-pm-no-fee-for-rescheduling">
          Scheduled for: Tuesday, October 6, 2026 @ 12:00 PM. No fee for
          rescheduling.
        </div>
      </div>
    </div>
  );
}

export default CurrentSlotBanner;
