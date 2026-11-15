import React, { useState } from "react";
import AppointmentDetail from
  "../../customer-dashboard/view-appointment/appointment-detail/AppointmentDetail";

import "../../../styles/owner-dashboard/calender/Calender.css";

/**
 * Formats a date/time value into a 12-hour time.
 * @param {string} dateTime Appointment date and time
 * @returns {string} Formatted time
 */
function formatTime(dateTime) {
  const date = new Date(dateTime);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

/**
 * Calendar appointment event block.
 * @param {Object} props Event information and display configuration
 * @returns {JSX.Element} Interactive event block
 */
export default function EventBlock({
  event,
  view = "week",
  startHour = 8,
  hourHeight = 53
}) {
  const [showDetail, setShowDetail] = useState(false);

  if (!event) return null;

  const start = new Date(event.start);
  const end = new Date(event.end);

  const startMinutes =
    start.getHours() * 60 + start.getMinutes();

  const endMinutes =
    end.getHours() * 60 + end.getMinutes();

  const startOffset = startMinutes - startHour * 60;

  const duration = Math.max(
    15,
    endMinutes - startMinutes
  );

  const top = (startOffset / 60) * hourHeight;

  const height = Math.max(
    24,
    (duration / 60) * hourHeight
  );

  const isYourVisit = event.sitterId === "me";

  const eventClass = isYourVisit
    ? "event-block dark-event"
    : "event-block light-event";

  const time = formatTime(event.start);

  const isMonth = view === "month";

  const isTall = height >= 48;

  /**
   * Opens appointment details.
   * @param {React.MouseEvent} e Click event
   * @returns {void} Nothing
   */
  const openDetail = (e) => {
    e.stopPropagation();
    setShowDetail(true);
  };

  return (
    <>
      <div
        className={`${eventClass} ${view}-event`}
        style={
          isMonth
            ? {}
            : {
                top: `${top}px`,
                height: `${height}px`
              }
        }
        onClick={openDetail}
        role="button"
        tabIndex={0}
        aria-label={`View appointment for ${event.petName}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openDetail(e);
          }
        }}
      >

        <div className="event-content">

          <div className="event-time">
            {time}
          </div>

          <div className="event-pet-name">
            {event.petName}
          </div>

          {isTall && !isMonth && (
            <div className="event-service">
              {event.service}
            </div>
          )}

        </div>

      </div>

      {showDetail && (
        <div
          className="event-detail-overlay"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="event-detail-container"
            onClick={(e) => e.stopPropagation()}
          >
            <AppointmentDetail
              appointment={event}
              onClose={() => setShowDetail(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}