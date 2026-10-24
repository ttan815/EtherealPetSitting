import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import Header from "./Header";
import ServiceSchedule from "./ServiceSchedule";
import CareInstruction from "./CareInstruction";
import PaymentInfo from "./PaymentInfo";
import RescheduleAppointButton from "../../../action-button/RescheduleAppointmentButton";
import DownloadReceiptButton from "../../../action-button/DownloadReceiptButton";
import CancelAppointmentButton from "../../../action-button/CancelAppointmentButton";

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
                        <DownloadReceiptButton/>
                        <CancelAppointmentButton/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AppointmentDetail;