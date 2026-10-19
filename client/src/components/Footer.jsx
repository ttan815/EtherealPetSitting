import { QRCodeSVG } from "qrcode.react";
import BrandLogo from "./BrandLogo";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "../constants/site-info";
import instagramIcon from "../assets/icons/instagram.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import emailIcon from "../assets/icons/email.svg";
import phoneIcon from "../assets/icons/phone-light.svg";
import topo1 from "../assets/home/footer-topo-1.svg";
import topo2 from "../assets/home/footer-topo-2.svg";
import topo3 from "../assets/home/footer-topo-3.svg";
import "../styles/Footer.css";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Services", href: "#services" },
  { label: "About Angelena", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Log In", href: "/login" },
  { label: "Create Account", href: "/create-account" },
];
// TODO: replace with the product owner's real social media pages
const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: instagramIcon },
  { label: "Facebook", href: "#", icon: facebookIcon },
];

function Footer() {
  // The QR code points to the booking page on whatever domain the site runs on
  const bookingUrl = `${window.location.origin}/book-appointment`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-topo" aria-hidden="true">
        <img className="footer-topo-line footer-topo-line-1" src={topo1} alt="" />
        <img className="footer-topo-line footer-topo-line-2" src={topo2} alt="" />
        <img className="footer-topo-line footer-topo-line-3" src={topo3} alt="" />
      </div>

      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-brand">
            <a href="#home" className="footer-logo" aria-label="Ethereal Pet Sitting & Care, back to top">
              <BrandLogo size="large" tone="light" />
            </a>
            <p className="footer-description">
              Independent pet sitting based locally, caring for your pets like
              our own.
            </p>
            <div className="footer-social">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label}>
                  <img src={link.icon} alt="" />
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-section" aria-label="Quick links">
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-section">
            <h2 className="footer-heading">Contact Us</h2>
            <ul className="footer-contact">
              <li>
                <img src={emailIcon} alt="" />
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </li>
              <li>
                <img src={phoneIcon} alt="" />
                <a href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`}>
                  {SUPPORT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-qr-card">
            <div className="footer-qr">
              <QRCodeSVG
                value={bookingUrl}
                size={64}
                bgColor="#f9efed"
                fgColor="#2f1f04"
                title="QR code to book an appointment"
              />
            </div>
            <p>
              Scan the QR code to
              <br />
              book care for your pet!
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Ethereal Pet Sitting &amp; Care. All rights reserved.</p>
          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
