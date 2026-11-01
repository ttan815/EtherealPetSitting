import { useState } from "react";
import NavigationBar from "../../homepage/NavigationBar";
import "../../../styles/booking/ReviewPayDeposit.css";
import { useAuth } from "../../../context/AuthContext";
import heroTopoLeft from "../../../assets/home/hero-topo-left.svg"
import heroTopoRight from "../../../assets/home/hero-topo-right.svg"
import rightArrow from "../../../assets/icons/arrow-right.svg"
import circleBackground from "../../../assets/home/hero-inner-circle.svg"
import Footer from "../../homepage/Footer";
import { getBookingPrice, formatBookingAmount } from "../../../utils/booking-pricing";
/**
 * Renders the standalone card-entry screen for a booking deposit.
 * @param {{services?: Array<Object>, dateKey?: string|null}} props - Selected services and appointment date.
 * @returns {JSX.Element} The card-entry page.
 */
function AddPaymentDetails({ services = [], dateKey = null }) {
    const { user } = useAuth()
    const [nameOnCard, setNameOnCard] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");
    const { total, deposit, balance } = getBookingPrice(services, dateKey);
    function parseExpiryDate(expyDateInput) {
        let cleanedExpyDate = expyDateInput.replace(/\D/g, "");
        cleanedExpyDate = cleanedExpyDate.slice(0, 4);
        if (cleanedExpyDate.length > 2) {
            cleanedExpyDate = cleanedExpyDate.slice(0, 2) + "/" + cleanedExpyDate.slice(2);
        }
        setExpiryDate(cleanedExpyDate)
    }
    function parseCardNumber(cardNumberInput) {
        if (cardNumberInput.length < 16) {
            setCardNumber(cardNumberInput.replace(/\D/g, ""))
        }
        else {
            setCardNumber(cardNumber)
            return;
        }
    }
    function parseCVV(cvvInput) {
        setCVV(cvvInput.slice(0, 3).replace(/\D/g, ""))
    }
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
                    <p className="reviewPayDepositTitle">Add Payment Details</p>
                    <p>Enter your card details to pay your deposit and confirm your appointment with Angelena.</p>
                </div>
                <div className="currentStepContainer-payment">
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
                    <p className="title-info-card">Card Details</p>
                    <div className="payment-info">
                        <p className="payment-input-name">Name on card</p>
                        <input className="payment-input" onChange={(e) => setNameOnCard(e.target.value)} value={nameOnCard} placeholder="ex. John Wayne"></input>
                    </div>
                    <div className="payment-info">
                        <p className="payment-input-name">Card Number</p>
                        <input className="payment-input" onChange={(e) => parseCardNumber(e.target.value)} value={cardNumber} placeholder="1234 5678 9012 3456"></input>
                    </div>
                    <div className="payment-info">
                        <div className="expiry-cvv-container">
                            <div>
                                <p className="payment-input-name">Expiry date</p>
                                <input className="payment-input-secrets" onChange={(e) => parseExpiryDate(e.target.value)} value={expiryDate} placeholder="MM/YY"></input>
                            </div>
                            <div>
                                <p className="payment-input-name">CVV</p>
                                <input className="payment-input-secrets" onChange={(e) => parseCVV(e.target.value)} value={cvv} placeholder="es. 123"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="spacing-padding">
                    <div className="infoContainer">
                        <p className="title-info">Price Details</p>
                        <div className="flex-info">
                            <p>Service Fee</p>
                            <p className="flex-desc">{formatBookingAmount(total)}</p>
                        </div>
                        <div className="flex-info">
                            <p>Required Deposit</p>
                            <p className="flex-desc">{formatBookingAmount(deposit)}</p>
                        </div>
                        <div className="flex-info">
                            <p>Remaining Balance (Due after visit)</p>
                            <p className="flex-desc">{formatBookingAmount(balance)}</p>
                        </div>
                    </div>
                    <div className="infoContainer-deposit">
                        <div className="flex-info">
                            <p>Your deposit today</p>
                            <p className="flex-desc-deposit">{formatBookingAmount(deposit)}</p>
                        </div>
                        <div>
                            <p className="flex-info-spec-deposit">{dateKey ? "Your deposit is based on how far ahead the appointment is booked. The remaining balance is due after the visit, in cash or online." : "Select an appointment date to calculate the required deposit."}</p>
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

export default AddPaymentDetails;