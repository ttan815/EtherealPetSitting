import { useCallback, useState } from "react";
import NewAppointmentPopup from "../popup/NewAppointmentPopup";
import { useNewAppointment } from "../../context/NewAppointmentContext";

/**
 * Renders the button that opens the appointment popup.
 * @returns {JSX.Element} The appointment button and its popup.
 */
export default function NewAppointmentButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { addAppointment, popupProps } = useNewAppointment();
    const { copy } = popupProps;

    const closePopup = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <button
                type="button"
                className="new-appointment-button"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
            >
                <span aria-hidden="true">+</span>
                {copy.openButtonLabel}
            </button>
            {isOpen && (
                <NewAppointmentPopup
                    {...popupProps}
                    copy={copy}
                    onSubmit={addAppointment}
                    onClose={closePopup}
                />
            )}
        </>
    );
}
