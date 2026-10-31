// Renders the cancel appointment button component.
import { useState } from "react";
import "../../styles/customer-dashboard/view-appointment/AppointmentDetail.css";
import CancelAppointmentPopup from "../popup/CancelAppointmentPopup";

/**
 * Renders the appointment cancellation action and opens its confirmation dialog.
 * @param {Object} props - The cancellation callback and appointment identity.
 * @param {Function} props.onCancelled - Called after cancellation succeeds.
 * @param {string|number} props.appointmentId - ID of the appointment to cancel.
 * @returns {JSX.Element} The cancellation button and its conditional dialog.
 */
function CancelAppointmentButton({ onCancelled, appointmentId }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="button-cancel-appointment"
        onClick={() => setIsPopupOpen(true)}
      >
        Cancel Appointment
      </button>
      {isPopupOpen && (
        <CancelAppointmentPopup
          onClose={() => setIsPopupOpen(false)}
          onCancelled={onCancelled}
          appointmentId={appointmentId}
        />
      )}
    </>
  );
}

export default CancelAppointmentButton;
