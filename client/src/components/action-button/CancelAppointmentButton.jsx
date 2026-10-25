import { useState } from "react";
import "../../styles/customer-dashboard/view-appointment/AppointmentDetail.css";
import CancelAppointmentPopup from "../popup/CancelAppointmentPopup";

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
