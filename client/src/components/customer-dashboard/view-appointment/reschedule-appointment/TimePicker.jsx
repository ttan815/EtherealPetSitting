import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

function TimePicker() {
  return (
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
  );
}

export default TimePicker;
