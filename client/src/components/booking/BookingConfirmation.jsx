import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import "../styles/BookingConfirmation.css";
import { useAuth } from "../../context/AuthContext";
import heroTopoLeft from "../assets/home/hero-topo-left.svg";
import heroTopoRight from "../assets/home/hero-topo-right.svg";
import rightArrow from "../assets/icons/arrow-right.svg";
import leftArrow from "../assets/icons/arrow-left.svg";
import circleBackground from "../assets/home/hero-inner-circle.svg";
import Footer from "./Footer";
function BookingConfirmation({ petName = "PET_NAME_HERE" }) {
  const { user, loading } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("card");
  let role = user?.role;
  if (role == null) {
    role = "visitor";
  }
  return (
    <>
      <NavigationBar role={role} user={user} />
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
        <button className="back-btn">Download Receipt</button>
        <button className="pay-deposit-confirm-btn">
          View My Appointments
        </button>
        <button className="return-to-dashboard">
          <span>
            <img className="bookingConfirmed-Arrow" src={leftArrow} alt="" />
          </span>
          <p>Return to Dashboard</p>
        </button>
      </div>
      <Footer></Footer>
    </>
  );
}

export default BookingConfirmation;
