import { useState } from "react";
import PageHeader from "../../parent-component/PageHeader";
import NewAppointmentButton from
  "../../action-button/NewAppointmentButton";
import CalendarBarUI from "./CalendarBarUI";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";

import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Renders the owner calendar page and its selected calendar view.
 * @returns {JSX.Element} Rendered owner calendar page
 */
export default function Calender() {
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  const [view, setView] = useState("week");

  const [sitterId, setSitterId] = useState("all");

  // Increment this when an appointment is created,
  // updated, or deleted to refresh calendar events.
  const refreshKey = 0;

  return (
      <section>

          <PageHeader
            title="Calendar"
            subtitle="Every booked visit, by day and sitter."
            actionButton={<NewAppointmentButton/>}
          />

        <CalendarBarUI
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          view={view}
          setView={setView}
          sitterId={sitterId}
          setSitterId={setSitterId}
        />

        <div className="calendar-content">

          {view === "week" && (
            <WeekView
              selectedDate={selectedDate}
              sitterId={sitterId}
              refreshKey={refreshKey}
            />
          )}

          {view === "day" && (
            <DayView
              selectedDate={selectedDate}
              sitterId={sitterId}
              refreshKey={refreshKey}
            />
          )}

          {view === "month" && (
            <MonthView
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setView={setView}
              sitterId={sitterId}
              refreshKey={refreshKey}
            />
          )}

        </div>

      </section>
  );
}