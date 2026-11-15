// Renders the appointment detail component.
import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import Header from "./Header";
import ServiceSchedule from "./ServiceSchedule";
import CareInstruction from "./CareInstruction";
import PaymentInfo from "./PaymentInfo";
import RescheduleAppointButton from "../../../action-button/RescheduleAppointmentButton";
import DownloadReceiptButton from "../../../action-button/DownloadReceiptButton";
import CancelAppointmentButton from "../../../action-button/CancelAppointmentButton";
import { getAppointmentById } from "../../../../services/appointment-service";


/**
 * Renders an appointment's details and its available dashboard actions.
 * @param {Object} props - Appointment identity, dashboard state, and callbacks.
 * @param {string} props.activeFilter - The currently selected appointment filter.
 * @param {Function} props.setCurrentView - Sets the dashboard view to display.
 * @param {string|number} props.appointmentId - ID of the appointment to display.
 * @param {Function} props.onReschedule - Starts rescheduling the appointment.
 * @returns {JSX.Element} The appointment detail view.
 */
function AppointmentDetail({ activeFilter, setCurrentView, appointmentId, onReschedule }) {
    const appointment = getAppointmentById(appointmentId);

    return (
        <div className="page-content">
            <Header setCurrentView={setCurrentView} appointment={appointment} />
            <div className="content-split-columns">
                <div className="left-segment-details">
                    <ServiceSchedule appointment={appointment} />
                    <CareInstruction petId={appointment.petId} />
                </div>

                <div className="right-segment-panel">
                    <PaymentInfo transactionId={appointment.transactionId} />

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