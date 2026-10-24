import { BUSINESS_NAME, BUSINESS_SUBTITLE } from "../../constants/site-info";
import logoScriptDog from "../../assets/brand/logo-script-dog.svg";
import panelGlow from "../../assets/brand/medallion-glow.svg";
import panelRing from "../../assets/brand/medallion-ring.svg";
import panelInnerCircle from "../../assets/brand/medallion-inner-circle.svg";
import heroGlow from "../../assets/home/hero-glow.svg";
import heroRing from "../../assets/home/hero-ring.svg";
import heroInnerCircle from "../../assets/home/hero-inner-circle.svg";
import "../../styles/homepage/BrandMedallion.css";

// The two Figma medallions use different glow/ring artwork, so each
// variant picks its own images; the logo and text are shared.
const LAYERS = {
  panel: { glow: panelGlow, ring: panelRing, innerCircle: panelInnerCircle },
  hero: { glow: heroGlow, ring: heroRing, innerCircle: heroInnerCircle },
};

// Round logo badge: glow, ring, inner circle, then the script logo and wordmark.
// variant: "panel" (brown side of the auth pages) | "hero" (home page hero, larger)
// children: extra layers positioned over the medallion (e.g. the hero pet photos)
function BrandMedallion({ variant = "panel", children }) {
  const layers = LAYERS[variant];

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
