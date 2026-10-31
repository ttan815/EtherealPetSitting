// Renders the view appointment header component.
import "../../../styles/customer-dashboard/view-appointment/ViewAppointmentHeader.css"
import "../../../styles/homepage/NavigationBar.css"

/**
 * Renders the heading for the customer appointment-list view.
 * @returns {JSX.Element} The appointment-list heading.
 */
function ViewAppointmentHeader() {
    return(
        <header className="page-header">
          <div>
            <h1>Appointments</h1>
            <p>See your upcoming visits and past care, and reschedule if plans change.</p>
          </div>
          <div className="header-actions">

            {/* Notification Bell Here */}

            {/* Need To Validation*/}
            <a href="/book-appointment" className="navigation-button">
                Book an appointment
            </a>

          </div>
        </header>
    );
}

export default ViewAppointmentHeader;