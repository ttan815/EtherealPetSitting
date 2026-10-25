import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";

function DatePicker() {
  const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  return (
    <div className="date-picker-block">
      <div className="header-row-calendar">
        <div className="october-2026">October 2026</div>
        <div className="pickers-controls" aria-hidden="true">
          <span className="chevron-prev">‹</span>
          <span className="chevron-next">›</span>
        </div>
      </div>
      <div className="days-of-week-headers">
        {daysOfWeek.map((day) => (
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
  );
}

export default DatePicker;
