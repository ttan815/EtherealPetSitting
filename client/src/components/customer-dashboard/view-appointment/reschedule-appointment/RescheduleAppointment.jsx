import { useState } from "react";
import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";
import RescheduleConfirmation from "../../../popup/RescheduleConfirmation";

function RescheduleAppointment({ appointmentId, onKeepAppointment, onViewAppointment }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    return (
      <RescheduleConfirmation
        appointmentId={appointmentId}
        onViewAppointment={onViewAppointment}
      />
    );
  }

  return (
    <section className="modal-reschedule-appointment" aria-labelledby="reschedule-title">
      <header className="header">
        <div className="title">
          <h1 id="reschedule-title" className="reschedule-appointment">
            Reschedule Appointment
          </h1>
          <div className="pick-a-new-date-and-time-your-deposit-carries-over">
            Pick a new date and time. Your deposit carries over.
          </div>
        </div>
        <button
          type="button"
          className="close"
          onClick={onKeepAppointment}
          aria-label="Keep current appointment and close"
        >
          &times;
        </button>
      </header>

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

      <div className="pickers-grid">
        <div className="date-picker-block">
          <div className="header-row-calendar">
            <div className="october-2026">October 2026</div>
            <div className="pickers-controls" aria-hidden="true">
              <span className="chevron-prev">‹</span>
              <span className="chevron-next">›</span>
            </div>
          </div>
          <div className="days-of-week-headers">
            {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
              <div key={day} className={day}>
                {day[0].toUpperCase() + day.slice(1)}
              </div>
            ))}
          </div>
          <div className="numbers-layout-grid">
            <div className="row-week-1">
              <div className="_28">28</div>
              <div className="_29">29</div>
              <div className="_30">30</div>
              <div className="day-1-active"><div className="_1">1</div></div>
              <div className="day-2-active"><div className="_2">2</div></div>
              <div className="day-3-active"><div className="_3">3</div></div>
              <div className="_4">4</div>
            </div>
            <div className="row-week-2">
              <div className="day-5"><div className="_5">5</div></div>
              <div className="day-6-selected"><div className="_6">6</div></div>
              <div className="day-7"><div className="_7">7</div></div>
              <div className="day-8"><div className="_8">8</div></div>
              <div className="day-9"><div className="_9">9</div></div>
              <div className="day-10"><div className="_10">10</div></div>
              <div className="_11">11</div>
            </div>
          </div>
        </div>

        <div className="time-picker-block">
          <div className="available-times">Available Times</div>
          <div className="selected-date-tue-oct-6">Selected Date: Tue, Oct 6</div>
          <div className="morning-group-list">
            <div className="morning">Morning</div>
            <div className="time-slots-row">
              <button type="button" className="time-8-00-am">8:00 AM</button>
              <button type="button" className="time-10-00-am">10:00 AM</button>
            </div>
          </div>
          <div className="afternoon-group-list">
            <div className="afternoon">Afternoon</div>
            <div className="time-slots-row">
              <button type="button" className="time-12-00-pm-selected">12:00 PM</button>
              <span className="pill-slot-disabled-grey">3:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-row-reschedule">
        <button
          type="button"
          className="button-keep-current-appointment"
          onClick={onKeepAppointment}
        >
          Keep Current Appointment
        </button>
        <button
          type="button"
          className="button-confirm-reschedule"
          onClick={() => setIsConfirmed(true)}
        >
          Confirm Reschedule
        </button>
      </div>
    </section>
  );
}

export default RescheduleAppointment;
