import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import Header from "./Header";
import ServiceSchedule from "./ServiceSchedule";
import CareInstruction from "./CareInstruction";
import PaymentInfo from "./PaymentInfo";
import RescheduleAppointButton from "../../../action-button/RescheduleAppointmentButton";

function AppointmentDetail() {
    return (
        <div className="page-content">
            <Header/>
            <div className="content-split-columns">
                <div className="left-segment-details">
                    <ServiceSchedule/>
                    <CareInstruction/>
                </div>

                <div className="right-segment-panel">
                    <PaymentInfo/>

                <div className="sitter-sidebar-actions">
                    <RescheduleAppointButton/>
                    <div className="button-download-receipt">
                    <div className="see-all-reviews">Download Receipt</div>
                    </div>
                    <div className="button-cancel-appointment">
                    <div className="see-all-reviews">Cancel Appointment</div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
}

export default AppointmentDetail;