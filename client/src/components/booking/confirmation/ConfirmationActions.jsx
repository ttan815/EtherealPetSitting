import { useNavigate } from "react-router";
import leftArrow from "../../../assets/icons/arrow-left.svg";
import DownloadReceiptButton from "../../action-button/DownloadReceiptButton";

/**
 * Renders receipt and dashboard navigation actions for a confirmed booking.
 * @returns {JSX.Element} The confirmation action buttons.
 */
function ConfirmationActions() {
  const navigate = useNavigate();

  function viewAppointments() {
    navigate("/customer-dashboard", {
      state: {
        section: "appointments",
        view: "appointment-detail",
        appointmentId: "EBP-2026-0847",
      },
    });
  }

  return (
    <>
      <DownloadReceiptButton />
      <button type="button" className="confirmation-view-appointments" onClick={viewAppointments}>
        View My Appointments
      </button>
      <a className="confirmation-return-dashboard" href="/customer-dashboard">
        <span>
          <img className="confirmation-back-icon" src={leftArrow} alt="" />
        </span>
        <p>Return to Dashboard</p>
      </a>
    </>
  );
}

export default ConfirmationActions;
