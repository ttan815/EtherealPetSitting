import { BUSINESS_NAME, BUSINESS_SUBTITLE } from "../../constants/site-info";
import logoDogMark from "../../assets/brand/logo-dog-mark.svg";
import logoDogMarkLight from "../../assets/brand/logo-dog-mark-light.svg";
import "../../styles/homepage/BrandLogo.css";

// Dog mark with the "ETHEREAL / PET SITTING & CARE" wordmark (Figma "Logo").
// size: "medium" (auth pages top bar) | "large" (home navigation bar, footer)
// tone: "dark" (on light backgrounds) | "light" (on dark backgrounds, e.g. the footer)
function BrandLogo({ size = "medium", tone = "dark" }) {
  return (
    <div className={`brand-logo brand-logo-${size} brand-logo-${tone}`}>
      <img className="brand-logo-mark" src={tone === "light" ? logoDogMarkLight : logoDogMark} alt="" />
      <div>
        <p className="brand-logo-name">{BUSINESS_NAME}</p>
        <p className="brand-logo-subtitle">{BUSINESS_SUBTITLE}</p>
      </div>
    </div>
  );
}

export default BrandLogo;
