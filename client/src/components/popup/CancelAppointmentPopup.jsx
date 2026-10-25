import { useEffect, useRef, useState } from "react";
import "../../styles/popup/CancelAppointmentPopup.css";

function Success( {onCancelled, appointmentId, closeButtonRef} ) {
    
    // Delete AppointmentId

    return (
        <section
          className="cancel-appointment-modal cancel-appointment-modal--success"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-appointment-success-title"
        >
          <div className="cancel-appointment-modal__success-icon" aria-hidden="true">
            ✓
          </div>
          <h2
            id="cancel-appointment-success-title"
            className="cancel-appointment-modal__success-title"
          >
            Appointment cancelled
          </h2>
          <p className="cancel-appointment-modal__success-message">
            Your appointment has been cancelled.
          </p>
          <div className="cancel-appointment-modal__actions cancel-appointment-modal__actions--center">
            <button
              ref={closeButtonRef}
              type="button"
              className="cancel-appointment-modal__back-button"
              onClick={onCancelled}
            >
              Back to Appointments
            </button>
          </div>
        </section>
    );
}

function CancelAppointmentConfirmation( {onClose, setIsSuccess, closeButtonRef} ) {
    return (
        <section
          className="cancel-appointment-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-appointment-title"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="cancel-appointment-modal__header">
            <div className="cancel-appointment-modal__icon" aria-hidden="true">
              !
            </div>
            <div className="cancel-appointment-modal__heading">
              <h2
                id="cancel-appointment-title"
                className="cancel-appointment-modal__title"
              >
                Cancel this appointment?
              </h2>
              <p className="cancel-appointment-modal__subtitle">
                Are you sure you want to cancel this appointment?
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="cancel-appointment-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </header>

          <div className="cancel-appointment-modal__body">
            <h3 className="cancel-appointment-modal__note-title">
              About your deposit
            </h3>
            <p className="cancel-appointment-modal__note">
              Your deposit will be refunded according to the cancellation
              policy. Need a different day instead? You can reschedule for free.
            </p>
          </div>

          <div className="cancel-appointment-modal__actions">
            <button
              type="button"
              className="cancel-appointment-modal__keep-button"
              onClick={onClose}
            >
              Keep appointment
            </button>
            <button
              type="button"
              className="cancel-appointment-modal__cancel-button"
              onClick={() => setIsSuccess(true)}
            >
              Cancel appointment
            </button>
          </div>
        </section>
    );
}

function CancelAppointmentPopup({ onClose, onCancelled, appointmentId }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const closeButtonRef = useRef(null);

  return (
    <div className="cancel-appointment-modal__backdrop">
      {isSuccess ? (
        <Success 
            appointmentId={appointmentId} 
            onCancelled={onCancelled}
            closeButtonRef={closeButtonRef}
        />
        ) : (
        <CancelAppointmentConfirmation
            onClose={onClose}
            setIsSuccess={setIsSuccess}
            closeButtonRef={closeButtonRef}
        />
      )}
    </div>
  );
}

export default CancelAppointmentPopup;
