// Renders the home banner section component.
import BrandMedallion from "./BrandMedallion";
import Button from "../form/Button";
import { HOMEPAGE_AVATAR_TONES } from "../../constants/homepage";
import topoLeft from "../../assets/home/hero-topo-left.svg";
import topoRight from "../../assets/home/hero-topo-right.svg";
import pawIcon from "../../assets/icons/paw.svg";
import cameraIcon from "../../assets/icons/camera.svg";
import cameraLightIcon from "../../assets/icons/camera-light.svg";
import "../../styles/homepage/HomeBannerSection.css";

// Background colors of the three pet avatars in the "Trusted by" row
// Home page hero (Figma "Hero"): headline, call-to-action buttons and the
// brand medallion with two pet photo placeholders.
/**
 * Renders the homepage hero banner and its primary booking call to action.
 * @returns {JSX.Element} The homepage hero section.
 */
export default function HomeBannerSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <img className="hero-topo hero-topo-left" src={topoLeft} alt="" />
      <img className="hero-topo hero-topo-right" src={topoRight} alt="" />

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Welcome to Angelena&apos;s</p>
          <h1 id="hero-title" className="hero-title">
            Peace of mind
            <em>for your pets.</em>
          </h1>
          <p className="hero-description">
            Professional, personalized care tailored to your furry friend&apos;s unique needs.
            From drop-in visits to overnight stays, we treat your pets like family.
          </p>

          <div className="hero-buttons">
            <Button variant="tan" href="#" className="hero-button">
              Book an Appointment
            </Button>
            <Button variant="outline-light" href="#" className="hero-button">
              Create Account
            </Button>
          </div>
          <p className="hero-note">A small deposit secures your booking.</p>

          <div className="hero-trust">
            <div className="hero-avatars" aria-hidden="true">
              {HOMEPAGE_AVATAR_TONES.map((tone) => (
                <span key={tone} className={`hero-avatar hero-avatar-${tone}`}>
                  <img src={pawIcon} alt="" />
                </span>
              ))}
            </div>
            <div>
              <p className="hero-trust-title">Trusted by local families</p>
              <p className="hero-trust-rating">
                5.0 <span className="hero-trust-stars" aria-label="5 out of 5 stars">★★★★★</span> rating
              </p>
            </div>
          </div>
        </div>

        {/* Pet photos are placeholders until real photos are added */}
        <BrandMedallion variant="hero">
          <div className="hero-photo hero-photo-small" aria-hidden="true">
            <img src={cameraLightIcon} alt="" />
            Pet photo
          </div>
          <div className="hero-photo hero-photo-large" aria-hidden="true">
            <img src={cameraIcon} alt="" />
            Pet photo
          </div>
        </BrandMedallion>
      </div>
    </section>
  );
}
