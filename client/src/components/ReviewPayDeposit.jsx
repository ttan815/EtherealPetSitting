import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import '../styles/ReviewPayDeposit.css';
import { useAuth } from "../context/AuthContext";
import heroTopoLeft from "../assets/home/hero-topo-left.svg"
import heroTopoRight from "../assets/home/hero-topo-right.svg"
import rightArrow from "../assets/icons/arrow-right.svg"
import circleBackground from "../assets/home/hero-inner-circle.svg"
import Footer from "./Footer";
function ReviewPayDeposit() {
    const { user, loading } = useAuth()
    const [paymentMethod, setPaymentMethod] = useState("card");
    let role = user?.role
    if (role == null) {
        role = "visitor"
    }
    return (
        <>
            <NavigationBar role={role} user={user} />
            <div className="sectionHeader">
                <img
                    src={heroTopoLeft}
                    className="ringBottomLeft"
                    alt=""
                />
                <img
                    src={heroTopoRight}
                    className="ringBottomRight"
                    alt=""
                />
                <div className="sectionInfoPadding">
                    <p>STEP 4 OF 4</p>
                    <p className="reviewPayDepositTitle">Review & Pay Deposit</p>
                    <p>Verify your booking details and make a secure deposit to confirm your pet care appointment with Angelena.</p>
                </div>
                <div className="currentStepContainer">
                    <div className="stepItem">
                        <span>
                            <img className="iconCircle-inactive" src={rightArrow} alt="" />
                        </span>
                        Select Service
                    </div>
                    <div className="stepItem"><span><img className="iconCircle-inactive" src={rightArrow}></img></span>Date & Time</div>
                    <div className="stepItem"><span><img className="iconCircle-inactive" src={rightArrow}></img></span>Pet & Care Details</div>
                    <div className="currentStep">
                        <p className="iconCircle-active">4</p>
                        <p>Review & Pay</p>
                    </div>
                </div>
            </div>
            <div className="review-pay-information-container">
                <div className="infoContainer">
                    <p className="title-info">Booking Summary</p>
                    <div className="flex-info">
                        <p>Service</p>
                        <p className="flex-desc">Drop-in-Care</p>
                    </div>
                    <div className="flex-info">
                        <p>Pet Name</p>
                        <p className="flex-desc">Mochi (Dog)e</p>
                    </div>
                    <div className="flex-info">
                        <p>Date & Time</p>
                        <p className="flex-desc">Tue, Oct 6 @ 12:00 PM</p>
                    </div>
                    <div className="line-overlay"></div>
                    <div>
                        <p className="flex-info-spec">SPECIAL INSTRUCTIONS SUMMARY</p>
                        <p className="flex-info-spec">Feed 1/2 cup kibble at 12:00 PM. No meds required. Key is located in the lockbox by the side door (Code: 4892)</p>
                    </div>
                </div>
                <div className="spacing-padding">
                    <div className="infoContainer">
                        <p className="title-info">Price Details</p>
                        <div className="flex-info">
                            <p>Service Fee</p>
                            <p className="flex-desc">$25.00</p>
                        </div>
                        <div className="flex-info">
                            <p>Required Deposit</p>
                            <p className="flex-desc">$20.00</p>
                        </div>
                        <div className="flex-info">
                            <p>Remaining Balance (Due after visit)</p>
                            <p className="flex-desc">$5.00</p>
                        </div>
                    </div>
                    <div className="infoContainer-deposit">
                        <div className="flex-info">
                            <p>Your deposit today</p>
                            <p className="flex-desc-deposit">$20.00</p>
                        </div>
                        <div>
                            <p className="flex-info-spec-deposit">You're booking within 30 days, so your deposit is $20. (Within 60 days: $50. Within 90 days: $100.) The rest is paid after the visit, in cash or online.</p>
                        </div>
                    </div>
                    <div className="infoContainer">
                        <p className="title-info-payment">Select Payment Method</p>
                        <div className="payment-methods">
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === "card"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Credit / Debit Card
                            </label>

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="applePay"
                                    checked={paymentMethod === "applePay"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Apple Pay
                            </label>
                        </div>
                        <div>
                            <p className="flex-desc-disclaimer">* A deposit is required to secure and confirm your appointment</p>
                            <p className="flex-desc-disclaimer">* Credit or debit card details will not be stored on our servers.</p>
                        </div>

                    </div>
                </div>
                <img
                    src={circleBackground}
                    className="circleRight"
                    alt=""
                />
            </div>
            <div className="navigation-buttons">
                <img
                    src={circleBackground}
                    className="circleLeft"
                    alt=""
                />
                <button className="back-btn">Back</button>
                <button className="pay-deposit-confirm-btn">Pay Deposit & Confirm</button>
            </div>
            <Footer></Footer>
        </>
    )
}

export default ReviewPayDeposit;