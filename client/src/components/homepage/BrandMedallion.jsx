// Renders the brand medallion component.
import { BUSINESS_NAME, BUSINESS_SUBTITLE } from "../../constants/shared/site-info";
import { BRAND_MEDALLION_LAYERS } from "../../constants/shared/brand";
import logoScriptDog from "../../assets/brand/logo-script-dog.svg";
import "../../styles/homepage/BrandMedallion.css";

// Round logo badge: glow, ring, inner circle, then the script logo and wordmark.
// variant: "panel" (brown side of the auth pages) | "hero" (home page hero, larger)
// children: extra layers positioned over the medallion (e.g. the hero pet photos)
/**
 * Renders a decorative brand medallion around its child content.
 * @param {Object} props - Medallion style and content.
 * @param {string} [props.variant] - Visual variant for the medallion.
 * @param {import("react").ReactNode} props.children - Content displayed in the medallion.
 * @returns {JSX.Element} The branded medallion.
 */
function BrandMedallion({ variant = "panel", children }) {
  const layers = BRAND_MEDALLION_LAYERS[variant];

  return (
    <div className={`brand-medallion brand-medallion-${variant}`}>
      <img className="brand-medallion-glow" src={layers.glow} alt="" />
      <img className="brand-medallion-ring" src={layers.ring} alt="" />
      <img className="brand-medallion-inner-circle" src={layers.innerCircle} alt="" />

      <div className="brand-medallion-content">
        <img className="brand-medallion-logo" src={logoScriptDog} alt="Angelena's Ethereal Pet Sitting & Care logo" />
        <p className="brand-medallion-name">{BUSINESS_NAME}</p>
        <p className="brand-medallion-subtitle">{BUSINESS_SUBTITLE}</p>
      </div>

      {children}
    </div>
  );
}

export default BrandMedallion;
