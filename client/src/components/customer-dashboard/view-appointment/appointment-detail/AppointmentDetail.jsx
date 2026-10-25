import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import Header from "./Header";
import ServiceSchedule from "./ServiceSchedule";
import CareInstruction from "./CareInstruction";
import PaymentInfo from "./PaymentInfo";
import RescheduleAppointButton from "../../../action-button/RescheduleAppointmentButton";
import DownloadReceiptButton from "../../../action-button/DownloadReceiptButton";
import CancelAppointmentButton from "../../../action-button/CancelAppointmentButton";

function fetchAppointmentId(appointmentId) {
    {/* Fetch here */}
    /**
     * Temp Database Structure:
     * Sitter Assigned: Angelena
     * service: Dog Walking
     * petId: 101
     * date: Oct 26, 2026
     * time: 10:00 AM
     * transactionId: 1001
     */
    const appointment = {
        id: appointmentId,
        sitter: "Owner",
        service: "Trim",
        petId: 101,
        date: "Oct 26, 2026",
        time: "10:00 AM",
        transactionId: 1001
    }

    return appointment;
};


function AppointmentDetail( {setCurrentView, appointmentId, onReschedule} ) {
    const appointment = fetchAppointmentId(appointmentId);

    return (
        <div className="page-content">
            <Header setCurrentView={setCurrentView} appointment={appointment}/>
            <div className="content-split-columns">
                <div className="left-segment-details">
                    <ServiceSchedule appointment={appointment}/>
                    <CareInstruction petId={appointment.petId}/>
                </div>

                <div className="right-segment-panel">
                    <PaymentInfo transactionId={appointment.transactionId}/>

                    <div className="sitter-sidebar-actions">
                        <RescheduleAppointButton onReschedule={onReschedule}/>
                        <DownloadReceiptButton/>
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