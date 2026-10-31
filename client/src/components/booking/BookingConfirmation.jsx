import "../../styles/booking/BookingConfirmation.css";
import { useNavigate } from "react-router";
import heroTopoLeft from "../../assets/home/hero-topo-left.svg";
import heroTopoRight from "../../assets/home/hero-topo-right.svg";
import rightArrow from "../../assets/icons/arrow-right.svg";
import leftArrow from "../../assets/icons/arrow-left.svg";
import circleBackground from "../../assets/home/hero-inner-circle.svg";
import Footer from "../homepage/Footer";
import DownloadReceiptButton from "../action-button/DownloadReceiptButton";
function BookingConfirmation({ petName = "PET_NAME_HERE" }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="sectionHeader">
        <img src={heroTopoLeft} className="ringBottomLeft" alt="" />
        <img src={heroTopoRight} className="ringBottomRight" alt="" />
        <div className="bookingConfirmedContainerDesc">
          <img className="bookingConfirmed-Arrow" src={rightArrow} alt="" />
          <p className="reviewPayDepositTitle">Your Appointment Is Confirmed</p>
          <p className="thankYouNote">
            Thank you for trusting Ethereal Pet Sitting. {petName} is in loving,
            professional hands. A copy of this confirmation has been sent to
            your email.
          </p>
        </div>
      </div>
      <div className="review-pay-information-container">
        <div className="infoContainer">
          <p className="title-info">Booking Summary</p>
          <div className="flex-info">
            <p>Confirmation Number</p>
            <p className="flex-desc confirmation-number">EBP-2026-0847</p>
          </div>
          <div className="flex-info">
            <p>Service Type</p>
            <p className="flex-desc">Drop-in-Care</p>
          </div>
          <div className="flex-info">
            <p>Pet Name</p>
            <p className="flex-desc">Mochi (Dog)</p>
          </div>
          <div className="flex-info">
            <p>Date</p>
            <p className="flex-desc">Tuesday, October 6, 2026</p>
          </div>
          <div className="flex-info">
            <p>Time Slot</p>
            <p className="flex-desc">12:00 PM</p>
          </div>
          <div className="line-overlay"></div>
          <div>
            <div className="flex-info">
              <p>Deposit Paid</p>
              <p className="flex-desc">$20.00</p>
            </div>
            <div className="flex-info">
              <p>Remaining Balance</p>
              <p className="flex-desc">$5.00</p>
            </div>
            <div className="line-overlay"></div>
            <div className="checkbox-container">
              <span className="fake-checkbox"></span>
              <span className="appointmentMsgAddToCal">
                This appointment has been added to the business calendar.
              </span>
            </div>
          </div>
        </div>
        <img src={circleBackground} className="circleRight" alt="" />
      </div>
      <div className="navigation-buttons">
        <img src={circleBackground} className="circleLeft" alt="" />
        <DownloadReceiptButton/>
        <button
          type="button"
          className="pay-deposit-confirm-btn"
          onClick={() =>
            navigate("/customer-dashboard", {
              state: {
                section: "appointments",
                view: "appointment-detail",
                appointmentId: "EBP-2026-0847",
              },
            })
          }
        >
          View My Appointments
        </button>
        <a className="return-to-dashboard" href="/customer-dashboard">
          <span>
            <img className="bookingConfirmed-Arrow" src={leftArrow} alt="" />
          </span>
          <p>Return to Dashboard</p>
        </a>
      </div>
      <Footer></Footer>
    </>
  );
}

export default BookingConfirmation;
