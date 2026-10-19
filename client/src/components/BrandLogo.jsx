import { BUSINESS_NAME, BUSINESS_SUBTITLE } from "../constants/site-info";
import logoDogMark from "../assets/brand/logo-dog-mark.svg";
import "../styles/BrandLogo.css";

// Dog mark with the "ETHEREAL / PET SITTING & CARE" wordmark (Figma "Logo").
// size: "medium" (auth pages top bar) | "large" (home page navigation bar)
function BrandLogo({ size = "medium" }) {
  return (
    <div className={`brand-logo brand-logo-${size}`}>
      <img className="brand-logo-mark" src={logoDogMark} alt="" />
      <div>
        <p className="brand-logo-name">{BUSINESS_NAME}</p>
        <p className="brand-logo-subtitle">{BUSINESS_SUBTITLE}</p>
      </div>
    </div>
  );
}

export default BrandLogo;
