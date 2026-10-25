import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"
import ArrowLeft from "../../../../assets/icons/arrow-left.svg";

function Header( {setCurrentView, appointment} ) {
    function handleBack() {
        setCurrentView("main");
    }

    return (
        <header className="page-header-grid">
            <div className="back-nav-link"
                onClick={handleBack}
            >
                <img className="left-chevron" src={ArrowLeft}/>
                <div className="back-to-appointments">Back to Appointments</div>
            </div>

            <div className="heading-section">
                <div className="title-status">
                    <div className="appointment-details">Appointment Details</div>
                    <div className="pill-badge">
                    <div className={appointment.status === "Confirm" ? "confirm" : "pending"}>{appointment.status}</div>
                    </div>
                </div>

                <div className="confirmation-reference-epb-2026-0847">
                    Confirmation Reference: EPB-2026-0847
                </div>
            </div>
        </header>
    );
}

export default Header;