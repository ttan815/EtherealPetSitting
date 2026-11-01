import heroTopoLeft from "../../../assets/home/hero-topo-left.svg";
import heroTopoRight from "../../../assets/home/hero-topo-right.svg";
import rightArrow from "../../../assets/icons/arrow-right.svg";

/**
 * Renders the review-and-payment heading and booking progress.
 * @returns {JSX.Element} The review-and-payment header.
 */
function ReviewPayHeader() {
  return (
    <div className="sectionHeader">
      <img src={heroTopoLeft} className="ringBottomLeft" alt="" />
      <img src={heroTopoRight} className="ringBottomRight" alt="" />
      <div className="sectionInfoPadding">
        <p>STEP 4 OF 4</p>
        <p className="reviewPayDepositTitle">Review &amp; Pay Deposit</p>
        <p>Verify your booking details and make a secure deposit to confirm your pet care appointment with Angelena.</p>
      </div>
      <div className="currentStepContainer">
        <div className="stepItem">
          <span><img className="iconCircle-inactive" src={rightArrow} alt="" /></span>
          Select Service
        </div>
        <div className="stepItem">
          <span><img className="iconCircle-inactive" src={rightArrow} alt="" /></span>
          Date &amp; Time
        </div>
        <div className="stepItem">
          <span><img className="iconCircle-inactive" src={rightArrow} alt="" /></span>
          Pet &amp; Care Details
        </div>
        <div className="currentStep">
          <p className="iconCircle-active">4</p>
          <p>Review &amp; Pay</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewPayHeader;
