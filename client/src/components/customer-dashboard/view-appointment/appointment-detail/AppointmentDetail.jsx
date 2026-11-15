// Renders the appointment detail component.
import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import Header from "./Header";
import ServiceSchedule from "./ServiceSchedule";
import CareInstruction from "./CareInstruction";
import PaymentInfo from "./PaymentInfo";
import RescheduleAppointButton from "../../../action-button/RescheduleAppointmentButton";
import DownloadReceiptButton from "../../../action-button/DownloadReceiptButton";
import CancelAppointmentButton from "../../../action-button/CancelAppointmentButton";


/**
 * Renders an appointment's details and its available dashboard actions.
 * @param {Object} props - Appointment identity, dashboard state, and callbacks.
 * @param {Function} props.setCurrentView - Sets the dashboard view to display.
 * @param {Object|null} props.appointment - Appointment details loaded by the parent.
 * @param {string|number} props.appointmentId - ID of the appointment to display.
 * @param {Function} props.onReschedule - Starts rescheduling the appointment.
 * @returns {JSX.Element} The appointment detail view.
 */
function AppointmentDetail({ setCurrentView, appointmentId, appointment, onReschedule }) {
    if (!appointment) {
        return <p role="alert">Appointment details could not be found.</p>;
    }

    return (
        <div className="page-content">
            <Header setCurrentView={setCurrentView} appointment={appointment} />
            <div className="content-split-columns">
                <div className="left-segment-details">
                    <ServiceSchedule appointment={appointment} />
                    <CareInstruction careInstructions={appointment.careInstructions} />
                </div>

                <div className="right-segment-panel">
                    <PaymentInfo payment={appointment.payment} />

                    <div className="sitter-sidebar-actions">
                        <RescheduleAppointButton onReschedule={onReschedule} />
                        <DownloadReceiptButton />
                        <CancelAppointmentButton
                            onCancelled={() => setCurrentView("main")}
                            appointmentId={appointmentId}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AppointmentDetail;