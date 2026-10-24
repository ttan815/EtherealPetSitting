import "../../../../styles/customer-dashboard/view-appointment/AppointmentDetail.css"

function ServiceSchedule() {
    return (
        <div className="card-service-schedule">
            <div className="service-schedule">Service &amp; Schedule</div>
            <div className="schedule-detail-meta">
            <div className="row-data-meta">
                <div className="sitter-assigned">Sitter Assigned</div>
                <div className="angelena-script-owner">Angelena Script (Owner)</div>
            </div>
            <div className="row-data-meta">
                <div className="service-booked">Service Booked</div>
                <div className="drop-in-care">Drop-in Care</div>
            </div>
            <div className="row-data-meta">
                <div className="pet-name">Pet Name</div>
                <div className="mochi-shiba-inu">Mochi · Shiba Inu</div>
            </div>
            <div className="row-data-meta">
                <div className="date-scheduled">Date Scheduled</div>
                <div className="tuesday-october-6-2026">Tuesday, October 6, 2026</div>
            </div>
            <div className="row-data-meta">
                <div className="check-in-slot">Check-In Slot</div>
                <div className="_12-00-pm">12:00 PM</div>
            </div>
            </div>
        </div>
    );
}

export default ServiceSchedule