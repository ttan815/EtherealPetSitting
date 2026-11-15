import React, { useState } from "react";
import PageHeader from "../../parent-component/PageHeader";
import NewAppointmentButton from
  "../../action-button/NewAppointmentButton";
import CalendarBarUI from "./CalendarBarUI";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";

import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Main calendar page.
 * @param {Object} props Optional page configuration
 * @returns {JSX.Element} Complete calendar page
 */
export default function Calender() {
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  const [view, setView] = useState("week");

  const [sitterId, setSitterId] = useState("all");

  // Increment this when an appointment is created,
  // updated, or deleted to refresh calendar events.
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="calendar-page">

      <main className="calendar-main">

        <div className="calendar-page-header">

          <PageHeader
            title="Calendar"
            subtitle="Every booked visit, by day and sitter."
          />
          <div className="calendar-new-appointment">
            <NewAppointmentButton />
          </div>

        </div>

        <CalendarBarUI
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          view={view}
          setView={setView}
          sitterId={sitterId}
          setSitterId={setSitterId}
        />

        <section className="calendar-content">

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

        </section>

      </main>

    </div>
  );
}