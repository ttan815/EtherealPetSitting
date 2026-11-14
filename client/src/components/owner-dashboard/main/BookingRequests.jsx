// Renders the booking requests card on the owner dashboard.
import pawIcon from "../../../assets/owner-dashboard/stat-paw.svg";
import calendarIcon from "../../../assets/owner-dashboard/request-calendar.svg";
import checkIcon from "../../../assets/owner-dashboard/status-check.svg";
import "../../../styles/owner-dashboard/BookingRequests.css";

/**
 * Renders the booking requests waiting for the owner, with Accept, Decline and Reschedule.
 * @param {Object} props - Requests and click handlers.
 * @param {Object[]} props.requests - Pending requests, from getBookingRequests().
 * @param {Function} props.onAccept - Called with a request's id when "Accept" is clicked.
 * @param {Function} props.onDecline - Called with the request when "Decline" is clicked.
 * @param {Function} props.onReschedule - Called with a request's id when "Reschedule" is clicked.
 * @returns {JSX.Element} The booking requests card.
 */
export default function BookingRequests({ requests, onAccept, onDecline, onReschedule }) {
  return (
    <section className="booking-requests" aria-labelledby="booking-requests-title">
      <div className="booking-requests-header">
        <h2 id="booking-requests-title" className="booking-requests-title">
          Booking Requests
        </h2>
        <span className="booking-requests-count" aria-label={`${requests.length} pending`}>
          {requests.length}
        </span>
      </div>

      {requests.length === 0 ? (
        <p className="booking-requests-empty">No requests waiting for your reply.</p>
      ) : (
        <ul className="booking-requests-list">
          {requests.map((request) => (
            <li key={request.id} className="booking-request">
              <div className="booking-request-top">
                {/* Paw placeholder until pets have photos */}
                <span className="booking-request-avatar">
                  <img src={pawIcon} alt="" />
                </span>

                <div className="booking-request-info">
                  <span className="booking-request-pet">
                    {request.petName} · {request.breed}
                  </span>
                  <span>
                    {request.customerName} · {request.service}
                  </span>
                </div>
              </div>

              <div className="booking-request-meta">
                <img src={calendarIcon} alt="" />
                <span className="booking-request-date">{request.dateLabel}</span>

                {request.isDepositPaid ? (
                  <span className="booking-request-deposit booking-request-deposit-paid">
                    <img src={checkIcon} alt="" />
                    Deposit paid · ${request.depositAmount}
                  </span>
                ) : (
                  <span className="booking-request-deposit booking-request-deposit-pending">Deposit pending</span>
                )}
              </div>

              <div className="booking-request-actions">
                <button type="button" className="booking-request-accept" onClick={() => onAccept(request.id)}>
                  Accept
                </button>
                <button type="button" className="booking-request-decline" onClick={() => onDecline(request)}>
                  Decline
                </button>
                <button type="button" className="booking-request-reschedule" onClick={() => onReschedule(request.id)}>
                  Reschedule
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
